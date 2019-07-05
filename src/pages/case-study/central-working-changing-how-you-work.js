import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'
import { generate } from 'shortid'

import { Grid, Row, Col } from '../../components/grid'
import BlueBackground from '../../components/Common/BlueBackground'
import GreyBackground from '../../components/Common/GreyBackground'
import Layout from '../../components/layout'
import Head from '../../components/Common/Head'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import {
  TextColumnsBlock,
  TextAndImageBlock,
  FullWidthBlock,
  VideoBlock,
  ImagesBlock,
  renderImage
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks'

import Statement from '../../components/Common/Statement'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'
import Image from '../../components/Common/Image'

const shouldRender = data => data && data.length

const getImage = (blockImages, index) => blockImages && blockImages[index]

const normaliseAll = (arr = []) =>
  arr.map(({ genericBlockText, genericBlockImages, ...props }) => ({
    image: getImage(genericBlockImages, 0),
    text: genericBlockText && genericBlockText.genericBlockText,
    ...props
  }))

const normalise = (arr = [], index = 0) => normaliseAll(arr, index)[index]

const Block3Image = styled.div`
  padding-top: ${({ theme }) => theme.space[3]};
`

const Block4ImageCol = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[6]};
`

const Block6ImageCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`

const BrownBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
`

const TanBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.tanBg};
`

const BlockRow = styled(Row)`
  flex-direction: ${({ rowReverse }) => `row${rowReverse ? '-reverse' : null}`};
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : null)};
  padding-top: ${({ theme, mobile }) =>
    mobile && mobile.top ? theme.space[mobile.top] : null};
  padding-bottom: ${({ theme, mobile }) =>
    mobile && mobile.bottom ? theme.space[mobile.bottom] : null};
  justify-content: ${({ spaceEvenly }) =>
    spaceEvenly ? 'space-evenly' : null};

${breakpoint('smallTablet')`
  padding-top: ${({ theme, smallTablet }) =>
    smallTablet && smallTablet.top ? theme.space[smallTablet.top] : null};
  padding-bottom: ${({ theme, smallTablet }) =>
    smallTablet && smallTablet.bottom ? theme.space[smallTablet.bottom] : null};
`}

${breakpoint('tablet')`
  padding-top: ${({ theme, tablet }) =>
    tablet && tablet.top ? theme.space[tablet.top] : null};
  padding-bottom: ${({ theme, tablet }) =>
    tablet && tablet.bottom ? theme.space[tablet.bottom] : null};
`}

${breakpoint('desktop')`
  padding-top: ${({ theme, desktop }) =>
    desktop && desktop.top ? theme.space[desktop.top] : null};
  padding-bottom: ${({ theme, desktop }) =>
    desktop && desktop.bottom ? theme.space[desktop.bottom] : null};
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
    genericBlock9: data9
  } = caseStudy

  const outComesData = normaliseAll(data2)
  return (
    <Layout location={location}>
      <Head
        page={{
          ...caseStudy,
          socialLogo:
            'https://www.yld.io/static/logo_animated-832020608244057f6a9d73e80994ac4a.gif'
        }}
      />
      <CaseStudyHero caseStudy={caseStudy} />

      <Grid>
        {/* Intro  */}
        <BlockRow
          flexEnd
          mobile={{ bottom: '4', top: '0' }}
          tablet={{ bottom: '6', top: '0' }}
        >
          {shouldRender(data1) && (
            <Col width={[1, 1, 1, 1, 6 / 12]}>{normalise(data1, 0).text}</Col>
          )}
        </BlockRow>

        {/* Outcomes */}
        <BlockRow
          flexEnd
          mobile={{ bottom: '4', top: '0' }}
          tablet={{ bottom: '6', top: '0' }}
        >
          {shouldRender(data2) && (
            <Fragment>
              <Col width={[1]} style={{ textAlign: 'center' }}>
                <ReactMarkdown
                  renderers={{
                    // eslint-disable-next-line
                    heading: props => <SectionTitle {...props} />,
                    // eslint-disable-next-line
                    paragraph: props => <BodyPrimary {...props} />
                  }}
                  source={outComesData[0].text}
                />
              </Col>
              {outComesData.slice(1).map(({ text }) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Col
                    width={[1, 1, 1, 1, 4 / 12]}
                    style={{ textAlign: 'center' }}
                    key={generate()}
                  >
                    <ReactMarkdown
                      renderers={{
                        // eslint-disable-next-line
                        heading: props => <SectionTitle {...props} />,
                        // eslint-disable-next-line
                        paragraph: props => <BodyPrimary {...props} />
                      }}
                      source={text}
                    />
                  </Col>
                )
              })}
            </Fragment>
          )}
        </BlockRow>
        <BlockRow
          mobile={{ bottom: '4', top: '4' }}
          smallTablet={{ bottom: '5', top: '5' }}
          tablet={{ bottom: '6', top: '6' }}
          flexEnd
        >
          <TextColumnsBlock data={normalise(data3)} />

          <Col width={[1, 1, 1, 8 / 12]}>
            <Block3Image>{renderImage(normalise(data3).image)}</Block3Image>
          </Col>
        </BlockRow>
      </Grid>
      <BrownBackground>
        <Grid>
          <BlockRow
            mobile={{ bottom: '4', top: '4' }}
            smallTablet={{ bottom: '5', top: '5' }}
            tablet={{ bottom: '7', top: '7' }}
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
      </BrownBackground>

      <Grid>
        {shouldRender(data2) && (
          <BlockRow
            mobile={{ bottom: '4', top: '4' }}
            smallTablet={{ bottom: '5', top: '5' }}
            tablet={{ bottom: '7', top: '7' }}
          >
            <TextColumnsBlock data={normalise(data5)} />
            <Col width={[1]}>
              <Image image={normalise(data5).image} />
            </Col>
          </BlockRow>
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

          <BlockRow mobile={{ bottom: '6', top: '0' }}>
            <Col width={[1, 1, 1, 4 / 12]}>
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />,
                  // eslint-disable-next-line react/display-name
                  paragraph: props => <BodyPrimary reverse {...props} />
                }}
              />
            </Col>

            <Col width={[1, 1, 1, 8 / 12]}>
              <Image image={normalise(data7).image} />
            </Col>
          </BlockRow>
        </Grid>
      </TanBackground>

      <BrownBackground>
        <Grid>
          <BlockRow mobile={{ bottom: '4', top: '4' }}>
            <Col width={[1]}>
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />
                }}
                source={normalise(data8).text}
              />
            </Col>

            <Block4ImageCol width={[1]}>
              <Image image={normalise(data8).image} />
            </Block4ImageCol>
          </BlockRow>
        </Grid>
      </BrownBackground>
      {/* <Grid>
        <CaseStudyPreview
          isTop={false}
          caseStudy={caseStudy.relatedCaseStudy}
        />
      </Grid> */}
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
          id
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
