<template>
<div class="bg-slate-900 h-[77vh] overflow-y-auto">

    <!-- البحث + زر صناعة مجموعة -->
    <div class="py-6 flex justify-center px-4">
        <div class="w-[24.5rem] max-w-full flex items-center gap-3 flex-wrap">
            <div class="relative flex-1 min-w-[11rem]">
                <input dir="rtl" class="bg-gray-600/55 pr-11 pl-4 py-2.5 text-white rounded-2xl border-2 border-slate-500 focus:border-green-500 focus:shadow-green-500/30 focus:shadow-[0_0_15px] focus:outline-none w-full transition-all duration-300 placeholder:text-gray-400" placeholder="ابحث عن اي حساب">
                <i class="ri-search-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
            </div>
            <button class="flex-shrink-0 bg-green-600 rounded-2xl py-2.5 px-4 text-white text-sm font-bold flex items-center gap-1.5 transition-all duration-300 hover:bg-green-500 hover:scale-105 hover:shadow-green-500 hover:shadow-[0_0_15px]">
                <i class="ri-group-line text-lg"></i>
                <span>صناعة مجموعتك</span>
            </button>
        </div>
    </div>

    <!-- لوحة المجموعات -->
    <div class="flex flex-col items-center px-4">
        <div class="w-[24.5rem] max-w-full bg-slate-800/40 border-2 border-slate-700 rounded-2xl overflow-hidden">

            <!-- رأس اللوحة -->
            <div class="flex items-center justify-between px-4 py-3 border-b-2 border-slate-700/60">
                <div class="flex items-center gap-2 text-gray-300">
                    <i class="ri-team-line text-lg"></i>
                    <p class="text-sm font-bold">المجموعات</p>
                </div>
                <span class="text-xs text-gray-400 bg-slate-700/50 rounded-full px-2.5 py-1">2 مجموعات</span>
            </div>

            <!-- كروت المجموعات -->
            <div class="p-3 flex flex-col gap-3">

                <!-- قروب فيه رسايل غير مقروءة -->
                <div @click="navigateTo('/ChatGroupPage')" class="cursor-pointer group relative bg-slate-800 border-2 border-slate-700/60 hover:border-slate-600 flex items-center w-full h-20 rounded-xl text-white transition-all duration-300 hover:bg-slate-700/60 hover:shadow-green-500/20 hover:shadow-[0_0_15px] active:scale-[0.98]" dir="rtl">
                    <div class="relative flex-shrink-0 mr-3">
                        <img class="h-14 w-14 rounded-full object-cover border-2 border-slate-600 transition-transform duration-300 group-hover:scale-105" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUau82Gp-VHD-ZGShSryO5tg8124oyz0mzfgdMVht1nEzOGXL-WzyxBaw&s=10">
                        <span class="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-slate-700 border-[3px] border-slate-800 flex items-center justify-center" title="مجموعة">
                            <i class="ri-team-fill text-[9px] text-gray-300"></i>
                        </span>
                    </div>
                    <div class="flex flex-col mr-3 min-w-0 flex-1">
                        <h5 class="font-bold truncate">قروب الرياضيات</h5>
                        <p class="text-sm text-gray-400 truncate flex items-center gap-1">
                            <i class="ri-check-double-line text-green-500 flex-shrink-0"></i>
                            <span class="truncate">رسالة كتبت حالبة</span>
                        </p>
                    </div>
                    <div class="flex flex-col items-center gap-1.5 flex-shrink-0 ml-3">
                        <span class="text-xs text-green-400 font-bold">الان</span>
                        <span class="min-w-[20px] h-5 px-1.5 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center shadow-green-500/50 shadow-[0_0_8px]">3</span>
                    </div>
                </div>

                <!-- قروب بدون رسايل + بدون صورة (صورة رمزية) -->
                <div class="cursor-pointer group relative bg-slate-800 border-2 border-slate-700/60 hover:border-slate-600 flex items-center w-full h-20 rounded-xl text-white transition-all duration-300 hover:bg-slate-700/60 hover:shadow-green-500/20 hover:shadow-[0_0_15px] active:scale-[0.98]" dir="rtl">
                    <div class="relative flex-shrink-0 mr-3">
                        <div class="h-14 w-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-800 border-2 border-slate-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                            <i class="ri-team-fill text-2xl text-white"></i>
                        </div>
                        <span class="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-slate-700 border-[3px] border-slate-800 flex items-center justify-center" title="مجموعة">
                            <i class="ri-team-fill text-[9px] text-gray-300"></i>
                        </span>
                    </div>
                    <div class="flex flex-col mr-3 min-w-0 flex-1">
                        <h5 class="font-bold truncate">قروب البرمجة</h5>
                        <p class="text-sm text-gray-400 truncate">جمعنا الغد الساعة 8</p>
                    </div>
                    <div class="flex flex-col items-center gap-1.5 flex-shrink-0 ml-3">
                        <span class="text-xs text-gray-500">أمس</span>
                    </div>
                </div>

            </div>

            <!-- حالة الفراغ : لما ما يكون فيه مجموعات خف div الكروت وشيل hidden من هنا -->
            <div class="hidden flex flex-col items-center gap-3 py-10 text-gray-400 px-4">
                <div class="w-20 h-20 rounded-full bg-slate-800/60 border-2 border-slate-700 flex items-center justify-center">
                    <i class="ri-team-line text-4xl"></i>
                </div>
                <p class="font-bold text-white">لا يوجد لديك مجموعات</p>
                <p class="text-sm text-gray-500">اصنع مجموعتك وابدأ الدردشة مع اصدقائك</p>
            </div>

        </div>
    </div>
            </div>
</template>

<script setup lang="ts">

onMounted(() =>{
    const store = GlobalVaribal()
    store.socket.connect()
})

definePageMeta({
layout:'option-home'
})
</script>