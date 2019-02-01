import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import BlueBackground from '../src/components/BlueBG'
import GreyBackground from '../src/components/GreyBG'
import { Grid } from '../src/components/grid'
import TitleAndList from '../src/components/Common/TitleAndList'
import StyledLink from '../src/components/styledLink'

addDecorator(Theme)

const title = 'Community support'
const body =
  'Open source technologies are supported by knowledgeable and resourceful communities. Their collective contributions result in more robust, innovative and faster solutions.'

const stringList = `### ${title}\n${body}\n### ${title}\n${body}`
const arrayList = [
  {
    title,
    body
  },
  {
    title,
    body:
      'Using open source technology means transparency and access to the code, which allows faster bug fixes and custom feature development. Clients are no longer dependent on tech vendors and gain full control over the code base.'
  },
  {
    title,
    body
  }
]

storiesOf('Title and List', module)
  .add('list in form of a string (Contentful data)', () => {
    return (
      <Grid>
        <TitleAndList title="This is the Title" list={stringList} bg="white" />
      </Grid>
    )
  })
  .add('list in form of an array', () => {
    return (
      <Grid>
        <TitleAndList title="This is the Title" list={arrayList} bg="white" />
      </Grid>
    )
  })
  .add('with extra content', () => {
    return (
      <Grid>
        <TitleAndList
          title="This is the Title"
          list={arrayList}
          extraContent={
            <StyledLink style={{ padding: 0, margin: 0 }} to="#">
              Learn more
            </StyledLink>
          }
          bg="white"
        />
      </Grid>
    )
  })
  .add('on dark background', () => {
    return (
      <BlueBackground>
        <Grid>
          <TitleAndList title="This is the Title" list={arrayList} bg="dark" />
        </Grid>
      </BlueBackground>
    )
  })
  .add('on grey background', () => {
    return (
      <GreyBackground>
        <Grid>
          <TitleAndList title="This is the Title" list={arrayList} bg="grey" />
        </Grid>
      </GreyBackground>
    )
  })
