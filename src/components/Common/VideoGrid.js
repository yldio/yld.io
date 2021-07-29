import React from 'react';

import { Row } from '../grid';
import StandaloneVideoLink from '../Common/StandaloneVideoLink';

const MAX_VIDEOS = 3;

const VideoGrid = ({ data, themeVariation }) => (
  <Row>
    {data.slice(0, MAX_VIDEOS).map(({ title, link }, idx) => (
      <StandaloneVideoLink
        key={idx}
        href={link}
        themeVariation={themeVariation}
      >
        {title}
      </StandaloneVideoLink>
    ))}
  </Row>
);

export default VideoGrid;
