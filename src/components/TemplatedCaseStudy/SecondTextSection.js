import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Margin } from 'styled-components-spacing'

import { Row, Col } from '../grid'
import { SectionTitleStyles, BodyPrimary } from '../Typography'

const NonMobileRow = styled(Row)`
  display: none;

  ${breakpoint('smallTablet')`
    display: flex;
  `}
`

const MobileOnlyRow = styled(Row)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`

const LargeStatsValue = styled(BodyPrimary)`
  ${SectionTitleStyles}
`

const Stats = ({ stats }) => (
  <Fragment>
    {stats.map(stat => (
      <Margin bottom={1} key={stat.id}>
        <LargeStatsValue>{stat.value}</LargeStatsValue>
        <BodyPrimary bold noPaddingTop>
          {stat.label}
        </BodyPrimary>
      </Margin>
    ))}
  </Fragment>
)

const TextColumn = ({ text }) => (
  <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
    {text.map((text, i) => (
      <BodyPrimary key={i}>{text}</BodyPrimary>
    ))}
  </Col>
)

const SecondTextSection = ({ stats, text }) => (
  <Fragment>
    {stats ? (
      <Fragment>
        <NonMobileRow spaced>
          <Col width={[3 / 12]}>
            <Stats stats={stats} />
          </Col>
          <TextColumn text={text} />
        </NonMobileRow>
        <MobileOnlyRow>
          <TextColumn text={text} />
          <Col width={[1]}>
            <Stats stats={stats} />
          </Col>
        </MobileOnlyRow>
      </Fragment>
    ) : (
      <Row flexEnd>
        <TextColumn text={text} />
      </Row>
    )}
  </Fragment>
)

export default SecondTextSection
