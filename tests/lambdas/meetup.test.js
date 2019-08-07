const nock = require('nock')
const lambda = require('../../src/functions/meetup')

const {
  meetupSelfGroupNock,
  meetupEventNock,
  contentfulSpaceNock,
  contentfulEnvNock,
  contentfulGetEntriesNock,
  contentfulGetSingleEntryNock
} = require('../helperFiles/sharedNocks')

const {
  publishCreatedEntryNock,
  createContentfulEntryNock,
  contentfulGetEntriesNoMatchNock
} = require('../helperFiles/createOnlyNocks')

const {
  updateContentfulEntryNock,
  publishUpdatedEntryNock
} = require('../helperFiles/updateOnlyNocks')

describe('meetup lambda test - unchanged path', () => {
  let response
  nock.disableNetConnect()

  beforeAll(async () => {
    meetupSelfGroupNock()
    meetupEventNock()
    contentfulSpaceNock()
    contentfulEnvNock()
    contentfulGetEntriesNock()
    contentfulGetSingleEntryNock()
    response = await lambda.handler({
      headers: {
        authorization: 'basic foo_test_thingy'
      }
    })
  })

  it('Returns 200', () => {
    const desiredResponse = {
      statusCode: 200,
      body: 'Meetup function has finished running'
    }
    expect(response).toEqual(desiredResponse)
  })

  it('has run all the nocks it was given', () => {
    expect(nock.isDone).toBeTruthy()
  })
})

describe('meetup lambda test - create path', () => {
  let response
  nock.disableNetConnect()

  beforeAll(async () => {
    meetupSelfGroupNock()
    meetupEventNock()
    contentfulSpaceNock()
    contentfulEnvNock()
    contentfulGetEntriesNoMatchNock()
    createContentfulEntryNock()
    publishCreatedEntryNock()
    response = await lambda.handler({
      headers: {
        authorization: 'basic foo_test_thingy'
      }
    })
  })

  it('Returns 200', () => {
    const desiredResponse = {
      statusCode: 200,
      body: 'Meetup function has finished running'
    }
    expect(response).toEqual(desiredResponse)
  })

  it('has run all the nocks it was given', () => {
    expect(nock.isDone).toBeTruthy()
  })
})

describe('meetup lambda test - update path', () => {
  let response
  nock.disableNetConnect()

  beforeAll(async () => {
    meetupSelfGroupNock()
    meetupEventNock()
    contentfulSpaceNock()
    contentfulEnvNock()
    contentfulGetEntriesNock()
    contentfulGetSingleEntryNock()
    updateContentfulEntryNock()
    publishUpdatedEntryNock()
    response = await lambda.handler({
      headers: {
        authorization: 'basic foo_test_thingy'
      }
    })
  })

  it('Returns 200', () => {
    const desiredResponse = {
      statusCode: 200,
      body: 'Meetup function has finished running'
    }
    expect(response).toEqual(desiredResponse)
  })

  it('has run all the nocks it was given', () => {
    expect(nock.isDone).toBeTruthy()
  })
})
