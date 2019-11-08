const TransformHTMLToMarkdown = require('../../../../src/functions/blogMethods/transform-html-to-markdown')

const tweetBlockquote = `
  <blockquote class="twitter-tweet">
    <p>Tweet content</p>
    <p>
      &#x200a;&mdash;&#x200a;
      <a href="https://twitter.com/user/status/123456789012345678">@user</a>
    </p>
  </blockquote>
`
const tweetMdx = `<Tweet tweetId="123456789012345678" />`

const iframe = '<iframe><a href="https://yld.io/"></iframe>'
const iframeMdx = '<iframecontent:"https://yld.io/">'

it.each`
  htmlDescription                                    | html                                                              | md                              | mdDescription
  ${'nothing'}                                       | ${''}                                                             | ${''}                           | ${'nothing'}
  ${'an h3'}                                         | ${'<h3>Heading</h3>'}                                             | ${'### Heading'}                | ${'a level 3 heading'}
  ${'p tags'}                                        | ${'<p>Par 1</p><p>Par 2</p>'}                                     | ${'Par 1\n\nPar 2'}             | ${'paragraphs'}
  ${'a p tag containing text in tag shape'}          | ${'<p>My &lt;tag&gt;</p>'}                                        | ${'My `<tag>`'}                 | ${'inline code containing a tag'}
  ${'blockquote tags'}                               | ${'<blockquote>Par 1</blockquote><blockquote>Par 2</blockquote>'} | ${'>Par 1\n\n>Par 2'}           | ${'quoted paragraphs'}
  ${'a blockquote tag containing text in tag shape'} | ${'<blockquote>My &lt;tag&gt;</blockquote>'}                      | ${'>My `<tag>`'}                | ${'quoted inline code containing a tag'}
  ${'a Tweet-shaped blockquote'}                     | ${tweetBlockquote}                                                | ${tweetMdx}                     | ${'a Tweet tag'}
  ${'a pre tag'}                                     | ${'<pre>a + b;</pre>'}                                            | ${'```\na + b;\n```'}           | ${'a fenced code block'}
  ${'a br tag in a pre tag'}                         | ${'<pre>a;<br>b;</pre>'}                                          | ${'```\na;\nb;\n```'}           | ${'a line break in a fenced code block'}
  ${'a strong tag in a pre tag'}                     | ${'<pre><strong>a + b;</strong></pre>'}                           | ${'```\na + b;\n```'}           | ${'nothing'}
  ${'a strong tag in a pre tag'}                     | ${'<pre><strong>a + b;</strong></pre>'}                           | ${'```\na + b;\n```'}           | ${'nothing'}
  ${'a script tag'}                                  | ${'<script>a + b;</script>'}                                      | ${''}                           | ${'nothing'}
  ${'a style tag'}                                   | ${'<style>a + b;</style>'}                                        | ${''}                           | ${'nothing'}
  ${'an iframe'}                                     | ${iframe}                                                         | ${iframeMdx}                    | ${'an iframecontent placeholder tag'}
  ${'consecutive iframes'}                           | ${iframe + iframe}                                                | ${iframeMdx + '\n' + iframeMdx} | ${'iframecontent placeholders on different lines'}
  ${'an image'}                                      | ${''}                                                             | ${''}                           | ${''}
`('transforms $htmlDescription to $mdDescription', ({ html, md: expected }) => {
  const [{ content: actual }] = TransformHTMLToMarkdown([{ html }])
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
    const [{ content }] = TransformHTMLToMarkdown([{ html: imgFigure }])
    expect(content).toBe('<image:yld.png>')
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
