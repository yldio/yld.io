import React from 'react'
import ReactMarkdown from 'react-markdown'
import breakpoint from 'styled-components-breakpoint'
import styled from 'styled-components'

import { Row, Col } from '../grid'
import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import getSections from './getSections'
import TitleAndList from '../Common/TitleAndList'
import CustomisedBulletpoint from '../Common/CustomisedBulletpoint'
import theme from '../../utils/theme'

const SectionTitlePadding = styled.div`
  padding-top: 0;
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('smallTablet')`
    padding-top: ${({ theme }) => theme.space[7]};
  `}
  
  ${breakpoint('tablet')`
    padding-top: ${({ theme }) => theme.space[5]};
    `}
  
  ${breakpoint('desktop')`
    padding-top: ${({ theme }) => theme.space[6]};
    `}
`

const ItemPadding = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('desktop')`
    padding-bottom: ${({ theme }) => theme.space[6]};
    `}
`

const ImagePadding = styled.div`
  padding-bottom: ${({ theme }) => theme.space[2]};
`

const EmptyPaddingDiv = styled.div`
  padding-bottom: ${({ theme }) => theme.space[4]};

  ${breakpoint('desktop')`
  padding-bottom: ${({ theme }) => theme.space[6]};
  `}
`

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
        <SectionTitlePadding>
          <SectionTitle reverse>{workStage.title}</SectionTitle>
        </SectionTitlePadding>
      </Col>
      {sections.map(({ id, title, body, icon }) => (
        <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]} key={id}>
          <ItemPadding>
            <ImagePadding>
              <img
                src={`https://${icon.file.url}`}
                alt={icon.title}
                height="56px"
              />
            </ImagePadding>
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
          </ItemPadding>
        </Col>
      ))}
      <EmptyPaddingDiv />
    </Row>
  )
}

export default WorkStage
