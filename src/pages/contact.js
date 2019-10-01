import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import generate from 'shortid'
import breakpoint from 'styled-components-breakpoint'

import Head from '../components/Common/Head'
import Image from '../components/Common/Image'
import Hr from '../components/Common/Hr'
import StyledLink from '../components/Common/StyledLink'
import GreyBackground from '../components/Common/GreyBackground'
import {
  SectionTitle,
  BodyPrimary,
  Subtitle,
  DisplayTitle
} from '../components/Typography'

import { Grid, Row, Col } from '../components/grid'
import generateBreadcrumbData from '../utils/generateBreadcrumbData'
import Layout from '../components/layout'
import StaffCard from '../components/AboutUs/StaffCard'

import Map from '../components/ContactUs/Map'

const MapGroup = ({ locations = [] }) => {
  const mappedLocations = locations.map(({ mapLocation }) => {
    return { lng: mapLocation.lon, lat: mapLocation.lat }
  })

  return (
    mappedLocations &&
    mappedLocations.length > 0 && <Map locations={mappedLocations} />
  )
}

const LocationWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const IntroSectionRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[5]};
  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]};
    `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[6]};
    `}
`

const IntroSectionTitleCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[3]};
  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[4]};
  `}
`

const TeamSectionRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: 0;

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const TeamSectionTitleCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const LocationCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const MapRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[7]};
`}
`

const MapWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallPhone', 'smallTablet')`
    display: none;
  `}
`

const ContactUs = ({
  location,
  data: {
    contentfulContactUsPage: page,
    allContentfulLocation: { group: locations },
    site: {
      siteMetadata: { siteUrl }
    }
  }
}) => {
  const { title, ctaUrl, ctaCopy, teamMembersTitle, teamMembers } = page

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      pathname: location.pathname,
      position: 2,
      name: 'Contact us'
    }
  ])

  const sortedGroups = locations.sort(({ nodes }) =>
    nodes.some(({ primaryLocation }) => primaryLocation) ? -1 : 1
  )

  return (
    <Layout
      location={location}
      displayFooterOffices={false}
      breadcrumbData={breadcrumbData}
    >
      <Head seoMetaData={page.seoMetaData} />

      <Grid>
        <IntroSectionRow>
          <IntroSectionTitleCol width={[1, 1, 1, 7 / 12]}>
            <SectionTitle as="h1">{title}</SectionTitle>
          </IntroSectionTitleCol>
          <Col width={[1]}>
            <StyledLink href={ctaUrl}>{ctaCopy}</StyledLink>
          </Col>
        </IntroSectionRow>
      </Grid>
      <GreyBackground>
        <Grid>
          <TeamSectionRow>
            <TeamSectionTitleCol width={[1]}>
              <DisplayTitle>{teamMembersTitle}</DisplayTitle>
            </TeamSectionTitleCol>
            {teamMembers &&
              teamMembers.length > 0 &&
              teamMembers.map(
                ({
                  name,
                  contactUsDescription,
                  footerRole,
                  image,
                  socialLinks,
                  contactUsRole,
                  emailAddress
                }) => (
                  <StaffCard
                    colWidths={[1, 1, 1, 1 / 2, 1 / 2, 4 / 12, 4 / 12]}
                    paddingBottom={{
                      smallTablet: 4,
                      tablet: '0',
                      desktop: '0'
                    }}
                    key={`staff-${name}`}
                    name={name}
                    contactUsRole={contactUsRole}
                    description={contactUsDescription.contactUsDescription}
                    role={footerRole}
                    image={image}
                    emailAddress={emailAddress}
                    socialLinks={socialLinks}
                  />
                )
              )}
          </TeamSectionRow>
          <Row>
            <Col width={[1]}>
              <Hr />
            </Col>
          </Row>
          <MapRow>
            {sortedGroups &&
              sortedGroups.length > 0 &&
              sortedGroups.map(({ nodes = [] }) => {
                return (
                  <Col key={generate()} width={[1, 1, 1, 1, 1 / 2, 1 / 2]}>
                    <MapWrapper>
                      <MapGroup locations={nodes} />
                    </MapWrapper>

                    <Row>
                      {nodes.map(
                        ({
                          name,
                          telephone,
                          markerIcon,
                          email,
                          streetAddress
                        }) => (
                          <LocationCol
                            key={generate()}
                            width={[1, 1, 1, 1, 1, 1, 1 / 2, 1 / 2]}
                          >
                            <LocationWrapper>
                              <Image image={markerIcon} />
                            </LocationWrapper>
                            <Subtitle bold>{name}</Subtitle>
                            {streetAddress.streetAddress
                              .split('\n')
                              .map(address => (
                                <BodyPrimary noPadding key={address}>
                                  {address}
                                </BodyPrimary>
                              ))}

                            {telephone && (
                              <BodyPrimary itemProp="telephone" noPaddingBottom>
                                {telephone}
                              </BodyPrimary>
                            )}

                            {email && (
                              <BodyPrimary noPaddingTop={telephone}>
                                <a
                                  href={`mailto:${email}`}
                                  title={`Email yld ${name} Office`}
                                >
                                  {email}
                                </a>
                              </BodyPrimary>
                            )}
                          </LocationCol>
                        )
                      )}
                    </Row>
                  </Col>
                )
              })}
          </MapRow>
        </Grid>
      </GreyBackground>
    </Layout>
  )
}

const Contact = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        contentfulContactUsPage {
          title
          seoMetaData {
            ...SEOMetaFields
          }
          ctaUrl
          ctaCopy
          teamMembersTitle
          teamMembers {
            name
            role
            contactUsRole
            footerRole
            emailAddress
            contactUsDescription {
              contactUsDescription
            }
            image {
              title
              file {
                url
              }
              fluid(maxWidth: 500) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
            socialLinks {
              name
              url
              image {
                title
                file {
                  url
                }
                fluid(maxWidth: 30) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
            }
          }
        }
        allContentfulLocation(sort: { fields: createdAt }) {
          group(field: country) {
            nodes {
              id
              name
              primaryLocation
              markerIcon {
                title
                file {
                  url
                }
                fluid(maxWidth: 30) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              mapLocation {
                lon
                lat
              }
              telephone
              email
              country
              streetAddress {
                id
                streetAddress
              }
            }
          }
        }
      }
    `}
    render={data => <ContactUs data={data} {...props} />}
  />
)

export default Contact
