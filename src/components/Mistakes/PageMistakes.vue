<script>

import UiSelect from "@/components/UiSelect.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import MistakeCheckbox from "@/components/Mistakes/MistakeCheckbox.vue";
import UiCheckboxInteraction from "@/components/UiCheckboxInteraction.vue";
import TableMistakes from "@/components/Mistakes/TableMistakes.vue";

export default {
  components: {
    UiSelect, MainButton, UiInput, MistakeCheckbox, TableMistakes, UiCheckbox: UiCheckboxInteraction,
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
  data() {
    return {
      openPanel: true
    }
  }

}
</script>

<template>
  <div class="main">
    <div class="text">
      <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}" class="mistakes">Ошибки</p>
    </div>
    <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
      <div class="top">
        <ui-input :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
        <ui-select class="select" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          <option disabled>Сортировать по</option>
          <option>По названию</option>
          <option>По времени</option>
          <option>По узлу сети</option>
          <option>По длительности</option>
          <option>По важности</option>
        </ui-select>
        <ui-select class="select" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          <option disabled>Состояние</option>
          <option>Любое</option>
          <option>Ошибка</option>
          <option>Решено</option>
        </ui-select>
        <ui-select class="select select-data" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          <option>Выбрать формат</option>
          <option>PDF</option>
          <option>PNG</option>
          <option>DOCX</option>
        </ui-select>
        <main-button class="btn btn-data" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Выгрузить</main-button>
      </div>
      <div class="bottom">
        <ui-input class="date" placeholder="дд.мм.гггг 00:00"  :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
        </ui-input>
        <ui-input class="date" placeholder="дд.мм.гггг 00:00" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
        <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Найти</main-button>
      </div>
      <div class="bottom">
        <mistake-checkbox :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Критичная</mistake-checkbox>
        <mistake-checkbox :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Критичная</mistake-checkbox>
        <mistake-checkbox :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Критичная</mistake-checkbox>
        <mistake-checkbox :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Критичная</mistake-checkbox>
        <mistake-checkbox :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Критичная</mistake-checkbox>
      </div>
    </div>
    <div class="table-mistakes">
      <table-mistakes :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="table-mistakes"></table-mistakes>
    </div>
  </div>


</template>

<style scoped>

.main {
  width: 100%;
}
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

.mistakes {
  font-size: 32px;
}

.select-data, .btn-data {
  width: 10%;
}

.table-mistakes {
  margin-top: 20px;
}

</style>