module.exports = content =>
  content.replace(
    /https:\/\/medium.com\/yld(-engineering)?-blog\/?/gi,
    'https://yld.io/blog/'
  )
