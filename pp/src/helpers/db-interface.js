import bridge from "./db-bridge";

const getExpensesDatabase = async () => {
  const expenses = await bridge.runAndroidMethod("getExpenses")
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const addExpenseDatabase = async (expense) => {
  return await bridge.runAndroidMethod("addExpense", JSON.stringify(expense));
}

const updateExpenseDatabase = async (expense) => {
  return await bridge.runAndroidMethod("updateExpense", JSON.stringify(expense));
}

const getExpenseStocksDatabase = async () => {
  return await bridge.runAndroidMethod("getExpenseStocks");
}

const addExpenseStockDatabase = async (el) => {
  return await bridge.runAndroidMethod("addExpenseStock", JSON.stringify(el));
}

const rmExpenseStockDatabase = async (el) => {
  return await bridge.runAndroidMethod("rmExpenseStock", JSON.stringify(el));
}

const putQuoteAnalysis = async (el) => {
  return await bridge.runAndroidMethod("putQuoteAnalysis", JSON.stringify(el));
}

export default {
  getExpensesDatabase,
  addExpenseDatabase,
  updateExpenseDatabase,
  getExpenseStocksDatabase,
  addExpenseStockDatabase,
  rmExpenseStockDatabase,
  putQuoteAnalysis
};
