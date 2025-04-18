<template>
    <div class="w-[100%] h-[100%] flex bg-white justify-center">
        <div class="bg-[#f9f9f9] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            :style="{ width: isCollapsed ? '0px' : '12%' }">
            <!-- 按钮 -->
            <div class="flex justify-between items-center p-3 pb-0" :style="{
                gap: isCollapsed ? '2px' : '',
                position: isCollapsed ? 'fixed' : 'relative',
                height: '2rem'
            }">
                <div @click="handleCollapse()" style="cursor: pointer"
                    class="flex items-center p-2 hover:bg-[#e7e7e7] rounded-lg w-8 h-8">
                    <NIcon size="1rem">
                        <LayoutSidebar></LayoutSidebar>
                    </NIcon>
                </div>
                <div @click="
                    () => {
                        activeConversation = null
                        messages = []
                    }
                " style="cursor: pointer" class="flex items-center p-2 hover:bg-[#e7e7e7] rounded-lg w-8 h-8">
                    <NIcon size="1rem">
                        <svg width=" 24" height="24" viewBox="0 0 24 24" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg" class="icon-xl-heavy">
                            <path
                                d="M15.6729 3.91287C16.8918 2.69392 18.8682 2.69392 20.0871 3.91287C21.3061 5.13182 21.3061 7.10813 20.0871 8.32708L14.1499 14.2643C13.3849 15.0293 12.3925 15.5255 11.3215 15.6785L9.14142 15.9899C8.82983 16.0344 8.51546 15.9297 8.29289 15.7071C8.07033 15.4845 7.96554 15.1701 8.01005 14.8586L8.32149 12.6785C8.47449 11.6075 8.97072 10.615 9.7357 9.85006L15.6729 3.91287ZM18.6729 5.32708C18.235 4.88918 17.525 4.88918 17.0871 5.32708L11.1499 11.2643C10.6909 11.7233 10.3932 12.3187 10.3014 12.9613L10.1785 13.8215L11.0386 13.6986C11.6812 13.6068 12.2767 13.3091 12.7357 12.8501L18.6729 6.91287C19.1108 6.47497 19.1108 5.76499 18.6729 5.32708ZM11 3.99929C11.0004 4.55157 10.5531 4.99963 10.0008 5.00007C9.00227 5.00084 8.29769 5.00827 7.74651 5.06064C7.20685 5.11191 6.88488 5.20117 6.63803 5.32695C6.07354 5.61457 5.6146 6.07351 5.32698 6.63799C5.19279 6.90135 5.10062 7.24904 5.05118 7.8542C5.00078 8.47105 5 9.26336 5 10.4V13.6C5 14.7366 5.00078 15.5289 5.05118 16.1457C5.10062 16.7509 5.19279 17.0986 5.32698 17.3619C5.6146 17.9264 6.07354 18.3854 6.63803 18.673C6.90138 18.8072 7.24907 18.8993 7.85424 18.9488C8.47108 18.9992 9.26339 19 10.4 19H13.6C14.7366 19 15.5289 18.9992 16.1458 18.9488C16.7509 18.8993 17.0986 18.8072 17.362 18.673C17.9265 18.3854 18.3854 17.9264 18.673 17.3619C18.7988 17.1151 18.8881 16.7931 18.9393 16.2535C18.9917 15.7023 18.9991 14.9977 18.9999 13.9992C19.0003 13.4469 19.4484 12.9995 20.0007 13C20.553 13.0004 21.0003 13.4485 20.9999 14.0007C20.9991 14.9789 20.9932 15.7808 20.9304 16.4426C20.8664 17.116 20.7385 17.7136 20.455 18.2699C19.9757 19.2107 19.2108 19.9756 18.27 20.455C17.6777 20.7568 17.0375 20.8826 16.3086 20.9421C15.6008 21 14.7266 21 13.6428 21H10.3572C9.27339 21 8.39925 21 7.69138 20.9421C6.96253 20.8826 6.32234 20.7568 5.73005 20.455C4.78924 19.9756 4.02433 19.2107 3.54497 18.2699C3.24318 17.6776 3.11737 17.0374 3.05782 16.3086C2.99998 15.6007 2.99999 14.7266 3 13.6428V10.3572C2.99999 9.27337 2.99998 8.39922 3.05782 7.69134C3.11737 6.96249 3.24318 6.3223 3.54497 5.73001C4.02433 4.7892 4.78924 4.0243 5.73005 3.54493C6.28633 3.26149 6.88399 3.13358 7.55735 3.06961C8.21919 3.00673 9.02103 3.00083 9.99922 3.00007C10.5515 2.99964 10.9996 3.447 11 3.99929Z"
                                fill="currentColor"></path>
                        </svg>
                    </NIcon>
                </div>
            </div>
            <div v-if="isCollapsed" class="h-8"></div>
            <!-- 会话历史 -->
            <div class="max-h-[calc(100%-2rem)] overflow-y-scroll" id="conversationContainer">
                <Conversations :items="conversationList" @ActiveChange="onActiveChange"
                    :activeKey="activeConversation?.id" :groupable="true" :menu="conversationMenu">
                </Conversations>
            </div>
        </div>
        <div class="flex-[1] bg-[#ffffff] flex flex-col align-middle justify-center relative">
            <!-- 会话 -->
            <!-- <div v-if="messages.length > 0" class="flex-1 max-h-[calc(99%-96px)] mb-4">
                <div id="messageContainer" class="max-h-[100%] overflow-y-scroll flex flex-col items-center">
                    <div v-for="(item, index) in messages" :key="item.id" class="w-5/12 p-4">
                        <Bubble class="myBubble" :key="item.id" :id="item.id" :content="item.content" :role="item.role"
                            :loading="inputLoading &&
                                index === messages.length - 1 &&
                                item.role === 'Ai'
                                " :footer="footerConfig(item.id)" :timestamp="item.createdAt"
                            :placement="item.role === 'Ai' ? 'start' : 'end'" :messageRender="TypographiedMessage"
                            :variant="item.role === 'Ai' ? 'borderless' : 'filled'" :style="{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                minHeight:
                                    hasAdded && item.id === messages[messages.length - 1].id
                                        ? 'calc(100dvh - 248px)'
                                        : ''
                            }">
                        </Bubble>
                    </div>
                </div>
            </div> -->
            <!-- 输入框 -->
            <!-- <div class="bottom-2 w-full flex justify-center">
                <div class="w-5/12 flex flex-col gap-6 mb-24 transition-all"
                    :style="{ marginBottom: messages.length > 0 ? '1rem' : '' }">
                    <h1 v-if="messages.length == 0" class="text-center text-3xl font-extrabold">
                        有什么可以帮忙的？
                    </h1>
                    <Sender ref="{senderRef}" :loading="inputLoading" v-model:value="content" @submit="submit"
                        @cancel="cancel" :autoSize="{ minRows: 2, maxRows: 6 }" @pasteFile="pasteFile"
                        :class="[messages.length > 0 && openSenderHeader ? ' rounded-tl-none rounded-tr-none' : '']">
                        <template #prefix>
                            <n-button @click="handleOpenSenderHeader" class="rounded-full w-8 h-8 hover:bg-[#f9f9f9]">
                                <template #icon>
                                    <CloudUploadOutlined :style="{ width: '1rem', height: '1rem' }">
                                    </CloudUploadOutlined>
                                </template>
