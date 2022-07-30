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
    // let stringDatabase = "DataSnapshot { key = x0rj9d8XChh0Hzhe3cXjmBbM7hC2, value = {expense={-N89miJNn6-dm6sT93CU={date=2022-02-26, name=Lanche, value=5930, type=Despesa, qtde=0}, -N89mZP6KDtgveAIAxQJ={date=2022-01-25, name=Lanche, value=1100, type=Despesa, qtde=0}, -N89n6lOXDID1bCLZIVQ={date=2022-04-26, name=Amazon, value=6208, type=Despesa, qtde=0}, -N89mbTrluZPSbmUL1ZE={date=2022-02-04, name=Lanche, value=4000, type=Despesa, qtde=0}, -N89j40FndWrQbe257JA={date=2020-08-13, name=ITUB4, value=25280, type=Investimento, qtde=10}, -N89kQ1q7LpoKuZ4E7hl={date=2021-02-10, name=Van, value=1140, type=Despesa, qtde=0}, -N89jX0KH4F5GUHbNmuD={date=2020-10-15, name=Almoço, value=2107, type=Despesa, qtde=0}, -N89lX7SNRUAymoeBqdw={date=2021-09-11, name=Pedinte, value=200, type=Despesa, qtde=0}, -N89isMezijp1yQaLq8B={date=2020-06-06, name=Mercado, value=1400, type=Despesa, qtde=0}, -N89kCPsg40Fu5iJbb8w={date=2020-12-24, name=Mercado, value=1380, type=Despesa, qtde=0}, -N89k_33jZagF-4fOvSu={date=2021-03-05, name=Mom mercado, value=11787, type=Despesa, qtde=0}, -N89mouwr3CFVnj2Bvs7={date=2022-03-07, name=Shopee, value=779, type=Despesa, qtde=0}, -N89jEgP3nKtIMkjH2yy={date=2020-09-18, name=Lanche, value=500, type=Despesa, qtde=0}, -N89lhgXdKsY8RHFgNBc={date=2021-10-19, name=Mercado, value=56797, type=Despesa, qtde=0}, -N89j7XmsynrSM_ZXXnn={date=2020-08-21, name=Uber, value=416, type=Despesa, qtde=0}, -N89mZaCwpdzVjnuKJbe={date=2022-01-27, name=Lanche, value=2400, type=Despesa, qtde=0}, -N89m53UKi1jRwhiLXAV={date=2021-12-05, name=Uber, value=790, type=Despesa, qtde=0}, -N89k6ze3jSyC65mJJwB={date=2020-12-14, name=Máquina acpf, value=500, type=Despesa, qtde=0}, -N89jDHpGuk53jFAExDo={date=2020-09-14, name=Van, value=275, type=Despesa, qtde=0}, -N89lebeWG31rom_UrVX={date=2021-10-10, name=Mom mercado, value=20000, type=Despesa, qtde=0}, -N89kZMag6_KpgtSeu70={date=2021-03-04, name=Van, value=1100, type=Despesa, qtde=0}, -N89ku58kXKRxo0GEMGZ={date=2021-05-07, name=Petiscos, value=1503, type=Despesa, qtde=0}, -N89n0TPvDD-AI7CqqQ_={date=2022-04-06, name=Ame digital, value=349, type=Despesa, qtde=0}, -N89j2M_vGqlsTur4Mjq={date=2020-08-08, name=Lanche, value=4780, type=Despesa, qtde=0}, -N89lr9u_lWz2PVmZzG0={date=2021-11-05, name=Cnh ana, value=22000, type=Despesa, qtde=0}, -N89mYPxjBoCerEurO90={date=2022-01-23, name=Lanche, value=2850, type=Despesa, qtde=0}, -N89k-J_op3iA6ksBXZv={date=2020-12-01, name=Almoço, value=1671, type=Despesa, qtde=0}, -N89kuMjtYFDSNqGWtx_={date=2021-05-12, name=Mercado, value=3022, type=Despesa, qtde=0}, -N89jKZMMLKs-eCU730Q={date=2020-09-27, name=Lanche, value=2600, type=Despesa, qtde=0}, -N89lXuvAbF6WTAITGVq={date=2021-09-12, name=Uber, value=1595, type=Despesa, qtde=0}, -N89lslKMndE0u81PWV0={date=2021-11-08, name=VRTA11, value=193534, type=Investimento, qtde=19}, -N89j7l9QS8P_Vqo1sXS={date=2020-08-22, name=Lanche, value=1398, type=Despesa, qtde=0}, -N89jhY5rgkYNQkJvuh_={date=2020-10-27, name=Café da manhã, value=1369, type=Despesa, qtde=0}, -N89mPriB4vYY6YH0J8e={date=2022-01-08, name=Contas a pagar ana, value=38300, type=Receita, qtde=0}, -N89n7GPQgq5Us-eB-wQ={date=2022-04-26, name=Mercado, value=1308, type=Despesa, qtde=0}, -N89jxrd1RL-KrTep5CF={date=2020-11-24, name=Café da manhã, value=1322, type=Despesa, qtde=0}, -N89laR9EwFe5xVph0he={date=2021-09-25, name=Recarga, value=1000, type=Despesa, qtde=0}, -N89kXrxHdv-NAaSlccS={date=2021-02-28, name=Sapato slipt, value=5890, type=Despesa, qtde=0}, -N89kICiMT9wEp4Lz_yr={date=2021-01-15, name=Mercado, value=900, type=Despesa, qtde=0}, -N89lZJbjs9_R8CV0tqr={date=2021-09-14, name=Lâmpada smart, value=5590, type=Despesa, qtde=0}, -N89mz3QbPXri0UtBWpD={date=2022-03-31, name=Conserto carro, value=76000, type=Despesa, qtde=0}, -N89n8ZZvMIRnrtpB6Hg={date=2022-05-01, name=Claro flex, value=3999, type=Despesa, qtde=0}, -N89lOBR7bGe4lyq9Som={date=2021-08-13, name=Lanche, value=600, type=Despesa, qtde=0}, -N89mWZWKpEwPCenbpD0={date=2022-01-20, name=Uber, value=698, type=Despesa, qtde=0}}}"
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