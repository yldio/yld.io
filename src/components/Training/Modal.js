import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import ReactMarkdown from 'react-markdown'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import remcalc from 'remcalc'
import { SectionTitle, BodyPrimary, Subtitle } from '../Typography'
import { Grid, Row, Col } from '../grid'
import close from '../../images/close.svg'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.white};
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 9999;
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
  position: absolute;
  font-size: ${remcalc(28)};
  font-weight: 200;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;

    &:focus {
    background: transparent;
    outline: ${remcalc(4)} solid #6be9c1;
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

const Modal = ({ content, toggleModal }) => (
  <Wrapper visible={content}>
    <ModalStyles open={content} />
    {content && (
      <Padding top={{ smallPhone: 5 }} bottom={{ smallPhone: 5 }}>
        <Close onClick={() => toggleModal(null)}>
          <img src={close} alt="close modal" width="18" height="18" />
        </Close>
        <Grid>
          <Row>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <Image image={content.logo} />
              <Padding bottom={2}>
                <SectionTitle>{content.name}</SectionTitle>
              </Padding>
              <Subtitle as="h3">Level</Subtitle>
              <BodyPrimary>{content.level}</BodyPrimary>
              <Subtitle as="h3">Pre-requisites</Subtitle>
              <BodyPrimary>{content.preRequisites}</BodyPrimary>
              <Subtitle as="h3">Pre-requisite Courses</Subtitle>
              <BodyPrimary>{content.preRequisitesCourses}</BodyPrimary>
              <Padding top={48}>
                <StyledLink to="/contact">Contact us</StyledLink>
              </Padding>
            </Col>
            <Col width={[1, 1, 1, 1, 1 / 2]}>
              <Padding top={4}>
                <ReactMarkdown
                  renderers={{
                    paragraph: props => <BodyPrimary {...props} />, // eslint-disable-line react/display-name
                    heading: props => <Subtitle {...props} /> // eslint-disable-line react/display-name
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