</n-button>
</template>
<template #header>
                            <div
                                :class="[messages.length > 0 ? 'rounded-tl-lg rounded-tr-lg absolute bottom-[66px] bg-[#ffffff] w-full' : ''
                                    , messages.length > 0 && openSenderHeader ? 'border-#1677ff[#1677ff] border-l border-r border-t ' : '']">
                                <Sender.Header title="Attachments" :styles="{ content: { padding: 0 } }"
                                    :open="openSenderHeader" forceRender>
                                    <Attachments :beforeUpload="handleBeforeUpload" :items="items"
                                        :action="uploadAction" :headers="uploadReqHeaders" :name="'file'"
                                        @change="handleUploadChange" :placeholder="(type: string) => {
                                            if (type === 'drop') {
                                                return { title: 'Drop file here' }
                                            } else {
                                                return {
                                                    icon: renderIcon(CloudUploadOutlined),
                                                    title: 'Upload files',
                                                    description:
                                                        '上传文件作为你的知识库，通过 embedding 模型将文件转换为向量存储在数据库，作为业务知识库，增强 AI 回答效果。(当前仅限上传 txt 文件。)'
                                                }
                                            }
                                        }" :getDropContainer="() => senderRef?.nativeElement" multiple></Attachments>
                                </Sender.Header>
                            </div>
                        </template>
