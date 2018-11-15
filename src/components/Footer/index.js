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
        top={{ mobile: 3.5, tablet: 4 }}
        bottom={{ mobile: 3.5, tablet: 4 }}
      >
        <Grid className="grid">
          <Row>
            <Col xs={12}>
              <Margin bottom={{ mobile: 0.5, tablet: 2 }}>
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
                    <Col
                      key={location.node.id}
                      xs={12}
                      md={3}
                      itemScope
                      itemType="http://schema.org/LocalBusiness"
                    >
                      <Margin bottom={1}>
                        <span itemProp="name" style={{ display: 'none' }}>
                          YLD
                        </span>
                        <H5
                          bold
                          reverse
                          itemProp="location"
                          itemType="http://schema.org/Text"
                        >
                          {location.node.name}
                        </H5>
                      </Margin>
                      <Paragraph>
                        <span
                          itemProp="address"
                          itemScope
                          itemType="http://schema.org/PostalAddress"
                        >
                          {streetAddress.map((address, i) => {
                            let schemaType =
                              (i === streetAddress.length - 1
                                ? 'postalCode'
                                : addressItemProps[i]) || addressItemProps[0]
                            return (
                              <Node key={address} itemProp={schemaType}>
                                {address}
                              </Node>
                            )
                          })}
                        </span>
                        <Node itemProp="telephone">
                          {location.node.telephone}
                        </Node>
                        {location.node.email ? (
                          <Node>
                            <a
                              href={`mailto:${location.node.email}`}
                              itemProp="email"
                            >
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
        <Padding top={3} bottom={{ mobile: 1, tablet: 3 }}>
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
