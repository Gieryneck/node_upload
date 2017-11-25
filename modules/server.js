

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
    
        switch(true) {
            //bedziemy szukac regexa ktory jest true. RegExp to obiekt na ktorym bedziemy wykonywac metode test(), sprawdzajac czy jest true

            //Zauważ, że instrukcja zakłada, że ma wywołać tę samą funkcję, jeśli URL będzie równy "/", lub "/start".
            case /^\/(start)?$/.test(request.url):
                handlers.welcome(request, response); 
                break;
            // ^ - zaczyna sie od / a potem jest cokolwiek
            // (start)? - przed ? opcjonalnie moze byc 1 character, albo wyrazenie w nawiasie
            // $ - po tym juz nic nie moze byc
            // znaki specjalne escapujemy

            case /^\/upload$/.test(request.url):
                handlers.upload(request, response);
                break;

            case /^\/show\?file=/.test(request.url):
                handlers.show(request, response);
                break;

            case /^\/styles\/upload\.css$/.test(request.url):
                handlers.styles_upload(request, response);
                break;
            
            case /^\/styles\/start\.css$/.test(request.url):
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