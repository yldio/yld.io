import { Selector } from 'testcafe';

import createServer from '../createServer';
import { port, baseUrl, getWindowLocation } from './helper';

require('dotenv').config();
let server;

fixture`mobile Nav Menu`.page`${baseUrl}`
  .before(async () => {
    server = await createServer(port);
  })
  .after(() => server.close());

const openMobileNav = async (t) => {
  await t.resizeWindowToFitDevice('iphone6plus');
  await t.click(await Selector('[class^="Hamburger"'));
};

test('we are on the homepage', async (t) => {
  const location = await getWindowLocation();
  await t.expect(location.href).contains(baseUrl);
});

test('a hamburger is present on the page', async (t) => {
  await t.resizeWindowToFitDevice('iphone6plus');

  const hamburger = await Selector('[class^="Hamburger"').filterVisible();
  await t.expect(hamburger.exists).ok();
});

test('the mobile nav is not expanded at its initial state', async (t) => {
  const mobileNavPanel = Selector('nav[class^="MobileNav"').withAttribute(
    'open',
  );
  await t.expect(mobileNavPanel.exists).notOk();
});

test('when the hamburger button is clicked the mobile nav expands', async (t) => {
  await openMobileNav(t);

  const mobileNavPanel = Selector('nav[class^="MobileNav"').withAttribute(
    'open',
  );
  await t.expect(mobileNavPanel.exists).ok();
});

test('clicking a mobile Nav link redirects to the correct url and closes the mobile Nav', async (t) => {
  await openMobileNav(t);
  const mobileNavPanel = Selector('nav[class^="MobileNav"]').withAttribute(
    'open',
  );

  const joinUsLink = mobileNavPanel.find('a').withText('Open Source');
  await t.click(joinUsLink);

  const location = await getWindowLocation();
  await t.expect(location.href).contains(`${baseUrl}/open-source`);
  await t.expect(mobileNavPanel.exists).notOk();
});

test('when the mobile nav expands for the first time no sub-item is shown by default', async (t) => {
  await openMobileNav(t);
  const mobileNavPanel = Selector('nav[class^="MobileNav"]').withAttribute(
    'open',
  );

  const engineeringSubItem = mobileNavPanel.find('a').withText('Engineering');
  await t.expect(engineeringSubItem.exists).notOk();
});

test('when an item is clicked its sub-items appear', async (t) => {
  await openMobileNav(t);
  const mobileNavPanel = Selector('nav[class^="MobileNav"]').withAttribute(
    'open',
  );

  const servicesItem = mobileNavPanel.find('span').withText('Services');
  await t.click(servicesItem);

  const engineeringSubItem = mobileNavPanel.find('a').withText('Engineering');
  await t.expect(engineeringSubItem.exists).ok();
});

test('clicking a sub-item redirects to the correct url and closes the mobile Nav', async (t) => {
  await openMobileNav(t);
  const mobileNavPanel = Selector('nav[class^="MobileNav"]').withAttribute(
    'open',
  );

  const servicesItem = mobileNavPanel.find('span').withText('Services');
  await t.click(servicesItem);

  const engineeringSubItem = mobileNavPanel.find('a').withText('Engineering');
  await t.click(engineeringSubItem);

  const location = await getWindowLocation();
  await t.expect(location.href).contains(`${baseUrl}/engineering`);
  await t.expect(mobileNavPanel.exists).notOk();
});

test('After a sub-item has been clicked and if the MobileNav is re-opened, the subitems are still visible and the selected one highlighted', async (t) => {
  await openMobileNav(t);
  const mobileNavPanel = Selector('nav[class^="MobileNav"]').withAttribute(
    'open',
  );

  const servicesItem = mobileNavPanel.find('span').withText('Services');
  await t.click(servicesItem);

  const designSubItem = mobileNavPanel.find('a').withText('Design');
  await t.click(designSubItem);
  await openMobileNav(t);

  const inactiveSubItem = mobileNavPanel.find('a').withText('Engineering');
  await t.expect(inactiveSubItem.exists).ok();
  await t.expect(inactiveSubItem.hasClass('current')).notOk();

  const activeSubItem = mobileNavPanel.find('a').withText('Design');
  await t.expect(activeSubItem.exists).ok();
  await t.expect(activeSubItem.hasClass('current')).ok();
});
