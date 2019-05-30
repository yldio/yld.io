import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'

import TitleAndListWithOptionalLogos from '../Common/TitleAndListWithOptionalLogos'
import Subtitle from '../Typography/Subtitle'
import LogoGrid from '../Common/LogoGrid'

const WhyOpenSource = ({ title, list, subtitle, extraContent, companies }) => {
  return (
    <Padding>
      <TitleAndListWithOptionalLogos
        title={title}
        list={list}
        extraContent={extraContent}
      />
      <Subtitle>{subtitle}</Subtitle>
      <LogoGrid companies={companies} />
    </Padding>
  )
}

export default WhyOpenSource
