import eventLabels from '../../../utils/eventLabels';

const navLinks = [
  {
    label: 'Services',
    dropdownItems: [
      {
        label: 'Engineering',
        to: '/engineering/',
      },
      {
        label: 'Design',
        to: '/design/',
      },
      {
        label: 'Training',
        to: '/training/',
      },
    ],
    attributes: {
      dataEvent: eventLabels.navigationServices,
    },
  },
  {
    label: 'Our work',
    to: '/our-work/',
  },
  {
    label: 'Open Source',
    to: '/open-source/',
  },
  {
    label: 'Community',
    dropdownItems: [
      {
        label: 'Blog',
        to: '/blog/',
      },
      {
        label: 'Events',
        to: '/events/',
      },
    ],
  },
  {
    label: 'About',
    dropdownItems: [
      {
        label: 'Our team',
        to: '/about-us/',
      },
      {
        label: 'Join us',
        to: '/join-us/',
      },
    ],
  },
];

export default navLinks;
