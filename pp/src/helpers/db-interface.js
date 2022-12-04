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
const addExpense = (el) => database.addExpense(el)
const addExpenseStock = (el) => database.addExpenseStock(el)
const updateExpense = (el) => database.updateExpense(el)
const rmExpense = (el) => database.rmExpense(el)
const rmExpenseStock = (el) => database.rmExpenseStock(el)
const putQuoteAnalysis = (el) => dexie.putQuoteAnalysis(el)
const getQuoteAnalysis = async () => await dexie.getQuoteAnalysis()
const putSlideValue = (el) => dexie.putSlideValue(el)
const getSlideValues = async () => await dexie.getSlideValues()
const deleteSetupSlide = () => dexie.deleteSetupSlide()

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
