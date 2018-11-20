import React, { Fragment } from 'react'
import { Row, Col, Grid } from 'react-styled-flexboxgrid'
import { Padding } from 'styled-components-spacing'
import { Graphic, How } from './elements'
import Image from '../../Common/Image'
import WorkStageAlternatives from './alternatives'

const WorkStages = ({ title, workStages, image }) => (
  <Fragment>
    <Grid className="grid">
      <Row style={{ position: 'relative' }}>
        <Col xs={12}>
          <Padding top={4} bottom={6}>
            <Graphic>
              <Image image={image} />
            </Graphic>
            <Padding top={1} />
            <How reverse center noTop>
              {title}
            </How>
          </Padding>
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
          <Grid className="grid">
            <hr />
          </Grid>
        )}
      </Fragment>
    ))}
  </Fragment>
)

export default WorkStages
