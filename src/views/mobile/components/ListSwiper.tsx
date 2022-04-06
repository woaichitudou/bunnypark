import React, { FC, ReactElement } from 'react'

import { chunk } from 'lodash'

interface Props {
  children: ReactElement[]
}

const ListSwiper: FC<Props> = ({ children }) => {
  const listData = chunk(children, 4)
  console.log(React)
  return (
    <div>
      {
        listData.map((item, index) => {
          <div key={index}>
            {
              item.map((child, childIndex) => {
                return <div key={`${index}-${childIndex}`}>{child}</div>
              })
            }
          </div>
        })
      }
    </div>
  )
}

export default ListSwiper
