<template>
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
            <n-input placeholder="请输入密码" type="password" showPasswordOn="click" v-model:value="registerForm.password"
                @keydown.enter.prevent>
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
    <n-button :loading="isRegistering" @click="onRegister" color="#5d80b7" type="primary" block secondary strong>
        注册
    </n-button>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import {
    PersonOutline,
    LockClosedOutline,
    MailOutline
} from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import * as pinia from '@/stores'
import * as http from '@/api'

let router = useRouter()

let user = pinia.useAccountStore()
const { setUser } = user

let isRegistering = ref(false)

let registerFormRef = ref<FormInst | null>(null)
let registerForm = reactive({
    username: 'test',
    email: 'test@test.com',
    password: '12345678',
    reenteredPassword: '12345678'
})
function onRegister() {
    isRegistering.value = true
    registerFormRef.value?.validate((errors) => {
        if (!errors) {
            let tip = reactive(
                window.$message.loading('正在注册中', { duration: 10000 })
            )
            const { username, email, password } = registerForm
            http
                .register({ username, email, password })
                .then((res) => {
                    setUser(res.data.user)
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
                }).finally(() => {
                    isRegistering.value = false
                })
        } else {
            isRegistering.value = false
        }
    })
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
</script>

<style scoped></style>