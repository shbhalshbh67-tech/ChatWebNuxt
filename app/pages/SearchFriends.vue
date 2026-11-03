<template>
  <div class="bg-slate-900 h-[100vh] flex flex-col">

    <div class="py-6 flex justify-center flex-shrink-0">
      <div class="relative w-[23rem] max-w-full">

        <button @click="navigateTo('/')" title="رجوع"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full text-gray-300 hover:bg-slate-600 hover:text-white transition-all duration-300 flex items-center justify-center z-10">
          <i class="ri-arrow-right-line text-2xl"></i>
        </button>
        <input v-model="SearchText" @focus="SearchUsers" @input="SearchUsers" dir="rtl" placeholder="ابحث عن اي حساب"
               class="w-[23rem] max-w-full h-11 bg-gray-600/55 pr-12 pl-11 text-white rounded-2xl border-2 border-slate-500 focus:border-green-500 focus:outline-none placeholder:text-sm placeholder:text-gray-300" />
        <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
      </div>
    </div>


    <div class="flex-1 min-h-0 overflow-y-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div class="w-[23rem] max-w-full mx-auto pb-6">


        <div class="bg-slate-800/40 border-2 border-slate-700 rounded-2xl overflow-hidden">

          <div class="flex items-center justify-between px-4 py-3 border-b-2 border-slate-700/60">
            <div class="flex items-center gap-2 text-gray-300">
              <i class="ri-search-line text-lg"></i>
              <p class="text-sm font-bold">النتائج</p>
            </div>
            <span class="text-xs text-gray-400 bg-slate-700/50 rounded-full px-2.5 py-1">4 حسابات</span>
          </div>

          <div v-for="(user,index) in EndSearch" class="p-3 flex flex-col gap-3">

            <div class="pl-3 bg-slate-800 flex items-center h-20 rounded-xl text-white" dir="rtl">
              <div class="relative flex-shrink-0 mr-3">
                <img v-if="user.img" class="h-14 w-14 rounded-full object-cover border-2 border-slate-600"
                     :src="user.img" />
              <div v-else class="h-14 w-14 rounded-full bg-slate-600 border-2 border-slate-500 flex items-center justify-center text-xl font-bold flex-shrink-0 mr-3">{{ user.name.slice(0,1) }}</div>
              </div>
              <div class="flex flex-col mr-3 min-w-0">
                <h5 class="font-bold">{{ user.name }}</h5>
                <p dir="ltr" class="text-xs text-gray-400">{{ user.username }}</p>
              </div>
              <button title="اضافة صديق"
                      class="ms-auto mr-3 h-9 px-4 rounded-3xl text-sm font-bold flex items-center gap-1.5  flex-shrink-0"
                      @click="FriendRequist(user)"
                      :class="user.isUserReqtist?'bg-blue-600 cursor-default transition-all duration-500':'bg-green-600 hover:bg-green-500 transition-all duration-500 hover:shadow-green-500 hover:shadow-[0_0_12px]'">
                <i class="ri-user-add-line text-lg"></i>
                {{ user.isUserReqtist?'تم الارسال':'اضافة' }}
              </button>
            </div>
          </div>
          <div v-if="EndSearch.length === 0" class="flex justify-center items-center h-auto pb-16">
        <div class=" gap-2 mt-16 text-gray-400 flex justify-center items-center flex-col">
          <i class="ri-user-search-line text-6xl"></i>
          <p class="text-sm">ما لقيناش اي حساب بهذا الاسم</p>
          <p class="text-xs text-gray-500">جرب اسم ثاني</p>
        </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import axios, { type AxiosResponse } from 'axios';

interface UsersTypys {
    _id?:string,
    name:string,
    username:string,
    email:string,
    password:string,
    img?:string
    isAdmin:boolean,
    requistFriend:UsersTypys[],
    isUserReqtist?:boolean
}


const SearchText = ref<string>('')
const EndSearch = ref<UsersTypys[]>([])

onMounted(() =>{
  const store = GlobalVaribal()
  store.socket.disconnect()
})

const SearchUsers = async() =>{
    try {
 const reqres : AxiosResponse = await axios.get(`http://localhost:9000/users/search?Searchtext=${SearchText.value.trim()}`)    
 console.log(reqres.data.SearchUsers)  
const UsersArray : UsersTypys[] = reqres.data.SearchUsers  
const Register = JSON.parse(localStorage.getItem("registerUser") || "{}")
        const Login = JSON.parse(localStorage.getItem("getData") || "{}")
        const myCurrentId = Login._id || Register._id

let justOtherUsers : UsersTypys[] = null
if(!Login){
justOtherUsers = UsersArray.filter(item => item.username != Register.username) 
}else if(!Register.username){
justOtherUsers = UsersArray.filter(item => item.email != Register.email)
}else{
justOtherUsers = UsersArray.filter(item => item.username != Login.username) 
}
EndSearch.value = justOtherUsers.map(user =>{
const requistUser = user.requistFriend
const isUserReqtist  = requistUser.some(item => item === myCurrentId)

return{
    ...user,
    isUserReqtist
}
})
    } catch (error) {
        console.log(error.response.data.SearchUsers)
    }
}

const FriendRequist = async(user:UsersTypys) => {
    if(user.isUserReqtist){
        return
    }else{
try {
    const reqRes : AxiosResponse = await axios.put(`http://localhost:9000/users/requistFriend/${user._id}`,null,{
      withCredentials:true
    })
    console.log(reqRes.data.user)
    user.isUserReqtist = true

} catch (error) {
    console.log(error.response.data)
}
    }
}

</script>