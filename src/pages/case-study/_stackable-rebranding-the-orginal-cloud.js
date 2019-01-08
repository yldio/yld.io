import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled, { css } from 'styled-components'
import remcalc from 'remcalc'
import { Padding, Margin } from 'styled-components-spacing'
import Flex from 'styled-flex-component'
import { Grid, Row, Col } from '../../components/grid'
import { H2, Paragraph, H6 } from '../../components/Typography'
import CaseStudyTop from '../../components/Common/topCaseStudy'
import CaseStudyBottom from '../../components/Homepage/caseStudy'

import Layout from '../../components/layout'
import GreyBackground from '../../components/GreyBG'
import iterations from './../../images/case-study/Logo-Iterations.png'
import meaning from './../../images/case-study/Logo-Meaning@2x.png'
import logoImage from './../../images/case-study/Logo-on-image.jpg'
import type1 from './../../images/case-study/f1.png'
import type2 from './../../images/case-study/gt.png'
import dark from './../../images/case-study/Dark-Colour-Swatch.png'
import light from './../../images/case-study/Light-Colour-Swatch.png'
import layout from './../../images/case-study/Marketing-Page-Mockups.png'
import mockup from './../../images/case-study/VPC-Mockup.png'
import iconsDesktop from './../../images/case-study/Icon-Graphic.png'
import { command1, command2 } from '../../utils/text'
import iconsMobile from './../../images/case-study/Mobile-Icon-Graphic.png'
import { NoMobile, NoDesktop } from '../../components/Common/visibility'

const makeText = content => content.split('\n').filter(c => c.length)

const wrapperStyles = css`
  flex-grow: 1;
  padding: ${remcalc(40)};
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`

const Type1Wrapper = styled.div`
  ${wrapperStyles};
  justify-content: 'flex-end';
  padding-right: ${remcalc(60)};
  background: ${props => props.theme.colors.greyBG};
`

const Type2Wrapper = styled.div`
  ${wrapperStyles};
  padding-left: ${remcalc(60)};
  background: ${props => props.theme.colors.text};
`

const Node = styled.span`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  display: block;
  color: ${props => props.theme.colors.white};
  white-space: pre-wrap;
`

const Code = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.colors.text};
  font-family: 'Stackable Mono', monospace;
`

const Type1 = styled.img`
  max-width: 90%;
  max-height: ${remcalc(276)};
`

const Type2 = styled.img`
  max-width: 90%;
  max-height: ${remcalc(270)};
