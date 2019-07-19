import React, { Fragment } from 'react'
import generate from 'shortid'

import Hr from '../Common/Hr'

import Level from './Level'

const Group = ({ levels }) =>
  levels &&
  levels.length &&
  levels.map((level, idx, arr) => (
    <Fragment key={generate()}>
      <Level {...level} first={idx === 0} order={idx + 1} />
      {idx < arr.length - 1 && <Hr />}
    </Fragment>
  ))

export default Group
