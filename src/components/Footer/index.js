import React from 'react'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle } from '../../components/Typography'
import GetInTouch from '../Common/GetInTouch'
import OfficeListing from './OfficeListing'
import FooterLinks from './FooterLinks'
import { StaticQuery, graphql } from 'gatsby'

export const GreyFooter = styled.footer`
  background: #232323;
`

const colorMap = {
  White: 'white',
  Grey: 'greyBg'
}

const Wrapper = styled.div`
  background-color: ${({ theme, bgColor = 'white' }) => {
    const mappedColor = colorMap[bgColor]
    return mappedColor ? theme.colors[mappedColor] : theme.colors[bgColor]
  }};
`

const QUERY = graphql`
  {
    profiles: allContentfulFooterContactUsProfile {
      nodes {
        id
        backgroundColor
        person {
          name
          footerRole
          emailAddress
          description {
            description
          }
          image {
            title
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
            file {
              url
            }
          }
          socialLinks {
            name
            url
            image {
              title
              fluid(maxWidth: 30) {
                ...GatsbyContentfulFluid_withWebp
              }
              file {
                url
              }
            }
          }
        }
        title
        personCopyTitle
        personCopy {
          personCopy
        }
        personCtaCopy
        personCtaLinkUrl
        personCtaLinkCopy
        genericCopy {
          genericCopy
        }
        genericCtaUrl
        genericCtaText
      }
    }
  }
`

const Footer = ({ is404, footerContactUsId, displayFooterOffices = true }) => (
  <StaticQuery
    query={QUERY}
    render={({ profiles }) => {
      const footerContactUsData = profiles.nodes.find(
        ({ id }) => id === footerContactUsId
      )

      return (
        <>
          {!!footerContactUsId && !is404 && (
            <Wrapper bgColor={footerContactUsData.backgroundColor}>
              <GetInTouch {...footerContactUsData} />
            </Wrapper>
          )}
          <GreyFooter>
            {displayFooterOffices && (
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
            )}
            <FooterLinks />
          </GreyFooter>
        </>
      )
    }}
  />
)

export default Footer
