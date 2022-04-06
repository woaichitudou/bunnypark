import QS from 'qs'
import { getUserId } from '@/utils/tools'

const urlTable: {[string: string]: any} = {
  dev: {
    web: 'http://localhost:5600/',
    swap: 'https://swap.bunnypark.com/',
    bp: 'http://localhost:3000/m/'
  },
  prod: {
    web: 'https://bunny.bunnypark.com/',
    swap: 'https://swap.bunnypark.com/',
    bp: 'https://www.bunnypark.com/m/'
  },
  pre: {
    web: 'https://bunnypark-next-fe-pre.pages.dev/',
    swap: 'https://swap.bunnypark.com/',
    bp: 'https://bunnypark-frontend-pre.pages.dev/m/'
  }
}

export const getEnv = (): string => {
  if (process.env.NODE_ENV === 'development') {
    return 'dev'
  }
  const env = Object.keys(urlTable).find(i => JSON.stringify(urlTable[i]).includes(window.location.host)) ?? 'prod'
  return env
}

const getUrl = (site = 'web', path = '', query = {}): string => {
  const defaultQuery = {
    lang: localStorage.getItem('Language') ?? 'EN',
    sensorsId: getUserId()
  }
  const host: string = urlTable[getEnv()][site]

  const queryStr: string = QS.stringify(Object.assign(defaultQuery, query))

  return path.split('?').length > 1
    ? `${host}${path}&${queryStr}`
    : `${host}${path}?${queryStr}`
}

export const getSwapUrl = (path = '', query = {}): string => {
  return getUrl('swap', path, query)
}
export const getBpUrl = (path = '', query = {}): string => {
  return getUrl('bp', path, query)
}
export const getWebUrl = (path = '', query = {}): string => {
  return getUrl('web', path, query)
}

export default getEnv
