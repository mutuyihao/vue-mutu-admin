type initConversation = {
  label: string
  key: string
  timestamp: number | undefined
  group: string
}
type MyConversation = {
  id: string
  title: string
  type: string
  messages: Message[]
  createdAt: string
  updatedAt: string
}

type Message = {
  id: string
  role: string
  content: string
  reasoning_content?: string
  createdAt?: string
  updatedAt?: string
}
