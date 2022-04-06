import { getEnv } from '@/config/env'

/**
 * 配置添加规则：
 * 键值为合约名字，方便对应查找
 * addresses对象中的56只放正式合约地址，避免出现问题
 */
const addresses: { [key: string]: any } = {
  multiCall: {
    56: '0xfF6FD90A470Aaa0c1B8A54681746b07AcdFedc9B',
    97: '0x8F3273Fb89B075b1645095ABaC6ed17B2d4Bc576'
  }
}

const envTable: { [key: string]: any } = {
  dev: {
  },
  pre: {
  },
  prod: {
  }
}

const res = Object.assign(addresses, envTable[getEnv()])

export default res
