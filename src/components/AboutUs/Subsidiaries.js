import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'

import BlueBackground from '../Common/BlueBackground'
import Image from '../Common/Image'
import { Grid, Row, Col } from '../grid'
import { SectionTitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'

const PaddedCol = styled(Col)`
  flex-direction: column;
  align-items: flex-start;

  ${breakpoint('smallPhone')`
    padding-bottom: ${props => props.theme.spacing[3]}
    &:last-child {
      padding-bottom: 0
    }
  `}
  ${breakpoint('tablet')`
    padding-bottom: 0
  `}
`

const Subsidiary = ({ image, description, linkUrl, linkText }) => (
  <PaddedCol block={false} width={[1, 1, 1, 1, 1 / 2]}>
    <Image image={image} width="250px" />
    <BodyPrimary reverse muted>
      {description}
    </BodyPrimary>
    {linkText ? (
      <StyledLink reverse href={linkUrl}>
        {linkText}
      </StyledLink>
    ) : null}
  </PaddedCol>
)

const Subsidiaries = ({ title, subsidiaries }) => (
  <BlueBackground>
    <Grid>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
          <SectionTitle reverse>{title}</SectionTitle>
        </Padding>
        <Row>
          {subsidiaries.map((subsidiary, idx) => {
            const {
              description: { description },
              image,
              linkUrl,
              linkText
            } = subsidiary

            return (
              <Subsidiary
                key={idx}
                image={image}
                description={description}
                linkText={linkText}
                linkUrl={linkUrl}
              />
            )
          })}
        </Row>
      </Padding>
    </Grid>
  </BlueBackground>
)

export default Subsidiaries
