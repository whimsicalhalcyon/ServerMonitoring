<script>

import UIInput from "@/components/UIInput.vue";
import UiSelect from "@/components/UiSelect.vue";
import inputDate from "@/components/InputDate.vue";
import MainButton from "@/components/MainButton.vue";
import ModalWindow from "@/components/ServerCharts/Components/ModalWindow.vue";
import Graphic from "@/components/ServerCharts/Components/Graphic.vue";

export default {
  components: {
    Graphic,
    UIInput, UiSelect, inputDate, MainButton, ModalWindow
  },

  data() {
    return {
      openPanel: true,
      modalWindow: false,
    }
  },
  methods: {
    togglePanel() {
      this.openPanel = !this.openPanel
    },
    toggleWindow() {
      this.modalWindow = !this.modalWindow
    }
  }
}

</script>

<template>
  <div class="container w-425 m-5 mt-5 relative">
    <div class="container-title flex items-center mb-5">
      <h1 class="text-4xl text-green-70">Мониторинг</h1>
      <div class="container-scroll flex flex-end justify-end ml-5">
        <i class="fa-solid fa-chevron-up text-zinc-300 hover:text-zinc-500 cursor-pointer duration-300"
           :class="openPanel ? 'fa-chevron-down' : 'fa-chevron-up'" @click="togglePanel"></i>
      </div>
    </div>
    <section class="section-menu w-[1780px] h-[140px] bg-white rounded-xl px-5 py-5 text-neutral-500 relative" v-if="openPanel">
      <div class="container-menu flex flex-row mb-4">
        <u-i-input class="w-135 mr-5"></u-i-input>
        <ui-select class="w-90 mr-5"></ui-select>
        <ui-select class="w-90"></ui-select>
      </div>
      <div class="container-parametres flex flex-row">
        <div class="container-date flex flex-row justify-between">
          <input-date class="mr-2 w-60"></input-date>
          <input-date class="mr-2 w-60"></input-date>
          <main-button class="w-50">Найти</main-button>
        </div>
        <div class="container-radio-param w-[400px] ml-5">
          <div class="flex">
            <div class="w-1/2 px-1 ">
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="5min" class="mr-1">
                <span>Последние 5 минут</span>
              </label>
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="15min" class="mr-1">
                <span>Последние 15 минут</span>
              </label>
            </div>
            <div class="w-1/2 px-1 mb-4">
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="30min" class="mr-1">
                <span>Последние 30 минут</span>
              </label>
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="1h" class="mr-1">
                <span>Последний 1 час</span>
              </label>
            </div>
            <div class="w-1/2 px-1 mb-4">
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="12h" class="mr-1">
                <span>Последние 12 часов</span>
              </label>
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="24h" class="mr-1">
                <span>Последние 24 часа</span>
              </label>
            </div>
            <div class="w-1/2 px-1 mb-4">
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="7d" class="mr-1">
                <span>Последние 7 дней</span>
              </label>
              <label class="flex items-center w-[170px]">
                <input type="radio" name="timeRange" value="none" class="mr-1">
                <span>Без фильтрации</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute top-5 right-5 flex items-center gap-2 z-10">
        <ui-select></ui-select>
        <main-button>Выгрузить</main-button>
      </div>
    </section>
    <div class="all-graphics w-[1780px] flex flex-wrap gap-[20px] mt-[20px]">
      <div
          v-for="n in 70"
          :key="n"
          class="graphic flex flex-col w-[425px] h-g p-[15px] bg-[#FAFAFA] rounded-xl"
      >
        <div class="flex justify-between items-center mb-3 px-2">
          <span class="color-[#212121] text-xl">Имя сервера</span>
          <button
              class="settings-button cursor-pointer"
              @click="toggleWindow"
              aria-label="Открыть настройки графика"
              style="background: transparent; border: none; padding: 0;"
          >
            <img src='./svg/setting-svgrepo-com.svg' alt="Настройки" width="24" height="24" />
          </button>
        </div>
        <graphic class="flex-grow"></graphic>
      </div>
    </div>

    <modal-window v-model:openDialog="modalWindow"></modal-window>
  </div>
</template>

<style scoped>

</style>