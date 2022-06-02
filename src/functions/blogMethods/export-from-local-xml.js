const fs = require('mz/fs');
const Reduce = require('apr-reduce');
const SyncMediumToContentful = require('.');

const exportFromLocalXml = async () => {
  const XmlFileNames = ['/tmp/posts_a_to_b.xml'];

  // TODO remove this Reduce, transform all xml posts into one XML string in the same medium schema

  const XmlData = await Reduce(XmlFileNames, async (sum = [], acc) =>
    sum.concat(await fs.readFile(acc)),
  );

  let result;

  try {
    result = await SyncMediumToContentful(XmlData[0]);
  } catch (error) {
    throw new Error(error);
  }

  console.log(JSON.stringify({ result }, null, 2));

  return result;
};

exportFromLocalXml();
