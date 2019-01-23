import React from 'react'
import { Row } from '../grid'

import { Section, Separator, TitleAndBody, TitleAndList } from './elements'
import StandaloneVideoLink from '../Common/StandaloneVideoLink'

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
  </Section>
)

export default OpenSource
