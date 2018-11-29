import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import GrayBackground from '../GrayBG'
import Border from '../border'
import { H1, Paragraph } from '../Typography'

const BooksSection = ({ specialty }) => (
  <GrayBackground noTop>
    <Grid>
      <Padding top={4} bottom={6}>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <H1>{`${specialty.title} books`}</H1>
            <Paragraph>
              NodeJS books created by members of YLD for the community.
            </Paragraph>
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            {specialty.externalResources
              .filter(externalResource => externalResource.type === `Book`)
              .map(externalResource => (
                <Border key={`${externalResource.id}`}>
                  <Padding top={2} bottom={2}>
                    <a href={externalResource.link}>{externalResource.title}</a>
                    <Paragraph>{externalResource.additionalInfo}</Paragraph>
                  </Padding>
                </Border>
              ))}
          </Col>
        </Row>
      </Padding>
    </Grid>
  </GrayBackground>
)

export default BooksSection
