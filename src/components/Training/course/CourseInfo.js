import React from 'react'
import { Padding } from 'styled-components-spacing'

import StyledLink from '../../../components/Common/StyledLink'
import Image from '../../../components/Common/Image'
import { SectionTitle, BodyPrimary } from '../../../components/Typography'
import { Col } from '../../../components/grid'
import SubtitleWithBody from '../../../components/Common/SubtitleWithBody'

// TODO - retrieve from contentful
const constants = {
  level: 'Level',
  preRequisites: 'Pre-requisites',
  preRequisitesCourses: 'Pre-requisite Courses',
  contactUs: 'Contact us'
}

const CourseInfo = ({ content, image }) => (
  <Col width={[1, 1, 1, 1, 5 / 6]} px={0}>
    <Padding bottom={1}>
      {image && <Image image={image} width="60px" />}
      <SectionTitle>{content.name}</SectionTitle>
    </Padding>
    {content.description && (
      <BodyPrimary>{content.description.description}</BodyPrimary>
    )}
    <SubtitleWithBody subtitle={constants.level} body={content.level} />
    <SubtitleWithBody
      subtitle={constants.preRequisites}
      body={content.preRequisites}
    />
    <SubtitleWithBody
      subtitle={constants.preRequisitesCourses}
      body={content.preRequisitesCourses}
    />
    <Padding top={2}>
      <StyledLink to="/contact">{constants.contactUs}</StyledLink>
    </Padding>
  </Col>
)

export default CourseInfo
