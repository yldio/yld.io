import React from 'react'
import StyledLink from '../Common/StyledLink'
import styled from 'styled-components'

import { Grid, Row, Col } from '../grid'
import { BodyPrimary, SectionTitle } from '../Typography'

import Image from '../Common/Image'

const JoinContentCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[7]};
  padding-bottom: ${({ theme }) => theme.space[7]};
`

const Join = props => {
  const { title, ctaTitle, ctaUrl, content, image } = props

  return (
    <Grid>
      <Row>
        <JoinContentCol width={[1, 1, 1, 1, 6 / 12]}>
          <SectionTitle reverse>{title}</SectionTitle>
          {content.content && (
            <BodyPrimary reverse>{content.content}</BodyPrimary>
          )}
          <StyledLink to={ctaUrl} reverse>
            {ctaTitle}
          </StyledLink>
        </JoinContentCol>
        <Col width={[1, 1, 1, 1, 6 / 12]}>
          <Image image={image} />
        </Col>
      </Row>
    </Grid>
  )
}

export default Join
