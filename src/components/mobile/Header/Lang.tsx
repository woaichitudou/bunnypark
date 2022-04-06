import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { languages } from '@/lang'

const Components: FC = () => {
  const { i18n } = useTranslation()
  const changelang = (code: string): void => {
    i18n.changeLanguage(code).catch(() => {})
  }
  return (
    <div className="select-lang">
      <h3>Current Language {languages.find(i => i.value === i18n.language).label}</h3>
      <ul>
        {
          languages.map(({ label, value }) => {
            return (
              <li onClick={() => changelang(value)} key={value}>{label}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Components

export const auto = {
  name: 'SelectLang',
  Components
}

// return (
//   <div className="m-header-lang">
//     <ul>
//       {langs.map(item => (
//         <li
//           className={classnames({ active: item.lang?.code?.toUpperCase() === selectedLanguage?.code?.toUpperCase() })}
//           key={item.icon}
//           onClick={() => setLang(item.lang)}
//         >
//           <WebIcon name={item.icon} type="main" size="32" />
//         </li>
//       ))}
//     </ul>
//   </div>
// )
