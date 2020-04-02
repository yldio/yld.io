import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';
import { capitalize } from 'lodash';
import InternalAnchor from '../../../components/Common/InternalAnchor';

const StyledServiceLink = styled(InternalAnchor)`
  font-size: ${remcalc(26)};
  margin-left: ${remcalc(12)};
  color: ${props => props.color};

  ${breakpoint('header')`
    font-size: ${remcalc(30)};
  `}

  &:hover {
    text-decoration: underline;
    color: ${props => props.color};
  }
`;

const ServiceLink = ({ service, color }) => {
  return (
    <StyledServiceLink to={`/${service}`} title={service} color={color}>
      {capitalize(service.replace(/-/g, ' '))}
    </StyledServiceLink>
  );
};

export default ServiceLink;
