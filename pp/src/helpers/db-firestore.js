const FIRESTORE_ENVIROMENT = typeof window.firestore !== "undefined" && window.firestore !== null

// DB
const DB = window.firestore
// Tables
const Table = {
    EXPENSE: "expense",
    EXPENSE_STOCKS: "expensesStocks",
    QA_ANALYSIS: "qaAnalysis"
}

const addExpense = async (expense) => await DB.run('add', Table.EXPENSE, JSON.stringify(expense));
const getExpenses = async () => await DB.run('getAll', Table.EXPENSE)
const getExpensesStocks = async () => await DB.run('getAll', Table.EXPENSE_STOCKS);
const addExpenseStock = async (el) => await DB.run('add', Table.EXPENSE_STOCKS, JSON.stringify(el));
const updateExpense = async (expense) => await DB.run('update', Table.EXPENSE, JSON.stringify(expense));
const rmExpenseStock = async (el) => await DB.run('del', Table.EXPENSE_STOCKS, JSON.stringify(el));
const putQuoteAnalysis = async (el) => await DB.run('update', Table.QA_ANALYSIS, JSON.stringify({...el, id: 1}));
const getQuoteAnalysis = async () => await DB.run('get', Table.QA_ANALYSIS, JSON.stringify({ id: 1 }));
const putSlideValue = async (el) => await DB.run('update', Table.QA_ANALYSIS, JSON.stringify({...el, id: 2}));
const getSlideValues = async () => await DB.run('get', Table.QA_ANALYSIS, JSON.stringify({ id: 2 }));
const deleteSetupSlide = async () => await DB.run('del', Table.QA_ANALYSIS, JSON.stringify({ id: 2 }));

export default {
    getExpenses,
    getExpensesStocks,
    addExpense,
    addExpenseStock,
    rmExpenseStock,
    updateExpense,
    putQuoteAnalysis,
    getQuoteAnalysis,
    putSlideValue,
    getSlideValues,
    deleteSetupSlide,
  };