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

const updateDatabase = async (stringDatabase) => {
    Object.values(Table).map((i) => RAM[i] = [])

    if (FIREBASE_ENVIROMENT) {
        // Abastecer a memória com os dados.
        // stringDatabase = "{expense={-NFZ7y6zi1K9_VG9KMNc={date=2022-10-29, qtde=0, name=Teste2, type=Despesa, value=8990}, -NFZ7jw7c-CKhFFkQhFw={date=2022-10-29, qtde=0, name=Teste, type=Despesa, value=6700}}}"

        let re_expense_table = new RegExp("expense={(.*?)}}");
        const data_expenses = re_expense_table.exec(stringDatabase)
        let stringExpenses = data_expenses.length ? data_expenses[1] + "}" : ""

        const array = [...stringExpenses.matchAll(/\S{20}={.*?}/g)];
        array.forEach((match) => {
            let expense = match[0]
            //.replaceAll(/(\d{4}-\d{2}-\d{2})/ig, "'$1'")

            if (!expense.match(/del=1[,}]/i)) {
                RAM[Table.EXPENSE].push({
                    id: expense.match(/(\S{20})={.*?}/i)[1],
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

        const arrayExpenseStock = [...stringExpenseStock.matchAll(/\S{20}={.*?}/g)];
        arrayExpenseStock.forEach((match) => {
            let expenseStock = match[0]

            if (!expenseStock.match(/del=1[,}]/i)) {
                RAM[Table.EXPENSE_STOCKS].push({
                    id: expenseStock.match(/(\S{20})={.*?}/i)[1],
                    regex: expenseStock.match(/regex=(.*?)[,}]/i)[1]
                });
            }

        })
    }
}

const proxy = async (...args) => {
    if (FIREBASE_ENVIROMENT) {
        return await DB.run(...args)
    } else {
        return undefined
    }
}

const proxyGets = async (ret) => {
    const data = await DB.data()
    if (data == ""){
        return RAM[ret]
    } else {
        await updateDatabase(data)
        return RAM[ret]
    }
}

const getExpenses = async () => await proxyGets(Table.EXPENSE)
const getExpensesMonth = async (month) => {
    if (month=="") return await getExpenses()
    const groupByDate = utils.groupBy(
        await getExpenses(),
        (i) => i.date.slice(0, 7)
    );
    return groupByDate[month] || []
}
const getExpensesStocks = async () => await proxyGets(Table.EXPENSE_STOCKS)
const addExpense = async (el) => await proxy('ADD', Table.EXPENSE, JSON.stringify(el));
const addExpenseStock = async (el) => await proxy('ADD', Table.EXPENSE_STOCKS, JSON.stringify(el));
const updateExpense = async (el) => await proxy('PUT', Table.EXPENSE, JSON.stringify(el));
const rmExpense = async (el) => await proxy('DEL', Table.EXPENSE, JSON.stringify(el));
const rmExpenseStock = async (el) => await proxy('DEL', Table.EXPENSE_STOCKS, JSON.stringify(el));
const putQuoteAnalysis = async (el) => await proxy('PUT', Table.QA_ANALYSIS, JSON.stringify(el));
const getQuoteAnalysis = async () => await proxyGets(Table.QA_ANALYSIS)
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