</Sender>
</div>
</div> -->

            <div v-if="messages.length > 0" class="flex-1 max-h-[calc(100%-96px)] mb-4" :styles="{
                maxHeight: openSenderHeader ? 'calc(100% - 248px)' : 'calc(100% - 96px)'
            }">
                <div id="messageContainer" class="max-h-[100%] overflow-y-scroll flex flex-col items-center">
                    <div v-for="(item, index) in messages" :key="item.id" class="w-5/12 p-4">
                        <Bubble class="myBubble" :key="item.id" :id="item.id" :content="item.content" :role="item.role"
                            :loading="inputLoading &&
                                index === messages.length - 1 &&
                                item.role === 'Ai'
                                " :footer="footerConfig(item.id)" :timestamp="item.createdAt"
                            :placement="item.role === 'Ai' ? 'start' : 'end'" :messageRender="TypographiedMessage"
                            :variant="item.role === 'Ai' ? 'borderless' : 'filled'" :style="{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                minHeight:
                                    hasAdded && item.id === messages[messages.length - 1].id
                                        ? 'calc(100dvh - 248px)'
                                        : ''
                            }">
                        </Bubble>
                    </div>
                </div>
            </div>
            <!-- 输入框 -->
            <div class="bottom-2 w-full flex justify-center">
                <div class="w-5/12 flex flex-col gap-6 mb-24 transition-all"
                    :style="{ marginBottom: messages.length > 0 ? '1rem' : '' }">
                    <h1 v-if="messages.length == 0" class="text-center text-3xl font-extrabold">
                        有什么可以帮忙的？
                    </h1>
                    <Sender ref="{senderRef}" :loading="inputLoading" v-model:value="content" @submit="submit"
                        @cancel="cancel" :autoSize="{ minRows: 2, maxRows: 6 }" @pasteFile="pasteFile">
                        <template #prefix>
                            <n-button @click="handleOpenSenderHeader" class="rounded-full w-8 h-8 hover:bg-[#f9f9f9]">
                                <template #icon>
                                    <CloudUploadOutlined :style="{ width: '1rem', height: '1rem' }">
                                    </CloudUploadOutlined>
                                </template>
                            </n-button>
                        </template>
                        <template #header>
                            <Sender.Header title="Attachments" :styles="{ content: { padding: 0 } }"
                                :open="openSenderHeader" forceRender>
                                <Attachments :beforeUpload="handleBeforeUpload" :items="items" :action="uploadAction"
                                    :headers="uploadReqHeaders" :name="'file'" @change="handleUploadChange"
                                    :placeholder="(type: string) => {
                                        if (type === 'drop') {
                                            return { title: 'Drop file here' }
                                        } else {
                                            return {
                                                icon: renderIcon(CloudUploadOutlined),
                                                title: 'Upload files',
                                                description:
                                                    '上传文件作为你的知识库，通过 embedding 模型将文件转换为向量存储在数据库，作为业务知识库，增强 AI 回答效果。(当前仅限上传 txt 文件。)'
                                            }
                                        }
                                    }" :getDropContainer="() => senderRef?.nativeElement" multiple></Attachments>
                            </Sender.Header>
                        </template>
                    </Sender>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    Conversations,
    Bubble,
    ConversationsProps,
    Attachments
} from 'ant-design-x-vue'
import { CloudUploadOutlined } from '@vicons/antd'
import { LayoutSidebar, Copy } from '@vicons/tabler'
import { Sender } from 'ant-design-x-vue'
import { computed, h, nextTick, onMounted, ref } from 'vue'
import * as http from '@/api'

