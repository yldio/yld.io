import React, { Fragment } from 'react'
import generate from 'shortid'
import styled from 'styled-components'

import { Grid } from '../grid'
import GreyBackground from '../Common/GreyBackground'
import BlueBackground from '../Common/BlueBackground'

import Group from './Group'
import Join from './Join'

const Wrapper = styled.div`
  display: ${({ isActive }) => (isActive ? 'block' : ' none')};
`

const Discipline = ({ isActive, groups, joins = [] }) => {
  return (
    <Wrapper isActive={isActive}>
      {groups &&
        groups.length &&
        groups.map((group, idx) => (
          <Fragment key={generate()}>
            <GreyBackground>
              <Grid>
                <Group {...group} />
              </Grid>
            </GreyBackground>
            <BlueBackground>
              {joins && joins[idx] && <Join {...joins[idx]} />}
            </BlueBackground>
          </Fragment>
        ))}
    </Wrapper>
  )
}

export default Discipline
