import React, { Fragment } from 'react'
import generate from 'shortid'
import StyledLink from '../Common/StyledLink'
import styled from 'styled-components'
import Get from 'lodash.get'

import { Grid, Row, Col } from '../grid'
import { BodyPrimary, SectionTitle } from '../Typography'
import Hr from '../Common/Hr'
import GreyBackground from '../Common/GreyBackground'
import BlueBackground from '../Common/BlueBackground'
import Image from '../Common/Image'

// levels {
//     title
//     info
//     levelInfo {
//       id
//       ctaTitle
//       ctaUrl
//       info {
//         id
//         content {
//           content {
//             value
//           }
//         }
//       }
//     }
//   }

const LevelInfo = ({ ctaTitle, ctaUrl, info, title }) => {
  const infoContent = Get(info, 'content[0].content[0].value', undefined)
  return (
    <LevelInfoWrapper>
      <BodyPrimary noPadding strong>
        {title}
      </BodyPrimary>
      {infoContent && <BodyPrimary>{infoContent}</BodyPrimary>}
      <StyledLink to={ctaUrl} title={`Learn More about ${title}`}>
        {ctaTitle}
      </StyledLink>
    </LevelInfoWrapper>
  )
}

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
  padding-top: ${({ theme }) => theme.space[4]};
`

const Level = ({ title, info, order, levelInfo = [] }) => (
  <Row spaced>
    <LevelOrderWrapper width={[1]}>
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

const Group = props => {
  const { levels } = props

  return (
    levels &&
    levels.length &&
    levels.map((level, idx, arr) => (
      <Fragment key={generate()}>
        <Level {...level} order={idx + 1} />
        {idx <= arr.length && <Hr />}
      </Fragment>
    ))
  )
}

const JoinContentCol = styled(Col)`
  padding-top: ${({ theme }) => theme.space[7]};
  padding-bottom: ${({ theme }) => theme.space[7]};
`

const Join = props => {
  const {
    title,
    ctaTitle,
    ctaUrl,
    content: { content }
  } = props
  return (
    <Grid>
      <Row>
        <JoinContentCol width={[1, 1, 1, 1, 6 / 12]}>
          <SectionTitle reverse>{title}</SectionTitle>
          <BodyPrimary reverse>{content}</BodyPrimary>
          <StyledLink to={ctaUrl} reverse>
            {ctaTitle}
          </StyledLink>
        </JoinContentCol>
        <Col width={[1, 1, 1, 1, 6 / 12]}>{/* <Image /> */}</Col>
      </Row>
    </Grid>
  )
}

const Wrapper = styled.div`
  ${({ isActive }) => (isActive ? 'display: block' : 'display: none')}
`

const Discipline = ({ isActive, groups, joins = [] }) => {
  return (
    <Wrapper isActive={isActive}>
      {groups &&
        groups.length &&
        groups.map((group, idx) => (
          <Fragment key={generate()}>
            <GreyBackground>
              <Grid>
                <Group {...group} />
              </Grid>
            </GreyBackground>
            <BlueBackground>
              {joins && joins[idx] && <Join {...joins[idx]} />}
            </BlueBackground>
          </Fragment>
        ))}
    </Wrapper>
  )
}

export default Discipline
