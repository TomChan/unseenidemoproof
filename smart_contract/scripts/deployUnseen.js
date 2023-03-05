const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  const UnseenCoin = await hre.ethers.getContractFactory("UnseenCoin");
  const unseenCoin = await UnseenCoin.deploy(hre.ethers.utils.parseEther('100000000'), {gasPrice: 50000000000});

  await unseenCoin.deployed();
  console.log(`Deployed UnseenToken at ${unseenCoin.address}`);

  const UnseenPool = await hre.ethers.getContractFactory("UnseenPool");
  const unseenPool = await UnseenPool.deploy(unseenCoin.address, hre.ethers.utils.parseEther('50'), 'UP1', 'UP1');

  await unseenPool.deployed();
  console.log(`Deployed UnseenPool at ${unseenPool.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
