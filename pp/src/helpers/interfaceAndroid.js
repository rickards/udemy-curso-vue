import db from "./database";

const getExpensesDatabase = () => {
  return db.runAndroidMethod("getExpenses").map((i) => {
    return { ...i, value: i.value / 100 };
  });
};

const getExpenseStocksDatabase = () => {
  return db.runAndroidMethod("getExpenseStocks");
}

const addExpenseStockDatabase = (el) => {
  return db.runAndroidMethod("addExpenseStock", JSON.stringify(el));
}

const rmExpenseStockDatabase = (el) => {
  return db.runAndroidMethod("rmExpenseStock", JSON.stringify(el));
}

const addExpenseDatabase = (expense) => {
  db.runAndroidMethod("addExpense", JSON.stringify(expense));
}

const updateExpenseDatabase = (expense) => {
  db.runAndroidMethod("updateExpense", JSON.stringify(expense));
}

export default {
  getExpensesDatabase,
  getExpenseStocksDatabase,
  addExpenseStockDatabase,
  rmExpenseStockDatabase,
  addExpenseDatabase,
  updateExpenseDatabase
};
