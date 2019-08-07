const nock = require('nock');


const {
    CONTENTFUL_SPACE,
    MEETUP_KEY,
    CMS_CRUD,
    LAMBDA_ENV = 'development'
} = process.env


const lambda = require('../../src/functions/meetup')


const {
    meetupSelfGroupNock,
    meetupEventNock,
    contentfulSpaceNock,
    contentfulEnvNock,
    contentfulGetEntriesNock,
    contentfulGetSingleEntryNock
} = require('../helperFiles/sharedNocks');

describe('meetup lambda test', () => {
    let response;
    nock.disableNetConnect();

    beforeAll(async () => {
        meetupSelfGroupNock();
        meetupEventNock();
        contentfulSpaceNock();
        contentfulEnvNock();
        contentfulGetEntriesNock();
        contentfulGetSingleEntryNock();
        response = await lambda.handler({
            headers: {
                authorization: 'basic foo_test_thingy'
            }
        })
    })

    it('It logs "Entry unchanged" message', () => {
        const desiredResponse = {
            statusCode: 200,
            body: 'Meetup function has finished running'
        }
        expect(response).toEqual(desiredResponse)
    })
})


