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
        const etag = request.headers['if-none-match']
        console.log('etag',etag)
        if(etag === '777'){
            response.writeHead(304, {
                'Content-type': 'text/javascript',
                'Cache-Control': '', // 每次请求都得去服务器端重新验证
                'Last-Modified': '123', // 最后一次修改时间
                'Etag': '777' // 数据签名
            })
            response.end('123123')
        }else{
            response.writeHead(200, {
                'Content-type': 'text/javascript',
                'Cache-Control': '', // 每次请求都得去服务器端重新验证
                'Last-Modified': '123', // 最后一次修改时间
                'Etag': '777' // 数据签名
            })
            response.end('console.log("script loaded twice")')
        }

        
    }
    
}).listen(8888)
/**
 * 'Cache-Control': 'max-age=2000000, no-store' 永远都会从服务器端拿去新资源，无视一切缓存 无视  max-age
 * 
 * 'Cache-Control': 'max-age=2000000, no-cache' 即使有缓存每次都回到服务器端做验证 配合 Last-Modified 和 Etag 做缓存验证
 * 
 * 'Cache-Control': 'max-age=2000000' 直接走浏览器缓存不进入后台 不能和 Last-Modified 和 Etag 做缓存验证
 * 
 * 
 * 
 * 
 * 
 * 
 * 不加 max-age  就浏览器默认永久缓存
 * 
 *  'Cache-Control': ' no-cache' 即使有缓存每次都回到服务器端做验证 配合 Last-Modified 和 Etag 做缓存验证 没有缓存过期时间
 * 
 * 如果不加 Cache-Control Last-Modified 和 Etag 做缓存验证 
 */

console.log('server listening on 8888')