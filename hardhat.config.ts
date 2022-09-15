import '@typechain/hardhat';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import "@cronos-labs/hardhat-cronoscan";
import 'hardhat-contract-sizer';
import 'hardhat-gas-reporter';
import '@openzeppelin/hardhat-upgrades';

import { SolcUserConfig } from 'hardhat/types'

import * as dotenv from 'dotenv';
dotenv.config();
const DEFAULT_PRIVATE_KEY = process.env.MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000';
const MOONBEAM = process.env.MOONBEAM_API_KEY;
const MOONRIVER = process.env.MOONRIVER_API_KEY;


const DEFAULT_COMPILER_SETTINGS: SolcUserConfig = {
  version: '0.8.16',
  settings: {
    optimizer: {
      enabled: true,
      runs: 100_000,
    },
    metadata: {
      bytecodeHash: 'none',
    },
    evmVersion: "istanbul",
  },
}

module.exports = {
  networks: {
    hardhat: {
      chainId: 137,
      forking: {
        url: `https://polygon-rpc.com`,
      },
      allowUnlimitedContractSize: true,
      loggingEnabled: false,
      accounts:{
        count:100
      }
    },
    eth: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_ID_PROJECT}`,
      chainId: 1,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_ID_PROJECT}`,
      chainId: 3,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_ID_PROJECT}`,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_ID_PROJECT}`,
      chainId: 5,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_ID_PROJECT}`,
      chainId: 42,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    bscTest: {
      url: `https://data-seed-prebsc-2-s3.binance.org:8545`,
      chainId: 97,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    bsc: {
      url: `https://bsc-dataseed.binance.org/`,
      chainId: 56,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    polygonMumbai: {
      url: `https://rpc-mumbai.maticvigil.com`,
      chainId: 80001,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    polygon: {
      url: `https://polygon-rpc.com`,
      chainId: 137,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    avalanche: {
      url: `https://api.avax.network/ext/bc/C/rpc`,
      chainId: 43114,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    fantom: {
      url: `https://rpc.ftm.tools/`,
      chainId: 250,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    moonriver: {
      url: `https://rpc.api.moonriver.moonbeam.network`,
      chainId: 1285,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`],
    },
    arbitrum: {
      url: `https://arb1.arbitrum.io/rpc`,
      chainId: 42161,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    aurora: {
      url: `https://mainnet.aurora.dev`,
      chainId: 1313161554,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    optimism: {
      url: `https://mainnet.optimism.io`,
      chainId: 10,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    moonbeam: {
      url: `https://rpc.api.moonbeam.network`,
      chainId: 1284,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    gnosis: {
      url: `https://rpc.gnosischain.com/`,
      chainId: 100,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    cronos: {
      url: `https://evm-cronos.crypto.org`,
      chainId: 25,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    fuse: {
      url: `https://rpc.fuse.io`,
      chainId: 122,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    okx: {
      url: `https://exchainrpc.okex.org`,
      chainId: 66,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    celo: {
      url: `https://celo.quickestnode.com`,
      chainId: 42220,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    boba: {
      url: `https://mainnet.boba.network`,
      chainId: 288,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
    telos: {
      url: `https://mainnet.telos.net/evm`,
      chainId: 40,
      accounts: [`0x${DEFAULT_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      kovan: process.env.ETHERSCAN_API_KEY,
      // binance smart chain
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      // fantom mainnet
      opera: process.env.FANTOMSCAN_API_KEY,
      ftmTestnet: process.env.FANTOMSCAN_API_KEY,
      // polygon
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      // avalanche
      avalanche: process.env.AVALANCHE_API_KEY,
      avalancheFujiTestnet: process.env.AVALANCHE_API_KEY,
      // celo
      celo: process.env.CELO_API_KEY,
      // boba
      boba: process.env.BOBA_API_KEY,
      // cronos
      cronos: process.env.CRONOS_API_KEY,
      // aurora
      aurora: process.env.AURORA_API_KEY,
      // arbitrum
      arbitrum: process.env.ARBITRUM_API_KEY,
      // optimism
      optimism: process.env.OPTIMISM_API_KEY,
      // optimism
      moonbeam: process.env.MOONBEAM_API_KEY,
    },
    // apiKey:
    // `${MOONRIVER}`,
    // `${MOONBEAM}`,
      customChains: [
      {
        network: "celo",
        chainId: 42220,
        urls: {
          apiURL: "https://api.celoscan.io/api",
          browserURL: "https://celoscan.io"
        }
      },
      {
        network: "arbitrum",
        chainId: 42161,
        urls: {
          apiURL: "https://api.arbiscan.io/api",
          browserURL: "https://arbiscan.io/"
        }
      },
      {
        network: "optimism",
        chainId: 10,
        urls: {
          apiURL: "https://api-optimistic.etherscan.io",
          browserURL: "https://optimistic.etherscan.io/"
        }
      },
      {
        network: "aurora",
        chainId: 1313161554,
        urls: {
          apiURL: "https://api.aurorascan.dev/api",
          browserURL: "https://aurorascan.dev/"
        }
      },
      // {
      //   network: "moonbeam",
      //   chainId: 1313161554,
      //   urls: {
      //     apiURL: "https://api.aurorascan.dev/api",
      //     browserURL: "https://moonbeam.moonscan.io/"
      //   }
      // },
      {
        network: "boba",
        chainId: 288,
        urls: {
          apiURL: "https://api.bobascan.com/api",
          browserURL: "https://bobascan.com/"
        }
      }
    ]
  },
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS]
  },
  contractSizer: {
    alphaSort: false,
    disambiguatePaths: true,
    runOnCompile: false
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5'
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS === 'true' ? true : false,
    noColors: true,
    outputFile: 'reports/gas_usage/summary.txt'
  }
}
