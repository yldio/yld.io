import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { graphql, navigate } from 'gatsby';
import { Padding } from 'styled-components-spacing';
import generateBreadcrumbData from '../utils/generateBreadcrumbData';
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing-3';
import Head from '../components/Common/Head';
import Layout from '../components/layout';
import CourseInfo from '../components/Training/course/CourseInfo';
import CourseContent from '../components/Training/course/CourseContent';
import ModalCloseButton from '../components/Training/course/ModalCloseButton';
import { Grid, Row, Col } from '../components/grid';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${(props) => props.theme.zIndexes.modal};
  overflow: scroll;
`;

const CloseButtonWrapper = styled(Padding)`
  display: flex;
  justify-content: flex-end;
`;

const ModalContent = ({
  modal,
  closeTo,
  course,
  category,
  location,
  siteUrl,
}) => {
  const returnPath = `${closeTo}/#${category.slug}`;

  const handleKeyPress = useCallback(
    ({ key }) => {
      if (key === 'Escape') {
        return navigate(returnPath);
      }
    },
    [returnPath],
  );

  useEffect(() => {
    document.addEventListener('keyup', handleKeyPress, false);

    return () => document.removeEventListener('keyup', handleKeyPress, false);
  }, [handleKeyPress]);

  const breadcrumbData = generateBreadcrumbData(siteUrl, [
    {
      name: 'service',
      pathname: returnPath,
      position: 2,
    },
    {
      name: `Training - ${course.name}`,
      pathname: location.pathname,
      position: 3,
    },
  ]);

  return (
    <Layout location={location} breadcrumbData={breadcrumbData}>
      <Head
        page={{ title: `Training - ${course.name}` }}
        seoMetaData={course.seoMetaData}
      />
      <Wrapper>
        <Padding top={{ smallPhone: 3 }} bottom={{ smallPhone: 5 }}>
          <Grid>
            <CloseButtonWrapper bottom={{ smallPhone: 3 }}>
              <ModalCloseButton to={modal ? returnPath : `/training`} />
            </CloseButtonWrapper>
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
      </Wrapper>
    </Layout>
  );
};

const TrainingCourseModal = ({
  data: {
    contentfulTrainingCourse: course,
    contentfulTrainingCourseCategory: category,
    site: {
      siteMetadata: { siteUrl },
    },
  },
  location,
}) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) => (
      <ModalContent
        course={course}
        category={category}
        closeTo={closeTo}
        location={location}
        modal={modal}
        siteUrl={siteUrl}
      />
    )}
  </ModalRoutingContext.Consumer>
);

export default TrainingCourseModal;

export const pageQuery = graphql`
  query ($id: String, $categoryId: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
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
      seoMetaData {
        ...SEOMetaFields
      }
    }
    contentfulTrainingCourseCategory(id: { eq: $categoryId }) {
      slug
      logo {
        gatsbyImageData(layout: FULL_WIDTH)
        title
        file {
          url
        }
      }
    }
  }
`;
