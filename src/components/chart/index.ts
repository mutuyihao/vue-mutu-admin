const modules = import.meta.glob("./options/*/index.ts", { eager: true })
let option: Record<string, any> = {}
let typeList: string[] = []
interface moduleType {
    default: Object
}
console.log(modules, Object.keys(modules))
for (let path in modules) {
    // let name = new RegExp('(?<=\/options\/).*(?=\/index)').exec(path)![0]
    // let name = "line"
    let name = path.split("/")[2]
    // console.log(path.split("/"))
    let typeOption = modules[path] as moduleType
    option[name] = typeOption.default
    typeList.push(name)
}

let chartTypeList = ["bar", "dynamic-line", "line", "pie"] as const

export { option, chartTypeList }