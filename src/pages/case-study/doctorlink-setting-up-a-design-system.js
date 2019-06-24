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
// import VideoSection from '../../components/Common/VideoSection'
// import BlueBackground from '../../components/Common/BlueBackground'
// import SubtitleWithBody from '../../components/Common/SubtitleWithBody'
// import Statement from '../../components/Common/Statement'
// import GreyBackground from '../../components/Common/GreyBackground'

// const futureContentfulDoctorLinkData = {
//   node: {
//     introSentence: {
//       introSentence: 'Lorem ipsum dolor sit amet'
//     },
//     posterImage: {
//       title: 'Canon case study featured image ',
//       file: {
//         url:
//           'https://www.yld.io/static/logo_animated-832020608244057f6a9d73e80994ac4a.gif'
//       },
//       fluid: {}
//     },
//     seoMetaDescription: 'Lorem ipsum dolor sit amet',
//     seoTitle: 'DoctorLink: setting up a design system',
//     services: [{ title: 'Design' }, { title: 'Engineering' }],
//     slug: 'doctorlink-setting-up-a-design-system',
//     title: 'DoctorLink: setting up a design system',
//     genericBlocks: [
//       {
//         genericBlockText: {
//           genericBlockText:
//             'DoctorLink is a healthcare technology company with a mission to simplify the route to health and wellbeing for patients globally.'
//         },
//         genericBlockImages: [
//           {
//             fluid: {
//               base64:
//                 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAACVVBMVEUBAxMBAxICAxQBAxQCAxMCAxIUAxQOAxQNAxMZAxMTAxMHAxMPAxIKAxISAxIGAxICBBUlBRQfBRQQBBQaBBMkBBMcBBIaBBIWBBIOBBMSBBIHAxIdBhQgBhQjBhQGBBUUBRQlBhMeBRMVBRMdBhIXBRIRBBMaBRIZBRIXBBICBBYiBxQdBxQcBxQCAxUgBxQhBhQkBxMjBhMSBRMQBRMWBhIOBRMZBhIcBhIeBhIDBBcCBBcdBhUYBhUYBRUnBxQjBxQgBxMaBxMZBxMRBRMeBRIDBRgDBBgTBBYQBBYDBBYiBRQlBhQeBhQZBhQWBhQVBhMWBhMXBRMbBRIQAxMDBRkMBBgNBBcGBBcSBBUVBBUOBBUPAxULAxUJAxULAxQRBBQqCxMeCRMDBRoEBRkCBBgEBBcLBBYJBBYHBBYHAxUGAxUgChQvERMpEBMEBhsEBRsDBRsZDBYZCxYJBhYKBxYIBhYQBhUkCxMjCxMEBh0EBhwDBBkCBBkeDxccDhYaDhYOCRYRChUSChYIAxUTAxQRAxQEBx4ICB0VDhwVDRwHCBwDBRwPChkXCxgRChcPCRcPCRYRChYXDBUQChYFAxUEAxUFBx8aEB0eEhwYDhwRCBkgDhgYDRgPChcOChcSCxYeDhUTBxUBAxUbCx0YDB0WCh0EBh4DBh0DBR0GBRsTBBkVBhgZChgXChcYCBYSBBYGBBYBBBYFCCAIByASBx8QBx4GBx8LBRoMBBkNBBgKBBcFBBcFCCEFByAEByAEBx8EBh8DBh4EBBoDBh8CBRsCBBpkPk9GAAAACXBIWXMAABcRAAAXEQHKJvM/AAAAB3RJTUUH4wUUAhwTKtJE2QAAAOZJREFUGBlVwb0yA1EAgNHvu64Zk73Z3VR+8wCC0XsDtcnDqLTeR2O0XsGojUV0QqGKXBsbMs6RBflHfskfWZGltaAhsxRzDHMwANEZX7Bh58MaUKcwcAFn65FWoelpaGe+ZtyBl0qbA1dijQy0eTzGFjm81zEJyXzykHwaulAZK6DUZlC6H+zEEshlM7rvi+JCSP1yr8zldJTviqJI6bYoiljIj01JtsZq7Ku1MGHkr1grPuwCpZ3L80gSj5Tnyg6VV7amaMOhqBdvxN5nT3s4GTbXnN280gr0MnlO2Ga4Nw6nWzDgG0BtMR95ZP1sAAAAAElFTkSuQmCC',
//               aspectRatio: 1.0021097046413503,
//               src:
//                 '//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=550&q=50',
//               srcSet:
//                 '//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=138&h=138&q=50 138w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=275&h=274&q=50 275w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=550&h=549&q=50 550w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=825&h=823&q=50 825w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=1100&h=1098&q=50 1100w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=1425&h=1422&q=50 1425w',
//               srcWebp:
//                 '//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=550&q=50&fm=webp',
//               srcSetWebp:
//                 '//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=138&h=138&q=50&fm=webp 138w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=275&h=274&q=50&fm=webp 275w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=550&h=549&q=50&fm=webp 550w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=825&h=823&q=50&fm=webp 825w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=1100&h=1098&q=50&fm=webp 1100w,\n//images.ctfassets.net/22g1lenhck4z/32MB4tenGEs6OaMqU2Awwm/eab870aa5859e987869a739bb02511c2/canon.png?w=1425&h=1422&q=50&fm=webp 1425w',
//               sizes: '(max-width: 550px) 100vw, 550px'
//             }
//           }
//         ]
//       },
//       {
//         genericBlockText: {
//           genericBlockText:
//             '## The prologue\nDoctorLink partnered with YLD to help redesign the user interface and improve upon the UX framework of their cross-platform product. This eventually evolved into the creation of a Design System and the introduction of DesignOps resulting in a cultural shift in their entire organisation.'
//         }
//       },
//       {
//         genericBlockText: {
//           genericBlockText:
//             '## Finding Common Ground\n\nWe initially conducted a series of interviews with different stakeholders, aiming to capture a wide spectrum of beliefs, motives, intentions and expectations regarding both the company and the product.\n\nWe assessed the overall state of the product and how it responded to users’ needs and expectations as well as business goals. This work relied on analysing user feedback from usability testing as well as survey data from existing customers.\n\nBy identifying common themes and collaboratively consolidating discrepancies, we were able to formulate a set of principles. These principles encapsulated shared criterias for value, quality and success that were suitable not only for the design or engineering teams, but rather the whole of the company.'
//         }
//       },
//       {
//         genericBlockText: {
//           genericBlockText: `## Seamless\n\n## Empowering.\n\n## Universal.\n\n**The product principles**\n\nThese broad principles ensured that the product was seamless, empowering and universal to all users\n\nWe were able to benchmark all subsequent design decisions against these principles.`
//         }
//       },
//       {
//         genericBlockText: {
//           genericBlockText: `The most immediate task was assessing the existing UI components and patterns from a usability and aesthetic perspective, in order to improve upon them.

