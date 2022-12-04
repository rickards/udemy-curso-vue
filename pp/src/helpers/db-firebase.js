import utils from "@/plugins/utils";


const FIREBASE_ENVIROMENT = typeof window.firebase !== "undefined" &&
    window.firebase !== null &&
    (localStorage.database == 'pp' || !localStorage.database)

// DB
const DB = window.firebase
// Tables
const Table = {
    EXPENSE: "expense",
    EXPENSE_STOCKS: "expensesStocks",
    QA_ANALYSIS: "qaAnalysis"
}

var RAM = {};
Object.values(Table).map((i) => RAM[i] = [])

if (FIREBASE_ENVIROMENT) {
    // Abastecer a memória com os dados.
    let stringDatabase = DB.data()
    // stringDatabase = "{expense={-NFZ7y6zi1K9_VG9KMNc={date=2022-10-29, qtde=0, name=Teste2, type=Despesa, value=8990}, -NFZ7jw7c-CKhFFkQhFw={date=2022-10-29, qtde=0, name=Teste, type=Despesa, value=6700}}}"

    let re_expense_table = new RegExp("expense={(.*?)}}");
    const data_expenses = re_expense_table.exec(stringDatabase)
    let stringExpenses = data_expenses.length ? data_expenses[1] + "}" : ""

    const array = [...stringExpenses.matchAll(/\S+={.*?}/g)];
    array.forEach((match) => {
        let expense = match[0]
        //.replaceAll(/(\d{4}-\d{2}-\d{2})/ig, "'$1'")

        if (!expense.match(/del=1[,}]/i)) {
            RAM[Table.EXPENSE].push({
                id: match[1],
                date: expense.match(/date=(.*?)[,}]/i)[1],
                type: expense.match(/type=(.*?)[,}]/i)[1],
                name: expense.match(/name=(.*?)[,}]/i)[1],
                value: expense.match(/value=(.*?)[,}]/i)[1],
                qtde: expense.match(/qtde=(.*?)[,}]/i)[1],
            });
        }
    })

    let re_expenseStock_table = new RegExp("expensesStocks={(.*?)}}");
    const data_expensesStocks = re_expenseStock_table.exec(stringDatabase)
    let stringExpenseStock = data_expensesStocks ? data_expensesStocks[1] + "}" : ""

    const arrayExpenseStock = [...stringExpenseStock.matchAll(/\S+={.*?}/g)];
    arrayExpenseStock.forEach((match) => {
        let expenseStock = match[0]

        if (!expenseStock.match(/del=1[,}]/i)) {
            RAM[Table.EXPENSE_STOCKS].push({
                id: match[1],
                regex: expenseStock.match(/regex=(.*?)[,}]/i)[1]
            });
        }

    })
}

const proxy = async (...args) => {
    if (FIREBASE_ENVIROMENT) {
        const a = await DB.run(...args)
        console.log("veio do firebase", a)
        return a
    } else {
        return undefined
    }
}

const getExpenses = () => RAM[Table.EXPENSE]
const getExpensesMonth = (month) => {
    const groupByDate = utils.groupBy(
        this.expenses,
        (i) => i.date.slice(0, 7)
    );
    return groupByDate[month]
}
const getExpensesStocks = () => RAM[Table.EXPENSE_STOCKS]
const addExpense = async (expense) => await proxy('ADD', Table.EXPENSE, JSON.stringify(expense));
const addExpenseStock = async (el) => await proxy('ADD', Table.EXPENSE_STOCKS, JSON.stringify(el));
const updateExpense = async (expense) => await proxy('PUT', Table.EXPENSE, JSON.stringify(expense));
const rmExpense = async (expense) => await proxy('DEL', Table.EXPENSE, JSON.stringify(expense));
const rmExpenseStock = async (el) => await proxy('DEL', Table.EXPENSE_STOCKS, JSON.stringify(el));
const putQuoteAnalysis = async (el) => await proxy('PUT', Table.QA_ANALYSIS, JSON.stringify(el));
const getQuoteAnalysis = () => RAM[Table.QA_ANALYSIS]
// const putSlideValue = async (el) => await proxy('PUT', Table.QA_ANALYSIS, JSON.stringify({...el, id: 2}));
// const deleteSetupSlide = async () => await proxy('DEL', Table.QA_ANALYSIS, JSON.stringify({ id: 2 }));

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
    DB,
    FIREBASE_ENVIROMENT
};