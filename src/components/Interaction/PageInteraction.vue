<script>
import Table from '@/components/Table.vue';
import UiSelect from "@/components/UiSelect.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import UiCheckboxInteraction from "@/components/UiCheckboxInteraction.vue";
import ModalWindowMain from '@/components/Interaction/ModalWindowMain.vue';

export default {
  components: {
    UiCheckboxInteraction,
    Table, UiSelect, UiInput, MainButton, UiCheckbox: UiCheckboxInteraction, ModalWindowMain
  },
  emits: ['changeTheme'],
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
      modalWindow: false,
      blocks: [
        { name: 'app', servers: ['nn-lsed-app01.nnov.ru', 'nn-lsed-app02.nnov.ru', 'nn-lsed-app03.nnov.ru'], isExpanded: false },
        { name: 'backup', servers: [], isExpanded: false },
        { name: 'bl', servers: [], isExpanded: false },
        { name: 'convert', servers: [], isExpanded: false },
        { name: 'custom', servers: [], isExpanded: false },
      ],
    };
  },
  methods: {
    togglePanel() {
      this.openPanel = !this.openPanel;
    },
    toggleWindow() {
      this.modalWindow = !this.modalWindow;
    },
    confirmDelete() {
      let confirmed = window.confirm(`Вы точно хотите удалить ${this.isSelected.dns}?`);
      if (confirmed) {
        alert(`Сервер ${this.isSelected.dns} безвозвратно удален!`);
      } else {
        alert(`Сервер ${this.isSelected.dns} не был удален`);
      }
    },
    addBlock(newBlockName) {
      this.blocks.push({ name: newBlockName, servers: [], isExpanded: false });
    },
    addServer(newServer) {
      const block = this.blocks.find(b => b.name === newServer.group);
      if (block) {
        block.servers.push(newServer.dns);
      } else {
        this.blocks.push({ name: newServer.group, servers: [newServer.dns], isExpanded: false });
      }
    },
  },
};
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
            <main-button @click="toggleWindow" class="btn" :themeStatus="themeStatus" :themeLight="themeLight"
                         :themeDark="themeDark">Добавить
              узел
            </main-button>
            <main-button :themeStatus="themeStatus" :themeLight="themeLight"
                         :themeDark="themeDark" style="width: 5%;"><i class="fa-solid fa-file-excel"></i></main-button>
          </div>
          <div class="top-right"
               :style="themeStatus ? {borderColor: themeLight.borderColor}: {borderColor: themeDark.borderColor}"
               v-if="isSelected">
            <div class="intoVisible">
              <p :style="themeStatus?{color:themeLight.textColor}:{color:themeDark.textColor}"
                 style="padding-left: 14px;">{{isSelected.dns}}</p>
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
          <div class="left-checkbox">
            <div class="textLeft">
              <p style="margin-bottom: 10px"
                 :style="themeStatus?{color:themeLight.textCheckbox}:{color:themeDark.textCheckbox}">Тип
                ошибки:</p>
            </div>
            <ui-checkbox-interaction class="check" :themeStatus="themeStatus"
                                     :themeLight="themeLight" :themeDark="themeDark"></ui-checkbox-interaction>
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
            <option>APP2006</option>
            <option>IvanZolo2004</option>
          </ui-select>


          <main-button class="btn" :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark">Найти
          </main-button>
          <main-button  :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark" class="drop">Сбросить
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
  <modal-window-main
      v-model:openDialog="modalWindow"
      :themeStatus="themeStatus"
      :themeLight="themeLight"
      :themeDark="themeDark"
      @addBlock="addBlock"
      @addServer="addServer"
  />
</template>

<style scoped>
.main {
  width: 100%;
}

.textLeft {
  width: 53.85%;
}
.left-checkbox {
  display: flex;
  flex-direction: column;
  width: 53.85%;
}
.check {
  gap: 2%;
}
.themes {
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
  width: 41.544%;
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

.bottom {
  display: flex;
  align-items: center;
  gap: 1%
}

.bottom select {
  width: 16%;
}



.drop {
  background: #757575 !important;
}


.bottom button {
  width: 10%;
}
</style>