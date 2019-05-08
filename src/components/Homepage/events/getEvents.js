import { format, isAfter } from 'date-fns'

const toDate = stringDate => new Date(stringDate)

export const getHomepageMeetups = events =>
  events
    .filter(n => !n.node.homepageFeatured)
    .filter(n => isAfter(new Date(n.node.date), new Date()))
    .sort((a, b) => (toDate(a.node.date) <= toDate(b.node.date) ? -1 : 1))
    .slice(0, 5)
    .reverse()
    .map(n => n.node)
    .map(event => ({
      ...event,
      date: format(new Date(event.date), 'MMMM DD[,] dddd')
    }))

export const getHomepageConferences = events =>
  events
    .filter(n => n.node.homepageFeatured)
    .slice(0, 1)
    .map(n => n.node)
    .map(event => ({
      ...event,
      date: format(new Date(event.date), 'MMMM DD[,] dddd')
    }))
