<template>
    <div class="flex work-main" style="margin-top: 5px">
        <div class="work-card work-main-card flex-between">
            <div class="flex-center work-slogan-card">
                <div>
                    <n-avatar round :size="isMobile ? 55 : 125" :src="infoPhoto" />
                </div>
                <div class="slogan-card flex-column" style="gap:1rem;">
                    <div class="work-slogan">
                        {{ greeting }},欢迎 {{ account.user.name }} 登录Mutu管理系统。
                    </div>
                    <div class="work-slogan work-vise-slogan">
                        一个开源的、青春企业级业务管理系统——MuTu管理系统
                    </div>
                </div>
            </div>
            <div v-if="!isMobile" style="position: relative; align-self: self-end">
                <img style="position: absolute; bottom: -50px; left: -16vw" width="300" src="@/assets/img/team.png"
                    alt="team png" />
            </div>
        </div>

        <div class="work-card " style=" min-width: 280px">
            <weatherCard :isMobile="isMobile"></weatherCard>
        </div>
    </div>
    <div class="flex work-main work-card work-middle-card" style="margin-top: 10px;">
        <techstackCard class="card-item"></techstackCard>
        <div class="card-item">
            <div class="card-item-title">版本号</div>
            <div style="font-size:25px;text-align: end;">0.0.1</div>
        </div>
        <div class="card-item">
            <div class="card-item-title">待修Bug</div>
            <div style="font-size:25px;text-align: end;">9527</div>
        </div>
        <div class="card-item">
            <div class="card-item-title">项目完成时间</div>
            <div style="font-size:25px;text-align: end;">10000年</div>
        </div>
        <div class="card-item" style="flex:1">
            <div class="card-item-title">实在不知道放什么了</div>
            <div
                style="font-size:25px;text-align:end;color:transparent;background-image: linear-gradient(to right, #fa709a 50%, #fee140 100%);background-clip: text;-webkit-background-clip: text;">
                Too
                Young!Too Simple!Sometimes Naive!</div>
        </div>
    </div>
    <div class="flex-center work-main work-card work-bottom-card" style="margin-top: 10px;">
        <div style="font-size:108px;color:white;">留白</div>
    </div>
</template>

<script setup lang="ts">
import infoPhoto from '@/assets/img/info-photo.png'
import weatherCard from './weather-card/weather-card.vue'
import techstackCard from './techstack-card/techstack-card.vue'
import { watch, ref } from 'vue'
import dayjs from 'dayjs'
import * as pinia from '@/stores'
let account = pinia.useAccountStore()
let { isMobile } = account
let nowHour = ref(dayjs().hour())
let greeting = ref('早上好')
watch(
    nowHour,
    (newValue) => {
        if (newValue <= 14 && newValue >= 10) {
            greeting.value = '中午好'
        } else if (newValue <= 17) {
            greeting.value = '下午好'
        } else if (newValue <= 24) {
            greeting.value = '晚上好'
        }
    },
    { deep: true, immediate: true }
)
</script>

<style scoped>
.work-card {
    border-radius: 20px;
    padding: 10px;
    background-color: white;
    margin: 0px 10px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
}

.work-main-card {
    padding: 0px 80px;
    width: 74%;
    background: #1e62cfb3;
    overflow: hidden;
}

.work-slogan-card {
    gap: 30px
}

.work-slogan {
    font-size: 2.5rem;
    font-weight: 400;
    color: white;
}

.work-vise-slogan {
    font-size: 1.4rem;
    color: #ffffff;
}

.work-middle-card {
    justify-content: space-between;
}

.card-item {
    padding: 5px 20px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
}

.card-item:not(:last-child) {

    border-right: 3px dotted #cccccc;
}

.card-item-title {

    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 1rem;
    text-align: left;
}

.work-bottom-card {
    height: 31vh;
    flex: 1;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
}

@media screen and (max-width: 800px) {
    .work-card {
        padding: 0px 0px;
        margin: 0px;
    }

    .work-main {
        flex-direction: column;
        padding: 0px 0px;
        width: 100%;
        gap: 10px;
    }

    .work-main-card {
        width: 100%;
        background: #1e62cfb3;
        overflow: hidden;
    }

    .work-slogan-card {
        height: 20vh;
        gap: 30px
    }

    .slogan-card {
        max-width: 60%;
    }

    .work-slogan {
        font-size: 1.3rem;
        font-weight: 400;
        color: white;
    }

    .work-vise-slogan {
        display: none;
        font-size: 1rem;
        color: #ffffff;
    }

    .card-item:not(:last-child) {
        padding: 5px 20px;
        border-right: 0px dotted #cccccc;

        border-bottom: 3px dotted #cccccc;
        justify-content: space-between;
    }
}
</style>
