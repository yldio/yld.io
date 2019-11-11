module.exports = ct =>
  ct.fields.reduce(
    ({ allFields = [], requiredFields = [] }, { required, id }) => ({
      allFields: allFields.concat(id),
      requiredFields: required ? requiredFields.concat(id) : requiredFields,
    }),
    [],
  )
