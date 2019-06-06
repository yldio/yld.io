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

const getBackgroundColor = pathname => {
  const path = getPathnameWithSlashes(pathname)
  /**
   * These pages all have a final white component so we make sure
   * to add a grey background to give them some distinction
   */
  const colors = { greyBg: ['engineering', 'design', 'training ', 'about-us'] }

  return Object.keys(colors).find(key => colors[key].includes(path))
}

const Footer = () => (
  <Fragment>
    <Location>
      {({ location: { pathname } }) =>
        showGetInTouch(pathname) ? (
          <Wrapper bgColor={getBackgroundColor(pathname)}>
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
