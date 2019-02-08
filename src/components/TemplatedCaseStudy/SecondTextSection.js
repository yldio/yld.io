import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Margin } from 'styled-components-spacing'

import { Row, Col } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'

const NonMobileCol = styled(Col)`
  display: none;

  ${breakpoint('smallTablet')`
    display: flex;
  `}
`

const MobileOnlyCol = styled(Col)`
  display: flex;

  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const Stats = ({ stats }) => (
  <Fragment>
    {stats.map(stat => (
      <Margin bottom={1} key={stat.id}>
        <SectionTitle>{stat.value}</SectionTitle>
        <Subtitle noPaddingTop>{stat.label}</Subtitle>
      </Margin>
    ))}
  </Fragment>
)

const TextColumn = ({ textBelowVideo }) => (
  <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
    {textBelowVideo.map((text, i) => (
      <BodyPrimary key={i}>{text}</BodyPrimary>
    ))}
  </Col>
)

const TextAndStatsSection = ({ stats, textBelowVideo }) => (
  <Row spaced>
    <NonMobileCol width={[0, 0, 0, 0, 3 / 12]}>
      <Stats stats={stats} />
    </NonMobileCol>
    <TextColumn textBelowVideo={textBelowVideo} />
    <MobileOnlyCol width={[1, 1, 1, 1, 0]}>
      <Stats stats={stats} />
    </MobileOnlyCol>
  </Row>
)

const TextSectionWithoutStats = ({ textBelowVideo }) => (
  <Row flexEnd>
    <TextColumn textBelowVideo={textBelowVideo} />
  </Row>
)

const SecondTextSection = ({ hasStats, stats, textBelowVideo }) => (
  <Fragment>
    {hasStats ? (
      <TextAndStatsSection stats={stats} textBelowVideo={textBelowVideo} />
    ) : (
      <TextSectionWithoutStats textBelowVideo={textBelowVideo} />
    )}
  </Fragment>
)

export default SecondTextSection
