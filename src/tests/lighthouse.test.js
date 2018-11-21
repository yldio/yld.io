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
    // https://developers.google.com/web/tools/lighthouse/audits/vulnerabilitie
    auditTest(audits, 'no-vulnerable-libraries')
  })
})

test('Performance', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    auditTest(audits, 'dom-size', 'smaller', 500)
    auditTest(audits, 'network-requests', 'smaller', 65)
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

    // https://developers.google.com/web/fundamentals/accessibility/how-to-review#start_with_the_keyboard
    // auditTest(audits, 'focus-traps', 'value')
    // https://developers.google.com/web/fundamentals/accessibility/how-to-review#start_with_the_keyboard
    // auditTest(audits, 'focusable-controls', 'value')
    // https://developers.google.com/web/fundamentals/accessibility/how-to-review#take_advantage_of_headings_and_landmarks
    // auditTest(audits, 'heading-levels', 'value')
    // https://developers.google.com/web/fundamentals/accessibility/how-to-review#start_with_the_keyboard
    // auditTest(audits, 'logical-tab-order', 'value')
    // https://developers.google.com/web/fundamentals/accessibility/how-to-review#try_it_with_a_screen_reader
    // auditTest(audits, 'offscreen-content-hidden', 'value')
    // https://dequeuniversity.com/rules/axe/2.2/color-contrast?application=lighthouse
    // auditTest(audits,'color-contrast')
  })
})
