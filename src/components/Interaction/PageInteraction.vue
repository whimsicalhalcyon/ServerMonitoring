<script>
import Table from '@/components/Table.vue';
import UiSelect from "@/components/UiSelect.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import UiCheckboxInteraction from "@/components/UiCheckboxInteraction.vue";
import ModalWindowMain from '@/components/Interaction/ModalWindowMain.vue';
import ModalWindow from "@/components/Interaction/ModalWindow.vue";

export default {
  components: {
    ModalWindow,
    Table, UiSelect, UiInput, MainButton, UiCheckboxInteraction, ModalWindowMain
  },
  emits: ['changeTheme', 'addBlock', 'addServer', 'deleteBlock', 'deleteServer', 'editServer'],
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
    servers: {
      type: Array,
    },
    groups: {
      type: Array,
    },
    isDataLoaded: {
      type: Boolean,
      default: false
    },
    errorBlocks: {
      type: Array,
    },
    serverParameterData: {
      type: Array,
    },
  },
  data() {
    return {
      openPanel: true,
      isSelected: null,
      modalWindow: false,
      modalEditWindow: false,
      selectGroupPanel: {
        status: '',
        group: ''
      },
      searchValue: '',
      filteredServersData: [],
      selectedErrors: []
    };
  },
  computed: {},
  methods: {
    filteredServers() {
      let filtered = [...this.errorBlocks];

      if (this.selectGroupPanel.group && this.selectGroupPanel.group !== 'Все') {
        filtered = filtered.filter(server =>
            server.block?.name === this.selectGroupPanel.group
        );
      }

      if (this.selectGroupPanel.status && this.selectGroupPanel.status !== 'Все') {
        filtered = filtered.filter(server =>
            server.state.toString() === (this.selectGroupPanel.status === 'Активировано' ? 'true' : 'false')
        );
      }

      if (this.selectedErrors.length > 0) {
        filtered = filtered.filter(server => {
          const hasMatchingErrors = (errors) => {
            return Array.isArray(errors) && errors.some(error =>
                error.serverId === server.id &&
                Number.isInteger(error.importance) &&
                this.selectedErrors.includes(error.importance)
            );
          };
          return hasMatchingErrors(server.errors) ||
              (server.block && Array.isArray(server.block.servers) &&
                  server.block.servers.some(s => s && hasMatchingErrors(s.errors)));
        });
      }

      if (this.searchValue.trim() !== '') {
        const searchLower = this.searchValue.toLowerCase();
        filtered = filtered.filter(server =>
            (server.hostName?.toLowerCase().includes(searchLower) ||
                server.ipAddres?.toLowerCase().includes(searchLower))
        );
      }

      this.filteredServersData = filtered;
    },
    resetFilters() {
      this.selectGroupPanel.status = '';
      this.selectGroupPanel.group = '';
      this.searchValue = '';
      this.filteredServersData = [...this.errorBlocks];
      this.selectedErrors = [];
    },
    toggleWindow() {
      if (!this.isDataLoaded) {
        alert('Данные ещё загружаются, пожалуйста, подождите');
        return;
      }
      this.modalWindow = !this.modalWindow;
    },
    confirmDelete() {
      const serverName = this.isSelected?.hostName;
      const serverId = this.isSelected?.id;

      if (!serverId) return;

      const confirmed = window.confirm(`Вы точно хотите удалить ${serverName}?`);
      if (confirmed) {
        this.$emit('deleteServer', serverId); // <--- Передаем id сервера наверх
        this.isSelected = null;
      }
    },
    openEditModal() {
      console.log('Opening edit modal with isSelected:', this.isSelected);
      if (!this.isDataLoaded) {
        alert('Данные ещё загружаются, пожалуйста, подождите');
        return;
      }
      if (!this.isSelected) {
        alert('Выберите сервер для редактирования');
        return;
      }
      this.modalEditWindow = !this.modalEditWindow;
    },
    addBlock(newBlockName) {
      this.$emit('addBlock', newBlockName);
    },
    deleteBlock(groupId) {
      this.$emit('deleteBlock', groupId);
    },
    addServer(newServer) {
      this.$emit('addServer', newServer);
    },
    editServer(editObj) {
      this.$emit('editServer', editObj);
    }
  },
  watch: {
    servers(newVal) {
      this.filteredServersData = [...newVal];
    },
    errorBlocks(newVal) {
      this.filteredServersData = [...newVal];
    },
    serverParameterData(newVal) {
      console.log('Передаём в ModalWindowMain:', newVal);
    }
  },
};
</script>

