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
    ]
  },
  {
    label: 'Our work',
    to: '/our-work/'
  },
  {
    label: 'Open Source',
    to: '/open-source/'
  },
  {
    label: 'Blog',
    to: '/blog/'
  },
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
