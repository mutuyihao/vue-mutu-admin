<template>
    <n-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <n-form-item path="username" label="用户名">
            <n-input clearable placeholder="请输入用户名" :autofocus="true" v-model:value="loginForm.username"
                @keydown.enter.prevent>
                <template #prefix>
                    <n-icon size="18" color="#808695">
                        <PersonOutline />
                    </n-icon>
                </template>
            </n-input>
        </n-form-item>
        <n-form-item path="password" label="密码">
            <n-input placeholder="请输入密码" type="password" showPasswordOn="click" clearable
                v-model:value="loginForm.password" @keydown.enter.prevent>
                <template #prefix>
                    <n-icon size="18" color="#808695">
                        <LockClosedOutline />
                    </n-icon>
                </template>
            </n-input>
        </n-form-item>
    </n-form>
    <n-button :loading="isLoading" @click="onLogin" color="#5d80b7" type="primary" block secondary strong>
        登录
    </n-button>
</template>

<script setup lang="ts">
import {
    PersonOutline,
    LockClosedOutline,
} from '@vicons/ionicons5'
import * as pinia from '@/stores'
import { useRouter } from 'vue-router'
import * as http from '@/api'
import { reactive, ref } from 'vue';
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'

const router = useRouter()
const user = pinia.useAccountStore()
const { setUser } = user

const loginFormRef = ref<FormInst | null>(null)
const isLoading = ref(false)
const loginForm = reactive({
    username: 'admin',
    password: '123456'
})
function onLogin() {
    isLoading.value = true
    loginFormRef.value?.validate((errors) => {
        if (!errors) {
            let tip = reactive(window.$message.loading('正在登录中'))
            const { username, password } = loginForm
            http.login({ username, password }).then((res) => {
                setUser(res.data)
                tip.type = 'success'
                tip.content = '登录成功,将为你自动跳转首页'
                router.push('/')
            }).catch((error) => {
                tip.type = 'error'
                tip.content = '登录失败,请尝试重新登陆'
                tip.closable = true
                tip.duration = 3000
            }).finally(() => {
                isLoading.value = false
            })
        } else {
            isLoading.value = false
        }
    })
}
const loginRules: FormRules = {
    username: [
        {
            required: true,
            validator(rule: FormItemRule, value: string) {
                console.log(value)
                if (!value || value == '') {
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
                if (value.length < 6) {
                    return new Error('密码不得少于6位')
                }
                return true
            },
            trigger: ['input', 'blur']
        }
    ]
}
</script>

<style scoped></style>