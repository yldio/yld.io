import React from 'react'

import { Grid } from '../grid'
import TitleAndListWithOptionalLogos from '../Common/TitleAndListWithOptionalLogos'
import Subtitle from '../Typography/Subtitle'
import LogoGrid from '../Common/LogoGrid'
import StyledLink from '../Common/StyledLink'

const WhyOpenSource = ({ title, list, subtitle, companies }) => (
  <Grid>
    <TitleAndListWithOptionalLogos title={title} list={list} />
    <Subtitle>{subtitle}</Subtitle>
    <LogoGrid companies={companies} />
  </Grid>
)

export default WhyOpenSource
