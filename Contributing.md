# How to contribute

We love pull requests. And following this guidelines will make your pull request easier to merge.

If you want to contribute but don’t know what to do, take a look at these two labels: [help wanted](https://github.com/yldio/yld.io/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22) and [good first issue](https://github.com/yldio/yld.io/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).

## Prerequisites

- If it’s your first pull request, watch [this amazing course](http://makeapullrequest.com/) by [Kent C. Dodds](https://twitter.com/kentcdodds).
- Fork the repository and clone your fork.
- Install dependencies: `yarn`.

## Development workflow

Run linters and tests:

```bash
yarn test
```

**Don’t forget to add tests and update documentation for your changes.**

**Please update yarn lock file (`yarn.lock`) if you add or update dependencies.**

## Other notes

- If you have commit access to repository and want to make big change or not sure about something, make a new branch and open pull request.
- We’re using [Prettier](https://github.com/prettier/prettier) to format JavaScript, so don’t worry much about code formatting.
- Don’t commit generated files, like minified JavaScript.
- Don’t change version number

## Need help?

Feel free to ask.
