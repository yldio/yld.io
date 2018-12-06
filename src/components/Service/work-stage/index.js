import React, { Fragment } from 'react'
import { Grid, Row, Col } from '../../grid'
import { Padding } from 'styled-components-spacing'
import { Graphic, How } from './elements'
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
        {index === 0 ? <Padding top={1.5} /> : null}
        <Padding top={index === 0 ? 5 : 6} bottom={5}>
          <WorkStageAlternatives workStage={workStage} />
        </Padding>
        {index !== arr.length - 1 && (
          <Grid>
            <hr />
          </Grid>
        )}
      </Fragment>
    ))}
  </Fragment>
)

export default WorkStages
