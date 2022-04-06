import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { getSwapUrl } from '@/config/env'

const NavList: FC = () => {
  const farmsSubMenu = [
    {
      label: 'Farms & Staking',
      href: '/farms/main'
    },
    {
      label: 'NFT Mining',
      href: '/income'
    }
  ]

  const tradeSubMenu = [
    {
      label: 'Exchange',
      external: true,
      href: getSwapUrl('swap')
    },
    {
      label: 'Liquidity',
      external: true,
      href: getSwapUrl('pool')
    }
  ]

  const NavItems = [
    {
      label: 'TRADE',
      external: true,
      href: getSwapUrl('swap'),
      children: tradeSubMenu
    },
    {
      label: 'FARMS',
      href: '/farms/main',
      children: farmsSubMenu
    },
    {
      label: 'POOL',
      href: '/pools'
    },
    {
      label: 'GAMEBOX',
      href: '/saas/game'
    },
    {
      label: 'BLIND BOX',
      href: '/saas/blindbox'
    },
    {
      label: 'MARKET',
      href: '/market'
    }
  ]

  const SubMenu = (children: any) => {
    return (
      <div className="web-header-nav-dropdown-menu">
        <ul>
          {children.map((child: any) => (
            <li key={child.href}>
              {child.external ? (
                <a href={child.href}>{child.label}</a>
              ) : (
                <NavLink to={child.href}>{child.label}</NavLink>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className="web-header-nav">
      {NavItems.map(item => {
        return (
          <div className={`web-header-nav-item${item.children ? ' web-header-nav-dropdown' : ''}`} key={item.href}>
            {item.external ? <a href={item.href}>{item.label}</a> : <NavLink to={item.href}>{item.label}</NavLink>}
            {item.children ? SubMenu(item.children) : null}
          </div>
        )
      })}
    </div>
  )
}

export default NavList
