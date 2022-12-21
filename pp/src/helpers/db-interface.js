import dexie from "./db-dexie";
import firebase from "./db-firebase";

const database = firebase.FIREBASE_ENVIROMENT ? firebase : dexie

const getExpenses = async () => {
  const expenses = await database.getExpenses()
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const getExpensesMonth = async (month) => {
  const expenses = await database.getExpensesMonth(month)
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const getExpensesStocks = async () => await database.getExpensesStocks()
const addExpense = async (el) => await database.addExpense(el)
const addExpenseStock = async (el) => await database.addExpenseStock(el)
const updateExpense = async (el) => await database.updateExpense(el)
const rmExpense = async (el) => await database.rmExpense(el)
const rmExpenseStock = async (el) => await database.rmExpenseStock(el)
const putQuoteAnalysis = async (el) => await dexie.putQuoteAnalysis(el)
const getQuoteAnalysis = async () => await dexie.getQuoteAnalysis()
const putSlideValue = async (el) => await dexie.putSlideValue(el)
const getSlideValues = async () => await dexie.getSlideValues()
const deleteSetupSlide = async () => await dexie.deleteSetupSlide()

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
