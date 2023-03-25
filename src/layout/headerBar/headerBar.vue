<template>
    <div class="headerBar-main">
        <div class="flex-center">
            <NIcon size="1.5rem">
                <MenuFoldOutlined  class="fold-btn" v-show="!isCollapsed" />
                <MenuUnfoldOutlined class="fold-btn" v-show="isCollapsed" />
            </NIcon>
        </div>
        <div class="flex-center">
            <NIcon size="1.5rem" >
                <ReloadOutlined @click="$emit('updateView')" class="fold-btn" />
            </NIcon>
        </div>
        <div></div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined,ReloadOutlined } from '@vicons/antd'

defineProps({
    isCollapsed: Boolean
})


</script>

<style scoped>
.headerBar-main {
    width: 98%;
    display:flex;
    align-items:center;
}
.fold-btn{
    cursor:pointer;
}
</style>