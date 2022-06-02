import { Selector, ClientFunction } from 'testcafe';
import until from 'async-wait-until';

import createServer from '../createServer';
import { port, baseUrl, getWindowLocation } from './helper';
import { retryTimes } from './utils';

require('dotenv').config();
let server;

const trainingPageUrl = `${baseUrl}/training`;
let firstModalLink;

fixture`Training page`.page`${trainingPageUrl}`
  .before(async () => {
    server = await createServer(port);
  })
  .beforeEach(async (t) => {
    firstModalLink = Selector('a[data-testid="course-link"]').nth(0);
    // cookie banner may block link clicks
    await t.click(Selector('button').withText('I agree'));
  })
  .after(() => server.close());

test('clicking a link on the training page should open up a modal with information on the correct training course', async (t) => {
  await t.expect(firstModalLink.exists).ok({ timeout: 5000 });
  const courseLinkText = await firstModalLink.textContent;
  await t.click(firstModalLink);
  const modalTitle = await Selector('[data-testid="modal-title"]').textContent;
  await t.expect(courseLinkText).eql(modalTitle);
});

test('should be redirected to the course catalog on the training page when the modal is closed', async (t) => {
  await t.expect(firstModalLink.visible).ok({ timeout: 5000 });

  const modalCloseButton = Selector('a[data-testid="modal-close-button"]');
  await retryTimes(async () => {
    await t.click(firstModalLink);
    await t.expect(await modalCloseButton.exists).ok();
  });
  await t.click(modalCloseButton);

  await until(async () =>
    (await getWindowLocation()).href.includes(trainingPageUrl),
  );
  await t.expect(firstModalLink.visible).ok({ timeout: 5000 });
});

test('pressing Escape on the keyboard closes the modal & redirects to the course catalog', async (t) => {
  await t.expect(firstModalLink.exists).ok({ timeout: 5000 });

  const modalCloseButton = Selector('a[data-testid="modal-close-button"]');
  await retryTimes(async () => {
    await t.click(firstModalLink);
    await t.expect(await modalCloseButton.exists).ok();
  });
  await t.click(modalCloseButton);

  await t.pressKey('esc');

  await until(async () =>
    (await getWindowLocation()).href.includes(trainingPageUrl),
  );
  await t.expect(firstModalLink.visible).ok({ timeout: 5000 });
});

test('when using the Escape key to close a modal, any future modal that is opened still has the correct content', async (t) => {
  const firstCourseLinkText = await firstModalLink.textContent;
  const secondModalLink = Selector('a[data-testid="course-link"]').nth(1);
  const secondCourseLinkText = await secondModalLink.textContent;

  let modalTitle;
  await t.click(firstModalLink);
  modalTitle = await Selector('[data-testid="modal-title"]').textContent;
  await t.expect(firstCourseLinkText).eql(modalTitle);

  await t.pressKey('esc');

  await t.click(secondModalLink);
  modalTitle = await Selector('[data-testid="modal-title"]').textContent;
  await t.expect(secondCourseLinkText).eql(modalTitle);
});

test("navigating directly to a training course's url should show the same content as navigating via the training page", async (t) => {
  await t.click(firstModalLink);

  const titleEl = Selector('[data-testid="modal-title"]');
  await t.expect(titleEl.exists).ok({ timeout: 5000 });

  const title = await titleEl();

  const titleFromTrainingPageLink = title.textContent;

  await ClientFunction(() => document.location.reload())();
  const titleFromUrlNavigation = await Selector('[data-testid="modal-title"]')
    .textContent;

  await t.expect(titleFromUrlNavigation).eql(titleFromTrainingPageLink);
});
