<script>

import UIInput from "@/components/UIInput.vue";
import UiSelect from "@/components/UiSelect.vue";
import inputDate from "@/components/InputDate.vue";
import MainButton from "@/components/MainButton.vue";

export default {
  components: {
    UIInput, UiSelect, inputDate, MainButton
  }
}

</script>

<template>
  <h1 class="text-lg text-green-70">Мониторинг</h1>
  <section class="section-menu bg-white rounded-xl px-5 py-5">
    <div class="container-menu  flex flex-row justify-between mb-4">
      <u-i-input class="w-125"></u-i-input>
      <ui-select class="w-80"></ui-select>
      <ui-select class="w-80"></ui-select>
    </div>
    <div class="container-parametres flex flex-row justify-between">
      <div class="container-date flex flex-row justify-between">
        <input-date class="mr-2"></input-date>
        <input-date class="mr-2"></input-date>
        <main-button></main-button>
      </div>
<!--      сделать потом отдельный компонент для радио-кнопок, чтобы было меньше нагромождения кода-->
      <div class="container-radio-param flex flex-wrap">
        <div class="radio-elem flex flex-row justify-items-center">
          <input type="radio" name="1" id="1"><span class="ml-2">Последние 5 минут</span>
        </div><div class="radio-elem flex flex-row justify-items-center">
          <input type="radio" name="1" id="1"><span class="ml-2">Последние 15 минут</span>
        </div><div class="radio-elem flex flex-row justify-items-center">
          <input type="radio" name="1" id="1"><span class="ml-2">Последние 30 минут</span>
        </div><div class="radio-elem flex flex-row justify-items-center">
          <input type="radio" name="1" id="1"><span class="ml-2">Последний час</span>
        </div><div class="radio-elem flex flex-row justify-items-center">
          <input type="radio" name="1" id="1"><span class="ml-2">Последние 12 часов</span>
        </div><div class="radio-elem flex flex-row justify-items-center">
          <input type="radio" name="1" id="1"><span class="ml-2">Последние 24 часа</span>
        </div><div class="radio-elem flex flex-row justify-items-center">
          <input type="radio" name="1" id="1"><span class="ml-2">Последние 7 дней</span>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>

</style>