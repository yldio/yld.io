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
  justify-content: space-between;
  background: white;
  padding: ${remcalc(24)} ${remcalc(36)};
`

const Content = styled.section`
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

    :last-child {
      padding-bottom: 0;
    }
  `}
`

const StyledCardTitle = styled(CardTitle)`
  ${breakpoint('tablet')`
    font-size: ${({ theme }) => theme.spacing[32]};
  `}
`

const CustomLink = styled(StyledLink)`
  font-size: ${({ theme }) => theme.spacing[1.5]};
  margin-bottom: ${({ theme }) => theme.space[2]};
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
      <StyledCol width={[1, 1, 1, 1, 6 / 12]} key={generate()} block={false}>
        <FooterCTAInner>
          <Content>
            {footerSection1Icon && <Image image={footerSection1Icon} />}
            <StyledCardTitle>{footerSection1Title}</StyledCardTitle>
            <BodyPrimary>{footerSection1Copy}</BodyPrimary>
          </Content>
          <CustomLink to={footerSection1CtaLink}>
            {footerSection1CtaCopy}
          </CustomLink>
        </FooterCTAInner>
      </StyledCol>
      <StyledCol width={[1, 1, 1, 1, 6 / 12]} key={generate()} block={false}>
        <FooterCTAInner>
          <Content>
            {footerSection2Icon && <Image image={footerSection2Icon} />}
            <StyledCardTitle>{footerSection2Title}</StyledCardTitle>
            <BodyPrimary>{footerSection2Copy}</BodyPrimary>
          </Content>
          <CustomLink to={footerSection2CtaLink}>
            {footerSection2CtaCopy}
          </CustomLink>
        </FooterCTAInner>
      </StyledCol>
    </StyledRow>
  </Grid>
)

export default FooterSections
