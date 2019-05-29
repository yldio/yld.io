import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import { Grid, Row, Col } from '../src/components/grid'
import { Repo, RepoWithImage } from '../src/components/Repo'

addDecorator(Theme)

storiesOf('Repo', module)
  .add('Repo', () => {
    return (
      <Grid>
        <Row>
          <Col>
            <Repo
              url="https://github.com/nodejs/node"
              nameWithOwner={'nodejs/node'}
              pullRequestCount={123}
              starCount={123}
            />
          </Col>
        </Row>
      </Grid>
    )
  })
  .add('Repo w/ Image', () => {
    return (
      <Grid>
        <Row>
          <Col>
            <RepoWithImage
              url="https://github.com/nodejs/node"
              nameWithOwner={'nodejs/node'}
              pullRequestCount={123}
              starCount={123}
              img={true}
              imgSrc={'https://www.placecage.com/72/72'}
            />
          </Col>
        </Row>
      </Grid>
    )
  })
