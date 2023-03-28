<template>
    <div>
        <draggable class="tabs-main flex-center" item-key="name" :list="tabs" :sort="true">
            <template #item="{ element }">
                <div :key="element.name" @click="handleClickTab(element.fullPath)" class="tab-card flex-center pretendBtn">
                    <div :class="['normal-tab', { 'active-tab': element.name == route.meta.title }]">
                        {{ element.name }}
                    </div>
                    <div v-show="element.name != '主控台'" class="flex-center">
                        <NIcon @click.stop="handleClose(element.name)" size="1rem" class="tab-icon" :depth="3">
                            <CloseCircleOutlined />
                        </NIcon>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import { CloseCircleOutlined } from '@vicons/antd'
import router from '@/router';
interface Tab {
    name: string,
    fullPath: string
}
let tabs: Tab[] = reactive([{ name: "主控台", fullPath: "/dashboard/console" }])

let route = useRoute()
watch(route, (newVal) => {
    let tab: Tab = {
        name: newVal.meta.title as string,
        fullPath: newVal.fullPath
    }
    if (tabs.length >= 1) {
        for (let i of tabs) {
            if (i.name == tab.name) {
                return
            }
        }
    }
    tabs.push(tab)
}, { immediate: true })

function handleClose(e: string) {
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].name == e) {
            if (e == route.meta.title) {
                handleClickTab(tabs[i - 1].fullPath)
            }
            tabs.splice(i, 1)
        }
    }
}
function handleClickTab(path: string) {
    router.replace({ path: path })
}

</script>
<style scoped>
.tabs-main {
    justify-content: flex-start;
    gap: 10px;
}

.tab-card {
    font-size: 1rem;
    background-color: white;
    gap: 5px;
    padding: 3px 10px;
}

.normal-tab {
    color: #e2dfdb;
}

.active-tab {
    color: var(--side-color)
}

.tab-icon:hover {
    /* color:black; */
    --n-opacity: 1 !important;
}
</style>