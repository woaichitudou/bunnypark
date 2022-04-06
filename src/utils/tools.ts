import Numeral from 'numeral'
import { isNaN } from 'lodash'

export const px2rem = (px: number | string): string => {
  return `${String(Number(px) / 100)}rem`
}
export const isMobile = (): boolean => {
  const { pathname } = window.location
  return /^\/m\/.*?$/.test(pathname)
}

export const num2size = (num: number | string): string => {
  return isMobile() ? px2rem(num) : `${String(num)}px`
}

export const formatNumber = (value: number | string): number => {
  const currValue = isNaN(Number(value)) ? 0 : Number(value)
  return Number(Numeral(currValue).format('0.0000'))
}

export const sleep = async (time: number): Promise<any> => {
  return await new Promise((resolve) => setTimeout(resolve, time))
}

// 生成随机UUID
export const makeUUID = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const radix = chars.length
  const uuid = []
  // eslint-disable-next-line
  for (let i = 0; i < 32; i++) uuid[i] = chars[0 | Math.random() * radix]
  return uuid.join('')
}

export const getUserId = () => {
  const cacheId = localStorage.getItem('USER-UUID')
  if (cacheId) {
    return cacheId
  }

  const newUserId = makeUUID()
  localStorage.setItem('USER-UUID', newUserId)
  return newUserId
}

export const isNullStr = (str: string): boolean => {
  if (
    str === '' ||
      str.includes(' ') ||
      str.includes('\b') ||
      str.includes('\t') ||
      str.includes('\n') ||
      str.includes('\v') ||
      str.includes('\f') ||
      str.includes('\r') ||
      str.includes('\r') ||
      str.includes('"') ||
      str.includes('\'') ||
      str.includes('\u005C') ||
      str.includes('\u00A0') ||
      str.includes('\u2028') ||
      str.includes('\u2029') ||
      str.includes('\uFEFF')
  ) {
    return true
  }
  return false
}

// 将字符串复制到剪切板函数
export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement('textarea')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input?.parentElement?.removeChild(input)
      resolve(text)
    } catch (e) {
      reject(e)
    }
  })
}

export const getMaxZIndex = () => {
  return String([].slice.call(document.getElementsByTagName('*')).reduce((a, b) => Math.max(a, +window.getComputedStyle(b).zIndex || 0), 0) ?? 0)
}

export const getDuration = (second: number, blockNumber: number, day?: string) => {
  // const unit = day ?? 'day'

  if (second > 0 && blockNumber > 0) {
    const days = Math.floor(second / 86400)
    const hours = String(Math.floor((second % 86400) / 3600)).padStart(2, '0')
    const minutes = String(Math.floor(((second % 86400) % 3600) / 60)).padStart(2, '0')
    const seconds = String(Math.floor(((second % 86400) % 3600) % 60)).padStart(2, '0')

    // return `${days}${unit} ${hours}:${minutes}:${seconds}`
    return [days, hours, minutes, seconds]
  }

  return ['-', '-', '-', '-']
}

export default {}
