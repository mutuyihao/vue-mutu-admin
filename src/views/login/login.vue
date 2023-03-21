<template>
    <div class="main flex-center">
        <div class="login-illu-box flex-center">
            <img class="login-illu" src="@/assets/img/login-blue-pc.png" alt="login-illustrations">
        </div>
        <n-card class="wrap" content-style="background:rgba(240, 243, 248,1);border-radius: 1rem; " :bordered="false">
            <n-space vertical class="flex-column-center">
                <img class="logo" src="@/assets/img/logo.png" alt="logo">

                <n-tooltip placement="right">
                    <template #trigger>
                        <div class="slogan"> Mutu Admin中后台前端/设计解决方案 </div>
                    </template>
                    Mutu Admin中后台前端/设计解决方案
                </n-tooltip>
            </n-space>

            <n-tabs :on-before-leave="handleTabsChange" pane-class="pane" class="card-tabs" default-value="signin"
                size="large" animated style="margin: 1vh 0vh" pane-style="max-width:100%;box-sizing: border-box;"
                justify-content="space-evenly" type="line">
                <n-tab-pane name="signin" tab="登录">
                    <n-form ref="loginFormRef" :model="loginForm" :rules="rules1">
                        <n-form-item-row path="account" label="账号">
                            <n-input placeholder="请输入账号" :autofocus="true" v-model:value="loginForm.account"
                                @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <PersonOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item-row>
                        <n-form-item-row path="password" label="密码">
                            <n-input placeholder="请输入密码" type="password" showPasswordOn="click"
                                v-model:value="loginForm.password" @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <LockClosedOutline />
                                    </n-icon>
                                </template>
                            </n-input>

                        </n-form-item-row>
                    </n-form>
                    <n-button @click="handleSubmit" color="#5d80b7" type="primary" block secondary strong>
                        登录
                    </n-button>
                </n-tab-pane>
                <n-tab-pane name="signup" tab="注册">
                    <n-form ref="registerFormRef" :model="registerForm" :rules="rules1">
                        <n-form-item path="account" label="账号">
                            <n-input placeholder="请输入账号" :autofocus="true" v-model:value="registerForm.account"
                                @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <PersonOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item-row path="password" label="密码">
                            <n-input placeholder="请输入密码" type="password" showPasswordOn="click"
                                v-model:value="registerForm.password" @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <LockClosedOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item-row>
                        <n-form-item-row path="reenteredPassword" label="重复密码">
                            <n-input placeholder="请再输入一遍密码" type="password" showPasswordOn="click"
                                v-model:value="registerForm.reenteredPassword" @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <LockClosedOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item-row>
                    </n-form>
                    <n-button @click="handleSubmit" color="#5d80b7" type="primary" block secondary strong>
                        注册
                    </n-button>
                </n-tab-pane>
            </n-tabs>
        </n-card>

        <div>
            <svg width="100" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M26 7.5C26 11.0899 23.0899 14 19.5 14C15.9101 14 13 11.0899 13 7.5C13 3.91015 15.9101 1 19.5 1C23.0899 1 26 3.91015 26 7.5ZM16.8536 4.14645C16.6583 3.95118 16.3417 3.95118 16.1464 4.14645C15.9512 4.34171 15.9512 4.65829 16.1464 4.85355L18.7929 7.5L16.1464 10.1464C15.9512 10.3417 15.9512 10.6583 16.1464 10.8536C16.3417 11.0488 16.6583 11.0488 16.8536 10.8536L19.5 8.20711L22.1464 10.8536C22.3417 11.0488 22.6583 11.0488 22.8536 10.8536C23.0488 10.6583 23.0488 10.3417 22.8536 10.1464L20.2071 7.5L22.8536 4.85355C23.0488 4.65829 23.0488 4.34171 22.8536 4.14645C22.6583 3.95118 22.3417 3.95118 22.1464 4.14645L19.5 6.79289L16.8536 4.14645Z"
                    fill="currentColor"></path>
                <path
                    d="M25 22.75V12.5991C24.5572 13.0765 24.053 13.4961 23.5 13.8454V16H17.5L17.3982 16.0068C17.0322 16.0565 16.75 16.3703 16.75 16.75C16.75 18.2688 15.5188 19.5 14 19.5C12.4812 19.5 11.25 18.2688 11.25 16.75L11.2432 16.6482C11.1935 16.2822 10.8797 16 10.5 16H4.5V7.25C4.5 6.2835 5.2835 5.5 6.25 5.5H12.2696C12.4146 4.97463 12.6153 4.47237 12.865 4H6.25C4.45507 4 3 5.45507 3 7.25V22.75C3 24.5449 4.45507 26 6.25 26H21.75C23.5449 26 25 24.5449 25 22.75ZM4.5 22.75V17.5H9.81597L9.85751 17.7041C10.2905 19.5919 11.9808 21 14 21L14.215 20.9947C16.2095 20.8953 17.842 19.4209 18.184 17.5H23.5V22.75C23.5 23.7165 22.7165 24.5 21.75 24.5H6.25C5.2835 24.5 4.5 23.7165 4.5 22.75Z"
                    fill="currentColor"></path>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import { PersonOutline, LockClosedOutline, LogoGithub, LogoFacebook } from '@vicons/ionicons5';
import { ref, reactive, onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
let loginForm = reactive({
    account: "admin",
    password: "12345678"
})
let registerForm = reactive({
    account: "",
    password: "",
    reenteredPassword: ""
})

function handleTabsChange(name: string | number, oldName: string | number) {
    loginForm.account = "admin"
    loginForm.password = "12345678"
    registerForm.account = ""
    registerForm.password = ""
    registerForm.reenteredPassword = ""
    return true
}

const rules1: FormRules = {
    account: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (value == "") {
                    console.log(value)
                    return new Error("请输入账号")
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    password: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (value == "") {
                    return new Error("请输入密码")
                }
                if (value.length < 8) {
                    return new Error("密码不得少于8位")
                }
                if (registerForm.reenteredPassword !== "" && registerForm.reenteredPassword !== value) {
                    return new Error("两次密码输入不一致")
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    reenteredPassword: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (value == "") {
                    return new Error("请输入密码")
                }
                if (value.length < 8) {
                    return new Error("密码不得少于8位")
                }
                if (registerForm.password !== value) {
                    return new Error("两次密码输入不一致")
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ]
}

let router = useRouter()
let route = useRoute()

function handleSubmit() {
    router.push("/")
}
</script>

<style scoped>
.main {
    gap: 2vw;
    width: 100vw;
    height: 100vh;
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
    color: rgba(0, 0, 0, .4);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.pane {
    width: 100%;
}

@media screen and (max-width:1000px) {
    .login-illu-box {
        display: none;
    }

    .wrap {
        width: 80vw;
    }
}
</style>