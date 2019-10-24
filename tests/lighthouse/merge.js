// merge functions asserting that all values are equal and taking any one of them

const assertEqualValues = values =>
  values.reduce((a, b) => {
    expect(a).toStrictEqual(b)
    return a
  })

// merge function summing the number values

const sum = numbers => numbers.reduce((acc, number) => acc + number, 0)

// merge function sorting the number values ascending and taking the value at a percentile (p in [0, 1])

const percentile = p => numbers => {
  const sortedNumbers = [...numbers].sort((a, b) => a - b)
  const decimalIndex = (numbers.length - 1) * p
  const closestIndex = Math.round(decimalIndex)
  // Check that there are actually enough numbers to use this percentile.
  // E.g. 5 numbers are not enough for a 90th percentile, but 10 are.
  expect(closestIndex).toBeCloseTo(decimalIndex)
  return sortedNumbers[closestIndex]
}

// merge function taking the value with the median number in its given property

const medianByProperty = property => objects => {
  const sortedObjects = [...objects].sort((a, b) => a[property] - b[property])
  const medianIndex = Math.floor(objects.length / 2)
  return sortedObjects[medianIndex]
}

// helpers for merging specific properties

const mergePropertiesValues = (mergeFn, properties, objects) =>
  properties.reduce(
    (resultObject, property) => ({
      ...resultObject,
      [property]: mergePropertyValues(mergeFn, property, objects)
    }),
    {}
  )

const mergePropertyValues = (mergeFn, property, objects) =>
  mergeFn(objects.map(object => object[property]))

// timing

const mergeTimings = timings => ({
  total: mergePropertyValues(sum, 'total', timings)
})

// categories

const mergeCategoryMaps = categoryMaps =>
  mergePropertiesValues(
    medianByProperty('score'),
    Object.keys(categoryMaps[0]),
    categoryMaps
  )

// audits

const constantAuditProperties = [
  'id',
  'title',
  'description',
  'explanation',
  'warnings',
  'errorMessage',
  'numericValue',
  'displayValue',
  'score',
  'scoreDisplayMode'
]

const mergeAudits = audits => {
  const { scoreDisplayMode } = audits[0]
  switch (scoreDisplayMode) {
    case 'binary':
    case 'numeric':
      return medianByProperty('score')(audits)
    case 'informative':
      if (audits[0].numericValue !== undefined) {
        return medianByProperty('numericValue')(audits)
      }
      if (audits[0].displayValue !== undefined) {
        return medianByProperty('score')(audits) // score may not actually be defined, but it's informative, so we'll take any
      }
    // eslint-disable no-fallthrough
    case 'error':
    case 'manual':
    case 'notApplicable':
      return {
        ...mergePropertiesValues(
          assertEqualValues,
          constantAuditProperties,
          audits
        ),
        details: audits[0].details // Details can be unstable, but as long as the general audit result is constant, we'll take any
      }
    default:
      throw new Error(`Unknown scoreDisplayMode ${scoreDisplayMode}`)
  }
}

const mergeAuditMaps = auditMaps =>
  mergePropertiesValues(mergeAudits, Object.keys(auditMaps[0]), auditMaps)

// result

const constantResultProperties = [
  'lighthouseVersions',
  'userAgent',
  'requestedUrl',
  'finalUrl',
  'configSettings',
  'categoryGroups',
  'runtimeError',
  'runWarnings'
]

const mergeLighthouseResults = results => {
  return {
    ...mergePropertiesValues(
      assertEqualValues,
      constantResultProperties,
      results
    ),
    fetchTime: mergePropertyValues(percentile(1), 'fetchTime', results),
    timing: mergePropertyValues(mergeTimings, 'timing', results),
    categories: mergePropertyValues(mergeCategoryMaps, 'categories', results),
    audits: mergePropertyValues(mergeAuditMaps, 'audits', results)
  }
}

export default mergeLighthouseResults
