import React, { Fragment } from 'react'
import { Grid, Row, Col } from '../../grid'
import { Padding } from 'styled-components-spacing'
import { H2 } from '../../Typography'
import { SwitchLink, WorkStageGridElement, MasonryContainer } from './elements'
import WorkStageContent from './content'
import getSections from './getSections'

const WorkStage = ({ workStage, handleClick, alternatives }) => {
  const Tag = workStage.displayType === 'List' ? Col : Fragment
  const sections = getSections(workStage)
  return (
    <Grid>
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
          {workStage.displayType !== 'List' ? (
            <MasonryContainer length={sections.length}>
              {sections.map(
                ({ sectionTitle, sectionBody, sectionIcon }, index, arr) => (
                  <WorkStageGridElement
                    index={index}
                    last={arr.length - 1}
                    halfway={Math.floor(arr.length / 2)}
                    evenNumber={arr.length % 2 === 0}
                    xs={12}
                    key={index}
                  >
                    <Padding bottom={1.5}>
                      <img
                        src={`https://${sectionIcon.file.url}`}
                        alt={sectionIcon.title}
                      />
                    </Padding>

                    <WorkStageContent
                      isList
                      sectionTitle={sectionTitle}
                      sectionBody={sectionBody}
                    />
                  </WorkStageGridElement>
                )
              )}
            </MasonryContainer>
          ) : (
            sections.map(({ sectionTitle, sectionBody }, index) => (
              <Padding bottom={1} key={index}>
                <WorkStageContent
                  sectionTitle={sectionTitle}
                  sectionBody={sectionBody}
                />
              </Padding>
            ))
          )}
        </Tag>
      </Row>
    </Grid>
  )
}

export default WorkStage
