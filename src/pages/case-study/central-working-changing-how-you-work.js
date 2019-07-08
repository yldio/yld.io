import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'
import { generate } from 'shortid'

import { Grid, Row, Col } from '../../components/grid'
import GreyBackground from '../../components/Common/GreyBackground'
import Layout from '../../components/layout'
import Head from '../../components/Common/Head'
import Hr from '../../components/Common/Hr'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import {
  TextColumnsBlock,
  renderImage
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks'

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

const GreyBodyPrimary = styled(BodyPrimary)`
  color: ${({ theme }) => theme.colors.secondaryText};
`
const Block3Image = styled.div`
  padding-top: ${({ theme }) => theme.space[3]};
`

const Block6ImageCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`

const Block7ImageCol = styled(Col)`
  ${breakpoint('smallPhone', 'phone')`
    padding-top: ${({ theme }) => theme.space[4]};
  `}
`

const BrownBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.black};
`

const TanBackground = styled.div`
  background-color: ${({ theme }) => theme.colors.tanBg};
`

const StyledHr = styled(Hr)`
  margin-left: auto;
  margin-right: auto;

  ${breakpoint('smallTablet')`
    display: none
  ;`}
`
const Block4ImageCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[4]};
`

const Block9ImageCol = styled(Col)`
  ${breakpoint('smallPhone')`
    padding-top: ${({ theme }) => theme.space[4]}
  `}
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

  const outComesDataText = normalise(data2, 0).text
  const outComesDataFigures = normaliseAll(data2.slice(1))

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
          <BlockRow
            style={{ flexDirection: 'column', alignItems: 'center' }}
            mobile={{ bottom: '4', top: '4' }}
            tablet={{ top: '6' }}
          >
            {shouldRender(data2) && (
              <Fragment>
                <ReactMarkdown
                  renderers={{
                    // eslint-disable-next-line
                    heading: props => (
                      <Col width={[1]} style={{ textAlign: 'center' }}>
                        <SectionTitle {...props} />
                      </Col>
                    ),
                    // eslint-disable-next-line
                    paragraph: props => (
                      <Col
                        width={[1, 1, 1, 1, 9 / 12, 6 / 12]}
                        style={{ textAlign: 'center' }}
                      >
                        <BodyPrimary {...props} />
                      </Col>
                    )
                  }}
                  source={outComesDataText}
                />
              </Fragment>
            )}
          </BlockRow>
          <BlockRow
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '4' }}
            tablet={{ bottom: '6' }}
          >
            {outComesDataFigures.map(({ text }, index) => {
              return (
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
                      heading: props => <SectionTitle {...props} />,
                      // eslint-disable-next-line
                      paragraph: props => <GreyBodyPrimary {...props} />
                    }}
                    source={text}
                  />
                  {index + 1 < outComesDataFigures.length && <StyledHr short />}
                </Col>
              )
            })}
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

          <Col width={[1, 1, 1, 8 / 12]}>
            <Block3Image>{renderImage(normalise(data3).image)}</Block3Image>
          </Col>
        </BlockRow>
      </Grid>
      <BrownBackground>
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
      </BrownBackground>

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
            <BlockRow mobile={{ bottom: '5' }}>
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

      <BrownBackground>
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
      </BrownBackground>

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

      <CaseStudyPreview isTop={false} caseStudy={caseStudy.relatedCaseStudy} />
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
