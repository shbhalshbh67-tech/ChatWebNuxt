<template>
  <div  class="h-[100vh] flex flex-col bg-slate-900">
    <header v-if="FriendUser">
      <div class="bg-gray-950 h-20 text-white px-6 flex items-center gap-3 border-b-2 border-slate-800">

        <button @click="navigateTo('/')" title="رجوع"
                class="w-11 h-11 rounded-full text-gray-300 hover:bg-slate-800 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0">
          <i class="ri-arrow-right-line text-3xl"></i>
        </button>

        
        <div class="relative flex-shrink-0">
          <img v-if="FriendUser.img" class="h-12 w-12 rounded-full object-cover border-2 border-slate-600"
               :src="FriendUser.img" />
          <div v-else class="h-14 w-14 rounded-full bg-gradient-to-br border-slate-500 bg-gray-600/55 border-2  flex items-center justify-center text-xl font-bold text-white transition-transform duration-300 group-hover:scale-105">{{ FriendUser.name.slice(0,1) }}</div>
  <span v-if="FriendUser.is_Online" class="absolute bottom-0 left-0 h-3.5 w-3.5 bg-green-500 rounded-full border-2 border-gray-950"></span>
        </div>

        <div class="flex flex-col">
          <h2 class="font-bold text-lg">{{ FriendUser.name }}</h2>
          <p v-if="FriendUser.is_Online" class="text-xs text-green-400 flex items-center gap-1.5">
            <span class="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></span>
            متصل
          </p>
          <p v-else class="text-xs text-red-500 flex items-center gap-1.5">
            <span class="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse"></span>
            غير متصل
          </p>
        </div>
      </div>
    </header>
    <header v-else>

    </header>

    <Chat :Messages="MessagesArray" @changeMessage="findOldMessage($event)"/>

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
  Receiver:{
    user:string,
  },
  createdAt?:string
} 

interface UsersTypys {
    _id?:string,
    name:string,
    username:string,
    email:string,
    password:string,
    img?:string
    isAdmin:boolean,
    requistFriend:UsersTypys[],
    isUserReqtist?:boolean,
    is_Online:boolean
}

const Message = ref<MessageObj>({
  RoomName:"",
  text:"",
  sender:"",
  Receiver:{
    user:"",
  },
})

const MessagesArray = ref<MessageObj[]>([])

const FriendUser = ref<UsersTypys>(null)



onUnmounted(() => {
  const store = GlobalVaribal()
  store.socket.emit("LeaveRoom", localStorage.getItem("RoomName"))
  store.socket.off("ChangeStatusMessage")
  store.socket.off("receptionMessage")
  localStorage.removeItem("RoomName")
})


onMounted(() =>{
  const store = GlobalVaribal();
// open socket server
store.socket.connect()


// on messages
store.socket.off("receptionMessage")
store.socket.on("receptionMessage",(saveMessage:MessageObj) =>{
if (MessagesArray.value.some(m => m._id === saveMessage._id)) return
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

store.socket.off("ChangeStatusMessage")
store.socket.on("ChangeStatusMessage", ({ receiver, is_Read }) => {
  for (const m of MessagesArray.value) {
    if (m.Receiver.user === receiver && m.Receiver.is_Read !== "openChat") {
      m.Receiver.is_Read = is_Read
    }
  }
})

//all localstorg
const RoomName = localStorage.getItem("RoomName")||""
const GetFriendUser = JSON.parse(localStorage.getItem("FriendUser"));
const RegisterUser = JSON.parse(localStorage.getItem("registerUser"))||""
const LoginUser = JSON.parse(localStorage.getItem("getData"))||""
const Useror = RegisterUser._id || LoginUser._id

//is_Online Socket
store.socket.emit("OnlineUser",Useror)


FriendUser.value = GetFriendUser
Message.value.RoomName = RoomName
console.log(Message.value.RoomName)

// join room socket
store.socket.emit("JoinRoom",RoomName,RegisterUser.name||LoginUser.name)
})

const SendMessage = () =>{
const store = GlobalVaribal()

if(!Message.value.text){
 return alert("ضروري تكتب اي شي!!")
}
const RegisterUser = JSON.parse(localStorage.getItem("registerUser"))||""
const LoginUser = JSON.parse(localStorage.getItem("getData"))||""
const FriendId : UsersTypys = JSON.parse(localStorage.getItem("FriendUser"))
const Useror = RegisterUser._id || LoginUser._id


Message.value.sender = Useror
Message.value.Receiver.user = FriendId._id

store.socket.emit("SendMessage",Message.value)

Message.value.text = ""
}

const findOldMessage = (event:MessageObj[]) =>{
for(const message of event){
const NewDeta = new Date(message.createdAt);
const timeDeta = NewDeta.toLocaleTimeString("ar-LY",{
  hour: '2-digit',
minute: '2-digit',
    hour12: true
})
message.createdAt = timeDeta
}
MessagesArray.value = event
}



</script>