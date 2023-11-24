//POTETE AGGIUNGERE VARIABILI GLOBALI

//DA COMPLETARE (Connettersi al server chiedendo dei singoli servizi)
window.onload = ()=>{

}

//DA COMPLETARE 
function caricaSelect(select, vet){

}

//DA COMPLETARE e RICHIAMARE IN MODO OPPORTUNO
function salvaProdotto(){

}

//DA COMPLETARE e RICHIAMARE IN MODO OPPORTUNO
function salvaSpesa(){
  
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