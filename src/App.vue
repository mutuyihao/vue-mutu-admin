<script setup lang="ts">
import { themeOverrides } from './theme'
import { useMessage } from 'naive-ui';
</script>

<template>
    <div id="app">
        <n-config-provider :theme-overrides="themeOverrides">
                <router-view></router-view>
        </n-config-provider>
    </div>
</template>

<style scoped></style>
