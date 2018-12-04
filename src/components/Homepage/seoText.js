import React from 'react'
import { Row, Col } from '../grid'
import styled from 'styled-components'
import StyledLink from '../styledLink'
import { H3 } from '../Typography'

const Link = styled(StyledLink)`
  margin-bottom: 0;
  margin-left: 0;
  padding: 0;
`

const Text = H3.withComponent('h1')

const SEOText = ({ text }) => (
  <Row>
    <Col width={[1, 1, 1, 10 / 12, 10 / 12, 8 / 12]}>
      <Text>
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
      </Text>
    </Col>
  </Row>
)

export default SEOText
