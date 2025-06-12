<script>
import UiInput from './UiInput.vue';
import UiSelect from './UiSelect.vue';
import MainButton from './MainButton.vue';
import DisabledButton from "./DisabledButton.vue";

export default {
  components: {
    UiInput, MainButton, UiSelect, DisabledButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div v-if="visible" class="overlay">
    <div class="content-dialog flex flex-col gap-[20px]">
      <h1 class="text-2xl text-green-70 text-center">Добавление узла</h1>
      <div class="inputs flex flex-col gap-[20px]">
        <div class="flex flex-col">
          <label class="mb-[7px]" for="ip">IP-адрес:</label>
          <ui-input id="ip"></ui-input>
        </div>
        <div class="flex flex-col">
          <label class="mb-[7px]" for="dns">Доменное имя:</label>
          <ui-input id="dns"></ui-input>
        </div>
        <div class="flex flex-col">
          <label class="mb-[7px]" for="group">Группа:</label>
          <ui-select id="group"></ui-select>
        </div>
      </div>
      <div class="buttons mt-[10px] flex items-center justify-between">
        <main-button>Сохранить</main-button>
        <disabled-button @click="$emit('close')">Отмена</disabled-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5); /* затемнённый фон */

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10000; /* очень высокий z-index, чтобы перекрыть всё */
}

.content-dialog {
  background: white;
  border-radius: 12px;
  min-width: 470px;
  min-height: 430px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 10001;
}
</style>