import React from 'react'
import { Padding, Margin } from 'styled-components-spacing'
import styled from 'styled-components'
import { Row, CompensatedRow, CompensatedCol } from '../grid'
import Image from '../Common/Image'
import { H2, Paragraph } from '../Typography'

import {
  Section,
  FirstColumn,
  SecondColum,
  Separator,
  List,
  Hr,
  TitleAndBody
} from './elements'

const InsightAnchor = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Learning = ({ data: { title, text, featuredInsights, list } }) => (
  <Section greyBg>
    <Row>
      <FirstColumn>
        <H2>{title}</H2>
      </FirstColumn>
      <SecondColum width={[1, 1, 1, 1, 6 / 12, 5 / 12]}>
        <List list={list} />
      </SecondColum>
    </Row>
    <Separator />
    <TitleAndBody
      title="Some insights into personal growth at YLD"
      body={text}
    />
    <CompensatedRow>
      {featuredInsights.map((el, idx) => (
        <CompensatedCol width={[1, 1, 1, 4 / 12]} key={idx}>
          <InsightAnchor href={el.url}>
            <Padding top={2} style={{ width: '100%' }}>
              <Margin bottom={1}>
                <Image image={el.image} />
              </Margin>
            </Padding>
            <Padding top={1} bottom={1} style={{ flex: 1 }}>
              <Paragraph bold noMargin>
                {el.image.title}
              </Paragraph>
            </Padding>
            <Hr />
          </InsightAnchor>
        </CompensatedCol>
      ))}
    </CompensatedRow>
  </Section>
)

export default Learning
