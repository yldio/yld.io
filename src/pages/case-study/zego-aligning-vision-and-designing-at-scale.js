import React from 'react';
import { graphql } from 'gatsby';

import { Grid, Col } from '../../components/grid';
import GreyBackground from '../../components/Common/GreyBackground';
import Layout from '../../components/layout';
import Head from '../../components/Common/Head';
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero';
import Statement from '../../components/Common/Statement';
import FeaturedWork from '../../components/Common/case-studies/FeaturedWork';
import {
  renderText,
  TextColumnsBlock,
  FullWidthBlock,
  TextAndImageBlock,
  BlockRow,
  normalise,
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks';

const IndexPage = (props) => {
  const {
    data: { contentfulNonTemplatedCaseStudyV2: caseStudy },
    location,
  } = props;

  const {
    genericBlock1: data1,
    genericBlock2: data2,
    genericBlock3: data3,
    genericBlock4: data4,
    genericBlock5: data5,
    genericBlock7: data7,
    genericBlock8: data8,
    genericBlock9: data9,
    genericBlock10: data10,
    genericBlock11: data11,
    genericBlock12: data12,
    genericBlock14: data14,
    genericBlock15: data15,
    genericBlock16: data16,
  } = caseStudy;

  return (
    <Layout location={location} contactUsBg="greyBg">
      <Head seoMetaData={caseStudy.seoMetaData} />
      <CaseStudyHero caseStudy={caseStudy} as="h1" />
      <GreyBackground>
        {<Statement>{normalise(data1).text}</Statement>}
      </GreyBackground>
      {/* Deep dive into the product */}
      <Grid>
        <BlockRow
          alignCenter
          mobile={{ bottom: '5', top: '5' }}
          smallTablet={{ bottom: '7', top: '7' }}
        >
          <TextAndImageBlock
            data={normalise(data2)}
            colWidthOne={[1, 1, 1, 1, 5 / 12]}
            colWidthTwo={[1, 1, 1, 1, 6 / 12]}
            middleColWidth={[0, 0, 0, 0, 1 / 12]}
          />
        </BlockRow>
      </Grid>
      {/* Workshops */}
      <GreyBackground>
        <Grid>
          <BlockRow
            alignCenter
            mobile={{ bottom: '5', top: '5' }}
            smallTablet={{ bottom: '7', top: '7' }}
          >
            <TextAndImageBlock
              data={normalise(data3)}
              colWidthOne={[1, 1, 1, 1, 5 / 12]}
              colWidthTwo={[1, 1, 1, 1, 6 / 12]}
              middleColWidth={[0, 0, 0, 0, 1 / 12]}
              reverseOrder
            />
          </BlockRow>
        </Grid>
      </GreyBackground>
      {/* North Star Prototype North Star Prototype */}
      <Grid>
        <BlockRow
          mobile={{ bottom: '4', top: '4' }}
          smallTablet={{ bottom: '5', top: '5' }}
          tablet={{ bottom: '6', top: '6' }}
        >
          <TextColumnsBlock
            data={normalise(data4)}
            colWidthOne={[1, 1, 1, 1, 5 / 12]}
            colWidthTwo={[1, 1, 1, 1, 6 / 12]}
            middleColWidth={[0, 0, 0, 0, 1 / 12]}
          />
        </BlockRow>
        <BlockRow>
          <FullWidthBlock data={normalise(data5)} />
        </BlockRow>
      </Grid>
      <GreyBackground style={{ height: '364px' }} />
      {/* Design System */}
      <Grid>
        <BlockRow
          alignCenter
          mobile={{ bottom: '0', top: '5' }}
          smallTablet={{ bottom: '0', top: '7' }}
          desktop={{ bottom: '0', top: '7' }}
        >
          <TextAndImageBlock
            data={normalise(data7)}
            colWidthOne={[1, 1, 1, 1, 5 / 12]}
            colWidthTwo={[1, 1, 1, 1, 6 / 12]}
            middleColWidth={[0, 0, 0, 0, 1 / 12]}
          />
        </BlockRow>
      </Grid>
      {/* Atomic Structure */}
      <Grid>
        <BlockRow
          mobile={{ bottom: '4', top: '7' }}
          smallTablet={{ bottom: '5', top: '7' }}
          tablet={{ bottom: '6', top: '7' }}
        >
          <Col width={[1, 1, 1, 1, 5 / 12]} />
          <Col width={[0, 0, 0, 0, 1 / 12]} />
          <Col width={[1, 1, 1, 1, 6 / 12]}>{renderText(normalise(data8))}</Col>
        </BlockRow>
      </Grid>
      <GreyBackground>
        <Grid>
          <BlockRow>
            <FullWidthBlock data={normalise(data9)} />
          </BlockRow>
        </Grid>
      </GreyBackground>
      {/* Extensive Documentation */}
      <Grid>
        <BlockRow
          mobile={{ bottom: '4', top: '4' }}
          smallTablet={{ bottom: '5', top: '5' }}
          tablet={{ bottom: '6', top: '6' }}
        >
          <Col width={[1, 1, 1, 1, 5 / 12]}>
            {renderText(normalise(data10))}
          </Col>
          <Col width={[0, 0, 0, 0, 1 / 12]} />
          <Col width={[1, 1, 1, 1, 6 / 12]} />
        </BlockRow>
      </Grid>
      <GreyBackground>
        <Grid>
          <BlockRow>
            <FullWidthBlock data={normalise(data11)} />
          </BlockRow>
        </Grid>
      </GreyBackground>
      {/* Prototyping */}
      <Grid>
        <BlockRow
          alignCenter
          mobile={{ bottom: '5', top: '5' }}
          smallTablet={{ bottom: '7', top: '7' }}
        >
          <TextAndImageBlock
            data={normalise(data12)}
            colWidthOne={[1, 1, 1, 1, 5 / 12]}
            colWidthTwo={[1, 1, 1, 1, 6 / 12]}
            middleColWidth={[0, 0, 0, 0, 1 / 12]}
          />
        </BlockRow>
      </Grid>
      <GreyBackground style={{ height: '400px' }} />
      {/* Watch a Training demo with Zego */}
      <Grid>
        <BlockRow>
          <FullWidthBlock data={normalise(data14)} />
        </BlockRow>
      </Grid>
      {/* Closing the engagement */}
      <Grid>
        <BlockRow
          alignCenter
          mobile={{ bottom: '5', top: '5' }}
          smallTablet={{ bottom: '7', top: '7' }}
        >
          <TextAndImageBlock
            data={normalise(data15)}
            colWidthOne={[1, 1, 1, 1, 5 / 12]}
            colWidthTwo={[1, 1, 1, 1, 6 / 12]}
            middleColWidth={[0, 0, 0, 0, 1 / 12]}
          />
        </BlockRow>
      </Grid>
      {/* Results */}
      <Grid>
        <BlockRow
          alignCenter
          mobile={{ bottom: '5', top: '5' }}
          smallTablet={{ bottom: '7', top: '7' }}
        >
          <TextAndImageBlock
            data={normalise(data16)}
            colWidthOne={[1, 1, 1, 1, 5 / 12]}
            colWidthTwo={[1, 1, 1, 1, 6 / 12]}
            middleColWidth={[0, 0, 0, 0, 1 / 12]}
          />
        </BlockRow>
      </Grid>
      <FeaturedWork
        limited
        hideSparseRows
        caseStudies={caseStudy.relatedCaseStudies}
      />
    </Layout>
  );
};

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "zego-aligning-vision-and-designing-at-scale" }
    ) {
      slug
      title
      posterImage {
        title
        file {
          url
        }
      }
      seoMetaData {
        ...SEOMetaFields
      }
      ...NonTemplatedCaseStudyV2Related
      genericBlock1 {
        ...GenericFragment
      }
      genericBlock2 {
        ...GenericFragment
      }
      genericBlock3 {
        ...GenericFragment
      }
      genericBlock4 {
        ...GenericFragment
      }
      genericBlock5 {
        ...GenericFragment
      }
      genericBlock6 {
        ...GenericFragment
      }
      genericBlock7 {
        ...GenericFragment
      }
      genericBlock8 {
        ...GenericFragment
      }
      genericBlock9 {
        ...GenericFragment
      }
      genericBlock10 {
        ...GenericFragment
      }
      genericBlock11 {
        ...GenericFragment
      }
      genericBlock12 {
        ...GenericFragment
      }
      genericBlock13 {
        ...GenericFragment
      }
      genericBlock14 {
        ...GenericFragment
      }
      genericBlock15 {
        ...GenericFragment
      }
      genericBlock16 {
        ...GenericFragment
      }
      genericBlock17 {
        ...GenericFragment
      }
      genericBlock18 {
        ...GenericFragment
      }
      genericBlock19 {
        ...GenericFragment
      }
      genericBlock20 {
        ...GenericFragment
      }
      genericBlock21 {
        ...GenericFragment
      }
      genericBlock22 {
        ...GenericFragment
      }
      genericBlock23 {
        ...GenericFragment
      }
      genericBlock24 {
        ...GenericFragment
      }
      genericBlock25 {
        ...GenericFragment
      }
      genericBlock26 {
        ...GenericFragment
      }
      genericBlock27 {
        ...GenericFragment
      }
      genericBlock28 {
        ...GenericFragment
      }
      genericBlock29 {
        ...GenericFragment
      }
      genericBlock30 {
        ...GenericFragment
      }
      genericBlock31 {
        ...GenericFragment
      }
      specialities {
        title
        id
      }
      services {
        title
        id
      }
      posterColor
      footerContactUs {
        id
      }
    }
  }
`;
export default IndexPage;
