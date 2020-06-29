import React from 'react';
import { capitalize } from 'lodash';
import StyledHeaderLink from './StyledHeaderLink';

const ServiceLink = ({ service, color }) => {
  return (
    <StyledHeaderLink to={`/${service}`} title={service} color={color}>
      {capitalize(service.replace(/-/g, ' '))}
    </StyledHeaderLink>
  );
};

export default ServiceLink;
