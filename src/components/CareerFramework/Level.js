import React from 'react'
import generate from 'shortid'
import StyledLink from '../Common/StyledLink'
import styled from 'styled-components'

import { Row, Col } from '../grid'
import { BodyPrimary, SectionTitle } from '../Typography'

const LevelInfo = ({ ctaTitle, ctaUrl, infoContent, title }) => (
  <LevelInfoWrapper>
    <BodyPrimary noPaddingBottom bold>
      {title}
    </BodyPrimary>
    {infoContent.infoContent && (
      <BodyPrimary noPaddingTop>{infoContent.infoContent}</BodyPrimary>
    )}
    <StyledLink to={ctaUrl} title={`Learn More about ${title}`}>
      {ctaTitle}
    </StyledLink>
  </LevelInfoWrapper>
)

const LevelOrder = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.black};
  display: inline-block;
  font-weight: bold;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const LevelInfoWrapper = styled(Col)`
  padding-bottom: ${({ theme }) => theme.space[4]};
`

const LevelOrderWrapper = styled(Col)`
  padding-top: ${({ first, theme }) => theme.space[first ? 4 : 2]};
`

const Level = ({ title, info, order, levelInfo = [], first }) => (
  <Row spaced>
    <LevelOrderWrapper first={first} width={[1]}>
      <LevelOrder>{order}</LevelOrder>
    </LevelOrderWrapper>
    <Col width={[1, 1, 1, 1, 5 / 12]}>
      <SectionTitle>{title}</SectionTitle>
      {info && <BodyPrimary>{info}</BodyPrimary>}
    </Col>
    <Col width={[1, 1, 1, 1, 6 / 12]}>
      {levelInfo &&
        levelInfo.length &&
        levelInfo.map(level => <LevelInfo key={generate()} {...level} />)}
    </Col>
  </Row>
)

export default Level
