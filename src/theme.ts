import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
    // common: {
    //     nTabTextColorActive: '#c2cfe2';
    // },
    Tabs:{
        tabTextColorActiveLine:"#5d80b7",
        tabTextColorHoverLine:"#5d80b7",
        barColor:"#5d80b7"
    },
    Input:{
        caretColor:"#5d80b7",
        borderHover:"#5d80b7",
        borderFocus:"#5d80b7",
        boxShadowFocus:"0 0 0 2px rgba(93,128,183,.2)"

    },
}
export { themeOverrides }