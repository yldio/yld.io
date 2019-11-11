import React from 'react';
import { Padding } from 'styled-components-spacing';
import { graphql } from 'gatsby';

import generateCaseStudy from '../utils/generateCaseStudy';
import Layout from '../components/layout';
import { Grid } from '../components/grid';
import { GreyBackgroundOffset } from '../components/Common/GreyBackground';
import Head from '../components/Common/Head';
import CaseStudyHero from '../components/Common/CaseStudyCards/CaseStudyHero';
import FirstTextSection from '../components/TemplatedCaseStudy/FirstTextSection';
import SecondTextSection from '../components/TemplatedCaseStudy/SecondTextSection';
import VideoSection from '../components/Common/VideoSection';
import CaseStudyPreview from '../components/Common/CaseStudyCards/CaseStudyPreview';

const CaseStudy = ({
  data: { contentfulTemplatedCaseStudy: caseStudy },
  location,
}) => {
  const body = generateCaseStudy(caseStudy);
  const firstTextBlock = body[0];
  const videoInfo = body[1];
  const secondTextBlock = body[2];

  return (
    <Layout
      location={location}
      footerContactUsId={caseStudy.footerContactUs.id}
    >
      <Head seoMetaData={caseStudy.seoMetaData} />
      <CaseStudyHero as="h1" caseStudy={caseStudy} />
      <Grid>
        <FirstTextSection text={firstTextBlock} />
      </Grid>
      <GreyBackgroundOffset topMargin topOffset={-150}>
        <Padding bottom={{ smallPhone: 3.5, tablet: 4 }}>
          <Grid>
            <VideoSection
              src={videoInfo[0]}
              padding={{
                top: { smallPhone: 3, tablet: 4 },
                bottom: { smallPhone: 3, tablet: 4 },
              }}
            />
            <SecondTextSection stats={caseStudy.stats} text={secondTextBlock} />
          </Grid>
        </Padding>
      </GreyBackgroundOffset>
      <CaseStudyPreview
        isTop={false}
        caseStudy={caseStudy.relatedCaseStudies[0]}
      />
    </Layout>
  );
};

export default CaseStudy;

export const pageQuery = graphql`
  query($id: String) {
    contentfulTemplatedCaseStudy(id: { eq: $id }) {
      slug
      title
      seoMetaData {
        ...SEOMetaFields
      }
      ...TemplatedCaseStudyRelated
      specialities {
        title
        id
      }
      services {
        title
        id
      }
      stats {
        id
        label
        value
      }
      posterColor
      body {
        content {
          nodeType
          content {
            value
            marks {
              type
            }
          }
        }
      }
      posterImage {
        fluid(maxWidth: 600) {
          ...GatsbyContentfulFluid_withWebp
        }
        title
        file {
          url
        }
      }
      footerContactUs {
        id
      }
    }
  }
`;
