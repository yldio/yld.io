import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'

import { Grid, Row, Col } from '../../components/grid'
import Layout from '../../components/layout'
import GreyBackground from '../../components/Common/GreyBackground'
import RegalBlueBackground from '../../components/Common/RegalBlueBackground'
import MountainMeadowBackground from '../../components/Common/MountainMeadowBackground'
import Statement from '../../components/Common/Statement'
import Head from '../../components/Common/Head'
import Image from '../../components/Common/Image'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import {
  shouldRender,
  normalise,
  TextColumnsBlock,
  BlockRow
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks'

const Block1Col = styled(Col)`
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const StyledParagraphCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: 0;
    padding-bottom: 0;
  `}
`

const IndexPage = props => {
  const {
    data: { contentfulNonTemplatedCaseStudyV2: caseStudy },
    location
  } = props

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
    relatedCaseStudy
  } = caseStudy

  return (
    <Layout location={location}>
      <Head
        page={{
          ...caseStudy,
          socialLogo: caseStudy.posterImage.file.url
        }}
      />
      <CaseStudyHero caseStudy={caseStudy} as="h1" />

      {/* "In early 2016 Make Us Proud began working with Learnerbly" */}
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

      {/* TODO  - render 1.6million as black and bold. Not handled by Statement */}
      {/* "Following our initial engagement with Learnerbly" */}
      {shouldRender(data2) && (
        <GreyBackground>
          <Statement>{normalise(data2).text}</Statement>
        </GreyBackground>
      )}

      {/* "What was the problem we were tackling?" */}
      {shouldRender(data3) && (
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
      )}

      {/* Image - "We curate the best learning to accelerate your growth" */}
      {shouldRender(data4) && (
        <Grid>
          <BlockRow flexEnd>
            <Col width={[1, 1, 1, 2 / 3]}>
              <Image image={normalise(data4).image} />
            </Col>
          </BlockRow>
        </Grid>
      )}

      {/* "How did we go about solving it?" */}
      {shouldRender(data5) && (
        <Grid flex>
          <BlockRow
            mobile={{ bottom: '5', top: '4' }}
            tablet={{ bottom: '6' }}
            style={{ justifyContent: 'space-between' }}
          >
            <TextColumnsBlock
              data={normalise(data5)}
              colWidthOne={[1, 1, 1, 1, 5 / 12]}
              colWidthTwo={[1, 1, 1, 1, 6 / 12]}
            />
          </BlockRow>
        </Grid>
      )}

      {/* "On-boarding" */}
      {shouldRender(data6) && (
        <RegalBlueBackground>
          <Grid flex>
            <BlockRow
              style={{ flexDirection: 'column', alignItems: 'center' }}
              mobile={{ top: '4' }}
              tablet={{ top: '6' }}
            >
              {shouldRender(data6) && (
                <ReactMarkdown
                  renderers={{
                    // eslint-disable-next-line
                    heading: props => <SectionTitle reverse {...props} />,
                    // eslint-disable-next-line
                    paragraph: props => (
                      <Col
                        width={[1, 1, 1, 1, 3 / 4, 1 / 2]}
                        style={{ textAlign: 'center' }}
                      >
                        <BodyPrimary reverse {...props} />
                      </Col>
                    )
                  }}
                  source={normalise(data6).text}
                />
              )}
            </BlockRow>

            <BlockRow flexEnd mobile={{ bottom: '5' }} tablet={{ bottom: '7' }}>
              <Col width={[1]}>
                <Image image={normalise(data6).image} />
              </Col>
            </BlockRow>
          </Grid>
        </RegalBlueBackground>
      )}

      {/* "Staying on target" */}
      {shouldRender(data7) && (
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
                    disallowedTypes={['paragraph']}
                    renderers={{
                      // eslint-disable-next-line
                      heading: props => <SectionTitle {...props} />
                    }}
                    source={normalise(data7).text}
                  />
                </Col>
                <StyledParagraphCol width={[1, 1, 1, 1 / 2, 1 / 2, 1]}>
                  <ReactMarkdown
                    disallowedTypes={['heading']}
                    renderers={{
                      // eslint-disable-next-line
                      paragraph: props => <BodyPrimary {...props} />
                    }}
                    source={normalise(data7).text}
                  />
                </StyledParagraphCol>
              </Row>
            </Col>

            <Col width={[1, 1, 1, 8 / 12]} block={false}>
              <Image image={normalise(data7).image} />
            </Col>
          </BlockRow>
        </Grid>
      )}

      {/* "Curated courses" */}
      {shouldRender(data8) && (
        <MountainMeadowBackground>
          <Grid flex>
            <BlockRow
              style={{ flexDirection: 'column', alignItems: 'center' }}
              mobile={{ top: '4', bottom: '4' }}
              tablet={{ top: '6' }}
            >
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />,
                  // eslint-disable-next-line
                  paragraph: props => (
                    <Col
                      width={[1, 1, 1, 3 / 4, 3 / 4, 1 / 2]}
                      style={{ textAlign: 'center' }}
                    >
                      <BodyPrimary reverse {...props} />
                    </Col>
                  )
                }}
                source={normalise(data8).text}
              />
            </BlockRow>
          </Grid>
          <Grid flex>
            <BlockRow flexEnd mobile={{ bottom: '5' }} tablet={{ bottom: '7' }}>
              <Col width={[1]}>
                <Image image={normalise(data8).image} />
              </Col>
            </BlockRow>
          </Grid>
        </MountainMeadowBackground>
      )}

      {/* "The bigger picture" */}
      {shouldRender(data9) && (
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
                    disallowedTypes={['paragraph']}
                    renderers={{
                      // eslint-disable-next-line
                      heading: props => <SectionTitle {...props} />
                    }}
                    source={normalise(data9).text}
                  />
                </Col>
                <StyledParagraphCol width={[1, 1, 1, 1 / 2, 1 / 2, 1]}>
                  <ReactMarkdown
                    disallowedTypes={['heading']}
                    renderers={{
                      // eslint-disable-next-line
                      paragraph: props => <BodyPrimary {...props} />
                    }}
                    source={normalise(data9).text}
                  />
                </StyledParagraphCol>
              </Row>
            </Col>

            <Col width={[1, 1, 1, 8 / 12]} block={false}>
              <Image image={normalise(data9).image} />
            </Col>
          </BlockRow>
        </Grid>
      )}

      <CaseStudyPreview isTop={false} caseStudy={relatedCaseStudy} />
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "learnerbly-accelerating-professional-growth" }
    ) {
      relatedCaseStudy {
        title
        slug
        introSentence {
          introSentence
        }
        posterImage {
          title
          file {
            url
          }
        }
        posterColor
      }
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
      seoTitle
      seoMetaDescription
    }
  }
`
export default IndexPage
