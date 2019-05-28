import { ClientFunction } from 'testcafe'

const hostname = `localhost`
const port = 3002
const baseUrl = `${hostname}:${port}`
const getWindowLocation = ClientFunction(() => window.location)

export { port, baseUrl, getWindowLocation }
