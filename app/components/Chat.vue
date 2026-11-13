<template>
  <div
    class="flex-1 min-h-0 overflow-y-auto bg-slate-900 px-4 py-5 flex flex-col gap-3
           [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full"
  >

    <div class=" hidden mx-auto bg-slate-800 text-gray-400 text-xs rounded-full px-4 py-1.5">اليوم</div>
    <!-- حط في :class = bg-slate-800-->
    <div v-for="message in props.Messages" :class="message.sender != myId?'justify-start':'justify-end'" class="flex">
      <div :class="message.sender != myId?'bg-slate-800':'bg-green-600'" class="max-w-[70%]  text-white rounded-2xl rounded-tl-sm px-4 py-2.5">
        <p class="text-sm leading-relaxed">{{ message.text }}</p>
        <p class="text-[10px] text-green-200 mt-1 flex items-center justify-end gap-1">
         {{ message.createdAt }}<i class="ri-check-double-line text-xs"></i>
        </p>
      </div>
    </div>

    <div class="flex justify-start hidden">
      <div class="max-w-[70%] bg-slate-800 text-white rounded-2xl rounded-tr-sm p-2">
        <img class="rounded-xl w-52 h-40 object-cover"
             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUau82Gp-VHD-ZGShSryO5tg8124oyz0mzfgdMVht1nEzOGXL-WzyxBaw&s=10" />
        <p class="text-sm leading-relaxed mt-1.5 mr-1">شوف هذا التمرين ما فهمته</p>
        <p class="text-[10px] text-gray-400 mt-1 mr-1">10:32 م</p>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import axios from 'axios';

const props = defineProps({
  Messages:{
    type:Array,
    default: [],
  }
})

const emit = defineEmits(["changeMessage"]);

const myId = ref<string>("")

onMounted( async() =>{
const RegisterUser = JSON.parse(localStorage.getItem("registerUser"))||""
const LoginUser = JSON.parse(localStorage.getItem("getData"))||""
const RoomName = localStorage.getItem("RoomName")||""
const or = RegisterUser||LoginUser

myId.value = or._id
try {
  const reqRes = await axios.get(`http://localhost:9000/message/findMessages/${RoomName}`)
  console.log(reqRes.data.findMessages)
  emit("changeMessage",reqRes.data.findMessages)
} catch (error) {
  console.log(error.response.data)
}
})

</script>