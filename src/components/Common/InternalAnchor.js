import React from 'react';
import parseUrl from 'url-parse';
import { Link } from 'gatsby';

const InternalAnchor = ({ to, ...props }) => {
  const url = parseUrl(to, {});
  const { pathname } = url;
  if (!pathname.endsWith('/')) {
    url.set('pathname', pathname + '/');
  }

  return <Link to={url.toString()} {...props} />;
};

export default InternalAnchor;
