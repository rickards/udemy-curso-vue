import bridge from "./db-bridge";

const getExpensesDatabase = async () => {
  const expenses = await bridge.runAndroidMethod("getExpenses")
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const addExpenseDatabase = async (expense) => await bridge.runAndroidMethod("addExpense", JSON.stringify(expense));
const updateExpenseDatabase = async (expense) => await bridge.runAndroidMethod("updateExpense", JSON.stringify(expense));
const getExpenseStocksDatabase = async () => await bridge.runAndroidMethod("getExpenseStocks");
const addExpenseStockDatabase = async (el) => await bridge.runAndroidMethod("addExpenseStock", JSON.stringify(el));
const rmExpenseStockDatabase = async (el) => await bridge.runAndroidMethod("rmExpenseStock", JSON.stringify(el));
const putQuoteAnalysis = async (el) => await bridge.runAndroidMethod("putQuoteAnalysis", JSON.stringify(el));
const getQuoteAnalysis = async () => await bridge.runAndroidMethod("getQuoteAnalysis");
const putSlideValue = async (el) => await bridge.runAndroidMethod("putSlideValue", JSON.stringify(el));
const getSlideValues = async () => await bridge.runAndroidMethod("getSlideValues");
const deleteSetupSlide = async () => await bridge.runAndroidMethod("deleteSetupSlide");

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
