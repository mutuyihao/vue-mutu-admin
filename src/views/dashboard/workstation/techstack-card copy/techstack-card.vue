<template>
    <div class="flex-column techstack-main">
        <div class="techstack-main-title">
            项目技术栈
        </div>
        <div calss="flex">
            <n-tooltip v-for="item in stackList">
                <template #trigger>
                    <n-avatar class="techstach-logo pretendBtn" :src="item.src"></n-avatar>
                </template>
                {{ item.name }}
            </n-tooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import HTML5 from '@/assets/img/tech/HTML5.svg'
import CSS3 from '@/assets/img/tech/CSS3.svg'

import JS from '@/assets/img/tech/JS.svg'
import TS from '@/assets/img/tech/TS.svg'
import NGINX from '@/assets/img/tech/NGINX.svg'
import PINIA from '@/assets/img/tech/PINIA.svg'
import STRAPI from '@/assets/img/tech/STRAPI.svg'
import NODEJS from '@/assets/img/tech/NODEJS.svg'
import VITE from '@/assets/img/tech/VITE.svg'
import VUE3 from '@/assets/img/tech/VUE3.svg'

let stackList = [
    {
        name: "HTML5",
        src: HTML5
    },
    {
        name: "CSS3",
        src: CSS3
    },
    {
        name: "Javascript",
        src: JS
    },
    {
        name: "TypeScript",
        src: TS
    },
    {
        name: "Vue3 Vue-router",
        src: VUE3
    },
    {
        name: "Pinia",
        src: PINIA
    },
    {
        name: "Vite",
        src: VITE
    },
    {
        name: "NodeJS",
        src: NODEJS
    },
    {
        name: "Strapi",
        src: STRAPI
    },
    {
        name: "Nginx",
        src: NGINX
    }
]
</script>

<style scoped>
.techstack-main {
    padding: 1px 5px;
}

.techstack-main-title {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 1rem;
}

.techstach-logo {
    width: 36px;
    background-color: white;
}
</style>
