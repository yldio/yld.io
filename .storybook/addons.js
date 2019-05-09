import '@storybook/addon-actions/register'
import '@storybook/addon-links/register'
import '@storybook/addon-a11y/register'
import 'storybook-readme/register'

import registerScissors from 'storybook-addon-scissors'

const devices = [
  {
    uid: 'small-mobile',
    title: 'Small Mobile',
    width: 320,
    height: 568
  },
  {
    uid: 'medium-mobile',
    title: 'Medium Mobile',
    width: 550,
    height: 736
  },
  {
    uid: 'large-mobile',
    title: 'Large Mobile',
    width: 650,
    height: 736
  },
  {
    uid: 'small-tablet',
    title: 'Small Tablet',
    width: 768,
    height: 600
  },
  {
    uid: 'tablet',
    title: 'Tablet',
    width: 1000,
    height: 600
  },
  {
    uid: 'desktop',
    title: 'Desktop',
    width: 1440,
    height: 624
  }
]

registerScissors(devices)
