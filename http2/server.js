const http = require('http')
const fs = require('fs')

http.createServer(function (request, response) {
    console.log('request home',request.url)
    const html = fs.readFileSync('test.html','utf8')
    const img = fs.readFileSync('test.png')

    if(request.url === '/'){

        response.writeHead(200,{
            'Content-type': 'text/html',
            'Connection': 'close',
            'Link': '</test.png>; as=image; rel=preload' // server push 主动推送图片
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
console.log('server listening on 8888')