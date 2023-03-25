<template>
    <div class="headerBar-main">
        <div class="flex-center">
            <NIcon size="1.5rem" @click="$emit('handleCollapse')">
                <MenuFoldOutlined class="fold-btn" v-show="!isCollapsed" />
                <MenuUnfoldOutlined class="fold-btn" v-show="isCollapsed" />
            </NIcon>
        </div>
        <div class="flex-center">
            <NIcon size="1.5rem" @click="$emit('updateView')">
                <ReloadOutlined class="fold-btn" />
            </NIcon>
        </div>
        <div>
            <n-breadcrumb>
                <template v-for="item in breadcrumbList">
                    <n-breadcrumb-item :href="item.path" separator=">">{{ item.meta.title }}</n-breadcrumb-item>
                </template>
            </n-breadcrumb>
        </div>
        <div></div>
    </div>
</template>

<script setup lang="ts">
import { defineProps,reactive } from 'vue';
import { useRoute,type RouteLocationMatched } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined } from '@vicons/antd'
defineProps({
    isCollapsed: Boolean
})
let route = useRoute()
let breadcrumbList = reactive<RouteLocationMatched[]>([])
route.matched.map((item)=>breadcrumbList.push(item))
console.log(breadcrumbList)
</script>

<style scoped>
.headerBar-main {
    width: 98%;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.fold-btn {
    cursor: pointer;
}
</style>