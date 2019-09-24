import React from 'react'
import { graphql } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../../components/grid'
import BlueBackground from '../../components/Common/BlueBackground'
import GreyBackground from '../../components/Common/GreyBackground'
import Layout from '../../components/layout'
import Head from '../../components/Common/Head'
import Hr from '../../components/Common/Hr'
import CaseStudyHero from '../../components/Common/CaseStudyCards/CaseStudyHero'
import {
  renderText,
  MobileReverseOrderWrapper,
  TextColumnsBlock,
  FullWidthBlock,
  HalfGreyBackground,
  VideoBlock,
  ImagesBlock,
  TextAndImageBlock,
  TextAndResizedImageBlock,
  BlockRow,
  shouldRender,
  getImage,
  getImages,
  normalise
} from '../../components/Common/CaseStudyCards/CaseStudyBlocks'
import { SectionTitle, BodyPrimary } from '../../components/Typography'
import Statement from '../../components/Common/Statement'
import CaseStudyPreview from '../../components/Common/CaseStudyCards/CaseStudyPreview'
import Image from '../../components/Common/Image'

const PropertiesAndTokensBlockRow = styled(BlockRow)`
  flex-direction: column;

  ${breakpoint('largePhone')`
    flex-direction: row;
  `}
`

const SeamlessStyledBodyPrimary = styled(BodyPrimary)`
  ${breakpoint('smallPhone', 'phone')`
    padding-top ${({ theme }) => theme.space[3]}
  `}

  > strong {
    font-weight: bold;
  }
`

