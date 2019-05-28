import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import { Link } from 'gatsby'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../../components/grid'
import ExternalAnchor from '../Common/ExternalAnchor'

import { social, gdpr } from './links'

export const FooterBanner = styled.section`
  background: ${props => props.theme.colors.black};
`

export const Social = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: ${remcalc(24)};

  @media (max-width: 500px) {
    li {
      margin-bottom: ${remcalc(24)};
    }
  }

  li:not(:last-child) {
    margin-right: ${remcalc(24)};
  }
`

const GDPR = styled.div`
  display: flex;
  height: ${remcalc(48)};
  align-items: center;
  color: white;

  a {
    padding: 0 ${remcalc(36)} 0 0;
  }

  ${breakpoint('desktop')`
    align-items: flex-start;
    justify-content: flex-end;
    padding: 0 0 0 ${remcalc(36)};
  `}
`

const LinkUnderline = styled(Link)`
  text-decoration: underline;
`

const FooterLinks = () => (
  <FooterBanner>
    <Padding top={3} bottom={3}>
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 1, 1, 1 / 2]}>
            <Social>
              {social.map(link => (
                <li key={link.label}>
                  <ExternalAnchor href={link.to}>
                    <img src={link.img} alt={link.label} />
                  </ExternalAnchor>
                </li>
              ))}
            </Social>
          </Col>
          <Col width={[1, 1, 1, 1, 1, 1, 1 / 2]}>
            <GDPR>
              {gdpr.map(link => (
                <LinkUnderline key={link.label} to={link.to}>
                  {link.label}
                </LinkUnderline>
              ))}
            </GDPR>
          </Col>
        </Row>
      </Grid>
    </Padding>
  </FooterBanner>
)

export default FooterLinks
