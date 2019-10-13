/**
 * @author [d1y]
 * @email [chenhonzhou@mail.com]
 * @create date 2019-10-13 21:56:17
 * @modify date 2019-10-13 21:56:17
 * @desc [代码片段]
 * @tips {
 * !!! 求别更新啊, 老子学不动了啊 by @d1y 2019-10-13 23:03
 * }
**/

const jquery = {
  tab: 'jqery',
  create: (data = {
    url: 'https://xx.com',
    data: {
      page: 1,
      limit: 20
    }
  })=>{
    // TODO: 结构错误
    let sp = ''
    for (let key in data.data) {
      const value = data.data[key]
      sp += `\n${ key }: ${ value }`
    }
    return `
  $.ajax({
    url: \`${ data.url }\`,
    methods: \`GET\`,
    data: {${ sp }\n},
    success(data) {
      // code
    },
    fail(err) {
      throw new Error(\`opps. error: \`, err)
    }
  })
`
  }
}


const fetch = {
  tab: 'fetch',
  create: (data = {
    url: 'https://xx.com?page=1&limit=20'
  })=> `
  let url = ${ data.url }
  fetch(url)
    .then(r=>r.json())
    .then(r=> {
      // code
    })
    .catch(err=> {
      throw new Error(\`opps. error: \`, err)
    })
`
}

const js = {
  tab: 'js原生',
  create: (data = {
    url: 'https://xx.com?page=1&limit=20'
  })=> `
  let url = ${ data.url }
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.send()
  xhr.onreadystatechange = e=> {
    let state = xhr.readyState == 4
    let code = xhr.status == 200
    if (state && code) {
      // code
    }
  }
`
}

const codes = [ js, fetch, jquery ]

const get = ()=> codes

const set = (key, data)=> codes[key].craete(data)

export default { get, set }