import React, { Fragment } from 'react'
import styled from 'styled-components'

import { Grid, Row, Col } from '../grid'
import TitleAndList from '../Common/TitleAndList'
import Subtitle from '../Typography/Subtitle'
import LogoGrid from '../Common/LogoGrid'

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
      <Row>
        <Col width={[1]}>
          <StyledSubtitle>{subtitle}</StyledSubtitle>
        </Col>
        <Col width={[1]}>
          <LogoGrid companies={companies} />
        </Col>
      </Row>
    </StyledGrid>
  </Fragment>
)

export default WhyOpenSource
