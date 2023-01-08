/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-console */
import hre, { ethers, network, upgrades } from 'hardhat';
import { RubicWhitelist } from '../typechain';
const clc = require('cli-color');

async function main() {
    const skipChains = [
        'hardhat',
        'ropsten',
        'rinkeby',
        'goerli',
        'kovan',
        'bscTest',
        'polygonMumbai',
        'defiKingdom'
    ];

    const networks = hre.userConfig.networks;

    const blockchainNames = Object.keys(<{ [networkName: string]: any }>networks).filter(name => {
        return !skipChains.includes(name);
    });

    for (let blockchain of blockchainNames) {
        try {
            console.log(`deploying to ${clc.blue(blockchain)}`);
            hre.changeNetwork(blockchain);

            const factory = await hre.ethers.getContractFactory('RubicWhitelist');

            console.log(`start deploy on ${clc.blue(blockchain)}`);
            const deploy = await upgrades.deployProxy(factory, [], {
                initialize: 'initialize',
                timeout: 0 // wait infinietly
            });

            console.log(`waiting on ${clc.blue(blockchain)}`);
            await deploy.deployed();

            await new Promise(r => setTimeout(r, 15000));

            console.log(`waiting for verification on ${clc.blue(blockchain)} at ${deploy.address}`);

            await hre.run('verify:verify', {
                address: deploy.address,
                constructorArguments: []
            });

            console.log(`deployed in ${clc.blue(blockchain)} to:`, deploy.address);
        } catch (e) {
            console.log(e);
        }
    }
}

main()
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.log('Error = ', err);
    });
