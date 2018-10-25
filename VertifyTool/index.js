module.exports = {
  requestTypeOf (value) {
    let type = value
    if (Array.isArray(value)) type = 'array'
    else type = typeof value
    return type
  }
}
