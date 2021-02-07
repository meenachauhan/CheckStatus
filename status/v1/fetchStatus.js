
var http = require('http')

module.exports.google_status = function () {
    return new Promise((resolve => {
    var URI = "http://www.google.com"
    const req = http.request(URI, res => {
        resolve(res.statusCode)
    })
    req.end();
    }))
}

module.exports.amazon_status = function () {
    return new Promise((resolve => {
        var URI = "http://www.amazon.com"
        const req = http.request(URI, res => {
            resolve(res.statusCode)
        })
        req.end();
    }))
}
