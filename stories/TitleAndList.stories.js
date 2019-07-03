import React from 'react'
import { storiesOf, addDecorator } from '@storybook/react'
import Theme from './theme'
import BlueBackground from '../src/components/Common/BlueBackground'
import GreyBackground from '../src/components/Common/GreyBackground'
import { Grid } from '../src/components/grid'
import TitleAndList from '../src/components/Common/TitleAndList'
import StyledLink from '../src/components/Common/StyledLink'

addDecorator(Theme)

const ExampleImage = {
  title: 'Community Support Logo',
  file: { url: '/community_support.svg' },
  className: 'logo'
}

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

const arrayListWithLogos = [
  {
    image: ExampleImage,
    title,
    body
  },
  {
    image: ExampleImage,
    title,
    body:
      'Using open source technology means transparency and access to the code, which allows faster bug fixes and custom feature development. Clients are no longer dependent on tech vendors and gain full control over the code base.'
  },
  {
    image: ExampleImage,
    title,
    body
  }
]

storiesOf('Title and List (with optional logos)', module)
  .add('list in form of a string (Contentful data)', () => {
    return (
      <Grid>
        <TitleAndList
          title="This is the Title"
          list={stringList}
          themeVariation="white"
        />
      </Grid>
    )
  })
  .add('list in form of an array', () => {
    return (
      <Grid>
        <TitleAndList
          title="This is the Title"
          list={arrayList}
          themeVariation="white"
        />
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
          themeVariation="white"
        />
      </Grid>
    )
  })
  .add('on dark background', () => {
    return (
      <BlueBackground>
        <Grid>
          <TitleAndList
            title="This is the Title"
            list={arrayList}
            themeVariation="dark"
          />
        </Grid>
      </BlueBackground>
    )
  })
  .add('on grey background', () => {
    return (
      <GreyBackground>
        <Grid>
          <TitleAndList
            title="This is the Title"
            list={arrayList}
            themeVariation="grey"
          />
        </Grid>
      </GreyBackground>
    )
  })
  .add('with logos', () => {
    return (
      <Grid>
        <TitleAndList
          title="This is the Title"
          list={arrayListWithLogos}
          themeVariation="white"
        />
      </Grid>
    )
  })
