import dexie from "./db-dexie";
import firebase from "./db-firebase";


const getExpensesDatabase = async () => {
  const expenses = await dexie.getExpenses()
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const getExpensesMonth = async (month) => {
  const expenses = await dexie.getExpensesMonth(month)
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
  firebase.updateExpense(expense)
  dexie.updateExpenseDatabase(expense)
}

const getExpenseStocksDatabase = async () => await dexie.getExpensesStocks()

const addExpenseStockDatabase = async (el) => {
  const hash = await firebase.addExpenseStock(el)
  el["id"] = hash
  dexie.addExpenseStock(el)
}

const rmExpenseStockDatabase = async (el) => {
  firebase.rmExpenseStock(el)
  dexie.rmExpenseStock(el)
};

const putQuoteAnalysis = async (el) => {
  const hash = firebase.putQuoteAnalysis(el)
  el["id"] = hash
  dexie.putQuoteAnalysis(el)
}

const getQuoteAnalysis = async () => await dexie.getQuoteAnalysis()


const putSlideValue = async (el) => {
  dexie.putSlideValue(el)
  // firebase.putSlideValue(el)
}

const getSlideValues = async () => await dexie.getSlideValues()

const deleteSetupSlide = async () => {
  dexie.deleteSetupSlide()
  // firebase.deleteSetupSlide()
}

export default {
  getExpensesDatabase,
  getExpensesMonth,
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
