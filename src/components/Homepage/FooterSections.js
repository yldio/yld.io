import React from 'react'
import generate from 'shortid'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import remcalc from 'remcalc'

import { Grid, Row, Col } from '../grid'
import Image from '../Common/Image'
import StyledLink from '../Common/StyledLink'
import { CardTitle, BodyPrimary } from '../Typography'

const FooterCTAInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: white;
  padding: ${remcalc(24)} ${remcalc(30)};

  > img {
    width: 60px;
    margin-bottom: ${({ theme }) => theme.space[2]};
  }
`

const StyledRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`

const StyledCol = styled(Col)`
  ${breakpoint('smallPhone', 'smallTablet')`
    
  padding-bottom: ${({ theme }) => theme.space[4]};
`}
`

/**
 * Usually I would opt to have these in content types but at
 * time of writing we've reach our limit and need to be a bit
 * more conservative of what we create content types for!
 */
const FooterSections = ({
  footerSection1Icon,
  footerSection1Title,
  footerSection1Copy,
  footerSection1CtaCopy,
  footerSection1CtaLink,
  footerSection2Icon,
  footerSection2Title,
  footerSection2Copy,
  footerSection2CtaCopy,
  footerSection2CtaLink
}) => (
  <Grid>
    <StyledRow>
      <StyledCol width={[1, 1, 1, 6 / 12]} key={generate()} block={false}>
        <FooterCTAInner>
          {footerSection1Icon && <Image image={footerSection1Icon} />}
          <CardTitle>{footerSection1Title}</CardTitle>
          <BodyPrimary>{footerSection1Copy}</BodyPrimary>
          <StyledLink to={footerSection1CtaLink}>
            {footerSection1CtaCopy}
          </StyledLink>
        </FooterCTAInner>
      </StyledCol>
      <StyledCol width={[1, 1, 1, 6 / 12]} key={generate()} block={false}>
        <FooterCTAInner>
          {footerSection2Icon && <Image image={footerSection2Icon} />}
          <CardTitle>{footerSection2Title}</CardTitle>
          <BodyPrimary>{footerSection2Copy}</BodyPrimary>
          <StyledLink to={footerSection2CtaLink}>
            {footerSection2CtaCopy}
          </StyledLink>
        </FooterCTAInner>
      </StyledCol>
    </StyledRow>
  </Grid>
)

export default FooterSections
