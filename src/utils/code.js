/**
 * @author [d1y]
 * @email [chenhonzhou@mail.com]
 * @create date 2019-10-13 21:56:17
 * @modify date 2019-10-13 21:56:17
 * @desc [代码片段]
**/

const jquery = `
  $.ajax({
    url: \`\`,
    methods: \`GET\`,
    data: {
      
    },
    success(data) {
      // code
    },
    fail(err) {
      throw new Error(\`opps. error: \`, err)
    }
  })
`

const fetch = `
  fetch(\`url\`)
    .then(r=>r.json())
    .then(r=> {
      // code
    })
    .catch(err=> {
      throw new Error(\`opps. error: \`, err)
    })
`

const js = `
  let xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.send()
  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log(xhr.responseText)
    }
  }
`
const codes = { js, fetch, jquery }
const get = key=> key ? codes[key] : codes

export default get