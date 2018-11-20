import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding, Margin } from 'styled-components-spacing'
import Locations from '../../components/locations'
import { H2 } from '../../components/Typography'
import { FooterStyled, FollowUs, Social, OfficeStyled } from './elements.js'
import Office from './Office'

import social from './links'

const Footer = () => {
  return (
    <FooterStyled>
      <Padding
        top={{ phone: 3.5, tablet: 4 }}
        bottom={{ phone: 3.5, tablet: 4 }}
      >
        <Grid className="grid">
          <Row>
            <Col xs={12}>
              <Margin bottom={{ phone: 0.5, tablet: 2 }}>
                <H2 reverse noTop>
                  Find us
                </H2>
              </Margin>
            </Col>
          </Row>
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
        </Grid>
      </Padding>
      <FollowUs>
        <Padding top={3} bottom={{ phone: 1, tablet: 3 }}>
          <Grid className="grid">
            <Row>
              <Col xs={12}>
                <Social>
                  {social.map(s => (
                    <li key={s.label}>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={s.link}
                      >
                        <img src={s.img} alt={s.label} />
                      </a>
                    </li>
                  ))}
                </Social>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </FollowUs>
    </FooterStyled>
  )
}

export default Footer
