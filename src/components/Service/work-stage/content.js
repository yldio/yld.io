import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import { Paragraph } from '../../Typography'
import { Item } from './elements'

const WorkStageContent = ({ sectionTitle, sectionBody, isList }) => (
  <Fragment key={sectionTitle}>
    <Paragraph reverse bold noMargin={!isList}>
      {sectionTitle}
    </Paragraph>
    <Paragraph muted reverse>
      {sectionBody.split('- ')[0]}
    </Paragraph>
    <Padding top={1.5}>
      {sectionBody
        .split('- ')
        .slice(1)
        .map(c => (
          <Item key={c}>{c}</Item>
        ))}
    </Padding>
  </Fragment>
)

export default WorkStageContent
