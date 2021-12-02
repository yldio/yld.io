import React from 'react';
import { Padding } from 'styled-components-spacing';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { Grid } from '../components/grid';
import { GreyBackgroundOffset } from '../components/Common/GreyBackground';
import Head from '../components/Common/Head';
import CaseStudyHero from '../components/Common/CaseStudyCards/CaseStudyHero';
import FirstTextSection from '../components/TemplatedCaseStudy/FirstTextSection';
import SecondTextSection from '../components/TemplatedCaseStudy/SecondTextSection';
import VideoSection from '../components/Common/VideoSection';
import FeaturedWork from '../components/Common/case-studies/FeaturedWork';

const CaseStudy = ({
  data: { contentfulTemplatedCaseStudy: caseStudy },
  location,
}) => {
  return (
    <Layout
      location={location}
      footerContactUsId={caseStudy.footerContactUs.id}
    >
      <Head seoMetaData={caseStudy.seoMetaData} />
      <CaseStudyHero as="h1" caseStudy={caseStudy} />
      <Grid>
        <FirstTextSection source={caseStudy.bodyFirstBlock.bodyFirstBlock} />
      </Grid>
      <GreyBackgroundOffset topMargin topOffset={-150}>
        <Padding bottom={{ smallPhone: 3.5, tablet: 4 }}>
          <Grid>
            <VideoSection
              src={caseStudy.youtubeVideo.link}
              padding={{
                top: { smallPhone: 3, tablet: 4 },
                bottom: { smallPhone: 3, tablet: 4 },
              }}
            />
            <SecondTextSection
              stats={caseStudy.stats}
              source={caseStudy.bodySecondBlock.bodySecondBlock}
            />
          </Grid>
        </Padding>
      </GreyBackgroundOffset>
      <FeaturedWork
        limited
        hideSparseRows
        caseStudies={caseStudy.relatedCaseStudies}
      />
    </Layout>
  );
};

export default CaseStudy;

export const pageQuery = graphql`
  query ($id: String) {
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
      bodyFirstBlock {
        bodyFirstBlock
      }
      bodySecondBlock {
        bodySecondBlock
      }
      youtubeVideo {
        link
      }
      posterImage {
        gatsbyImageData(layout: FULL_WIDTH)
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
