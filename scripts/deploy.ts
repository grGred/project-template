import hre, { ethers, network, upgrades } from 'hardhat';

async function main() {
  const factory = await hre.ethers.getContractFactory("");

  const deploy = await factory.deploy(
      '',
  );

  // or
  //   const deploy = await upgrades.deployProxy(
  //     factory,
  //     [],
  //     {
  //         initialize: 'initialize',
  //         timeout: 0 // wait infinietly
  //     }
  // );

  await deploy.deployed();

  console.log("deployed to:", deploy.address);

  await new Promise(r => setTimeout(r, 10000));

    await hre.run("verify:verify", {
    address: deploy.address,
    constructorArguments: [
        '',
    ],
  });
}

main()
    .then(() => {
        console.log('Finished');
    })
    .catch(err => {
        console.log('Error = ', err);
    });
