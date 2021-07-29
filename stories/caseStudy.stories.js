import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import Theme from './theme';
import CaseStudies from '../src/components/Common/case-studies/CaseStudies';

const economistImage = {
  fluid: {
    base64: null,
    aspectRatio: null,
    src: null,
    srcSet: null,
    srcWebp: null,
    srcSetWebp: null,
    sizes: null,
  },
  title: 'The Economist case study featured image ',
  file: {
    url: 'https://images.ctfassets.net/22g1lenhck4z/7gxjSPslc53u7r7kYZpzo/c9fdac04b66e4e03f2947e0caaca212f/our_work_economist.svg?h=250',
  },
};
const TheEconomistCaseStudy = {
  slug: 'the-economist-creating-a-better-reading-experience',
  title: 'Migrating The Economist platform',
  services: ['Engineering'],
  client: 'The Economist',
  reverseColor: true,
  previewImage: economistImage,
  posterImage: economistImage,
  posterColor: 'E02A1B',
  introSentence: {
    introSentence:
      'We created a mobile-first, content-led, better reading experience for global digital users, improving the site architecture while delivering a more flexible solution.',
  },
};
const trainlineImage = {
  fluid: {
    base64: null,
    aspectRatio: null,
    src: null,
    srcSet: null,
    srcWebp: null,
    srcSetWebp: null,
    sizes: null,
  },
  title: 'Trainline case study featured image ',
  file: {
    url: 'https://images.ctfassets.net/22g1lenhck4z/3uU0sfGdOiOCA6XqDy1vFM/6bc9b38aa78591d29a8ceed1ddfd5120/our_work_trainline.svg?h=250',
  },
};
const TrainlineCaseStudy = {
  slug: 'future-proofing-trainline',
  title: 'Future-proofing Trainline',
  services: ['Engineering', 'Training'],
  client: 'Trainline',
  reverseColor: true,
  previewImage: trainlineImage,
  posterImage: trainlineImage,
  posterColor: '071a41',
  introSentence: {
    introSentence:
      'We wrapped the platforms in an efficient and scalable Node.js layer, contributing to an enhanced user experience.',
  },
};
const kingfisherImage = {
  fluid: {
    base64: null,
    aspectRatio: null,
    src: null,
    srcSet: null,
    srcWebp: null,
    srcSetWebp: null,
    sizes: null,
  },
  title: 'Kingfischer illustration',
  file: {
    url: 'https://images.ctfassets.net/22g1lenhck4z/2enktDdbf4MBhD4zzw2KAw/94fa7bd87fcd12998c3f059bd11c9bdc/our_work_kingfisher.svg?h=250',
  },
};
const KingfisherCaseStudy = {
  slug: 'kingfisher-support-scale-adapt',
  title: 'Kingfisher: support, scale, adapt',
  services: ['Engineering', 'Training'],
  client: 'Kingfisher',
  reverseColor: true,
  previewImage: kingfisherImage,
  posterImage: kingfisherImage,
  posterColor: '1B1A4C',
  introSentence: {
    introSentence:
      'Kingfisher used our Node.js expertise to bring scalability and adaptability to their team; enabling them to quickly build resilient services that can withstand a challenges.',
  },
};
const caseStudies = [
  TheEconomistCaseStudy,
  TrainlineCaseStudy,
  KingfisherCaseStudy,
];

addDecorator(Theme);

storiesOf('CaseStudy', module)
  .addDecorator(withKnobs)
  .add('Case Studies', () => (
    <CaseStudies
      limited={boolean(
        'Limit number of case studies based on screen size',
        false,
      )}
      hideSparseRows={boolean(
        'Hide the last row if there are too few elements',
        false,
      )}
      caseStudies={[...Array(number('Number of case studies', 3)).keys()].map(
        (i) => ({
          ...caseStudies[i % 3],
          slug: `case-study-${i}`,
        }),
      )}
    />
  ));
