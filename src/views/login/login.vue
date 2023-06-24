<template>
    <div class="main flex-center">
        <div class="login-illu-box flex-center">
            <img class="login-illu" src="@/assets/img/login-blue-pc.png" alt="login-illustrations" />
        </div>
        <n-card class="wrap" content-style="background:rgba(240, 243, 248,1);border-radius: 1rem; " :bordered="false">
            <n-space vertical class="flex-column-center">
                <img class="logo" src="@/assets/img/logo.png" alt="logo" />

                <n-tooltip placement="right">
                    <template #trigger>
                        <div class="slogan">Mutu Admin中后台前端/设计解决方案</div>
                    </template>
                    Mutu Admin中后台前端/设计解决方案
                </n-tooltip>
            </n-space>

            <n-tabs :on-before-leave="handleTabsChange" pane-class="pane" class="card-tabs" default-value="signin"
                size="large" animated style="margin: 1vh 0vh" pane-style="max-width:100%;box-sizing: border-box;"
                justify-content="space-evenly" type="line">
                <n-tab-pane name="signin" tab="登录">
                    <n-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
                        <n-form-item-row path="identifier" label="用户名">
                            <n-input clearable placeholder="请输入用户名" :autofocus="true" v-model:value="loginForm.identifier"
                                @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <PersonOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item-row>
                        <n-form-item-row path="password" label="密码">
                            <n-input placeholder="请输入密码" type="password" showPasswordOn="click" clearable
                                v-model:value="loginForm.password" @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <LockClosedOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item-row>
                    </n-form>
                    <n-button @click="onLogin" color="#5d80b7" type="primary" block secondary strong>
                        登录
                    </n-button>
                </n-tab-pane>
                <n-tab-pane name="signup" tab="注册">
                    <n-form ref="registerFormRef" :model="registerForm" :rules="registerRules">
                        <n-form-item path="username" label="用户名">
                            <n-input placeholder="请输入用户名" :autofocus="true" v-model:value="registerForm.username"
                                @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <PersonOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item>
                        <n-form-item-row path="email" label="邮箱">
                            <n-input placeholder="请输入邮箱" v-model:value="registerForm.email" @keydown.enter.prevent>
                                <template #prefix>
                                    <n-icon size="18" color="#808695">
                                        <MailOutline />
                                    </n-icon>
                                </template>
                            </n-input>
                        </n-form-item-row>
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
                    <n-button @click="onRegister" color="#5d80b7" type="primary" block secondary strong>
                        注册
                    </n-button>
                </n-tab-pane>
            </n-tabs>
        </n-card>

        <div></div>
    </div>
</template>

<script setup lang="ts">
import type { FormInst, FormItemInst, FormItemRule, FormRules } from 'naive-ui'
import {
    PersonOutline,
    LockClosedOutline,
    LogoGithub,
    LogoFacebook,
    MailOutline
} from '@vicons/ionicons5'
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import * as pinia from '@/stores'
import * as http from '@/api'

let activeTab = ref('signin')
let loginForm = reactive({
    identifier: 'admin',
    password: '12345678'
})
let registerForm = reactive({
    username: 'test',
    email: 'test@test.com',
    password: '12345678',
    reenteredPassword: '12345678'
})

function handleTabsChange(name: string, oldName: string) {
    activeTab.value = name
    // loginForm.identifier = "admin"
    // loginForm.password = "12345678"
    // registerForm.username = ""
    // registerForm.password = ""
    // registerForm.reenteredPassword = ""
    return true
}

const loginRules: FormRules = {
    identifier: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                console.log(value)
                if (!value || value == '') {
                    console.log(value)
                    return new Error('请输入用户名')
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
                if (!value || value == '') {
                    return new Error('请输入密码')
                }
                if (value.length < 8) {
                    return new Error('密码不得少于8位')
                }
                if (
                    registerForm.reenteredPassword !== '' &&
                    registerForm.reenteredPassword !== value
                ) {
                    return new Error('两次密码输入不一致')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ]
}
const registerRules: FormRules = reactive({
    username: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value || value == '') {
                    console.log(value)
                    return new Error('请输入用户名')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ],
    email: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                if (!value || value == '') {
                    console.log(value)
                    return new Error('请输入邮箱')
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
                if (!value || value == '') {
                    return new Error('请输入密码')
                }
                if (value.length < 8) {
                    return new Error('密码不得少于8位')
                }
                if (
                    registerForm.reenteredPassword !== '' &&
                    registerForm.reenteredPassword !== value
                ) {
                    return new Error('两次密码输入不一致')
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
                if (!value || value == '') {
                    return new Error('请输入密码')
                }
                if (value.length < 8) {
                    return new Error('密码不得少于8位')
                }
                if (registerForm.password !== value) {
                    return new Error('两次密码输入不一致')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ]
})

let router = useRouter()
let route = useRoute()

let loginFormRef = ref<FormInst | null>(null)

let user = pinia.useAccountStore()
let { menu } = user
const { setUser } = user
function onLogin() {
    loginFormRef.value?.validate((errors) => {
        if (!errors) {
            let tip = reactive(window.$message.loading('正在登录中'))
            const { identifier, password } = loginForm
            http.login({ identifier, password }).then((res) => {
                console.log(res)
                localStorage.clear()

                setUser(res.data.user)
                localStorage.setItem('TOKEN', res.data.jwt)
                // localStorage.clear()
                tip.type = 'success'
                tip.content = '登录成功,将为你自动跳转首页'
                router.push('/')
            })
        }
    })
}

let registerFormRef = ref<FormInst | null>(null)

function onRegister() {
    registerFormRef.value?.validate((errors) => {
        if (!errors) {
            let tip = reactive(
                window.$message.loading('正在注册中', { duration: 10000 })
            )
            const { username, email, password } = registerForm
            http
                .register({ username, email, password })
                .then((res) => {
                    localStorage.clear()
                    setUser(res.data.user)
                    localStorage.setItem('TOKEN', res.data.jwt)
                    tip.type = 'success'
                    tip.content = '注册成功,将为你自动跳转首页'
                    tip.duration = 3000
                    tip.destroy()
                    router.push('/')
                })
                .catch((error) => {
                    console.log(error)
                    tip.type = 'error'
                    tip.content = error.response.data.error.message
                    tip.closable = true
                    tip.duration = 3000
                })
        }
    })
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
        height: 85vh;
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
