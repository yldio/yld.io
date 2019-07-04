import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../../components/grid'
import BlueBackground from '../../components/Common/BlueBackground'
import GreyBackground from '../../components/Common/GreyBackground'
import Layout from '../../components/layout'
import Head from '../../components/Common/Head'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import {
  renderImage,
  renderText,
  TextColumnsBlock,
  FullWidthBlock,
  VideoBlock,
  ImagesBlock,
  TextAndImageBlock,
  TextAndResizedImageBlock
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks'
// import SubtitleWithBody from '../../components/Common/SubtitleWithBody'
import Statement from '../../components/Common/Statement'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'

const BlockRow = styled(Row)`
  flex-direction: ${({ rowReverse }) => `row${rowReverse ? '-reverse' : null}`};
  align-items: ${({ alignCenter }) => (alignCenter ? 'center' : null)};
  padding-top: ${({ theme, mobile }) =>
    mobile && mobile.top ? theme.space[mobile.top] : null};
  padding-bottom: ${({ theme, mobile }) =>
    mobile && mobile.bottom ? theme.space[mobile.bottom] : null};
  justify-content: ${({ spaced }) => spaced && 'space-evenly'};

  ${breakpoint('phone')`
    justify-content: ${({ spaced }) => spaced && 'space-between'};
  `}

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

const ReversableDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;

  ${breakpoint('smallTablet')`
    flex-direction: column;
  `}
`

const PropertiesAndTokensBlockRow = styled(BlockRow)`
  flex-direction: column;

  ${breakpoint('largePhone')`
    flex-direction: row;
  `}
`

const PropertiesAndTokensBlock = ({ data = [], colorReverse = false }) => {
  const {
    genericBlockImages,
    genericBlockText: { genericBlockText: textOne }
  } = data[0]

  const image = getImage(genericBlockImages, 0)
  const {
    genericBlockText: { genericBlockText: textTwo }
  } = data[1]

  return (
    <PropertiesAndTokensBlockRow
      mobile={{ bottom: '4' }}
      smallTablet={{ bottom: '5' }}
      tablet={{ bottom: '6' }}
    >
      <Col width={[0, 0, 0, 0, 0, 3 / 8]}>{renderImage(image)}</Col>
      <Col width={[0, 0, 0, 0, 0, 1 / 8]} />
      <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
        {renderText(textOne, colorReverse)}
      </Col>
      <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
        {renderText(textTwo, colorReverse)}
      </Col>
    </PropertiesAndTokensBlockRow>
  )
}

const getImage = (blockImages, index) => blockImages && blockImages[index]

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

const getImages = data =>
  data.genericBlockImages ? data.genericBlockImages : []

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
          {/* DoctorLink is a healthcare technology company */}
          {shouldRender(data1) && (
            <Statement>{normalise(data1).text}</Statement>
          )}
        </Grid>
      </GreyBackground>

      <Grid>
        {/* The prologue */}
        {shouldRender(data2) && (
          <BlockRow
            alignCenter
            mobile={{ bottom: '5', top: '5' }}
            smallTablet={{ bottom: '7', top: '7' }}
            desktop={{ bottom: '8', top: '7' }}
          >
            <TextAndImageBlock data={normalise(data2)} />
          </BlockRow>
        )}

        {/* Youtube Video */}
        {shouldRender(data3) && <VideoBlock data={normalise(data3)} />}

        {/* Finding common ground */}
        {shouldRender(data4) && (
          <BlockRow
            mobile={{ bottom: '4', top: '4' }}
            smallTablet={{ bottom: '5', top: '5' }}
            tablet={{ bottom: '6', top: '6' }}
            desktop={{ bottom: '7', top: '7' }}
          >
            <TextColumnsBlock data={normalise(data4)} />
          </BlockRow>
        )}
      </Grid>

      <BlueBackground>
        <Grid>
          {/* Seamless. Empowering. Universal. */}
          {shouldRender(data5) && (
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              smallTablet={{ bottom: '5', top: '5' }}
              tablet={{ bottom: '6', top: '6' }}
            >
              <TextColumnsBlock data={normalise(data5)} colorReverse />
            </BlockRow>
          )}
        </Grid>
      </BlueBackground>

      <Grid>
        {/* A new visual language */}
        {shouldRender(data6) && (
          <BlockRow
            mobile={{ bottom: '4', top: '4' }}
            smallTablet={{ bottom: '5', top: '5' }}
            tablet={{ bottom: '6', top: '6' }}
            desktop={{ bottom: '6', top: '7' }}
          >
            <TextColumnsBlock data={normalise(data6)} />
          </BlockRow>
        )}

        {/* Image for new visual language - Continue & back buttons / Name of GP practice */}
        {shouldRender(data7) && (
          <BlockRow>
            <FullWidthBlock data={normalise(data7)} />
          </BlockRow>
        )}

        {/* Hi, I am Noto Sans */}
        {shouldRender(data8) && (
          <BlockRow
            rowReverse
            alignCenter
            mobile={{ bottom: '5', top: '5' }}
            smallTablet={{ bottom: '6', top: '6' }}
            tablet={{ bottom: '7', top: '7' }}
            desktop={{ bottom: '8', top: '8' }}
          >
            <TextAndResizedImageBlock data={normalise(data8)} />
          </BlockRow>
        )}

        <ReversableDiv>
          {/* Colour */}
          {shouldRender(data9) && (
            <BlockRow mobile={{ bottom: '5' }} tablet={{ bottom: '6' }}>
              <TextAndImageBlock data={normalise(data9)} />
            </BlockRow>
          )}

          {/* Image for Colour */}
          {shouldRender(data10) && (
            <BlockRow>
              <FullWidthBlock data={normalise(data10)} />
            </BlockRow>
          )}
        </ReversableDiv>

        <ReversableDiv>
          {/* Illustrations */}
          {shouldRender(data11) && (
            <BlockRow
              rowReverse
              mobile={{ bottom: '5', top: '0' }}
              smallTablet={{ bottom: '5', top: '6' }}
              tablet={{ bottom: '6', top: '7' }}
              desktop={{ bottom: '6', top: '8' }}
            >
              <TextAndImageBlock data={normalise(data11)} />
            </BlockRow>
          )}

          {/* images for illustrations - 4 images block */}
          {shouldRender(data12) && (
            <BlockRow
              mobile={{ bottom: '2' }}
              smallTablet={{ bottom: '6' }}
              tablet={{ bottom: '7' }}
              spaced
            >
              <ImagesBlock data={getImages(data12[0])} />
            </BlockRow>
          )}
        </ReversableDiv>
      </Grid>

      <GreyBackground>
        <Grid>
          {/* Prototyping and fast iteration */}
          {shouldRender(data13) && (
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              smallTablet={{ bottom: '5', top: '5' }}
              tablet={{ bottom: '6', top: '6' }}
            >
              <TextColumnsBlock data={normalise(data13)} />
            </BlockRow>
          )}

          {/* Image for Prototyping - Welcome to DoctorLink */}
          {shouldRender(data14) && (
            <BlockRow
              mobile={{ bottom: '5' }}
              smallTablet={{ bottom: '6' }}
              tablet={{ bottom: '7' }}
            >
              <FullWidthBlock data={normalise(data14)} />
            </BlockRow>
          )}
        </Grid>
      </GreyBackground>

      <Grid>
        {/* New design methodology */}
        {shouldRender(data15) && (
          <BlockRow
            mobile={{ bottom: '4', top: '4' }}
            smallTablet={{ bottom: '5', top: '5' }}
            tablet={{ bottom: '6', top: '6' }}
          >
            <TextAndImageBlock data={normalise(data15)} />
          </BlockRow>
        )}

        {/* Baseline grid */}
        {shouldRender(data16) && (
          <BlockRow
            rowReverse
            alignCenter
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '6' }}
            tablet={{ bottom: '7' }}
            desktop={{ bottom: '8' }}
          >
            <TextAndImageBlock data={normalise(data16)} />
          </BlockRow>
        )}

        {/* Base unit */}
        {shouldRender(data17) && (
          <BlockRow
            rowReverse
            alignCenter
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '6' }}
            tablet={{ bottom: '7' }}
          >
            <TextAndResizedImageBlock data={normalise(data17)} />
          </BlockRow>
        )}

        {/* Automated design */}
        {shouldRender(data18) && (
          <BlockRow
            alignCenter
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '6' }}
            tablet={{ bottom: '7' }}
          >
            <TextAndResizedImageBlock data={normalise(data18)} />
          </BlockRow>
        )}

        {/* Documentation */}
        {shouldRender(data19) && (
          <BlockRow mobile={{ bottom: '5' }} tablet={{ bottom: '6' }}>
            <TextAndImageBlock data={normalise(data19)} />
          </BlockRow>
        )}

        {/* Image for Documentation - Text styles */}
        {shouldRender(data20) && (
          <BlockRow
            mobile={{ bottom: '4' }}
            smallTablet={{ bottom: '6' }}
            tablet={{ bottom: '7' }}
          >
            <FullWidthBlock data={normalise(data20)} />
          </BlockRow>
        )}

        {/* Extensive documentation */}
        {shouldRender(data21) && (
          <BlockRow mobile={{ bottom: '5' }} tablet={{ bottom: '6' }}>
            <TextAndImageBlock data={normalise(data21)} />
          </BlockRow>
        )}

        {/* Image for Extensive documentation - Password text field */}
        {shouldRender(data22) && (
          <BlockRow mobile={{ bottom: '6' }} tablet={{ bottom: '7' }}>
            <FullWidthBlock data={normalise(data22)} />
          </BlockRow>
        )}
      </Grid>

      <BlueBackground>
        <Grid>
          {/* Aligning design and engineering */}
          {shouldRender(data23) && (
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              smallTablet={{ bottom: '5', top: '5' }}
              tablet={{ bottom: '6', top: '6' }}
            >
              <TextColumnsBlock data={normalise(data23)} colorReverse />
            </BlockRow>
          )}

          {/* Save your details button image / Properties & Tokens */}
          {shouldRender(data24) && (
            <PropertiesAndTokensBlock data={data24} colorReverse />
          )}
        </Grid>
      </BlueBackground>

      <GreyBackground>
        <Grid>
          {/* Reaping the immediate rewards */}
          {shouldRender(data25) && (
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              smallTablet={{ bottom: '5', top: '5' }}
              tablet={{ bottom: '6', top: '6' }}
            >
              <TextColumnsBlock data={normalise(data25)} />
            </BlockRow>
          )}

          {/* Image for reaping the immediate rewards - Check symptoms */}
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
          <BlockRow
            mobile={{ bottom: '4', top: '5' }}
            smallTablet={{ bottom: '5', top: '6' }}
            tablet={{ bottom: '6', top: '7' }}
          >
            <TextAndImageBlock data={normalise(data27)} />
          </BlockRow>
        )}

        {/* Documented content layout */}
        {shouldRender(data28) && (
          <BlockRow
            mobile={{ bottom: '4' }}
            smallTablet={{ bottom: '5' }}
            tablet={{ bottom: '6' }}
          >
            <FullWidthBlock data={normalise(data28)} />
          </BlockRow>
        )}

        {/* Product implementation */}
        {shouldRender(data29) && (
          <BlockRow
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '6' }}
            tablet={{ bottom: '7' }}
          >
            <FullWidthBlock data={normalise(data29)} />
          </BlockRow>
        )}
      </Grid>

      <GreyBackground>
        <Grid>
          {/* Improving our process */}
          {shouldRender(data30) && (
            <BlockRow
              mobile={{ bottom: '5', top: '4' }}
              smallTablet={{ bottom: '6', top: '5' }}
              tablet={{ bottom: '7', top: '6' }}
            >
              <TextColumnsBlock data={normalise(data30)} />
            </BlockRow>
          )}
        </Grid>
      </GreyBackground>

      <Grid>
        {/* Leaving in good health */}
        {shouldRender(data31) && (
          <BlockRow
            mobile={{ bottom: '5', top: '4' }}
            smallTablet={{ bottom: '6', top: '5' }}
            tablet={{ bottom: '7', top: '6' }}
          >
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
      title
      fluid {
        ...GatsbyContentfulFluid_withWebp
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
