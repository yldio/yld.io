import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import { Subtitle, BodyPrimary } from '../../Typography'
import { WorkStageContentList } from './elements'
import CustomisedBulletpoint from '../../CustomisedBulletpoint'

const WorkStageContent = ({ sectionTitle, sectionBody }) => {
  const bodyList = sectionBody.split('- ')

  return (
    <Fragment key={sectionTitle}>
      <Subtitle reverse>{sectionTitle}</Subtitle>
      <BodyPrimary muted reverse noPadding>
        {bodyList[0]}
      </BodyPrimary>
      {bodyList.slice(1).length > 0 && (
        <Padding top={1.5}>
          <WorkStageContentList>
            {bodyList.slice(1).map(c => (
              <CustomisedBulletpoint muted key={c}>
                {c}
              </CustomisedBulletpoint>
            ))}
          </WorkStageContentList>
        </Padding>
      )}
    </Fragment>
  )
}

export default WorkStageContent
