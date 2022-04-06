import BigNumber from 'bignumber.js'
import { ChainId } from '@/config/types'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

const BASE_BSC_SCAN_URLS = {
  [ChainId.MAINNET]: 'https://bscscan.com',
  [ChainId.TESTNET]: 'https://testnet.bscscan.com'
}

export const BIG_ZERO = new BigNumber(0)
export const BIG_ONE = new BigNumber(1)
export const BIG_NINE = new BigNumber(9)
export const BIG_TEN = new BigNumber(10)

// 判断是否是有效地址可采用 import { getAddress } from '@ethersproject/address'
export const RE_WALLET_ADDRESS = /^0x[a-fA-F0-9]{40}$/ // TODO delete or not
export const BLOCKS_PER_YEAR = new BigNumber(10512000)
export const API_PREFIX = 'https://api.xdoge.space/api/'
export const BASE_BSC_SCAN_URL = BASE_BSC_SCAN_URLS[ChainId.MAINNET]
export const STATIC = 'https://static.bunnypark.com/image/BunnyPark/mobile/next-fe/'
// export const STATIC = 'https://xdoge-static.pages.dev/image/'

export default {}
