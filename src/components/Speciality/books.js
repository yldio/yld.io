import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import Border from '../border'
import { H1, H4, Paragraph } from '../Typography'
import StyledLink from '../styledLink'

const BottomParagraph = styled(Paragraph)`
  position: absolute;
  bottom: ${remcalc(26)};
`
const BookCol = styled(Col)`
  position: relative;
`

const BooksSection = ({ specialty }) => (
  <Grid>
    <Padding top={4} bottom={6}>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <H1 center>{`${specialty.title} books`}</H1>
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
            <BookCol md={4} sm={12} xs={12} key={`${externalResource.id}`}>
              <Padding top={4}>
                <Border
                  style={{
                    borderColor: `${externalResource.colorCode}`
                  }}
                >
                  <Padding top={2} left={2}>
                    <H4
                      style={{
                        color: `${externalResource.colorCode}`
                      }}
                    >
                      <a href={externalResource.link}>
                        {externalResource.title}
                      </a>
                    </H4>
                    <BottomParagraph>{`By ${
                      externalResource.additionalInfo
                    }`}</BottomParagraph>
                  </Padding>
                </Border>
              </Padding>
            </BookCol>
          ))}
      </Row>
      <Row>
        <Padding top={3}>
          <Col md={12} sm={12} xs={12}>
            <StyledLink href={specialty.externalResources[11].link}>
              {specialty.externalResources[11].title}
            </StyledLink>
          </Col>
        </Padding>
      </Row>
    </Padding>
  </Grid>
)

export default BooksSection
