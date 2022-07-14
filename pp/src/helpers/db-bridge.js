import dexie from "./db-dexie";

const FIRESTORE_ENVIROMENT = typeof window.firestore !== "undefined" && window.firestore !== null

function runAndroidMethod(nameMethod, jsonParams) {
  console.log(nameMethod, jsonParams);
  if (FIRESTORE_ENVIROMENT) {
    const javaReturn = window.firestore.run(nameMethod, jsonParams);
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
  if ((nameMethod == "getExpenseStocks" && jsonParams == undefined)) return dexie.getExpensesStocks();
  if (nameMethod == "addExpenseStock") return dexie.addExpenseStock(jsonParams);
  if (nameMethod == "rmExpenseStock") return dexie.rmExpenseStock(jsonParams);
  if (nameMethod == "putQuoteAnalysis") return dexie.putQuoteAnalysis(jsonParams);
  if ((nameMethod == "getQuoteAnalysis" && jsonParams == undefined)) return dexie.getQuoteAnalysis();
  if (nameMethod == "putSlideValue") return dexie.putSlideValue(jsonParams);
  if ((nameMethod == "getSlideValues" && jsonParams == undefined)) return dexie.getSlideValues();
  if (nameMethod == "deleteSetupSlide") return dexie.deleteSetupSlide();
}

export default {
  runAndroidMethod,
  FIRESTORE_ENVIROMENT,
}
