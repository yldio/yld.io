import React from 'react'
import { Padding } from 'styled-components-spacing'

import { SectionTitle, Subtitle, BodyPrimary } from '../Typography'
import { Grid, Row, Col } from '../grid'
import Hr from '../Common/Hr'
import BlueBackground from '../BlueBG'
import TitleAndList from '../Common/TitleAndList'

const Approach = ({ title, content, formats }) => (
  <BlueBackground>
    <Padding bottom={{ smallPhone: 3, desktop: 4 }}>
      <Grid>
        <TitleAndList
          title={'Our training approach '}
          list={title.map((approach, i) => ({
            title: approach,
            body: content[i]
          }))}
          bg="dark"
        />
        <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
          <Hr muted />
        </Padding>
        <Row>
          <Col width={[1]}>
            <SectionTitle reverse>Our training formats</SectionTitle>
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
              <Subtitle noPadding reverse>
                {format.title}
              </Subtitle>
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
  </BlueBackground>
)

export default Approach