//         Armed with our recently defined principles and user feedback, we redesigned the UI and visuals from the ground up with the aim to create a recognizable visual language that mirrored the new principles.

//         This assessment gave us a perception of the visual discrepancies between the design files and the final code, which helped us bridging the gap between engineering and design.`
//         }
//       },
//       {
//         genericBlockText: {
//           genericBlockText: `The original Albert Sans typeface was replaced with the open-source Noto Sans - a highly supported typeface characterised by a sound balance between form and function, which offered the global versatility of including over 800 languages.`
//         }
//       },
//       {
//         genericBlockText: {
//           genericBlockText: `We also took this blank slate as an opportunity to reinvigorate DoctorLink’s colour palette, while being carefully faithful to the legacy of the original brand colour - which had emphasised the product’s ties to the UK’s NHS. The new ‘DoctorLink Blue’ offered a stronger, modern and confident identity to the visuals and also helped the product gain the highest degree of visual accessibility.`
//         }
//       },
//       {
//         genericBlockText: {
//           genericBlockText: `In order to further lift the brands humility and character, YLD set about enriching the product with an array of custom illustrations, offering visual delight and  conveying abstract concepts succinctly.`
//         }
//       },
//       {
//         genericBlockText: {
//           genericBlockText: `As we started to create some of the initial UI components, we simultaneously conducted user interviews and testing.

