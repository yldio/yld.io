import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Grid } from '../grid'
import TitleAndList from '../Common/TitleAndList'
import Subtitle from '../Typography/Subtitle'
import LogoGrid from '../Common/LogoGrid'
import StyledLink from '../Common/StyledLink'

const StyledGrid = styled(Grid)`
  padding-bottom: ${props => props.theme.space[6]};
`

const StyledSubtitle = styled(Subtitle)`
  margin-bottom: ${props => props.theme.space[3]};
`

const WhyOpenSource = ({ title, list, subtitle, companies }) => (
  <Fragment>
    <TitleAndList title={title} list={list} />
    <StyledGrid>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
      <LogoGrid companies={companies} />
    </StyledGrid>
  </Fragment>
)

export default WhyOpenSource
