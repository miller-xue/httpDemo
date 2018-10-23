const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    if(request.url === "/"){
        const html = fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            'Content-type': 'text/html'
        })
        response.end(html)
    }

    if(request.url === '/script.js'){
        response.writeHead(200,{
            'Content-type': 'text/javascript',
            'Cache-Control': 'no-store'
        })
        response.end('console.log("script loaded twice")')
    }
    
}).listen(8888)


/**
 * 'Cache-Control': 'no-cache' // 没有效果  无缓存
 * 
 * 'Cache-Control': 'no-store' // 禁止缓存，无缓存 无效果
 * 
 * 'Cache-Control': 'max-age=1000' //缓存 直接从浏览器访问
 */

console.log('server listening on 8888')