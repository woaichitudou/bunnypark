import React, { FC, lazy } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const Rabbit = lazy(async () => await import('./Rabbit'))
const Choose = lazy(async () => await import('./Choose'))
const Upgrade = lazy(async () => await import('./Upgrade'))
const BlindBoxBuy = lazy(async () => await import('./BlindBoxBuy'))
const MultiplyBuy = lazy(async () => await import('./MultiplyBuy'))
const MultiplyPreview = lazy(async () => await import('./Preview'))
const BuySucceed = lazy(async () => await import('./BuySucceed'))
const UpgradeSucceed = lazy(async () => await import('./UpgradeSucceed'))
const UpgradePay = lazy(async () => await import('./UpgradePay'))
const BuyingPatterns = lazy(async () => await import('./BuyingPatterns'))
const Index: FC = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Switch>
        {/* 购买入口 */}
        <Route path={`${path}`} exact component={Rabbit} />

        {/* 普通卡片&繁衍卡片 */}
        <Route path={`${path}/buyType`} exact component={BuyingPatterns} />

        {/* 选择支付方式去升级卡片 */}
        <Route path={`${path}/upgrade/pay/:tokenId/:level/:quantity`} exact component={UpgradePay} />

        {/* 选择某卡片去升级 tokenId:卡片ID */}
        <Route path={`${path}/upgrade/:tokenId`} exact component={Upgrade} />

        {/* 升级选卡 */}
        <Route path={`${path}/upgrade/choose`} component={Choose} />

        {/* 繁衍购买 */}
        <Route path={`${path}/multiply/buy`} component={MultiplyBuy} />

        {/* 盲盒购买 */}
        <Route path={`${path}/blind-box/buy`} component={BlindBoxBuy} />

        {/* 确认购买 有tokenId 为 繁衍 无则为 普通 */}
        <Route path={`${path}/buy/preview/:quantity/:price/:tokenId?`} component={MultiplyPreview} />

        {/* 盲盒购买/繁衍购买 成功 */}
        <Route path={`${path}/buy/succeed/:boxId`} component={BuySucceed} />

        {/* 卡片升级成功 */}
        <Route path={`${path}/upgrade/succeed/:tokenId/:multiply?`} component={UpgradeSucceed} />
      </Switch>
    </>
  )
}

export default Index
