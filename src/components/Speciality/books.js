import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import Flex, { FlexItem } from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { SmallerH2, H4, Paragraph } from '../Typography'
import StyledLink from '../styledLink'

const BottomParagraph = styled(Paragraph)`
  position: absolute;
  bottom: ${remcalc(26)};
`
const BookCol = styled(Col)`
  position: relative;

  ${breakpoint('tablet')`
    &:last-child{
      display: none;
    }
   `}

  ${breakpoint('desktop')`
   &:last-child {
    display:block;
   }
   `}
`

const BooksBox = styled.a`
  border: 1px solid;
  height: ${remcalc(222)};
  display: inline-block;

  ${breakpoint('tablet')`
    height: ${remcalc(360)};
  `}
`

const BooksSection = ({ specialty }) => (
  <Grid className="grid">
    <Padding vertical={{ desktop: 4, mobile: 3.5 }}>
      <Row>
        <Padding top={4} />
        <Col md={12} sm={12} xs={12}>
          <SmallerH2 center>{`${specialty.title.trim()} books`}</SmallerH2>
          <Paragraph center>
            NodeJS books created by members of YLD for the community.
          </Paragraph>
        </Col>
      </Row>
      <Row>
        {specialty.externalResources
          .filter(additionalInfo => additionalInfo.type === `Book`)
          .slice(0, 3)
          .map(externalResource => (
            <BookCol md={4} sm={6} xs={12} key={`${externalResource.id}`}>
              <Padding top={4}>
                <BooksBox
                  style={{
                    borderColor: `${externalResource.colorCode}`
                  }}
                  href={externalResource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Padding top={2} left={2} right={2}>
                    <H4
                      normal
                      style={{
                        color: `${externalResource.colorCode}`
                      }}
                    >
                      {externalResource.title}
                    </H4>
                    <BottomParagraph>{`By ${
                      externalResource.additionalInfo
                    }`}</BottomParagraph>
                  </Padding>
                </BooksBox>
              </Padding>
            </BookCol>
          ))}
      </Row>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <Padding top={4}>
            <Flex justifyCenter alignCenter>
              <FlexItem>
                <StyledLink href={specialty.externalResources[11].link}>
                  {specialty.externalResources[11].title}
                </StyledLink>
              </FlexItem>
            </Flex>
          </Padding>
        </Col>
        <Padding bottom={5} />
      </Row>
    </Padding>
  </Grid>
)

export default BooksSection
