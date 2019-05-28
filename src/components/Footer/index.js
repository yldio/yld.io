import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle } from '../../components/Typography'
import FooterLinks from './footer-links'
import Locations from './Locations'
import Office from './Office'

export const GreyFooter = styled.footer`
  background: #232323;
`

export const OfficeStyled = styled(Row)`
  overflow: hidden;
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
    <FooterLinks />
  </GreyFooter>
)

export default Footer
