<template>
    <div class="stock-card stock-labels">
        <p>{{bill.name}}</p>
        <h2>R$ {{bill.value}}</h2>
        <p :class="{green: bill.percent>=0,
                    red: bill.percent<0
                    }">
            {{bill.value * bill.percent / 100}} ({{bill.percent}}%)
            <span v-if="bill.percent>=0">⇧</span>
            <span v-else>⇩</span>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        bill: { type: Object, required: true },
    }
}
</script>

<style>
    .stock-card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        margin: 2%;
        width: 95%;
    }

    .stock-labels {
        text-align: left;
        padding-left: 3%;
    }

    .red {
        color: tomato;
    }

    .green {
        color: teal;
    }


</style>
