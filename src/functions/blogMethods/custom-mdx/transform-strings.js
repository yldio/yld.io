const transformStrings = content =>
  content.replace(
    /https?:\/\/medium\.com\/yld(-engineering)?-blog\/?/gi,
    'https://yld.io/blog/'
  )

module.exports = transformStrings
