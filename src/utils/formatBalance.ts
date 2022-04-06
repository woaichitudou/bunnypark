import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { formatUnits } from 'ethers/lib/utils'

import { BIG_TEN } from '@/config'

/**
 * Take a formatted amount, e.g. 15 BNB and convert it to full decimal value, e.g. 15000000000000000
 */
export const getDecimalAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).times(BIG_TEN.pow(decimals))
}

export const getBalanceAmount = (amount: BigNumber, decimals = 18) => {
  return new BigNumber(amount).dividedBy(BIG_TEN.pow(decimals))
}

export const getFullDisplayBalance = (balance: BigNumber, decimals = 18, displayDecimals?: number) => {
  return getBalanceAmount(balance, decimals).toFixed(displayDecimals as any)
}

export const formatNumber = (number: number, minPrecision = 2, maxPrecision = 2) => {
  const options = {
    minimumFractionDigits: minPrecision,
    maximumFractionDigits: maxPrecision
  }
  return number.toLocaleString(undefined, options)
}

/**
 * Method to format the display of wei given an ethers.BigNumber object
 * Note: does NOT round
 */
export const formatBigNumber = (number: ethers.BigNumber, displayDecimals = 18, decimals = 18) => {
  const remainder = number.mod(ethers.BigNumber.from(10).pow(decimals - displayDecimals))
  return formatUnits(number.sub(remainder), decimals)
}

/**
 * Method to format the display of wei given an ethers.BigNumber object with toFixed
 * Note: rounds
 */
export const formatBigNumberToFixed = (number: ethers.BigNumber, displayDecimals = 18, decimals = 18) => {
  const formattedString = formatUnits(number, decimals)
  return (+formattedString).toFixed(displayDecimals)
}

/**
 * Formats a FixedNumber like BigNumber
 * i.e. Formats 9763410526137450427.1196 into 9.763 (3 display decimals)
 */
export const formatFixedNumber = (number: ethers.FixedNumber, displayDecimals = 18, decimals = 18) => {
  // Remove decimal
  const [leftSide] = number.toString().split('.')
  return formatBigNumber(ethers.BigNumber.from(leftSide), displayDecimals, decimals)
}
// 钱包某个币种余额保留3位小数
export const getCurrencyBalance = (balance: BigNumber, decimals = 18, digit = 3) => {
  return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed(digit)
}
export const securityInterception = (value: number, num: number) => {
  return ((value * 10 ** num).toString().split('.')[0] as any) / 10 ** num
}
