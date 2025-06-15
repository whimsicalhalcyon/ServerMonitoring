<script>
import Table from '@/components/Table.vue';
import UiSelect from "@/components/UiSelect.vue";
import uiInput from "@/components/UiInput.vue";
import mainButton from "@/components/MainButton.vue";
import UiCheckbox from "@/components/UiCheckbox.vue";

export default {
  components: {
    Table, UiSelect, uiInput, mainButton, UiCheckbox
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
    },
  },
  data() {
    return {
      openPanel: true,
      isSelected: null,
    }
  },
  methods: {
    togglePanel() {
      this.openPanel = !this.openPanel
    },
    confirmDelete() {
      let confirmed = window.confirm("Вы точно хотите удалить?");
      if (confirmed) {
        alert('удалилось');
      } else {
        alert('отмена');
      }
    }
  }
}
</script>

<template>
  <div class="main">
    <div class="fix" :style="themeStatus ? {background: themeLight.background}: {background: themeDark.background}">
      <div class="text">
        <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Узлы сети</p>
        <div class="">
          <i class="fa-solid fa-chevron-up " style="cursor: pointer;"
             :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="openPanel ? 'fa-chevron-down' : 'fa-chevron-up'" @click="togglePanel"></i>
        </div>
        <div class="themes" v-on:click="$emit('changeTheme', !themeStatus)">
          <i class="fa-solid fa-sun" :class="themeStatus ? 'fa-moon': 'fa-sun'"
             :style="themeStatus ? {color: themeDark.backgroundComponent}: {color: themeLight.backgroundComponent}"></i>
        </div>
      </div>
      <div class="panel" v-if="openPanel"
           :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
        <div class="top">
          <div class="top-left">
            <ui-input class="input-search" placeholder="Поиск по DNS и IP" :themeStatus="themeStatus"
                      :themeLight="themeLight" :themeDark="themeDark"></ui-input>
            <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Добавить
              узел
            </main-button>
          </div>
          <div class="top-right"
               :style="themeStatus ? {borderColor: themeLight.borderColor}: {borderColor: themeDark.borderColor}"
               v-if="isSelected">
            <div class="intoVisible">
              <p :style="themeStatus?{color:themeLight.textColor}:{color:themeDark.textColor}"
                 style="padding-left: 14px;">Выбранный сервер:</p>
              <div class="buttons">
                <button class="btnVisible" style="background: #4FC3F7"><i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btnVisible" style="margin-right: 10px; background: #F44336" @click="confirmDelete"><i
                    class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
        <div class="line"
             :style="themeStatus?{borderColor:themeLight.borderColor}:{borderColor:themeDark.borderColor}"></div>
        <div class="bottom">
          <div class="one">
            <p style="margin-bottom: 10px"
               :style="themeStatus?{color:themeLight.textCheckbox}:{color:themeDark.textCheckbox}">Тип
              ошибки:</p>
            <ui-checkbox :themeStatus="themeStatus"
                         :themeLight="themeLight" :themeDark="themeDark"></ui-checkbox>
          </div>
          <ui-select class="first-select" :themeStatus="themeStatus"
                     :themeLight="themeLight" :themeDark="themeDark">
            <option disabled selected>Выбрать состояние</option>
            <option>Все</option>
            <option>Активировано</option>
            <option>Деактивировано</option>
          </ui-select>
          <ui-select class="second-select" :themeStatus="themeStatus"
                     :themeLight="themeLight" :themeDark="themeDark">
            <option disabled selected>Выбрать группу</option>
            <option>Все</option>
            <option>APP</option>
            <option>Еще какаят</option>
            <option>И еще например</option>
          </ui-select>
          <main-button class="drop" :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark">Сбросить
          </main-button>
          <main-button :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark">Сохранить
          </main-button>
        </div>
      </div>
    </div>
    <div class="table">
      <Table
          :theme-light="themeLight"
          :theme-dark="themeDark"
          :theme-status="themeStatus"
          :is-selected="isSelected"
          @update:isSelected="isSelected=$event"
      />
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
}
.themes{
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: auto;
}
.main .fix {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-bottom: 20px;
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

.top .top-left .input-search {
  width: 18.87%;
}

.btn {
  width: 11.80%;
}

.top {
  display: flex;
  justify-content: space-between;
}

.top-left {
  display: flex;
  gap: 1.18%;
  width: 74.62%;
}

.intoVisible {
  display: flex;
  justify-content: space-between;
  padding-top: 7px;
}

.top-right {
  border: 1px solid;
  width: 24.20%;
  border-radius: 8px;
  height: 40px;
}

.buttons {
  display: flex;
  gap: 10px;
}

.btnVisible {
  width: 25px;
  height: 25px;
  border-radius: 2px;
  color: white;
  cursor: pointer;
}

.line {
  border-bottom: 1px solid;
}


.drop {
  background: #757575 !important;
}

.main .text {
  display: flex;
  gap: 8px;
  padding-top: 20px;
  align-items: center;
}

.main .text p {
  font-size: 28px;
}

.main .text i {
  margin-top: 4px;
  font-size: 18px;
}

.bottom {
  display: flex;
  align-items: center;

}

.bottom select {
  width: 16%;
}

.bottom button {
  width: 13.5%;
}

.drop {
  margin-right: 1%;
}

.second-select {
  margin-right: 2%;
  margin-left: 1%;
}

.one {
  margin-right: 2%;
  width: 50%;
}
</style>