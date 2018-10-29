const objectVertify = require('./ObjectVertify')
const arrayVertify = require('./ArrayVertify')
const stringVertify = require('./StringVertify')
const numberVerify = require('./NumberVertify')
const booleanVertify = require('./BooleanVertify')

const VertifyTool = require('./VertifyTool')

function isArray (data) {
  return Array.isArray(data)
}

function isObject (data) {
  return (typeof data === 'object') && !(Array.isArray(data)) && !(data instanceof Set) && !(data instanceof Map) && data !== null
}

const _changeDataKey = (data, paramRuleInfo, list = [], prefix = '') => {
  if (isObject(data)) {
    Object.keys(data).forEach((item) => {
      const beforeItem = prefix + item
      const currentData = data[item]
      const objectParamRuleInfo = paramRuleInfo['params']

      list.push([beforeItem, currentData])
      valueVertify(currentData, [beforeItem, objectParamRuleInfo[item]])

      if (isObject(currentData) || isArray(currentData)) {
        _changeDataKey(currentData, objectParamRuleInfo[item], list, (`${beforeItem}/`))
      }
    })
  } else if (isArray(data)) {
    data.forEach((item, index) => {
      const beforeItem = prefix + index
      const currentData = data[index]
      list.push([beforeItem, currentData])
      if (isObject(currentData) || isArray(currentData)) {
        valueVertify(currentData, [beforeItem, paramRuleInfo['item']])
        _changeDataKey(currentData, paramRuleInfo['item'], list, (`${beforeItem}/`))
      } else {
        const beforeItem = prefix + index
        valueVertify(currentData, [beforeItem, paramRuleInfo])
      }
    })
  }
  return list
}

const valueVertify = (targetValue, paramVertifyInfo) => {
  const [paramName, paramRule] = paramVertifyInfo
  if (!paramRule) {
    console.log(`Argument ${paramName} rule undefined,skip vertify`)
    return
  }
  const isExsits = VertifyTool.existsVertify(targetValue, paramVertifyInfo)
  if (!isExsits) return

  const type = VertifyTool.typeVertify(targetValue, paramVertifyInfo)

  switch (type) {
    case 'array':
      arrayVertify(targetValue, paramVertifyInfo)
      break
    case 'object':
      objectVertify(targetValue, paramVertifyInfo)
      break
    case 'string':
      stringVertify(targetValue, paramVertifyInfo)
      break
    case 'number':
      numberVerify(targetValue, paramVertifyInfo)
      break
    case 'boolean':
      booleanVertify(targetValue, paramVertifyInfo)
      break
    default:
      throw new Error('internal error')
  }
}

module.exports = (requestParams, paramRuleInfo) => {
  _changeDataKey(requestParams, paramRuleInfo)
}
