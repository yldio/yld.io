import React from 'react'
import { Padding } from 'styled-components-spacing'

import { SectionTitleH2, SubtitleH3, BodyPrimary } from '../Typography'
import { Grid, Row, Col } from '../grid'
import Hr from '../Common/Hr'
import BlueBG from '../BlueBG'

const Approach = ({ title, content, formats }) => (
  <BlueBG>
    <Padding
      top={{ smallPhone: 3, desktop: 4 }}
      bottom={{ smallPhone: 3, desktop: 4 }}
    >
      <Grid>
        <Row>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            <Padding bottom={{ smallPhone: 3, tablet: 0 }}>
              <SectionTitleH2 noTop style={{ maxWidth: 250 }} reverse>
                Our training approach
              </SectionTitleH2>
            </Padding>
          </Col>
          <Col width={[1, 1, 1, 1, 1 / 2]}>
            <Padding top={{ smallPhone: 1, desktop: 0 }}>
              {title.map((approach, i) => (
                <Padding bottom={2} key={i}>
                  <BodyPrimary noPadding reverse>
                    {approach}
                  </BodyPrimary>
                  <BodyPrimary reverse muted>
                    {content[i]}
                  </BodyPrimary>
                </Padding>
              ))}
            </Padding>
          </Col>
        </Row>
        <Padding
          top={{ smallPhone: 3, tablet: 48 }}
          bottom={{ smallPhone: 3, tablet: 4 }}
        >
          <Hr muted />
        </Padding>
        <Row>
          <Col width={[1]}>
            <SectionTitleH2 reverse>Our training formats</SectionTitleH2>
          </Col>
        </Row>
      </Grid>
    </Padding>
    <Grid>
      <Row>
        {formats.map(format => (
          <Col width={[1, 1, 1, 1, 1 / 2, 1 / 2, 1 / 3]} key={format.id}>
            <Padding bottom={{ smallPhone: 3, desktop: 0 }}>
              <Padding bottom={1}>
                <img
                  src={`https://${format.icon.file.url}`}
                  alt={format.icon.title}
                />
              </Padding>
              <SubtitleH3 noPadding reverse>
                {format.title}
              </SubtitleH3>
              <BodyPrimary muted reverse>
                {format.description}
              </BodyPrimary>
              <Padding top={1} style={{ maxWidth: '80%' }}>
                {format.bulletPoints.map((point, i) => (
                  <Padding top={1} key={i}>
                    <BodyPrimary muted reverse>
                      {point}
                    </BodyPrimary>
                    <Hr short muted />
                  </Padding>
                ))}
              </Padding>
            </Padding>
          </Col>
        ))}
      </Row>
      <Padding bottom={{ smallPhone: 0, tablet: 5 }} />
    </Grid>
  </BlueBG>
)

export default Approach
