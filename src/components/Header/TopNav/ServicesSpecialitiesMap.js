const specialitiesMap = {
  engineering: ['node-js', 'graphql', 'vue-js', 'react-js', 'kubernetes'],
  design: [],
  training: [],
  delivery: [],
  dedicatedTeams: [],
  openSource: []
}

const servicesList = Object.keys(specialitiesMap)

const servicesRegExp = new RegExp(servicesList.join('|'))

export { specialitiesMap, servicesList, servicesRegExp }