`

const IndexPage = ({
  data: { allContentfulGenericCaseStudy: content, site }
}) => {
  const caseStudy = content.edges[0].node
  return (
    <Layout>
      <Helmet
        title={`${site.siteMetadata.title}  ${
          content.title ? '- ' + content.title : ''
        } ${content.seoTitle ? '- ' + content.seoTitle : ''} `}
        meta={[{ name: 'description', content: content.seoMetaDescription }]}
      >
        <html lang="en" />
      </Helmet>
      <Grid>
        <CaseStudyTop caseStudy={caseStudy} />
        <Margin vertical={4}>
          <Row>
            <Col xs={12} sm={9} md={7}>
              <Paragraph padded>
                {caseStudy.introSentence.introSentence}
              </Paragraph>
            </Col>
          </Row>
        </Margin>
      </Grid>
      <GreyBackground topMargin>
        <Padding top={6} vertical={3}>
          <Grid>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <H2>Building from the logo upwards</H2>
              </Col>
              <Col xs={12} sm={12} md={6}>
                {makeText(caseStudy.genericText1.genericText1).map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={8} mdOffset={4}>
                <Margin top={3}>
                  <img src={iterations} alt="Logo Iterations" />
                  <H6>Logo Iterations</H6>
                </Margin>
              </Col>
            </Row>
          </Grid>
        </Padding>
      </GreyBackground>
      <div style={{ background: '#191933' }}>
        <Grid>
          <Row>
            <Col width={[1]}>
              <img src={meaning} alt="Logo Meaning" />
            </Col>
          </Row>
        </Grid>
      </div>
      <Grid>
        <Padding top={60} bottom={3}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2>Cutting the wordmark</H2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {makeText(caseStudy.genericText2.genericText2).map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
        </Padding>
      </Grid>

      <GreyBackground topMargin topOffset={-232}>
        <Grid>
          <Row>
            <Col width={[1]}>
              <img src={logoImage} alt="Stackable Logo" />
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Padding top={6}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <H2>Custom typeface</H2>
              </Col>
              <Col xs={12} sm={12} md={6}>
                {makeText(caseStudy.genericText3.genericText3).map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
          </Padding>
        </Grid>
      </GreyBackground>
      <GreyBackground topMargin>
        <Flex>
          <Type1Wrapper>
            <Type1 src={type1} alt="Example of type" />
          </Type1Wrapper>
          <Type2Wrapper>
            <Type2 src={type2} alt="Example of type" />
          </Type2Wrapper>
        </Flex>
      </GreyBackground>

      <Code>
        <Grid>
          <Row>
            <Col width={[1]}>
              <Padding vertical={4}>
                {command1.split('/n').map((p, i) => (
                  <Node key={i}>{p}</Node>
                ))}
                <Margin top={1}>
                  {command2.split('/n').map((p, i) => (
                    <Node key={i}>{p}</Node>
                  ))}
                </Margin>
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Code>

      <Grid>
        <Padding top={60} bottom={4}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2>New icon system</H2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {makeText(caseStudy.genericText4.genericText4).map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Margin top={3}>
            <Row>
              <Col width={[1]}>
                <NoMobile>
                  <img src={iconsDesktop} alt="desktop icons" />
                </NoMobile>
                <NoDesktop>
                  <img src={iconsMobile} alt="mobile icons" />
                </NoDesktop>
              </Col>
            </Row>
          </Margin>
        </Padding>
      </Grid>
      <Grid>
        <Padding bottom={4}>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <H2>Colour approach</H2>
            </Col>
            <Col xs={12} sm={12} md={6}>
              {makeText(caseStudy.genericText5.genericText5).map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
          </Row>
          <Margin top={3}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <img src={light} alt="light color scheme" />
              </Col>
              <Col xs={12} sm={12} md={6}>
                <img src={dark} alt="dark color scheme" />
              </Col>
            </Row>
          </Margin>
        </Padding>
      </Grid>
      <GreyBackground topMargin>
        <Grid>
          <Padding top={60} bottom={5}>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <H2>Putting it all together</H2>
              </Col>
              <Col xs={12} sm={12} md={6}>
                {makeText(caseStudy.genericText6.genericText6).map((p, i) => (
                  <Paragraph padded key={i}>
                    {p}
                  </Paragraph>
                ))}
              </Col>
            </Row>
            <Margin top={3}>
              <Row>
                <Col width={[1]}>
                  <img src={layout} alt="stackable layout" />
                </Col>
              </Row>
            </Margin>
          </Padding>
        </Grid>
      </GreyBackground>
      <Padding top={4} bottom={60}>
        <Grid>
          <Row>
            <Col xs={12} sm={12} md={6}>
              <Margin bottom={1}>
                <H2>Product vision</H2>
              </Margin>
              {makeText(caseStudy.genericText7.genericText7).map((p, i) => (
                <Paragraph padded key={i}>
                  {p}
                </Paragraph>
              ))}
            </Col>
            <Col xs={12} sm={12} md={6}>
              <img src={mockup} alt="stackable mockup" />
            </Col>
          </Row>
        </Grid>
      </Padding>
      <Grid>
        <Row>
          <Col width={[1]}>
            <Padding top={4} bottom={2}>
              <Paragraph>More of our work</Paragraph>
            </Padding>
          </Col>
        </Row>
        {caseStudy.relatedCaseStudy ? (
          <Padding bottom={5}>
            <CaseStudyBottom caseStudy={caseStudy.relatedCaseStudy} />
          </Padding>
        ) : null}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulGenericCaseStudy(
      filter: { slug: { eq: "stackable-rebranding-the-orginal-cloud" } }
    ) {
      edges {
        node {
          slug
          title
          posterImage {
            file {
              url
            }
          }
          introSentence {
            introSentence
          }
          genericText1 {
            id
            genericText1
          }
          genericText2 {
            id
            genericText2
          }
          genericText3 {
            id
            genericText3
          }
          genericText4 {
            id
            genericText4
          }
          genericText5 {
            id
            genericText5
          }
          genericText6 {
            id
            genericText6
          }
          genericText7 {
            id
            genericText7
          }
          services {
            title
            id
          }
          posterColor
          seoTitle
          seoMetaDescription
          relatedCaseStudy {
            title
            slug
            introSentence
            posterImage {
              file {
                url
              }
            }
            posterColor
          }
        }
      }
    }
  }
`

export default IndexPage
