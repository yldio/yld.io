import React, { Fragment } from 'react'
import { Padding } from 'styled-components-spacing'
import { Grid } from '../../grid'

import Hr from '../../Common/Hr'
import BackgroundGraphic from '../../Common/BackgroundGraphic'
import WorkStageAlternatives from './alternatives'

const WorkStages = ({ title, workStages }) => (
  <Fragment>
    <BackgroundGraphic title={title} />
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
