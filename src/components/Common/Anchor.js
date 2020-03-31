import React from 'react';
import InternalAnchor from './InternalAnchor';
import ExternalAnchor from './ExternalAnchor';

const Anchor = ({ to, href, currentClassName, ...props }) => {
  if (to != null) {
    return (
      <InternalAnchor to={to} activeClassName={currentClassName} {...props} />
    );
  } else {
    return <ExternalAnchor href={href} {...props} />;
  }
};

export default Anchor;
