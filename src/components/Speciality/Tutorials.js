import React from 'react';
import { Padding } from 'styled-components-spacing';

import GreyBackground from '../Common/GreyBackground';
import { Grid } from '../grid';
import TitleAndMediaList from '../Common/TitleAndMediaList';

const TutorialsSection = ({ speciality, tutorials }) => {
  const mediaItems = tutorials
    .slice(0, 3)
    .map(({ id, title, link, additionalInfo }) => ({
      id,
      title,
      href: link,
      body: additionalInfo,
    }));

  return (
    <GreyBackground>
      <Grid>
        <Padding vertical={{ desktop: 5, smallPhone: 3.5 }}>
          <TitleAndMediaList
            title="Tutorials"
            description={`${speciality} tutorials created by members of YLD for the community.`}
            mediaItems={mediaItems}
            CTALink="http://nodetuts.com/"
            CTAText="More tutorials"
          />
        </Padding>
      </Grid>
    </GreyBackground>
  );
};

export default TutorialsSection;
