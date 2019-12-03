import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { sync as mkdirpSync } from 'mkdirp';
import prettyFormat from 'pretty-format';

import launchChromeAndRunLighthouse from './run';
import mergeLighthouseResults from './merge';

const numRuns = 5;
jest.setTimeout(3 * 60 * 1000);

const resultDir = resolve(__dirname, 'artifacts');
let result;

beforeAll(async () => {
  const results = [];
  mkdirpSync(resultDir);

  for (let i = 0; i < numRuns; i++) {
    const { lhr } = await launchChromeAndRunLighthouse();
    results.push(lhr);
    writeFileSync(resolve(resultDir, `result-${i}.json`), JSON.stringify(lhr));
    writeFileSync(resolve(resultDir, `result-${i}.txt`), prettyFormat(lhr));
  }
  result = mergeLighthouseResults(results);

  writeFileSync(resolve(resultDir, 'result.json'), JSON.stringify(result));
  writeFileSync(resolve(resultDir, 'result.txt'), prettyFormat(result));
});

const deleteAudit = name => {
  expect(result.audits).toHaveProperty(name);
  delete result.audits[name];
};

// Audits with informative/manual/notApplicable scores, as well as the audits listed here, are ignored.
// This is done explicitly so that any new audits after an update must be dealt with.
// Also, if audits become applicable due to changes to the site, they must be dealt with.
const ignoredAudits = [
  // not meaningful with a local server
  'time-to-first-byte',
  'uses-long-cache-ttl',
  // binary not passing yet
  'color-contrast',
  'listitem',
  'link-text',
  'tap-targets',
];
afterAll(() => {
  Object.values(result.audits)
    .filter(({ scoreDisplayMode }) =>
      ['informative', 'manual', 'notApplicable'].includes(scoreDisplayMode),
    )
    .map(({ id }) => id)
    .forEach(deleteAudit);
  ignoredAudits.forEach(deleteAudit);
  expect(result.audits).toEqual({}); // all audits should have been checked or explicitly ignored
});

// if the audit is commented out, we eventually want to make it pass
test.each([
  'viewport',
  'font-display',
  'third-party-summary',
  'aria-allowed-attr',
  'aria-required-attr',
  'aria-required-children',
  'aria-required-parent',
  'aria-roles',
  'aria-valid-attr-value',
  'aria-valid-attr',
  'button-name',
  'bypass',
  // 'color-contrast',
  'document-title',
  'duplicate-id',
  'html-has-lang',
  'html-lang-valid',
  'image-alt',
  'link-name',
  'list',
  //'listitem',
  'meta-viewport',
  'tabindex',
  'meta-description',
  'http-status-code',
  'font-size',
  //'link-text',
  'is-crawlable',
  'robots-txt',
  //'tap-targets',
  'hreflang',
  'plugins',
])('binary audit %s passes', name => {
  const audit = result.audits[name];
  deleteAudit(name);
  expect(audit.scoreDisplayMode).toBe('binary');
  expect(audit.score).toBe(1);
});

// if the minScore is a - b, we eventually want to achieve a
test.each`
  name                            | minScore
  ${'speed-index'}                | ${0.9}
  ${'redirects'}                  | ${1}
  ${'uses-rel-preload'}           | ${1}
  ${'uses-rel-preconnect'}        | ${1 - 0.3}
  ${'total-byte-weight'}          | ${1}
  ${'offscreen-images'}           | ${0.5}
  ${'render-blocking-resources'}  | ${1}
  ${'unminified-css'}             | ${1}
  ${'unminified-javascript'}      | ${1}
  ${'unused-css-rules'}           | ${1}
  ${'uses-webp-images'}           | ${1 - 0.5}
  ${'uses-optimized-images'}      | ${1}
  ${'uses-text-compression'}      | ${1}
  ${'uses-responsive-images'}     | ${1}
  ${'efficient-animated-content'} | ${1}
  ${'dom-size'}                   | ${1 - 0.1}
`('numeric audit $name scores at least $minScore', ({ name, minScore }) => {
  const audit = result.audits[name];
  deleteAudit(name);
  expect(audit.scoreDisplayMode).toBe('numeric');
  expect(audit.score).toBeGreaterThanOrEqual(minScore);
});

// if the timeLimit is a + b, we eventually want to achieve a
test.each`
  name                           | timeLimit
  ${'first-contentful-paint'}    | ${2000}
  ${'first-meaningful-paint'}    | ${2000}
  ${'estimated-input-latency'}   | ${50 + 1950}
  ${'total-blocking-time'}       | ${250 + 4750}
  ${'max-potential-fid'}         | ${100 + 2900}
  ${'first-cpu-idle'}            | ${5000 + 7000}
  ${'interactive'}               | ${5000 + 10000}
  ${'mainthread-work-breakdown'} | ${5000 + 7000}
  ${'bootup-time'}               | ${5000 + 5000}
`('$name time is below $timeLimit ms', ({ name, timeLimit }) => {
  const audit = result.audits[name];
  deleteAudit(name);
  expect(audit.scoreDisplayMode).toBe('numeric');
  expect(audit.numericValue).toBeLessThan(timeLimit);
});
