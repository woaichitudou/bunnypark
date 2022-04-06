import React, { FC, lazy } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

const Fleet = lazy(async () => await import('./Fleet'))
const Detail = lazy(async () => await import('./Detail'))
const Gas = lazy(async () => await import('./Gas'))
const Pilot = lazy(async () => await import('./Pilot'))
const DriveMode = lazy(async () => await import('./DriveMode'))
const ChooseCard = lazy(async () => await import('./ChooseCard'))

const App: FC = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Switch>
        {/* 我的机队 */}
        <Route path={`${path}`} exact component={Fleet} />

        {/* 机队详情 */}
        <Route path={`${path}/:fleetId`} exact component={Detail}/>

        {/* 某个机队飞船购买燃料 */}
        <Route path={`${path}/:fleetId/gas`} exact component={Gas}/>

        {/* 选择某个飞船机队并选择驾驶模式 */}
        <Route path={`${path}/:fleetId/driving-mode`} exact component={DriveMode}/>

        {/* 人工驾驶模式-添加飞船机队驾驶员 */}
        <Route path={`${path}/:fleetId/pilot`} exact component={Pilot}/>

        {/* 飞船机队选驾驶员 */}
        <Route path={`${path}/:fleetId/pilot/choose`} exact component={ChooseCard} />
      </Switch>
    </>
  )
}

export default App
