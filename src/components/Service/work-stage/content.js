import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import { Subtitle, BodyPrimary } from '../../Typography'
import { Item, WorkStageContentList } from './elements'
import Hr from '../../Common/Hr'

const WorkStageContent = ({ sectionTitle, sectionBody, isList }) => {
  const bodyList = sectionBody.split('- ')
  console.log('s title', sectionTitle)
  return (
    <Fragment key={sectionTitle}>
      <Subtitle reverse noPadding={!isList}>
        {sectionTitle}
      </Subtitle>
      <BodyPrimary muted reverse noPadding>
        {bodyList[0]}
      </BodyPrimary>
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
