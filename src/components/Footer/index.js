import React from 'react'
import { Grid, Row, Col } from '../../components/grid'
import { Padding, Margin } from 'styled-components-spacing'
import Locations from '../../components/locations'
import { SectionTitle } from '../../components/Typography'
import { FooterStyled, FollowUs, Social, OfficeStyled } from './elements.js'
import Office from './office'

import social from './links'

const Footer = () => {
  return (
    <FooterStyled>
      <Padding
        top={{ smallPhone: 3.5, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 4 }}
      >
        <Grid>
          <Row>
            <Col width={1}>
              <Margin bottom={{ smallPhone: 0.5, tablet: 2 }}>
                <SectionTitle reverse>Find us</SectionTitle>
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
        <Padding top={3} bottom={{ smallPhone: 1, tablet: 3 }}>
          <Grid>
            <Row>
              <Col width={1}>
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
