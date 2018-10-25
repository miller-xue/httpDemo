const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    // 1.读取html
    const html = fs.readFileSync('test.html','utf8')
    response.writeHead(200,{
        'Content-type': 'text/html' // 返回类型
    })
    // 2.返回给前台
    response.end(html)
}).listen(8888)

console.log('server listening on 8888')