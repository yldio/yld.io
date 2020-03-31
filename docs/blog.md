# Blog

## How we get new posts

- [YLD publication](https://medium.com/feed/yld-blog) publishes a new blog post.
- A Zappier task which tracks the YLD blog RSS feed picks up this new post and triggers the medium export lambda.
- This trigger is a request to the lambda at (<https://yld.io/.netlify/functions/medium-blog-to-contentful>), file lives [here](../src/functions/medium-blog-to-contentful.js) the internal steps are:

  - GET the RSS feed (<https://medium.com/feed/yld-blog>).
  - Transforms XML to JSON.
  - Transforms post content (HTML) to [MDX](https://mdxjs.com).
  - Uploads all images to Contentful.
  - Publishes to Contentful.

- New blog published on Contentful triggers POST webhook to Netlify.
- Netlify receives webhook and rebuilds site with new blog post.

## How do I manually trigger a rebuild?

**This should rarely be used!**

All of the production lambdas have basic authentication ([see here](../src/functions/utils/auth.js)), to trigger any of them manually you'll need to get the authentication token defined in netlify env settings, open up postman and fire off a request.

## Things to know

We use [MDX](https://mdxjs.com) to render all blog posts in Gatsby. Using MDX allows us to define react components in markdown and control how they are rendered. e.g.

Markdown:

```markdown
### Post Title

<FigureImage src={'https://www.yld.io/image/image.png'} caption={'caption of image'}>

The content of the post
```

Using our defined component

```jsx
const FigureImage = ({ src, caption }) => (
  <figure>
    <img src={src} alt={caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);
```

Will render:

```html
<figure>
  <img src="https://www.yld.io/image/image.png" alt="caption of image" />
  <figcaption>caption of image</figcaption>
</figure>
```
