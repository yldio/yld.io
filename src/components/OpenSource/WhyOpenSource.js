import React from 'react'

import TitleAndListWithOptionalLogos from '../Common/TitleAndListWithOptionalLogos'
import Subtitle from '../Typography/Subtitle'
import LogoGrid from '../Common/LogoGrid'

const WhyOpenSource = ({ title, list, subtitle, extraContent, companies }) => {
  return (
    <div>
      <TitleAndListWithOptionalLogos
        title={title}
        list={list}
        extraContent={extraContent}
      />
      <Subtitle>{subtitle}</Subtitle>
      <LogoGrid companies={companies} />
    </div>
  )
}

export default WhyOpenSource
