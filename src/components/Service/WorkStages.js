import React, { Fragment } from 'react';
import { Padding } from 'styled-components-spacing';
import { Grid } from '../grid';

import Hr from '../Common/Hr';
import WorkStage from './WorkStage';

const WorkStages = ({ workStages }) => (
  <Fragment>
    <Padding vertical={{ smallPhone: 1.5, tablet: 3 }}>
      {workStages.map((workStage, index) => {
        return (
          <Grid key={workStage.id}>
            <WorkStage workStage={workStage} />
            {index !== workStages.length - 1 && <Hr muted />}
          </Grid>
        );
      })}
    </Padding>
  </Fragment>
);

export default WorkStages;
