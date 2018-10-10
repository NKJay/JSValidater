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
module.exports = ValidateResult
