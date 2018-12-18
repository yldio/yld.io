import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'

import { Grid, Row, Col } from '../../grid'
import { Graphic, How, Hr } from './elements'
import Image from '../../Common/Image'
import WorkStageAlternatives from './alternatives'

const WorkStages = ({ title, workStages, image }) => (
  <Fragment>
    <Grid>
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
    </Grid>
    {workStages.map((workStage, index, arr) => (
      <Fragment key={workStage.id}>
        <Padding
          top={index === 0 ? 3.5 : 4}
          bottom={workStage.displayType === 'Grid' ? 0 : index === 0 ? 4 : 5}
        >
          <WorkStageAlternatives workStage={workStage} />
        </Padding>
        {index !== arr.length - 1 && (
          <Grid>
            <Hr />
          </Grid>
        )}
      </Fragment>
    ))}
  </Fragment>
)

export default WorkStages
