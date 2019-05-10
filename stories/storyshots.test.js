import initStoryshots from '@storybook/addon-storyshots'
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer'

const { STATIC_BUILD_PATH } = process.env

const beforeScreenshot = async page => {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, 600)
  )
}

initStoryshots({
  suite: 'Image storyshots',
  test: imageSnapshot({
    storybookUrl: STATIC_BUILD_PATH
      ? `file://${STATIC_BUILD_PATH}`
      : 'http://localhost:6006',
    beforeScreenshot
  })
})
