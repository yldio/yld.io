import React from 'react'
import { H1 } from '../Typography'

const WorkStage = ({ workStage }) => {
  const sections = Array(5)
    .fill({})
    .map((element, index) => ({
      sectionTitle: workStage[`sectionTitle${index + 1}`],
      ...(workStage[`sectionBody${index + 1}`] && {
        sectionBody:
          workStage[`sectionBody${index + 1}`][`sectionBody${index + 1}`]
      }),
      ...(workStage[`sectionIcon${index + 1}`] && {
        sectionIcon: workStage[`sectionIcon${index + 1}`]
      })
    }))
    .filter(({ sectionTitle }) => sectionTitle)
  return (
    <div>
      <H1>{workStage.title}</H1>
      {sections.map(({ sectionTitle, sectionBody }) => (
        <div key={sectionTitle}>
          <p>{sectionTitle}</p>
          <p>{sectionBody}</p>
        </div>
      ))}
    </div>
  )
}
const WorkStages = ({ title, workStages }) => (
  <div>
    <H1>{title}</H1>
    {workStages.map(workStage => (
      <WorkStage key={workStage.id} workStage={workStage} />
    ))}
  </div>
)

export default WorkStages
