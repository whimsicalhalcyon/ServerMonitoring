<script>

import UiSelect from "@/components/UiSelect.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import MistakeCheckbox from "@/components/Mistakes/MistakeCheckbox.vue";
import UiCheckboxInteraction from "@/components/UiCheckboxInteraction.vue";
import TableMistakes from "@/components/Mistakes/TableMistakes.vue";

export default {
  components: {
    UiSelect, MainButton, UiInput, MistakeCheckbox, TableMistakes, UiCheckboxInteraction,
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
  },

}
</script>

<template>
  <div class="main">
    <div class="main-top" :style="themeStatus ? {background: themeLight.background}: {background: themeDark.background}">
      <div class="text">
        <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Ошибки</p>
        <div class="themes" v-on:click="$emit('changeTheme', !themeStatus)">
          <i class="fa-solid fa-sun" :class="themeStatus ? 'fa-moon': 'fa-sun'"
             :style="themeStatus ? {color: themeDark.backgroundComponent}: {color: themeLight.backgroundComponent}"></i>
        </div>
      </div>
      <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
        <div class="top">
          <ui-input :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
          <main-button :themeStatus="themeStatus" :themeLight="themeLight"
                       :themeDark="themeDark" style="width: 4%;"><i class="fa-solid fa-file-excel"></i></main-button>
        </div>
        <div class="line"
             :style="themeStatus?{borderColor:themeLight.borderColor}:{borderColor:themeDark.borderColor}"></div>
        <div class="left-checkbox">
          <div class="bottom">
            <ui-select class="select" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
              <option disabled selected>Выбрать интервал</option>
              <option>5 минут</option>
              <option>10 минут</option>
              <option>15 минут</option>
            </ui-select>
            <ui-select class="select" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
              <option disabled>Состояние</option>
              <option>Любое</option>
              <option>Ошибка</option>
              <option>Решено</option>
            </ui-select>
            <ui-input class="date" placeholder="дд.мм.гггг 00:00"  :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
            </ui-input>
            <ui-input class="date" placeholder="дд.мм.гггг 00:00" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
            <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Найти</main-button>
            <main-button class="btn btn-close" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Сбросить</main-button>

          </div>

          <div class="textLeft">
            <p style="margin-bottom: 10px"
               :style="themeStatus?{color:themeLight.textCheckbox}:{color:themeDark.textCheckbox}">Тип
              ошибки:</p>
          </div>
          <ui-checkbox-interaction class="check" :themeStatus="themeStatus"
                                   :themeLight="themeLight" :themeDark="themeDark"></ui-checkbox-interaction>
        </div>
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

.main .main-top {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-bottom: 1.1%;
}
.themes {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: auto;
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
}
.main .panel .top {
  display: flex;
  gap: 1.1%
}
.main .panel .bottom {
  display: flex;
  gap: 1.1%
}

.line {
  border-bottom: 1px solid;
}

.check {
  gap: 2%;
}

.textLeft {
  margin-top: 1%;
}

.main .panel .bottom .date {
  width: 14.95%;
}
.main .panel .bottom .btn {
  width: 10%;
}

.download {
  width: 2%;
}

.mistakes {
  font-size: 32px;
}

.select-data, .btn-data {
  width: 10%;
}

.btn-close {
  background: #757575 !important;
}

.main .main-top .text {
  display: flex;
  gap: 8px;
  padding-top: 20px;
  align-items: center;

}
.main .main-top .text p {
  font-size: 28px;
}


</style>