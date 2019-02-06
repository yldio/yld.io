import React, { Fragment } from 'react'
import { Grid, Row, Col } from '../../grid'
import { Padding } from 'styled-components-spacing'
import { SectionTitle } from '../../Typography'
import { SwitchLink } from './elements'
import WorkStageContent from './content'
import getSections from './getSections'
import TitleAndList from '../../Common/TitleAndList'

const WorkStage = ({ workStage, handleClick, alternatives, index }) => {
  const Tag = workStage.displayType === 'List' ? Col : Fragment
  const sections = getSections(workStage)

  if (workStage.displayType === 'List') {
    return (
      <Grid>
        <TitleAndList
          title={workStage.title}
          list={sections.map(({ sectionTitle: title, sectionBody: body }) => ({
            title,
            body
          }))}
          bg="dark"
        />
      </Grid>
    )
  }

  return (
    <Padding
      top={{
        smallPhone: index === 0 ? 0 : 3,
        smallTablet: index === 0 ? 5 : 3,
        tablet: index === 0 ? 3.5 : 4
      }}
      bottom={{
        smallTablet: workStage.displayType === 'Grid' ? 0 : index === 0 ? 3 : 4,
        tablet: workStage.displayType === 'Grid' ? 0 : index === 0 ? 4 : 5
      }}
    >
      <Grid>
        <Row spaced={false}>
          <Col width={[1, 1, 1, 1]}>
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
            {sections.map(
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
                      sectionTitle={sectionTitle}
                      sectionBody={sectionBody}
                    />
                  </Padding>
                </Col>
              )
            )}
          </Tag>
        </Row>
      </Grid>
    </Padding>
  )
}

export default WorkStage
