const ParamsList = require('../ParamsList')
const ValidateRlt = require('./ValidateRlt')
const VertifyTool = require('./VertifyTool')

module.exports = class Validater {
  static paramsVertify (url, requestMethod, requestParams) {
    const validateRule = ParamsList[url]
    if (!validateRule) {
      return new ValidateRlt(true, 'validate rule non-existent')
    }
    const validateRuleParams = validateRule.params
    if (validateRule.method !== requestMethod) {
      const msg = 'Request method not allow'
      const result = false
      return new ValidateRlt(result, msg)
    }
    let result = true
    let message = 'Success'
    try {
      VertifyTool.objectVertify(requestParams, validateRuleParams)
    } catch (error) {
      result = false
      message = error.message
    }

    return new ValidateRlt(result, message)
  }
}
