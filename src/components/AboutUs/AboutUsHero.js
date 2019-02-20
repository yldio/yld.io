import React from 'react'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../grid'
import PaddedCol from './PaddedCol'
import Image from '../Common/Image'
import { SectionTitle, BodyPrimary } from '../Typography'

const SupportingStatement = ({ icon, text }) => (
  <PaddedCol width={[1, 1, 1, 1, 1 / 2, 1 / 3]}>
    <Padding bottom={1}>
      <Image image={icon} width="50px" />
    </Padding>
    <BodyPrimary>{text}</BodyPrimary>
  </PaddedCol>
)

const AboutUsHero = ({
  statementText,
  supportingStatement1Icon,
  supportingStatement1Text,
  supportingStatement2Icon,
  supportingStatement2Text,
  supportingStatement3Icon,
  supportingStatement3Text
}) => (
  <Grid>
    <Padding
      top={{ smallPhone: 3.5, tablet: 5 }}
      bottom={{ smallPhone: 3.5, tablet: 5 }}
    >
      <Row>
        <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
          <Col width={[1, 1, 1, 1, 8 / 12, 10 / 12, 8 / 12]}>
            <SectionTitle>{statementText}</SectionTitle>
          </Col>
        </Padding>
      </Row>
      <Row>
        <SupportingStatement
          icon={supportingStatement1Icon}
          text={supportingStatement1Text}
        />
        <SupportingStatement
          icon={supportingStatement2Icon}
          text={supportingStatement2Text}
        />
        <SupportingStatement
          icon={supportingStatement3Icon}
          text={supportingStatement3Text}
        />
      </Row>
    </Padding>
  </Grid>
)

export default AboutUsHero
