const lambda = require('../../src/functions/meetup')
const contentfulManagement = require('contentful-management')
const meetupAPI = require('meetup-api')
const util = require('util')

const {
  CONTENTFUL_SPACE,
  MEETUP_KEY,
  CMS_CRUD,
  LAMBDA_ENV = 'development'
} = process.env

const meetupGroupResponse = require('../helperFiles/rawMeetupData')

describe('meetup lambda test', () => {
  jest.mock('util')
  jest.mock('contentful-management')
  let response

  beforeAll(async () => {
    contentfulManagement.createClient

    contentfulManagement.getSpace = jest.fn(() => {
      JSON.stringify({
        name: 'blog',
        sys: {
          type: 'Space',
          id: `${CONTENTFUL_SPACE}`,
          version: 1,
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          createdAt: '2018-05-15T10:17:29Z',
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          updatedAt: '2018-05-15T10:17:29Z'
        }
      })
    })

    contentfulManagement.getEnvironment = jest.fn(() => {
      JSON.stringify({
        name: 'master',
        sys: {
          type: 'Environment',
          id: 'master',
          version: 1,
          space: {
            sys: { type: 'Link', linkType: 'Space', id: `${CONTENTFUL_SPACE}` }
          },
          status: { sys: { type: 'Link', linkType: 'Status', id: 'ready' } },
          createdBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          createdAt: '2018-05-15T10:17:29Z',
          updatedBy: {
            sys: {
              type: 'Link',
              linkType: 'User',
              id: '7f3sAHq8V2LEdXnMsJ2pmW'
            }
          },
          updatedAt: '2018-05-15T10:17:29Z'
        }
      })
    })

    contentfulManagement.getEntries = jest.fn(() => {
      return {
        items: [
          {
            sys: {
              space: {
                sys: { type: 'Link', linkType: 'Space', id: 'g6423bljuuyt' }
              },
              id: '2C3au2K5VaQiyOeowekkM4',
              type: 'Entry',
              createdAt: '2018-06-29T10:42:40.378Z',
              updatedAt: '2018-07-03T10:11:05.045Z',
              environment: {
                sys: { id: 'master', type: 'Link', linkType: 'Environment' }
              },
              createdBy: {
                sys: {
                  type: 'Link',
                  linkType: 'User',
                  id: '4S85cDvPUPr1sI13p6pT26'
                }
              },
              updatedBy: {
                sys: {
                  type: 'Link',
                  linkType: 'User',
                  id: '4S85cDvPUPr1sI13p6pT26'
                }
              },
              publishedCounter: 18,
              version: 43,
              publishedBy: {
                sys: {
                  type: 'Link',
                  linkType: 'User',
                  id: '4S85cDvPUPr1sI13p6pT26'
                }
              },
              publishedVersion: 42,
              firstPublishedAt: '2018-06-29T10:42:41.431Z',
              publishedAt: '2018-07-03T10:11:05.045Z',
              contentType: {
                sys: {
                  type: 'Link',
                  linkType: 'ContentType',
                  id: 'meetupEvent'
                }
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
              address: {
                'en-US': 'JP Morgan&&4 John Carpenter St&&&&&&London'
              },
              linkToEvent: {
                'en-US':
                  'https://www.meetup.com/ReactJS-Girls-London/events/251946999/'
              },
              blurb: {
                'en-US':
                  'Kara Stubbs (@kiraarghy), a Software Engineer at MOO, talks about her experience with React and ReactReason.'
              }
            }
          }
        ]
      }
    })

    response = await lambda.handler({
      headers: {
        authorization: 'basic foo_test_thingy'
      }
    })
  })

  it('Runs the lambda', () => {
    expect(contentfulManagement.getSpace).toHaveBeenCalledTimes(1)
  })
})
