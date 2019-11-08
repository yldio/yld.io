const ValidateMdx = require('../../../../src/functions/blogMethods/validate-mdx')

it.each`
  description      | mdx
  ${'text'}        | ${'asdf'}
  ${'font styles'} | ${'**asdf**'}
  ${'links'}       | ${'[YLD](https://yld.io/)'}
  ${'tags'}        | ${'<iframe src="https://yld.io/" />'}
  ${'components'}  | ${'<YouTube videoId="youtube_video_id" />'}
`('passes for valid mdx using $description', async ({ mdx }) => {
  await expect(ValidateMdx([{ content: mdx }])).resolves.not.toThrow()
})

it('throws for a missing closing tag', async () => {
  await expect(ValidateMdx([{ content: '<div>' }])).rejects.toThrow()
})

it('throws for invalid jsx', async () => {
  await expect(
    ValidateMdx([{ content: '<YouTube videoId=42 />' }])
  ).rejects.toThrow()
})
