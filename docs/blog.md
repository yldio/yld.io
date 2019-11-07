# Blog

## Things to know

We use [MDX](https://mdxjs.com) to render all blog posts in Gatsby. Using MDX allows us to define react components in markdown and control how they are rendered. e.g.

Markdown:

```markdown
### Post Title

<FigureImage src={'https://yld.io/image/image.png'} caption={'caption of image'}>

The content of the post
```

Using our defined component

```jsx
const FigureImage = ({ src, caption }) => (
  <figure>
    <img src={src} alt={caption} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
)
```

Will render:

```html
<figure>
  <img src="http://yld.io/image/image.png" alt="caption of image" />
  <figcaption>caption of image</figcaption>
</figure>
```

## How we get new posts

- [YLD publication](https://medium.com/feed/yld-blog) publishes a new blog post
- A Zappier task which tracks the YLD blog RSS feed picks up this new post and triggers the medium export lambda
- [`medium-export.js`](../src/functions/medium-export.js) lambda runs (<https://yld.io/.netlify/functions/medium-export>), the internal steps are:

  - GET the RSS feed (<https://medium.com/feed/yld-blog>)
  - Transforms XML to JSON
  - Transforms post content (HTML) to [MDX](https://mdxjs.com)
  - Uploads all images to Contentful
  - Publishes to Contentful

- New blog published on Contentful triggers POST webhook to Netlify
- Netlify receives webhook, rebuilds site with new blog post
