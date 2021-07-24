import dexie from "./db-dexie";

function runAndroidMethod(nameMethod, jsonParams) {
  console.log(nameMethod, jsonParams);
  if (typeof window.Android !== "undefined" && window.Android !== null) {
    const javaReturn = window.Android.callFromDBJava(nameMethod, jsonParams);
    console.log("REBIDO PELO JS:", javaReturn);
    return JSON.parse(javaReturn);
  } else {
    //https://www.chartjs.org/samples/latest/charts/bar/horizontal.html
    return callDBLocal(nameMethod, jsonParams);
    // alert(nameMethod + " " + jsonParams)
  }
}

function callDBLocal(nameMethod, jsonParams) {
  if ((nameMethod == "getExpenses" && jsonParams == undefined)) return dexie.getExpenses();
  if (nameMethod == "addExpense") return dexie.addExpenses(jsonParams);
  if ((nameMethod == "getExpenseStocks"&& jsonParams == undefined)) return dexie.getExpensesStocks();
  if (nameMethod == "addExpenseStock") return dexie.addExpenseStock(jsonParams);
  if (nameMethod == "rmExpenseStock") return dexie.rmExpenseStock(jsonParams);
}

export default {
  runAndroidMethod
}
