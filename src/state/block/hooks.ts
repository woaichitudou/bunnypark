import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { setBlock } from '.'
import { useAppDispatch } from '@/state'
import { BlockState, State } from '@/state/types'
import { simpleRpcProvider } from '@/utils/providers'

export const usePollBlockNumber = () => {
  const timer = useRef<any>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const get = async () => {
      const blockNumber = await simpleRpcProvider.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }

    timer.current = setInterval(() => {
      void get()
    }, 1000)

    return () => clearInterval(timer.current)
  }, [dispatch, timer])
}

export const useBlock = (): BlockState => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}
