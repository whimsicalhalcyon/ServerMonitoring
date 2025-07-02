<script>
import UiSelect from "@/components/UiSelect.vue";
import InputRange from "@/components/ServerCharts/Components/InputRange.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import Graphic from "@/components/ServerCharts/Components/Graphic.vue";

export default {
  components: { Graphic, MainButton, UiInput, UiSelect, InputRange },
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    themeStatus: {
      type: Boolean,
      default: true
    },
    themeLight: {
      type: Object,
      required: true
    },
    themeDark: {
      type: Object,
      required: true
    },
  },
  methods: {
    hideWindow() {
      this.$emit("update:openDialog", false);
    }
  }
};
</script>

<template>
  <div
      v-if="openDialog"
      class="modal-overlay"
      @click.stop="hideWindow"
  >
    <div class="modal-content" @click.stop>
      <h2 class="modal-title">Редактировать виджет</h2>
      <div class="container-info">
        <div class="container-date">
          <div class="container-select">
            <span>Имя графика</span>
            <ui-select :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="select-element"></ui-select>
            <span>Интервал обновления</span>
            <ui-select :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="select-element"></ui-select>
          </div>
          <div class="select-param">
            <span>Набор данных</span>
            <ui-select :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="select-element"></ui-select>
            <span>Шаблон данных</span>
            <ui-select :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="select-element"></ui-select>
          </div>
        </div>
        <div class="graphic">
          <div class="graphic-header">
            <p class="server-name">Имя сервера</p>
            <button
                class="settings-button"
                @click="toggleWindow"
                aria-label="Открыть настройки графика"
            ></button>
          </div>
          <graphic :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="graphic-body"></graphic>
        </div>
      </div>

      <div class="container-range">
        <div class="container-range-param">
          <span class="param-name">Ширина</span>
          <input-range class="range-input"></input-range>
          <span class="param-name">Размер точек</span>
          <input-range class="range-input"></input-range>
        </div>
        <div class="container-range-param">
          <span class="param-name">Прозрачность</span>
          <input-range class="range-input"></input-range>
          <span class="param-name">Заполнение</span>
          <input-range class="range-input"></input-range>
        </div>
        <div class="container-range-param">
          <span>Цвет</span>
          <div class="colors">
            <input type="color" class="color-picker">
          </div>
        </div>
      </div>

      <div class="container-button">
        <main-button :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="button-add">Добавить набор данных</main-button>
        <div class="save-close">
          <main-button :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="button-cancel" @click="hideWindow">Отмена</main-button>
          <main-button :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="save-btn">Сохранить</main-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  width: 1200px;
  padding: 24px;
  height: auto;
  color: #737373;
}

.modal-title {
  font-size: 24px;
  color: #262626;
  margin-bottom: 20px;
}

.container-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.container-date {
  width: 40%;
  font-size: 18px;
}

.container-select {
  display: flex;
  flex-direction: column;
  height: auto;
}

.select-element {
  margin-bottom: 20px;
  width: 100%;
}

.select-element {
  margin-top: 3%;
}

.graphic {
  background-color: #f5f5f5;
  height: 425px;
}

.save-close {
  display: flex;
  width: 30%;
}

.param-name {
  margin-bottom: 1%;
}

.select-param {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-top: 8px;
  padding: 15px;
}

.graphic {
  display: flex;
  flex-direction: column;
  width: 730px;
  padding: 15px;
  background-color: #fafafa;
  border-radius: 8px;
  margin-left: 1%;
}

.graphic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding: 0 8px;
}

.server-name {
  color: #212121;
  font-size: 20px;
}

.settings-button {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.container-range {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 12px;
  margin-top: 20px;
  padding: 20px;
  font-size: 18px;
}

.container-range-param {
  width: 30%;
  display: flex;
  flex-direction: column;
}

.range-input {
  margin-bottom: 20px;
}

.save-btn {
  width: 100%;
}

.colors {
  display: flex;
  flex-direction: row;
}

.color-picker {
  width: 100%;
  height: 100px;
}

.container-button {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-add {
  background-color: white !important;
  color: #38bdf8 !important;
  border: 1px solid #38bdf8 !important;
  width: 15%;
}

.button-add:hover {
  background-color: #38bdf8 !important;
  color: white !important;
}

.button-cancel {
  margin-right: 20px !important;
  background-color: #525252 !important;
  width: 100%;
}

.button-cancel:hover {
  background-color: #262626 !important;
}
</style>