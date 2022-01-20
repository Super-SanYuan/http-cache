const http = require('http')
const fs = require('fs')
const url = require('url')

const services = http.createServer()

services.on('request', (req, res) => {
    const { pathname } = url.parse(req.url)

    if (pathname === '/') {
        const data = fs.readFileSync('./index.html')
        res.end(data)
    }

    else if (pathname === '/image/01.png') {
        // Expires 强制缓存
        const data = fs.readFileSync('./image/01.png')
        res.writeHead(200, {
            'Expires': new Date('2022-01-20 11:12:00').toUTCString()
        })
        res.end(data)
    }

    else if (pathname === '/image/02.png') {
        // cache-control 强制缓存 max-age; s-maxage; 单位:秒
        const data = fs.readFileSync('./image/02.png')
        res.writeHead(200, {
            'Cache-Control': 'max-age=5; s-maxage=10'
        })
        res.end(data)
    }

    else {
        res.statusCode = 404
        res.end()
    }
}).listen(2333, () => {
    console.log('http run localhost:2333')
})