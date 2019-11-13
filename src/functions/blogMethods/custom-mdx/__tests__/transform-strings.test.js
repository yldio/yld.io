const TransformStrings = require('../transform-strings');

it.each([
  'https://medium.com/yld-blog/',
  'http://medium.com/yld-blog/',
  'https://Medium.Com/YLD-Blog/',
  'https://medium.com/yld-blog',
  'https://medium.com/yld-engineering-blog/',
])(
  'replaces the YLD medium blog URL %s with the yld.io blog URL',
  mediumUrl => {
    const content = TransformStrings(`[YLD Blog](${mediumUrl})`);
    expect(content).toBe('[YLD Blog](https://yld.io/blog/)');
  },
);

it('strips hex UID from a post slug', () => {
  const content = TransformStrings(
    '[YLD Post](https://medium.com/yld-blog/yld-post-0123456789ab)',
  );
  expect(content).toBe('[YLD Post](https://yld.io/blog/yld-post)');
});

it('replaces multiple URLs in one post', () => {
  const content = TransformStrings(`
    [YLD Blog 1](https://medium.com/yld-blog/)
    [YLD Blog 2](https://medium.com/yld-blog/)
  `);
  expect(content).toBe(`
    [YLD Blog 1](https://yld.io/blog/)
    [YLD Blog 2](https://yld.io/blog/)
  `);
});
