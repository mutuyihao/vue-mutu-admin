<script setup lang="ts">
import { themeOverrides } from './theme'
import { updateViews } from '@/api'

updateViews()

</script>

<template>
    <div id="app">
        <n-config-provider :theme-overrides="themeOverrides">
            <router-view></router-view>
            <div class="w-[100%] h-[100%]"></div>
        </n-config-provider>
    </div>
</template>

<style scoped></style>
