<template>
    <div class="pp-input">
        <input v-model="regex" @keydown.enter="add" type="text"
            class="form-element" :placeholder="placeholder" style="color: #C0C0C0;">
        <button class="form-element" @click="add">+</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            regex: ''
        }
    },
    props: {
        placeholder: { type: String, required: false },
    },
    methods: {
        add() {
            this.$emit('billAdded', { regex: this.regex.slice() })
            this.regex = ''
        }
    }
}
</script>

<style>
    .pp-input {
        margin: 0 10px 25px 10px;
        font-size-adjust: unset;
    }

    .form-element {
        outline: none;
        font-size: 1.5rem;
        border: 1px solid rgb(3, 3, 3);
        padding: 5px 10px 8px;
        color: rgb(0, 0, 0);
    }

    input.form-element {
        width: calc(100% - 65px);
        background: #FFF2;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
    }

    button.form-element {
        border-left: none;
        background-color: #2196F3;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>
