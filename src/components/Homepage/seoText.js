import React from 'react'
import { Row, Col } from 'react-styled-flexboxgrid'
import StyledLink from '../styledLink'
import { H3 } from '../Typography'

const SEOText = ({ text }) => (
  <Row>
    <Col xs={10}>
      <H3>
        {text.map(content => {
          if (content.nodeType === 'text') return content.value

          if (content.nodeType === 'hyperlink') {
            return (
              <StyledLink
                style={{ marginBottom: 0 }}
                to={`/${content.data.uri}`}
              >
                {content.content[0].value}
              </StyledLink>
            )
          }

          return ''
        })}
      </H3>
    </Col>
  </Row>
)

export default SEOText
