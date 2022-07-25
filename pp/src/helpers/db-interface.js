import dexie from "./db-dexie";
import firebase from "./db-firebase";


const getExpensesDatabase = async () => {
  const expenses = await dexie.getExpenses()
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const addExpenseDatabase = async (expense) => {
  const hash = await firebase.addExpense(expense)
  expense["id"] = hash
  dexie.addExpense(expense)
}

const updateExpenseDatabase = async (expense) => {
  dexie.updateExpenseDatabase(expense)
  firebase.updateExpense(expense)
}

const getExpenseStocksDatabase = async () => await dexie.getExpensesStocks()

const addExpenseStockDatabase = async (el) => {
  const hash = await firebase.addExpenseStock(el)
  el["id"] = hash
  dexie.addExpenseStock(el)
}

const rmExpenseStockDatabase = async (el) => {
  dexie.rmExpenseStock(el)
  firebase.rmExpenseStock(el)
};

const putQuoteAnalysis = async (el) => {
  dexie.putQuoteAnalysis(el)
  firebase.putQuoteAnalysis(el)
}

const getQuoteAnalysis = async () => await dexie.getQuoteAnalysis()


const putSlideValue = async (el) => {
  dexie.putSlideValue(el)
  firebase.putSlideValue(el)
}

const getSlideValues = async () => await dexie.getSlideValues()

const deleteSetupSlide = async () => {
  dexie.deleteSetupSlide()
  firebase.deleteSetupSlide()
}

export default {
  getExpensesDatabase,
  addExpenseDatabase,
  updateExpenseDatabase,
  getExpenseStocksDatabase,
  addExpenseStockDatabase,
  rmExpenseStockDatabase,
  putQuoteAnalysis,
  getQuoteAnalysis,
  putSlideValue,
  getSlideValues,
  deleteSetupSlide,
};
