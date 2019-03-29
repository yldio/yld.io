import { Selector, ClientFunction } from 'testcafe'
require('dotenv').config()

const { GATSBY_ENVIRONMENT } = process.env

const baseUrl =
  GATSBY_ENVIRONMENT === 'preview'
    ? process.env.DEPLOY_PRIME_URL
    : process.env.BASE_URL

const trainingPageUrl = `${baseUrl}/training`
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

  await t.expect(location.href).contains(`${trainingPageUrl}/${coursePathName}`)
})
