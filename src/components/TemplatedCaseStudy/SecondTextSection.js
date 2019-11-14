import React, { Fragment } from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Margin } from 'styled-components-spacing';
import MarkdownRenderer from './MarkdownRenderer';

import { Row, Col } from '../grid';
import { SectionTitleStyles, BodyPrimary } from '../Typography';

const NonMobileRow = styled(Row)`
  display: none;

  ${breakpoint('smallTablet')`
    display: flex;
  `}
`;

const MobileOnlyRow = styled(Row)`
  ${breakpoint('smallTablet')`
    display: none;
  `}
`;

const LargeStatsValue = styled(BodyPrimary)`
  ${SectionTitleStyles}
`;

const Stats = ({ stats }) => (
  <Fragment>
    {stats.map(stat => (
      <Margin bottom={1} key={stat.id}>
        <LargeStatsValue>{stat.value}</LargeStatsValue>
        <BodyPrimary bold noPaddingTop>
          {stat.label}
        </BodyPrimary>
      </Margin>
    ))}
  </Fragment>
);

const SecondTextSection = ({ stats, source }) => (
  <Fragment>
    {stats ? (
      <Fragment>
        <NonMobileRow spaced>
          <Col width={[3 / 12]}>
            <Stats stats={stats} />
          </Col>
          <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
            <MarkdownRenderer source={source} />
          </Col>
        </NonMobileRow>
        <MobileOnlyRow>
          <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
            <MarkdownRenderer source={source} />
          </Col>
          <Col width={[1]}>
            <Stats stats={stats} />
          </Col>
        </MobileOnlyRow>
      </Fragment>
    ) : (
      <Row flexEnd>
        <Col width={[1, 1, 1, 1, 9 / 12, 7 / 12]}>
          <MarkdownRenderer source={source} />
        </Col>
      </Row>
    )}
  </Fragment>
);

export default SecondTextSection;
