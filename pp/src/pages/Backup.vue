<template>
    <div>
        <button @click="downloadCSVData">Download</button>
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
    created(){
        console.log("print database")
    },
    methods: {
        downloadCSVData() {
            console.log("Downloading...")
            let csv = 'Put,Column,Titles,Here\n';

            database.getExpensesDatabase().then((resp) => {
                resp.forEach((element) => {
                    csv += Object.values(element).join(',');
                    csv += "\n";
                });

                const anchor = document.createElement('a');
                anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
                anchor.target = '_blank';
                anchor.download = 'backup.csv';
                anchor.click();
            });
        }
    }
}
</script>

<style>

</style>