import { getEnv } from '@/config/env'
import { Token } from '@/config/types'

const tokens: { [key: string]: Token } = {
  // 此处的56只放生产的token合约地址
  bp: {
    symbol: 'BP',
    address: {
      56: '0xACB8f52DC63BB752a51186D1c55868ADbFfEe9C1',
      97: '0x8Ab1e8c44D42c1ef8dA231346E2CDfEe18104D08'
    },
    decimals: 18,
    projectLink: 'https://www.bunnypark.com/'
  },
  bg: {
    symbol: 'BG',
    address: {
      56: '0xD04c116C4F02f3ccA44b7d4e5209225C8779C8B8',
      97: '0xE69f033C6AFFEb698D7F884977F01C3d275Fe5e1'
    },
    decimals: 18,
    projectLink: 'https://www.bunnypark.com/'
  },
  usdt: {
    symbol: 'USDT',
    address: {
      // 56: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      56: '0x55d398326f99059fF775485246999027B3197955',
      97: '0xe2D851F5321F78A2E138EBadB40aF30543A838E9'
    },
    decimals: 18,
    projectLink: 'https://tether.to/'
  }
}

const envTable: Record<string, any> = {
  dev: {
    bp: {
      symbol: 'BP',
      address: {
        56: '0xDA915bC7B5FF09B6B8af0b5DE7FCf6b14b59A949',
        97: '0x8Ab1e8c44D42c1ef8dA231346E2CDfEe18104D08'
      },
      decimals: 18,
      projectLink: 'https://www.bunnypark.com/'
    },
    bg: {
      symbol: 'BG',
      address: {
        56: '0x446eE7E4d62a329A404c0795950B8E5f81b5Da6b',
        97: '0xE69f033C6AFFEb698D7F884977F01C3d275Fe5e1'
      },
      decimals: 18,
      projectLink: 'https://www.bunnypark.com/'
    },
    usdt: {
      symbol: 'USDT',
      address: {
        56: '0x546fB394BB950dd1efffB54bC25D31027Ba7C799',
        97: '0xe2D851F5321F78A2E138EBadB40aF30543A838E9'
      },
      decimals: 18,
      projectLink: 'https://tether.to/'
    }
  },
  pre: {
    bp: {
      symbol: 'BP',
      address: {
        56: '0xDA915bC7B5FF09B6B8af0b5DE7FCf6b14b59A949',
        97: '0x8Ab1e8c44D42c1ef8dA231346E2CDfEe18104D08'
      },
      decimals: 18,
      projectLink: 'https://www.bunnypark.com/'
    },
    bg: {
      symbol: 'BG',
      address: {
        56: '0x446eE7E4d62a329A404c0795950B8E5f81b5Da6b',
        97: '0xE69f033C6AFFEb698D7F884977F01C3d275Fe5e1'
      },
      decimals: 18,
      projectLink: 'https://www.bunnypark.com/'
    },
    usdt: {
      symbol: 'USDT',
      address: {
        56: '0x546fB394BB950dd1efffB54bC25D31027Ba7C799',
        97: '0xe2D851F5321F78A2E138EBadB40aF30543A838E9'
      },
      decimals: 18,
      projectLink: 'https://tether.to/'
    }
  },
  prod: {}
}

const res = Object.assign(tokens, envTable[getEnv()])

export default res
