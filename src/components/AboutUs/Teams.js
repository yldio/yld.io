import React, { useState } from 'react'
import { Padding } from 'styled-components-spacing'

import { Row, Col, Grid } from '../grid'
import { SectionTitle } from '../Typography'
import Tab, { Tabs } from '../Common/Tab'
import GreyBG from '../GreyBG'
import StaffCard from './StaffCard'

const Team = ({ data }) => {
  if (!data) {
    return null
  }

  const { members, name: teamName } = data

  return (
    <Padding top={{ smallPhone: 3, tablet: 4 }}>
      <Row>
        {(members || []).map(
          ({ name, description, role, image, socialLinks }, idx) => (
            <StaffCard
              key={`staff-${teamName}-${idx}`}
              name={name}
              description={description.description}
              role={role}
              image={image}
              socialLinks={socialLinks}
            />
          )
        )}
      </Row>
    </Padding>
  )
}

const Teams = ({ title, teams }) => {
  const [currentTab, setCurrentTab] = useState(0)
  const currentTeam = teams[currentTab]

  return (
    <GreyBG>
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
                    active={currentTab === idx}
                    onClick={() => setCurrentTab(idx)}
                  >
                    {team.name}
                  </Tab>
                ))}
              </Tabs>
            </Col>
            <Col />
          </Row>
          <Team data={currentTeam} />
        </Padding>
      </Grid>
    </GreyBG>
  )
}

export default Teams
