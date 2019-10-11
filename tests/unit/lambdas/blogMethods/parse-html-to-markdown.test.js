const ParseHTMLToMarkdown = require('../../../../src/functions/blogMethods/parse-html-to-markdown')

const paragraphWithJsxComponent = `<p>This paragraph has a react component in it (i.e. &lt;React.Suspense /&gt;).</p>
`
const blockquote = `<blockquote>
rendered within that Suspense<a href="https://twitter.com/dan_abramov/status/1150842009403482113"><em>boundary</em></a>(i.e. &lt;React.Suspense /&gt;).</blockquote>`

const image = `<figure>
<img
  alt="Alt Info"
  src="https://cdn-images-1.medium.com/max/500/0*7vwZ-JcldaD-ar94.gif"
/>
</figure>`

const iframe = `<iframe
src="https://cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FLl50EFquwSo%3Ffeature%3Doembed&amp;url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DLl50EFquwSo&amp;image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FLl50EFquwSo%2Fhqdefault.jpg&amp;key=a19fcc184b9711e1b4764040d3dc5c07&amp;type=text%2Fhtml&amp;schema=youtube"
width="854"
height="480"
frameborder="0"
scrolling="no"
><a href="https://medium.com/media/2a47b674cb99880c47c14b83c1b3b0a6/href"
  >https://medium.com/media/2a47b674cb99880c47c14b83c1b3b0a6/href</a
></iframe>`

const pre = `<pre>n868740.ksc.nasa.gov - - [01/Aug/1995:12:19:45 -0400] &quot;GET /images/MOSAIC-logosmall.gif HTTP/1.0&quot; 200 363</pre>
<pre>$ cat corpus/access_log_Jul95 | egrep -o &quot;&quot;GET .*?&quot;&quot; | sort -u | wc -l</pre>
`

const list = [
  {
    label:
      'should correctly transform paragraphs with React Components in it to Markdown',
    html: paragraphWithJsxComponent,
    md:
      'This paragraph has a react component in it (i.e. `<React.Suspense />`).'
  },
  {
    label: 'should correctly transform blockquotes',
    html: blockquote,
    md:
      '>rendered within that Suspense[_boundary_](https://twitter.com/dan_abramov/status/1150842009403482113)(i.e. &lt;React.Suspense /&gt;).'
  },
  {
    label: 'should correct transform figure blocks',
    images: [
      {
        alt: 'Alt Info',
        caption: undefined,
        ext: '.gif',
        name: '0__7vwZ__JcldaD__ar94.gif',
        src: 'https://cdn-images-1.medium.com/max/500/0*7vwZ-JcldaD-ar94.gif'
      }
    ],
    html: image,
    md: '<image:0__7vwZ__JcldaD__ar94.gif>'
  },
  {
    label: 'should correctly transform iframes',
    images: [],
    html: iframe,
    md:
      '<iframecontent:"https://medium.com/media/2a47b674cb99880c47c14b83c1b3b0a6/href">'
  },
  {
    label: 'should correctly transform pre blocks',
    images: [],
    html: pre,
    md:
      '```\nn868740.ksc.nasa.gov - - \\[01/Aug/1995:12:19:45 -0400\\] "GET /images/MOSAIC-logosmall.gif HTTP/1.0" 200 363\n```\n\n```\n$ cat corpus/access\\_log\\_Jul95 | egrep -o ""GET .\\*?"" | sort -u | wc -l\n```'
  }
]

describe('ParseHTMLToMarkdown', () => {
  list.map(({ label, html, md, images = [] }) =>
    it(label, () => {
      const post = {
        title: 'Blog title',
        html
      }

      const expected = {
        title: 'Blog title',
        images,
        md
      }

      const result = ParseHTMLToMarkdown(post)

      expect(result).toEqual(expected)
    })
  )
})
