import React, { Fragment } from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'

import BlueBackground from '../Common/BlueBackground'
import Image from '../Common/Image'
import { Grid, ColumnLayout, Col } from '../grid'
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
  <Fragment>
    <Image image={image} width="250px" />
    <BodyPrimary reverse muted>
      {description}
    </BodyPrimary>
    {linkText ? (
      <StyledLink reverse href={linkUrl}>
        {linkText}
      </StyledLink>
    ) : null}
  </Fragment>
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
        <ColumnLayout cols={2} items={subsidiaries}>
          {({ Col, item: subsidiary }) => {
            const {
              description: { description },
              image,
              linkUrl,
              linkText
            } = subsidiary

            return (
              <PaddedCol block={false}>
                <Subsidiary
                  image={image}
                  description={description}
                  linkText={linkText}
                  linkUrl={linkUrl}
                />
              </PaddedCol>
            )
          }}
        </ColumnLayout>
      </Padding>
    </Grid>
  </BlueBackground>
)

export default Subsidiaries
