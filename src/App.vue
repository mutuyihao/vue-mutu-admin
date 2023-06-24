<script setup lang="ts">
import { themeOverrides } from './theme'
import { onMounted } from 'vue';
import * as http from '@/api'
onMounted(() => {
    http.updateViews()
})
</script>

<template>
    <div id="app">
        <n-config-provider :theme-overrides="themeOverrides">
            <router-view></router-view>
        </n-config-provider>
    </div>
</template>

<style scoped></style>
