import dexie from "./db-dexie";
import firebase from "./db-firebase";

const database = firebase.FIREBASE_ENVIROMENT ? firebase : dexie

const getExpenses = () => {
  const expenses = database.getExpenses()
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const getExpensesMonth = (month) => {
  const expenses = database.getExpensesMonth(month)
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const getExpensesStocks = () => database.getExpensesStocks()
const addExpense = (expense) => database.addExpense(expense)
const addExpenseStock = (el) => database.addExpenseStock(el)
const updateExpense = (expense) => database.updateExpense(expense)
const rmExpense = (expense) => database.rmExpense(expense)
const rmExpenseStock = (el) => database.rmExpenseStock(el)
const putQuoteAnalysis = (el) => database.putQuoteAnalysis(el)
const getQuoteAnalysis = () => database.getQuoteAnalysis()
const putSlideValue = (el) => dexie.putSlideValue(el)
const getSlideValues = () => dexie.getSlideValues()
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
