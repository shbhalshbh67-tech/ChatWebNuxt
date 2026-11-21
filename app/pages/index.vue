<template>
<div class="bg-slate-900 h-[90vh] scroll-c overflow-y-auto">

    <div class="py-6 flex justify-center px-4">
        <div class="relative w-[24.5rem] max-w-full">
            <input @focus="navigateTo('/SearchFriends')" dir="rtl" class="bg-gray-600/55 pr-11 pl-4 py-2.5 text-white rounded-2xl border-2 border-slate-500 focus:border-green-500 focus:shadow-green-500/30 focus:shadow-[0_0_15px] focus:outline-none w-full transition-all duration-300 placeholder:text-gray-400" placeholder="ابحث عن اي حساب">
            <i class="ri-search-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
        </div>
    </div>

    <div class="flex flex-col items-center px-4 pb-6">
        <div class="w-[24.5rem] max-w-full bg-slate-800/40 border-2 border-slate-700 rounded-2xl overflow-hidden">

            <div class="flex items-center justify-between px-4 py-3 border-b-2 border-slate-700/60">
                <div class="flex items-center gap-2 text-gray-300">
                    <i class="ri-user-heart-line text-lg"></i>
                    <p class="text-sm font-bold">الأصدقاء</p>
                </div>
                <span class="text-xs text-gray-400 bg-slate-700/50 rounded-full px-2.5 py-1">{{ FriendsArray.length }} اصدقاء</span>
            </div>

            <div v-for="User in FriendsArray" :key="User._id || User.name" class="p-3 flex flex-col gap-3">
                <div @click="OpenChat(User)" class="cursor-pointer group relative bg-slate-800 border-2 border-slate-700/60 hover:border-slate-600 flex items-center w-full h-20 rounded-xl text-white transition-all duration-300 hover:bg-slate-700/60 hover:shadow-green-500/20 hover:shadow-[0_0_15px] active:scale-[0.98]" dir="rtl">
                    <div class="relative flex-shrink-0 mr-3">
                        <img v-if="User.img" :src="User.img" class="h-14 w-14 rounded-full object-cover border-2 border-slate-600 transition-transform duration-300 group-hover:scale-105">
                        <div v-else class="h-14 w-14 rounded-full bg-gradient-to-br border-slate-500 bg-gray-600/55 border-2 flex items-center justify-center text-xl font-bold text-white transition-transform duration-300 group-hover:scale-105">{{ User.name?.slice(0,1) }}</div>
                        <span v-if="User.is_Online" class="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-[3px] border-slate-800" title="متصل"></span>
                    </div>

<div class="flex flex-col mr-3 min-w-0 flex-1">
    <h5 class="font-bold truncate">{{ User.name }}</h5>
    <div v-if="User.lastMessage" class="flex items-center gap-1 text-xs text-gray-400">
    <i v-if="User.lastMessage.state === 'openChat'" class="ri-check-double-line text-sky-400"></i>
    <i v-else-if="User.lastMessage.state === 'openApp'" class="ri-check-double-line"></i>
    <i v-else class="ri-check-line"></i>
        <span class="truncate">{{ User.lastMessage.text }}</span>
    </div>
</div>

                    <div class="flex flex-col items-center gap-1.5 flex-shrink-0 ml-3">
                        <span v-if="User.NewMsgCount > 0" class="text-xs text-green-400 font-bold">{{ User.NewMsgTimeCread }}</span>
                        <span v-if="User.NewMsgCount > 0" class="min-w-[20px] h-5 px-1.5 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shadow-green-500/50 shadow-[0_0_8px]">{{ User.NewMsgCount }}</span>
                    </div>
                </div>
            </div>

            <div v-if="FriendsArray.length === 0" class="flex flex-col items-center gap-3 py-10 text-gray-400 px-4">
                <div class="w-20 h-20 rounded-full bg-slate-800/60 border-2 border-slate-700 flex items-center justify-center">
                    <i class="ri-user-search-line text-4xl"></i>
                </div>
                <p class="font-bold text-white">لا يوجد لديك اصدقاء</p>
                <p class="text-sm text-gray-500">ابحث عن حسابات وارسل لهم طلب صداقة</p>
            </div>

        </div>
    </div>

</div>
</template>

<script setup lang="ts">
import axios from 'axios';


definePageMeta({
    layout: 'option-home'
})

interface UsersTypys {
    _id?: string,
    name: string,
    username: string,
    email: string,
    password: string,
    img?: string,
    isAdmin: boolean,
    requistFriend: UsersTypys[],
    isUserReqtist?: boolean,
    is_Online: boolean,
    friends: string,
// بالمناسبة هذي متغيرات مصممة لصفحة هذي بس وليس لها
//  علاقة بقاعدة البيانات مجرد شي لعرض البيانات المهمة في هذي الصفحة
    lastMessage?: {
        text: string,
        state: string
    },
    NewMsgCount?:number,
    NewMsgTimeCread:string
//////////////////
}

const FriendsArray = ref<UsersTypys[]>([])

onMounted(async () => {
    const store = GlobalVaribal()
    store.socket.connect()

    const RegisterUser = JSON.parse(localStorage.getItem("registerUser") || "null") || {}
    const LoginUser = JSON.parse(localStorage.getItem("getData") || "null") || {}
    const Useror = RegisterUser._id || LoginUser._id

    store.socket.emit("OnlineUser", Useror)

    try {
        const reqRes = await axios.get(`http://localhost:9000/users/Friends`, {
            withCredentials: true
        })

        const friendsList: UsersTypys[] = reqRes.data?.findFrindRequist?.friends || []

        for (const friend of friendsList) {
            const RoomArray = [RegisterUser.name || LoginUser.name, friend.name].filter(Boolean).sort()
            const setupRoom = RoomArray.join("").trim()

            try {
                const msgRes = await axios.get(`http://localhost:9000/message/lastMessage/${setupRoom}`, {
                    withCredentials: true
                })

                const lastMsg = msgRes.data?.lastMessage
                const msgCount = msgRes.data?.CountdontShowMessages
                if (lastMsg) {
                    friend.lastMessage = {
                        text: lastMsg.text ?? '',
                        state: lastMsg.Receiver?.is_Read ?? ''
                    }
                    const NewDeta = new Date(lastMsg.createdAt);
                    const EndTime = NewDeta.toLocaleTimeString("ar-LY",{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
})
                    friend.NewMsgTimeCread = EndTime
                }
                if(msgCount){
                friend.NewMsgCount = msgCount ?? ''
                }
                console.log(msgRes.data)
            } catch (msgError: any) {
                console.error("Last message error:", msgError?.response?.data ?? msgError)
            }
        }

        FriendsArray.value = friendsList
    } catch (error: any) {
        console.error("Friends list error:", error?.response?.data ?? error)
    }
})

const OpenChat = (User: UsersTypys) => {
    const RegisterUser = JSON.parse(localStorage.getItem("registerUser") || "null") || {}
    const LoginUser = JSON.parse(localStorage.getItem("getData") || "null") || {}

    const namesArray = [User.name, RegisterUser.name || LoginUser.name].filter(Boolean).sort()
    const SetupGroupName = namesArray.join("").trim()

    save(User, SetupGroupName)
    navigateTo("/ChatFriendsPage")
}

const save = (FrId: UsersTypys, Room: string) => {
    localStorage.setItem("FriendUser", JSON.stringify(FrId))
    localStorage.setItem("RoomName", Room)
}
</script>