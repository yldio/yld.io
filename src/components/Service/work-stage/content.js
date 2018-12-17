import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import { Paragraph } from '../../Typography'
import { Item, WorkStageContentList, Hr } from './elements'

const WorkStageContent = ({ sectionTitle, sectionBody, isList }) => (
  <Fragment key={sectionTitle}>
    <Paragraph reverse bold noMargin={!isList}>
      {sectionTitle}
    </Paragraph>
    <Paragraph muted reverse>
      {sectionBody.split('- ')[0]}
    </Paragraph>
    <Padding top={1.5}>
      <WorkStageContentList>
        {sectionBody
          .split('- ')
          .slice(1)
          .map(c => (
            <Item key={c}>
              {c}
              <Hr short />
            </Item>
          ))}
      </WorkStageContentList>
    </Padding>
  </Fragment>
)

export default WorkStageContent
