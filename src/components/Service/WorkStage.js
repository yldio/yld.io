import React from 'react'
import { Padding } from 'styled-components-spacing'
import ReactMarkdown from 'react-markdown'

import { Row, Col } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import getSections from './getSections'
import TitleAndList from '../Common/TitleAndList'
import CustomisedBulletpoint from '../Common/CustomisedBulletpoint'
import theme from '../../utils/theme'

const WorkStage = ({ workStage }) => {
  const sections = getSections(workStage)
  if (workStage.displayType === 'List') {
    return (
      <TitleAndList
        title={workStage.title}
        list={sections.map(({ title, body }) => ({
          title,
          body
        }))}
        themeVariation={theme.variations.dark}
      />
    )
  }

  return (
    <Row spaced={false}>
      <Col width={[1]}>
        <Padding
          top={{
            smallPhone: 0,
            smallTablet: 5,
            tablet: 3.5
          }}
          bottom={{ smallPhone: 3, desktop: 4 }}
        >
          <SectionTitle reverse>{workStage.title}</SectionTitle>
        </Padding>
      </Col>
      {sections.map(({ id, title, body, icon }) => (
        <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]} key={id}>
          <Padding bottom={{ smallPhone: 3, desktop: 4 }}>
            <Padding bottom={1}>
              <img src={`https://${icon.file.url}`} alt={icon.title} />
            </Padding>
            <Subtitle noPadding reverse>
              {title}
            </Subtitle>
            {/* eslint-disable react/display-name */}
            <ReactMarkdown
              source={body}
              renderers={{
                paragraph: props => <BodyPrimary muted reverse {...props} />,
                listItem: props => (
                  <CustomisedBulletpoint muted reverse {...props} />
                )
              }}
            />
            {/* eslint-enable react/display-name */}
          </Padding>
        </Col>
      ))}
      <Padding bottom={{ smallPhone: 3, desktop: 4 }} />
    </Row>
  )
}

export default WorkStage
