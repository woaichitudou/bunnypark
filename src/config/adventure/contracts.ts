import { getEnv } from '@/config/env'

/**
 * 配置添加规则：
 * 键值为合约名字，方便对应查找
 * addresses对象中的56只放正式合约地址，避免出现问题
 */
const addresses: { [key: string]: any } = {
  // 分享卡
  ShardCardNFT: {
    56: '0x85483B73ba152Ae366e1895D439235eF91d7a9c5',
    97: '0x71d659cfC1565db0B2963D25723df5e82F62653A'
  },
  // 兔子系列卡
  BunnyCardNFT: {
    56: '0xEFf053C77F77868F10b1806407F1bb8F6df4d0F3',
    97: '0x41c91c68B8255A63316f6B7bA22f11c04e309aE2'
  },
  // 兔子盲盒
  BunnyBoxNFT: {
    56: '0xAD03eA3fB459A6AB933914954838Cd7FD09732D8',
    97: '0xe04d5818FdCdA3a0026B9d7D915D30fAE7db087F'
  },
  // 飞船
  BunnySpaceshipNFT: {
    56: '0x79Ad76E82E12Bc7Ec414a1805F7cD81B3b2020f4',
    97: '0x4DB82D18AeA181cf6A53f165C3811DA141056913'
  },
  // 机队
  BunnyFleetNFT: {
    56: '0xC369ac300acdF85d39B7Cbcaa7f9840194B7672C',
    97: '0x1bE0178AF63534B3f75A12A25199EF4Bf05FdfA8'
  },
  // 兔子购买
  BunnyShop: {
    56: '0xDEEe839a6bc213a15Cd82Ad2D20d8Cf7368Cc595',
    97: '0xFe8eEB68C91D994924D14f07BD2d80b36ED0F5a3'
  },
  // 兔子冒险
  BunnyVenture: {
    56: '0xe0EC9Ef005044338749462Bc734122Af7E69ca4a',
    97: '0x291e9e5F7E985c3CAEFD25f8CF767929928d3224'
  }
}

const envTable: { [key: string]: any } = {
  dev: {
    // 分享卡
    ShardCardNFT: {
      56: '0x70d612744e8F5ABA29c9494d8c652ad00d59525B',
      97: '0x71d659cfC1565db0B2963D25723df5e82F62653A'
    },
    // 兔子系列卡
    BunnyCardNFT: {
      56: '0x9B93B97a11937365Ae060186e1d6840Fae01DF5b',
      97: '0x41c91c68B8255A63316f6B7bA22f11c04e309aE2'
    },
    // 兔子盲盒
    BunnyBoxNFT: {
      56: '0x596db1700f387528737087D7452c7B2047b40aC6',
      97: '0xe04d5818FdCdA3a0026B9d7D915D30fAE7db087F'
    },
    // 飞船
    BunnySpaceshipNFT: {
      56: '0x09720f3dD65715BBdD5e73842d36559646b22751',
      97: '0x4DB82D18AeA181cf6A53f165C3811DA141056913'
    },
    // 机队
    BunnyFleetNFT: {
      56: '0x3AFA40Fc8bCCb70C39816020283cc5D69d665C4D',
      97: '0x1bE0178AF63534B3f75A12A25199EF4Bf05FdfA8'
    },
    // 兔子购买
    BunnyShop: {
      56: '0xa9b9923628b03B1746A5a37D33De577D958a3c88',
      97: '0xFe8eEB68C91D994924D14f07BD2d80b36ED0F5a3'
    },
    // 兔子冒险
    BunnyVenture: {
      56: '0x6522bf5098eBeee760D885f05fCCE446dF156dFD',
      97: '0x291e9e5F7E985c3CAEFD25f8CF767929928d3224'
    }
  },
  pre: {
    // 分享卡
    ShardCardNFT: {
      56: '0x70d612744e8F5ABA29c9494d8c652ad00d59525B',
      97: '0x71d659cfC1565db0B2963D25723df5e82F62653A'
    },
    // 兔子系列卡
    BunnyCardNFT: {
      56: '0x9B93B97a11937365Ae060186e1d6840Fae01DF5b',
      97: '0x41c91c68B8255A63316f6B7bA22f11c04e309aE2'
    },
    // 兔子盲盒
    BunnyBoxNFT: {
      56: '0x596db1700f387528737087D7452c7B2047b40aC6',
      97: '0xe04d5818FdCdA3a0026B9d7D915D30fAE7db087F'
    },
    // 飞船
    BunnySpaceshipNFT: {
      56: '0x09720f3dD65715BBdD5e73842d36559646b22751',
      97: '0x4DB82D18AeA181cf6A53f165C3811DA141056913'
    },
    // 机队
    BunnyFleetNFT: {
      56: '0x3AFA40Fc8bCCb70C39816020283cc5D69d665C4D',
      97: '0x1bE0178AF63534B3f75A12A25199EF4Bf05FdfA8'
    },
    // 兔子购买
    BunnyShop: {
      56: '0xa9b9923628b03B1746A5a37D33De577D958a3c88',
      97: '0xFe8eEB68C91D994924D14f07BD2d80b36ED0F5a3'
    },
    // 兔子冒险
    BunnyVenture: {
      56: '0x6522bf5098eBeee760D885f05fCCE446dF156dFD',
      97: '0x291e9e5F7E985c3CAEFD25f8CF767929928d3224'
    }
  },
  prod: {
  }
}

const res = Object.assign(addresses, envTable[getEnv()])

export default res
