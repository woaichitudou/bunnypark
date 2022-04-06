import React, { FC, lazy, Suspense } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import useEagerConnect from '@/hooks/useEagerConnect'
import { usePollBlockNumber } from '@/state/block/hooks'

import Loading from '@/components/common/Loading'

// const Home = lazy(async () => await import('./web/Home'))
const Home = lazy(async () => await import('./web'))

const Mobile = lazy(async () => await import('./mobile'))

const NotFound = lazy(async () => await import('./NotFound'))

const App: FC = () => {
  useEagerConnect()
  usePollBlockNumber()

  return (
    <Suspense fallback={<Loading show />}>
      <Router>
        <Switch>
          {/* 移动端 */}
          <Route path='/m'>
            <Mobile />
          </Route>
          {/* PC端 */}
          <Route path="/">
            <Home />
          </Route>
          {/* 404 */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  )
}

export default App
