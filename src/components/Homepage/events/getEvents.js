import { format, isAfter } from 'date-fns'

export const getHomepageMeetups = events =>
  events
    .filter(n => !n.node.homepageFeatured)
    .filter(n => isAfter(new Date(n.node.date), new Date()))
    .slice(0, 3)
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