import markdownit from 'markdown-it'
import hljs from 'highlight.js'
import { renderIcon } from '@/utils'
import { DeleteOutlined } from '@vicons/antd'

const hasAdded = ref(false)
const inputLoading = ref(false)
const content = ref('')

const activeConversation = ref(null)
const messages = ref([])
async function submit() {
    hasAdded.value = true
    const messageList = [
        { id: crypto.randomUUID(), role: 'User', content: content.value },
        { id: crypto.randomUUID(), role: 'Ai', content: '' }
    ]
    messages.value.push(...messageList)
    await nextTick(() => {
        scrollToMessage(messageList[0].id as unknown as string, 'start')
    })
    inputLoading.value = true
    http
        .createConversation({ ...activeConversation.value, messages: messageList })
        .then((res) => {
            content.value = ''
            if (!activeConversation.value) {
                fetchData()
            }
            activeConversation.value = res.data
            messages.value = res.data.messages
        })
        .finally(() => {
            inputLoading.value = false
        })
}
function cancel() {
    inputLoading.value = false
}

function scrollToMessage(
    id: string,
    block: 'start' | 'center' | 'end' | 'nearest'
) {
    const lastMessage = document.getElementById(id)
    if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: 'smooth', block })
    }
}
function footerConfig(messageId: string) {
    return h('div', { class: 'flex justify-end' }, [
        h(Copy, {
            style: {
                width: '1rem',
                height: '1rem',
                transform: 'scaleX(-1)',
                cursor: 'pointer'
            },
            class: 'hover:bg-[#f9f9f9]',
            onClick: () => {
                const message = messages.value.find((item) => item.id === messageId)
                navigator.clipboard.writeText(message.content)
                window.$message.success('复制成功')
            }
        })
    ])
}

// 会话记录
const conversationList = ref([])
function fetchData() {
    http.getConversationList().then((res) => {
        conversationList.value = conversationListDataToList(res.data)
    })
}
function conversationListDataToList(data: any[]) {
    return data.map((item) => {
        let group = ''
        const now = new Date()
        const startOfToday = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
        ).getTime()
        if (new Date(item.createdAt).getTime() > startOfToday) {
            group = '今天'
        } else if (
            new Date(item.createdAt).getTime() >
            startOfToday - 1000 * 60 * 60 * 24
        ) {
            group = '昨天'
        } else {
            group = '更早'
        }
        return {
            label: item.title === '__new__' ? '新会话' : item.title,
            key: item.id,
            timestamp: item.createdAt,
            group
        }
    })
}
function onActiveChange(key: string) {
    hasAdded.value = false
    http.getConversation(key).then((res) => {
        activeConversation.value = res.data
        messages.value = res.data.messages
        nextTick(() => {
            scrollToMessage(
                messages.value[messages.value.length - 1].id as unknown as string,
                'end'
            )
        })
    })
}
onMounted(() => {
    fetchData()
})

