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
            'Cache-Control': 'max-age=200,private'
        })
        response.end('console.log("script loaded twice")')
    }
    
}).listen(8888)

console.log('server listening on 8888')