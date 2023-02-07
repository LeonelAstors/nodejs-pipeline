var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
<<<<<<< HEAD
    response.end("Hello, Welcome to Astor-Sanders");
=======
    response.end("Hello, Welcome to Astor-Sanders DevOps CI CD");
>>>>>>> 0a8e28dc60cb8356086017000e517680e2ec73d9

});

var port = 3000;
server.listen(port);
module.exports = server
console.log("Server is available on Port:", port);
