<template>
    <div class="bg-slate-900 h-[100vh] flex justify-center items-center">
    <div class="bg-slate-800 w-[20rem] h-[330px] rounded-3xl flex-shrink-0 text-white">
        <i @click="navigateTo('/')" class="ri-arrow-right-line ml-[280px] text-2xl cursor-pointer"></i>
        <h1 class="text-center mb-5 font-bold text-2xl mt-2 ">لتسجيل الدخول يجب ادخال</h1>
        <form @submit.prevent="LoginIn" class="flex flex-col gap-3 items-center ">
        <div class="flex justify-center flex-col items-center mt-1 gap-2">
            <p>الايميل</p>
            <input v-model="loginObj.email" type="email" placeholder="ادخل الايميل هنا" dir="rtl" class="pr-1 placeholder:text-sm w-60 h-8 bg-gray-600/55 rounded-2xl border-2 focus:outline-none text-white border-slate-500">
        </div>
        <div class="relative flex justify-center flex-col items-center gap-2">
            <p>رمز الحساب</p>
    <i @click="eyeClick = true" v-if="eyeClick === false" class="ri-eye-off-line absolute right-[210px] top-[37.3px] cursor-pointer"></i>
    <i @click="eyeClick = false" v-if="eyeClick === true" class="ri-eye-fill absolute right-[210px] top-[37.3px] cursor-pointer"></i>
            <input v-model="loginObj.password" :type="eyeClick === false?'password':'text'" placeholder="ادخل رمز الحساب هنا" dir="rtl" class="pr-1 placeholder:text-sm w-60 h-8 bg-gray-600/55 rounded-2xl border-2 focus:outline-none text-white border-slate-500">
        </div>
        <button type="submit" class="hover:shadow-green-500 hover:shadow-[0_0_15px] bg-green-600 w-36 h-10 rounded-3xl mt-5 transition-all duration-300 ">تسجيل الدخول</button>
    </form>
    </div>
    </div>
</template>

<script setup lang="ts">
import axios, { Axios, type AxiosResponse, type Method } from 'axios';

import { GlobalVaribal } from '~/stores/gloVar';

const store = GlobalVaribal()

interface logintypes {
    email:string,
    password:string
}

const eyeClick = ref<boolean>(false)
const loginObj = ref<logintypes>({
    email:'',
    password:''
})

onMounted(() =>{
    const store = GlobalVaribal()
    store.socket.disconnect()
})

const LoginIn  = async() =>{
if(loginObj.value.email === "" || loginObj.value.password === ""){
return alert("املاء جميع الفراغات")
}
try {
const reqAndres:AxiosResponse = await axios.post('http://localhost:9000/users/login',loginObj.value,{
    withCredentials:true
}) 
console.log(reqAndres.data)
store.sendData = reqAndres.data.connect.
save()
navigateTo("/")
loginObj.value = unloading(loginObj.value)
} catch (error:any) {
console.log(error.response.data)    
}
}
const save = () =>{
    localStorage.setItem('getData',JSON.stringify(store.sendData))
}
</script>