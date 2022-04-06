import React, { FC, lazy, Suspense } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import C from '@/components'
import { initSensors } from '@/utils/sensors'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
const Fleet = lazy(async () => await import('./Fleet'))
const Rabbit = lazy(async () => await import('./Rabbit'))
const Spaceship = lazy(async () => await import('./Spaceship'))
const Adventure = lazy(async () => await import('./Adventure'))
const ComingSoon = lazy(async () => await import('./ComingSoon'))

const App: FC = () => {
  const { path } = useRouteMatch()
  initSensors()

  return (
    <>
      <C.WebHeader />
      <Suspense fallback={null}>
        <Switch>
          {/* ComingSoon */}
          <Route path={`${path}coming-soon`}>
            <ComingSoon />
          </Route>

          {/* 兔子-卡 */}
          <PrivateRoute path={`${path}bunny`}>
            <Rabbit />
          </PrivateRoute>

          {/* 飞船 */}
          <PrivateRoute path={`${path}spaceship`}>
            <Spaceship />
          </PrivateRoute>

          {/* 机队 */}
          <PrivateRoute path={`${path}fleet`}>
            <Fleet />
          </PrivateRoute>

          {/* 冒险 */}
          <PrivateRoute path={`${path}adventure`}>
            <Adventure />
          </PrivateRoute>

          <Route path={`${path}`}>
            <Redirect to={`${path}bunny`} />
          </Route>

        </Switch>

        <Footer />
      </Suspense>
    </>
  )
}

export default App
