<template>
    <div @click="$emit('billStateChanged', bill)"
        class="column bill" :class="stateClass">
        <span @click.stop="$emit('billDeleted', bill)" class="close">x</span>
        <p>{{ bill.name }}</p>
        <div class="center">
            <p class="center-item">{{ bill.value }}</p>
            <p class="center-item">{{ bill.percent }}%</p>
        </div>
        <p>Min: Max:</p>
    </div>
</template>

<script>
export default {
    props: {
        bill: { type: Object, required: true }
    },
    computed: {
        stateClass() {
            return {
                pending: this.bill.pending,
                done: !this.bill.pending
            }
        }
    }
}
</script>

<style>
    .bill {
        position: relative;
        box-sizing: border-box;
        border-radius: 8px;
        font-size: min(1.2rem, 5vw);
        /* font-weight: 300; */
        cursor: pointer;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        /* user-select: none; */
        /* display: absolute; */
        /* justify-content: center; */
        /* align-items: center; */
        
    }

    /* Float four columns side by side */
    .column {
        width: 25%;
    }

    /* Responsive columns - one column layout (vertical) on small screens */
    @media screen and (min-width: 1201px) and  (max-width: 1600px){
        .column {
            width: 40%;
        }
    }

    /* Responsive columns - one column layout (vertical) on small screens */
    @media screen and (max-width: 1200px) {
        .column {
            width: 100%;
        }
    }

    .center {
        display: flex;
    }

    .center-item{
        width: 48%;
        font-size: min(1.8rem, 5vw);
        border-style: solid;
        border-color: rgb(185, 181, 181);
    }

    .pending {
        border-left: 12px solid #B73229;
        background-color: #F44336;
    }

    .done {
        color: rgb(17, 17, 17);
        border-left: 12px solid #f0f5f0;
        background-color: #f0f5f0;
        /* text-decoration: line-through; */
    }

    .pending .close {
        background-color: #B73229;
    }

    .done .close {
        background-color: #b2b4bb;
    }

    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        height: 20px;
        width: 20px;
        border-radius: 10px;
        display: flex;
        justify-content: center;
    }

    .value {
        position: absolute;
        right: 152px;
        top: 25px;
        border-radius: 5px;
        border-style: solid;
        border-color: rgb(185, 181, 181);
        width: 120px;
        height: 40px;
    }

    .percent {
        position: absolute;
        left: 152px;
        top: 25px;
        border-radius: 5px;
        border-style: solid;
        border-color: rgb(185, 181, 181);
        width: 120px;
        height: 40px;
    }

    .title {
        position: absolute;
        padding-left: 30px;
        font-size: 1.2rem;
    }
</style>
