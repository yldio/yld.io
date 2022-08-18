import React from 'react';
import { Padding } from 'styled-components-spacing';

import { Grid } from '../grid';
import { SectionTitle } from '../Typography';
import GreyBackground from '../Common/GreyBackground';
import LogoGrid from '../Common/LogoGrid';

const Partners = ({ title, partners }) => (
  <GreyBackground>
    <Grid>
      <Padding
        top={{ smallPhone: 3, tablet: 4 }}
        bottom={{ smallPhone: 3.5, tablet: 5 }}
      >
        <Padding bottom={{ smallPhone: 3, tablet: 4 }}>
          <SectionTitle>{title}</SectionTitle>
        </Padding>
        <LogoGrid companies={partners} />
      </Padding>
    </Grid>
  </GreyBackground>
);

export default Partners;
