const FIREBASE_ENVIROMENT = typeof window.firebase !== "undefined" && window.firebase !== null

// DB
const DB = window.firebase
// Tables
const Table = {
    EXPENSE: "expense",
    EXPENSE_STOCKS: "expensesStocks",
    QA_ANALYSIS: "qaAnalysis"
}

const proxy = async (...args) => {
    if (FIREBASE_ENVIROMENT){
        return await DB.run(...args)
    } else {
        return undefined
    }
}

const addExpense = async (expense) => await proxy('ADD', Table.EXPENSE, JSON.stringify(expense));
const addExpenseStock = async (el) => await proxy('ADD', Table.EXPENSE_STOCKS, JSON.stringify(el));
const updateExpense = async (expense) => await proxy('PUT', Table.EXPENSE, JSON.stringify(expense));
const rmExpense = async (expense) => await proxy('DEL', Table.EXPENSE, JSON.stringify(expense));
const rmExpenseStock = async (el) => await proxy('DEL', Table.EXPENSE_STOCKS, JSON.stringify(el));
const putQuoteAnalysis = async (el) => await proxy('PUT', Table.QA_ANALYSIS, JSON.stringify({...el, id: 1}));
const putSlideValue = async (el) => await proxy('PUT', Table.QA_ANALYSIS, JSON.stringify({...el, id: 2}));
const deleteSetupSlide = async () => await proxy('DEL', Table.QA_ANALYSIS, JSON.stringify({ id: 2 }));

export default {
    addExpense,
    addExpenseStock,
    rmExpense,
    rmExpenseStock,
    updateExpense,
    putQuoteAnalysis,
    putSlideValue,
    deleteSetupSlide,
    DB,
    FIREBASE_ENVIROMENT
  };