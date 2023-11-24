//LEGGO IL FILE e LO FILTRO SECONDO IL SERVIZIO

//SERVIZI OBBLIGATORI DA ESPORRE (Sono per lo più contatori!)
  //1. Spese effettuate in generale e numero di prodotti comprati per ogni spesa (grafico con asse x data e asse y quantità)
      
  //2. I prodotti comprati dall'utente 3 e quante volte in totale 

  //3. I prodotti comprati di più in totale

  //4. Indicare i negozi dove hanno acquistato e con quale frequenza

  //5. Indicare i negozi e quando si è speso di più

  //6. Indicare per ogni mese quanto si è speso

  //7. Salvataggio di una nuova spesa NEL FILE

const { info } = require("console");
const http = require("http");
const url = require("url");

const fs = require("fs");

var server = http.createServer(function (request, response) {

    let address = request.headers.host + request.url;
    let infoURL = url.parse(address, true);
    let header, file;

    switch(infoURL.pathname)
    {
        case "/index":

            contesto = {risp: response, type: "text/html"};
            fs.readFile("index.html", inviaFile.bind(contesto));

            break;

        case "/index.css":

            contesto = {risp: response, type: "text/css"};
            fs.readFile("index.css", inviaFile.bind(contesto));

            break;

        case "/index.js":

            contesto = {risp: response, type: "text/javascript"};
            fs.readFile("index.js", inviaFile.bind(contesto));

            break;

        case "/dati.json":

            contesto = {risp: response, type: "text/json"};
            fs.readFile("dati.json", inviaFile.bind(contesto));

            break;

        case "/saveData":

             // Raccolgo il Body della Richiesta

             let body = "";

             // Intercetto l'arrivo di un pezzetto di Body
 
             request.on("data", (dato) => {
                 console.log("Data: ", dato);
                 body += dato;
             });
 
             // Intercetta la fine della comunicazione
             
             request.on("end", () => {
                 console.log(body);
                 fs.writeFile("nuovaSpesaUtente.json", JSON.stringify(body), (err) => {
                     if (err) {
                         response.writeHead(500, {"Content-Type": "application/json"});
                         let json = {desc: "Errore nel Salvataggio"};
                         response.write(JSON.stringify(json));
                         response.end();
                     }
                     else {
                         response.writeHead(200, {"Content-Type": "application/json"});
                         let json = {desc: "Salvataggio avvenuto con Successo!"};
                         response.write(JSON.stringify(json));
                         response.end();
                     }
                 });
             })

            break;
  
        default:
            header = {"Content-Type": "text/plain"};
            response.writeHead(404, header);
            response.write("Nessuna risorsa trovata!");
            response.end();
            break;
    }
})

server.listen(1337);
console.log("Il server è avviato sulla porta 1337...");

function inviaFile(err, file)
{
    console.log(this);

    let header = {"Content-Type": this.type};
    this.risp.writeHead(200, header);
    this.risp.write(file);
    this.risp.end();
}