import dexie from "./db-dexie";
import firestore from "./db-firestore";


const getExpensesDatabase = async () => {
  const expenses = await bridge.runAndroidMethod("getExpenses")
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const addExpenseDatabase = async (expense) => {
  dexie.addExpense(expense)
  firestore.addExpense(expense)
}

const updateExpenseDatabase = async (expense) => {
  dexie.updateExpenseDatabase(expense)
  firestore.updateExpense(expense)
}

const getExpenseStocksDatabase = async () => {
  dexie.getExpenseStocksDatabase()
  firestore.getExpenseStocksDatabase()
}

const addExpenseStockDatabase = async (el) => {
  dexie.addExpenseStock(el)
  firestore.addExpenseStock(el)
}

const rmExpenseStockDatabase = async (el) => {
  dexie.rmExpenseStock(el)
  firestore.rmExpenseStock(el)
};

const putQuoteAnalysis = async (el) => {
  dexie.putQuoteAnalysis(el)
  firestore.putQuoteAnalysis(el)
}

const getQuoteAnalysis = async () => {
  dexie.getQuoteAnalysis()
  firestore.getQuoteAnalysis()
}

const putSlideValue = async (el) => {
  dexie.putSlideValue(el)
  firestore.putSlideValue(el)
}

const getSlideValues = async () => {
  dexie.getSlideValues()
  firestore.getSlideValues()
}
const deleteSetupSlide = async () => {
  dexie.deleteSetupSlide()
  firestore.deleteSetupSlide()
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
