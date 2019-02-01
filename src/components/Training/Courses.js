import React from 'react'
import { Padding } from 'styled-components-spacing'
import Flex from 'styled-flex-component'
import { SectionTitle } from '../Typography'
import Image from '../Common/Image'
import StyledLink from '../styledLink'
import { Grid, Row, Col } from '../grid'

const Courses = ({ categories, toggleModal }) => {
  return (
    <Grid>
      <Row>
        <Col width={[1]}>
          <Padding
            bottom={{ smallPhone: 3, tablet: 4 }}
            top={{ smallPhone: 3, tablet: 4, desktop: 5 }}
          >
            <SectionTitle noPadding>Course catalog</SectionTitle>
          </Padding>
        </Col>
        {categories.map(cat => (
          <Col width={[1, 1, 1, 1, 1 / 2]} key={cat.id}>
            <Padding bottom={{ smallPhone: 3, tablet: 5 }}>
              <Padding bottom={1}>
                <Image image={cat.logo} />
                <SectionTitle>{cat.name}</SectionTitle>
              </Padding>
              <Flex column alignStart>
                {cat.courses.map(course => (
                  <StyledLink
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleModal({ ...cat, ...course })}
                    key={course.id}
                  >
                    {course.name}
                  </StyledLink>
                ))}
              </Flex>
            </Padding>
          </Col>
        ))}
      </Row>
      <Padding bottom={{ smallPhone: 2, tablet: 0 }} />
    </Grid>
  )
}

export default Courses
