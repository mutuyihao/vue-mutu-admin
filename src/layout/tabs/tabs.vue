<template>
    <div style="position:relative;">
        <draggable class="tabs-main flex-center" item-key="name" :list="tabs" :sort="true">
            <template #item="{ element }">
                <div :key="element.name" @click="handleClickTab(element.fullPath)"
                    :class="['tab-card', 'flex-center', 'pretendBtn', { 'active-tab': element.name == route.meta.title }]">
                    <div :class="['normal-tab']">
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
        <n-dropdown trigger="hover" :options="options" @select="handleSelect">
            <div class="tabs-menu flex-center pretendBtn">
                <NIcon size="1rem">
                    <DownOutlined />
                </NIcon>
            </div>
        </n-dropdown>
    </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import draggable from 'vuedraggable'
import { CloseCircleOutlined, DownOutlined, ReloadOutlined, CloseOutlined, MinusSquareOutlined, MinusOutlined } from '@vicons/antd'
import router from '@/router';
import { renderIcon } from '@/utils';
interface Tab {
    name: string,
    fullPath: string
}
let tabs: Tab[] = localStorage.getItem("TABS") ? reactive(JSON.parse(localStorage.getItem("TABS") as string)) : reactive([{ name: "主控台", fullPath: "/dashboard/console" }])

window.addEventListener("beforeunload", ()=>{
   localStorage.setItem("TABS", JSON.stringify(tabs))
})
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
const emit = defineEmits(['updateView'])
let options = computed(() => {
    let isDisabled = tabs.length <= 1
    return [{
        label: "刷新当前",
        key: "updateCurrent",
        icon: () => renderIcon(ReloadOutlined),
    }, {
        label: "关闭当前",
        key: "closeCurrent",
        icon: () => renderIcon(CloseOutlined),
        disabled: isDisabled && route.fullPath == "/dashboard/console",
    }, {
        label: "关闭其它",
        key: "closeOther",
        icon: () => renderIcon(MinusSquareOutlined),
        disabled: isDisabled,
    }, {
        label: "关闭全部",
        key: "closeAll",
        icon: () => renderIcon(MinusOutlined),
        disabled: isDisabled,
    }
    ]
})
function handleSelect(key: string | number) {
    switch (key) {
        case 'updateCurrent':
            emit('updateView')
            break
        case 'closeCurrent':
            tabs.map((item, index) => {
                if (item.fullPath == route.fullPath) {
                    handleClickTab(tabs[index + 1] ? tabs[index + 1].fullPath : tabs[index - 1].fullPath)
                    tabs.splice(index, 1)
                }
            })
            break
        case 'closeOther':
            for (let i = tabs.length - 1; i >= 0; i--) {
                if (tabs[i].name == "主控台") {
                }
                else if (tabs[i].name == route.meta.title) {
                }
                else { tabs.splice(i, 1) }
            }
            break
        case 'closeAll':
            for (let i = tabs.length - 1; i >= 0; i--) {
                if (tabs[i].name == "主控台") {
                }
                else { tabs.splice(i, 1) }
            }
            router.replace({ path: "/dashboard/console" })
            break
    }
}
</script>
<style scoped>
.tabs-main {
    justify-content: flex-start;
    gap: 10px;
}

.tab-card {
    font-size: 12px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 3px var(--main-color);
    gap: 5px;
    padding: 3px 10px;
}

.active-tab {
    background-color: #6F95A3;

    color: white;
}

.active-tab .tab-icon:hover {
    color: white;
}

.active-tab .tab-icon {
    color: white;
    --n-opacity: 0.8 !important;
}

.tab-icon:hover {
    /* color:black; */
    --n-opacity: 1 !important;
}

.tabs-menu {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;

}
</style>