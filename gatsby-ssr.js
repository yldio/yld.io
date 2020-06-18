const React = require('react');
const Helmet = require('react-helmet');
// const Head = require('./src/components/Common/Head');

exports.wrapPageElement = ({ element, props: { location } }) => {
  return (
    <>
      <Helmet
        link={[
          {
            rel: 'canonical',
            href: location.href,
            key: location.href,
          },
        ]}
      />
      {element}
    </>
  );
};
