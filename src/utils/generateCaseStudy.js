/*
  if you are wondering what this is this is a hack.

  What happens is that contentful does not have emebededs so we need to upload videos as code and in here I create three different arrays to separate what is code and not because of mainly layout reasons.
*/

const generateCaseStudy = caseStudy => {
  console.log(JSON.stringify(caseStudy))
  let met = false
  return caseStudy.body.content.reduce(
    (acc, c) => {
      const code = c.content[0].marks.length
      const value = c.content[0].value

      if (met && !code) {
        acc[2].push(value)
      } else if (!met && !code) {
        acc[0].push(value)
      }

      if (c.content[0] && c.content[0].marks && code) {
        met = true
        acc[1].push(value)
      }

      return acc
    },
    [[], [], []]
  )
}

export default generateCaseStudy
