import React from 'react'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import { CompensatedRow, CompensatedCol } from '../grid'
import Image from '../Common/Image'
import Hr from '../Common/Hr'
import { Paragraph } from '../Typography'

import { Section, Separator, TitleAndBody, TitleAndList } from './elements'

const InsightAnchor = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`
const PostTitleWrapper = styled(Padding)`
  flex: 1;
`

const Insight = ({ insight }) => (
  <CompensatedCol width={[1, 1, 1, 4 / 12]}>
    <InsightAnchor href={insight.url}>
      <Padding top={{ smallPhone: 2, tablet: 3 }}>
        <Image image={insight.image} />
      </Padding>
      <PostTitleWrapper top={1.5} bottom={1}>
        <Paragraph bold noMargin>
          {insight.title}
        </Paragraph>
      </PostTitleWrapper>
      <Hr />
    </InsightAnchor>
  </CompensatedCol>
)

const Learning = ({
  data: { title, subtitle, text, featuredInsights, list }
}) => (
  <Section greyBg>
    <TitleAndList title={title} list={list} />
    <Separator />
    <TitleAndBody title={subtitle} body={text} />
    <CompensatedRow>
      {featuredInsights.map((el, idx) => (
        <Insight insight={el} key={idx} />
      ))}
    </CompensatedRow>
  </Section>
)

export default Learning
