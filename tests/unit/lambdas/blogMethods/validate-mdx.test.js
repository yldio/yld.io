const ValidateMdx = require('../../../../src/functions/blogMethods/validate-mdx')

it.each`
  description      | mdx
  ${'text'}        | ${'asdf'}
  ${'font styles'} | ${'**asdf**'}
  ${'links'}       | ${'[YLD](https://yld.io/)'}
  ${'tags'}        | ${'<iframe src="https://yld.io/" />'}
  ${'components'}  | ${'<YouTube videoId="youtube_video_id" />'}
`('passes for valid mdx using %s', async ({ mdx }) => {
  await expect(ValidateMdx([{ content: mdx }])).resolves.not.toThrow()
})

// TODO invalid mdx?
