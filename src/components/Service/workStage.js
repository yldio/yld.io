import React from 'react'
import { H2, Paragraph } from '../Typography'

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
      <H2 reverse>{workStage.title}</H2>
      {sections.map(({ sectionTitle, sectionBody }) => (
        <div key={sectionTitle}>
          <Paragraph reverse>{sectionTitle}</Paragraph>
          <Paragraph reverse>{sectionBody}</Paragraph>
        </div>
      ))}
    </div>
  )
}
const WorkStages = ({ title, workStages }) => (
  <div>
    <H2 reverse>{title}</H2>
    {workStages.map(workStage => (
      <WorkStage key={workStage.id} workStage={workStage} />
    ))}
  </div>
)

export default WorkStages
