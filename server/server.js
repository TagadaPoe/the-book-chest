var http = require('http');
var url = require('url');
var querystring = require('querystring');
var xmlParseString = require('xml2js').parseString;

var server = http.createServer(function (req_in, response) {
  
  var parsed_url = url.parse(req_in.url);
  console.log("parsed_url: " + JSON.stringify(parsed_url, null, ' '));

  if (parsed_url.pathname === "/catalog/books") {

    var params = querystring.parse(parsed_url.query);

    if ('isbn' in params) {

      var wskey = 'QCkMRPxcFDC2k1Has55nqkEve4wvaA4tm1Qj9FTixxf5z5hYSZxXOQFfyVvnsHdXucMhIcksbgNd7SMT';
      var recordSchema = 'info%3Asrw%2Fschema%2F1%2Fdc';
      // isbn 9782367403021

      var options = {
        'host': 'www.worldcat.org',
        'path': '/webservices/catalog/content/isbn/' + params['isbn'] + '?wskey=' + wskey + '&recordSchema=' + recordSchema
      };

      var onSuccess = function (res) {
        //console.log('STATUS: ' + res.statusCode);
        //console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        if (res.statusCode == 200) {

          res.on('data', function (chunk) {
            //console.log('BODY: ' + chunk);
            xmlParseString(chunk, function (err, result) {
              //console.log('err: '+JSON.stringify(err));
              //console.log('result: '+JSON.stringify(result));

              response.writeHead(200, {
                "Content-Type": "application/json;charset=utf-8"
              });
              if ('oclcdcs' in result) {
                var response_string = JSON.stringify(result.oclcdcs);
                console.log('RESPONSE: ' + response_string);
                response.write(response_string);
              } else {
                response.write(JSON.stringify({}));
              }
              response.end();

            });
          });
          res.on('end', function () {
            console.log('No more data in response.')
          })
        }
      };

      var req = http.request(options, onSuccess);

      req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
      });
      req.end();

    }
  } else {
    response.write('{"Error": "No ISBN given"}');
    response.end();
  }
});
server.listen(8002);