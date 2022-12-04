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
const addExpense = async (expense) => await database.addExpense(expense)
const addExpenseStock = async (el) => await database.addExpenseStock(el)
const updateExpense = async (expense) => database.updateExpense(expense)
const rmExpense = async (expense) => database.rmExpense(expense)
const rmExpenseStock = async (el) => database.rmExpenseStock(el)
const putQuoteAnalysis = async (el) => database.putQuoteAnalysis(el)
const getQuoteAnalysis = async () => await database.getQuoteAnalysis()
const putSlideValue = async (el) => dexie.putSlideValue(el)
const getSlideValues = async () => await dexie.getSlideValues()
const deleteSetupSlide = async () => dexie.deleteSetupSlide()

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
