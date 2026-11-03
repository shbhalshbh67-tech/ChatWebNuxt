<template>
  <div class="bg-slate-900 h-[100vh] flex justify-center items-center px-4">
    <div dir="rtl" class="bg-slate-800 w-[22rem] max-w-full rounded-3xl flex-shrink-0 text-white flex flex-col items-center py-8 px-6">

      <!-- الدايرة: المقاس على الديف الخارجي باش ما تنكسرش -->
      <div class="relative w-32 h-32 mb-6 flex-shrink-0">
        <div class="w-full h-full rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center overflow-hidden">
          <i class="ri-user-3-line text-6xl text-gray-400"></i>
        </div>
        <label for="add-photo-input" title="اضافة صورة"
               class="absolute bottom-0 left-0 w-10 h-10 rounded-full bg-green-600 border-4 border-slate-800 flex items-center justify-center cursor-pointer hover:bg-green-500 hover:shadow-green-500 hover:shadow-[0_0_15px] transition-all duration-300">
          <i class="ri-camera-fill text-lg"></i>
        </label>
      </div>

      <input type="file" id="add-photo-input" accept="image/*" class="hidden" />

      <h1 class="text-center font-bold text-2xl mb-2">هل تريد اضافة صورة؟</h1>
      <p class="text-center text-sm text-gray-400 leading-relaxed">اضف صورة شخصية ليتعرف عليك الاشخاص</p>

      <label for="add-photo-input"
             class="cursor-pointer bg-green-600 w-36 h-10 rounded-3xl flex items-center justify-center gap-2 hover:bg-green-500 hover:shadow-green-500 hover:shadow-[0_0_15px] transition-all duration-300 mt-6">
        <i class="ri-image-add-line text-xl"></i>
        <span>اضافة صورة</span>
      </label>

      <p class="my-3 text-sm text-gray-500">او</p>

      <button @click="navigateTo('/')" title="تخطي"
              class="w-36 h-10 rounded-3xl bg-slate-700 border border-slate-600 text-gray-300 hover:bg-slate-600 hover:text-white transition-all duration-300">
        تخطي
      </button>

      <p class="text-xs text-gray-500 mt-5">تقدر تغير الصورة في اي وقت من الاعدادات</p>
    </div>
  </div>
</template>

