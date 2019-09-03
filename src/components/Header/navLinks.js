import eventLabels from '../../utils/eventLabels'

const navLinks = [
  {
    label: 'Services',
    dropdownItems: [
      {
        label: 'Engineering',
        to: '/engineering/'
      },
      {
        label: 'Design',
        to: '/design/'
      },
      {
        label: 'Training',
        to: '/training/'
      }
    ],
    attributes: {
      dataEvent: eventLabels.navigationServices
    }
  },
  {
    label: 'Our work',
    to: '/our-work/'
  },
  {
    label: 'Open Source',
    to: '/open-source/'
  },
  /* 
    This should be added back in once the medium/blog post export has
    been completed
    ticket: https://trello.com/c/ozDzAeA3/658-investigate-gatsby-medium-source-plugin-issues
  */
  // {
  //   label: 'Blog',
  //   to: '/blog/',
  //   attributes: {
  //     'data-event': eventLabels.navigationBlog
  //   }
  // },
  {
    label: 'About',
    dropdownItems: [
      {
        label: 'Our team',
        to: '/about-us/'
      },
      {
        label: 'Join us',
        to: '/join-us/'
      }
    ]
  },
  {
    label: 'Contact',
    to: '/contact'
  }
]

export default navLinks
