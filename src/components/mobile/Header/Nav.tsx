import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { getSwapUrl, getWebUrl } from '@/config/env'
import C from '@/components'
import { useTranslation } from 'react-i18next'

const Nav: FC<any> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const navData = [
    {
      label: t('NFT', 'NFT'),
      children: [
        {
          label: t('GAMEBOX', 'GAME BOX'),
          href: getWebUrl('m/saas/game'),
          icon: 'icon-game.svg',
          external: true
        },
        {
          label: t('BlindBox', 'Blind Box'),
          href: getWebUrl('m/saas/blindbox'),
          icon: 'icon-menu-nft-blindbox.svg',
          external: true
        },
        {
          label: t('Market', 'Market'),
          href: getWebUrl('m/market'),
          icon: 'icon-menu-other-market.svg',
          external: true
        }
        // {
        //   label: t('Gallery', 'Gallery'),
        //   href: getWebUrl('m/pbb/shop'),
        //   icon: 'icon-menu-gallery.svg',
        //   external: true
        // }
      ]
    },
    {
      label: t('FARMS', 'FARMS'),
      children: [
        {
          label: t('Farms', 'Farms'),
          href: getWebUrl('m/farms'),
          icon: 'icon-menu-farms-farms.svg',
          external: true
        },
        {
          label: t('Pools', 'Pools'),
          href: getWebUrl('m/pools'),
          icon: 'icon-menu-farms-pool.svg',
          external: true
        },
        {
          label: t('NFTMining', 'NFT Mining'),
          href: getWebUrl('m/income'),
          icon: 'icon-menu-farms-nft-mining.svg',
          external: true
        }
      ]
    },
    {
      label: t('TRADE', 'TRADE'),
      children: [
        {
          label: t('Exchange', 'Exchange'),
          href: getSwapUrl('m/swap'),
          icon: 'icon-menu-trade-exchange.svg',
          external: true
        },
        {
          label: t('Liqidity', 'Liquidity'),
          href: getSwapUrl('m/pool'),
          icon: 'icon-menu-trade-liquidity.svg',
          external: true
        }
      ]
    },
    {
      label: t('Gamification', 'Gamification'),
      children: [
        {
          label: t('PinkBubble', 'PinkBubble'),
          href: 'https://www.pinkbubble.finance',
          icon: 'icon-menu-game-pinkbubble.svg',
          external: true
        },
        {
          label: t('XDOGE', 'XDOGE'),
          href: 'https://www.xdoge.space/',
          icon: 'icon-menu-game-xdoge.svg',
          external: true
        }
      ]
    },
    {
      label: t('Park', 'Park'),
      children: [
        {
          label: t('Park', 'Park'),
          href: getWebUrl('m/park'),
          icon: 'icon-menu-park.svg',
          external: true
        }
      ]
    },
    {
      label: t('OTHER', 'OTHER'),
      children: [
        {
          label: t('NFTSAAS', 'NFT SAAS'),
          href: getWebUrl('m/come-soon'),
          icon: 'icon-menu-other-nft-saas.svg',
          external: true
        },
        {
          label: t('Recycle', 'Recycle'),
          href: getWebUrl('m/come-soon'),
          icon: 'icon-menu-other-recycle.svg',
          external: true
        }
      ]
    }
  ]
  return (
    <div className="m-header-nav">
      {navData.map(channel => {
        return (
          <section key={`${channel.label}`}>
            <h4>{channel.label}</h4>
            <ul>
              {channel.children.map(item => {
                return (
                  <li key={`${channel.label}-${item.label}`} onClick={() => onDismiss?.()}>
                    {item?.external != null ? (
                      <a href={item.href}>
                        <C.WebImage src={`../../mobile/main/${item.icon}`} className="m-header-nav-icon" />
                        <strong>{item.label}</strong>
                      </a>
                    ) : (
                      <Link to={item.href}>
                        <C.WebImage src={`../../mobile/main/${item.icon}`} className="m-header-nav-icon" />
                        <strong>{item.label}</strong>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}

export default memo(Nav)
