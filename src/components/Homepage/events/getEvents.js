import { format, isAfter, endOfYesterday } from 'date-fns'

const yesterday = new Date(endOfYesterday())
const isAfterYesterday = date => isAfter(date, yesterday)

const toDate = stringDate => new Date(stringDate)

export const getHomepageMeetups = events =>
  events
    .filter(
      n => !n.node.homepageFeatured && isAfterYesterday(toDate(n.node.date))
    )
    .sort((a, b) => (toDate(a.node.date) <= toDate(b.node.date) ? -1 : 1))
    .slice(0, 5)
    .map(n => ({
      ...n.node,
      date: format(toDate(n.node.date), 'MMMM DD[,] dddd')
    }))

export const getHomepageConferences = events =>
  events
    .filter(n => n.node.homepageFeatured)
    .slice(0, 1)
    .map(n => ({
      ...n.node,
      date: format(toDate(n.node.date), 'MMMM DD[,] dddd')
    }))
