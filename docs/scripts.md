# Scripts

## Starting

### App

```bash
yarn start
```

This will start your development server using gatsby. There is also `yarn develop` because this is the default gatsby one and so it makes sense to keep it.

```bash
  yarn dev:clean
```

This scripts cleans your `.cache` folder and then runs `yarn start`. If you are getting weird gastby errors it is sometimes caused by a stale `.cache` folder and this script should fix it.

### Storybook

```bash
  yarn storybook
```

This will run storybook so you can see our shared components.

```bash
yarn storybook:static
```

This command will build a static version of our storybook instance to `storybook-static/`.

### Lambda

```bash
  yarn start:lambda
```

We also have one lambda function that goes to meetup and gets our latest meetups to put them in contentful and if need to make any changes this is the script to run.

See [here](../README.md#ƛ-netlify-lambda-automated-deployments) for details on how these are used.

## Tests

We have two types of tests in place.

### Snapshots

```bash
yarn test:snapshots
```

This will run all the tests inside our storybook instance that covers some of our shared components.

### Testcafe

```bash
yarn test:e2e
```

Testcafe is our end-to-end web testing tool; we use it to make sure that the website work the way it is supposed to.

```bash
yarn test
```

This will run all test:\*\* scripts

## Lint

### Eslint

```bash
yarn lint
```

This will run eslint on all our project files.

### Prettier

```bash
yarn format
```

This will run prettier on all our files to assure code consistency.

## Build

### App

```bash
yarn build:app
```

This command will build gatsby and the website.

### Lambda

```bash
yarn build:lambda
```

This command will build our lambdas using the [netlify-lambda](https://github.com/netlify/netlify-lambda) package.

See [Netlify automated deployments](../README.md#ƛ-netlify-lambda-automated-deployments) for details on how the lambdas are used.

```bash
yarn build
```

This will run all our build:\*\* scripts.

Any questions feel free to create an issue :)
