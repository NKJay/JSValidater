const FindValue = require('./FindValue')
module.exports = {
  requestTypeOf (value) {
    let type = value
    if (Array.isArray(value)) type = 'array'
    else type = typeof value
    return type
  },

  typeVertify (value, paramVertifyInfo) {
    const [paramName, paramRule] = paramVertifyInfo
    const { type } = paramRule
    if (!type) {
      throw new Error(`${paramName} has no specify type `)
    }
    if (type !== this.requestTypeOf(value)) {
      throw new Error(`Argunment ${paramName} type incompatible`)
    }
    return type
  },

  existsVertify (value, paramVertifyInfo) {
    const [paramName, paramRule] = paramVertifyInfo
    const {nullable = false} = paramRule
    if (value === undefined || value === null) {
      if (!nullable) {
        throw new Error(`Argunment ${paramName} non-existent`)
      } else {
        return false
      }
    }
    return true
  },

  findValue (data) {
    return new FindValue(data)
  }
}
