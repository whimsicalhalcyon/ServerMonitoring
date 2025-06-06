<script>
import UiSelect from "@/components/UiSelect.vue";
import InputRange from "@/components/ServerCharts/Components/InputRange.vue";
import UIInput from "@/components/UIInput.vue";
import MainButton from "@/components/MainButton.vue";

export default {
  components: {MainButton, UIInput, UiSelect, InputRange},
   props : {
     openDialog: {
       type: Boolean,
       default:false
     }
   },
  methods : {
    hideWindow() {
      this.$emit('update:openDialog', false)
    }
  }
}
</script>

<template>
  <div v-if="openDialog" class="fixed inset-0 bg-black !bg-opacity-50 flex items-center justify-center z-50" @click.stop="hideWindow">
    <div class="bg-white rounded-lg w-[1200px] p-6 h-190 text-neutral-500 " @click.stop>
      <h2 class="text-2xl text-neutral-800 mb-5">Редактировать виджет</h2>
      <div class="container-info flex flex-row justify-between items-center">
        <div class="container-date w-[40%] text-lg">
          <div class="container-select flex flex-col h-50">
            <span class="mb-1">Имя графика</span>
            <ui-select class="mb-5"></ui-select>
            <span class="mb-1">Интервал обновления</span>
            <ui-select class="mb-5"></ui-select>
          </div>
          <div class="select-param flex flex-col rounded-lg bg-neutral-100 mt-2 p-5">
            <span class="mb-1">Набор данных</span>
            <ui-select class="mb-5"></ui-select>
            <span class="mb-1">Шаблон данных</span>
            <ui-select class="mb-1"></ui-select>
          </div>
        </div>
        <div class="chart bg-blue-400 w-[55%] h-100">

        </div>
      </div>

      <div class="container-range flex flex-row justify-between w-[100%] rounded-lg bg-neutral-100 mt-5 p-5 text-lg">
        <div class="container-range-param flex flex-col">
          <span class="mb-2">Ширина</span>
          <input-range class="mb-5"></input-range>
          <span class="mb-2">Размер точек</span>
          <input-range class="mb-5"></input-range>
        </div>
        <div class="container-range-param flex flex-col">
          <span class="mb-2">Прозрачность</span>
          <input-range class="mb-5"></input-range>
          <span class="mb-2">Заполнение</span>
          <input-range class="mb-5"></input-range>
        </div>
        <div class="container-range-param">
          <span class="mb-2">Цвет</span>
          <div class="colors flex flex-row">
            <input type="color" class="w-30 h-20">
          </div>
        </div>
      </div>
      <div class="container-button mt-5 flex justify-between">
        <main-button class="!bg-white !text-sky-400 !border !border-sky-400 hover:!bg-sky-400 hover:!text-white">Добавить набор данных</main-button>
        <div class="save-close">
          <main-button class="mr-5 bg-zinc-600 hover:bg-zinc-800" @click="hideWindow">Отмена</main-button>
          <main-button>Сохранить</main-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>