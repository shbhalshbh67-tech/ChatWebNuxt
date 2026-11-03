<template>
  <div
    class="flex-1 min-h-0 overflow-y-auto bg-slate-900 px-4 py-5 flex flex-col gap-3
           [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full"
  >

    <div class=" hidden mx-auto bg-slate-800 text-gray-400 text-xs rounded-full px-4 py-1.5">اليوم</div>



    <!-- حط في :class = bg-slate-800-->
    <div class="flex justify-end">
      <div class="max-w-[70%] bg-green-600 text-white rounded-2xl rounded-tl-sm px-4 py-2.5">
        <p class="text-sm leading-relaxed">الحمد لله، انت شحالك؟</p>
        <p class="text-[10px] text-green-200 mt-1 flex items-center justify-end gap-1">
          10:31 م <i class="ri-check-double-line text-xs"></i>
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