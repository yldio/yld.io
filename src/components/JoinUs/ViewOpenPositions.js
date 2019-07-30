import React from 'react'
import remcalc from 'remcalc'
import styled from 'styled-components'
import { Padding } from 'styled-components-spacing'
import { Grid, Row, Col } from '../grid'
import { SectionTitle, BodyPrimary } from '../Typography'
import { FakeLink } from '../Common/StyledLink'

const FixedWidthBodyPrimary = styled(BodyPrimary)`
  max-width: ${remcalc(525)};
`

/**
 * This component needs to be a class to avoid
 * React shouting at us because functional components
 * are not allowed to have refs. The ref here is used
 * by the scrollTo module we are using within `<JoinUs/>`
 *
 */
class ViewPositions extends React.Component {
  render() {
    const { text, description, scrollToVacancies } = this.props
    return (
      <Grid>
        <Padding
          top={{ smallPhone: 4, smallTablet: 3, tablet: 4 }}
          bottom={{ smallPhone: 3.5, desktop: 5 }}
        >
          <Row>
            <Col width={[1, 1, 1, 1, 8 / 12]}>
              <Padding bottom={{ smallPhone: 2, tablet: 3 }}>
                <SectionTitle as="h1">{text}</SectionTitle>
                {description && (
                  <Padding top={1}>
                    <FixedWidthBodyPrimary muted>
                      {description}
                    </FixedWidthBodyPrimary>
                  </Padding>
                )}
              </Padding>
              <FakeLink onClick={() => scrollToVacancies()}>
                All job opportunities
              </FakeLink>
            </Col>
          </Row>
        </Padding>
      </Grid>
    )
  }
}

export default ViewPositions
