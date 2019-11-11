import React from 'react';
import { Link } from 'gatsby';
import ExternalAnchor from './ExternalAnchor';

const Anchor = ({ to, href, activeClassName, ...props }) => {
  if (to != null) {
    return <Link to={to} activeClassName={activeClassName} {...props} />;
  } else {
    return <ExternalAnchor href={href} {...props} />;
  }
};

export default Anchor;
