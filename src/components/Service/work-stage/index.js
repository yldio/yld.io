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
          <How reverse center>
            {title}
          </How>
        </Col>
      </Row>
    </HowGrid>
    {workStages.map((workStage, index, arr) => (
      <Fragment key={workStage.id}>
        <Padding
          top={{
            smallPhone: index === 0 ? 0 : 3,
            smallTablet: index === 0 ? 5 : 3,
            tablet: index === 0 ? 3.5 : 4
          }}
          bottom={{
            smallTablet:
              workStage.displayType === 'Grid' ? 0 : index === 0 ? 3 : 4,
            tablet: workStage.displayType === 'Grid' ? 0 : index === 0 ? 4 : 5
          }}
        >
          <WorkStageAlternatives workStage={workStage} />
        </Padding>
        {index !== arr.length - 1 && (
          <Grid>
            <Hr muted />
          </Grid>
        )}
      </Fragment>
    ))}
  </Fragment>
)

export default WorkStages
