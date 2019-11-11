import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Padding } from 'styled-components-spacing';

import { Row, Col } from '../grid';
import { Label, Checkbox } from '../Common/Forms';

export const CheckBoxesContainer = styled(Col)`
  display: flex;
  flex-flow: row wrap;
  margin-bottom: ${remcalc(36)};

  /* Since these columns are inside a column,
     we have to reset the padding on the edges */
  > * {
    display: flex;
    align-items: center;
    margin-bottom: ${remcalc(24)};

    &:nth-child(odd) {
      padding-left: 0;
    }

    &:nth-child(even) {
      padding-right: 0;
    }
  }
`;

const AreasOfInterest = ({ title, interests, onChange }) => (
  <section>
    <Row>
      <Col width={[1, 1, 1, 1, 8 / 12, 7 / 12]}>
        <Padding bottom={1}>
          <Label>{title}</Label>
        </Padding>
      </Col>
    </Row>
    <Row>
      <CheckBoxesContainer width={[1, 1, 1, 1, 10 / 12, 8 / 12]}>
        {interests.map((interest, idx) => {
          const { name, label, branch } = interest;
          return (
            <Col width={[1, 1, 1, 1, 6 / 12]} key={idx}>
              <Checkbox
                type="checkbox"
                id={name}
                name={name}
                onChange={e => onChange(e, branch)}
              />
              <label htmlFor={name}>{label}</label>
            </Col>
          );
        })}
      </CheckBoxesContainer>
    </Row>
  </section>
);

export default AreasOfInterest;
