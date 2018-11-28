const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    if(request.url === '/'){
        // 302的语义是临时跳转 
        response.writeHead(301, {
            'Location': '/new'
        })

        // 301  是永久跳转 不需要浏览器访问后台在进行跳转 浏览器会缓存重定向的页面很久，除非用户手动清除
        /*response.writeHead(301, {
            'Location': '/new'
        })*/


        // 不会跳转
        /*response.writeHead(200, {
            'Location': '/new'
        })*/
        response.end('');
    }

    if(request.url === '/new'){
        response.writeHead(200, {
            'Content-Type': 'text/html'
        })
        response.end('<div>this is conetent  </div>');
    }

}).listen(8888)

console.log('server listening on 8888')