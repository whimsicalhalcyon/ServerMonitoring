<script>
import UiRadio from "./UiRadio.vue";
import UiSelect from "./UiSelect.vue";
import Table from "./Table.vue";
import MainButton from "./MainButton.vue";
import DisabledButton from "./DisabledButton.vue";

export default {
  components: {
    UiRadio, UiSelect, Table, MainButton, DisabledButton
  },
  data() {
    return {}
  }
}
</script>

<template>
  <div class="container-full m-5 mt-5 w-full flex flex-col items-center">
    <div class="fix flex flex-col sticky top-0 z-30 w-[1780px] bg-[#f5f5f5] rounded-b-xl pb-5">
      <div class="container-title flex items-center">
        <h1 class="text-4xl text-green-70 mb-5 mt-5">Ошибки</h1>
      </div>

      <!-- Панель фильтрации -->
      <section class="section-menu w-[1780px] bg-white rounded-xl px-5 py-5 text-neutral-500">
        <div class="flex items-center justify-between">
          <!-- Важность -->
          <div class="flex flex-col">
            <label class="text-xl text-neutral-800">Важность:</label>
            <ui-select />
          </div>

          <!-- Состояние -->
          <div class="flex flex-col">
            <label class="text-xl text-neutral-800">Состояние:</label>
            <ui-select />
          </div>

          <!-- Время -->
          <div class="flex items-center gap-4">
            <label class="text-xl text-neutral-800 min-w-[70px]">Время:</label>
            <ui-radio />
          </div>

          <!-- Кнопки -->
          <div class="flex">
            <disabled-button class="bg-neutral-400">Сбросить</disabled-button>
            <main-button class="ml-3">Применить</main-button>
          </div>
        </div>
      </section>
    </div>

    <!-- Таблица -->
    <section class="table-section w-[1780px]">
      <Table />
    </section>
  </div>
</template>


<style scoped>
</style>