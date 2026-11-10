<template>
  <div class="h-[100vh] flex flex-col bg-slate-900">
    <header>
      <div class="bg-gray-950 h-20 text-white px-6 flex items-center gap-3 border-b-2 border-slate-800">

        <button @click="navigateTo('/')" title="رجوع"
                class="w-11 h-11 rounded-full text-gray-300 hover:bg-slate-800 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0">
          <i class="ri-arrow-right-line text-3xl"></i>
        </button>

        <div class="relative flex-shrink-0">
          <img class="h-12 w-12 rounded-full object-cover border-2 border-slate-600"
               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ZqBWBPjH2tyYkd1rwcQsKQg-2shjSV9b_0SzyZk2_A&s=10" />
          <span class="absolute bottom-0 left-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-gray-950"></span>
        </div>

        <div class="flex flex-col">
          <h2 class="font-bold text-lg">محمد</h2>
          <p class="text-xs text-green-400 flex items-center gap-1.5">
            <span class="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></span>
            متصل
          </p>
        </div>
      </div>
    </header>

    <Chat :Messages="MessagesArray" @changeMessage="MessagesArray = $event"/>

    <footer>
      <div class="bg-gray-950 border-t-2 border-slate-800 px-4 py-3">
        <div class="flex items-center gap-2.5">

    
          <button title="ارسال صورة"
                  class="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 text-gray-300 hover:text-green-400 hover:border-green-500 hover:shadow-green-500 hover:shadow-[0_0_12px] transition-all duration-300 flex items-center justify-center flex-shrink-0">
            <i class="ri-image-add-line text-2xl"></i>
          </button>

          <input dir="rtl" placeholder="اكتب رسالتك هنا..." v-model="Message.text" @keydown.enter="SendMessage"
                 class="flex-1 h-11 bg-gray-600/55 px-4 text-white rounded-2xl border-2 border-slate-500 focus:border-green-500 focus:outline-none placeholder:text-sm placeholder:text-gray-300" />

   
          <button title="ارسال"  @click="SendMessage" 
                  class="w-11 h-11 rounded-full bg-green-600 text-white hover:bg-green-500 hover:shadow-green-500 hover:shadow-[0_0_15px] transition-all duration-300 flex items-center justify-center flex-shrink-0">
            <i class="ri-send-plane-2-fill text-xl -scale-x-100"></i>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">

interface MessageObj {
  RoomName:string
  text:string,
  sender:string,
  Receiver:string,
  createdAt?:string
} 

const Message = ref<MessageObj>({
  RoomName:"",
  text:"",
  sender:"",
  Receiver:"",
})

const MessagesArray = ref<MessageObj[]>([])

onMounted(() =>{
  const store = GlobalVaribal()
const RoomName = localStorage.getItem("RoomName")||""
Message.value.RoomName = RoomName
console.log(Message.value.RoomName)
store.socket.connect()
})

const SendMessage = () =>{
const store = GlobalVaribal()

if(!Message.value.text){
 return alert("ضروري تكتب اي شي!!")
}
const RegisterUser = JSON.parse(localStorage.getItem("registerUser"))||""
const LoginUser = JSON.parse(localStorage.getItem("getData"))||""
const FriendId = localStorage.getItem("FriendUser")
const Useror = RegisterUser._id || LoginUser._id


Message.value.sender = Useror
Message.value.Receiver = FriendId

store.socket.emit("SendMessage",Message.value)

store.socket.off("receptionMessage")
store.socket.on("receptionMessage",(saveMessage:MessageObj) =>{
console.log(saveMessage)
console.log("open server message")

const NewDeta = new Date(saveMessage.createdAt);
const timeDeta = NewDeta.toLocaleTimeString("ar-LY",{
  hour: '2-digit',
minute: '2-digit',
    hour12: true
})

saveMessage.createdAt = timeDeta
MessagesArray.value.push(saveMessage)
})
Message.value.text = ""

}

</script>