import React from 'react'
import { Padding, Margin } from 'styled-components-spacing'
import styled from 'styled-components'
import { Row, CompensatedRow, CompensatedCol } from '../grid'
import Image from '../Common/Image'
import Hr from '../Common/Hr'
import { H2, Paragraph } from '../Typography'

import {
  Section,
  FirstColumn,
  SecondColumn,
  Separator,
  List,
  TitleAndBody
} from './elements'

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
    <Row>
      <FirstColumn>
        <H2>{title}</H2>
      </FirstColumn>
      <SecondColumn>
        <List list={list} />
      </SecondColumn>
    </Row>
    <Separator />
    <TitleAndBody title={subtitle} body={text} />
    <CompensatedRow>
      {featuredInsights.map((el, idx) => (
        <CompensatedCol width={[1, 1, 1, 4 / 12]} key={idx}>
          <InsightAnchor href={el.url}>
            <Margin bottom={0.5}>
              <Padding top={{ smallPhone: 2, tablet: 3 }}>
                <Image image={el.image} />
              </Padding>
            </Margin>
            <PostTitleWrapper top={1} bottom={1}>
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
