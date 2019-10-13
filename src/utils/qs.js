/*
** create by @d1y in 2019-10-13
*/

export default class {

  static checkURL(str) {
    return /^https?:\/\/.*/i.test(str)
  }

  static toString({ url, list }) {
    let result = ''
    if (!this.checkURL(url) || !list.length) return ''
    list.forEach(item=> {
      const key = item.key
      const value = item.value || ''
      const str = `${key}=${value}&`
      result += str
    })
    result = result.slice(0,result.length-1)
    return `${ url }?${ result }`
  }

}