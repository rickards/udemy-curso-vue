let Android = undefined
let today = new Date();
let date = today.toISOString().slice(0, 10)
let db = [
    { "date": date, "id": "-MD2caLsdasd1CSiDDN", "name": "Farmácia", "type": "Despesa", "value": 8400 },
    { "date": date, "id": "-MDsssds3asd1CSiDDN", "name": "Lanche", "type": "Despesa", "value": 3400 },
    { "date": date, "id": "-MD2sde23asd1CSiDDN", "name": "Energia", "type": "Despesa", "value": 10500 },
    { "date": "2020-05-16", "id": "-MD2caLZCZSqN1CSiDDN", "name": "Mercado", "type": "Despesa", "value": 35495 },
    { "date": "2020-06-10", "id": "-MD2caasdasdddN", "name": "Lanche", "type": "Despesa", "value": 7600 },
    { "date": "2020-06-11", "id": "-DFere343234", "name": "Aluguel", "type": "Despesa", "value": 70000 },
    { "date": "2020-06-30", "id": "-M888890ddN", "name": "Lanche", "type": "Despesa", "value": 5600 },
    { "date": "2020-03-18", "id": "-MD2caLSSSSSDAAAAAN", "name": "Farmácia", "type": "Despesa", "value": 3500 },
    { "date": "2020-03-28", "id": "-MD2caLSSSasasaAAAAN", "name": "Aluguel", "type": "Despesa", "value": 70000 },
    { "date": "2020-05-20", "id": "-frgfgrg", "name": "ITUB4", "type": "Investimento", "value": 17120, "qtde": 8 },
    { "date": "2020-05-26", "id": "-dsesede", "name": "RBRP11", "type": "Investimento", "value": 15422, "qtde": 2 },
    { "date": "2020-05-29", "id": "-aygdyas", "name": "RBRP11", "type": "Investimento", "value": 15392, "qtde": 2 },
    { "date": "2020-08-13", "id": "-sdedsde", "name": "ITUB4", "type": "Investimento", "value": 25280, "qtde": 10 },
    { "date": "2020-08-13", "id": "-frgsdfs", "name": "VRTA11", "type": "Investimento", "value": 31197, "qtde": 3 },
    { "date": "2020-01-30", "id": "-MSDSDcaLZCZSqN1CSiDDN", "name": "Mercado", "type": "Despesa", "value": 51600 }
];

function runAndroidMethod(nameMethod, jsonParams) {
  if (typeof Android !== "undefined" && Android !== null) {
    let javaReturn = Android.callFromDBJava(nameMethod, jsonParams);
    return JSON.parse(javaReturn);
  } else {
    //https://www.chartjs.org/samples/latest/charts/bar/horizontal.html
    return callDBLocal(nameMethod, jsonParams);
    // alert(nameMethod + " " + jsonParams)
  }
}

function callDBLocal(nameMethod, jsonParams) {
  if ((nameMethod == "getExpenses", jsonParams == undefined))
    return getExpenses();
  if (nameMethod == "addExpense") return addExpenses(jsonParams);
}

function getExpenses() {
  return db;
  // [{"date":"2020-06-10","id":"-MD2caLZCZSqN1CSiDDN","name":"Mercado","type":"Despesa","value":20000},{...}]
}

function addExpenses(expense) {
  db.push(JSON.parse(expense));
  console.log(JSON.stringify(db));
}

export default {
    runAndroidMethod
}