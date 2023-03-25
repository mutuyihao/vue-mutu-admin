<template>
    <n-layout has-sider class="main">
        <n-layout-sider :collapsed-width="52" width="10rem" class="layout-sider" :collapse-mode="'width'"
            @collapse="isCollapsed = true" @expand="isCollapsed = false" :show-trigger="'bar'" :native-scrollbar="false"
            :position="'static'" :collapsed="isCollapsed"
            content-style="min-height:100vh;padding: 2px;background-color:#8c918b;">
            <sideMenu></sideMenu>
        </n-layout-sider>
        <n-layout style="height:100vh;display:flex;" content-style="width:100%">
            <n-layout-header :position="'static'" class="layout-header flex-column-center" style="">
                <header-bar @updateView="reload" @handleCollapse="isCollapsed = !isCollapsed"
                    v-bind:is-collapsed="isCollapsed"></header-bar>
            </n-layout-header>
            <n-layout-content class="content" style="flex:1"
                content-style="width:100%;max-height:100vh;display:flex;padding: 24px;background-color: #DCD9D4;background-image: linear-gradient(135deg, #f5f7fa 0%, var(--main-color) 100%)">
                <div style="flex:1">
                    <router-view v-if="showView"></router-view>
                </div>
            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import sideMenu from './sideMenu/sideMenu.vue'
import headerBar from './headerBar/headerBar.vue'
const isCollapsed = ref(false)
let showView = ref(true)
function reload() {
    showView.value = false
    setTimeout(() => {
        showView.value = true
    }, 300);
}
</script>

<style scoped>
.main {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(135deg, #f5f7fa 0%, var(--main-color) 100%);
}

.layout-header {

    height: 61.66px;
    align-items: space-between;
}

.content {
    height: calc(100vh - 62px)
}
</style>