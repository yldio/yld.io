import React, { Fragment } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
// import { Padding } from 'styled-components-spacing'
import ReactMarkdown from 'react-markdown'
// import generate from 'shortid'

import { Grid, Row, Col } from '../../components/grid'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import Layout from '../../components/layout'
// import { makeText } from '../../utils/makeText'
import Head from '../../components/Common/Head'
// import Image from '../../components/Common/Image'
// import VideoSection from '../../components/Common/VideoSection'
// import SubtitleWithBody from '../../components/Common/SubtitleWithBody'
// import Statement from '../../components/Common/Statement'
import BlueBackground from '../../components/Common/BlueBackground'
import GreyBackground from '../../components/Common/GreyBackground'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'

const BlockRow = styled(Row)`
padding-top: ${({ theme }) => theme.space[5]};
padding-bottom: ${({ theme }) => theme.space[5]};
flex-direction: ${({ rowReverse }) => `row${rowReverse ? '-reverse' : null}`};
align-items: ${({ alignCenter }) => (alignCenter ? 'center' : null)};

${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
`}

${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[7]};
    padding-bottom: ${({ theme }) => theme.space[7]};
`}

${breakpoint('desktop')`
    padding-bottom: ${({ theme }) => theme.space[8]};
`}
`

const renderImage = imageUrl =>
  imageUrl && <img src={imageUrl} alt={imageUrl} />

const renderText = (text, colorReverse, disallowed = []) =>
  text && (
    <ReactMarkdown
      disallowedTypes={disallowed}
      renderers={{
        // eslint-disable-next-line
        heading: props => <SectionTitle reverse={colorReverse} {...props} />,
        // eslint-disable-next-line
        paragraph: props => <BodyPrimary reverse={colorReverse} {...props} />
      }}
      source={text}
    />
  )

const TextColumnsBlock = ({ data: { text }, colorReverse = false }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1 / 2]}>
      {renderText(text, colorReverse, ['paragraph'])}
    </Col>
    <Col width={[1, 1, 1, 1 / 2]}>
      {renderText(text, colorReverse, ['heading'])}
    </Col>
  </Fragment>
)

const TextAndImageBlock = ({ data: { text, image }, colorReverse = false }) => (
  <Fragment>
    <Col width={[1, 1, 1, 1 / 2]}>{renderText(text, colorReverse)}</Col>
    <Col width={[1, 1, 1, 1 / 2]}>{renderImage(image)}</Col>
  </Fragment>
)

const FullWidthBlock = ({ data: { text, image } }) => (
  <Col width={[1]}>
    {renderText(text)}
    {renderImage(image)}
  </Col>
)

const ImagesBlock = ({ data }) => {
  const l = data.length
  const colWidth = [1, 1, 2 / l, 2 / l, 1 / l]

  return (
    <Fragment>
      {data.map(imageUrl => (
        <Col width={colWidth} key={imageUrl}>
          {renderImage(imageUrl)}
        </Col>
      ))}
    </Fragment>
  )
}

const getImage = (blockImages, index) =>
  blockImages && blockImages[index] && blockImages[index].file.url

const normalise = (arr = []) => {
  const normalised = arr.map(
    ({ genericBlockText, genericBlockImages, ...props }) => ({
      image: getImage(genericBlockImages, 0),
      text: genericBlockText && genericBlockText.genericBlockText,
      ...props
    })
  )
  return normalised[0]
}

const normaliseImages = ({ genericBlockImages = [] }) =>
  genericBlockImages.map(imageData => imageData.file && imageData.file.url)

