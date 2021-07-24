import Dexie from "dexie";

const db = new Dexie("pp");

db.version(0.1).stores({
  expenses: "++id, name, age",
  expensesStocks: "++id, regex"
});

db.on("populate", function() {
  // Init your DB with some default expenses:
  let i;
  for (i=0; i<20; i+=10){
    db.expenses.add({id: i+0, date: getDateBetween1Year(), type: "Despesa",name: "Mercado", value: getRandomInt(100, 100000)});
    db.expenses.add({id: i+1, date: getDateBetween1Year(), type: "Despesa",name: "Lanche", value: getRandomInt(100, 10000)});
    db.expenses.add({id: i+2, date: getDateBetween1Year(), type: "Despesa",name: "Farmácia", value: getRandomInt(100, 10000)});
    db.expenses.add({id: i+3, date: getDateBetween1Year(), type: "Despesa",name: "Aluguel", value: getRandomInt(30000, 500000)});
    db.expenses.add({id: i+4, date: getDateBetween1Year(), type: "Despesa",name: "Energia", value: getRandomInt(8000, 40000)});

    db.expenses.add({id: i+5, date: getDateBetween1Year(), type: "Receita",name: "Faturamento", value: getRandomInt(100000, 500000)});
    db.expenses.add({id: i+6, date: getDateBetween1Year(), type: "Receita",name: "Alugueis", value: getRandomInt(100, 40000)});
    db.expenses.add({id: i+7, date: getDateBetween1Year(), type: "Bem_gasto",name: "Carro", value: getRandomInt(1800000, 4800000)});
    db.expenses.add({id: i+8, date: getDateBetween1Year(), type: "Bem_ganho",name: "Macbook", value: getRandomInt(500000, 1200000)});
    db.expenses.add({id: i+9, date: getDateBetween1Year(), type: "Receita",name: "Vendas", value: getRandomInt(8000, 40000)});
  }
  db.expenses.add({id: i+1, date: getDateBetween1Year(), type: "Investimento", name: "VRTA11", value: 105.99 * 200, qtde: 200 });
  db.expenses.add({id: i+2, date: getDateBetween1Year(), type: "Investimento", name: "RBRP11", value: 92.5 * 300, qtde: 300 });
  db.expenses.add({id: i+3, date: getDateBetween1Year(), type: "Investimento", name: "ABCB4", value: 14.75 * 1800, qtde: 1800 });

  // Init your DB with some default expensesStocks:
  db.expensesStocks.add({regex: "Despesas=.*?" });
  db.expensesStocks.add({regex: "Lanche" });
  db.expensesStocks.add({regex: "Farmácia" });
  db.expensesStocks.add({regex: ".*?" });
  db.expensesStocks.add({regex: "Aluguel" });
  db.expensesStocks.add({regex: "Extra" });
});

function getDateBetween1Year(){
  const today = new Date()
  const diff = getRandomInt(100000000, 100000000*365)
  return new Date(today-diff).toISOString().slice(0, 10)
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getExpenses() {
  return db.expenses.toArray();
}

function getExpensesStocks() {
  return db.expensesStocks.toArray();
}

function addExpenses(expense) {
  db.expenses.push(JSON.parse(expense))
}

function addExpenseStock(expenseStock) {
  db.expensesStocks.push(JSON.parse(expenseStock))
}

function rmExpenseStock(expense) {
  const stocks = getExpensesStocks()
  const el = JSON.parse(expense)
  for( let i = 0; i < stocks.length; i++){
    if ( stocks[i].regex === el.regex) {
      db.expensesStocks.delete(stocks[i].id)
    }
  }
}

export default {
  getExpenses,
  getExpensesStocks,
  addExpenses,
  addExpenseStock,
  rmExpenseStock
};