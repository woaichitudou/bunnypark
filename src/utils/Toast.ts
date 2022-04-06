import { getMaxZIndex } from '@/utils/tools'

function makeToast (child: any, type: string, time?: number) {
  time = time ?? 2000
  const dom = document.createElement('div')
  const p = document.createElement('p')
  dom.className = `m-toast m-toast-${type}`
  // eslint-disable-next-line
  dom.style.zIndex = getMaxZIndex()
  p.appendChild(child)
  dom.appendChild(p)
  document.body.appendChild(dom)
  setTimeout(() => dom?.parentNode?.removeChild(dom), time)
}

export const Toast = {
  success (msg: string, time?: number) {
    makeToast(document.createTextNode(msg), 'succ', time)
  },
  fail (msg: string, time?: number) {
    makeToast(document.createTextNode(msg), 'fail', time)
  }
}

export default Toast
