import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import BlueBackground from '../src/components/BlueBG'
import GreyBackground from '../src/components/GreyBG'
import { Grid, Col, Row } from '../src/components/grid'
import SubtitleWithBody from '../src/components/Common/SubtitleWithBody'

addDecorator(Theme)

const title = 'Community support'
const body =
  'Open source technologies are supported by knowledgeable and resourceful communities. Their collective contributions result in more robust, innovative and faster solutions.'

storiesOf('Subtitle and Body', module)
  .add('on white Background', () => {
    return (
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 0.5]}>
            <SubtitleWithBody
              subtitle={title}
              body={body}
              themeVariation="white"
            />
          </Col>
        </Row>
      </Grid>
    )
  })
  .add('on dark background', () => {
    return (
      <BlueBackground>
        <Grid>
          <Col width={[1, 1, 1, 1, 0.5]}>
            <SubtitleWithBody
              subtitle={title}
              body={body}
              themeVariation="dark"
            />
          </Col>
        </Grid>
      </BlueBackground>
    )
  })
  .add('on grey background', () => {
    return (
      <GreyBackground>
        <Grid>
          <Col width={[1, 1, 1, 1, 0.5]}>
            <SubtitleWithBody
              subtitle={title}
              body={body}
              themeVariation="grey"
            />
          </Col>
        </Grid>
      </GreyBackground>
    )
  })
