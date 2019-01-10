import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import ReactMarkdown from 'react-markdown'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import { H2, Paragraph } from '../Typography'
import { Grid, Row, Col } from '../grid'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 9999;
  transition: transform 0.3s, opacity 0.3s;
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
  width: 54px;
  height: 54px;
  background-color: #333333;
  color: white;
  right: 90px;
  top: 36px;
  position: absolute;
  font-size: 28px;
  font-weight: 200;
  position: fixed;
`

const Modal = ({ content, toggleModal }) => (
  <Wrapper visible={content}>
    {content && (
      <Padding top={{ smallPhone: 5 }} bottom={{ smallPhone: 5 }}>
        <Close onClick={() => toggleModal(null)}>X</Close>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <Image image={content.logo} />
              <Padding bottom={2}>
                <H2>{content.name}</H2>
              </Padding>
              <Paragraph bold>Level</Paragraph>
              <Paragraph>{content.level}</Paragraph>
              <Paragraph bold>Pre-requisites</Paragraph>
              <Paragraph>{content.preRequisites}</Paragraph>
              <Paragraph bold>Pre-requisite Courses</Paragraph>
              <Paragraph>{content.preRequisitesCourses}</Paragraph>
              <Padding top={48}>
                <StyledLink to="/contact">Contact us</StyledLink>
              </Padding>
            </Col>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <Padding top={4}>
                <ReactMarkdown
                  renderers={{
                    paragraph: props => <Paragraph {...props} />, // eslint-disable-line react/display-name
                    strong: props => <Paragraph bold {...props} /> // eslint-disable-line react/display-name
                  }}
                  source={content.description.description}
                />
              </Padding>
            </Col>
          </Row>
        </Grid>
      </Padding>
    )}
  </Wrapper>
)

export default Modal
