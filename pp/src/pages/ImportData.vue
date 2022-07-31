<template>
    <div class="container">
        <div class="large-12 medium-12 small-12 cell">
            <h1>Vue JS Axios - Image Upload using PHP API - ItSolutionStuff.com</h1>
            <label>File
                <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" />
            </label>
            <button v-on:click="submitForm()">Upload</button>
            <pre :key="text">{{ text }}</pre>
            <button class="acc-record-button" @click="sendRecords">SEND</button>
        </div>
    </div>
</template>
<script>
import database from "@/helpers/db-interface";

export default {
    name: "ImportData",
    data() {
        return {
            file: '',
            text: ''
        }
    },
    created() {
    },
    methods: {
        submitForm() {
            this.startRead()
        },

        onChangeFileUpload() {
            this.file = this.$refs.file.files[0];
        },

        startRead() {
            // obtain input element through DOM

            if (this.file) {
                this.getAsText(this.file);
            }
        },

        getAsText(readFile) {

            var reader = new FileReader();

            // Read file into memory as UTF-16
            reader.readAsText(readFile, "UTF-8");

            // Handle progress, success, and errors
            reader.onprogress = this.updateProgress;
            reader.onload = this.loaded;
            reader.onerror = this.errorHandler;
        },

        updateProgress(evt) {
            if (evt.lengthComputable) {
                // evt.loaded and evt.total are ProgressEvent properties
                var loaded = (evt.loaded / evt.total);
                if (loaded < 1) {
                    // Increase the prog bar length
                    // style.width = (loaded * 200) + "px";
                }
            }
        },

        loaded(evt) {
            // Obtain the read file data
            var fileString = evt.target.result;
            // Handle UTF-16 file dump
            // if (utils.regexp.isChinese(fileString)) {
            //     //Chinese Characters + Name validation
            // }
            // else {
            //     // run other charset test
            // }
            // xhr.send(fileString)
            this.text = fileString
        },

        errorHandler(evt) {
            if (evt.target.error.name == "NotReadableError") {
                // The file could not be read
            }
        },

        sendRecords() {
            this.text.split(["\n"]).map((i) => {
                const line = i.split([","])
                var expense = {
                    name: line[2].trim(),
                    value: line[5]*100,
                    date: line[0],
                    type: line[4],
                    qtde: line[3],
                };
                database.addExpenseDatabase(expense);
            })
        }
    },
}
</script>
<style>
</style>