<template>
  <div class="main">
    <div class="fix" :style="themeStatus ? {background: themeLight.background}: {background: themeDark.background}">
      <div class="text">
        <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Узлы сети</p>
        <div class="themes" @click="$emit('changeTheme', !themeStatus)">
          <i class="fa-solid fa-sun"
             :class="themeStatus ? 'fa-moon': 'fa-sun'"
             :style="themeStatus ? {color: themeDark.backgroundComponent}: {color: themeLight.backgroundComponent}"></i>
        </div>
      </div>

      <div class="panel" v-if="openPanel"
           :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
        <div class="top">
          <div class="top-left">
            <ui-input class="input-search" v-model:model-value-interaction="searchValue" placeholder="Поиск по DNS и IP"
                      :themeStatus="themeStatus"
                      :themeLight="themeLight" :themeDark="themeDark"></ui-input>
            <main-button @click="toggleWindow" class="btn" :themeStatus="themeStatus" :themeLight="themeLight"
                         :themeDark="themeDark">Добавить узел
            </main-button>
            <main-button :themeStatus="themeStatus" :themeLight="themeLight"
                         :themeDark="themeDark" style="width: 5%;"><i class="fa-solid fa-file-excel"></i></main-button>
          </div>
          <div class="top-right"
               :style="themeStatus ? {borderColor: themeLight.borderColor}: {borderColor: themeDark.borderColor}"
               v-if="isSelected">
            <div class="intoVisible">
              <p :style="themeStatus ? {color: themeLight.textColor} : {color: themeDark.textColor}"
                 style="padding-left: 14px;">{{ isSelected.hostName }}</p>
              <div class="buttons">
                <button class="btnVisible" style="background: #4FC3F7" @click="openEditModal"><i
                    class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btnVisible" style="margin-right: 10px; background: #F44336" @click="confirmDelete">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="line"
             :style="themeStatus ? {borderColor: themeLight.borderColor} : {borderColor: themeDark.borderColor}"></div>

        <!-- Верхняя часть: select + кнопки -->
        <div class="bottom-top">
          <ui-select class="select" v-model:selectGroupPanel="selectGroupPanel.status" :themeStatus="themeStatus"
                     :themeLight="themeLight" :themeDark="themeDark">
            <option disabled value="">Выбрать состояние</option>
            <option value="Все">Все</option>
            <option>Активировано</option>
            <option>Деактивировано</option>
          </ui-select>
          <ui-select class="select" v-model:selectGroupPanel="selectGroupPanel.group" :themeStatus="themeStatus"
                     :themeLight="themeLight" :themeDark="themeDark">
            <option disabled value="">Выбрать группу</option>
            <option value="Все">Все</option>
            <option v-for="group in groups" :key="group.id" :value="group.name">
              {{ group.name }}
            </option>
          </ui-select>
          <main-button class="btn" @click="filteredServers" :themeStatus="themeStatus" :themeLight="themeLight"
                       :themeDark="themeDark">Найти
          </main-button>
          <main-button class="btn drop" @click="resetFilters" :themeStatus="themeStatus" :themeLight="themeLight"
                       :themeDark="themeDark">
            Сбросить
          </main-button>
        </div>

        <!-- Нижняя часть: чекбокс -->
        <div class="bottom-checkbox">
          <div class="textLeft">
            <p style="margin-bottom: 10px;"
               :style="themeStatus ? {color: themeLight.textCheckbox} : {color: themeDark.textCheckbox}">
              Тип ошибки:
            </p>
          </div>
          <ui-checkbox-interaction class="check" v-model="selectedErrors" :themeStatus="themeStatus"
                                   :themeLight="themeLight"
                                   :themeDark="themeDark"></ui-checkbox-interaction>
        </div>
      </div>
    </div>

    <div class="table">
      <Table
          :errorBlocks="filteredServersData"
          :theme-light="themeLight"
          :theme-dark="themeDark"
          :theme-status="themeStatus"
          v-model:modelValue="isSelected"
      />
    </div>

    <modal-window-main
        :serverParameterData="serverParameterData"
        :groups="groups"
        v-model:openDialog="modalWindow"
        :themeStatus="themeStatus"
        :themeLight="themeLight"
        :themeDark="themeDark"
        @addBlock="addBlock"
        @addServer="addServer"
        @deleteBlock="deleteBlock"
    />
    <modal-window :themeStatus="themeStatus"
                  :themeLight="themeLight"
                  :themeDark="themeDark"
                  :groups="groups"
                  v-model:openDialog="modalEditWindow"
                  is-edit-server
                  :server="isSelected"
                  @editServer="editServer"
    ></modal-window>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
}

.themes {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: auto;
}

.fix {
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-bottom: 20px;
}

.panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  gap: 14px;
  margin-top: 20px;
}

.text {
  display: flex;
  gap: 8px;
  padding-top: 20px;
  align-items: center;
}

.text p {
  font-size: 28px;
}

.text i {
  margin-top: 4px;
  font-size: 18px;
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

.input-search {
  width: 41.544%;
}

.top-right {
  border: 1px solid;
  width: 24.20%;
  border-radius: 8px;
  height: 40px;
}

.intoVisible {
  display: flex;
  justify-content: space-between;
  padding-top: 7px;
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

.bottom-top {
  display: flex;
  gap: 1.1%;
  align-items: center;
}

.bottom-top .select {
  width: 21.9%;
}

.bottom-top .btn {
  width: 10%;
}

.drop {
  background: #757575 !important;
}

.bottom-checkbox {
  display: flex;
  flex-direction: column;
}

.textLeft {
  width: 53.85%;
}

.check {
  gap: 1.1%;
}
</style>