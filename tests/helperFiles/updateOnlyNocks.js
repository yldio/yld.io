const nock = require('nock')
const { CONTENTFUL_SPACE } = process.env

const updateContentfulEntryNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4`
    )
    .reply(204, '')
    .put(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4`,
      {
        fields: {
          thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
          meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
          linkToEvent: {
            'en-US':
              'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
          },
          date: { 'en-US': '2018-07-17' },
          startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
          endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
          address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
          eventTitle: {
            'en-US':
              'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
          },
          blurb: {
            'en-US':
              'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
          }
        }
      }
    )
    .reply(200, {
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: 'g6423bljuuyt' } },
        id: '2C3au2K5VaQiyOeowekkM4',
        type: 'Entry',
        createdAt: '2018-06-29T10:42:40.378Z',
        updatedAt: '2018-07-03T10:51:29.183Z',
        environment: {
          sys: { id: 'master', type: 'Link', linkType: 'Environment' }
        },
        createdBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        updatedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedCounter: 25,
        version: 58,
        publishedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedVersion: 56,
        firstPublishedAt: '2018-06-29T10:42:41.431Z',
        publishedAt: '2018-07-03T10:40:38.345Z',
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'meetupEven' }
        }
      },
      fields: {
        thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
        meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
        eventTitle: {
          'en-US':
            'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
        },
        date: { 'en-US': '2018-07-17' },
        startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
        endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
        address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
        linkToEvent: {
          'en-US':
            'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
        },
        blurb: {
          'en-US':
            'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
        }
      }
    })

const publishUpdatedEntryNock = () =>
  nock('https://api.contentful.com/')
    .defaultReplyHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'DELETE,GET,HEAD,POST,PUT,OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Accept,Accept-Language,Authorization,Cache-Control,Content-Length,Content-Range,Content-Type,DNT,Destination,Expires,If-Match,If-Modified-Since,If-None-Match,Keep-Alive,Last-Modified,Origin,Pragma,Range,User-Agent,X-Http-Method-Override,X-Mx-ReqToken,X-Requested-With,X-Contentful-Version,X-Contentful-Content-Type,X-Contentful-Organization,X-Contentful-Skip-Transformation,X-Contentful-User-Agent,X-Contentful-Enable-Alpha-Feature'
    })
    .options(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4/published`
    )
    .reply(204, '')
    .put(
      `/spaces/${CONTENTFUL_SPACE}/environments/master/entries/2C3au2K5VaQiyOeowekkM4/published`
    )
    .reply(200, {
      sys: {
        space: { sys: { type: 'Link', linkType: 'Space', id: 'g6423bljuuyt' } },
        id: '2C3au2K5VaQiyOeowekkM4',
        type: 'Entry',
        createdAt: '2018-06-29T10:42:40.378Z',
        updatedAt: '2018-07-03T14:01:59.449Z',
        environment: {
          sys: { id: 'master', type: 'Link', linkType: 'Environment' }
        },
        createdBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        updatedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedCounter: 33,
        version: 73,
        publishedBy: {
          sys: { type: 'Link', linkType: 'User', id: '4S85cDvPUPr1sI13p6pT26' }
        },
        publishedVersion: 72,
        firstPublishedAt: '2018-06-29T10:42:41.431Z',
        publishedAt: '2018-07-03T14:01:59.449Z',
        contentType: {
          sys: { type: 'Link', linkType: 'ContentType', id: 'meetupEven' }
        }
      },
      fields: {
        thisMeetupCode: { 'en-US': 'ReactJS-Girls-London-251946999' },
        meetupUrlName: { 'en-US': 'ReactJS-Girls-London' },
        eventTitle: {
          'en-US':
            'ReactJS Girls #11 -  Reason, the good, the bad and ugly bits'
        },
        date: { 'en-US': '2018-07-17' },
        startTime: { 'en-US': '2018-07-17T17:00:00.000Z' },
        endTime: { 'en-US': '2018-07-17T19:30:00.000Z' },
        address: { 'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London' },
        linkToEvent: {
          'en-US':
            'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
        },
        blurb: {
          'en-US':
            'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
        }
      }
    })

module.exports = {
  updateContentfulEntryNock,
  publishUpdatedEntryNock
}
