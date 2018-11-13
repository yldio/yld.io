import React from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { H2, Paragraph } from '../Typography'

const WorkStage = ({ workStage }) => {
  const sections = Array(5)
    .fill({})
    .map((element, index) => ({
      sectionTitle: workStage[`sectionTitle${index + 1}`],
      ...(workStage[`sectionBody${index + 1}`] && {
        sectionBody:
          workStage[`sectionBody${index + 1}`][`sectionBody${index + 1}`],
      }),
      ...(workStage[`sectionIcon${index + 1}`] && {
        sectionIcon: workStage[`sectionIcon${index + 1}`],
      }),
    }))
    .filter(({ sectionTitle }) => sectionTitle)
  console.log(workStage)
  return (
    <Grid className="grid">
      <Row>
        <Col xs={12} md={workStage.displayType !== 'List' ? 12 : 6}>
          <H2 reverse>{workStage.title}</H2>
        </Col>
        {sections.map(({ sectionTitle, sectionBody }) => (
          <Col xs={12} md={6} key={sectionTitle}>
            <Paragraph reverse>{sectionTitle}</Paragraph>
            <Paragraph muted reverse>
              {sectionBody}
            </Paragraph>
          </Col>
        ))}
      </Row>
    </Grid>
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
