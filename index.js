const ParamsList = require('../../ParamsList')
const valueVertify = require('./Validater')
const ValidateResult = require('./ValidateRlt')

module.exports = {
  paramsVertify (url, requestMethod, requestParams) {
    const validateRule = ParamsList[url]
    if (!validateRule) {
      return new ValidateResult(true, 'validate rule non-existent')
    }
    if (validateRule['method'] !== requestMethod) {
      const msg = 'Request method not allow'
      const result = false
      return new ValidateResult(result, msg)
    }
    let result = true
    let message = 'Success'
    try {
      valueVertify(requestParams, validateRule)
    } catch (error) {
      result = false
      message = error.message
    }

    return new ValidateResult(result, message)
  }
}
