<template>
  <div>
    <button @click="downloadCSVData">Download</button>
    <ul>
    <li v-for="item in databaseArray" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import database from "@/helpers/db-interface";
// import JsonCSV from 'vue-json-csv'

export default {
  name: "Backup",
  // components: {
  //     'downloadCsv': JsonCSV
  // },
  created() {
    console.log("print database");
    database.getExpensesDatabase().then((resp) => {
      resp.forEach((element) => {
        this.databaseArray.push(Object.values(element).join(","));
      });
    });
  },
  data() {
    return {
      databaseArray: [],
    };
  },
  methods: {
    downloadCSVData() {
      console.log("Downloading...");

      const anchor = document.createElement("a");
      anchor.href =
        "data:text/csv;charset=utf-8," +
        encodeURIComponent(this.databaseArray.join("\n"));
      anchor.target = "_blank";
      anchor.download = "backup.csv";
      anchor.click();
    },
  },
};
</script>

<style>
</style>