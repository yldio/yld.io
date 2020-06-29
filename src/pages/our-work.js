import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import breakpoint from 'styled-components-breakpoint';
import generateBreadcrumbData from '../utils/generateBreadcrumbData';

import Layout from '../components/layout';
import { Grid, Row, Col } from '../components/grid';
import { DisplayTitle } from '../components/Typography';
import GreyBackground from '../components/Common/GreyBackground';
import Head from '../components/Common/Head';
import CaseStudies from '../components/Common/case-studies/CaseStudies';

const HeaderGrid = styled(Grid)`
  padding-top: 0; /* Header pads enough */
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[2]};
    padding-bottom: ${({ theme }) => theme.space[7]};
  `}
`;

const WorkGrid = styled(Grid)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[5]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[5]};
  `}

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`;

const formatCaseStudies = caseStudies =>
  caseStudies.edges.map(caseStudyObject => {
    const caseStudy = caseStudyObject.node;
    return {
      ...caseStudy,
      services: caseStudy.services
        .filter(service => service.title)
        .map(service => service.title),
    };
  });

const OurWork = ({ data, location }) => {
  const {
    allContentfulNonTemplatedCaseStudyV2,
    allContentfulTemplatedCaseStudy,
    contentfulOurWork: {
      title,
      description: { description },
      caseStudies,
      seoMetaData,
    },
    site: {
      siteMetadata: { siteUrl },
    },
  } = data;

  const allCaseStudies = [
    ...formatCaseStudies(allContentfulNonTemplatedCaseStudyV2),
    ...formatCaseStudies(allContentfulTemplatedCaseStudy),
  ];

  const displayOrderByIDs = caseStudies
    .filter(({ publish }) => publish)
    .map(({ id }) => id);

  const mappedFromContentfulOrder = displayOrderByIDs.map(orderedId =>
    allCaseStudies.find(cs => cs.id === orderedId),
  );
  const missingFromContentfulOrder = allCaseStudies.filter(
    cs => !displayOrderByIDs.includes(cs.id),
  );
  const orderedCaseStudies = [
    ...mappedFromContentfulOrder,
    ...missingFromContentfulOrder,
  ];

  const page = allContentfulTemplatedCaseStudy.edges[0].node;

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: 'Our work',
      pathname: location.pathname,
      position: 2,
    },
  ]);

  return (
    <Layout
      footerContactUsId={data.contentfulOurWork.footerContactUs.id}
      breadcrumbData={breadcrumbData}
      slug={title}
    >
      <Head page={page} seoMetaData={seoMetaData} />
      <HeaderGrid>
        <Row>
          <Col width={[1, 1, 1, 1, 9 / 12]}>
            <DisplayTitle regular secondary>
              {description}
            </DisplayTitle>
          </Col>
        </Row>
      </HeaderGrid>
      <GreyBackground>
        <WorkGrid>
          <CaseStudies caseStudies={orderedCaseStudies} />
        </WorkGrid>
      </GreyBackground>
    </Layout>
  );
};

const OurWorkPage = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
        contentfulOurWork {
          title
          description {
            description
          }
          seoMetaData {
            ...SEOMetaFields
          }
          caseStudies {
            ... on ContentfulNonTemplatedCaseStudyV2 {
              id
              publish
            }
            ... on ContentfulTemplatedCaseStudy {
              id
              publish
            }
          }
          footerContactUs {
            id
          }
        }

        allContentfulNonTemplatedCaseStudyV2(
          filter: { publish: { eq: true } }
        ) {
          edges {
            node {
              slug
              title
              client
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              reverseColor
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              previewImage {
                title
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
                file {
                  url
                }
              }
            }
          }
        }
        allContentfulTemplatedCaseStudy {
          edges {
            node {
              slug
              title
              client
              id
              services {
                ... on ContentfulService {
                  title
                }
              }
              introSentence {
                introSentence
              }
              reverseColor
              posterColor
              posterImage {
                title
                file {
                  url
                }
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
              }
              previewImage {
                title
                fluid(maxWidth: 600) {
                  ...GatsbyContentfulFluid_withWebp
                }
                file {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => <OurWork data={data} {...props} />}
  />
);

export default OurWorkPage;
