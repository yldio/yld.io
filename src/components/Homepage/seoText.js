import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import StyledLink from '../styledLink'
import { H3 } from '../Typography'
// eslint-disable-next-line
import { withComponent } from 'styled-components'

const Text = H3.withComponent('h1')

const SEOText = ({ text }) => (
  <Row>
    <Col xs={10}>
      <Text>
        {text.map(content => {
          if (content.nodeType === 'text') return content.value

          if (content.nodeType === 'hyperlink') {
            return (
              <StyledLink
                key={content.data.uri}
                style={{ marginBottom: 0 }}
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
