import { launch as launchChrome } from 'chrome-launcher';
import lighthouse from 'lighthouse';

import createServer from '../createServer';
import config from './config';

const port = 3001;

const runLighthouse = async () => {
  const server = await createServer(port);
  try {
    const chrome = await launchChrome({
      // https://github.com/GoogleChrome/chrome-launcher/issues/6
      chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox'],
    });
    try {
      return await lighthouse(
        `http://localhost:${port}/`,
        { port: chrome.port },
        config,
      );
    } finally {
      await chrome.kill();
    }
  } finally {
    server.close();
  }
};

export default runLighthouse;
