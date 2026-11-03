<template>
<div class="bg-slate-900 h-[100vh] flex justify-center items-center">
<form @submit.prevent="registerSub" class=" bg-slate-800 w-[22rem] h-[357px] rounded-3xl flex-shrink-0 text-white flex justify-center flex-col">
<h1 class="text-center mb-5 font-bold text-2xl">لانشاء الحساب يجب ادخال</h1>
<div class="flex justify-center gap-20">
    <p >اسمك الشخصي</p>
    <p>اسم المستخدم</p>
</div>
<div class="flex justify-center gap-7 ">
<input type="text" name="name" v-model="userObj.name" dir="rtl" placeholder="ادخل اسمك هنا" class="pr-1 placeholder:text-sm w-36 h-7 bg-gray-600/55 rounded-2xl border-2 focus:outline-none text-white border-slate-500">
<input type="text" name="username" v-model="userObj.username" dir="rtl" placeholder="ادخل اسم الستخدم هنا" class="pr-1 placeholder:text-sm w-36 h-7 bg-gray-600/55 rounded-2xl border-2 focus:outline-none text-white border-slate-500">    
</div>

<div class="flex justify-center items-center gap-[110px] mt-3">
<p>رمز الحساب</p>
<p class="ml-2">الايميل</p>
</div>
<div class=" flex justify-center gap-7 relative">
    <i @click="eyeClick = true" v-if="eyeClick === false" class="ri-eye-off-line absolute right-[310px] top-[2.5px] cursor-pointer"></i>
    <i @click="eyeClick = false" v-if="eyeClick === true" class="ri-eye-fill absolute right-[310px] top-[2.5px] group cursor-pointer"></i>
<input :type="eyeClick === false?'password':'text'" v-model="userObj.password"  dir="rtl" placeholder="ادخل رمز الحساب هنا" class="pr-1 placeholder:text-[12px] placeholder:font-bold  w-36 h-7 bg-gray-600/55 rounded-2xl border-2 focus:outline-none text-white border-slate-500">   
 <input type="email" v-model="userObj.email" dir="rtl" placeholder="ادخل الايميل هنا" class="pr-1 placeholder:text-sm w-36 h-7 bg-gray-600/55 rounded-2xl border-2 focus:outline-none text-white border-slate-500">
</div>
<div class="flex justify-center items-center flex-col">
    <button type="submit" class="hover:shadow-green-500 hover:shadow-[0_0_15px] bg-green-600 w-32 h-10 rounded-3xl mt-6 transition-all duration-300 ">انشاء حساب</button>
    <p class="mt-1">او</p>
<ClientOnly>
    <GoogleSignInButton dir="rtl" class="mt-2 mr-2" shape="circle" @success="oAuthSing" @error="err" :client-id="clintId"/>
</ClientOnly>
    <p @click="goToLogin" dir="rtl" class="text-sm mt-2 text-gray-500 cursor-pointer hover:text-gray-400 transition-all duration-200">لو كان عندك حساب سجل دخولك هنا!!</p>
    </div>
</form>
</div>
</template>

<script setup lang="ts">
import axios, { Axios, AxiosError, type AxiosResponse } from 'axios';
import { GoogleSignInButton } from 'vue3-google-signin';

const clintId = useRuntimeConfig().public.googleClientId

interface User {
    name:string,
    username:string,
    email:string,
    password:string
}

const justEnglish = ref<RegExp>(/^[A-Za-z0-9_]*$/)
const userObj = ref<User>({name:"",username:"",email:"",password:""})
const eyeClick = ref<boolean>(false)
const emit = defineEmits(['switchToLogin','registerSucssus','sendData'])

const registerSub = async() =>  {
try {
    if(!justEnglish.value.test(userObj.value.username)){
       return alert('لماذا لم تكتب نص انجليزي ياحمار')
    }else if(userObj.value.name === ''||userObj.value.email === ''||userObj.value.password === ''||userObj.value.username === ''){
return alert('لاااا مخلي النص فاضي بكل جراءة')
    }
    const reqAndres : AxiosResponse = await axios.post("http://localhost:9000/users/register",userObj.value,{
        withCredentials:true
    })
    emit('registerSucssus');
    emit('sendData',reqAndres.data.connect)
    userObj.value = unloading(userObj.value)
} catch (error:any) {
    console.log(error.response.data)
}
}

const goToLogin = () => {
navigateTo("/login")
}

const oAuthSing = async(response:any) =>{
    try {
        const reqRes = await axios.post("http://localhost:9000/users/googlereg",{
            token:response.credential,
        },{
            withCredentials:true
        })
        emit('registerSucssus');
        emit('sendData',reqRes.data.user)
    } catch (error:any) {
        console.log(error.response.data)
    }
}

const err = (error:Error) =>{
console.log(`the error is: ${error}`)
}
</script>