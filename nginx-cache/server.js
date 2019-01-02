const http = require('http')
const fs = require('fs')

const wait = (seconds) => {
    return new Promise((resolve,reject) => {
        setTimeout(()=> {
            resolve()
        },seconds * 1000) 
    })
}

http.createServer(function (request, response) {
    console.log('request come', request.headers.host)


    if(request.url === '/'){
        const html = fs.readFileSync('test.html','utf-8')
        response.writeHead(200,{
            'Content-type': 'text/html'
        })
        response.end(html);
    }

    if(request.url === '/data'){
        response.writeHead(200,{
             'Cache-Control': 'max-age=5, s-maxage=20, private',
             // s-maxage 给代理缓存使用的过期时间。max-age是给浏览器使用的缓存时间， private 只有浏览器才能缓存这部分数据,
             // no-store 所有部分都不缓存
            //'Cache-Control' : 's-maxage=200',// 设置代理服务器缓存
            
            //'Vary' : 'X-Test-Cache' // 指定发送请求时，只有指定的http头的值是相同的情况下，才会使用缓存
            // 指定头信息和值一样时，使用缓存，             比如，根据user-agint 头不一样访问不一样的缓存，content-language 判断语言缓存
        })
        wait(2).then(() =>  response.end('success'));
    }
    
}).listen(8888)

console.log('server listening on 8888')