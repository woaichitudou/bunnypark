import React, { FC, lazy } from 'react'
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute'

const Cities = lazy(async () => await import('./Cities'))
const Result = lazy(async () => await import('./Result'))
const ChooseCity = lazy(async () => await import('./ChooseCity'))
const ChooseFleet = lazy(async () => await import('./ChooseFleet'))

const Adventure: FC = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Switch>
        {/* 冒险城市入口 */}
        <PrivateRoute path={`${path}/cities`} exact>
          <Cities/>
        </PrivateRoute>

        {/* 选择某个城市和该城市适合的机队 */}
        <Route path={`${path}/cities/:cityId/capacity/:capacity/fleet`} exact component={ChooseFleet}/>

        {/* 某个城市-即将冒险 */}
        <Route path={`${path}/cities/:cityId/fleet/:fleetId`} exact component={ChooseCity}/>

        {/* 某个城市冒险结果 type: succeed/fail */}
        <Route path={`${path}/cities/:cityId/results/:type`} component={Result}/>

        <Route path={`${path}`}>
          <Redirect to={`${path}/cities`} />
        </Route>
      </Switch>
    </>
  )
}

export default Adventure
