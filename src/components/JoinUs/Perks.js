import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import { Paragraph } from '../Typography'
import Image from '../Common/Image'

import { Section, LightH3, ShiftedColumn } from './elements'

const PerksListContainer = styled(ShiftedColumn)`
  display: grid;
  row-gap: ${remcalc(24)};
  grid-template-columns: 1fr 1fr;
  column-gap: 42px;
  padding-top: 0;

  ${breakpoint('smallPhone')`
    grid-template-columns: 1fr 1fr;
  `};

  ${breakpoint('smallTablet')`
    grid-template-columns: 1fr 1fr 1fr;
  `};

  ${breakpoint('tablet')`
    grid-template-columns: 1fr 1fr;
    row-gap: ${remcalc(36)};
    column-gap: 42px;
    padding-top: ${remcalc(12)};
  `};
`

const Icon = styled(Image)`
  width: 60px;
  height: 60px;
`

const PerkContainer = styled(Padding)`
  display: flex;
  flex-direction: column;
`
const Perk = ({ icon, description }) => (
  <PerkContainer>
    <Icon image={icon} />
    <Paragraph noMargin>{description}</Paragraph>
  </PerkContainer>
)

const PerksList = ({ perks }) => (
  <PerksListContainer width={[1, 1, 1, 1, 1, 5 / 12]}>
    {perks.map((perk, idx) => (
      <Perk
        key={idx}
        icon={perk.icon}
        description={perk.description.description}
      />
    ))}
  </PerksListContainer>
)

const Perks = ({ data: { title, text, perks } }) => (
  <Section>
    <Row>
      <Col width={[1, 1, 1, 1, 1, 5 / 12]}>
        <LightH3>{title}</LightH3>
        <Paragraph muted>{text}</Paragraph>
      </Col>
      <PerksList perks={perks} />
    </Row>
  </Section>
)

export default Perks
