import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import { Paragraph } from '../../Typography'
import { Item, WorkStageContentList } from './elements'
import Hr from '../../Common/Hr'

const WorkStageContent = ({ sectionTitle, sectionBody, isList }) => {
  const bodyList = sectionBody.split('- ')

  return (
    <Fragment key={sectionTitle}>
      <Paragraph reverse bold noMargin={!isList}>
        {sectionTitle}
      </Paragraph>
      <Paragraph muted reverse>
        {bodyList[0]}
      </Paragraph>
      {bodyList.slice(1).length > 0 && (
        <Padding top={1.5}>
          <WorkStageContentList>
            {bodyList.slice(1).map(c => (
              <Item key={c}>
                {c}
                <Hr short />
              </Item>
            ))}
          </WorkStageContentList>
        </Padding>
      )}
    </Fragment>
  )
}

export default WorkStageContent
