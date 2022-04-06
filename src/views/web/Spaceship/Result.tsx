import { isEmpty } from 'lodash'
import classnames from 'classnames'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useMemo, useEffect, useState } from 'react'

import C from '@/components'
import Adventure from '@/class/Adventure'
import { FleetSizeName } from '@/class/const'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'

const Result: FC = () => {
  const history = useHistory()
  const { querySingleFleetInfo } = Adventure
  const { library } = useActiveWeb3React()
  const { fleetId } = useParams<Record<string, any>>()
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const [fleetInfo, setFleetInfo] = useState<Record<string, any>>()

  const querySingleFleetInfoCallback = useCallback(async (library, fleetId) => {
    const response = await querySingleFleetInfo(library, fleetId)
    // console.info(response)
    if (!isEmpty(response)) {
      setFleetInfo(response)
      // setIsLoading(false)
    }
  }, [querySingleFleetInfo])

  const fleetSize = useMemo(() => {
    return fleetInfo?.seat ? FleetSizeName[fleetInfo?.seat] : ''
  }, [fleetInfo])

  useEffect(() => {
    if (library && fleetId) {
      void querySingleFleetInfoCallback(library, fleetId)
    }
  }, [fleetId, library, querySingleFleetInfoCallback])

  return (
    <div className='web-spaceship-result'>
      <C.BackButton backUrl='/spaceship'/>
      <h1>Congratulations</h1>
      <div className={classnames('web-spaceship-result-box', { [`web-spaceship-result-boxe-${fleetSize}`]: fleetSize })}>
        {fleetSize && <><C.WebImage src={`details/${fleetSize}.png`} /><p>Get a {fleetSize} fleet</p></>}
      </div>
      <ul>
        <li><span>MX{fleetId}</span></li>
        <li><span>{fleetInfo?.gas ?? 0}</span></li>
        <li><span>{fleetInfo?.power ?? 0}</span></li>
        <li><span>{(fleetInfo?.buff ?? 0) / 10}%</span></li>
      </ul>
      <div className="web-spaceship-result-btn">
        <C.WebButton onClick={() => history.push('/fleet')}>My fleet</C.WebButton>
      </div>
    </div>
  )
}

export default Result
