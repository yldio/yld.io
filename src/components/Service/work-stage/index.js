import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import styled from 'styled-components'
import breakpoint from 'styled-components-breakpoint'

import { Grid, Row, Col } from '../../grid'
import { Graphic, How } from './elements'
import Hr from '../../Common/Hr'
import Image from '../../Common/Image'
import WorkStageAlternatives from './alternatives'

const HowGrid = styled(Grid)`
  margin-bottom: 0;
  ${breakpoint('smallTablet')`margin-bottom: -10%;`}

  ${breakpoint('tablet')`margin-bottom: 0;`}
`
const WorkStages = ({ title, workStages, image }) => (
  <Fragment>
    <HowGrid>
      <Row style={{ position: 'relative' }}>
        <Col width={[1]}>
          <Graphic>
            <Image image={image} />
          </Graphic>
          <How reverse>{title}</How>
        </Col>
      </Row>
    </HowGrid>
    <Padding vertical={{ smallPhone: 1.5, tablet: 3 }}>
      {workStages.map((workStage, index, arr) => (
        <Fragment key={workStage.id}>
          <WorkStageAlternatives workStage={workStage} />
          {index !== arr.length - 1 && (
            <Grid>
              <Hr muted />
            </Grid>
          )}
        </Fragment>
      ))}
    </Padding>
  </Fragment>
)

export default WorkStages
