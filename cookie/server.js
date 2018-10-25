const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request come', request.url)

    const host = request.headers.host;
    
    console.log('host',host)
    if(request.url === "/"){
        const html = fs.readFileSync('test.html','utf8')
        if(host.indexOf( 'a.test.com') != -1){
            response.writeHead(200,{
                'Content-type': 'text/html',
                'Set-Cookie': ['id=123;max-age=2','aaa=333;domain=test.com']
                // 设置cookie 不设置max-age 浏览器关闭自动消失
                // 设置max-age 倒计时消失 domain="" 设置域名
            })
        }
        
        response.end(html)
    }
}).listen(8888)

console.log('server listening on 8888')