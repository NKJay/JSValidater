module.exports = {
  objectVertify (requestParams, validateRuleParamList) {
    for (const [vrParamName, vrParamRule] of Object.entries(validateRuleParamList)) {
      const {type, nullable = false} = vrParamRule
      const requestParam = requestParams[vrParamName]
      const result = this.nullableAndTypeVertify(requestParam, type, nullable, vrParamName)
      if (!result) {
        continue
      }
      this.typeVertify(requestParam, type, vrParamName)
      if (type === 'array') {
        for (const item of requestParams[vrParamName]) {
          this.objectVertify(item, vrParamRule['item'])
        }
      }
    }
  },

  //   arrayVertify (requestParams, validateRule) {
  //     const {count} = validateRule
  //     if (count && requestParams.length) {
  //       throw new Error(`Argunment ${vrParamName} non-existent`)
  //     }
  //     for (const item of requestParams[vrParamName]) {
  //       this.objectVertify(item, vrParamRule['item'])
  //     }
  //   },

  stringVertify () {

  },

  numberVertify () {

  },

  typeVertify (requestParam, type, vrParamName) {
    const paramType = Array.isArray(requestParam) ? 'array' : typeof requestParam

    if (type !== paramType) {
      throw new Error(`Argunment ${vrParamName} type incompatible`)
    }
    return true
  },

  nullableVertify (requestParam, type, nullable, vrParamName) {
    if (!type) throw new Error(`${vrParamName} has no specify type `)
    if (requestParam === undefined) {
      if (!nullable) throw new Error(`Argunment ${vrParamName} non-existent`)
      return false
    }
    return true
  }
}
