import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import GrayBackground from '../GrayBG'
import Border from '../border'
import { H1, H4, Paragraph } from '../Typography'
import StyledLink from '../styledLink'

const BooksSection = ({ specialty }) => (
  <GrayBackground noTop>
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
              <Col md={4} sm={12} xs={12} key={`${externalResource.id}`}>
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
                      <Paragraph>{externalResource.additionalInfo}</Paragraph>
                    </Padding>
                  </Border>
                </Padding>
              </Col>
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
  </GrayBackground>
)

export default BooksSection
