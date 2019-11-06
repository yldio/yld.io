const TransformHTMLToMarkdown = require('../../../../src/functions/blogMethods/transform-html-to-markdown')

// const paragraphWithJsxComponent = `<p>This paragraph has a react component in it (i.e. &lt;React.Suspense /&gt;).</p>
// `
// const blockquote = `<blockquote>
// rendered within that Suspense<a href="https://twitter.com/dan_abramov/status/1150842009403482113"><em>boundary</em></a>(i.e. &lt;React.Suspense /&gt;).</blockquote>`
//
//
// const iframe = `<iframe
// src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FLl50EFquwSo%3Ffeature%3Doembed&amp;url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLl50EFquwSo&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FLl50EFquwSo%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube"
// width="854"
// height="480"
// frameborder="0"
// scrolling="no"
// ><a href="https://medium.com/media/2a47b674cb99880c47c14b83c1b3b0a6/href">https://medium.com/media/2a47b674cb99880c47c14b83c1b3b0a6/href</a
// ></iframe>`
//
// const list = [
//   {
//     label:
//       'should correctly transform paragraphs with React Components in it to Markdown',
//     html: paragraphWithJsxComponent,
//     md:
//       'This paragraph has a react component in it (i.e. `<React.Suspense />`).'
//   },
//   {
//     label: 'should correctly transform blockquotes',
//     html: blockquote,
//     md:
//       '>rendered within that Suspense[_boundary_](https://twitter.com/dan_abramov/status/1150842009403482113)(i.e. &lt;React.Suspense /&gt;).'
//   },
//   {
//     label: 'should correct transform figure blocks',
//     images: [
//       {
//         alt: 'Alt Info',
//         caption: undefined,
//         ext: '.gif',
//         name: '0__7vwZ__JcldaD__ar94.gif',
//         src: 'https://cdn-images-1.medium.com/max/500/0*7vwZ-JcldaD-ar94.gif'
//       }
//     ],
//     html: image,
//     md: '<image:0__7vwZ__JcldaD__ar94.gif>'
//   },
//   {
//     label: 'should correctly transform iframes',
//     images: [],
//     html: iframe,
//     md:
//       '<iframecontent:"https://medium.com/media/2a47b674cb99880c47c14b83c1b3b0a6/href">'
//   },
//   {
//     label: 'should correctly transform pre blocks',
//     images: [],
//     html: pre,
//     md:
//       '```\nn868740.ksc.nasa.gov - - \\[01/Aug/1995:12:19:45 -0400\\] "GET /images/MOSAIC-logosmall.gif HTTP/1.0" 200 363\n```\n\n```\n$ cat corpus/access\\_log\\_Jul95 | egrep -o ""GET .\\*?"" | sort -u | wc -l\n```'
//   }
// ]

const tweetBlockquote = `
  <blockquote class="twitter-tweet">
    <p>Tweet content</p>
    <p>
      &#x200a;&mdash;&#x200a;
      <a href="https://twitter.com/user/status/123456789012345678">@user</a>
    </p>
  </blockquote>
`
const tweetHtml = `<Tweet tweetId="123456789012345678" />`

it.each`
  htmlDescription                                    | html                                                              | md                                     | mdDescription
  ${'nothing'}                                       | ${''}                                                             | ${''}                                  | ${'nothing'}
  ${'an h3'}                                         | ${'<h3>Heading</h3>'}                                             | ${'### Heading'}                       | ${'a level 3 heading'}
  ${'p tags'}                                        | ${'<p>Par 1</p><p>Par 2</p>'}                                     | ${'Par 1\n\nPar 2'}                    | ${'paragraphs'}
  ${'a p tag containing text in tag shape'}          | ${'<p>My &lt;tag&gt;</p>'}                                        | ${'My `<tag>`'}                        | ${'inline code containing a tag'}
  ${'blockquote tags'}                               | ${'<blockquote>Par 1</blockquote><blockquote>Par 2</blockquote>'} | ${'>Par 1\n\n>Par 2'}                  | ${'quoted paragraphs'}
  ${'a blockquote tag containing text in tag shape'} | ${'<blockquote>My &lt;tag&gt;</blockquote>'}                      | ${'>My `<tag>`'}                       | ${'quoted inline code containing a tag'}
  ${'a Tweet-shaped blockquote'}                     | ${tweetBlockquote}                                                | ${tweetHtml}                           | ${'a Tweet tag'}
  ${'a pre tag'}                                     | ${'<pre>a + b;</pre>'}                                            | ${'```\na + b;\n```'}                  | ${'a fenced code block'}
  ${'a br tag in a pre tag'}                         | ${'<pre>a;<br>b;</pre>'}                                          | ${'```\na;\nb;\n```'}                  | ${'a line break in a fenced code block'}
  ${'a strong tag in a pre tag'}                     | ${'<pre><strong>a + b;</strong></pre>'}                           | ${'```\na + b;\n```'}                  | ${'nothing'}
  ${'a strong tag in a pre tag'}                     | ${'<pre><strong>a + b;</strong></pre>'}                           | ${'```\na + b;\n```'}                  | ${'nothing'}
  ${'a script tag'}                                  | ${'<script>a + b;</script>'}                                      | ${''}                                  | ${'nothing'}
  ${'a style tag'}                                   | ${'<style>a + b;</style>'}                                        | ${''}                                  | ${'nothing'}
  ${'an iframe'}                                     | ${'<iframe><a href="https://yld.io/"></iframe>'}                  | ${'<iframecontent:"https://yld.io/">'} | ${'an iframecontent: placeholder tag'}
  ${'an image'}                                      | ${''}                                                             | ${''}                                  | ${''}
`('transforms $htmlDescription to $mdDescription', ({ html, md: expected }) => {
  const [{ md: actual }] = TransformHTMLToMarkdown([{ html }])
  expect(actual).toBe(expected)
})

const imgFigure = `
  <figure>
    <img
      alt="Alt"
      src="https://yld.io/yld.png"
    />
  </figure>
`

const imgFigureWithCaption = `
  <figure>
    <img
      alt="Alt"
      src="https://yld.io/yld.png"
    />
    <figcaption><strong>Link</strong>: <a href="https://yld.io/">YLD</a></figcaption>
  </figure>
`
const captionMarkdown = '**Link**: [YLD](https://yld.io/)'

describe('images:', () => {
  it('transforms an image to an image: placeholder tag', () => {
    const [{ md }] = TransformHTMLToMarkdown([{ html: imgFigure }])
    expect(md).toBe('<image:yld.png>')
  })

  it('returns the info for an image', () => {
    const [{ images }] = TransformHTMLToMarkdown([{ html: imgFigure }])
    expect(images).toEqual([
      {
        src: 'https://yld.io/yld.png',
        ext: '.png',
        alt: 'Alt',
        name: 'yld.png'
      }
    ])
  })

  it('renders and returns a markdown caption', () => {
    const [{ images }] = TransformHTMLToMarkdown([
      { html: imgFigureWithCaption }
    ])
    expect(images).toEqual([
      expect.objectContaining({ caption: captionMarkdown })
    ])
  })
})
