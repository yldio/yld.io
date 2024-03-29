import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import ReactMarkdown from 'react-markdown';
import { generate } from 'shortid';

import { Grid, Col } from '../../components/grid';
import GreyBackground from '../../components/Common/GreyBackground';
import BlackBackground from '../../components/Common/BlackBackground';
import TanBackground from '../../components/Common/TanBackground';

import Layout from '../../components/layout';
import Head from '../../components/Common/Head';
import Hr from '../../components/Common/Hr';
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero';
import { SectionTitle, BodyPrimary } from '../../components/Typography';
import {
  TextColumnsBlock,
  FullWidthBlock,
  shouldRender,
  normalise,
  normaliseAll,
  BlockRow,
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks';

import Image from '../../components/Common/Image';
import FeaturedWork from '../../components/Common/case-studies/FeaturedWork';

const StyledColData2 = styled(Col)`
  display: flex;
  justify-content: center;
`;

const Block3Col = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`;

const Block4ImageCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`;

const Block6ImageCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`;

const Block7ImageCol = styled(Col)`
  ${breakpoint('smallPhone', 'phone')`
    padding-top: ${({ theme }) => theme.space[4]};
  `}
`;

const Block9Grid = styled(Grid)`
  padding-top: ${({ theme }) => theme.space[4]};
`;

const Block9BlockRow = styled(BlockRow)`
  /*
    This set up is used to bring this Row down to be nested
    within a square image.

    The important part here is the "transform: translateY(100%);"

    Without below CSS:
        _____
        |    | <--- Row
        |___ |
    __________
    |         |
    |         | <--- image
    |         |
    |_________|

    With below CSS:
    __________
    |    |    | <--- Row - brought down to be sitting on top of image
    |    |___ |
    |         |
    |_________| <--- image
  */
  ${breakpoint('smallTablet')`
    height: 0;
    overflow: visible;
    transform: translateY(100%);
    padding-top: 0;
  `}
`;

const StyledHr = styled(Hr)`
  margin-left: auto;
  margin-right: auto;

  ${breakpoint('smallTablet')`
    display: none
  ;`}
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
    genericBlock9: data9,
    relatedCaseStudies,
  } = caseStudy;

  const outComesDataFigures = normaliseAll(data2.slice(1));

  return (
    <Layout
      location={location}
      contactUsBg="greyBg"
      footerContactUsId={caseStudy.footerContactUs.id}
    >
      <Head seoMetaData={caseStudy.seoMetaData} />
      <CaseStudyHero caseStudy={caseStudy} as="h1" />

      <Grid>
        {/* Intro  */}
        <BlockRow
          flexEnd
          mobile={{ bottom: '4', top: '3' }}
          tablet={{ bottom: '6', top: '3' }}
        >
          {shouldRender(data1) && (
            <Col width={[1, 1, 1, 1, 6 / 12]}>{normalise(data1, 0).text}</Col>
          )}
        </BlockRow>
      </Grid>
      {shouldRender(data2) && (
        <GreyBackground>
          <Grid>
            {/* Outcomes */}
            <BlockRow mobile={{ bottom: '4', top: '4' }} tablet={{ top: '6' }}>
              <FullWidthBlock
                data={normalise(data2, 0)}
                StyledCol={StyledColData2}
              />
            </BlockRow>
            <BlockRow
              mobile={{ bottom: '5' }}
              smallTablet={{ bottom: '4' }}
              tablet={{ bottom: '6' }}
            >
              {outComesDataFigures.map(({ text }, index) => (
                <Col
                  key={generate()}
                  width={[1, 1, 1, 1, 4 / 12]}
                  style={{
                    textAlign: 'center',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                  block={false}
                >
                  <ReactMarkdown
                    components={{
                      p: (props) => <BodyPrimary bold {...props} />,
                      ...Object.fromEntries(
                        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                          heading,
                          (props) => (
                            <SectionTitle noPaddingBottom {...props} />
                          ),
                        ]),
                      ),
                    }}
                  >
                    {text}
                  </ReactMarkdown>
                  {index + 1 < outComesDataFigures.length && <StyledHr short />}
                </Col>
              ))}
            </BlockRow>
          </Grid>
        </GreyBackground>
      )}
      <Grid>
        <BlockRow
          flexEnd
          mobile={{ bottom: '5', top: '4' }}
          tablet={{ bottom: '6', top: '6' }}
        >
          <TextColumnsBlock data={normalise(data3)} />
          <Block3Col width={[1, 1, 1, 8 / 12]}>
            <Image image={normalise(data3).image} />
          </Block3Col>
        </BlockRow>
      </Grid>
      <BlackBackground>
        <Grid>
          <BlockRow
            mobile={{ bottom: '5', top: '4' }}
            tablet={{ bottom: '7', top: '6' }}
          >
            <Col width={[1]}>
              <ReactMarkdown
                components={{
                  ...Object.fromEntries(
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                      heading,
                      (props) => <SectionTitle reverse {...props} />,
                    ]),
                  ),
                }}
              >
                {normalise(data4).text}
              </ReactMarkdown>
            </Col>

            <Block4ImageCol width={[1]}>
              <Image image={normalise(data4).image} />
            </Block4ImageCol>
          </BlockRow>
        </Grid>
      </BlackBackground>

      {/* Cities */}
      <Grid>
        {shouldRender(data5) && (
          <>
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              smallTablet={{ bottom: '4', top: '4' }}
              tablet={{ bottom: '6', top: '6' }}
            >
              <TextColumnsBlock data={normalise(data5)} />
            </BlockRow>
            <BlockRow mobile={{ bottom: '5' }} tablet={{ bottom: '7' }}>
              <Col width={[1]}>
                <Image image={normalise(data5).image} />
              </Col>
            </BlockRow>
          </>
        )}
      </Grid>

      <TanBackground>
        <Grid>
          <BlockRow mobile={{ bottom: '4', top: '4' }}>
            <Col width={[1, 1, 1, 4 / 12]}>
              <ReactMarkdown
                components={{
                  ...Object.fromEntries(
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                      heading,
                      (props) => <SectionTitle reverse {...props} />,
                    ]),
                  ),
                }}
              >
                {normalise(data6).text}
              </ReactMarkdown>
            </Col>

            <Block6ImageCol width={[1, 1, 1, 8 / 12]}>
              <Image image={normalise(data6).image} />
            </Block6ImageCol>
          </BlockRow>

          <BlockRow
            mobile={{ bottom: '4', top: '0' }}
            tablet={{ bottom: '6', top: '0' }}
          >
            <Col width={[1, 1, 1, 4 / 12]}>
              <ReactMarkdown
                components={{
                  ...Object.fromEntries(
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                      heading,
                      (props) => <SectionTitle reverse {...props} />,
                    ]),
                  ),

                  p: (props) => <BodyPrimary reverse {...props} />,
                }}
              >
                {normalise(data7).text}
              </ReactMarkdown>
            </Col>

            <Block7ImageCol width={[1, 1, 1, 8 / 12]}>
              <Image image={normalise(data7).image} />
            </Block7ImageCol>
          </BlockRow>
        </Grid>
      </TanBackground>

      <BlackBackground>
        <Grid>
          <BlockRow mobile={{ top: '4', bottom: '4' }}>
            <Col width={[1, 1, 1, 1, 6 / 12]}>
              <ReactMarkdown
                components={{
                  ...Object.fromEntries(
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                      heading,
                      (props) => <SectionTitle reverse {...props} />,
                    ]),
                  ),
                }}
              >
                {normalise(data8).text}
              </ReactMarkdown>
            </Col>
          </BlockRow>
          <BlockRow style={{ justifyContent: 'center' }}>
            <Col width={[1, 1, 1, 1, 10 / 12]} style={{ alignSelf: 'center' }}>
              <Image image={normalise(data8).image} />
            </Col>
          </BlockRow>
        </Grid>
      </BlackBackground>

      <GreyBackground>
        <Block9Grid>
          <Block9BlockRow flexEnd mobile={{ top: '0', bottom: '4' }}>
            <Col flexEnd width={[1, 1, 1, 1, 7 / 12, 6 / 12, 5 / 12]}>
              <ReactMarkdown
                components={{
                  p: (props) => <BodyPrimary {...props} />,
                  ...Object.fromEntries(
                    ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((heading) => [
                      heading,
                      (props) => <SectionTitle {...props} />,
                    ]),
                  ),
                }}
              >
                {normalise(data9).text}
              </ReactMarkdown>
            </Col>
            <Col width={[0, 0, 0, 0, 0, 0, 1 / 12]} />
          </Block9BlockRow>

          <BlockRow mobile={{ top: '0', bottom: '5' }} tablet={{ bottom: '6' }}>
            <Col width={[1]}>
              <Image image={normalise(data9).image} />
            </Col>
          </BlockRow>
        </Block9Grid>
      </GreyBackground>

      <FeaturedWork limited hideSparseRows caseStudies={relatedCaseStudies} />
    </Layout>
  );
};

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "central-working-changing-how-you-work" }
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
      genericBlock9 {
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
