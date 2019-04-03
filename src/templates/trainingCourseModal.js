import React from 'react'
import { graphql } from 'gatsby'
import { Padding } from 'styled-components-spacing'
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

import CourseWrapper from '../components/Training/course/CourseWrapper'
import CourseInfo from '../components/Training/course/CourseInfo'
import CourseContent from '../components/Training/course/CourseContent'
import ModalCloseButton from '../components/Training/course/ModalCloseButton'
import { Grid, Row, Col } from '../components/grid'

const TrainingCourseModal = ({
  data: {
    contentfulTrainingCourse: course,
    contentfulTrainingCourseCategory: category
  },
  location
}) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) => (
      <CourseWrapper location={location} content={course}>
        <Padding top={{ smallPhone: 5 }} bottom={{ smallPhone: 5 }}>
          <ModalCloseButton
            to={modal ? `${closeTo}/#${category.slug}` : `/training`}
          />
          <Grid>
            <Row>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <CourseInfo
                  name={course.name}
                  description={course.description.description}
                  level={course.level}
                  preRequisites={course.preRequisites}
                  preRequisitesCourses={course.preRequisitesCourses}
                  image={category.logo}
                />
              </Col>
              <Col width={[1, 1, 1, 1, 1 / 2]}>
                <CourseContent content={course.content.content} />
              </Col>
            </Row>
          </Grid>
        </Padding>
      </CourseWrapper>
    )}
  </ModalRoutingContext.Consumer>
)

export default TrainingCourseModal

export const pageQuery = graphql`
  query($id: String, $categoryId: String) {
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
    contentfulTrainingCourseCategory(id: { eq: $categoryId }) {
      slug
      logo {
        fluid(maxWidth: 60) {
          ...GatsbyContentfulFluid_withWebp
        }
        title
        file {
          url
        }
      }
    }
  }
`
