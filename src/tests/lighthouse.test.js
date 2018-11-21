const serve = require('./createServer.js')

jest.setTimeout(60000)

test('Mobile', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    expect(audits['viewport'].rawValue).toBeTruthy()
    expect(audits['font-size'].rawValue).toBeTruthy()
  })
})

test('A11y', () => {
  return serve(`http://localhost:3000`).then(({ lhr: { audits } }) => {
    expect(audits['image-alt'].rawValue).toBeTruthy()
    expect(audits['input-image-alt'].rawValue).toBeTruthy()
    expect(audits['label'].rawValue).toBeTruthy()
    expect(audits['link-name'].rawValue).toBeTruthy()
    expect(audits['list'].rawValue).toBeTruthy()
    expect(audits['tabindex'].rawValue).toBeTruthy()

    // expect(audits['focus-traps'].rawValue).toBeTruthy()
    // expect(audits['focusable-controls'].rawValue).toBeTruthy()
    // expect(audits['heading-levels'].rawValue).toBeTruthy()
    // expect(audits['logical-tab-order'].rawValue).toBeTruthy()
    // expect(audits['offscreen-content-hidden'].rawValue).toBeTruthy()
    // expect(audits['color-contrast'].rawValue).toBeTruthy()
  })
})
