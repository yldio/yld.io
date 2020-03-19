import React, { useState } from 'react';
import { Padding } from 'styled-components-spacing';

import { Row, Col, Grid } from '../grid';
import { SectionTitle } from '../Typography';
import Tab, { Tabs } from '../Common/Tab';
import GreyBackground from '../Common/GreyBackground';
import StaffCard from './StaffCard';
import eventLabels from '../../utils/eventLabels';

const Team = ({ members }) => {
  return (
    <Padding top={{ smallPhone: 3, tablet: 4 }}>
      <Row>
        {(members || []).map(
          ({ name, description, role, image, socialLinks }, idx) => (
            <StaffCard
              key={`staff-${name}-${idx}`}
              name={name}
              description={description.description}
              role={role}
              image={image}
              socialLinks={socialLinks}
              dataTestId={`staff-card-${idx}`}
            />
          ),
        )}
      </Row>
    </Padding>
  );
};

const Teams = ({ title, teams }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const currentTeam = teams[currentTab];

  return (
    <GreyBackground>
      <Grid>
        <Padding
          top={{ smallPhone: 3, tablet: 4 }}
          bottom={{ smallPhone: 1.5, smallTablet: 0 }}
        >
          <Padding bottom={2}>
            <SectionTitle>{title}</SectionTitle>
          </Padding>
          <Row>
            <Col width={1}>
              <Tabs>
                {(teams || []).map((team, idx) => (
                  <Tab
                    key={idx}
                    current={currentTab === idx}
                    data-event={`${
                      eventLabels.aboutTeam
                    }-${team.name.toLowerCase()}`}
                    onClick={() => setCurrentTab(idx)}
                  >
                    {team.name}
                  </Tab>
                ))}
              </Tabs>
            </Col>
            <Col />
          </Row>
          <Team members={currentTeam.members} />
        </Padding>
      </Grid>
    </GreyBackground>
  );
};

export default Teams;
