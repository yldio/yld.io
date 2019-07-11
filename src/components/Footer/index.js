import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import { Location } from '@reach/router'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle } from '../../components/Typography'
import GetInTouch from '../Common/GetInTouch'
import OfficeListing from './OfficeListing'
import FooterLinks from './FooterLinks'

export const GreyFooter = styled.footer`
  background: #232323;
`

const Wrapper = styled.div`
  background-color: ${({ theme, bgColor = 'white' }) => theme.colors[bgColor]};
`

const getPathnameWithSlashes = pathname => pathname.replace(/^\/|\/$/gi, '')

const showGetInTouch = pathname => {
  const path = getPathnameWithSlashes(pathname)

  return (
    !['contact', 'training', 'join-us'].includes(path) &&
    !path.startsWith('speciality/')
  )
}

const getBackgroundColor = (pathname, is404 = false) => {
  /**
   * This is pretty horrible I know but as "pathname" is
   * one of the only semi-reliable ways to know our exact
   * location and 404s don't redirect to "/404", we have
   * to pass down `is404` as a prop here to know that we
   * are for sure on a 404.
   */
  if (is404) {
    return 'greyBg'
  }

  const path = getPathnameWithSlashes(pathname)
  /**
   * These pages all have a final white component so we make sure
   * to add a grey background to give them some distinction
   */
  const colors = {
    greyBg: ['engineering', 'design', 'training ', 'about-us', 'open-source']
  }

  return Object.keys(colors).find(key => colors[key].includes(path))
}

const Footer = ({ is404 }) => (
  <Fragment>
    <Location>
      {({ location: { pathname } }) =>
        showGetInTouch(pathname) ? (
          <Wrapper bgColor={getBackgroundColor(pathname, is404)}>
            <GetInTouch
              title="We're here to help"
              contactText="Our experts work with you to understand your goals and help you build the capabilities you need to succeed"
              ctaText="Contact us"
            />
          </Wrapper>
        ) : null
      }
    </Location>
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
          <OfficeListing />
        </Grid>
      </Padding>
      <FooterLinks />
    </GreyFooter>
  </Fragment>
)

export default Footer
