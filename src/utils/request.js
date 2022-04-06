// 格式化数据的第三方库
import qs from 'qs'
import { API_PREFIX } from '@/config'
/**
 * 封装的fetch函数，传入url(必须)和一个参数对象(可选)，这是fetch的需求参数
 */
export default function request (url, options = {}) {
  // 拼接完整的url
  url = API_PREFIX + url

  // Get的请求处理
  if (!options.method) options.method = 'GET'
  // 如果options中具有params参数，进行处理
  if (Object.propertyIsEnumerable.call(options, 'params')) {
    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
      // 判断当前url中是否有问号，如果有，就用&，如果没有，就用问号，作为拼接参数的连接符
      const ask = url.includes('?') ? '&' : '?'
      // 如果请求时GET请求，把所有params参数添加到url中，通过qs库将对象拼接为xxx=xxx&yyy=yyy的格式
      url += `${ask}${qs.stringify(options.params)}`
    }
    // params不是fetch中自带的有效参数，fetch不支持该参数，需要在发送请求前将其删除
    delete options.params
  }

  /**
     * 合并配置项
     */
  options = Object.assign(
    {
      // 设置请求头
      headers: {
        Accept: 'application/json'
      }
    }, options
  )

  /**
     * POST请求的处理
     */
  if (/^(POST|PUT)$/i.test(options.method)) options.body = JSON.stringify(options.body)

  /**
     * 全部配置好之后，最后使用fetch发起一个请求，它本身需要传入一个url和一个options
     */
  return window.fetch(url, options)
    .then(async response => {
      // fetch与ajax(axios)不同，只要服务器有返回值，都是成功，没有返回值才算失败。
      // 所以要在这里进行处理所有返回的结果
      if (!/^(2|3)\d{2}$/.test(response.status)) {
        return 'Error'
      }

      // 处理之后，将response的所有数据转换成json，客户端就可以拿到以json格式响应的所有数据
      const { data } = await response.json()
      return data
    })
    .catch(error => {
      // 服务器没有响应才会跳转到这里
      if (!window.navigator.onLine) {
        // 断网处理
        // ...
        return
      }
      // 什么都没有，返回一个错误
      return Promise.reject(error)
    })
}

// 普通 get 方法
export const get = (url, params = {}) => {
  return request(url, { params: { ...params }, method: 'GET' })
}

// 普通 post 方法
export const post = (url, body = {}) => {
  return request(url, { body, method: 'POST' })
}
