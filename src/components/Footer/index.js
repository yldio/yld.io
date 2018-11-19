import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding, Margin } from 'styled-components-spacing'
import Locations from '../../components/locations'
import { H2, H5, Paragraph } from '../../components/Typography'
import { FooterStyled, FollowUs, Node, Social, Office } from './elements.js'

import social from './links'

const addressItemProps = ['streetAddress', 'addressLocality']

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
          <Office>
            <Locations>
              {data =>
                data.map(location => {
                  const streetAddress = location.node.streetAddress.streetAddress.split(
                    '\n'
                  )
                  return (
                    <Col key={location.node.id} xs={12} md={3}>
                      <Margin bottom={1}>
                        <span itemProp="name" style={{ display: 'none' }}>
                          YLD
                        </span>
                        <H5 bold reverse>
                          {location.node.name}
                        </H5>
                      </Margin>
                      <Paragraph>
                        <span>
                          {streetAddress.map((address, i) => {
                            return <Node key={address}>{address}</Node>
                          })}
                        </span>
                        <Node itemProp="telephone">
                          {location.node.telephone}
                        </Node>
                        {location.node.email ? (
                          <Node>
                            <a href={`mailto:${location.node.email}`}>
                              {location.node.email}
                            </a>
                          </Node>
                        ) : null}
                      </Paragraph>
                    </Col>
                  )
                })
              }
            </Locations>
          </Office>
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
