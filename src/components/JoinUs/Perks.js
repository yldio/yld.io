import React from 'react'
import styled from 'styled-components'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import { Row, Col } from '../grid'
import { Padding } from 'styled-components-spacing'
import { SectionTitle, BodyPrimary } from '../Typography'
import Image from '../Common/Image'

import { Section } from './elements'

const PerksListContainer = styled.ul`
  width: 100%;
  display: grid;
  row-gap: ${remcalc(24)};
  grid-template-columns: 1fr 1fr;
  column-gap: 42px;
  padding-top: ${remcalc(24)};

  ${breakpoint('smallPhone')`
    grid-template-columns: 1fr 1fr;
  `};

  ${breakpoint('smallTablet')`
    grid-template-columns: 1fr 1fr 1fr;
  `};

  ${breakpoint('tablet')`
    grid-template-columns: 1fr 1fr;
    row-gap: ${remcalc(36)};
    column-gap: 48px;
    padding-top: ${remcalc(12)};
  `};
`

const Icon = styled(Image)`
  width: 60px;
  height: 60px;
`

const PerkContainer = styled.li`
  display: flex;
  flex-direction: column;
`

const PerkDescription = styled(BodyPrimary)`
  padding: ${remcalc(12)} 0;
`
const Perk = ({ icon, description }) => (
  <PerkContainer>
    <Icon image={icon} />
    <PerkDescription noMargin>{description}</PerkDescription>
  </PerkContainer>
)

const RowLayout = styled(Row)`
  ${breakpoint('tablet')`
    justify-content: space-between;
  `}
`

const PerksList = ({ perks }) => (
  <Col width={[1, 1, 1, 1, 1, 6 / 12]}>
    <PerksListContainer>
      {perks.map((perk, idx) => (
        <Perk
          key={idx}
          icon={perk.icon}
          description={perk.description.description}
        />
      ))}
    </PerksListContainer>
  </Col>
)

const Perks = ({ data: { title, text, perks } }) => (
  <Section>
    <Padding top={{ smallPhone: 3, tablet: 4 }}>
      <RowLayout>
        <Col width={[1, 1, 1, 1, 1, 5 / 12]}>
          <SectionTitle>{title}</SectionTitle>
          <Padding top={1}>
            <BodyPrimary muted>{text}</BodyPrimary>
          </Padding>
        </Col>
        <PerksList perks={perks} />
      </RowLayout>
    </Padding>
    <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
  </Section>
)

export default Perks
