import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import styled from 'styled-components'
import { Padding, Margin } from 'styled-components-spacing'
import Locations from '../components/locations'
import { H2, H5, Paragraph } from '../components/Typography'

import behance from '../images/behance-icon.svg'
import dribbble from '../images/dribbble-icon.svg'
import github from '../images/github-icon.svg'
import medium from '../images/medium-icon.svg'
import twitter from '../images/twiter-icon.svg'
import youtube from '../images/youtube-icon.svg'
import instagram from '../images/instagram-icon.svg'
import linkedin from '../images/linkedin-icon.svg'

const FooterStyled = styled.footer`
  background: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.white};
`

const FollowUs = styled.section`
  background: ${props => props.theme.colors.black};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`

const Node = styled.span`
  opacity: 0.5;
  color: ${props => props.theme.colors.white};
  display: block;
  margin-bottom: 6px;
`

const Social = styled.ul`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    li {
      margin-bottom: 24px;
    }
  }

  li:not(:last-child) {
    margin-right: 24px;
  }
`

const Office = styled(Row)`
  overflow: hidden;
`

const Footer = () => {
  return (
    <Margin top={5}>
      <FooterStyled>
        <Padding top={4} bottom={5}>
          <Grid>
            <Row>
              <Col xs={12}>
                <H2 reverse>Find us</H2>
              </Col>
            </Row>
            <Office>
              <Locations>
                {data =>
                  data.map(location => (
                    <Col key={location.node.id} xs={12} sm={6} md={3}>
                      <H5 bold reverse>
                        {location.node.name}
                      </H5>
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
            <Grid>
              <Row>
                <Col xs={12}>
                  <Social>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://twitter.com/yldio"
                      >
                        <img src={twitter} alt="social" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="http://github.com/yldio"
                      >
                        <img src={github} alt="social" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.youtube.com/channel/UCjCCJWM2iVVhqjKzJ-Y9MvA"
                      >
                        <img src={youtube} alt="social" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://medium.com/yld-engineering-blog"
                      >
                        <img src={medium} alt="social" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/yld.io/"
                      >
                        <img src={instagram} alt="social" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/yld/"
                      >
                        <img src={linkedin} alt="social" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://dribbble.com/makeusproud"
                      >
                        <img src={dribbble} alt="social" />
                      </a>
                    </li>
                    <li>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.behance.net/MakeUsProud"
                      >
                        <img src={behance} alt="social" />
                      </a>
                    </li>
                  </Social>
                </Col>
              </Row>
            </Grid>
          </Padding>
        </FollowUs>
      </FooterStyled>
    </Margin>
  )
}

export default Footer
