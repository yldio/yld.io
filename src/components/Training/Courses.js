import React from 'react'
import { Padding } from 'styled-components-spacing'
import Flex from 'styled-flex-component'
import { H2 } from '../Typography'
import Image from '../Common/Image'
import StyledLink from '../styledLink'
import { Grid, Row, Col } from '../grid'

const Courses = ({ categories, courses, toggleModal }) => (
  <Grid>
    <Row>
      <Col width={[1]}>
        <Padding
          bottom={{ smallPhone: 3, tablet: 4 }}
          top={{ smallPhone: 3, tablet: 5 }}
        >
          <H2 noMargin>Course catalog</H2>
        </Padding>
      </Col>
      {categories.map((cat, i) => {
        const courseInCat = courses.filter(a => a.category === cat)
        return (
          <Col width={[1, 1, 1, 1, 1 / 2]} key={i}>
            <Padding bottom={{ smallPhone: 3, tablet: 5 }}>
              <Padding bottom={1}>
                <Image image={courseInCat[0].logo} />
                <H2>{cat}</H2>
              </Padding>
              <Flex column alignStart>
                {courseInCat.map((course, id) => (
                  <StyledLink
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleModal(course)}
                    key={id}
                  >
                    {course.name}
                  </StyledLink>
                ))}
              </Flex>
            </Padding>
          </Col>
        )
      })}
    </Row>
    <Padding bottom={{ smallPhone: 2, tablet: 0 }} />
  </Grid>
)

export default Courses
