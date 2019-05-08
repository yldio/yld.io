import theme from '../../../utils/theme'

const specialitiesMap = {
  engineering: ['node-js', 'graphql', 'vue-js', 'react-js', 'kubernetes'],
  design: [],
  training: [],
  delivery: [],
  dedicatedTeams: [],
  openSource: []
}

const servicesColors = {
  default: theme.colors.text,
  defaultText: theme.colors.white,
  defaultHover: '#8e8e8e',
  engineering: '#52FFAC',
  design: '#52FFAC',
  training: '#52FFAC',
  delivery: '#52FFAC',
  dedicatedTeams: '#52FFAC',
  openSource: '#52FFAC',
  specialityText: '#090329',
  specialityHover: theme.colors.white
}

const servicesList = Object.keys(specialitiesMap)

const servicesRegExp = new RegExp(servicesList.join('|'))

const getSpecialityService = path =>
  servicesList.find(service => {
    const specialitiesRegExp = new RegExp(specialitiesMap[service].join('|'))
    return path.search(specialitiesRegExp) > -1
  })

export {
  specialitiesMap,
  servicesColors,
  servicesList,
  servicesRegExp,
  getSpecialityService
}
