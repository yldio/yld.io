const fs = require('mz/fs')
const Reduce = require('apr-reduce')
const Export = require('./src/functions/blogMethods')

module.exports.handler = async () => {
  // const XmlFileNames = await fs.readdir('./xml/full')
  const XmlFileNames = ['posts_11_to_20.xml']

  const XmlData = await Reduce(XmlFileNames, async (sum = [], acc) =>
    sum.concat(await fs.readFile(`./xml/full/${acc}`))
  )

  let result

  try {
    result = await Export(XmlData)
  } catch (error) {
    throw new Error(error)
  }

  // console.log(JSON.stringify({ result }, null, 2))
  return result
}
