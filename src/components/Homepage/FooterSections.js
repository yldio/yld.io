import React from 'react'
import generate from 'shortid'
import styled from 'styled-components'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../grid'
import Image from '../Common/Image'
import StyledLink from '../Common/StyledLink'
import { CardTitle, BodyPrimary } from '../Typography'

const FooterCTAInner = styled.div`
  background: white;
  padding: ${remcalc(30)};
`

const footerCtaData = [
  {
    title: 'Hire us',
    copy: 'join us bvla alasd',
    ctaCopy: 'Get in touch',
    ctaLink: '/contact'
  },
  {
    title: 'Join Us',
    copy: 'join us bvla alasd',
    ctaCopy: 'Learn more',
    ctaLink: '/join-us'
  }
]

const StyledRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[4]};
`

const FooterSections = () => (
  <Grid>
    <StyledRow>
      {footerCtaData.map(({ icon, title, copy, ctaCopy, ctaLink }) => (
        <Col width={[1, 1, 1, 6 / 12]} key={generate()}>
          <FooterCTAInner>
            {icon && <Image image={icon} />}
            <CardTitle>{title}</CardTitle>
            <BodyPrimary>{copy}</BodyPrimary>
            <StyledLink to={ctaLink}>{ctaCopy}</StyledLink>
          </FooterCTAInner>
        </Col>
      ))}
    </StyledRow>
  </Grid>
)

export default FooterSections
