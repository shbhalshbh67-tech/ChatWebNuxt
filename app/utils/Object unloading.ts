export const unloading = (obj:any) =>{
for(const key in obj){
obj[key] = ""
}
return obj
}