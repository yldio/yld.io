import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { Grid, Row } from '../src/components/grid'
import Repo from '../src/components/Repo'

addDecorator(Theme)

storiesOf('Repo', module)
  .add('Repo', () => {
    return (
      <Grid>
        <Row>
          <Repo
            url="https://github.com/nodejs/node"
            nameWithOwner={'nodejs/node'}
            pullRequestCount={123}
            starCount={123}
          />
        </Row>
      </Grid>
    )
  })
  .add('Repo w/ Image', () => {
    return (
      <Grid>
        <Row>
          <Repo
            url="https://github.com/nodejs/node"
            nameWithOwner={'nodejs/node'}
            pullRequestCount={123}
            starCount={123}
            img={true}
            imgSrc={'https://www.placecage.com/100/100'}
          />
        </Row>
      </Grid>
    )
  })
