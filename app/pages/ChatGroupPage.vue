<template>
  <div class="h-[100vh] flex flex-col bg-slate-900">
    <header>
      <div class="bg-gray-950 h-20 text-white px-6 flex items-center gap-3 border-b-2 border-slate-800">

        <button @click="navigateTo('/')" title="رجوع"
                class="w-11 h-11 rounded-full text-gray-300 hover:bg-slate-800 hover:text-white transition-all duration-300 flex items-center justify-center flex-shrink-0">
          <i class="ri-arrow-right-line text-3xl"></i>
        </button>

        <img class="h-12 w-12 rounded-full object-cover border-2 border-slate-600 flex-shrink-0"
             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUau82Gp-VHD-ZGShSryO5tg8124oyz0mzfgdMVht1nEzOGXL-WzyxBaw&s=10" />

        <div class="flex flex-col">
          <h2 class="font-bold text-lg">قروب الرياضيات</h2>
          <p class="text-xs text-gray-400">3 أعضاء</p>
        </div>

        <button title="اضافة عضو للقروب"
                class="ms-auto w-11 h-11 rounded-full bg-slate-800 border border-slate-700 text-green-400 hover:bg-green-600 hover:text-white hover:shadow-green-500 hover:shadow-[0_0_12px] transition-all duration-300 flex items-center justify-center flex-shrink-0">
          <i class="ri-user-add-line text-2xl"></i>
        </button>

        <button title="ازالة عضو من القروب"
                class="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 text-red-400 hover:bg-red-600 hover:text-white hover:shadow-red-500 hover:shadow-[0_0_12px] transition-all duration-300 flex items-center justify-center flex-shrink-0">
          <i class="ri-user-unfollow-line text-2xl"></i>
        </button>
      </div>
    </header>
    <Chat />

    <footer>
      <div class="bg-gray-950 border-t-2 border-slate-800 px-4 py-3">
        <div class="flex items-center gap-2.5">

          <button title="ارسال صورة"
                  class="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 text-gray-300 hover:text-green-400 hover:border-green-500 hover:shadow-green-500 hover:shadow-[0_0_12px] transition-all duration-300 flex items-center justify-center flex-shrink-0">
            <i class="ri-image-add-line text-2xl"></i>
          </button>

          <input dir="rtl" placeholder="اكتب رسالتك هنا..."
                 class="flex-1 h-11 bg-gray-600/55 px-4 text-white rounded-2xl border-2 border-slate-500 focus:border-green-500 focus:outline-none placeholder:text-sm placeholder:text-gray-300" />

          <button title="ارسال"
                  class="w-11 h-11 rounded-full bg-green-600 text-white hover:bg-green-500 hover:shadow-green-500 hover:shadow-[0_0_15px] transition-all duration-300 flex items-center justify-center flex-shrink-0">
            <i class="ri-send-plane-2-fill text-xl -scale-x-100"></i>
          </button>
        </div>
      </div>
    </footer>
  </div>
</template>