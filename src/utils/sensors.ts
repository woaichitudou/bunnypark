import { getUserId } from './tools'
import Cache from '@/utils/localstore'

export const sensors = (window as any).sensorsDataAnalytic201505
const isProdEnv = ['xdoge.space', 'www.xdoge.space'].includes(window.location.hostname)

export const initSensors = () => {
  if (!sensors) {
    return
  }

  sensors.init({
    server_url: `https://datasink.bunnypark.com/sa?project=${isProdEnv ? 'production' : 'default'}`,
    send_type: 'beacon',
    heatmap: {
      // 是否开启点击图，default 表示开启，自动采集 $WebClick 事件，可以设置 'not_collect' 表示关闭。
      clickmap: 'default',
      // 是否开启触达注意力图，not_collect 表示关闭，不会自动采集 $WebStay 事件，可以设置 'default' 表示开启。
      scroll_notice_map: 'not_collect',
      collect_tags: {
        li: true
      }
    },
    app_js_bridge: true,
    show_log: false,
    is_track_single_page: true,
    preset_properties: {
      latest_traffic_source_type: false,
      latest_search_keyword: false,
      latest_referrer: false
    }
  })
  saRegPage()
  sensors.quick('autoTrack') // 用于采集 $pageview 事件。
  const saUserId = getUserId()
  sensors.login(saUserId || 'User Login Error')
}

const noop = () => {}

export const track = sensors ? sensors.track : noop

export const saRegPage = () => {
  sensors.registerPage({
    current_url: window.location.href,
    referrer: document.referrer,
    address_wallet: Cache.get('userAccount') ?? 'unConnectedWallet'
  })
}

export const saBlindBoxPayNow = (wallet: string | null | undefined, price: number, coin: string, amount: number, status: number = 1) => {
  track('BPXdoge_Blindbox_PayNow', {
    address_wallet: wallet,
    card_cat: 'Blind Box',
    card_price: 100,
    price_measure: coin,
    cardorder_amount: amount,
    cardorder_totalamount: 100 * amount,
    is_succeed: status
  })
}

export default {}
