/* eslint-disable */

function isArray(data) {
    return Array.isArray(data)
}

function isObject(data) {
    return (typeof data === 'object') && !(Array.isArray(data)) && !(data instanceof Set) && !(data instanceof Map)
}

class FindValue {
    constructor(data) {
        if (data === undefined || !(isObject(data) || isArray(data))) {
            return console.log('请传入正确的原始数据')
        }
        this.data = data
        this._afterChangeData = new Map(this._changeDataKey(data))
    }

    /**
     * 将复杂嵌套数据结构平铺，生成指定规则key便于查找（目前不支持嵌套 Map Set数据格式）
     * @param  {Object | Array} data   原始数据
     * @param  {Array} [lists]  递归使用
     * @param  {string} [prefix] 递归使用
     * @return {Array}        返回一个数组
     */
    _changeDataKey(data, list = [], prefix) {
        const before = prefix || ''
        if (isObject(data)) {
            Object.keys(data).forEach((item) => {
                const beforeItem = before + item
                const currentData = data[item]
                if (isObject(currentData) || isArray(currentData)) {
                    list.push([beforeItem, currentData])
                    this._changeDataKey(currentData, list, (`${beforeItem}/`))
                } else {
                    list.push([beforeItem, currentData])
                }
            })
        } else if (isArray(data)) {
            data.forEach((item, index) => {
                const beforeItem = before + index
                const currentData = data[index]
                if (isObject(currentData) || isArray(currentData)) {
                    list.push([beforeItem, currentData])
                    this._changeDataKey(currentData, list, (`${beforeItem}/`))
                } else {
                    const beforeItem = before + index
                    list.push([beforeItem, currentData])
                }
            })
        }
        return list
    }

    /**
     * 查找指定Key对应的数据
     * @param  {Array} find 传入需要查的key，例如['name'] 查找name字段内容，有重名建议添加多个key['fatherKey', 'key']，只要是祖先的key 都可以
     * @param  {} [defValue] 当未查询到时是用的默认数据，可以是任意类型数据
     * @return {Object} Object.code 是查询状态 0 成功 1失败 Object.value 是查询数据失败时数据为defValue, defValue没有则为''空字符串
     */
    find(find, defValue) {
        const str = `.*${find.join('.*')}.*`
        const reg = RegExp(str)
        console.log(this)
        for (const key of this._afterChangeData.keys()) {
            if (reg.test(key)) {
                return { code: 0, value: this._afterChangeData.get(key) }                                                              
            }
        }
        return { code: 1, value: defValue !== undefined ? defValue : '' }
    }
}

module.exports = FindValue
