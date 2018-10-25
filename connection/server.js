const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request home',request.url)
    const html = fs.readFileSync('test.html','utf8')

    const img = fs.readFileSync('test.png');
    if(request.url === '/'){
        response.writeHead(200,{
            'Content-type': 'text/html',
            'Connection': 'close'
        })
        response.end(html)
    }else {
        response.writeHead(200,{
            'Content-type': 'image/png',
            'Connection': 'close'
        })
        response.end(img)
    }
    
    
    
}).listen(8888)
/**
 * Connection: keep-alive or close
 * http 1.1
 * http请求是在tcp连接上发送的 一个tcp连接可以发送多个http请求 1.1 发送是有先后顺序的，为了性能就是开启并发 多个tcp
 * 
 * chrome 支持最高 6 个tcp同时并发 一tcp连接 一次只能发送一个http请求 先后顺序
 * 
 * 
 * 
 * http 2
 * 只需要一个tcp 并发的是http请求
 */
console.log('server listening on 8888')