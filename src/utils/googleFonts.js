import React from 'react';

const fonts = ['Pt+Mono', 'Roboto:400,500,700', 'Roboto+Mono:400'].join('|');

const GoogleFonts = (
  <>
    <link
      crossOrigin="true"
      rel="preconnect"
      href="https://fonts.gstatic.com/"
    />
    <link
      crossOrigin="true"
      rel="prefetch"
      as="font"
      href={`https://fonts.googleapis.com/css?family=${fonts}&display=swap`}
    />
  </>
);

export default GoogleFonts;
