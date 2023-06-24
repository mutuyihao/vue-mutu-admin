<template>
    <div class="main-403">
        <div class="tipbox-403 flex-column-center">
            <div class="tip-403">
                抱歉，你似乎没有获得来自后端数据库的权限加持。
            </div>
            <n-button @click="handleClick" type="info">返回首页</n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
function handleClick() {
    router.push('dashboard')
}
</script>

<style scoped>
.main-403 {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("@/assets/img/403.png") center top/33% no-repeat;
    display: flex;
    ;
}

.tipbox-403 {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
    gap: 1rem;
    font-size: 1.5rem;
}

@media screen and (max-width:800px) {
    .main-403 {
        background: url("@/assets/img/403.png") center top/100% no-repeat;

    }

    .tipbox-403 {
        top: 40%;
        font-size: 1rem;
    }
}
</style>