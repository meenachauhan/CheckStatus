
var express = require("express")
var index = express()

var getStatus = require('./status/v1/fetchStatus')
index.use(express.static('status'));

index.get('/v1/all-status', function (request, response) {
    var respGoogle = {}
    var respAmazon = {}
    let callTime = Date.now();
    getStatus.google_status().then(status => {
        let currTime = Date.now();
        let duration = currTime - callTime;
        let responseString = {
            "url": "https://www.google.com",
            "statusCode": status,
            "duration": duration,

            "date": currTime
        };
        respGoogle = responseString;
    }).then(
    getStatus.amazon_status().then(status => {
        let currTime = Date.now();
        let duration = currTime - callTime;
        let responseString = {
            "url": "https://www.amazon.com",
            "statusCode": status,
            "duration": duration,
            "date": currTime
        };
        respAmazon = responseString;
    })).then( () => {
        let finalResponse = [ respGoogle, respAmazon];
        console.log(finalResponse);
        response.status(200);
        response.statusText = finalResponse;
        response.set("contentType", "application/json");
        response.json(finalResponse);}
    );

});

index.get('/v1/google-status', function (request, response){
    let callTime = Date.now();
    let t = Promise.resolve(getStatus.google_status());
    t.then( status => {
        let currTime = Date.now();
        let duration = currTime - callTime;
        let responseString = {
            "url": "https://www.google.com",
            "statusCode":  status,
            "duration":   duration,
            "date":  currTime
        };
        response.status(status);
        response.statusText = responseString;
        response.set("contentType", "application/json");
        response.json(responseString);
    });
});

index.get('/v1/amazon-status', function (request, response){
    let callTime = Date.now();
    let t = Promise.resolve(getStatus.amazon_status());
    t.then( status => {
        let currTime = Date.now();
        let duration = currTime - callTime;
        let responseString = {
            "url": "https://www.amazon.com",
            "statusCode":  status,
            "duration":   duration,
            "date":  currTime
        };
        response.status(status);
        response.statusText = responseString;
        response.set("contentType", "application/json");
        response.json(responseString);
    });
});
index.listen(8080);
console.log("Check status started on 8080");

