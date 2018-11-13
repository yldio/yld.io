import React, { Fragment } from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import remcalc from 'remcalc'
import { H2, Paragraph } from '../Typography'

const Item = styled.li`
  color: ${props => props.theme.colors.white};
  padding: ${remcalc(0)} 0 ${remcalc(12)} 0;
  line-height: ${remcalc(24)};
  opacity: 0.5;
  text-indent: ${remcalc(-24)};
  margin-left: ${remcalc(24)};
`

const WorkStageContent = ({ sectionTitle, sectionBody }) => (
  <Fragment key={sectionTitle}>
    <Paragraph reverse bold>
      {sectionTitle}
    </Paragraph>
    <Paragraph muted reverse>
      {sectionBody.split('- ')[0]}
    </Paragraph>
    <Padding top={3}>
      {sectionBody
        .split('- ')
        .slice(1)
        .map(c => (
          <Item key={c}>{c}</Item>
        ))}
    </Padding>
  </Fragment>
)

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
        sectionIcon: workStage[`sectionIcon${index + 1}`].file.url
      })
    }))
    .filter(({ sectionTitle }) => sectionTitle)
  console.log(workStage)

  const Tag = workStage.displayType === 'List' ? Col : Fragment
  return (
    <Grid className="grid">
      <Row>
        <Col xs={12} md={workStage.displayType !== 'List' ? 12 : 6}>
          <Padding bottom={2}>
            <H2 reverse>{workStage.title}</H2>
          </Padding>
        </Col>
        <Tag xs={12} md={6}>
          {sections.map(({ sectionTitle, sectionBody, sectionIcon }) =>
            workStage.displayType !== 'List' ? (
              <Col xs={12} md={6}>
                <Padding bottom={4}>
                  <Padding bottom={1}>
                    {' '}
                    <img src={`https://${sectionIcon}`} />
                  </Padding>
                  <WorkStageContent
                    sectionTitle={sectionTitle}
                    sectionBody={sectionBody}
                  />
                </Padding>
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
      {workStage.displayType !== 'List' ? <hr /> : null}
    </Grid>
  )
}
const WorkStages = ({ title, workStages }) => (
  <Fragment>
    <Grid className="grid">
      <Row>
        <Col xs={12}>
          <Padding top={4} bottom={6}>
            <H2 reverse center>
              {title}
            </H2>
          </Padding>
        </Col>
      </Row>
    </Grid>
    {workStages.map(workStage => (
      <Padding bottom={5} key={workStage.id}>
        <WorkStage workStage={workStage} />
      </Padding>
    ))}
  </Fragment>
)

export default WorkStages
