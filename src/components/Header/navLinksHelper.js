import theme from '../../utils/theme'

const specialitiesMap = {
  engineering: ['node-js', 'graphql', 'vue-js', 'react-js', 'kubernetes'],
  design: [],
  training: [],
  delivery: [],
  dedicatedTeams: [],
  openSource: []
}

const logoColors = {
  default: theme.colors.text,
  defaultText: theme.colors.white,
  defaultHover: '#8e8e8e',
  engineering: {
    'node-js': '#52FFAC',
    graphql: '#EB008B',
    'vue-js': '#039328',
    'react-js': '#0BDDF9',
    kubernetes: '#29EFEF'
  },
  design: {},
  training: {},
  delivery: {},
  dedicatedTeams: {},
  openSource: {},
  specialityText: theme.colors.blueBg,
  specialityHover: theme.colors.white
}

const servicesList = Object.keys(specialitiesMap)

const servicesRegExp = new RegExp(servicesList.join('|'))

const getIsServicePage = path => path.search(servicesRegExp) > -1

const getSpeciality = path => path.split('/')[2]

const getService = path =>
  servicesList.find(service => {
    const specialitiesRegExp = new RegExp(specialitiesMap[service].join('|'))
    return path.search(specialitiesRegExp) > -1
  })

const AboutUrlList = ['about-us', 'contact']

const getAboutUrl = path =>
  AboutUrlList.find(aboutUrl => path.includes(aboutUrl))

export {
  specialitiesMap,
  logoColors,
  servicesList,
  servicesRegExp,
  getIsServicePage,
  getSpeciality,
  getService,
  getAboutUrl
}
