const modules = import.meta.glob("./options/*/index.ts", { eager: true })
let option: Record<string,any> = {}
let typeList:string[]=[]
interface moduleType {
    default: Object
}
for (let path in modules) {
    let name = new RegExp('(?<=\/options\/).*(?=\/index)').exec(path)![0]
    let typeOption = modules[path] as moduleType
    option[name] = typeOption.default
    typeList.push(name)
}

let chartTypeList=["bar","dynamic-line", "line", "pie"] as const

export {option,chartTypeList}