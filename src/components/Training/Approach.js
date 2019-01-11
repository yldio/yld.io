import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import { Padding } from 'styled-components-spacing'

import { H2, Paragraph } from '../Typography'
import { Grid, Row, Col } from '../grid'
import GrayBackground from '../GreyBG'

const Hr = styled.hr`
  height: 1px;
  border: none;
  opacity: 0.2;
  background-color: #ffffff;

  ${is('small')`
    width: 76px;
  `};
`

const Approach = ({ title, content, formats }) => (
  <GrayBackground style={{ background: '#090329' }}>
    <Padding
      top={{ smallPhone: 3, tablet: 4 }}
      bottom={{ smallPhone: 3, tablet: 4 }}
    >
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            <Padding bottom={{ smallPhone: 3, tablet: 0 }}>
              <H2 style={{ maxWidth: 250 }} reverse>
                Our training approach
              </H2>
            </Padding>
          </Col>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            {title.map((approach, i) => (
              <Padding bottom={2} key={i}>
                <Paragraph noMargin fullWidth reverse bold>
                  {approach}
                </Paragraph>
                <Paragraph fullWidth reverse muted>
                  {content[i]}
                </Paragraph>
              </Padding>
            ))}
          </Col>
        </Row>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallPhone: 3, tablet: 4 }}
        >
          <Hr />
        </Padding>
        <Row>
          <Col width={[1]}>
            <H2 reverse>Our training formats</H2>
          </Col>
        </Row>
      </Grid>
    </Padding>
    <Grid>
      <Row>
        {formats.map(format => (
          <Col width={[1, 1, 1, 1, 1 / 3]} key={format.id}>
            <Padding bottom={{ smallPhone: 3, tablet: 0 }}>
              <Padding bottom={1}>
                <img
                  src={`https://${format.icon.file.url}`}
                  alt={format.icon.title}
                />
              </Padding>
              <Paragraph noMargin bold reverse>
                {format.title}
              </Paragraph>
              <Paragraph muted reverse>
                {format.description}
              </Paragraph>
              <Padding top={1} style={{ maxWidth: '80%' }}>
                {format.bulletPoints.map((point, i) => (
                  <Padding top={1} bottom={1} key={i}>
                    <Paragraph muted reverse>
                      {point}
                    </Paragraph>
                    <Padding top={0.5}>
                      <Hr small />
                    </Padding>
                  </Padding>
                ))}
              </Padding>
            </Padding>
          </Col>
        ))}
      </Row>
      <Padding bottom={{ smallPhone: 0, tablet: 5 }} />
    </Grid>
  </GrayBackground>
)

export default Approach
