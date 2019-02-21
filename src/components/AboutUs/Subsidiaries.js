import React from 'react'
import { Padding } from 'styled-components-spacing'

import BlueBackground from '../Common/BlueBackground'
import Image from '../Common/Image'
import { Grid, Row } from '../grid'
import { SectionTitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'
import PaddedCol from './PaddedCol'

const Subsidiary = ({ image, description, linkUrl, linkText }) => (
  <PaddedCol width={[1, 1, 1, 1, 6 / 12, 6 / 12, 5 / 12]}>
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
        <Row spaced>
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
