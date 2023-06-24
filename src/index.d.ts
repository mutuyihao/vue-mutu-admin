import type { MessageApi, DialogApi, NotificationApi, LoadingBarApi } from 'naive-ui'

declare global {
  interface Window {
    $message: MessageApi,
    $notification: NotificationApi,
    $dialog: DialogApi,
    $loadingBar: LoadingBarApi,
    _AMapSecurityConfig: {
      securityJsCode: string
    }
  }
  declare module '*.vue' {
    import { App, defineComponent } from 'vue'
    const component: ReturnType<typeof defineComponent> & {
      install(app: App): void
    }
    export default component
  }
}
