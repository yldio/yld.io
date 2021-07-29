const { LHCI_SERVER_BASE_URL, LHCI_SERVER_TOKEN, GITHUB_TOKEN } = process.env;
// const { sync: Globby } = require('globby');
// const { join } = require('path');

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      isSinglePageApplication: true,
      staticDistDir: './public',
      // url: Globby(['**/*/*.html', '*.html'], { cwd: join(__dirname, 'public') })
      //   .filter((p) => !/^blog\//.test(p))
      //   .map((p) => p.replace(/\/index\.html$/, '').replace(/\.html$/, ''))
      //   .map((p) => `http://localhost/${p}`),
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: LHCI_SERVER_BASE_URL,
      token: LHCI_SERVER_TOKEN,
      githubToken: GITHUB_TOKEN,
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};
