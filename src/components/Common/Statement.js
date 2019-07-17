import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import StyledLink from './StyledLink'
import GreyBackground from './GreyBackground'
import { Row, Col, Grid } from '../grid'
import { DisplayTitle } from '../Typography'

const PaddedGrid = styled(Grid)`
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[6]};
    padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

const Link = styled(StyledLink)`
  margin-bottom: 0;
  margin-left: 0;
  padding: 0;
  font-weight: normal;
  text-decoration: underline;
  display: initial;
`

const StyledStrong = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`

const makeStrong = text => <StyledStrong>{text}</StyledStrong>

const Statement = ({ richText, children, as = 'h2' }) => {
  const childrenArray = children
    .split('__')
    .map((child, i) => (i % 2 === 1 ? makeStrong(child) : child))

  return (
    <GreyBackground>
      <PaddedGrid>
        <Row>
          <Col width={[1, 1, 1, 10 / 12, 10 / 12, 9 / 12]}>
            <DisplayTitle as={as} textLight>
              {childrenArray}
              {richText &&
                richText.map(content => {
                  if (content.nodeType === 'text') return content.value

                  if (content.nodeType === 'hyperlink') {
                    return (
                      <Link
                        key={content.data.uri}
                        noafter="true"
                        to={`${content.data.uri}`}
                      >
                        {content.content[0].value}
                      </Link>
                    )
                  }
                  return ''
                })}
            </DisplayTitle>
          </Col>
        </Row>
      </PaddedGrid>
    </GreyBackground>
  )
}

export default Statement
