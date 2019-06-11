import React from 'react'
import { Padding } from 'styled-components-spacing'
import ReactMarkdown from 'react-markdown'


import { Grid, Row, Col } from '../grid'
import { SectionTitle } from '../Typography'

// title must be a string!!
const TitleSection = ({ title }) => {

  return (
    <Grid>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3, tablet: 4 }}
      >
        <Row>
          <Col width={[1, 1, 1, 8 / 12, 7 / 12]}>
            <ReactMarkdown
              renderers={{
                // eslint-disable-next-line
                paragraph: props => (
                  <SectionTitle {...props} />
                )
              }}
              source={title}
            />
          </Col>
        </Row>
      </Padding>
    </Grid>
  )


}


export default TitleSection
