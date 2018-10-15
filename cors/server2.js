const http = require('http')

http.createServer(function (request, response) {
    console.log('request come', request.url)
    
     // 可以设置默认域名
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        // 跨域请求限制
        'Access-Control-Allow-Headers': 'X-Test-Cors', // 允许自定义请求头,进行预处理
        'Access-Control-Allow-Methods': 'POST,PUT,DELETE', //允许其他请求方式
        // 多少秒之内可以不用发起预请求
        'Access-Control-Max-Age' : '1000'
    })
    response.end('123')
}).listen(8887)

console.log('server listening on 8887')