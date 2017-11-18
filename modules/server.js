

var http = require('http');
var colors = require('colors'); 
var handlers = require('./handlers');

function start() {

    function onRequest(request, response) {

        console.log('Odebrano zapytanie.'.green);

         // the "request" object created by "createServer" has  properties: const { method, url, headers } = request;
         // The url is the full URL without the server, protocol or port.
        console.log('Zapytanie ' + request.url + ' odebrane.'); 

        response.writeHead(200, 'Yo dawg, this is an optional status message, you feel me?', {'Content-Type': 'text/plain'});

        switch(request.url) {
        
            //Zauważ, że instrukcja zakłada, że ma wywołać tę samą funkcję, jeśli URL będzie równy "/", lub "/start".
            case '/':

            case '/start':
                handlers.welcome(request, response); 
                break;

            case '/upload':
                handlers.upload(request, response);
                break;

            case '/show':
                handlers.show(request, response);
                break;

            case '/styles/upload.css':
                handlers.styles_upload(request, response);
                break;
            
            case '/styles/start.css':
                handlers.styles_start(request, response);
                break;

            default:
                handlers.error(request, response);
        }
    }

    http.createServer(onRequest).listen(8080); // tutaj nie dajemy parametrow, samo 'onRequest'

    

    console.log('Uruchomiono serwer!'.green);
}

exports.start = start; // dodajemy do obiektu metodę export.start i przypisujemy jej fcję start