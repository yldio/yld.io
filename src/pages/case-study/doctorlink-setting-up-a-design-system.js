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
flex-direction: ${({ rowReverse }) => `row${rowReverse ? '-reverse' : null}`};

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
  <Grid>
    <BlockRow>
      <Col width={[1, 1, 1, 1 / 2]}>
        {renderText(text, colorReverse, ['paragraph'])}
      </Col>
      <Col width={[1, 1, 1, 1 / 2]}>
        {renderText(text, colorReverse, ['heading'])}
      </Col>
    </BlockRow>
  </Grid>
)

const TextAndImageBlock = ({
  data: { text, image },
  rowReverse = null,
  colorReverse = false
}) => (
  <Grid>
    <BlockRow rowReverse={rowReverse}>
      <Col width={[1, 1, 1, 1 / 2]}>{renderText(text, colorReverse)}</Col>
      <Col width={[1, 1, 1, 1 / 2]}>{renderImage(image)}</Col>
    </BlockRow>
  </Grid>
)

const FullWidthBlock = ({ data: { text, image } }) => (
  <Grid>
    <BlockRow>
      <Col width={[1]}>
        {renderText(text)}
        {renderImage(image)}
      </Col>
    </BlockRow>
  </Grid>
)

const ImagesBlock = ({ data }) => {
  const l = data.length
  const colWidth = [1, 1, 2 / l, 2 / l, 1 / l]

  return (
    <Grid>
      <BlockRow>
        {data.map(imageUrl => (
          <Col width={colWidth} key={imageUrl}>
            {renderImage(imageUrl)}
          </Col>
        ))}
      </BlockRow>
    </Grid>
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
        {/* DoctorLink is a healthcare technology company with a mission to simplify the route to health and wellbeing for patients globally... */}
        {shouldRender(data1) && <FullWidthBlock data={normalise(data1)} />}
      </GreyBackground>

      {/* The prologue */}
      {shouldRender(data2) && <TextAndImageBlock data={normalise(data2)} />}

      {/* Youtube Video */}
      {shouldRender(data3) && <FullWidthBlock data={normalise(data3)} />}

      {/* Finding common ground */}
      {shouldRender(data4) && <TextColumnsBlock data={normalise(data4)} />}

      <BlueBackground>
        {/* Seamless */}
        {shouldRender(data5) && (
          <TextColumnsBlock data={normalise(data5)} colorReverse />
        )}
      </BlueBackground>

      {/* A new visual language */}
      {shouldRender(data6) && <TextColumnsBlock data={normalise(data6)} />}

      {/* Image - Continue / back */}
      {shouldRender(data7) && <FullWidthBlock data={normalise(data7)} />}

      {/* Hi I am Noto sans */}
      {shouldRender(data8) && (
        <TextAndImageBlock data={normalise(data8)} rowReverse />
      )}

      {/* Colour */}
      {shouldRender(data9) && <TextAndImageBlock data={normalise(data9)} />}

      {/* Image - Colour */}
      {shouldRender(data10) && <FullWidthBlock data={normalise(data10)} />}

      {/* Illustrations */}
      {shouldRender(data11) && (
        <TextAndImageBlock data={normalise(data11)} rowReverse />
      )}

      {/* images - 4 images block */}
      {shouldRender(data12) && (
        <ImagesBlock data={normaliseImages(data12[0])} />
      )}

      <GreyBackground>
        {/* Prototyping and fast iteration */}
        {shouldRender(data13) && <TextColumnsBlock data={normalise(data13)} />}

        {/* Image - Welcome to DoctorLink */}
        {shouldRender(data14) && <FullWidthBlock data={normalise(data14)} />}
      </GreyBackground>

      {/* New design methodology */}
      {shouldRender(data15) && <TextAndImageBlock data={normalise(data15)} />}

      {/* Baseline grid */}
      {shouldRender(data16) && (
        <TextAndImageBlock data={normalise(data16)} rowReverse />
      )}

      {/* Base unit */}
      {shouldRender(data17) && (
        <TextAndImageBlock data={normalise(data17)} rowReverse />
      )}

      {/* Automated design */}
      {shouldRender(data18) && <TextAndImageBlock data={normalise(data18)} />}

      {/* Documentation */}
      {shouldRender(data19) && <TextAndImageBlock data={normalise(data19)} />}

      {/* Image - Text styles */}
      {shouldRender(data20) && <FullWidthBlock data={normalise(data20)} />}

      {/* Extensive documentation */}
      {shouldRender(data21) && <TextAndImageBlock data={normalise(data21)} />}

      {/* Image - Password text field */}
      {shouldRender(data22) && <FullWidthBlock data={normalise(data22)} />}

      <BlueBackground>
        {/* Aligning design and engineering */}
        {shouldRender(data23) && (
          <TextColumnsBlock data={normalise(data23)} colorReverse />
        )}

        {/* Properties / Tokens */}
        {shouldRender(data24) && (
          <TextAndImageBlock data={normalise(data24)} rowReverse colorReverse />
        )}
      </BlueBackground>

      <GreyBackground>
        {/* Reaping the immediate rewards */}
        {shouldRender(data25) && <TextColumnsBlock data={normalise(data25)} />}

        {/* Image - Check symptoms */}
        {shouldRender(data26) && <FullWidthBlock data={normalise(data26)} />}
      </GreyBackground>

      {/* The product blueprint */}
      {shouldRender(data27) && <TextAndImageBlock data={normalise(data27)} />}

      {/* Documented content layout */}
      {shouldRender(data28) && <FullWidthBlock data={normalise(data28)} />}

      {/* Product implementation */}
      {shouldRender(data29) && <FullWidthBlock data={normalise(data29)} />}

      <GreyBackground>
        {/* Improving our process */}
        {shouldRender(data30) && <TextColumnsBlock data={normalise(data30)} />}
      </GreyBackground>

      {/* Leaving in good health */}
      {shouldRender(data31) && <TextColumnsBlock data={normalise(data31)} />}
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
