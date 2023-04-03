<template>
    <div class="headerBar-main">
        <div class="flex-center">
            <NIcon size="1rem" @click="$emit('handleCollapse')">
                <MenuFoldOutlined class="fold-btn" v-show="!isCollapsed" />
                <MenuUnfoldOutlined :class="'fold-btn'" v-show="isCollapsed" />
            </NIcon>
        </div>
        <div class="flex-center">
            <NIcon size="1rem" @click="$emit('updateView')">
                <ReloadOutlined @click="animate" :class="['fold-btn', { 'clicked': clicked }]" />
            </NIcon>
        </div>
        <div>
            <n-breadcrumb>
                <template v-for="item in breadcrumbList">
                    <n-breadcrumb-item  separator="/">
                        <RouterLink :to="item.path" >{{ item.meta.title }}</RouterLink>
                    </n-breadcrumb-item>
                </template>
            </n-breadcrumb>
        </div>
        <div style="flex:1"></div>
        <div class="flex-center">
            <a target="blank" class="flex-center" href="https://github.com/mutuyihao/vue-mutu-admin">
                <NIcon size="1rem">
                    <GithubOutlined></GithubOutlined>
                </NIcon>
            </a>
        </div>
        <div class="flex-center pretendBtn">
            <n-dropdown trigger="hover" :options="options">
                <NIcon size="1rem">
                    <PersonCircleOutline />
                </NIcon>
            </n-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted,watch, type VNodeRef } from 'vue';
import { useRoute, type RouteLocationMatched } from 'vue-router'
import { MenuFoldOutlined, MenuUnfoldOutlined, ReloadOutlined, GithubOutlined, } from '@vicons/antd'
import { PersonCircleOutline } from '@vicons/ionicons5'

defineProps({
    isCollapsed: Boolean
})

let route = useRoute()
let breadcrumbList = reactive<RouteLocationMatched[]>([])
route.matched.map((item) => breadcrumbList.push(item))
watch(route,(newVal)=>{
    breadcrumbList.splice(0)
    newVal.matched.map((item) => breadcrumbList.push(item))
})
let clicked = ref(false)
function animate() {
    clicked.value = true
    setTimeout(() => {
        clicked.value = false
    }, 800)
}

let options=[{label:"个人设置",key:"personalsetting"},{label:"退出登录",key:"signout"}]
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

/* a {
    color: black;
} */

.clicked {
    transform: rotate(360deg);
    transition: all .6s ease-in-out;
}
</style>