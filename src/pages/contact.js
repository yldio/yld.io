import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import generate from 'shortid'
import Helmet from 'react-helmet'

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
import Layout from '../components/layout'
import StaffCard from '../components/AboutUs/StaffCard'

import Map from '../components/ContactUs/Map'
import breakpoint from 'styled-components-breakpoint'

const { GMAPS_API_KEY } = process.env

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
`

const IntroSectionTitleCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[3]};
`

const TeamSectionRow = styled(Row)`
  padding-top: ${({ theme }) => theme.space[5]};
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const TeamSectionTitleCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const TeamHrCol = styled(Col)`
  ${breakpoint('desktop')`
    display: none;
    `}
`

const LocationCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const MapRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallPhone', 'largePhone')`
    display: none;
  `}
`

const LocationsRow = styled(Row)`
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const ContactUs = ({
  location,
  data: {
    contentfulContactUsPage: page,
    allContentfulLocation: { nodes: locations }
  }
}) => {
  const { title, ctaUrl, ctaCopy, teamMembersTitle, teamMembers } = page

  const groupedLocations = locations
    .sort(({ primaryLocation }) => (primaryLocation ? -1 : 1))
    .reduce((acc, curr) => {
      const { country } = curr
      return {
        ...acc,
        [country]: acc[country] ? acc[country].concat(curr) : [curr]
      }
    }, [])

  return (
    <Layout location={location} displayFooterOffices={false}>
      <Helmet>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${'AIzaSyBKK8Yx8_oj20eSw4pqnsflHrEsTHjnG5k'}`}
        />
      </Helmet>
      <Head seoMetaData={{ title: 'contact us' }} />

      <Grid>
        <IntroSectionRow>
          <IntroSectionTitleCol width={[1, 1, 1, 7 / 12]}>
            <SectionTitle>{title}</SectionTitle>
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
                ({ name, description, role, image, socialLinks }) => (
                  <StaffCard
                    colWidths={[1, 1, 1, 1 / 2, 1 / 2, 1 / 2, 4 / 12]}
                    paddingBottom={{ tablet: 3, smallTablet: 3 }}
                    key={`staff-${name}`}
                    name={name}
                    description={description.description}
                    role={role}
                    image={image}
                    socialLinks={socialLinks}
                  />
                )
              )}
            <TeamHrCol width={[1]}>
              <Hr />
            </TeamHrCol>
          </TeamSectionRow>

          {locations && locations.length > 0 && (
            <>
              <MapRow>
                {Object.keys(groupedLocations).map(group => {
                  return (
                    <Col key={generate()} width={[1, 1, 1, 6 / 12]}>
                      <MapGroup locations={groupedLocations[group]} />
                    </Col>
                  )
                })}
                <Col />
              </MapRow>
              <LocationsRow>
                {locations.map(
                  ({ name, telephone, markerIcon, email, streetAddress }) => (
                    <LocationCol
                      key={generate()}
                      width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 2, 1 / 4]}
                    >
                      <LocationWrapper>
                        <Image image={markerIcon} />
                      </LocationWrapper>
                      <Subtitle bold>{name}</Subtitle>
                      {streetAddress.streetAddress.split('\n').map(address => (
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
              </LocationsRow>
            </>
          )}
        </Grid>
      </GreyBackground>
    </Layout>
  )
}

const Contact = props => (
  <StaticQuery
    query={graphql`
      query {
        contentfulContactUsPage {
          title
          ctaUrl
          ctaCopy
          teamMembersTitle
          teamMembers {
            name
            role
            description {
              description
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
    `}
    render={data => <ContactUs data={data} {...props} />}
  />
)

export default Contact
