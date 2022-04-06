import React, { FC, useState } from 'react'
import classnames from 'classnames'

interface Porps {
  active: string //  选中的Tab
  onChange: (val: string) => void
}

export const Components: FC<Porps> = ({ active, onChange }) => {
  const [activeData, setActiveData] = useState(active)
  const list = ['Bunnies', 'BabyBunnies']
  const handleClick = (item: string) => {
    setActiveData(item)
    onChange(item)
  }
  return (
    <div className='m-tab'>
      {list.map((item, index) => { return (<span className={classnames({ 'm-tab-active': item === activeData })} key={index} onClick={() => handleClick(item)}>{item}</span>) })}
    </div>
  )
}

export default Components
export const auto = {
  name: 'Tab',
  Components
}
