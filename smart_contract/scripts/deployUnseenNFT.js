const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deployer address: ${deployer.address}`);

  const UnseenNFT = await hre.ethers.getContractFactory("UnseenNFT");
  const unseenNFT = await UnseenNFT.deploy();

  await unseenNFT.deployed();
  console.log(`Deployed unseenNFT at ${unseenNFT.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
