<script>

import UiSelect from "@/components/UiSelect.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import UiCheckbox from "@/components/UiCheckbox.vue";

export default {
  components: {
    UiSelect, MainButton, UiInput, UiCheckbox
  },
  props: {
    themeLight: {
      type: Object,
      required: true
    },
    themeDark: {
      type: Object,
      required: true
    },
    themeStatus: {
      type: Boolean,
      default: true
    }
  },

}
</script>

<template>
  <div class="main">
    <div class="text">
      <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Ошибки</p>
    </div>
    <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
      <div class="top">
        <ui-input :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
      </div>
      <div class="bottom">
        <ui-input class="date" placeholder="дд.мм.гггг 00:00"  :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
        <ui-input class="date" placeholder="дд.мм.гггг 00:00" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
        <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Найти</main-button>
        <ui-select class="select" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" :style="themeStatus ? {borderColor: themeLight.borderColor, background: themeLight.clear}: {borderColor: themeDark.borderColor, background: themeLight.clear}">
          <option>Выбрать формат</option>
          <option>PDF</option>
          <option>PNG</option>
          <option>DOCX</option>
        </ui-select>
        <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Выгрузить</main-button>
      </div>
    </div>
  </div>

</template>


<style scoped>
.main .panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 12px;
  gap: 14px;
  margin-top: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.main .panel .top {
  display: flex;
  gap: 1.1%
}
.main .panel .bottom {
  display: flex;
  gap: 1.1%
}

.main .panel .bottom .date {
  width: 14.95%;
}
.main .panel .bottom .btn {
  width: 10%;
}
</style>