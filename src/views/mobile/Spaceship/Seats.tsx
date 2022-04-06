import { times } from 'lodash'
import { useHistory, useParams } from 'react-router-dom'
import React, { FC, useCallback, useMemo, useState } from 'react'

import C from '@/components'

import { useAppDispatch } from '@/state'
import Adventure from '@/class/Adventure'
import useActiveWeb3React from '@/hooks/useActiveWeb3React'
import { useSelectedFleetMember } from '@/state/fleet/hooks'
import { convertLevel as convertSeats } from '@/class/helpers'
import { clearSelectedFleetMember, delSelectedFleetMember } from '@/state/fleet'

const Seats: FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const fleetData = useSelectedFleetMember()
  const { library, account } = useActiveWeb3React()
  const { shipId } = useParams<Record<string, any>>()
  const { todoCreateFleet } = Adventure

  const [modalStatus, setModalStatus] = useState<string>('')

  const capacity = useMemo(() => (fleetData.reduce((accumulator, m) => (accumulator + Number(m.power)), 0)), [fleetData])

  const isDisabled = useMemo(() => ((fleetData.length < convertSeats(shipId))), [fleetData.length, shipId])

  const bonusBuff = useMemo(() => {
    const filter = fleetData.filter((f) => f.type === 'BABY')
    return filter.length * 0.5
  }, [fleetData])

  const seatCount = useMemo(() => (convertSeats(shipId)), [shipId])

  const handleAddMember = (position: number) => {
    history.push(`/m/spaceship/${shipId}/choose/${position}`)
  }

  const handleDelMember = (target: any) => {
    dispatch(delSelectedFleetMember({ ...target }))
  }

  const handleCreateEv = useCallback(async () => {
    if (library && account) {
      // 战力过低提示 TODO
      if (capacity < 200) {
        setModalStatus('lackPower')
        return
      }
      setModalStatus('confirming')
      const tokenIds = fleetData.map((fleet) => fleet.tokenId)
      const response = await todoCreateFleet(library, account, shipId, tokenIds)
      if (response.result) {
        setModalStatus('succeed')
        dispatch(clearSelectedFleetMember())
        setTimeout(() => {
          history.push(`/m/spaceship/fleet/${response.fleetId}`)
        }, 1500)
      } else {
        setModalStatus('fail')
      }
    }
  }, [account, capacity, dispatch, fleetData, history, library, shipId, todoCreateFleet])

  return (
    <div className='m-bunny-build-fleet'>
      <C.BackButton backUrl="/m/spaceship" />
      <C.Title title='Build a fleet' />
      <div className="m-pilot-label">
        <div className="m-pilot-label-left">
          <C.WebImage src='adventure/icon-3.png' />
          <span>{capacity}</span>
          <div className="m-pilot-label-border">
            <em/>
          </div>
          <label>Combat power</label>
        </div>
        <div className="m-pilot-label-right">
          <C.WebImage src='adventure/icon-4.png' />
          <span>{bonusBuff}%</span>
          <div className="m-pilot-label-border">
            <em/>
          </div>
          <label>success rate</label>
        </div>
      </div>
      <h4>Passenger Compartment</h4>
      <div className={`m-bunny-build-fleet-seat m-bunny-build-fleet-seat-${seatCount}`}>
        {
          times(seatCount, (n) => {
            const target = fleetData.find((m) => Number(m.position) === n)
            // 兼容BABY 和 普通兔子卡 TODO
            const kind = Number.isInteger(target?.kind) ? `-${Number(target?.kind) + 1}` : ''
            const poster = `cards/bunny-${(target?.type ?? '').toLowerCase()}${kind}.png`

            if (target) {
              return (
                <div className="m-bunny-build-fleet-seat-item" key={ n }>
                  <C.WebImage src={poster}/>
                  <del onClick={ () => handleDelMember(target) } />
                </div>)
            }
            return (<div className="m-bunny-build-fleet-seat-item" key={ n } onClick={ () => handleAddMember(n) }/>)
          })
        }
      </div>
      <div className='m-bunny-build-fleet-btn'>
        <C.Button type='yellow' disabled={isDisabled} onClick={handleCreateEv}>Build a fleet</C.Button>
      </div>
      <C.McpStatusWaitModal show={modalStatus === 'confirming'} />
      <C.McpStatusFailModal show={modalStatus === 'fail'} onClose={() => setModalStatus('')}/>
      <C.McpStatusSuccModal show={modalStatus === 'succeed'} onClose={() => history.push('/m/fleet')}/>
      <C.InsufficientModal show={modalStatus === 'lackPower'} onClose={() => setModalStatus('')} onClick={() => setModalStatus('')}/>
    </div>
  )
}

export default Seats
