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

const Learning = ({
  data: { title, subtitle, text, featuredInsights, list }
}) => (
  <Section greyBg>
    <TitleAndList title={title} list={list} />
    <Separator />
    <TitleAndBody title={subtitle} body={text} />
    <CompensatedRow>
      {featuredInsights.map((el, idx) => (
        <CompensatedCol width={[1, 1, 1, 4 / 12]} key={idx}>
          <InsightAnchor href={el.url}>
            <Padding top={{ smallPhone: 2, tablet: 3 }}>
              <Image image={el.image} />
            </Padding>
            <PostTitleWrapper top={1.5} bottom={1}>
              <Paragraph bold noMargin>
                {el.title}
              </Paragraph>
            </PostTitleWrapper>
            <Hr />
          </InsightAnchor>
        </CompensatedCol>
      ))}
    </CompensatedRow>
  </Section>
)

export default Learning
