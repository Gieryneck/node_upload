var fs = require('fs');
var formidable = require('formidable');
var fileName;

exports.welcome = function (request, response) {

    console.log('Rozpoczynam obsluge zadania "welcome"');

    fs.readFile('./templates/start.html', 'utf-8', (err, html) => {

        if (err) throw err; // PRZYDATNE !!! KONKRETNIEJ WSKAZUJE BŁĘDY

        response.writeHead(200, 'Zapytanie powiodlo sie.', { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(html); // przesyłamy odczytany plik html
        response.end();
    });

}


exports.upload = function (request, response) {

    console.log('Rozpoczynam obsluge zadania "upload".');

    var form = new formidable.IncomingForm(); // Creates a new incoming form.

    form.parse(request, (error, fields, files) => { //Parses an incoming node.js request containing form data.

        console.log(files);
        fileName = files.upload.name;
        //console.log(fileName);
        fs.renameSync(files.upload.path, './img_upload/' + fileName); // czemu files.upload.name a nie files.upload.file.name??

        // poprzez renameSync określamy ścieżkę dla pliku znajdujacego sie w parametrze files.upload.path(patrz console.log(files)) 
        // i zapisujemy go w  folderze 'img upload' z oryginalna nazwa ktora jest pod parametrem files.upload.name

    });

    fs.readFile('./templates/upload.html', 'utf-8', (err, html) => { //utf-8 konieczne bo domyslnie jest kod maszynowy

        if (err) throw err; // PRZYDATNE !!! KONKRETNIEJ WSKAZUJE BŁĘDY

        response.writeHead(200, 'Zapytanie powiodlo sie.', { 'Content-Type': 'text/html; charset=utf-8' });
        response.write(html); // przesyłamy odczytany plik html
        response.end();
    });

}




// url '/show' jest w upload html w <img src="/show "> 
exports.show = function (request, response) {

    fs.readFile('./img_upload/' + fileName, 'binary', (error, file) => {
        
        /*
       - wg dokumentacji sciezka powinna zwracac blad a nie zwraca - ?? 
       ODP. bo wg dok. "if path is a DIRECTORY", czyli sam katalog bez nazwy pliku 
    
       - czemu nie moge tu wrzucic po prostu fileName, nawet jesli zrobie na nim toString() - (musi byc string lub buffer)  
       ODP. Mogę wrzucic, tylko musi byc z poprawna sciezka, jesli jest w folderze to sciezke
       razem z folderem, jak bedzie w root directory projektu to wystarczy 'fileName'. a blad
       ktory sie wyswietla w konsoli jest po prostu nieadekwantny, bo nie chodzi o to ze 
       zmienna nie jest stringiem czy bufferem, tylko o to ze node nie moze znalezc takiego pliku
       
       - co to jest file descriptor? w parametrze ma byc nazwa pliku albo file descriptor
        */

        response.writeHead(200, { 'Content-Type': 'image/png' });
        response.write(file, 'binary');  // przekazuje tresc binarna pliku elementowi ktory zapytal, czyli tutaj tagowi img
        
        response.end();
    });
}


exports.styles_upload = function(request, response){

    fs.readFile('./styles/upload.css', 'utf-8', (error, css) => {

        response.writeHead(200, {'Content-Type': 'text/css'});
        response.write(css);
        response.end();
    })
}

exports.styles_start = function(request, response){
    
        fs.readFile('./styles/start.css', 'utf-8', (error, css) => {
    
            response.writeHead(200, {'Content-Type': 'text/css'});
            response.write(css);
            response.end();
        })
    }


exports.error = function (request, response) {

    console.log('Nie wiem co robic');
    response.write('Error 404');
    response.end();
}

