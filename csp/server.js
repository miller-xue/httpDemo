const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    if(request.url === '/'){
        // 1.读取html
        const html = fs.readFileSync('test.html','utf8')
        response.writeHead(200,{
            'Content-type': 'text/html', // 返回类型
            //'Content-Security-Policy': 'default-src http: https:' // 只能通过引入的方式引入js 不能内部写js脚本 加载就报错
            //'Content-Security-Policy': 'default-src \'self\' https://cdn.bootcss.com/;  form-action  \'self\'; report-uri /report' //指定引入具体的域名
            // default-src 是规定全局规定所有
            // script-src img-src 可限制一个or默认所有
           
           // 'Content-Security-Policy-Report-Only': 'default-src \'self\' https://cdn.bootcss.com/;  form-action  \'self\'; report-uri /report'
            // connect-src 限制ajax请求的地址
        })
        // 2.返回给前台
        response.end(html)
    }else{
        response.writeHead(200,{
            'Content-type': 'application/javascript', // 返回类型
        })
        // 2.返回给前台
        response.end('console.log("xxxx")')
    }

    
}).listen(8888)

console.log('server listening on 8888')