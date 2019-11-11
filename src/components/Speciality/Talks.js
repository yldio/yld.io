import React from 'react';
import { Padding } from 'styled-components-spacing';

import BlueBackground from '../Common/BlueBackground';
import { Grid, Row, Col } from '../grid';
import { SectionTitle } from '../Typography';
import VideoSection from '../Common/VideoSection';
import CompactVideoLink from '../Common/CompactVideoLink';
import StyledLink from '../Common/StyledLink';
import theme from '../../utils/theme';

const TalksSection = ({ talks: allTalks }) => {
  const talks = allTalks.filter(({ featured, cta }) => !featured && !cta);
  const featured = allTalks.find(({ featured }) => featured);
  const cta = allTalks.find(({ cta }) => cta);

  return (
    talks &&
    talks.length > 0 && (
      <BlueBackground>
        <Grid>
          <Padding
            top={{ smallTablet: 3, tablet: 4 }}
            bottom={{ smallTablet: 3.5, tablet: 5 }}
          >
            <Row>
              <Col width={[1]}>
                <SectionTitle reverse>{`Talks`}</SectionTitle>
              </Col>
            </Row>
            {featured && (
              <Padding top={3}>
                <VideoSection src={featured.link} />
              </Padding>
            )}
            <Padding
              top={{ smallTablet: 4 }}
              bottom={{ smallTablet: 3, tablet: 4 }}
            >
              <Row>
                {talks.map(({ title, link, id }) => (
                  <CompactVideoLink
                    href={link}
                    key={id}
                    themeVariation={theme.variations.dark}
                  >
                    {title}
                  </CompactVideoLink>
                ))}
              </Row>
            </Padding>
            {cta && (
              <Row>
                <Col width={[1]}>
                  <StyledLink reverse="true" href={cta.link} external>
                    {cta.title}
                  </StyledLink>
                </Col>
              </Row>
            )}
          </Padding>
        </Grid>
      </BlueBackground>
    )
  );
};

export default TalksSection;
