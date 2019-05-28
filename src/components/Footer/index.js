import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle } from '../../components/Typography'
import OfficeListing from './OfficeListing'
import FooterLinks from './FooterLinks'

export const GreyFooter = styled.footer`
  background: #232323;
`

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
        <OfficeListing />
      </Grid>
    </Padding>
    <FooterLinks />
  </GreyFooter>
)

export default Footer