const PropertiesAndTokensBlock = ({
  data = [],
  colorReverse = false,
  bpColorReverse = false
}) => {
  const {
    genericBlockImages,
    genericBlockText: { genericBlockText: textOne }
  } = data[0]

  const image = getImage(genericBlockImages, 0)
  const {
    genericBlockText: { genericBlockText: textTwo }
  } = data[1]

  const PropertiesAndTokensImage = styled(Image)`
    width: 314px;
  `

  return (
    <PropertiesAndTokensBlockRow
      mobile={{ bottom: '4' }}
      smallTablet={{ bottom: '5' }}
      tablet={{ bottom: '6' }}
    >
      <Col width={[0, 0, 0, 0, 0, 3 / 8]}>
        {image && <PropertiesAndTokensImage image={image} />}
      </Col>
      <Col width={[0, 0, 0, 0, 0, 1 / 8]} />
      <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
        {renderText({
          text: textOne,
          colorReverse,
          bpColorReverse,
          bpFont: 'PT Mono, sans-serif',
          bpFontSmall: true
        })}
      </Col>
      <Col width={[1, 1, 1, 1 / 2, 1 / 2, 1 / 4]}>
        {renderText({
          text: textTwo,
          colorReverse,
          bpColorReverse,
          bpFont: 'PT Mono, sans-serif',
          bpFontSmall: true
        })}
      </Col>
    </PropertiesAndTokensBlockRow>
  )
}

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
    <Layout
      location={location}
      contactUsBg={'greyBg'}
      footerContactUsId={caseStudy.footerContactUs.id}
    >
      <Head seoMetaData={caseStudy.seoMetaData} />
      <CaseStudyHero caseStudy={caseStudy} as="h1" />
      <GreyBackground>
        {/* DoctorLink is a healthcare technology company */}
        {shouldRender(data1) && <Statement>{normalise(data1).text}</Statement>}
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
            <TextAndImageBlock
              data={normalise(data2)}
              colWidthOne={[1, 1, 1, 1, 5 / 12]}
              colWidthTwo={[1, 1, 1, 1, 6 / 12]}
              middleColWidth={[0, 0, 0, 0, 1 / 12]}
            />
          </BlockRow>
        )}
      </Grid>
      <HalfGreyBackground>
        <Grid>
          {/* Youtube Video */}
          {shouldRender(data3) && <VideoBlock data={normalise(data3)} />}
        </Grid>
      </HalfGreyBackground>
      <HalfGreyBackground mobile>
        {shouldRender(data3) && <VideoBlock data={normalise(data3)} />}
      </HalfGreyBackground>
      <GreyBackground>
        <Grid flex>
          {/* Finding common ground */}
          {shouldRender(data4) && (
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              smallTablet={{ bottom: '5', top: '5' }}
              tablet={{ bottom: '6', top: '6' }}
              desktop={{ bottom: '7', top: '7' }}
            >
              <TextColumnsBlock
                data={normalise(data4)}
                headerColCss={{
                  alignContent: 'center'
                }}
              />
            </BlockRow>
          )}
        </Grid>
      </GreyBackground>
      <BlueBackground>
        <Grid>
          {/* Seamless. Empowering. Universal. */}
          {shouldRender(data5) && (
            <BlockRow
              mobile={{ bottom: '4', top: '4' }}
              smallTablet={{ bottom: '5', top: '5' }}
              tablet={{ bottom: '6', top: '6' }}
            >
              <Col
                width={[1, 1, 1, 1, 1 / 2]}
                block={false}
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <ReactMarkdown
                  disallowedTypes={['paragraph']}
                  renderers={{
                    // eslint-disable-next-line
                    heading: props => (
                      <SectionTitle noPadding reverse {...props} />
                    )
                  }}
                  source={normalise(data5).text}
                />
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <ReactMarkdown
                  disallowedTypes={['heading']}
                  renderers={{
                    // eslint-disable-next-line
                    paragraph: props => (
                      <SeamlessStyledBodyPrimary reverse {...props} />
                    )
                  }}
                  source={normalise(data5).text}
                />
              </Col>
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
            columnReverse
            alignCenter
            mobile={{ bottom: '5', top: '5' }}
            smallTablet={{ bottom: '6', top: '6' }}
            tablet={{ bottom: '7', top: '7' }}
            desktop={{ bottom: '8', top: '8' }}
          >
            <TextAndResizedImageBlock data={normalise(data8)} />
          </BlockRow>
        )}

        <MobileReverseOrderWrapper>
          {/* Colour */}
          {shouldRender(data9) && (
            <BlockRow mobile={{ bottom: '5' }} tablet={{ bottom: '6' }}>
              <TextAndImageBlock data={normalise(data9)} />
            </BlockRow>
          )}

          {/* Image for Colour */}
          {shouldRender(data10) && (
            <BlockRow mobile={{ bottom: '4' }} smallTablet={{ bottom: '0' }}>
              <FullWidthBlock data={normalise(data10)} />
            </BlockRow>
          )}
        </MobileReverseOrderWrapper>

        <MobileReverseOrderWrapper>
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
        </MobileReverseOrderWrapper>
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
            columnReverse
            alignCenter
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '6' }}
            tablet={{ bottom: '7' }}
            desktop={{ bottom: '8' }}
          >
            <TextAndImageBlock
              data={normalise(data16)}
              colWidthOne={[1, 1, 1, 1, 5 / 12]}
              colWidthTwo={[1, 1, 1, 1, 6 / 12]}
              middleColWidth={[0, 0, 0, 0, 1 / 12]}
            />
          </BlockRow>
        )}

        {/* Base unit */}
        {shouldRender(data17) && (
          <BlockRow
            rowReverse
            columnReverse
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
            columnReverse
            alignCenter
            mobile={{ bottom: '5' }}
            smallTablet={{ bottom: '6' }}
            tablet={{ bottom: '7' }}
          >
            <TextAndResizedImageBlock data={normalise(data18)} />
          </BlockRow>
        )}

        <MobileReverseOrderWrapper>
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
        </MobileReverseOrderWrapper>

        <MobileReverseOrderWrapper>
          {/* Extensive documentation */}
          {shouldRender(data21) && (
            <BlockRow mobile={{ bottom: '5' }} tablet={{ bottom: '6' }}>
              <TextAndImageBlock data={normalise(data21)} />
            </BlockRow>
          )}

          {/* Image for Extensive documentation - Password text field */}
          {shouldRender(data22) && (
            <BlockRow mobile={{ bottom: '4' }} tablet={{ bottom: '7' }}>
              <FullWidthBlock data={normalise(data22)} />
            </BlockRow>
          )}
        </MobileReverseOrderWrapper>
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
              <TextColumnsBlock
                data={normalise(data23)}
                colorReverse
                bpColorReverse
              />
            </BlockRow>
          )}

          {/* Save your details button image / Properties & Tokens */}
          {shouldRender(data24) && (
            <PropertiesAndTokensBlock
              data={data24}
              colorReverse
              bpColorReverse
            />
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
              <TextColumnsBlock
                data={normalise(data25)}
                colWidthOne={[1, 1, 1, 1, 5 / 12]}
                colWidthTwo={[1, 1, 1, 1, 6 / 12]}
                middleColWidth={[0, 0, 0, 0, 1 / 12]}
              />
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
        <Row>
          <Col width={[1]}>
            <Hr />
          </Col>
        </Row>
      </Grid>
      <CaseStudyPreview
        isTop={false}
        caseStudy={caseStudy.relatedCaseStudies[0]}
      />
    </Layout>
  )
}

export const query = graphql`
  {
    contentfulNonTemplatedCaseStudyV2(
      slug: { eq: "doctorlink-setting-up-a-design-system" }
    ) {
      slug
      title
      posterImage {
        title
        file {
          url
        }
      }
      seoMetaData {
        ...SEOMetaFields
      }
      ...NonTemplatedCaseStudyV2Related
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
      footerContactUs {
        id
      }
    }
  }
`
export default IndexPage
