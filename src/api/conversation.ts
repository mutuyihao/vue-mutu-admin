import instance from "@/utils/request";

export async function getConversationList() {
    return instance.get('conversation')
}

type ConversationPostData = {
    id?: string,
    createdAt: string,
    messages: any
}
// 新建会话/更新会话
export async function createConversation(data: ConversationPostData) {
    return instance.post('/conversation', data)
}
// 获取会话详情
export async function getConversation(id: string) {
    return instance.get(`/conversation/${id}`)
}
// 删除会话
export async function deleteConversation(id: string) {
    return instance.delete(`/conversation/${id}`)
}