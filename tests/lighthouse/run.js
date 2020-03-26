import { launch as launchChrome } from 'chrome-launcher';
import lighthouse from 'lighthouse';

import createServer from '../createServer';
import config from './config';

const port = 3001;

const runLighthouse = async () => {
  const server = await createServer(port);
  try {
    const chrome = await launchChrome({ chromeFlags: [] });
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
