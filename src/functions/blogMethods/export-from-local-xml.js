const fs = require('mz/fs');
const Reduce = require('apr-reduce');
const Export = require('./src/functions/blogMethods');

module.exports.handler = async () => {
  // const XmlFileNames = await fs.readdir('./xml/full')
  const XmlFileNames = ['posts_103_to_112.xml'];

  // Remove this Reduce, transform all xml posts into one XML string in the same medium schema
  const XmlData = await Reduce(XmlFileNames, async (sum = [], acc) =>
    sum.concat(await fs.readFile(`./xml/full/${acc}`)),
  );

  let result;

  try {
    result = await Export(XmlData[0]);
  } catch (error) {
    throw new Error(error);
  }

  // eslint-disable-next-line no-console
  console.log(JSON.stringify({ result }, null, 2));

  return result;
};