//         We quickly identified components and patterns that worked, and ones that did not. Those that did were consolidated into the burgeoning Design System.

//         It was a granular approach that allowed us to amass a collection of effective layouts and composites, confident of their performance. We continued this practice as the product grew, constantly adapting to test larger considerations, such as user flows and journeys.`
//         }
//       }
//     ]
//   }
// }

// const GenericText4Row = styled(Row)`
//   padding-top: ${({ theme }) => theme.space[4]};
//   padding-bottom: ${({ theme }) => theme.space[4]};

//   ${breakpoint('smallTablet')`
//       padding-top: ${({ theme }) => theme.space[5]};
//       padding-bottom: ${({ theme }) => theme.space[5]};
//   `}

//   ${breakpoint('tablet')`
//       padding-top: ${({ theme }) => theme.space[6]};
//       padding-bottom: ${({ theme }) => theme.space[6]};
//       `}

//   ${breakpoint('desktop')`
//       padding-top: ${({ theme }) => theme.space[7]};
//       padding-bottom: ${({ theme }) => theme.space[7]};
//   `}
// `

// const GenericText5Row = styled(Row)`
//   padding-top: ${({ theme }) => theme.space[4]};
//   padding-bottom: ${({ theme }) => theme.space[4]};

//   ${breakpoint('smallTablet')`
//       padding-top: ${({ theme }) => theme.space[5]};
//       padding-bottom: ${({ theme }) => theme.space[5]};
//   `}

//   ${breakpoint('tablet')`
//       padding-top: ${({ theme }) => theme.space[6]};
//       padding-bottom: ${({ theme }) => theme.space[6]};
//       `}

//   ${breakpoint('desktop')`
//       padding-top: ${({ theme }) => theme.space[7]};
//       padding-bottom: ${({ theme }) => theme.space[7]};
//   `}
// `

