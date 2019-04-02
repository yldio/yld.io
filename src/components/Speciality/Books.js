import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import { Row, Col, Grid } from '../grid'
import ExternalAnchor from '../Common/ExternalAnchor'
import Flex, { FlexItem } from 'styled-flex-component'
import { Padding } from 'styled-components-spacing'
import breakpoint from 'styled-components-breakpoint'

import { SectionTitle, CardTitle, BodyPrimary } from '../Typography'
import StyledLink from '../Common/StyledLink'

const BottomBodyPrimary = styled(BodyPrimary)`
  position: absolute;
  bottom: ${remcalc(26)};
`

const CenteredCol = styled(Col)`
  text-align: center;
`

const BookCol = styled(Col)`
  position: relative;

  ${breakpoint('smallTablet')`
    &:last-child{
      display: none;
    }
   `}

  ${breakpoint('tablet')`
   &:last-child {
    display:block;
   }
   `}
`

const BooksBox = styled(ExternalAnchor)`
  border: 1px solid;
  height: ${remcalc(222)};
  display: inline-block;

  ${breakpoint('smallTablet')`
    height: ${remcalc(360)};
  `}
`

const BooksSection = ({ books, title }) =>
  books.length ? (
    <Grid>
      <Padding vertical={{ desktop: 4, smallPhone: 3.5 }}>
        <Row>
          <Padding top={4} />
          <CenteredCol width={[1]}>
            <SectionTitle small>{`${title.trim()} books`}</SectionTitle>
            <BodyPrimary>
              Node.js books written by members of YLD for our community.
            </BodyPrimary>
          </CenteredCol>
        </Row>
        <Row>
          {books.slice(0, 3).map(externalResource => (
            <BookCol
              width={[1, 1, 1, 1 / 2, 1 / 2, 4 / 12]}
              key={`${externalResource.id}`}
            >
              <Padding top={4}>
                <BooksBox
                  style={{
                    borderColor: `${externalResource.colorCode}`
                  }}
                  href={externalResource.link}
                >
                  <Padding top={2} left={2} right={2}>
                    <CardTitle
                      normal
                      style={{
                        color: `${externalResource.colorCode}`
                      }}
                    >
                      {externalResource.title}
                    </CardTitle>
                    <BottomBodyPrimary>{`By ${
                      externalResource.additionalInfo
                    }`}</BottomBodyPrimary>
                  </Padding>
                </BooksBox>
              </Padding>
            </BookCol>
          ))}
        </Row>
        <Row>
          <Col width={[1]}>
            <Padding top={4}>
              <Flex justifyCenter alignCenter>
                <FlexItem>
                  <StyledLink href="http://nodepatternsbooks.com/index.html">
                    More Books
                  </StyledLink>
                </FlexItem>
              </Flex>
            </Padding>
          </Col>
          <Padding bottom={5} />
        </Row>
      </Padding>
    </Grid>
  ) : null

export default BooksSection
