import React from 'react'

import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import StyledLink from './StyledLink'
import GreyBackground from './GreyBackground'
import { Row, Col } from '../grid'
import { DisplayTitle } from '../Typography'

const Link = styled(StyledLink)`
  margin-bottom: 0;
  margin-left: 0;
  padding: 0;
  font-weight: normal;
  text-decoration: underline;
  display: initial;
`

const Statement = ({ richText, children, noPadding }) => (
  <GreyBackground>
    <Row>
      <Col width={[1, 1, 1, 10 / 12, 10 / 12, 9 / 12]}>
        <Padding
          vertical={{
            smallPhone: noPadding ? 0 : 3,
            smallTablet: noPadding ? 0 : 4
          }}
        >
          <DisplayTitle as="h1" textLight>
            {children}
            {richText &&
              richText.map(content => {
                if (content.nodeType === 'text') return content.value

                if (content.nodeType === 'hyperlink') {
                  return (
                    <Link
                      key={content.data.uri}
                      noAfter
                      to={`/${content.data.uri}`}
                    >
                      {content.content[0].value}
                    </Link>
                  )
                }
                return ''
              })}
          </DisplayTitle>
        </Padding>
      </Col>
    </Row>
  </GreyBackground>
)

export default Statement
