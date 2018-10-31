import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import styled from 'styled-components'
import { Padding, Margin } from 'styled-components-spacing'
import Locations from '../components/locations'
import { H2, H4, Paragraph } from '../components/typography'

const FooterStyled = styled.footer`
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
`

const FollowUs = styled.section`
  background: ${props => props.theme.colors.black};
  display: flex;
  align-items: center;
`

const Node = styled.span`
  opacity: 0.5;
  color: ${props => props.theme.colors.white};
  display: block;
  margin-bottom: 6px;
`

const Footer = () => {
  return (
    <Margin top={5}>
      <FooterStyled>
        <Padding top={4} bottom={5}>
          <Grid>
            <Row>
              <Col xs={22}>
                <H2 reverse>Find us</H2>
              </Col>
            </Row>
            <Row>
              <Locations>
                {data =>
                  data.map(location => (
                    <Col key={location.node.id} xs={12} sm={6} md={3}>
                      <H4 reverse>{location.node.name}</H4>
                      <Paragraph>
                        <Node>{location.node.streetAddress.streetAddress}</Node>
                        <Node>{location.node.floor}</Node>
                        <Node>{location.node.postCode}</Node>
                        <Node>{location.node.telephone}</Node>
                        <Node>
                          <a href={`mailto:${location.node.email}`}>
                            {location.node.email}
                          </a>
                        </Node>
                      </Paragraph>
                    </Col>
                  ))
                }
              </Locations>
            </Row>
          </Grid>
        </Padding>
        <FollowUs>
          <Padding vertical={3}>
            <Grid>
              <Row>
                <Col xs={12}>things</Col>
              </Row>
            </Grid>
          </Padding>
        </FollowUs>
      </FooterStyled>
    </Margin>
  )
}

export default Footer
