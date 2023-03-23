<template>
    <n-layout has-sider class="main">
        <n-layout-sider class="layout-sider" :collapse-mode="'width'" @collapse="isCollapsed = true"
            @expand="isCollapsed = false" :show-trigger="'bar'" :native-scrollbar="false" :position="'static'"
            :collapsed="isCollapsed"
            content-style="min-height:100vh;padding: 10px;background-image: linear-gradient(135deg, #3083DC 0%, var(--main-color) 110%);">
            <sideMenu></sideMenu>
        </n-layout-sider>
        <n-layout style="height:100vh;display:flex;" content-style="width:100%">
            <n-layout-header :position="'static'">
                321
                <div>
                    <div></div>
                    <div></div>
                </div>
            </n-layout-header>
            <n-layout-content class="content" style="flex:1"
                content-style="width:100%;max-height:100vh;display:flex;padding: 24px;background-image: linear-gradient(135deg, #f5f7fa 0%, var(--main-color) 100%);">
                <div style="flex:1">
                    <router-view></router-view>
                </div>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import sideMenu from './sideMenu/sideMenu.vue'
const isCollapsed = ref(false)
</script>

<style scoped>
.main {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(135deg, #f5f7fa 0%, var(--main-color) 100%);
}
.content{
    height:calc(100vh - 48px)
}
</style>