const conversationMenu: ConversationsProps['menu'] = (conversation) => ({
    items: [
        {
            label: '删除',
            key: 'operation1',
            icon: renderIcon(DeleteOutlined),
            danger: true
        }
    ],
    onClick: (menuInfo) => {
        menuInfo.domEvent.stopPropagation()
        if (menuInfo.key === 'operation1') {
            http.deleteConversation(conversation.key).then(() => {
                conversationList.value = conversationList.value.filter(
                    (item) => item.key !== conversation.key
                )
                if (conversation.key === activeConversation.value?.id) {
                    activeConversation.value = null
                    messages.value = []
                }
                window.$message.success(
                    `删除会话:${conversation.label} - ${menuInfo.key}成功 `
                )
            })
        }
    }
})
const md = markdownit({
    html: true,
    breaks: true,
    linkify: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(str, { language: lang }).value
            } catch (__) { }
        }
        return ''
    }
})
function TypographiedMessage(content) {
    return h('div', {
        innerHTML: md.render(content),
        class: 'prose prose-zinc max-w-none'
    })
}

const isCollapsed = ref(false)
function handleCollapse(this) {
    isCollapsed.value = !isCollapsed.value
}

// 上传相关
const items = ref([])
const attachmentsRef = ref(null)
const openSenderHeader = ref(false)
const senderRef = ref(null)

const getDropContainer = () => senderRef.value?.nativeElement
function handleOpenSenderHeader() {
    openSenderHeader.value = !openSenderHeader.value
}
function fileChange({ fileList }) {
    items.value = fileList
}
const senderHeader = computed(() =>
    h(
        Sender.Header,
        {
            title: 'Attachments',
            styles: {
                content: {
                    padding: 0
                }
            },
            open: openSenderHeader.value,
            onOpenChange: (v: boolean) => (openSenderHeader.value = v),
            forceRender: true
        },
        {
            default: () =>
                h(Attachments, {
                    beforeUpload: (file) => {
                        console.log(file)
                        return false
                    },
                    items: items.value,
                    onChange: ({ fileList }: { fileList: any[] }) =>
                        (items.value = fileList),
                    placeholder: (type: string) =>
                        type === 'drop'
                            ? { title: 'Drop file here' }
                            : {
                                icon: renderIcon(CloudUploadOutlined),
                                title: 'Upload files',
                                description:
                                    '上传文件作为你的知识库，通过 embedding 模型将文件转换为向量存储在数据库，作为业务知识库，增强 AI 回答效果。(当前仅限上传小于 1MB 的 txt 文件。)'
                            },
                    getDropContainer: () => senderRef.value?.nativeElement
                })
        }
    )
)
function handleUploadChange({
    file,
    fileList,
    event
}: {
    file: any
    fileList: any[]
    event: any
}) {
    items.value = fileList.filter((item) => item.type === 'text/plain')
}
function handleBeforeUpload(file) {
    console.log(file)
    const isTxt = file.type === 'text/plain'
    if (!isTxt) {
        window.$message.error('上传失败，仅支持上传 txt 文件')
        return false
    }
    return isTxt
}
const pasteFile = (_, files) => {
    for (const file of files) {
        attachmentsRef.value?.current?.upload(file)
    }
    openSenderHeader.value = true
}
const uploadReqHeaders = {
    Authorization: 'Bearer ' + localStorage.getItem('TOKEN')
}
const uploadAction = `${import.meta.env.VITE_API_BASE_URL}/document/upload`
</script>
<style>
.ant-bubble-dot {
    min-height: 0 !important;
    height: auto !important;
}

#conversationContainer::-webkit-scrollbar {
    opacity: 0.9;
    border-radius: 1rem;
    width: 0.6rem;
    height: 0.6rem;
    background-color: #f9f9f9;
}

#conversationContainer::-webkit-scrollbar-thumb {
    opacity: 0.9;
    border-radius: 1rem;
    background-color: #e3e3e3;
}

#messageContainer::-webkit-scrollbar {
    opacity: 0.9;
    border-radius: 1rem;
    width: 0.6rem;
    height: 0.6rem;
    background-color: #f9f9f9;
}

#messageContainer::-webkit-scrollbar-thumb {
    opacity: 0.9;
    border-radius: 1rem;
    background-color: #e3e3e3;
}
</style>
