const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();
const app = express();

app.all('/api/*', function (req, res) {
    apiProxy.web(req, res, {target: 'http://localhost:8080'});
});

app.get('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


// serve static assets normally
app.use('/static', express.static(__dirname + '/static'));

// Handles all routes so you do not get a not found error
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'))
});

app.listen(port);
console.log('server started on port ' + port);


// npm install http-proxy --save
// npm install express --save