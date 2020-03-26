import { Selector } from 'testcafe';
import until from 'async-wait-until';

import createServer from '../createServer';
import { port, baseUrl, getWindowLocation } from './helper';

require('dotenv').config();
let server;

fixture`Top Nav Menu`.page`${baseUrl}`
  .before(async () => {
    server = await createServer(port);
  })
  .after(() => server.close());

test('we are on the homepage', async t => {
  const location = await getWindowLocation();
  await t
    .resizeWindow(1280, 720)
    .expect(location.href)
    .contains(baseUrl);
});

test('a dropdown dropdownContainer opens on desktop and redirects correctly', async t => {
  const services = Selector('li').withText('Services');
  await t.expect(services.exists).ok({ timeout: 5000 });

  const engineeringSubItem = Selector('li[class^="InnerAnchorItem"]')
    .withText('Engineering')
    .nth(0);
  do {
    await t.click(services);
  } while (!(await engineeringSubItem.visible));

  await t.click(engineeringSubItem);

  const location = await getWindowLocation();
  await t.expect(location.href).contains(`${baseUrl}/engineering`);
});

test('An outerAnchorItem redirects to a page', async t => {
  const contact = Selector('li').withText('Contact');
  await t.expect(contact.exists).ok();
  await t.click(contact);

  await until(async () =>
    (await getWindowLocation()).href.includes('/contact'),
  );
});

test('opens and close a dropdown', async t => {
  const services = Selector('li').withText('Services');
  await t.expect(services.exists).ok({ timeout: 5000 });

  const openDropdown = services.withAttribute('aria-expanded', 'true').nth(0);
  do {
    await t.click(services);
  } while (!(await openDropdown.exists));

  const elsewhere = Selector('section').nth(0);
  await t.click(elsewhere);

  const closedDropdown = services
    .withAttribute('aria-expanded', 'false')
    .nth(0);
  await t.expect(closedDropdown.exists).ok({ timeout: 5000 });
});
