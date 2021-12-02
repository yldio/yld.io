import React, { Fragment } from 'react';
import generate from 'shortid';
import styled from 'styled-components';

import { Grid } from '../grid';
import GreyBackground from '../Common/GreyBackground';
import BlueBackground from '../Common/BlueBackground';

import Group from './Group';
import Join from './Join';

const StyledGrid = styled(Grid)`
  padding-bottom: ${({ theme, isLastGroupWithoutJoins }) =>
    isLastGroupWithoutJoins ? theme.space[7] : null};
`;

const Discipline = ({ groups, joins = [] }) => {
  return (
    groups &&
    groups.length &&
    groups.map((group, idx, groupArr) => {
      const { levels = [] } = group;
      const hasJoins = joins && joins[idx];
      const isLastGroupWithoutJoins = !hasJoins && idx + 1 === groupArr.length;
      const orderStartFrom = idx * levels.length + 1;

      return (
        <Fragment key={generate()}>
          <GreyBackground>
            <StyledGrid isLastGroupWithoutJoins={isLastGroupWithoutJoins}>
              <Group
                {...group}
                isLastGroup={isLastGroupWithoutJoins}
                orderStartFrom={orderStartFrom}
              />
            </StyledGrid>
          </GreyBackground>
          {hasJoins && (
            <BlueBackground>
              <Join {...joins[idx]} />
            </BlueBackground>
          )}
        </Fragment>
      );
    })
  );
};

export default Discipline;
