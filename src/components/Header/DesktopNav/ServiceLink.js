import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import remcalc from 'remcalc';
import { capitalize } from 'lodash';

const StyledServiceLink = styled(Link)`
  font-size: ${remcalc(26)};
  margin-left: ${remcalc(12)};
  color: ${props => props.theme.colors[props.color]};

  ${breakpoint('header')`
    font-size: ${remcalc(30)};
  `}

  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colors[props.color]};
  }
`;

const ServiceLink = ({ service, isServicePage, isSpecialityPage }) => {
  return (
    (isServicePage || isSpecialityPage) && (
      <StyledServiceLink
        to={`/${service}`}
        title={service}
        color={isServicePage ? 'text' : 'white'}
      >
        {capitalize(service.replace(/-/g, ' '))}
      </StyledServiceLink>
    )
  );
};

export default ServiceLink;
