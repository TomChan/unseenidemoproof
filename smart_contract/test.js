const hre = require("hardhat");
const tokenAddress = '0xa548D639Da7633EA05293B2fda586c4DF0bB94Ba';

const c = async () => {
    const token = await hre.ethers.getContractAt('ERC20', tokenAddress);

    const teamAddress = '0xa85ba3bfe5B9464460738D47B562546df21c0dEb';
    const grantAmount = 123;
    const transferCalldata = token.interface.encodeFunctionData('transfer', [teamAddress, grantAmount]);
    console.log(transferCalldata);
};

(async ()=> await c())();




