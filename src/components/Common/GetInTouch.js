import React from 'react'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Row, Col, Grid } from '../grid'
import { DisplayTitle, BodyPrimary } from '../Typography'

import StyledLink from './StyledLink'

const Profile = props => {
  const { title, genericCopy, genericCtaText, genericCtaUrl } = props
  return (
    <Grid>
      <Row>
        <Col width={[1, 1, 1, 1, 6 / 12]}>
          <DisplayTitle>{title}</DisplayTitle>
        </Col>
        <Col width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
          <BodyPrimary>{genericCopy.genericCopy}</BodyPrimary>
          <StyledLink to={genericCtaUrl} title={genericCtaText}>
            {genericCtaText}
          </StyledLink>
        </Col>
      </Row>
    </Grid>
  )
}

const GenericRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]};
    padding-bottom: ${({ theme }) => theme.space[5]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const GenericCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const Generic = props => {
  const { title, genericCopy, genericCtaText, genericCtaUrl } = props
  return (
    <Grid>
      <GenericRow>
        <GenericCol width={[1]}>
          <DisplayTitle>{title}</DisplayTitle>
        </GenericCol>
        <GenericCol width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
          <BodyPrimary noPadding>{genericCopy.genericCopy}</BodyPrimary>
        </GenericCol>
        <Col width={[1]}>
          <StyledLink to={genericCtaUrl} title={genericCtaText}>
            {genericCtaText}
          </StyledLink>
        </Col>
      </GenericRow>
    </Grid>
  )
}
const GetInTouch = props => {
  const { genericCopy } = props
  return genericCopy ? <Generic {...props} /> : <Profile {...props} />
}

GetInTouch.propTypes = {
  title: PropTypes.string.isRequired,
  contactText: PropTypes.string.isRequired,
  ctaText: PropTypes.string.isRequired
}

GetInTouch.defaultProps = {
  ctaText: 'Get in touch'
}

export default GetInTouch
