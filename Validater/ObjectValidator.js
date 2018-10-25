const VertifyTool = require('../VertifyTool')
module.exports = function objectVertify (requestParams, validateRuleParamList) {
  for (const [vrParamName, vrParamRule] of Object.entries(validateRuleParamList)) {
    const type = vrParamRule['type']
    if (!type) throw new Error(`${vrParamName} has no specify type `)
    const nullable = vrParamRule['nullable']
    if (requestParams[vrParamName] === undefined) {
      if (!nullable) throw new Error(`Argunment ${vrParamName} non-existent`)
      continue
    }

    if (type !== (VertifyTool.requestTypeOf(requestParams[vrParamName]))) {
      throw new Error(`Argunment ${vrParamName} type incompatible`)
    } else if (type === 'array') {
      const arrayItem = vrParamRule['item']
      for (const item of requestParams[vrParamName]) {
        this.objectVertify(item, arrayItem)
      }
    } else if (type === 'object') {
      const objectItem = vrParamRule['item']
      this.objectVertify(requestParams[vrParamName], objectItem)
    }
  }
}
