import React from 'react'
import { graphql } from 'gatsby'
import styled, { createGlobalStyle } from 'styled-components'
import is from 'styled-is'
import remcalc from 'remcalc'
import breakpoint from 'styled-components-breakpoint'
import ReactMarkdown from 'react-markdown'
import { Padding } from 'styled-components-spacing'

import Layout from '../components/layout'
import StyledLink from '../components/Common/StyledLink'
import Image from '../components/Common/Image'
import { SectionTitle, BodyPrimary } from '../components/Typography'
import { Grid, Row, Col } from '../components/grid'
import close from '../images/close.svg'
import SubtitleWithBody, {
  ItemSubtitle,
  ItemBody
} from '../components/Common/SubtitleWithBody'
import CustomisedBulletpoint from '../components/Common/CustomisedBulletpoint'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.white};
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.zIndexes.modal};
  transition: transform ${props => props.theme.animations.normal},
    opacity ${props => props.theme.animations.normal};
  transform: scale(0.7);
  visibility: hidden;

  ${is('visible')`
    transform: scale(1);
    opacity: 1;
    visibility: visible;
    overflow: scroll;
  `};
`

const Close = styled.button`
  border: none;
  border-radius: 50%;
  width: ${remcalc(54)};
  height: ${remcalc(54)};
  background-color: #333333;
  color: white;
  right: ${remcalc(24)};
  top: ${remcalc(36)};
  font-size: ${remcalc(28)};
  font-weight: 200;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

    &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid ${props => props.theme.colors.vibrant};
    color: ${props => props.theme.colors.text};
  }

  &:active {
    outline: none;
    background: #00edbf;
    color: ${props => props.theme.colors.text};

    &:after {
      background: ${props => props.theme.colors.text};
    }
  }

  ${breakpoint('smallTablet')`
    right: ${remcalc(42)};
  `}

  ${breakpoint('tablet')`
    right: ${remcalc(48)};
  `}

   ${breakpoint('desktop')`
    right: ${remcalc(90)};
  `}
`

const ModalStyles = createGlobalStyle`
  body {
    ${is('open')`
      overflow: hidden;
      position: absolute;
    `}
  }
`

const CourseInfo = ({ content }) => (
  <Col width={[1, 1, 1, 1, 5 / 6]} px={0}>
    <Padding bottom={1}>
      <Image image={content.logo} width="60px" />
      <SectionTitle>{content.name}</SectionTitle>
    </Padding>
    {content.description && (
      <BodyPrimary>{content.description.description}</BodyPrimary>
    )}
    <SubtitleWithBody subtitle="Level" body={content.level} />
    <SubtitleWithBody subtitle="Pre-requisites" body={content.preRequisites} />
    <SubtitleWithBody
      subtitle="Pre-requisite Courses"
      body={content.preRequisitesCourses}
    />
    <Padding top={2}>
      <StyledLink to="/contact">Contact us</StyledLink>
    </Padding>
  </Col>
)

const CourseContent = ({ content }) => (
  <Col width={[1, 1, 1, 1, 1, 5 / 6]} px={0}>
    <Padding top={4}>
      {/* eslint-disable react/display-name */}
      <ReactMarkdown
        renderers={{
          paragraph: props => (
            <Padding bottom={1}>
              <ItemBody {...props} />
            </Padding>
          ),
          heading: props => <ItemSubtitle {...props} />,
          list: props => (
            <Padding top={1} bottom={30}>
              <ul {...props} />
            </Padding>
          ),
          listItem: props => (
            <CustomisedBulletpoint maxWidth="auto" {...props} />
          )
        }}
        source={content.content.content}
      />
      {/* eslint-enable react/display-name */}
    </Padding>
  </Col>
)

// const Modal = ({ content, toggleModal }) => (
const TrainingCourseModal = ({
  data: { contentFulTrainingCourse: content },
  location
}) => (
  <Layout location={location}>
    <Wrapper visible={content}>
      <ModalStyles open={content} />
      {content && (
        <Padding top={{ smallPhone: 5 }} bottom={{ smallPhone: 5 }}>
          <Close onClick={() => {}}>
            <img src={close} alt="close modal" width="18" height="18" />
          </Close>
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <CourseInfo content={content} />
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <CourseContent content={content} />
              </Col>
            </Row>
          </Grid>
        </Padding>
      )}
    </Wrapper>
  </Layout>
)

export default TrainingCourseModal

export const pageQuery = graphql`
  query($id: String) {
    contentfulTrainingCourse(id: { eq: $id }) {
      id
      name
      slug
      technology
      level
      preRequisites
      preRequisitesCourses
      description {
        description
      }
      content {
        content
      }
    }
  }
`
