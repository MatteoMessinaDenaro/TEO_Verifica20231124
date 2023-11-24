

//POTETE AGGIUNGERE VARIABILI GLOBALI
var ObjJSON = [];
var prodottiSalvati = [];
var prod = {};
var dataChart = [];

//DA COMPLETARE (Connettersi al server chiedendo dei singoli servizi)
window.onload = async ()=>{

    // Prelevo File JSON

    await getDati();

    caricaSelect();

}

async function getDati()
{
    await fetch("dati.json")
    .then(response => response.json())
    .then(data => {
        console.log("Dati ricevuti: ", data);

        ObjJSON = data;

    })
    .catch((err) => {
        console.error("Error: ", err);
    })
}

//DA COMPLETARE 
function caricaSelect(select, vet){ 
    // Carico Utente

    let selectUtente = document.getElementById("selUt");

    for (let i = 0; i < 10; i++)
    {
        let option = document.createElement("option");
        option.textContent = i;
        selectUtente.appendChild(option);
    }  

    // Carica Negozi

    let selectNegozio = document.getElementById("selNegozio");
    let negoziAggiunti = [];

    ObjJSON.forEach(element => {

        if (!negoziAggiunti.includes(element.negozio))
        {
            let option = document.createElement("option");
            option.textContent = element.negozio;
            selectNegozio.appendChild(option);

            negoziAggiunti.push(element.negozio);
        }
    });

    let selectProdotto = document.getElementById("selProdotto");
    let prodottiAggiunti = [];
    let products = [];

    ObjJSON.forEach(element => {

        products.push(element.prodotti);    
    });

    console.log(products);

    products.forEach(element => {
        
        prodottiAggiunti.push(element.nome);
        // }
        for (let i = 0; i < element.length; i++)
        {
            if (!prodottiAggiunti.includes(element[i].nome))
            {
                let option2 = document.createElement("option");
                option2.textContent = element[i].nome;
                selectProdotto.appendChild(option2);

                prodottiAggiunti.push(element[i].nome);
            }
        }
    })

    let btnSalvaProd = document.getElementById("btnSalvaProd");

    btnSalvaProd.addEventListener("click", () => {
        salvaProdotto(prodottiSalvati);
    });

    let btnSalvaSpesa = document.getElementById("btnSalvaSpesa");

    btnSalvaSpesa.addEventListener("click", () => {
        salvaSpesa(prodottiSalvati);
    });
    
}

//DA COMPLETARE e RICHIAMARE IN MODO OPPORTUNO
function salvaProdotto(prodSalvati){

    let selectProdotto = document.getElementById("selProdotto");
    let prodotto = selectProdotto.value;
    let quantity = document.getElementById("txtQta").value;

    let prod = {"nome": prodotto, "quantità": quantity};

    prodSalvati.push(prod);
    console.log(prodSalvati);
}


//DA COMPLETARE e RICHIAMARE IN MODO OPPORTUNO
async function salvaSpesa(Produces){
    
    let user = document.getElementById("selUt").value;
    let dateTime = document.getElementById("txtData").value;
    let nomeNegozio = document.getElementById("selNegozio").value;
    let impSpesa = document.getElementById("txtImporto").value;

    let values = {
        "user": user,
        "dateTime": dateTime,
        "nomeNegozio": nomeNegozio,
        "impSpesa": impSpesa,
        "prodotti": Produces
    };


    let container = await fetch("http://localhost:1337/saveData", {
        "method": "POST",
        "headers": {"Content-Type": "application/json"},
        "body": JSON.stringify(values)
    });

    let response = await container.json();
    console.log("Risposta dal Server: ", response);
}

//POTETE INSERIRE ALTRE FUNZIONI


/**
 * Disegna il grafico basandosi sui parametri passati
 * @param {*} canvas Oggetto html canvas in cui inserire il grafico
 * @param {*} tipo Tipo di grafico da realizzare (line, pie, ...)
 * @param {*} data Dati da visualizzare [{desc:"", val:""}, ....] (POTETE MODIFICARLO!)
 * @param {*} label Nome del dato visualizzato (es. "Numero di prodotti acquistati")
 */
function disegnaGrafico(canvas, tipo, data, label){
  let dati = {
      labels: [],
      datasets: [{
        label: label,
        data: []
      }]
  };
  
  //DA QUI ------ POTETE MODIFICARLO
  for (let d of data) {
      dati.labels.push(d.desc);
      dati.datasets[0].data.push(parseInt(d.val));
  }
  //A QUI ------ POTETE MODIFICARLO

    Chart.defaults.color = '#FFF'; 
    let grafico = new Chart(canvas, {
        type: tipo,
        data: dati,
        options: {
            plugins: {
                legend: {
                    display: false
                },
            }
        }});
}