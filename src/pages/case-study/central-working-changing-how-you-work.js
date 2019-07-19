import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'
import { generate } from 'shortid'

import { Grid, Col } from '../../components/grid'
import GreyBackground from '../../components/Common/GreyBackground'
import BlackBackground from '../../components/Common/BlackBackground'
import TanBackground from '../../components/Common/TanBackground'

import Layout from '../../components/layout'
import Head from '../../components/Common/Head'
import Hr from '../../components/Common/Hr'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import {
  TextColumnsBlock,
  shouldRender,
  normalise,
  normaliseAll,
  BlockRow
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks'

import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'
import Image from '../../components/Common/Image'

const Block3Col = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`

const Block4ImageCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`

const Block6ImageCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`

const Block7ImageCol = styled(Col)`
  ${breakpoint('smallPhone', 'phone')`
    padding-top: ${({ theme }) => theme.space[4]};
  `}
`

const Block9ImageCol = styled(Col)`
  ${breakpoint('smallPhone')`
      padding-top: ${({ theme }) => theme.space[4]}
  `}
`

const StyledHr = styled(Hr)`
  margin-left: auto;
  margin-right: auto;

  ${breakpoint('smallTablet')`
    display: none
  ;`}
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

  const outComesDataText = normalise(data2, 0).text
  const outComesDataFigures = normaliseAll(data2.slice(1))

  return (
    <Layout location={location} contactUsBg={'greyBg'}>
      <Head
        page={{
          ...caseStudy,
          socialLogo: caseStudy.posterImage.file.url
        }}
      />
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
      <GreyBackground>
        <Grid>
          {/* Outcomes */}
          <BlockRow mobile={{ bottom: '4', top: '4' }} tablet={{ top: '6' }}>
            {shouldRender(data2) && (
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => (
                    <Col width={[1, 1, 1, 1 / 2]}>
                      <SectionTitle {...props} />
                    </Col>
                  ),
                  // eslint-disable-next-line
                  paragraph: props => (
                    <Col width={[1, 1, 1, 1 / 2]}>
                      <BodyPrimary {...props} />
                    </Col>
                  )
                }}
                source={outComesDataText}
              />
            )}
          </BlockRow>
          <BlockRow
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '4' }}
            tablet={{ bottom: '6' }}
          >
            {outComesDataFigures.map(({ text }, index) => (
              <Col
                width={[1, 1, 1, 1, 4 / 12]}
                style={{
                  textAlign: 'center',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
                key={generate()}
              >
                <ReactMarkdown
                  renderers={{
                    // eslint-disable-next-line
                    heading: props => (
                      <SectionTitle noPaddingBottom {...props} />
                    ),
                    // eslint-disable-next-line
                    paragraph: props => <BodyPrimary {...props} />
                  }}
                  source={text}
                />
                {index + 1 < outComesDataFigures.length && <StyledHr short />}
              </Col>
            ))}
          </BlockRow>
        </Grid>
      </GreyBackground>
      <Grid>
        <BlockRow
          mobile={{ bottom: '5', top: '4' }}
          tablet={{ bottom: '6', top: '6' }}
          flexEnd
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
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />
                }}
                source={normalise(data4).text}
              />
            </Col>

            <Block4ImageCol width={[1]}>
              <Image image={normalise(data4).image} />
            </Block4ImageCol>
          </BlockRow>
        </Grid>
      </BlackBackground>

      {/* Cities */}
      <Grid>
        {shouldRender(data2) && (
          <Fragment>
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
          </Fragment>
        )}
      </Grid>

      <TanBackground>
        <Grid>
          <BlockRow mobile={{ bottom: '4', top: '4' }}>
            <Col width={[1, 1, 1, 4 / 12]}>
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />
                }}
                source={normalise(data6).text}
              />
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
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />,
                  // eslint-disable-next-line react/display-name
                  paragraph: props => <BodyPrimary reverse {...props} />
                }}
                source={normalise(data7).text}
              />
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
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />
                }}
                source={normalise(data8).text}
              />
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
        <Grid>
          <BlockRow mobile={{ top: '4' }} tablet={{ top: '6' }} flexEnd>
            <Col width={[1, 1, 1, 1, 7 / 12, 5 / 12]} flexEnd>
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle {...props} />,
                  // eslint-disable-next-line react/display-name
                  paragraph: props => <BodyPrimary {...props} />
                }}
                source={normalise(data9).text}
              />
            </Col>
          </BlockRow>

          <BlockRow mobile={{ bottom: '5' }} tablet={{ bottom: '6' }}>
            <Block9ImageCol width={[1]}>
              <Image image={normalise(data9).image} />
            </Block9ImageCol>
          </BlockRow>
        </Grid>
      </GreyBackground>

      <CaseStudyPreview isTop={false} caseStudy={relatedCaseStudy} />
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "central-working-changing-how-you-work" }
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
