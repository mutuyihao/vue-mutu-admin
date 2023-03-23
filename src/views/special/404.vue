<template>
    <div class="main-404">
        <div class="tipbox flex-column-center">
            <div class="tip-404">
                抱歉，你似乎来到了没有代码存在的荒原。
            </div>
            <n-button @click="handleClick" type="info">返回首页</n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
function handleClick(){
    router.push('dashboard')
}
</script>

<style scoped>
.main-404 {
    position: relative;
    width: 100%;
    height: 100%;
    background: url("@/assets/img/404-1.png") center top/33% no-repeat;
    display:flex;
    ;
}
.tipbox{
    position:absolute;
    top:70%;
    left:50%;
    transform: translateX(-50%);
    gap:1rem;
    font-size:1.5rem;
}

@media screen and (max-width:800px) {
    .main-404{
    background: url("@/assets/img/404-1.png") center top/100%  no-repeat;

    }
    .tipbox{
        top:40%;
        font-size:1rem;
    }
}
</style>