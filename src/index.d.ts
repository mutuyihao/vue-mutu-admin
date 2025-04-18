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
}
