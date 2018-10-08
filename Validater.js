const ParamsList = require('../ParamsList')
class ValidateResult {
  constructor (result, msg) {
    this.result = result
    this.msg = msg
  }

  getMsg () {
    return this.msg
  }

  getResult () {
    return this.result
  }
}

module.exports = class Validater {
  static paramsVertify (url, requestMethod, requestParams) {
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
      Validater.objectVertify(requestParams, validateRuleParams)
    } catch (error) {
      result = false
      message = error.message
    }

    return new ValidateResult(result, message)
  }

  static objectVertify (requestParams, validateRuleParamList) {
    for (const [vrParamName, vrParamRule] of Object.entries(validateRuleParamList)) {
      const type = vrParamRule['type']
      if (!type) throw new Error(`${vrParamName} has no specify type `)
      const nullable = vrParamRule['nullable']
      if (requestParams[vrParamName] === undefined) {
        if (!nullable) throw new Error(`Argunment ${vrParamName} non-existent`)
        continue
      }

      if (type !== (this.requestTypeOf(requestParams[vrParamName]))) {
        throw new Error(`Argunment ${vrParamName} type incompatible`)
      } else if (type === 'array') {
        for (const item of requestParams[vrParamName]) {
          this.objectVertify(item, vrParamRule['item'])
        }
      }
    }
  }

  static requestTypeOf (value) {
    let type = value
    if (Array.isArray(value)) type = 'array'
    else type = typeof value
    return type
  }
}
