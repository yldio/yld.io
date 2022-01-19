import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ReactMarkdown from 'react-markdown';

import { Grid, Row, Col } from '../../components/grid';
import Layout from '../../components/layout';
import GreyBackground from '../../components/Common/GreyBackground';
import RegalBlueBackground from '../../components/Common/RegalBlueBackground';
import MountainMeadowBackground from '../../components/Common/MountainMeadowBackground';
import Statement from '../../components/Common/Statement';
import Head from '../../components/Common/Head';
import Hr from '../../components/Common/Hr';
import Image from '../../components/Common/Image';
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero';
import { SectionTitle, BodyPrimary } from '../../components/Typography';
import {
  shouldRender,
  normalise,
  TextColumnsBlock,
  BlockRow,
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks';
import FeaturedWork from '../../components/Common/case-studies/FeaturedWork';

const Block1Col = styled(Col)`
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[2]};
`;

const StyledParagraphCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: 0;
    padding-bottom: 0;
  `}
`;

const StyledColTwo5 = styled(Col)`
  padding-top: ${({ theme }) => theme.space[2]};
`;

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
    genericBlock6: data6,
    genericBlock7: data7,
    genericBlock8: data8,
    relatedCaseStudies,
  } = caseStudy;

  return (
    <Layout
      location={location}
      footerContactUsId={caseStudy.footerContactUs.id}
    >
      <Head seoMetaData={caseStudy.seoMetaData} />
      <CaseStudyHero caseStudy={caseStudy} as="h1" />

      {/* "Connecting with the startup Learnerbly" */}
      {shouldRender(data1) && (
        <Grid>
          <BlockRow
            flexEnd
            mobile={{ bottom: '4', top: '3' }}
            tablet={{ bottom: '6', top: '3' }}
          >
            <Block1Col width={[1, 1, 1, 1, 1 / 2]}>
              {normalise(data1, 0).text}
            </Block1Col>
          </BlockRow>
        </Grid>
      )}

      {/* "Following our initial engagement with Learnerbly" */}
      {shouldRender(data2) && (
        <GreyBackground>
          <Statement>{normalise(data2).text}</Statement>
        </GreyBackground>
      )}

      {/* "The problem" */}
      {shouldRender(data3) && (
        <>
          <Grid flex>
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              tablet={{ top: '6' }}
              style={{ justifyContent: 'space-between' }}
            >
              <TextColumnsBlock
                data={normalise(data3)}
                colWidthOne={[1, 1, 1, 1, 5 / 12]}
                colWidthTwo={[1, 1, 1, 1, 6 / 12]}
              />
            </BlockRow>
          </Grid>
          <Grid>
            <BlockRow flexEnd>
              <Col width={[1, 1, 1, 2 / 3]}>
                <Image image={normalise(data3).image} />
              </Col>
            </BlockRow>
          </Grid>
        </>
      )}

      {/* "The solution" */}
      {shouldRender(data4) && (
        <Grid flex>
          <BlockRow
            mobile={{ bottom: '5', top: '4' }}
            tablet={{ bottom: '6' }}
            style={{ justifyContent: 'space-between' }}
          >
            <TextColumnsBlock
              data={normalise(data4)}
              colWidthOne={[1, 1, 1, 1, 5 / 12]}
              colWidthTwo={[1, 1, 1, 1, 6 / 12]}
              StyledColTwo={StyledColTwo5}
            />
          </BlockRow>
        </Grid>
      )}

      {/* "On-boarding" */}
      {shouldRender(data5) && (
        <RegalBlueBackground>
          <Grid flex>
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              tablet={{ top: '6' }}
              style={{ justifyContent: 'space-between' }}
            >
              <TextColumnsBlock
                colorReverse
                data={normalise(data5)}
                colWidthOne={[1, 1, 1, 1, 5 / 12]}
                colWidthTwo={[1, 1, 1, 1, 6 / 12]}
              />
            </BlockRow>
          </Grid>
          <Grid>
            <BlockRow flexEnd mobile={{ bottom: '5' }} tablet={{ bottom: '7' }}>
              <Col width={[1]}>
                <Image image={normalise(data5).image} />
              </Col>
            </BlockRow>
          </Grid>
        </RegalBlueBackground>
      )}

      {/* "Staying on target" */}
      {shouldRender(data6) && (
        <Grid>
          <BlockRow
            mobile={{ bottom: '5', top: '4' }}
            tablet={{ bottom: '6', top: '6' }}
            style={{ justifyContent: 'flex-end' }}
          >
            <Col width={[1, 1, 1, 1, 1, 4 / 12]}>
              <Row>
                <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1]}>
                  <ReactMarkdown
                    disallowedElements={['p']}
                    components={{
                      ...Object.fromEntries(
                        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                          heading,
                          (props) => <SectionTitle {...props} />,
                        ]),
                      ),
                    }}
                  >
                    {normalise(data6).text}
                  </ReactMarkdown>
                </Col>
                <StyledParagraphCol width={[1, 1, 1, 1 / 2, 1 / 2, 1]}>
                  <ReactMarkdown
                    disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}
                    components={{
                      p: (props) => <BodyPrimary {...props} />,
                    }}
                  >
                    {normalise(data6).text}
                  </ReactMarkdown>
                </StyledParagraphCol>
              </Row>
            </Col>

            <Col width={[1, 1, 1, 8 / 12]} block={false}>
              <Image image={normalise(data6).image} />
            </Col>
          </BlockRow>
        </Grid>
      )}

      {/* "Curated courses" */}
      {shouldRender(data7) && (
        <MountainMeadowBackground>
          <Grid flex>
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              tablet={{ top: '6' }}
              style={{ justifyContent: 'space-between' }}
            >
              <TextColumnsBlock
                colorReverse
                data={normalise(data7)}
                colWidthOne={[1, 1, 1, 1, 5 / 12]}
                colWidthTwo={[1, 1, 1, 1, 6 / 12]}
              />
            </BlockRow>
          </Grid>
          <Grid>
            <BlockRow flexEnd mobile={{ bottom: '5' }} tablet={{ bottom: '7' }}>
              <Col width={[1]}>
                <Image image={normalise(data7).image} />
              </Col>
            </BlockRow>
          </Grid>
        </MountainMeadowBackground>
      )}

      {/* "A clear perspective" */}
      {shouldRender(data8) && (
        <Grid>
          <BlockRow
            mobile={{ bottom: '5', top: '4' }}
            tablet={{ bottom: '6', top: '6' }}
            style={{ justifyContent: 'flex-end' }}
          >
            <Col width={[1, 1, 1, 1, 1, 4 / 12]}>
              <Row>
                <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1]}>
                  <ReactMarkdown
                    disallowedElements={['p']}
                    components={{
                      ...Object.fromEntries(
                        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                          heading,
                          (props) => <SectionTitle {...props} />,
                        ]),
                      ),
                    }}
                  >
                    {normalise(data8).text}
                  </ReactMarkdown>
                </Col>
                <StyledParagraphCol width={[1, 1, 1, 1 / 2, 1 / 2, 1]}>
                  <ReactMarkdown
                    disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'h6']}
                    components={{
                      ...Object.fromEntries(
                        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                          heading,
                          (props) => <BodyPrimary {...props} />,
                        ]),
                      ),
                    }}
                  >
                    {normalise(data8).text}
                  </ReactMarkdown>
                </StyledParagraphCol>
              </Row>
            </Col>

            <Col width={[1, 1, 1, 8 / 12]} block={false}>
              <Image image={normalise(data8).image} />
            </Col>
          </BlockRow>

          <Row>
            <Col width={[1]}>
              <Hr />
            </Col>
          </Row>
        </Grid>
      )}

      <FeaturedWork limited hideSparseRows caseStudies={relatedCaseStudies} />
    </Layout>
  );
};

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "learnerbly-accelerating-professional-growth" }
    ) {
      seoMetaData {
        ...SEOMetaFields
      }
      ...NonTemplatedCaseStudyV2Related
      slug
      title
      posterImage {
        title
        file {
          url
        }
      }

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
