import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import { Padding } from 'styled-components-spacing'

import BlueBG from '../Common/BlueBG'
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

const SubsidiariesSection = ({ yldGroupTitle, subsidiaries }) => (
  <BlueBG>
    <Grid>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
          <SectionTitle reverse>{yldGroupTitle}</SectionTitle>
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
          }}
        </ColumnLayout>
      </Padding>
    </Grid>
  </BlueBG>
)

export default SubsidiariesSection
