const specialitiesMap = {
  engineering: ['node-js', 'graphql', 'vue-js', 'react-js', 'kubernetes'],
  design: [],
  training: [],
  delivery: [],
  dedicatedTeams: [],
  openSource: []
}

const servicesColors = {
  default: 'black',
  engineering: '#52FFAC',
  design: 'black',
  training: 'black',
  delivery: 'black',
  dedicatedTeams: 'black',
  openSource: 'black'
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
