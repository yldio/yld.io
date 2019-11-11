const groups = [
  {
    id: 28180588,
    name: 'Manchester Web Meetup',
    status: 'active',
    link: 'https://www.meetup.com/Manchester-Web-Meetup/',
    urlname: 'Manchester-Web-Meetup',
    description: '__MOCK_DESCRIPTION__MANCHESTER__',
    created: 1523872002000,
    city: 'Manchester',
    untranslated_city: 'Manchester',
    country: 'GB',
    localized_country_name: 'United Kingdom',
    localized_location: 'Manchester, United Kingdom',
    region2: 'Greater Manchester',
    state: '18',
    join_mode: 'open',
    visibility: 'public',
    lat: 53.48,
    lon: -2.25,
    members: 1054,
    who: 'Manc Webbers',
    key_photo: {
      id: 475751780,
      highres_link:
        'https://secure.meetupstatic.com/photos/event/2/e/0/4/highres_475751780.jpeg',
      photo_link:
        'https://secure.meetupstatic.com/photos/event/2/e/0/4/600_475751780.jpeg',
      thumb_link:
        'https://secure.meetupstatic.com/photos/event/2/e/0/4/thumb_475751780.jpeg',
      type: 'event',
      base_url: 'https://secure.meetupstatic.com',
    },
    timezone: 'Europe/London',
    category: {
      id: 34,
      name: 'Tech',
      shortname: 'tech',
      sort_name: 'Tech',
    },
    meta_category: {
      id: 292,
      shortname: 'tech',
      name: 'Tech',
      sort_name: 'Tech',
      photo: {
        id: 450131949,
        highres_link:
          'https://secure.meetupstatic.com/photos/event/2/e/a/d/highres_450131949.jpeg',
        photo_link:
          'https://secure.meetupstatic.com/photos/event/2/e/a/d/600_450131949.jpeg',
        thumb_link:
          'https://secure.meetupstatic.com/photos/event/2/e/a/d/thumb_450131949.jpeg',
        type: 'event',
        base_url: 'https://secure.meetupstatic.com',
      },
      category_ids: [34],
    },
  },
  {
    id: 23599684,
    name: 'Digital Product London',
    status: 'active',
    link: 'https://www.meetup.com/Digital-Product-London/',
    urlname: 'Digital-Product-London',
    description:
      '<p>Digital Product&nbsp;London&nbsp;gathers top digital product minds to explore, explain and discuss challenging concepts, from product design to engineering culture.</p>',
    created: 1493975078000,
    city: 'London',
    untranslated_city: 'London',
    country: 'GB',
    localized_country_name: 'United Kingdom',
    localized_location: 'London, United Kingdom',
    region2: 'Greater London',
    state: '17',
    join_mode: 'open',
    visibility: 'public',
    lat: 51.52,
    lon: -0.1,
    members: 1105,
    who: 'Digital Product Enthusiasts',
    group_photo: {
      id: 469494079,
      highres_link:
        'https://secure.meetupstatic.com/photos/event/d/3/3/f/highres_469494079.jpeg',
      photo_link:
        'https://secure.meetupstatic.com/photos/event/d/3/3/f/600_469494079.jpeg',
      thumb_link:
        'https://secure.meetupstatic.com/photos/event/d/3/3/f/thumb_469494079.jpeg',
      type: 'event',
      base_url: 'https://secure.meetupstatic.com',
    },
    key_photo: {
      id: 469493912,
      highres_link:
        'https://secure.meetupstatic.com/photos/event/d/2/9/8/highres_469493912.jpeg',
      photo_link:
        'https://secure.meetupstatic.com/photos/event/d/2/9/8/600_469493912.jpeg',
      thumb_link:
        'https://secure.meetupstatic.com/photos/event/d/2/9/8/thumb_469493912.jpeg',
      type: 'event',
      base_url: 'https://secure.meetupstatic.com',
    },
    timezone: 'Europe/London',
    category: {
      id: 34,
      name: 'Tech',
      shortname: 'tech',
      sort_name: 'Tech',
    },
    meta_category: {
      id: 292,
      shortname: 'tech',
      name: 'Tech',
      sort_name: 'Tech',
      photo: {
        id: 450131949,
        highres_link:
          'https://secure.meetupstatic.com/photos/event/2/e/a/d/highres_450131949.jpeg',
        photo_link:
          'https://secure.meetupstatic.com/photos/event/2/e/a/d/600_450131949.jpeg',
        thumb_link:
          'https://secure.meetupstatic.com/photos/event/2/e/a/d/thumb_450131949.jpeg',
        type: 'event',
        base_url: 'https://secure.meetupstatic.com',
      },
      category_ids: [34],
    },
  },
];

// Create a mock generator function to enable us to validate against
// passed in values further in the test
module.exports = urlNames => {
  if (urlNames.length !== groups.length) {
    const msg = `Need the same length of urlNames and groups in the groups.js mock generator!
urlNames: ${urlNames.length}
groups: ${groups.length}
    `;
    throw new Error(msg);
  }

  return groups.map((group, idx) => ({
    ...group,
    urlname: urlNames[idx],
  }));
};
