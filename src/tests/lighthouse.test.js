const serve = require('./createServer.js')

jest.setTimeout(60000)

const auditTest = (audits, name, type, number) => {
  if (type === 'value') {
    return expect(audits[name].rawValue).toBeTruthy()
  }

  if (type === 'smaller') {
    return expect(audits[name].rawValue).toBeLessThanOrEqual(number)
  }

  if (type === 'bigger') {
    return expect(audits[name].rawValue).toBeGreaterThanOrEqual(number)
  }

  if (type === 'size') {
    return expect(audits[name].details.items.length).toBeLessThanOrEqual(number)
  }

  return expect(audits[name].details.items).toEqual([])
}

test('Mobile Homepage', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    // https://developers.google.com/web/tools/lighthouse/audits/has-viewport-meta-tag
    auditTest(audits, 'viewport', 'value')
    // https://developers.google.com/web/tools/lighthouse/audits/font-sizes
    auditTest(audits, 'font-size', 'value')
  })
})

test('SEO', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    auditTest(audits, 'meta-description', 'value')
    auditTest(audits, 'document-title', 'value')
    auditTest(audits, 'http-status-code', 'value')
    auditTest(audits, 'is-crawlable', 'value')
    auditTest(audits, 'robots-txt', 'value')
    // https://developers.google.com/web/tools/lighthouse/audits/hreflang
    auditTest(audits, 'hreflang')
  })
})

test('Security', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    // https://developers.google.com/web/tools/lighthouse/audits/vulnerabilities
    auditTest(audits, 'no-vulnerable-libraries')
    // (https://www.chromestatus.com/features#deprecated
    auditTest(audits, 'deprecations')
    // https://developers.google.com/web/tools/lighthouse/audits/noopener
    auditTest(audits, 'external-anchors-use-rel-noopener', 'size', 1)
  })
})

test('Performance', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    auditTest(audits, 'dom-size', 'smaller', 500)
    auditTest(audits, 'network-requests', 'smaller', 65)
    auditTest(audits, 'network-requests', 'smaller', 65)
    auditTest(audits, 'bootup-time', 'smaller', 1333) //  0.89
    auditTest(audits, 'interactive', 'smaller', 7788) //  0.45
    auditTest(audits, 'speed-index', 'smaller', 4582) //  0.71
    auditTest(audits, 'first-contentful-paint', 'smaller', 3735) //  0.56
    auditTest(audits, 'first-meaningful-paint', 'smaller', 3885) //  0.53
    // https://developers.google.com/web/tools/lighthouse/audits/preload
    auditTest(audits, 'uses-rel-preload')
    // https://developers.google.com/web/tools/lighthouse/audits/blocking-resources
    auditTest(audits, 'render-blocking-resources')
    // https://developers.google.com/web/tools/lighthouse/audits/minify-css
    auditTest(audits, 'unminified-css')
    // https://developers.google.com/speed/docs/insights/MinifyResources
    auditTest(audits, 'unminified-javascript')
    // https://developers.google.com/web/tools/lighthouse/audits/optimize-images
    auditTest(audits, 'uses-optimized-images')
    // https://developers.google.com/web/tools/lighthouse/audits/oversized-images
    auditTest(audits, 'uses-responsive-images')
    // https://developers.google.com/web/updates/2016/02/font-display
    auditTest(audits, 'font-display')
    // https://developers.google.com/web/tools/lighthouse/audits/redirects
    auditTest(audits, 'redirects')
    // https://developers.google.com/web/tools/lighthouse/audits/aspect-ratio
    auditTest(audits, 'image-aspect-ratio')
    // https://developers.google.com/web/tools/lighthouse/audits/offscreen-images
    auditTest(audits, 'offscreen-images', 'size', 1)
    // https://developers.google.com/web/tools/lighthouse/audits/unused-css-rules
    auditTest(audits, 'unused-css-rules', 'size', 1)
  })
})

test('A11y Homepage', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    // https://dequeuniversity.com/rules/axe/2.2/image-alt?application=lighthouse
    auditTest(audits, 'image-alt')
    // https://dequeuniversity.com/rules/axe/2.2/input-image-alt?application=lighthouse
    auditTest(audits, 'input-image-alt', 'value')
    // https://dequeuniversity.com/rules/axe/2.2/label?application=lighthouse
    auditTest(audits, 'label', 'value')
    // https://dequeuniversity.com/rules/axe/2.2/link-name?application=lighthouse
    auditTest(audits, 'link-name')
    // https://dequeuniversity.com/rules/axe/2.2/list?application=lighthouse
    auditTest(audits, 'list')
    // https://dequeuniversity.com/rules/axe/2.2/meta-viewport?application=lighthouse
    auditTest(audits, 'meta-viewport')
    // https://dequeuniversity.com/rules/axe/2.2/tabindex?application=lighthouse
    auditTest(audits, 'tabindex')
    // https://dequeuniversity.com/rules/axe/2.2/html-lang?application=lighthouse
    auditTest(audits, 'html-has-lang', 'value')
    // https://dequeuniversity.com/rules/axe/2.2/valid-lang?application=lighthouse
    auditTest(audits, 'html-lang-valid', 'value')
    // https://dequeuniversity.com/rules/axe/2.2/bypass?application=lighthouse
    auditTest(audits, 'bypass', 'value')
    // https://dequeuniversity.com/rules/axe/2.2/button-name?application=lighthouse
    auditTest(audits, 'button-name')
    // https://dequeuniversity.com/rules/axe/2.2/aria-valid-attr-value?application=lighthouse
    auditTest(audits, 'aria-valid-attr-value')
    // https://dequeuniversity.com/rules/axe/2.2/aria-valid-attr?application=lighthouse
    auditTest(audits, 'aria-valid-attr')
    // https://dequeuniversity.com/rules/axe/2.2/aria-roles?application=lighthouse
    auditTest(audits, 'aria-roles')
    // https://dequeuniversity.com/rules/axe/2.2/aria-allowed-attr?application=lighthouse
    auditTest(audits, 'aria-allowed-attr')

    // https://dequeuniversity.com/rules/axe/2.2/color-contrast?application=lighthouse
    // auditTest(audits,'color-contrast')
  })
})
