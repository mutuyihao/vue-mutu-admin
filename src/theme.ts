import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
    // common: {
    //     primaryColorHover: "#5d80b7",
    // },
    Tabs: {
        tabTextColorActiveLine: "#5d80b7",
        tabTextColorHoverLine: "#5d80b7",
        barColor: "#5d80b7"
    },
    Input: {
        caretColor: "#5d80b7",
        borderHover: "1px solid #5d80b7",
        borderFocus: "1px solid #5d80b7",
        boxShadowFocus: "0 0 0 2px rgba(93,128,183,.2)"
    },
    Menu: {
        itemColorHover:"rgba(0,0,0,0)",
        itemColorActive:"#5a5f59",
        itemColorActiveHover:"#5a5f59",
        itemColorActiveCollapsed:"#5a5f59",
        itemIconColor:"#e2dfdb",
        itemIconColorHover:"white",
        itemIconColorActive:"white",
        itemIconColorActiveHover:"white",
        itemIconColorChildActive:"white",
        itemIconColorChildActiveHover:"white",
        itemIconColorCollapsed:"#e2dfdb",
        itemTextColor:"#e2dfdb",
        itemTextColorHover:"white",
        itemTextColorActive:"white",
        itemTextColorActiveHover:"white",
        itemTextColorChildActive:"white",
        itemTextColorChildActiveHover:"white",
        itemColorHoverInverted:"rgb(0,0,0)",
        itemColorActiveHoverInverted:"rgb(255,255,255)",
        itemTextColorHoverInverted:"rgb(255,255,255)",
        arrowColor:"#e2dfdb",
        arrowColorHover:"white",
        arrowColorActive:"white",
        arrowColorActiveHover:"white",
        arrowColorChildActive:"white",
        arrowColorChildActiveHover:"white",
        fontSize:"12"
    }

}
export { themeOverrides }