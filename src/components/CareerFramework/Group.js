import React, { Fragment } from 'react';
import generate from 'shortid';
import styled from 'styled-components';

import CommonHr from '../Common/Hr';

import Level from './Level';

const HrWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[4]};
`;

const Group = ({ levels, orderStartFrom }) =>
  levels &&
  levels.length &&
  levels.map((level, idx, arr) => (
    <Fragment key={generate()}>
      <Level {...level} first={idx === 0} order={orderStartFrom + idx} />
      {idx < arr.length - 1 && (
        <HrWrapper>
          <CommonHr />
        </HrWrapper>
      )}
    </Fragment>
  ));

export default Group;
