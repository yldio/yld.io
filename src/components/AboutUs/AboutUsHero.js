import React from 'react'
import { Padding } from 'styled-components-spacing'
import Flex from 'styled-flex-component'
import styled from 'styled-components'

import { Grid, Row, Col } from '../grid'
import PaddedCol from './PaddedCol'
import Image from '../Common/Image'
import { SectionTitle, BodyPrimary } from '../Typography'

const ImageWrapper = styled(Flex)`
  width: 60px;
  height: 60px;
`

const SupportingStatement = ({ icon, text }) => (
  <PaddedCol width={[1, 1, 1, 1, 1 / 2, 1 / 3]}>
    <Padding bottom={1}>
      <ImageWrapper alignEnd>
        <Image image={icon} width="50px" />
      </ImageWrapper>
    </Padding>
    <BodyPrimary>{text}</BodyPrimary>
  </PaddedCol>
)

const AboutUsHero = ({ statementText, supportingStatements }) => (
  <Grid>
    <Padding
      top={{ smallPhone: 3.5, tablet: 5 }}
      bottom={{ smallPhone: 3.5, tablet: 5 }}
    >
      <Row>
        <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
          <Col width={[1, 1, 1, 1, 8 / 12, 10 / 12, 8 / 12]}>
            <SectionTitle as="h1">{statementText}</SectionTitle>
          </Col>
        </Padding>
      </Row>
      <Row>
        {supportingStatements.map((supportingStatement, idx) => (
          <SupportingStatement
            key={idx}
            icon={supportingStatement.icon}
            text={supportingStatement.text}
          />
        ))}
      </Row>
    </Padding>
  </Grid>
)

export default AboutUsHero
