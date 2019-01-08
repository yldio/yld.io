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
  column-gap: 42px;
  padding-top: 0;

  ${breakpoint('tablet')`
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

  &:nth-child(5n + 1) {
    grid-row: 1;
  }

  &:nth-child(5n + 2) {
    grid-row: 2;
  }

  &:nth-child(5n + 3) {
    grid-row: 3;
  }

  &:nth-child(5n + 4) {
    grid-row: 4;
  }

  &:nth-child(5n + 5) {
    grid-row: 5;
  }

  ${breakpoint('smallTablet')`
    &:nth-child(4n + 1) {
      grid-row: 1;
    }

    &:nth-child(4n + 2) {
      grid-row: 2;
    }

    &:nth-child(4n + 3) {
      grid-row: 3;
    } 

    &:nth-child(4n + 4) {
      grid-row: 4;
    } 
  `};

  ${breakpoint('tablet')`
    &:nth-child(5n + 1) {
      grid-row: 1;
    }

    &:nth-child(5n + 2) {
      grid-row: 2;
    }

    &:nth-child(5n + 3) {
      grid-row: 3;
    } 

    &:nth-child(5n + 4) {
      grid-row: 4;
    } 

    &:nth-child(5n + 5) {
      grid-row: 5;
    } 
  `};
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
