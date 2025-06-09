<script>
import UiSelect from './UiSelect.vue';
import UiInput from './UiInput.vue';
import MainButton from './MainButton.vue';
import UiCheckbox from './UiCheckbox.vue';
import DisabledButton from "./DisabledButton.vue";
import Table from './Table.vue';

export default {
  components: {
    UiSelect, UiInput, MainButton, UiCheckbox, DisabledButton, Table,
  },
  data() {
    return {
    }
  },
}
</script>

<template>
  <div class="container w-425 m-5 mt-5 relative">
    <div class="container-title flex items-center">
      <h1 class="text-4xl text-green-70">Узлы сети</h1>
    </div>
    <div class="fix flex items-center sticky top-0 z-30 w-[1780px] bg-[#f5f5f5] rounded-xl px-5 py-5">
      <section class="section-menu sticky top-0 z-30 w-[1780px] h-[190px] bg-white rounded-xl px-5 py-5 text-neutral-500">
        <div class="up">
          <div class="left">
            <ui-input class="w-[350px] max-w-full mr-[20px]"></ui-input>
            <main-button class="mr-[20px]" @click="$emit('open-modal')">Добавить узел</main-button>
            <main-button class="w-[40px]"><i class="fa-solid fa-file-excel"></i></main-button>
          </div>
          <div class="right-visible">
            <div class="edit-del border rounded-lg border-neutral-400 px-3 py-1 h-10 w-[410px]">
              <p>Выбранный узел:</p>
              <div class="button-edit-del">
                <button class="svg cursor-pointer bg-sky-400 hover:bg-sky-700 duration-300"><i
                    class="fa-solid fa-pen-to-square"></i></button>
                <button class="svg cursor-pointer ml-3 bg-red-500 hover:bg-red-800 duration-300"><i
                    class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="line h-px bg-neutral-400 w-full mb-5 mt-5">
        </div>
        <div class="down flex justify-between items-center">
          <div class="block">
            <p class="text-xl text-neutral-800">Тип ошибки:</p>
            <div class="checkboxes flex gap-3">
              <ui-checkbox></ui-checkbox>
              <ui-checkbox></ui-checkbox>
              <ui-checkbox></ui-checkbox>
              <ui-checkbox></ui-checkbox>
              <ui-checkbox></ui-checkbox>
              <ui-checkbox></ui-checkbox>
            </div>
          </div>
          <div class="block">
            <p class="text-xl text-neutral-800">Состояние:</p>
            <ui-select></ui-select>
          </div>
          <div class="block">
            <p class="text-xl text-neutral-800">Группа:</p>
            <ui-select></ui-select>
          </div>
          <div class="block">
            <div class="button-filter">
              <disabled-button class="bg-neutral-400">Сбросить</disabled-button>
              <main-button class="ml-3">Применить</main-button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="table-section w-[1780px]">
      <Table/>
    </section>
  </div>
</template>

<style scoped>
.up {
  display: flex;
  justify-content: space-between;
}

.edit-del {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.svg {
  width: 30px;
  height: 30px;
  border-radius: 2px;
  padding: 4px;
  text-align: center;
  color: white;
}
</style>