import React from 'react';
import { Link } from 'gatsby';
import ExternalAnchor from './ExternalAnchor';

const Anchor = ({ to, href, currentClassName, ...props }) => {
  if (to != null) {
    return <Link to={to} activeClassName={currentClassName} {...props} />;
  } else {
    return <ExternalAnchor href={href} {...props} />;
  }
};

export default Anchor;
