import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding, Margin } from 'styled-components-spacing'
import Locations from '../../components/locations'
import { H2, H5, Paragraph } from '../../components/Typography'
import { FooterStyled, FollowUs, Node, Social, Office } from './elements.js'

import social from './links'

const Footer = () => {
  return (
    <FooterStyled>
      <Padding top={4} bottom={5}>
        <Grid className="grid">
          <Row>
            <Col xs={12}>
              <Margin bottom={2}>
                <H2 reverse>Find us</H2>
              </Margin>
            </Col>
          </Row>
          <Office>
            <Locations>
              {data =>
                data.map(location => (
                  <Col key={location.node.id} xs={12} sm={6} md={3}>
                    <Margin bottom={1}>
                      <H5 bold reverse>
                        {location.node.name}
                      </H5>
                    </Margin>
                    <Paragraph>
                      {location.node.streetAddress.streetAddress
                        .split('\n')
                        .map(address => (
                          <Node key={address}>{address}</Node>
                        ))}

                      <Node>{location.node.telephone}</Node>
                      {location.node.email ? (
                        <Node>
                          <a href={`mailto:${location.node.email}`}>
                            {location.node.email}
                          </a>
                        </Node>
                      ) : null}
                    </Paragraph>
                  </Col>
                ))
              }
            </Locations>
          </Office>
        </Grid>
      </Padding>
      <FollowUs>
        <Padding vertical={3}>
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
