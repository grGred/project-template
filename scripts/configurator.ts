import {ethers} from "ethers";
import * as dotenv from "dotenv";
import config from "../routersConfig.json";
const clc = require('cli-color');
dotenv.config();

let PK: string;

interface Blockchain {
    name: string;
    providerUrl: string;
    contractAddress: string;
    routers: string[];
    gasPrice?: string;
}

const blockchains = config as Blockchain[];

const ABI = [
    "function addAvailableDEXs(address[] _routers)",
    "function getAvailableDEXs() view returns (address[])"
]

if (process.env.PRIVATE_KEY === undefined) {
    throw new Error('No private key')
} else {
    PK = process.env.PRIVATE_KEY;
}

async function main() {
    let statuses = await Promise.allSettled(blockchains.map(async (blockchain) => {
        console.log(`adding routers to ${clc.blue(blockchain.name)}`);
        const provider = new ethers.providers.JsonRpcProvider(blockchain.providerUrl);
        const signer = new ethers.Wallet(PK, provider);
        const contract = new ethers.Contract(blockchain.contractAddress, ABI, signer);

        const addedRouters = (await contract.getAvailableDEXs()) as string[];
        const addedRoutersLowerCase = addedRouters.map(element => {
            return element.toLowerCase();
        });

        let skippedAmount = 0;

        const routersToAdd = blockchain.routers.filter((router) => {
            const skip = addedRoutersLowerCase.includes(router.toLowerCase());
            if (skip) skippedAmount++;
            return !skip;
        })

        console.log(`${clc.blue(blockchain.name)}: (skipped ${skippedAmount}) adding routers: `, routersToAdd);

        if (routersToAdd.length > 0) {
            const overrides = blockchain.gasPrice ? {gasPrice: ethers.utils.parseUnits(blockchain.gasPrice, 'gwei')} : {};
            //await contract.addAvailableRouters(blockchain.routers, overrides);
            console.log(`${clc.blue(blockchain.name)}: added`);
        } else {
            console.log(`${clc.yellow(blockchain.name)}: nothing to add`);
        }
    }));

    for (let i in statuses) {
        const status = statuses[i];
        if (status.status == 'rejected') {
            console.log(`${clc.red(blockchains[i].name)}`, clc.red('ERROR :') ,`${(<PromiseRejectedResult>statuses[i]).reason}`)
        } else {
            console.log(`${clc.green(blockchains[i].name)} completed`);
        }
    }
}

main()
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.log('Error = ', err)
    });