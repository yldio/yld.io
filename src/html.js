import React from 'react';
import PropTypes from 'prop-types';

const Preconnect = ({ origin }) => (
  <>
    <link
      rel="preconnect"
      crossOrigin={
        new URL(origin).protocol === 'https:' ? 'use-credentials' : 'anonymous'
      }
      href={origin}
    />
    <link rel="dns-prefetch" href={origin} />
  </>
);
const preconnectLinks = (process.env.NODE_ENV === 'production'
  ? // Some of these might not be stable,
    // but Lighthouse failures should tell us once new ones need to be added
    // and then we can also check for outdated ones
    [
      'https://www.google-analytics.com',

      'https://www.linkedin.com',
      'https://px.ads.linkedin.com',
      'https://snap.licdn.com',

      'https://t.co',
      'http://t.co',
      'https://analytics.twitter.com',
      'http://static.ads-twitter.com',

      'https://www.googletagmanager.com',
      'http://rum-static.pingdom.net',
      'http://rum-collector-2.pingdom.net',
      'https://api1.websuccess-data.com',
      'https://7ixtke6ehh.execute-api.us-east-1.amazonaws.com',
    ]
  : []
).map(origin => <Preconnect key={origin} origin={origin} />);

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
        {preconnectLinks}
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
