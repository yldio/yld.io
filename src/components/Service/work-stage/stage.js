import React, { Fragment } from 'react'
import { Grid, Row, Col } from '../../grid'
import { Padding } from 'styled-components-spacing'
import { SectionTitle } from '../../Typography'
import { SwitchLink } from './elements'
import WorkStageContent from './content'
import getSections from './getSections'

const WorkStage = ({ workStage, handleClick, alternatives }) => {
  const Tag = workStage.displayType === 'List' ? Col : Fragment
  const sections = getSections(workStage)
  return (
    <Grid>
      <Row>
        <Col
          width={[
            1,
            1,
            1,
            1,
            workStage.displayType !== 'List' ? 1 : 0.416,
            workStage.displayType !== 'List' ? 1 : 1 / 2
          ]}
        >
          <Padding
            bottom={{
              smallPhone: alternatives ? 0 : 3,
              smallTablet: 0,
              tablet: 2
            }}
          >
            <SectionTitle reverse>{workStage.title}</SectionTitle>
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
        <Tag width={[1, 1, 1, 1, 0.583, 1 / 2]}>
          {workStage.displayType !== 'List'
            ? sections.map(
                ({ sectionTitle, sectionBody, sectionIcon }, index, arr) => (
                  <Col width={[1, 1, 1, 1, 1 / 2, 1 / 3]} key={index}>
                    <Padding
                      bottom={{
                        smallPhone: 3,
                        smallTablet:
                          index === arr.length - 1 ||
                          (arr.length % 2 === 0 && index === arr.length - 2)
                            ? 3.5
                            : 4
                      }}
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
                    </Padding>
                  </Col>
                )
              )
            : sections.map(({ sectionTitle, sectionBody }, index) => (
                <Padding bottom={{ smallPhone: 1, tablet: 2 }} key={index}>
                  <WorkStageContent
                    sectionTitle={sectionTitle}
                    sectionBody={sectionBody}
                  />
                </Padding>
              ))}
        </Tag>
      </Row>
    </Grid>
  )
}

export default WorkStage
