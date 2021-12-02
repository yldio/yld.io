module.exports = {
  babel: {
    presets: ['@babel/preset-env'],
  },
  stories: [
    '../stories/*.stories.mdx',
    '../stories/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    'storybook-addon-react-docgen',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-a11y',
  ],
};
