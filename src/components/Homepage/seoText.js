import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
// eslint-disable-next-line
import StyledLink from '../styledLink'
import { H3 } from '../Typography'

const Text = H3.withComponent('h1')

const SEOText = ({ text }) => (
  <Row>
    <Col xs={11} sm={10}>
      <Text>
        {text.map(content => {
          if (content.nodeType === 'text') return content.value

          if (content.nodeType === 'hyperlink') {
            return (
              <StyledLink
                key={content.data.uri}
                style={{ marginBottom: 0, marginLeft: 0, padding: 0 }}
                noAfter
                to={`/${content.data.uri}`}
              >
                {content.content[0].value}
              </StyledLink>
            )
          }

          return ''
        })}
      </Text>
    </Col>
  </Row>
)

export default SEOText
