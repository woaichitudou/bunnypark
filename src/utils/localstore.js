import store from 'store'

export const toType = (obj) => {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
const isNum = (num) => {
  return num && toType(num) === 'number'
}
export const get = (key) => {
  const cacheData = store.get(key)
  // 非对象数据，直接返回
  if (cacheData == null) { return null }
  if (toType(cacheData) !== 'object') { return cacheData }
  // 对象数据，判断是否为本工具存储的数据
  if (cacheData.tool && cacheData.tool === 'localstore') {
    // 判断数据是否有有效期
    if (isNum(cacheData.expiryTime) && isNum(cacheData.cacheTime)) {
      const now = +new Date()
      // 判断数据是否在有效期内
      if ((now - cacheData.cacheTime) >= cacheData.expiryTime) {
        return null
      } else {
        return cacheData.value
      }
    } else {
      // 无有效期的数据直接返回数据
      return cacheData.value
    }
  } else {
    // 非本工具存储的数据直接返回
    return cacheData
  }
}
// time 为缓存有效时间，单位为小时
export const set = (key, value, time) => {
  const data = { value, type: toType(value), tool: 'localstore' }
  if (time) {
    if (!isNum(time)) {
      throw new Error('time 参数只能为 null 或 数字，单位为小时')
    }
    data.cacheTime = +new Date()
    data.expiryTime = time * 60 * 60 * 1000
  }
  store.set(key, data)
}

export const rm = (key) => {
  return store.remove(key)
}

export const clear = () => {
  store.clearAll()
}

export default {
  get,
  set,
  rm,
  clear
}
