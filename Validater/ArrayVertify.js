
module.exports = (requestParams, paramVertifyInfo) => {
  const [vrParamName, vrParamRule] = paramVertifyInfo
  const {minLength, maxLength} = vrParamRule
  if (minLength !== undefined && requestParams.length < minLength) {
    throw new Error(`Argument ${vrParamName} Array length is shorter then specified length`)
  }

  if (maxLength !== undefined && requestParams.length > maxLength) {
    throw new Error(`Argument ${vrParamName} Array length is longer then specified length`)
  }
}
