require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const GETBLOCKIO_API_KEY = process.env.GETBLOCKIO_API_KEY;
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  /*networks: {
    testnet: {
      url: `https://avax.getblock.io/testnet/ext/bc/C/rpc`,
      chainId: 43113,
      accounts: [PRIVATE_KEY],
      httpHeaders: {
        "x-api-key": GETBLOCKIO_API_KEY,
      },
    },
  },
  etherscan: {
    apiKey: {
      avalancheFujiTestnet: SNOWTRACE_API_KEY,
    },
  },*/
  networks: {
    sepolia: {
      url: 'https://rpc.sepolia.org',
      accounts: ['0x81d0890de349f0459b7fda795fd4fa128e9382f752189ed8f96728b1d4ddbb95'],
      gasMultiplier: 2,
      gas: 4000000000
    },
    mumbai: {
      url: 'https://polygontestapi.terminet.io/rpc',
      accounts: ['0x81d0890de349f0459b7fda795fd4fa128e9382f752189ed8f96728b1d4ddbb95'],
      gasMultiplier: 10,
      gas: 4000000000,
      gasPrice: 50000000000,
    }
  },
  etherscan: {
    apiKey: "ABCDE12345ABCDE12345ABCDE123456789",
  },
};
