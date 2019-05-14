import { generate } from 'shortid'

const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)

export default workStage =>
  Array.from(new Array(15))
    .map((_, index) => {
      // get the current body of the part we want. They're all numbered starting with 1.
      // arrays start with 0 so that's why the + 1
      const getCurrent = part => `section${capitalize(part)}${index + 1}`
      return {
        id: `${workStage.id}-${generate()}`,
        title: workStage[getCurrent('title')],
        icon: workStage[getCurrent('icon')],
        body: (workStage[getCurrent('body')] || {})[getCurrent('body')]
      }
    })
    .filter(({ title }) => title)
