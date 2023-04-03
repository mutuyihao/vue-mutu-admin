<template>
    <div class="show-main flex-center">
        <div class="show-table-main">
            <showTable @on-update:page="setTableStyle1" ></showTable>
            <showTable @on-update:page="setTableStyle1" ></showTable>
            <showTable @on-update:page="setTableStyle1" ></showTable>
            <showTable @on-update:page="setTableStyle1" ></showTable>
            
        </div>
       
    </div>
</template>

<script setup lang="ts">
import showTable from './table/show-table.vue'

function setTableStyle1(pageNum:number){
    console.log(pageNum)
}
</script>

<style scoped>
    .show-table-main{
        width:100%;
        height:calc(100vh - 24rem);
    }
</style>