import React from 'react';
import { Padding } from 'styled-components-spacing/dist/cjs/Padding';

import { Section, Separator } from './elements';
import TitleAndList from '../Common/TitleAndList';

const OpenSource = ({ data: { title, list } }) => (
  <Section greyBg>
    <TitleAndList title={title} list={list} />
    <Separator />
    {/* <Padding bottom={{ smallPhone: 0.5, tablet: 1.5 }}>
      <TitleAndBody title={subtitle} body={text} />
    </Padding> */}
    {/* <VideoGrid data={featuredTalks} /> */}
    <Padding bottom={{ smallPhone: 3.5, tablet: 5 }} />
  </Section>
);

export default OpenSource;
