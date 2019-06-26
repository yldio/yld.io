import React from 'react'
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

const BlockRow = styled(Row)`
padding-top: ${({ theme }) => theme.space[5]};
padding-bottom: ${({ theme }) => theme.space[5]};
flex-direction: ${({ reverse }) => `row${reverse ? '-reverse' : null}`};

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

const renderImage = image => image && <img src={image} alt={image} />

const renderText = (text, disallowed = []) =>
  text && (
    <ReactMarkdown
      disallowedTypes={disallowed}
      renderers={{
        // eslint-disable-next-line
        heading: props => <SectionTitle {...props} />,
        // eslint-disable-next-line
        paragraph: props => <BodyPrimary {...props} />
      }}
      source={text}
    />
  )

const Block = ({ data: { text, image } }) => (
  <Grid>
    <BlockRow>
      <Col width={[1]}>
        {renderText(text)}
        {renderImage(image)}
      </Col>
    </BlockRow>
  </Grid>
)

const BlockTextColumns = ({ data: { text } }) => (
  <Grid>
    <BlockRow>
      <Col width={[1, 1, 1, 1 / 2]}>{renderText(text, ['paragraph'])}</Col>
      <Col width={[1, 1, 1, 1 / 2]}>{renderText(text, ['heading'])}</Col>
    </BlockRow>
  </Grid>
)

const BlockTextAndImage = ({ data: { text, image }, reverse = null }) => (
  <Grid>
    <BlockRow reverse={reverse}>
      <Col width={[1, 1, 1, 1 / 2]}>{renderText(text)}</Col>
      <Col width={[1, 1, 1, 1 / 2]}>{renderImage(image)}</Col>
    </BlockRow>
  </Grid>
)

const BlockImage = ({ data: { image } }) => (
  <Grid>
    <BlockRow>
      <Col width={[1]}>{renderImage(image)}</Col>
    </BlockRow>
  </Grid>
)

const BlockImages = ({ data: { image1, image2, image3, image4 } }) => (
  <Grid>
    <BlockRow>
      {[image1, image2, image3, image4].map(image => (
        <Col width={[1, 1, 1 / 2, 1 / 2, 1 / 4]} key={image}>
          {renderImage(image)}
        </Col>
      ))}
    </BlockRow>
  </Grid>
)

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

const normaliseImages = (arr = []) => {
  const normalised = arr.map(({ genericBlockImages, ...props }) => ({
    image1: getImage(genericBlockImages, 0),
    image2: getImage(genericBlockImages, 1),
    image3: getImage(genericBlockImages, 2),
    image4: getImage(genericBlockImages, 3),
    ...props
  }))
  return normalised[0]
}

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
        {/* DoctorLink is a healthcare technology company with a mission to simplify the route to health and wellbeing for patients globally... */}
        {shouldRender(data1) && <Block data={normalise(data1)} />}
      </GreyBackground>

      {/* The prologue */}
      {shouldRender(data2) && <BlockTextAndImage data={normalise(data2)} />}

      {/* Youtube Video */}
      {shouldRender(data3) && <Block data={normalise(data3)} />}

      {/* Finding common ground */}
      {shouldRender(data4) && <BlockTextColumns data={normalise(data4)} />}

      <BlueBackground>
        {/* Seamless */}
        {shouldRender(data5) && <BlockTextColumns data={normalise(data5)} />}
      </BlueBackground>

      {/* A new visual language */}
      {shouldRender(data6) && <BlockTextColumns data={normalise(data6)} />}

      {/* Image - Continue / back */}
      {shouldRender(data7) && <BlockImage data={normalise(data7)} />}

      {/* Hi I am Noto sans */}
      {shouldRender(data8) && (
        <BlockTextAndImage data={normalise(data8)} reverse />
      )}

      {/* Colour */}
      {shouldRender(data9) && <BlockTextAndImage data={normalise(data9)} />}

      {/* Image - Colour */}
      {shouldRender(data10) && <BlockImage data={normalise(data10)} />}

      {/* Illustrations */}
      {shouldRender(data11) && (
        <BlockTextAndImage data={normalise(data11)} reverse />
      )}

      {/* images - 4 images block */}
      {shouldRender(data12) && <BlockImages data={normaliseImages(data12)} />}

      <GreyBackground>
        {/* Prototyping and fast iteration */}
        {shouldRender(data13) && <BlockTextColumns data={normalise(data13)} />}

        {/* Image - Welcome to DoctorLink */}
        {shouldRender(data14) && <BlockImage data={normalise(data14)} />}
      </GreyBackground>

      {/* New design methodology */}
      {shouldRender(data15) && <BlockTextAndImage data={normalise(data15)} />}

      {/* Baseline grid */}
      {shouldRender(data16) && (
        <BlockTextAndImage data={normalise(data16)} reverse />
      )}

      {/* Base unit */}
      {shouldRender(data17) && (
        <BlockTextAndImage data={normalise(data17)} reverse />
      )}

      {/* Automated design */}
      {shouldRender(data18) && <BlockTextAndImage data={normalise(data18)} />}

      {/* Documentation */}
      {shouldRender(data19) && <BlockTextAndImage data={normalise(data19)} />}

      {/* Image - Text styles */}
      {shouldRender(data20) && <BlockImage data={normalise(data20)} />}

      {/* Extensive documentation */}
      {shouldRender(data21) && <BlockTextAndImage data={normalise(data21)} />}

      {/* Image - Password text field */}
      {shouldRender(data22) && <BlockImage data={normalise(data22)} />}

      <BlueBackground>
        {/* Aligning design and engineering */}
        {shouldRender(data23) && <BlockTextColumns data={normalise(data23)} />}

        {/* Properties / Tokens */}
        {shouldRender(data24) && (
          <BlockTextAndImage data={normalise(data24)} reverse />
        )}
      </BlueBackground>

      <GreyBackground>
        {/* Reaping the immediate rewards */}
        {shouldRender(data25) && <BlockTextColumns data={normalise(data25)} />}

        {/* Image - Check symptoms */}
        {shouldRender(data26) && <BlockImage data={normalise(data26)} />}
      </GreyBackground>

      {/* The product blueprint */}
      {shouldRender(data27) && <BlockTextAndImage data={normalise(data27)} />}

      {/* Documented content layout */}
      {shouldRender(data28) && <Block data={normalise(data28)} />}

      {/* Product implementation */}
      {shouldRender(data29) && <Block data={normalise(data29)} />}

      <GreyBackground>
        {/* Improving our process */}
        {shouldRender(data30) && <BlockTextColumns data={normalise(data30)} />}
      </GreyBackground>

      {/* Leaving in good health */}
      {shouldRender(data31) && <BlockTextColumns data={normalise(data31)} />}
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
