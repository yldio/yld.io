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

const showGetInTouch = pathname => {
  const path = pathname.replace(/^\/|\/$/gi, '')

  return (
    !['contact', 'training', 'join-us'].includes(path) &&
    !path.startsWith('speciality/')
  )
}

const Footer = () => (
  <Fragment>
    <Location>
      {({ location: { pathname } }) =>
        showGetInTouch(pathname) ? (
          <GetInTouch
            title="We're here to help"
            contactText="Our experts work with you to understand your goals and help you build the capabilties you need to succeed"
            ctaText="Contact Us"
          />
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
