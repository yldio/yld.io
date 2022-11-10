import behance from '../../images/behance-icon.svg';
import dribbble from '../../images/dribbble-icon.svg';
import github from '../../images/github-icon.svg';
import medium from '../../images/medium-icon.svg';
import twitter from '../../images/twiter-icon.svg';
import youtube from '../../images/youtube-icon.svg';
import instagram from '../../images/instagram-icon.svg';
import linkedin from '../../images/linkedin-icon.svg';
import mastodon from '../../images/mastodon-icon.svg';

const social = [
  {
    label: 'Twitter',
    to: 'https://twitter.com/yldio',
    img: twitter,
  },
  {
    label: 'Github',
    to: 'https://github.com/yldio',
    img: github,
  },
  {
    label: 'Youtube',
    to: 'https://www.youtube.com/channel/UCjCCJWM2iVVhqjKzJ-Y9MvA',
    img: youtube,
  },
  {
    label: 'Mastodon',
    to: 'https://mastodon.social/@yld',
    img: mastodon,
  },
  {
    label: 'Medium',
    to: 'https://medium.com/yld-blog',
    img: medium,
  },
  {
    label: 'Instagram',
    to: 'https://www.instagram.com/yld.io/',
    img: instagram,
  },
  {
    label: 'Linkedin',
    to: 'https://www.linkedin.com/company/yld/',
    img: linkedin,
  },
  {
    label: 'Dribbble',
    to: 'https://dribbble.com/yld',
    img: dribbble,
  },
  {
    label: 'Behance',
    to: 'https://www.behance.net/YLDio',
    img: behance,
  },
];

const gdpr = [
  {
    label: 'Contact',
    to: '/contact/',
  },
  {
    label: 'Cookies',
    to: '/cookie-policy/',
  },
  {
    label: 'Privacy policy',
    to: '/privacy-policy/',
  },
  {
    label: 'Data-retention policy',
    to: '/data-retention-policy/',
  },
];

export { social, gdpr };
