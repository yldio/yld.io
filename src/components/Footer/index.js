import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle } from '../../components/Typography'
import Locations from './Locations'
import Office from './Office'
import ExternalAnchor from '../Common/ExternalAnchor'

import social from './links'

export const GreyFooter = styled.footer`
  background: #232323;
`

export const FollowUs = styled.section`
  background: ${props => props.theme.colors.black};
`

export const Social = styled.ul`
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

export const OfficeStyled = styled(Row)`
  overflow: hidden;
`

const Footer = () => {
  return (
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
      <FollowUs>
        <Padding top={3} bottom={3}>
          <Grid>
            <Row>
              <Col width={1}>
                <Social>
                  {social.map(s => (
                    <li key={s.label}>
                      <ExternalAnchor href={s.link}>
                        <img src={s.img} alt={s.label} />
                      </ExternalAnchor>
                    </li>
                  ))}
                </Social>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </FollowUs>
    </GreyFooter>
  )
}

export default Footer
