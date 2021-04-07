import React from 'react';
import PropTypes from 'prop-types';
import googleFonts from './utils/googleFonts';

const HTML = ({
  htmlAttributes,
  headComponents,
  preBodyComponents,
  bodyAttributes,
  postBodyComponents,
  body,
}) => {
  return (
    <html lang="en" {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script
          async
          defer
          type="text/javascript"
          id="hs-script-loader"
          src="//js-na1.hs-scripts.com/19658504.js"
        />
        {googleFonts}
        {headComponents}
      </head>
      <body {...bodyAttributes}>
        {preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
      </body>
    </html>
  );
};

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};

export default HTML;
