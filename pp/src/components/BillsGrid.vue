<template>
    <div>
        <h5 v-if="title">{{title}}</h5>
        <div class="bill-grid">
            <template v-if="bills.length">
                <Bill v-for="(bill, i) in bills" :key="bill.name"
                    @billDeleted="$emit('billDeleted', i)"
                    @billStateChanged="$emit('billStateChanged', i)"
                    :bill="bill"></Bill>
            </template>
            <p v-else class="no-bill">Sua vida está em dia :)</p>
        </div>
    </div>
</template>

<script>
import Bill from './Bill.vue'

export default {
    components: { Bill },
    props: {
        bills: { type: Array, required: true },
        title: { type: String, required: false}
    }
}
</script>

<style>
    .bill-grid {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .bill-grid .bill {
        margin: 10px;
    }

    .no-bill {
        color: #AAA;
        font-size: 1.7rem;
    }
</style>
