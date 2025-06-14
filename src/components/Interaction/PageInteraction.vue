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
  // data() {
  //   return {
  //     panelVisible: true
  //   }
  // }
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
          <ui-checkbox :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark"></ui-checkbox>
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
</style>