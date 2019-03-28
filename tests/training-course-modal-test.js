import { Selector, ClientFunction } from 'testcafe'

const trainingPageUrl = 'http://localhost:8000/training'
const getWindowLocation = ClientFunction(() => window.location)

fixture`Training course modal`.page`${trainingPageUrl}`

test('should be accessible via a link on the training page', async t => {
  const firstModalLink = Selector('a[data-testid^="modal"]').nth(0)

  const coursePathName = await firstModalLink
    .getAttribute('data-testid')
    .then(data =>
      data
        .split('/')
        .slice(1)
        .join('/')
    )

  await t.click(firstModalLink)

  const location = await getWindowLocation()

  await t.expect(location.href).eql(`${trainingPageUrl}/${coursePathName}`)
})
