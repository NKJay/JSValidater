module.exports = (requestParams, paramVertifyInfo) => {
  const [vrParamName, vrParamRule] = paramVertifyInfo
  if (!requestParams) {
    throw new Error(`Arguments ${vrParamName} is empty string`)
  }
}
