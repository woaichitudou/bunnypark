import React, { FC } from 'react'
import C from '@/components'
// import dayjs from 'dayjs'
// import duration from 'dayjs/plugin/duration'
// import useInterval from '@/hooks/useInterval'
// dayjs.extend(duration)

const ComingSoon: FC = () => {
  // const [timeObj, setTimeObj] = useState({ h: '00', m: '00', s: '00' })
  // const endTime = '2021-12-10T08:00:00.000Z'
  // useInterval(() => {
  //   const endUinxTime = dayjs(endTime).valueOf()
  //   const diffTime = dayjs.duration(endUinxTime - dayjs().valueOf())
  //   const diffTimeStr = diffTime.format('D-H-mm-ss')
  //   const [d, h, m, s] = diffTimeStr.split('-')
  //   setTimeObj({
  //     h: String(Number(d) * 24 + Number(h)),
  //     m,
  //     s
  //   })
  // }, 1000)
  return (
    <div className="m-coming-soon">
      <C.BackButton />
      <div className="m-coming-soon-conent">
        <p>countdown</p>
        <div className="m-coming-soon-conent-time">
          <span>Dec-10-2021 08:00:00 AM +UTC</span>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon

// <div className="m-coming-soon-conent">
//   <p>countdown</p>
//   <div className="m-coming-soon-conent-time">
//     <span>{timeObj.h}</span>
//     <em>:</em>
//     <span>{timeObj.m}</span>
//     <em>:</em>
//     <span>{timeObj.s}</span>
//   </div>
// </div>
