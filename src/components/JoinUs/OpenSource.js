import React from 'react'
import { Row } from '../grid'

import { Section, Separator, TitleAndBody } from './elements'
import StandaloneVideoLink from '../Common/StandaloneVideoLink'
import { Padding } from 'styled-components-spacing/dist/cjs/Padding'
import TitleAndList from '../Common/TitleAndList'

const MAX_VIDEOS = 3

const Talks = ({ data }) => (
  <Row>
    {data.slice(0, MAX_VIDEOS).map(({ title, link }, idx) => (
      <StandaloneVideoLink href={link} key={idx}>
        {title}
      </StandaloneVideoLink>
    ))}
  </Row>
)

const OpenSource = ({
  data: { title, subtitle, list, text, featuredTalks }
}) => (
  <Section greyBg>
    <TitleAndList title={title} list={list} />
    <Separator />
    <TitleAndBody title={subtitle} body={text} />
    <Talks data={featuredTalks} />
    <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
  </Section>
)

export default OpenSource
