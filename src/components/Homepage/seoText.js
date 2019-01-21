import React from 'react'
import { Row, Col } from '../grid'
import styled from 'styled-components'
import StyledLink from '../styledLink'
import { H3 } from '../Typography'

const Link = styled(StyledLink)`
  margin-bottom: 0;
  margin-left: 0;
  padding: 0;
  font-weight: normal;
  text-decoration: underline;
  display: initial;
`

const SEOText = ({ text }) => (
  <Row>
    <Col width={[1, 1, 1, 10 / 12, 10 / 12, 9 / 12]}>
      <H3 as="h1" regular>
        {text.map(content => {
          if (content.nodeType === 'text') return content.value

          if (content.nodeType === 'hyperlink') {
            return (
              <Link key={content.data.uri} noAfter to={`/${content.data.uri}`}>
                {content.content[0].value}
              </Link>
            )
          }
          return ''
        })}
      </H3>
    </Col>
  </Row>
)

export default SEOText
