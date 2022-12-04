import Dexie from "dexie";
// import firebase from "./db-firebase"


const db = new Dexie(localStorage.database || 'pp');

db.version(0.1).stores({
  expenses: "++id, date",
  expensesStocks: "++id",
});

db.version(0.2).stores({
  qaAnalysis: "++id",
});

db.on("populate", function() {
  //Execulta apenas quando o banco de dados é criado.
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

const getExpenses = () => db.expenses.toArray();
const getExpensesMonth = (month) => db.expenses.where("date").startsWithAnyOfIgnoreCase(month).toArray();
const addExpense = (expense) => db.expenses.add(expense);
const updateExpense = (expense) => db.expenses.put(expense)
const rmExpense = (expense) => db.expenses.delete(expense.id)

const getExpensesStocks = () => db.expensesStocks.toArray();
const addExpenseStock = (expenseStock) => {
  console.log(JSON.stringify(expenseStock))
  return db.expensesStocks.add(expenseStock)
}
const rmExpenseStock = (el) => db.expensesStocks.delete(el.id)

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
  getExpensesMonth,
  getExpensesStocks,
  addExpense,
  addExpenseStock,
  updateExpense,
  rmExpense,
  rmExpenseStock,
  putQuoteAnalysis,
  getQuoteAnalysis,
  putSlideValue,
  getSlideValues,
  deleteSetupSlide
};