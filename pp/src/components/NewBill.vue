<template>
    <div class="new-bill">
        <input v-model="name" @keydown.enter="add" type="text"
            class="form-element" placeholder="<conta> = <sua regex>">
        <button class="form-element" @click="add">+</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        add() {
            this.$emit('billAdded', { name: this.name })
            this.name = ''
        }
    }
}
</script>

<style>
    .new-bill {
        margin: 35px 15px 35px 15px;
        font-size-adjust: unset;
    }

    .form-element {
        outline: none;
        font-size: 2rem;
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
