import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { Grid, Col, Row } from '../src/components/grid'
import WhyOpenSource from '../src/components/OpenSource/WhyOpenSource'

import icon from './assets/community_support.svg'

addDecorator(Theme)

const title = 'Community support'
const body =
  'Open source technologies are supported by knowledgeable and resourceful communities. Their collective contributions result in more robust, innovative and faster solutions.'

storiesOf('Logo, Subtitle & Body', module).add('on white Background', () => {
  return (
    <Grid>
      <Row>
        <Col width={[1, 1, 1, 1, 0.5]}>
          <WhyOpenSource
            icon={icon}
            subtitle={title}
            body={body}
            themeVariation="white"
          />
        </Col>
      </Row>
    </Grid>
  )
})
