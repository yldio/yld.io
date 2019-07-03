import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import StyledLink from './StyledLink'
import GreyBackground from './GreyBackground'
import { Row, Col, Grid } from '../grid'
import { DisplayTitle } from '../Typography'

const PaddedGrid = styled(Grid)`
  padding-top: ${props => props.theme.space[4]};
  padding-bottom: ${props => props.theme.space[4]};

  ${breakpoint('tablet')`
    padding-top: ${props => props.theme.space[6]};
    padding-bottom: ${props => props.theme.space[6]};
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

const Statement = ({ richText, children, as = 'h2' }) => (
  <GreyBackground>
    <PaddedGrid>
      <Row>
        <Col width={[1, 1, 1, 10 / 12, 10 / 12, 9 / 12]}>
          <DisplayTitle as={as} textLight>
            {children}
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

export default Statement
