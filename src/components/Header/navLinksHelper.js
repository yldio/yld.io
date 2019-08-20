import theme from '../../utils/theme'

const specialitiesMap = {
  engineering: [
    'node-js',
    'graphql',
    'vue-js',
    'react-js',
    'kubernetes',
    'react-native'
  ]
}

const logoColors = {
  default: theme.colors.text,
  defaultText: theme.colors.white,
  defaultHover: '#8e8e8e',
  specialityText: theme.colors.blueBg,
  specialityHover: theme.colors.white,
  specialitiesFills: {
    default: theme.colors.white,
    'node-js': '#52FFAC',
    graphql: '#EB008B',
    'vue-js': '#039328',
    'react-js': '#0BDDF9',
    'react-native': '#968CEA',
    kubernetes: '#29EFEF',
    amp: '#0097E2',
    'data-analysis': '#00B7FF'
  }
}

const servicesList = Object.keys(specialitiesMap)

const servicesRegExp = new RegExp(servicesList.join('|'))

const getIsServicePage = path => path.search(servicesRegExp) > -1

const getSpeciality = path => path.split('/')[2]

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
  getAboutUrl
}
