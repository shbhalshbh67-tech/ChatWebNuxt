<template>
  <refresh v-if="isRefresh === true"/>
  <register v-else-if="isReg === false" @register-sucssus="registerNow" @send-data="emitData" />
<main v-else>
  <header>
  <div class="bg-gray-950 h-20 text-white p-6 flex justify-around items-center">
<div v-if="isOAuthUser === false" class="w-11 h-11 rounded-3xl border-2 border-slate-500 bg-gray-600/55 pl-[14px] pt-2">{{ myUser?myUser.name.slice(0,1):store.sendData.name.slice(0,1) }}</div>
        <img :src="myUser.img" v-else class="rounded-full w-[60px] h-14">
  <h1 class="font-bold text-3xl">BHChat</h1>
<i class="ri-settings-line text-3xl "></i>
</div>
  </header>
  <slot></slot>
<footer>
  <div class="bg-gray-950 text-white flex border-t-2 border-slate-800">

    <!-- القروبات -->
    <div class="cursor-pointer flex-1 h-20 flex flex-col items-center justify-center gap-1 group relative"
         :class="Anim === 0 ? 'bg-gray-800' : 'bg-gray-950'"
         @click="Anim = 0;navigateTo('/group')">
      <span class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
            :class="Anim === 0 ? 'bg-green-500' : 'bg-transparent'"></span>
      <i v-if="Anim != 0" class="ri-team-line text-2xl transition-all duration-500 group-hover:scale-125"></i>
      <i v-else class="ri-team-fill text-2xl"></i>
      <span class="text-[10px] text-gray-400">القروبات</span>
    </div>

    <!-- الاصدقاء -->
    <div class="cursor-pointer flex-1 h-20 flex flex-col items-center justify-center gap-1 group relative"
         :class="Anim === 1 ? 'bg-gray-800' : 'bg-gray-950'"
         @click="Anim = 1;navigateTo('/')">
      <span class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full"
            :class="Anim === 1 ? 'bg-green-500' : 'bg-transparent'"></span>
      <i v-if="Anim != 1" class="ri-user-line text-2xl transition-all duration-500 group-hover:scale-125"></i>
      <i v-else class="ri-user-fill text-2xl"></i>
      <span class="text-[10px] text-gray-400">الاصدقاء</span>
    </div>


<div class="cursor-pointer flex-1 h-20 flex flex-col items-center justify-center gap-1 group relative" :class="Anim === 2 ? 'bg-gray-800' : 'bg-gray-950'"
         @click="Anim = 2;navigateTo('/FriendRequests')">
      <span class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full" :class="Anim === 2 ? 'bg-green-500' : 'bg-transparent'"></span>
      <div class="relative flex items-center justify-center">
        <i v-if="Anim != 2" class="ri-user-heart-line text-2xl transition-all duration-500 group-hover:scale-125 inline-block"></i>
        <i v-else class="ri-user-heart-fill text-2xl transition-all duration-500 group-hover:scale-125 inline-block"></i>
        <span class="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">2</span>
      </div>
      <span class="text-[10px] text-gray-400">الطلبات</span>
    </div>

  </div>
</footer>
</main>
</template>



<script setup lang="ts">
import { GlobalVaribal } from '~/stores/gloVar'

const Anim = ref<number>(0)
const isRefresh = ref<boolean>(true)
const isReg = ref<boolean>(false)
const isOAuthUser = ref<boolean>(false)
let store : any = null


// onCommend
setTimeout(() => {
  isRefresh.value = false
}, 1200);


//userType
interface user {
  name?:string,
  username?:string,
  password?:string,
  email?:string,
  googleId?:string,
  img?:string,
  isAdmin?:boolean
}


const myUser = ref<user>(null)


onMounted(() =>{
store = GlobalVaribal()

isReg.value = JSON.parse(localStorage.getItem("Register"))||false
store.sendData = JSON.parse(localStorage.getItem('getData'))
myUser.value = JSON.parse(localStorage.getItem('registerUser'))
isOAuthUser.value = JSON.parse(localStorage.getItem("OauthImg"))

if(store.sendData){
  isReg.value = true
}
})

// emit functions
const registerNow = () =>{
  isReg.value = true
  save()
}
const emitData = (data:user) => {
console.log(data)
if(data.googleId){
isOAuthUser.value = true
}else{
isOAuthUser.value = false
console.log(data)
}
myUser.value = data
save()
}

// Save func
const save = () =>{
  localStorage.setItem("Register",JSON.stringify(isReg.value))
  localStorage.setItem('registerUser',JSON.stringify(myUser.value))
  localStorage.setItem("OauthImg",JSON.stringify(isOAuthUser.value))
}
</script>