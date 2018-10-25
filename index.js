const ParamsList = require('../../ParamsList')
const Validater = require('./Validater')
const ValidateResult = require('./ValidateRlt')

module.exports = {
  paramsVertify (url, requestMethod, requestParams) {
    const validateRule = ParamsList[url]
    if (!validateRule) {
      return new ValidateResult(true, 'validate rule non-existent')
    }
    const validateRuleParams = validateRule['params']
    if (validateRule['method'] !== requestMethod) {
      const msg = 'Request method not allow'
      const result = false
      return new ValidateResult(result, msg)
    }
    let result = true
    let message = 'Success'
    try {
      Validater.ObjectVertify(requestParams, validateRuleParams)
    } catch (error) {
      result = false
      message = error.message
    }

    return new ValidateResult(result, message)
  }
}
