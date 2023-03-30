<template>
    <n-layout has-sider class="main">
        <n-layout-sider :native-scrollbar="true" :collapsed-width="52" width="10rem" class="layout-sider"
            :collapse-mode="'width'" @collapse="isCollapsed = true" @expand="isCollapsed = false" :show-trigger="'bar'"
            :position="'static'" :collapsed="isCollapsed"
            content-style="min-height:100vh;padding: 2px;background-color:#8c918b;">
            <sideMenu :collapsed="isCollapsed"></sideMenu>
        </n-layout-sider>
        <n-layout style="width:100%;height:100vh;display:flex;flex-direction: column;" content-style="width:100%">
            <n-layout-header :bordered="true" :position="'static'" class="layout-header flex-column-center" style="">
                <header-bar @updateView="reload" @handleCollapse="isCollapsed = !isCollapsed"
                    v-bind:is-collapsed="isCollapsed"></header-bar>
            </n-layout-header>

            <n-layout-content :native-scrollbar="true" class="content" style="flex:1"
                content-style="width:100%;display:flex;padding: 0px 12px 0px 12px;background-color: #DCD9D4;background-image: linear-gradient(135deg, #f5f7fa 100%, var(--main-color) 100%)">
                <div style="width:100%;flex:1">
                    <div class="layout-viseheader">
                        <tabs @updateView="reload"></tabs>
                    </div>
                    <div  style="margin-top:5px;width:100%;height:99%;">
                        <router-view v-if="showView" v-slot="{ Component }">
                            <keep-alive>
                                <component :is="Component" />
                            </keep-alive>
                        </router-view>
                    </div>
                </div>

            </n-layout-content>
        </n-layout>
    </n-layout>
</template>

<script setup lang="ts">
import { ref,nextTick } from 'vue'
import sideMenu from './sideMenu/sideMenu.vue'
import headerBar from './headerBar/headerBar.vue'
import tabs from './tabs/tabs.vue'
import{ useDebounceFn} from'@vueuse/core'
const isCollapsed = ref(false)
let showView = ref(true)
let reload = useDebounceFn(()=>{
    showView.value = false
    nextTick(()=>{
        showView.value = true
    })
    // setTimeout(() => {
    //     showView.value = true
    // }, 200);
},600)

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
    box-shadow: 0px 2px 10px rgba(203, 213, 230,.8);

}

.layout-viseheader {
    /* position:fixed; */
    width:100%;
    /* height: 40px; */
}

.content {
    margin-top:5px;
    min-height: calc(100vh - 67px);
    height: calc(100vh - 67px);
}
</style>