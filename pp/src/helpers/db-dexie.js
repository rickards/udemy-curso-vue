import Dexie from "dexie";
import firebase from "./db-firebase"

const db = new Dexie("pp");

db.version(0.1).stores({
  expenses: "++id",
  expensesStocks: "++id, regex",
});

db.version(0.2).stores({
  qaAnalysis: "++id",
});

db.on("populate", function() {
  if(firebase.DB){
    let stringDatabase = firebase.DB.initialState()
    let re_expense_table = new RegExp("expense={(.*?)}}");
    let stringExpenses = (re_expense_table.exec(stringDatabase)[1])+"}";
    
    const array = [...stringExpenses.matchAll("{(.*?)}")];
    array.forEach((match)=>{
      let expense = match[0].replaceAll(/(\d{4}-\d{2}-\d{2})/ig, "'$1'")
  
      db.expenses.add({
        date: expense.match(/(\d{4}-\d{2}-\d{2})/i)[1],
        type: expense.match(/type=(.*?)[,}]/i)[1],
        name: expense.match(/name=(.*?)[,}]/i)[1], 
        value: expense.match(/value=(.*?)[,}]/i)[1],
        qtde: expense.match(/qtde=(.*?)[,}]/i)[1],
      });
    })

    let re_expenseStock_table = new RegExp("expenseStock={(.*?)}}");
    let stringExpenseStock = (re_expenseStock_table.exec(stringDatabase)[1])+"}";
    
    const arrayExpenseStock = [...stringExpenseStock.matchAll("{(.*?)}")];
    arrayExpenseStock.forEach((match)=>{
      let expenseStock = match[0]
  
      db.expensesStocks.add({
        regex: expenseStock.match(/regex=(.*?)[,}]/i)[1]
      });
    })
  }
});

// db.on("populate", function() {
//   // Init your DB with some default expenses:
//   let i;
//   for (i=0; i<20; i+=10){
//     db.expenses.add({id: i+0, date: getDateBetween1Year(), type: "Despesa",name: "Mercado", value: getRandomInt(100, 100000)});
//     db.expenses.add({id: i+1, date: getDateBetween1Year(), type: "Despesa",name: "Lanche", value: getRandomInt(100, 10000)});
//     db.expenses.add({id: i+2, date: getDateBetween1Year(), type: "Despesa",name: "Farmácia", value: getRandomInt(100, 10000)});
//     db.expenses.add({id: i+3, date: getDateBetween1Year(), type: "Despesa",name: "Aluguel", value: getRandomInt(30000, 500000)});
//     db.expenses.add({id: i+4, date: getDateBetween1Year(), type: "Despesa",name: "Energia", value: getRandomInt(8000, 40000)});

//     db.expenses.add({id: i+5, date: getDateBetween1Year(), type: "Receita",name: "Faturamento", value: getRandomInt(1000000, 5000000)});
//     db.expenses.add({id: i+6, date: getDateBetween1Year(), type: "Receita",name: "Alugueis", value: getRandomInt(100, 40000)});
//     db.expenses.add({id: i+7, date: getDateBetween1Year(), type: "Bem_gasto",name: "Carro", value: getRandomInt(1800000, 4800000)});
//     db.expenses.add({id: i+8, date: getDateBetween1Year(), type: "Bem_ganho",name: "Macbook", value: getRandomInt(500000, 1200000)});
//     db.expenses.add({id: i+9, date: getDateBetween1Year(), type: "Receita",name: "Vendas", value: getRandomInt(8000, 40000)});
//   }
//   db.expenses.add({id: i+1, date: getDateBetween1Year(), type: "Investimento", name: "VRTA11", value: 100 * 105.99 * 200, qtde: 200 });
//   db.expenses.add({id: i+2, date: getDateBetween1Year(), type: "Investimento", name: "RBRP11", value: 100 * 92.5 * 300, qtde: 300 });
//   db.expenses.add({id: i+3, date: getDateBetween1Year(), type: "Investimento", name: "ABCB4", value: 100 * 14.75 * 1800, qtde: 1800 });
//   db.expenses.add({id: i+4, date: getDateBetween1Year(), type: "Investimento", name: "VRTA11", value: 100 * 108.99 * 500, qtde: 500 });

//   // Init your DB with some default expensesStocks:
//   db.expensesStocks.add({regex: "Despesas=.*?" });
//   db.expensesStocks.add({regex: "Lanche" });
//   db.expensesStocks.add({regex: "Farmácia" });
//   db.expensesStocks.add({regex: ".*?" });
//   db.expensesStocks.add({regex: "Aluguel" });
//   db.expensesStocks.add({regex: "Extra" });
// });

// function getDateBetween1Year(){
//   const today = new Date()
//   const diff = getRandomInt(100000000, 100000000*365)
//   return new Date(today-diff).toISOString().slice(0, 10)
// }

// function getRandomInt(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min)) + min;
// }

function getExpenses() {
  return db.expenses.toArray();
}

function getExpensesStocks() {
  return db.expensesStocks.toArray();
}

function addExpense(expense) {
  db.expenses.add(JSON.parse(JSON.stringify(expense)))
}

function addExpenseStock(expenseStock) {
  db.expensesStocks.add(JSON.parse(JSON.stringify(expenseStock)))
}

function rmExpenseStock(expense) {
  const el = JSON.parse(JSON.stringify(expense))
  return getExpensesStocks().then((stocks) => {
    Object.keys(stocks).forEach((key) => {
      if ( stocks[key].regex === el.regex) {
        db.expensesStocks.delete(stocks[key].id)
      }
    })
  })
}

function putQuoteAnalysis(setup){
  db.qaAnalysis.put({
    ...JSON.parse(JSON.stringify(setup)),
    id: 1
  })
}

const getQuoteAnalysis = async () => getSetup(1);

function putSlideValue(setup){
  updateSlideValue(setup).then((updated) => {
    if (!updated){
      db.qaAnalysis.put({
        ...JSON.parse(JSON.stringify(setup)),
        id: 2
      })
    }
  })
}

function updateSlideValue(setup){
  return db.qaAnalysis.update(2, {
    ...JSON.parse(JSON.stringify(setup)),
    id: 2
  })
}

const getSlideValues = async () => getSetup(2);

async function getSetup(id){
  const array = await db.qaAnalysis.toArray();
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    if (element.id == id){
      delete array[index]['id']
      return {...array[index]}
    }
  }
  return {}
}

async function deleteSetupSlide() {
  const categories = Object.keys(await getQuoteAnalysis());
  const sliders = await getSlideValues();
  for (const groupName of Object.keys(sliders)) {
    if (categories.indexOf(groupName) == -1){
      delete sliders[groupName]
    }
  }
  db.qaAnalysis.put({
    ...sliders,
    id: 2
  })
}

export default {
  getExpenses,
  getExpensesStocks,
  addExpense,
  addExpenseStock,
  rmExpenseStock,
  putQuoteAnalysis,
  getQuoteAnalysis,
  putSlideValue,
  getSlideValues,
  deleteSetupSlide
};