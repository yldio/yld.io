import React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import generate from 'shortid'
import Helmet from 'react-helmet'

import Head from '../components/Common/Head'
import Image from '../components/Common/Image'
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

const MapGroup = ({ nodes = [] }) => {
  const locations = nodes.map(({ mapLocation }) => {
    return { lng: mapLocation.lon, lat: mapLocation.lat }
  })

  return <Map locations={locations} />
}

const LocationWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: ${({ theme }) => theme.space[2]};
`

const ContactUs = ({
  location,
  data: {
    contentfulContactUsPage: page,
    allContentfulLocation: { group: locations }
  }
}) => {
  const { title, ctaUrl, ctaCopy, teamMembersTitle, teamMembers } = page

  const flattenedLocations = locations.reduce(
    (acc, { nodes }) => acc.concat(nodes),
    []
  )

  console.log({ flattenedLocations })
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
        <Row>
          <Col width={[1, 1, 1, 7 / 12]}>
            <SectionTitle>{title}</SectionTitle>
          </Col>
          <Col width={[1]}>
            <StyledLink href={ctaUrl}>{ctaCopy}</StyledLink>
          </Col>
        </Row>
      </Grid>
      <GreyBackground>
        <Grid>
          <Row>
            <Col width={[1]}>
              <DisplayTitle>{teamMembersTitle}</DisplayTitle>
            </Col>
            {teamMembers &&
              teamMembers.length > 0 &&
              teamMembers.map(
                ({ name, description, role, image, socialLinks }) => (
                  <StaffCard
                    key={`staff-${name}`}
                    name={name}
                    description={description.description}
                    role={role}
                    image={image}
                    socialLinks={socialLinks}
                  />
                )
              )}
          </Row>
        </Grid>
      </GreyBackground>
      {locations && locations.length > 0 && (
        <Grid>
          <Row>
            {locations.map(location => {
              return (
                <Col key={generate()} width={[1, 1, 1, 6 / 12]}>
                  <MapGroup {...location} />
                </Col>
              )
            })}
            <Col />
          </Row>
          <Row>
            {flattenedLocations.map(
              ({ name, telephone, markerIcon, email, streetAddress }) => (
                <Col key={generate()} width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
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
                    <BodyPrimary itemProp="telephone" hasPaddingTop={telephone}>
                      {telephone}
                    </BodyPrimary>
                  )}

                  {email && (
                    <BodyPrimary hasPaddingTop={email && !telephone}>
                      <a
                        href={`mailto:${email}`}
                        title={`Email yld ${name} Office`}
                      >
                        {email}
                      </a>
                    </BodyPrimary>
                  )}
                </Col>
              )
            )}
          </Row>
        </Grid>
      )}
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
        allContentfulLocation {
          group(field: country) {
            nodes {
              id
              name
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
