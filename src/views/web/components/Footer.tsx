import React, { FC, useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import classNames from 'classnames'

const Footer: FC = () => {
  const { pathname } = useLocation()
  return useMemo(() => {
    const routerReg = [
      /^\/m\/fleet\/?$/i,
      /^\/m\/bunny\/?$/i,
      /^\/m\/spaceship\/?$/i,
      /^\/m\/adventure\/cities\/?$/i,
      /^\/m\/bunny\/choose\/\d*\/?$/i,
      /^\/m\/bunny\/upgrade\/\d*\/?$/i
    ]
    // console.log()
    const showFooter = routerReg.find((r) => r.test(pathname))
    const navList = [
      {
        name: 'Bunnies',
        url: '/m/bunny'
      },
      {
        name: 'Spaceships',
        url: '/m/spaceship'
        // url: '/m/coming-soon'
      },
      {
        name: 'Fleets',
        url: '/m/fleet'
        // url: '/m/coming-soon'
      },
      {
        name: 'Adventures',
        url: '/m/adventure'
        // url: '/m/coming-soon'
      }
    ]
    if (showFooter == null) return null
    return (
      <>
        <nav className="m-c-footer">
          <ul>
            {
              navList.map((item, index) => {
                return (
                  <li key={index} className={classNames({ active: pathname.includes(item.url) })}>
                    <Link to={item.url}>{item.name}</Link>
                  </li>
                )
              })
            }
          </ul>
        </nav>
        <div className="m-c-footer-space" />
      </>
    )
  }, [pathname])
}

export default Footer
