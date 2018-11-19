import React, { Fragment } from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import { H2 } from '../../Typography'
import { SwitchLink, WorkStageGridPadding } from './elements'
import WorkStageContent from './content'

const WorkStage = ({ workStage, handleClick, alternatives }) => {
  const sections = Array(5)
    .fill({})
    .map((element, index) => ({
      sectionTitle: workStage[`sectionTitle${index + 1}`],
      ...(workStage[`sectionBody${index + 1}`] && {
        sectionBody:
          workStage[`sectionBody${index + 1}`][`sectionBody${index + 1}`]
      }),
      ...(workStage[`sectionIcon${index + 1}`] && {
        sectionIcon: workStage[`sectionIcon${index + 1}`].file.url
      })
    }))
    .filter(({ sectionTitle }) => sectionTitle)
  const Tag = workStage.displayType === 'List' ? Col : Fragment
  return (
    <Grid className="grid">
      <Row>
        <Col xs={12} md={workStage.displayType !== 'List' ? 12 : 6}>
          <Padding bottom={2}>
            <H2 reverse noTop>
              {workStage.title}
            </H2>
          </Padding>
          {alternatives &&
            alternatives.map(alternative => (
              <SwitchLink
                onClick={() => handleClick(alternative)}
                key={alternative}
                reverse
                muted={alternative !== workStage.alternativeTitle}
              >
                {alternative}
              </SwitchLink>
            ))}
        </Col>
        <Tag xs={12} md={6}>
          {sections.map(
            ({ sectionTitle, sectionBody, sectionIcon }, index, arr) =>
              workStage.displayType !== 'List' ? (
                <Col xs={12} md={6}>
                  <WorkStageGridPadding
                    index={index}
                    last={arr.length - 1}
                    secondLast={arr.length - 2}
                    evenNumber={arr.length % 2 === 0}
                  >
                    <Padding bottom={1.5}>
                      <img src={`https://${sectionIcon}`} />
                    </Padding>
                    <WorkStageContent
                      isList
                      sectionTitle={sectionTitle}
                      sectionBody={sectionBody}
                    />
                  </WorkStageGridPadding>
                </Col>
              ) : (
                <Padding bottom={1}>
                  <WorkStageContent
                    sectionTitle={sectionTitle}
                    sectionBody={sectionBody}
                  />
                </Padding>
              )
          )}
        </Tag>
      </Row>
    </Grid>
  )
}

export default WorkStage
