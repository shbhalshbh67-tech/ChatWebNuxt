<template>
  <div class="bg-slate-900 h-[80vh] flex flex-col">
    <div class="flex-1 min-h-0 overflow-y-auto px-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full">
      <div class="w-[23rem] max-w-full mx-auto py-6">


        <div class="w-[25rem]  bg-slate-800/40 border-2 border-slate-700 rounded-2xl overflow-hidden">

          <div class="flex items-center justify-between px-4  py-3 border-b-2 border-slate-700/60">
            <div class="flex items-center gap-2 text-gray-300">
              <i class="ri-user-heart-line text-lg"></i>
              <p class="text-sm font-bold">طلبات الصداقة</p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-green-400 bg-green-600/20 rounded-full px-2.5 py-1">{{ requistFriendsArray.length }} طلبات</span>
              <button @click="AcceptAll" title="قبول الكل" class="text-xs text-green-400 hover:text-green-300 transition-all duration-300">قبول الكل</button>
            </div>
          </div>

          <div v-for="(user,index) in requistFriendsArray" class="p-3 flex flex-col gap-3">

            <div class="bg-slate-800 flex items-center h-24 rounded-xl text-white px-3" dir="rtl">
              <div class="relative flex-shrink-0 mr-3">
                <img  v-if="user.img" class=" h-16 w-16 rounded-full object-cover border-2 border-slate-600"
                    :src="user.img" />
                <div v-else class="h-16 w-16 rounded-full bg-slate-600 border-2 border-slate-500 flex items-center justify-center text-xl font-bold flex-shrink-0 mr-3">{{ user.name.slice(0,1) }}</div>
                <span class="absolute bottom-0 left-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-slate-900"></span>
              </div>
              <div class="flex flex-col mr-3 min-w-0">
                <h5 class="font-bold">{{ user.name }}</h5>
                <p dir="ltr" class="text-xs text-gray-400">{{ user.username }}</p>
                <p class="text-[10px] text-gray-500 mt-0.5">2 عدد متابعينه</p>
              </div>
              <div class="ms-auto mr-3 flex items-center gap-3 flex-shrink-0">
                <button title="رفض الطلب" @click="Requestrejected(user,index)"
                        class="h-9 px-4 rounded-3xl bg-slate-700 border border-slate-600 text-gray-300 text-sm hover:bg-red-600 hover:border-red-600 hover:text-white hover:shadow-red-500 hover:shadow-[0_0_12px] transition-all duration-300">
                  رفض
                </button>
                <button title="موافقة على الطلب" @click="AcceptFriendReqist(user,index)"
                        class="h-9 px-4 rounded-3xl bg-green-600 text-sm font-bold hover:bg-green-500 hover:shadow-green-500 hover:shadow-[0_0_12px] transition-all duration-300">
                  موافقة
                </button>
              </div>
            </div>

          </div>
          
        </div>
<div class="flex justify-center">
        <div v-if="requistFriendsArray.length === 0" class="flex-col items-center  gap-2 mt-16 text-gray-400">
          <i class="ri-user-heart-line text-6xl text-center"></i>
          <p class="text-sm text-center">مافي اي طلبات صداقة</p>
          <p class="text-xs text-gray-500">لما حد يبعتلك طلب راح يظهر هنا</p>
        </div>
</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios, { Axios, type AxiosResponse } from 'axios';

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

const requistFriendsArray = ref<UsersTypys[]>([])
const meObject = ref<UsersTypys>(null)

definePageMeta({
layout:'option-home'
})

onMounted( async() =>{
const store = GlobalVaribal()
store.socket.disconnect()
try {
  const reqRes : AxiosResponse = await axios(`http://localhost:9000/users/Friends`,{
    withCredentials:true
  })
  requistFriendsArray.value = reqRes.data.findFrindRequist.requistFriend
  meObject.value = reqRes.data.findFrindRequist
console.log(requistFriendsArray.value)
} catch (error) {
  console.log(error.response.data)
}
})

const Requestrejected = async(user:UsersTypys,index:number) =>{
requistFriendsArray.value.splice(index, 1);
try {
  const reqRes = await axios.put(`http://localhost:9000/users/Requestrejected/${user._id}`,null,{
    withCredentials:true
  })
  console.log(reqRes.data)
} catch (error) {
  console.log(error.response.data)
}}

const AcceptFriendReqist = async(user:UsersTypys,index:number) =>{
  requistFriendsArray.value.splice(index,1)
  try {
  const reqRes = await axios.put(`http://localhost:9000/users/AcceptFriendReqist/${user._id}`,null,{
    withCredentials:true
  })
  console.log(reqRes.data)    
  } catch (error) {
    console.log(error.response.data)
  }
}

const AcceptAll = async() =>{
  try {
      const friendsIdArray = []
for(const user of requistFriendsArray.value){
friendsIdArray.push(user._id)
}
console.log(friendsIdArray)
    const reqRes = await axios.put(`http://localhost:9000/users/AcceptAll`,{Friends:friendsIdArray},{
      withCredentials:true
    })
    console.log(reqRes.data)
    requistFriendsArray.value = []
  } catch (error) {
    console.log(error.response.data)
  }
}
</script>