<script>

</script>

<template>
  <label class="inline-flex items-center cursor-pointer space-x-2">
  <!-- Стилированный чекбокс -->
  <input type="checkbox" class="peer hidden"/>
  <div class="w-5 h-5 border-2 border-neutral-400 rounded-sm flex items-center justify-center transition duration-200
              peer-checked:bg-sky-600 peer-checked:border-neutral-400 text-white">
    <i class="fa-solid fa-check hidden peer-checked:block"></i>
  </div>

  <!-- Текст справа -->
  <span>Тип ошибки</span>
</label>

</template>

<style scoped>

</style>