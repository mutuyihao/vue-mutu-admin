<template>
    <div class="main flex-center" ref="main">
        <div class="login-illu-box flex-center">
            <img class="login-illu" src="@/assets/img/login-blue-pc.png" alt="login-illustrations" />
        </div>
        <n-card class="wrap" content-style="background:rgba(240, 243, 248,1);border-radius: 1rem; " :bordered="false">
            <n-space vertical class="flex-column-center">
                <img class="logo" src="@/assets/img/logo.png" alt="logo" />

                <n-tooltip placement="right">
                    <template #trigger>
                        <div class="slogan">Mutu Admin 中后台全栈开发脚手架</div>
                    </template>
                    Mutu Admin 中后台全栈开发脚手架
                </n-tooltip>
            </n-space>

            <n-tabs :on-before-leave="handleTabsChange" pane-class="pane" class="card-tabs" default-value="signin"
                size="large" animated style="margin: 1vh 0vh" pane-style="max-width:100%;box-sizing: border-box;"
                justify-content="space-evenly" type="line">
                <n-tab-pane name="signin" tab="登录">
                    <SubLogin></SubLogin>
                </n-tab-pane>
                <n-tab-pane name="signup" tab="注册">
                    <SubRegister></SubRegister>
                </n-tab-pane>
            </n-tabs>
        </n-card>

        <div></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isMobile } from '@/utils'
import SubLogin from './sub-login.vue'
import SubRegister from './sub-register.vue'

let activeTab = ref('signin')
function handleTabsChange(name: string, oldName: string) {
    activeTab.value = name
    return true
}

let main = ref()
if (isMobile()) {
    const convertStyle = () => {
        main.value.style.height = `${window.innerHeight}px`;
    }
    onMounted(() => {
        convertStyle()
    })
}

</script>

<style scoped>
.main {
    gap: 2vw;
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(135deg, #f5f7fa 0%, var(--main-color) 100%);
}

.wrap {
    width: 25vw;
    border-radius: 1rem;
    position: relative;
}

.wrap::before {
    background-image: linear-gradient(135deg, #f5f7fa 0%, var(--main-color) 100%);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(1rem);
    z-index: -1;
}

.login-illu {
    width: 25vw;
    border-radius: 1rem;
}

.logo {
    width: 15vw;
    min-width: 12rem;
}

.slogan {
    color: rgba(0, 0, 0, 0.4);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.pane {
    width: 100%;
}

@media screen and (max-width: 1000px) {
    .main {
        height: 100vh;
        height: 100dvh;
    }

    .login-illu-box {
        display: none;
    }

    .wrap {
        width: 80vw;
        height: auto;
    }
}
</style>