const Block = ({ data: { text } }) => {
  const BlockRow = styled(Row)`
    padding-top: ${({ theme }) => theme.space[5]};
    padding-bottom: ${({ theme }) => theme.space[5]};

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

  return (
    <Grid>
      <BlockRow>
        <Col width={[1, 1, 1, 1, 6 / 12]}>
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
      </BlockRow>
    </Grid>
  )
}

const normalise = (arr = []) => {
  return arr.map(({ genericBlockText, genericBlockImages, ...props }) => ({
    image:
      genericBlockImages &&
      genericBlockImages[0] &&
      genericBlockImages[0].file.url,
    text: genericBlockText && genericBlockText.genericBlockText, // thanks contentful
    ...props
  }))
}

const shouldRenderBlock = data => data && data.length

const IndexPage = props => {
  const {
    data: { contentfulNonTemplatedCaseStudyV2: caseStudy },
    location
  } = props

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

      {shouldRenderBlock(caseStudy.genericBlock1) && (
        <Block data={normalise(caseStudy.genericBlock1)[0]} />
      )}

      {shouldRenderBlock(caseStudy.genericBlock2) && (
        <Block data={normalise(caseStudy.genericBlock2)[0]} />
      )}

      {shouldRenderBlock(caseStudy.genericBlock3) && (
        <Block data={normalise(caseStudy.genericBlock3)[0]} />
      )}

      {/* <GreyBackground>
        <Grid>
          <Statement>{genericText1.genericText1}</Statement>
        </Grid>
      </GreyBackground> */}

      {/* <Grid>
        <GenericText4Row>
          <ReactMarkdown
            renderers={{
              // eslint-disable-next-line
              heading: props => (
                <Col width={[1, 1, 1, 1 / 2]}>
                  <SectionTitle {...props} />
                </Col>
              )
            }}
            disallowedTypes={['paragraph']}
            source={genericText3}
          />
          <Col width={[1, 1, 1, 1 / 2]}>
            <ReactMarkdown
              disallowedTypes={['heading']}
              renderers={{
                // eslint-disable-next-line
                paragraph: props => <BodyPrimary key={generate()} {...props} />
              }}
              source={genericText3}
            />
          </Col>
        </GenericText4Row>
      </Grid>
      <BlueBackground>
        <Grid>
          <GenericText4Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <ReactMarkdown
                renderers={{
                  // eslint-disable-next-line
                  heading: props => <SectionTitle reverse {...props} />
                }}
                disallowedTypes={['paragraph']}
                source={genericText4}
              />
            </Col>
            <Col width={[1, 1, 1, 1 / 2]}>
              <ReactMarkdown
                disallowedTypes={['heading']}
                renderers={{
                  // eslint-disable-next-line
                  paragraph: props => <BodyPrimary reverse {...props} />
                }}
                source={genericText4}
              />
            </Col>
          </GenericText4Row>
        </Grid>
      </BlueBackground>

      <Grid>
        <GenericText5Row>
          <Col width={[1, 1, 1, 1 / 2]}>
            <SectionTitle>A new visual language</SectionTitle>
          </Col>
          <Col width={[1, 1, 1, 1 / 2]}>
            {makeText(caseStudy.genericText5.genericText5).map((p, i) => (
              <BodyPrimary key={i}>{p}</BodyPrimary>
            ))}
          </Col>
        </GenericText5Row>
      </Grid>
      <img
        alt=""
        src="https://images.ctfassets.net/22g1lenhck4z/4M3h74EWpWw8AosOCIemoc/e13a13eefedf4ecd5edf26b596d2b3e0/thomas_cook_export.svg"
      />
      <Grid>
        <Padding
          top={{ smallPhone: 4, smallTablet: 1 }}
          bottom={{ smallPhone: 3, smallTablet: 5 }}
        >
          <Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <SectionTitle>Hi, I am Noto Sans.</SectionTitle>
            </Col>
            <Col width={[1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText6.genericText6).map((p, i) => (
                <BodyPrimary key={i}>{p}</BodyPrimary>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>
      <Grid>
        <Padding
          top={{ smallPhone: 4, smallTablet: 1 }}
          bottom={{ smallPhone: 3, smallTablet: 5 }}
        >
          <Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <SubtitleWithBody
                subtitle={'Colour'}
                body={caseStudy.genericText7.genericText7}
              />
            </Col>
          </Row>
        </Padding>
      </Grid>
      <img
        alt=""
        src="https://images.ctfassets.net/22g1lenhck4z/27ChKj8ZNCeQYc2QSUoiiO/f7c9f93f62a8cd07b0972788c5059619/joyent_export.svg"
      />
      <Grid>
        <Padding
          top={{ smallPhone: 4, smallTablet: 1 }}
          bottom={{ smallPhone: 3, smallTablet: 5 }}
        >
          <Row>
            <Col width={[0, 0, 0, 1 / 2]} />
            <Col width={[1, 1, 1, 1 / 2]}>
              <SubtitleWithBody
                subtitle={'Illustrations'}
                body={caseStudy.genericText8.genericText8}
              />
            </Col>
          </Row>
        </Padding>
      </Grid>
      <img
        alt=""
        src="https://images.ctfassets.net/22g1lenhck4z/18KTBFOFsaIE6gcMQQMWkk/792ebef4cd9b995618b11aa8d09bd56c/trainline_export__1_.png"
      />
      <Grid>
        <Padding
          top={{ smallPhone: 4, smallTablet: 1 }}
          bottom={{ smallPhone: 3, smallTablet: 5 }}
        >
          <Row>
            <Col width={[1, 1, 1, 1 / 2]}>
              <SectionTitle>Protoyping and fast iteration</SectionTitle>
            </Col>
            <Col width={[1, 1, 1, 1 / 2]}>
              {makeText(caseStudy.genericText9.genericText9).map((p, i) => (
                <BodyPrimary key={i}>{p}</BodyPrimary>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid> */}
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
