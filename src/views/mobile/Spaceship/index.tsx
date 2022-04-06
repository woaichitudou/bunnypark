import React, { FC, lazy } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const Seats = lazy(async () => await import('./Seats'))
const Result = lazy(async () => await import('./Result'))
const Ship = lazy(async () => await import('./Spaceship'))
const BuyShip = lazy(async () => await import('./BuyShip'))
const Details = lazy(async () => await import('./Details'))
const ChooseCard = lazy(async () => await import('./ChooseCard'))

const Spaceship: FC = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Switch>
        {/* 飞船 */}
        <Route path={`${path}`} exact component={Ship} />

        {/* 飞船购买 */}
        <Route path={`${path}/buy`} component={BuyShip} />

        {/* 飞船机队座位展示 */}
        <Route path={`${path}/:shipId/seats`} exact component={Seats} />

        {/* 飞船机队选成员 */}
        <Route path={`${path}/:shipId/choose/:position`} exact component={ChooseCard} />

        {/* 飞船机队详情 */}
        <Route path={`${path}/details/:shipId`} exact component={Details} />

        {/* 飞船机队创建结果 */}
        <Route path={`${path}/fleet/:fleetId`} exact component={Result} />
      </Switch>
    </>
  )
}

export default Spaceship
