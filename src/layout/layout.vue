<template>
    <n-layout has-sider class="main">
        <n-layout-sider v-if="!isMobile" :native-scrollbar="true" :collapsed-width="52" width="10rem" class="layout-sider"
            :collapse-mode="'width'" @collapse="isCollapsed = true" @expand="isCollapsed = false" :show-trigger="'bar'"
            :position="'static'" :collapsed="isCollapsed"
            content-style="overflow:hidden;min-height:100vh;padding: 2px;background-color:#8c918b;">
            <sideMenu :collapsed="isCollapsed"></sideMenu>
        </n-layout-sider>
        <n-drawer content-style="overflow:hidden;min-height:100vh;padding: 2px;background-color:#8c918b;"
            class="layout-sider-drawer" v-else v-model:show="isCollapsed" :width="200" :placement="'left'">
            <sideMenu :collapsed="!isMobile" @click-menu-item="() => isCollapsed = false"></sideMenu>
        </n-drawer>
        <n-layout style="width: 100%; height: 100vh; display: flex; flex-direction: column" content-style="width:100%">
            <n-layout-header :bordered="true" :position="'static'" class="layout-header flex-column-center">
                <header-bar @updateView="reload" @handleCollapse="isCollapsed = !isCollapsed"
                    v-bind:is-collapsed="isCollapsed"></header-bar>
            </n-layout-header>
            <n-layout-content :position="'static'"
                content-style="overflow:auto;;display:flex;flex-direction:row;padding: 5px 18px 5px 15px;background-color: #DCD9D4;background-image: linear-gradient(135deg, #f5f7fa 100%, var(--main-color) 100%)">
                <div class="layout-viseheader">
                    <tabs @updateView="reload"></tabs>
                </div>
            </n-layout-content>
            <div class="content flex-center">
                <div class="content-main">
                    <router-view v-if="showView" v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </div>
            </div>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import sideMenu from './sideMenu/sideMenu.vue'
import headerBar from './headerBar/headerBar.vue'
import tabs from './tabs/tabs.vue'
import { useDebounceFn } from '@vueuse/core'
import * as pinia from '@/stores'
import { storeToRefs } from 'pinia'
let user = pinia.useAccountStore()
let { isMobile } = storeToRefs(user)

const isCollapsed = ref(false)
let showView = ref(true)
let reload = useDebounceFn(() => {
    showView.value = false
    nextTick(() => {
        showView.value = true
    })
}, 600)
</script>

<style scoped>
.main {
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(135deg, #f5f7fa 0%, var(--main-color) 100%);
}

.layout-header {
    align-items: space-between;
    height: 61.66px;
    box-shadow: 0px 2px 10px rgba(203, 213, 230, 0.8);
}

.layout-viseheader {
    /* position:fixed; */
    width: 100%;
    /* height: 3rem;; */
}

.layout-sider-drawer {
    background-color: #8c918b;
}

.content {
    overflow: auto;
    flex: auto;
    position: relative;
    /* width: 100%; */
    height: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
    margin: 0px 0px 0px 0px;
    background-color: #dcd9d4;
    background-image: linear-gradient(135deg,
            #f5f7fa 100%,
            var(--main-color) 100%);
}

.content-main {
    flex: 1;
    width: 0;
    padding: 0px 15px 0px 15px;
    height: 100%;
    overflow: auto;
}

.content-main::-webkit-scrollbar {
    opacity: 0.9;
    border-radius: 1rem;
    width: 0.6rem;
    height: 0.6rem;
    background-color: #cccccc;
}

.content-main::-webkit-scrollbar-thumb {
    opacity: 0.9;
    border-radius: 1rem;
    background-color: rgb(153, 153, 153);
}
</style>
