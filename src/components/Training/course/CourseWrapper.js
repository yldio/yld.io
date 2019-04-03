import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'

import Layout from '../../../components/layout'

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

const CourseWrapper = ({ location, content, children }) => (
  <Layout location={location}>
    <Wrapper visible={content}>{children}</Wrapper>
  </Layout>
)

export default CourseWrapper