const shouldRender = data => data && data.length

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
    genericBlock10: data10,
    genericBlock11: data11,
    genericBlock12: data12,
    genericBlock13: data13,
    genericBlock14: data14,
    genericBlock15: data15,
    genericBlock16: data16,
    genericBlock17: data17,
    genericBlock18: data18,
    genericBlock19: data19,
    genericBlock20: data20,
    genericBlock21: data21,
    genericBlock22: data22,
    genericBlock23: data23,
    genericBlock24: data24,
    genericBlock25: data25,
    genericBlock26: data26,
    genericBlock27: data27,
    genericBlock28: data28,
    genericBlock29: data29,
    genericBlock30: data30,
    genericBlock31: data31
  } = caseStudy

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

      <GreyBackground>
        <Grid>
          {/* DoctorLink is a healthcare technology company with a mission to simplify the route to health and wellbeing for patients globally... */}
          {shouldRender(data1) && (
            <BlockRow>
              <FullWidthBlock data={normalise(data1)} />
            </BlockRow>
          )}
        </Grid>
      </GreyBackground>

      <Grid>
        {/* The prologue */}
        {shouldRender(data2) && (
          <BlockRow alignCenter>
            <TextAndImageBlock data={normalise(data2)} />
          </BlockRow>
        )}

        {/* Youtube Video */}
        {shouldRender(data3) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data3)} />
          </BlockRow>
        )}

        {/* Finding common ground */}
        {shouldRender(data4) && (
          <BlockRow>
            <TextColumnsBlock data={normalise(data4)} />
          </BlockRow>
        )}
      </Grid>

      <BlueBackground>
        <Grid>
          {/* Seamless */}
          {shouldRender(data5) && (
            <BlockRow>
              <TextColumnsBlock data={normalise(data5)} colorReverse />
            </BlockRow>
          )}
        </Grid>
      </BlueBackground>

      <Grid>
        {/* A new visual language */}
        {shouldRender(data6) && (
          <BlockRow>
            <TextColumnsBlock data={normalise(data6)} />
          </BlockRow>
        )}

        {/* Image - Continue / back */}
        {shouldRender(data7) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data7)} />
          </BlockRow>
        )}

        {/* Hi I am Noto sans */}
        {shouldRender(data8) && (
          <BlockRow rowReverse alignCenter>
            <TextAndImageBlock data={normalise(data8)} />
          </BlockRow>
        )}

        {/* Colour */}
        {shouldRender(data9) && (
          <BlockRow>
            <TextAndImageBlock data={normalise(data9)} />
          </BlockRow>
        )}

        {/* Image - Colour */}
        {shouldRender(data10) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data10)} />
          </BlockRow>
        )}

        {/* Illustrations */}
        {shouldRender(data11) && (
          <BlockRow rowReverse>
            <TextAndImageBlock data={normalise(data11)} />
          </BlockRow>
        )}

        {/* images - 4 images block */}
        {shouldRender(data12) && (
          <BlockRow>
            <ImagesBlock data={normaliseImages(data12[0])} />
          </BlockRow>
        )}
      </Grid>

      <GreyBackground>
        <Grid>
          {/* Prototyping and fast iteration */}
          {shouldRender(data13) && (
            <BlockRow>
              <TextColumnsBlock data={normalise(data13)} />
            </BlockRow>
          )}

          {/* Image - Welcome to DoctorLink */}
          {shouldRender(data14) && (
            <BlockRow>
              <FullWidthBlock data={normalise(data14)} />
            </BlockRow>
          )}
        </Grid>
      </GreyBackground>

      <Grid>
        {/* New design methodology */}
        {shouldRender(data15) && (
          <BlockRow>
            <TextAndImageBlock data={normalise(data15)} />
          </BlockRow>
        )}

        {/* Baseline grid */}
        {shouldRender(data16) && (
          <BlockRow rowReverse alignCenter>
            <TextAndImageBlock data={normalise(data16)} />
          </BlockRow>
        )}

        {/* Base unit */}
        {shouldRender(data17) && (
          <BlockRow rowReverse alignCenter>
            <TextAndImageBlock data={normalise(data17)} />
          </BlockRow>
        )}

        {/* Automated design */}
        {shouldRender(data18) && (
          <BlockRow alignCenter>
            <TextAndImageBlock data={normalise(data18)} />
          </BlockRow>
        )}

        {/* Documentation */}
        {shouldRender(data19) && (
          <BlockRow>
            <TextAndImageBlock data={normalise(data19)} />
          </BlockRow>
        )}

        {/* Image - Text styles */}
        {shouldRender(data20) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data20)} />
          </BlockRow>
        )}

        {/* Extensive documentation */}
        {shouldRender(data21) && (
          <BlockRow>
            <TextAndImageBlock data={normalise(data21)} />
          </BlockRow>
        )}

        {/* Image - Password text field */}
        {shouldRender(data22) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data22)} />
          </BlockRow>
        )}
      </Grid>

      <BlueBackground>
        <Grid>
          {/* Aligning design and engineering */}
          {shouldRender(data23) && (
            <BlockRow>
              <TextColumnsBlock data={normalise(data23)} colorReverse />
            </BlockRow>
          )}

          {/* Properties / Tokens */}
          {shouldRender(data24) && (
            <BlockRow rowReverse>
              <TextAndImageBlock data={normalise(data24)} colorReverse />
            </BlockRow>
          )}
        </Grid>
      </BlueBackground>

      <GreyBackground>
        <Grid>
          {/* Reaping the immediate rewards */}
          {shouldRender(data25) && (
            <BlockRow>
              <TextColumnsBlock data={normalise(data25)} />
            </BlockRow>
          )}

          {/* Image - Check symptoms */}
          {shouldRender(data26) && (
            <BlockRow>
              <FullWidthBlock data={normalise(data26)} />
            </BlockRow>
          )}
        </Grid>
      </GreyBackground>

      <Grid>
        {/* The product blueprint */}
        {shouldRender(data27) && (
          <BlockRow>
            <TextAndImageBlock data={normalise(data27)} />
          </BlockRow>
        )}

        {/* Documented content layout */}
        {shouldRender(data28) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data28)} />
          </BlockRow>
        )}

        {/* Product implementation */}
        {shouldRender(data29) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data29)} />
          </BlockRow>
        )}
      </Grid>

      <GreyBackground>
        <Grid>
          {/* Improving our process */}
          {shouldRender(data30) && (
            <BlockRow>
              <TextColumnsBlock data={normalise(data30)} />
            </BlockRow>
          )}
        </Grid>
      </GreyBackground>

      <Grid>
        {/* Leaving in good health */}
        {shouldRender(data31) && (
          <BlockRow>
            <TextColumnsBlock data={normalise(data31)} />
          </BlockRow>
        )}

        <CaseStudyPreview
          isTop={false}
          caseStudy={caseStudy.relatedCaseStudy}
        />
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  fragment GenericFragment on ContentfulNonTemplatedCaseStudyGenericBlock {
    genericBlockImages {
      file {
        url
      }
    }
    genericBlockText {
      genericBlockText
    }
  }

  {
    contentfulNonTemplatedCaseStudyV2(slug: { eq: "doctorlink-case-study" }) {
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
      seoTitle
      seoMetaDescription
    }
  }
`
export default IndexPage
