import bridge from "./db-bridge";

const getExpensesDatabase = async () => {
  const expenses = await bridge.runAndroidMethod("getExpenses")
  return expenses.map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const addExpenseDatabase = (expense) => {
  bridge.runAndroidMethod("addExpense", JSON.stringify(expense));
}

const updateExpenseDatabase = (expense) => {
  bridge.runAndroidMethod("updateExpense", JSON.stringify(expense));
}

const getExpenseStocksDatabase = () => {
  return bridge.runAndroidMethod("getExpenseStocks");
}

const addExpenseStockDatabase = (el) => {
  return bridge.runAndroidMethod("addExpenseStock", JSON.stringify(el));
}

const rmExpenseStockDatabase = (el) => {
  return bridge.runAndroidMethod("rmExpenseStock", JSON.stringify(el));
}

export default {
  getExpensesDatabase,
  addExpenseDatabase,
  updateExpenseDatabase,
  getExpenseStocksDatabase,
  addExpenseStockDatabase,
  rmExpenseStockDatabase
};
