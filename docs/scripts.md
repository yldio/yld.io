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

### Lambda

```bash
  yarn start:lambda
```

We also have one lambda function that goes to meetup and gets our latest meetups to put them in contentful and if need to make any changes this is the script to run.

## Tests

We have two types of tests in place.

### Snapshots

```bash
yarn test:snapshots
```

This will run all the tests inside our storybook instance that covers some of our shared components.

### Lighthouse

```bash
yarn test:lighthouse
```

We also have some lighthouse tests in place to make sure we don't make the website too slow or fail in accessability and you can run it like this.

### Testcafe

```bash
yarn test:e2e
```

Testcafe is our end-to-end web testing tool; we use it to make sure that the website work the way it is supposed to.

```bash
yarn test
```

This will run all the above.

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

### Storybook

```bash
yarn build:storybook
```

This command will build our storybook instance.

### Lambda

```bash
yarn build:lambda
```

This command will build our meetup lambda.

```bash
yarn build
```

This will run all our build scripts.

Any questions feel free to create an issue :)
