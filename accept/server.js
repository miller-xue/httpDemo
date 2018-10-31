const http = require('http')
const fs = require('fs')
const zlib = require('zlib')

http.createServer(function (request, response) {
    console.log('request come', request.headers.host)
    // 1.读取html
    const html = fs.readFileSync('test.html')
    response.writeHead(200,{
        'Content-type': 'text/html', // 返回类型
        'X-Content-Type-Options': 'nosniff',  // 不主动预测返回内容 把文本当脚本执行
        'Content-Encoding': 'gzip' // 告诉客户端解压方式 加快网络开销
    })
    // 2.返回给前台  用zlib进行压缩
    response.end(zlib.gzipSync(html))
}).listen(8888)

console.log('server listening on 8888')