import React from 'react'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'
import is from 'styled-is'
import ReactMarkdown from 'react-markdown'
import { Padding } from 'styled-components-spacing'
import StyledLink from '../styledLink'
import Image from '../Common/Image'
import remcalc from 'remcalc'
import { H2, Paragraph } from '../Typography'
import { Grid, Row, Col } from '../grid'
import close from '../../images/close.svg'

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

const Modal = ({ content, toggleModal }) => (
  <Wrapper visible={content}>
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
