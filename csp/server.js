const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    if(request.url === '/'){
        // 1.读取html
        const html = fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            'Content-type': 'text/html', // 返回类型
            //'Content-Security-Policy': 'default-src http: https:' // 只能通过引入的方式引入js 不能内部写js脚本
            'Content-Security-Policy': 'default-src \'self\' https://cdn.bootcss.com/  form-action  \'self\'' //指定引入具体的域名
        })
        // 2.返回给前台
        response.end(html)
    }

    if(request.url === '/test.js'){
        response.writeHead(200,{
            'Content-type': 'application/javascript', // 返回类型
        })
        // 2.返回给前台
        response.end('console.log("xxxx")')
    }

    
}).listen(8888)

console.log('server listening on 8888')