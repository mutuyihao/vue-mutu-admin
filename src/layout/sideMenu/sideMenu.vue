<template>
    <div>
        <img v-show="!collapsed" @click="$router.push('/dashboard')" class="logo-side pretendBtn" width="150" height="23.11"
            src="@/assets/img/logo-side.png" alt="logo" />
        <!-- :value="'console'" :expanded-keys="openKey" -->
        <img class="logo-collapse logo-side pretendBtn" v-show="collapsed" width="24" height="24"
            src="@/assets/img/logo-single.png" alt="logo" />
        <n-menu ref="menuInstRef" v-model:value="selectedKey" :indent="12" :accordion="true" :options="menuOptions"
            @update-value="clickMenuItem"></n-menu>
    </div>
</template>

<script setup lang="ts">
import { reactive, h, onMounted, ref, watch } from 'vue'
import { dynamicRoutes, systemRoutes, specialRoutes } from '@/router'
import {
    type RouteRecordRaw,
    type RouteRecordName,
    RouterLink,
    useRoute
} from 'vue-router'
import type { MenuOption } from 'naive-ui'
import * as pinia from '@/stores'
defineProps<{ collapsed: boolean }>()
let openKey = ['dashboard', 'console']
// let routes = dynamicRoutes
let route = useRoute()

let selectedKey = ref(route.meta.title as string)

let menuInstRef = ref()
watch(route, (newVal) => {
    selectedKey.value = newVal.meta.title as string
    menuInstRef.value.showOption(selectedKey.value)
})
let { menuOptions } = pinia.useMenuStore()

let emit = defineEmits(['clickMenuItem'])
function clickMenuItem() {
    emit('clickMenuItem')
}
</script>

<style scoped>
.logo-side {
    width: 150;
    height: 23.11;
    margin-top: 17px;
}

.logo-collapse {
    transform: translate(50%);
}

@media screen and (max-width: 800px) {
    .logo-side {
        margin-left: 50%;
        transform: translateX(-50%);
    }
}
</style>
