import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import { Link } from 'gatsby'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle } from '../../components/Typography'
import Locations from './Locations'
import Office from './Office'
import ExternalAnchor from '../Common/ExternalAnchor'

import { social, gdpr } from './links'

export const GreyFooter = styled.footer`
  background: #232323;
`

export const FollowUs = styled.section`
  background: ${props => props.theme.colors.black};
`

export const Social = styled.ul`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    li {
      margin-bottom: 24px;
    }
  }

  li:not(:last-child) {
    margin-right: 24px;
  }
`

export const OfficeStyled = styled(Row)`
  overflow: hidden;
`

const DesktopGDPR = styled.div`
  visibility: hidden;
  position: absolute;
  right: 0;
  color: white;

  a {
    margin-left: 24px;
  }

  ${breakpoint('desktop')`
    visibility: visible;
  `}
`

const MobileGDPR = styled.div`
  color: white;

  a {
    display: inline-block;
    margin-right: 24px;
    margin-bottom: 24px;
  }

  ${breakpoint('desktop')`
    visibility: hidden;
  `}
`

const LinkUnderline = styled(Link)`
  text-decoration: underline;
`

const gdprLinksElement = gdpr.map(link => (
  <LinkUnderline key={link.text} to={link.to}>
    {link.text}
  </LinkUnderline>
))

const Footer = () => (
  <GreyFooter>
    <Padding top={{ smallPhone: 3, tablet: 4 }}>
      <Grid>
        <Row>
          <Col width={1}>
            <Padding bottom={3}>
              <SectionTitle reverse>Find us</SectionTitle>
            </Padding>
          </Col>
        </Row>
        <Padding bottom={{ smallPhone: 3.5, tablet: 5 }}>
          <OfficeStyled>
            <Locations>
              {data =>
                data.map(location => {
                  const streetAddress = location.node.streetAddress.streetAddress.split(
                    '\n'
                  )

                  return (
                    <Office
                      key={location.node.id}
                      {...location.node}
                      streetAddress={streetAddress}
                    />
                  )
                })
              }
            </Locations>
          </OfficeStyled>
        </Padding>
      </Grid>
    </Padding>
    <FollowUs>
      <Padding top={3} bottom={3}>
        <Grid>
          <Row>
            <Col width={1}>
              <Social>
                {social.map(s => (
                  <li key={s.label}>
                    <ExternalAnchor href={s.link}>
                      <img src={s.img} alt={s.label} />
                    </ExternalAnchor>
                  </li>
                ))}
                <DesktopGDPR>{gdprLinksElement}</DesktopGDPR>
              </Social>
            </Col>
          </Row>
        </Grid>
      </Padding>
    </FollowUs>
    <Grid>
      <Row>
        <Col width={1}>
          <Padding bottom={3}>
            <MobileGDPR>{gdprLinksElement}</MobileGDPR>
          </Padding>
        </Col>
      </Row>
    </Grid>
  </GreyFooter>
)

export default Footer
