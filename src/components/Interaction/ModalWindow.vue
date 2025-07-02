<script>
import UiInput from '@/components/UiInput.vue';
import UiSelect from '@/components/UiSelect.vue';
import MainButton from '@/components/MainButton.vue';
import SelectCheckbox from "@/components/ServerCharts/SelectCheckbox.vue";

export default {
  components: {UiInput, UiSelect, MainButton, SelectCheckbox},
  props: {
    openDialog: {type: Boolean, default: false},
    themeStatus: {type: Boolean, default: true},
    themeLight: {type: Object, required: true},
    themeDark: {type: Object, required: true},
    isAddBlock: {type: Boolean, default: false},
    isAddServer: {type: Boolean, default: false},
    groups: {
      type: Array,
      default: () => [],
    },
    server: {type: Object, default: null},
    isEditServer: {type: Boolean, default: false},
    showDeleteBtn: {
      type: Boolean,
      default: false,
    },
    showDeleteServer: {
      type: Boolean,
      default: false,
    },
    showAddBtn: {
      type: Boolean,
      default: false,
    },
    showCheckBox: {
      type: Boolean,
      default: false,
    },
    blocks: {
      type: Array
    }
  },
  emits: ['addBlock', 'addServer', 'update:openDialog', 'editServer'],
  data() {
    return {
      newGroupName: '',//добавление нового блока (группы)
      newServerIp: '',//добавление нового ip сервера
      newServerDns: '',//добавление нового доменного имени сервера
      selectedServerGroup: '',//выбранная группа сервера при добавлении
      selectedServers: [],
      // selectOPen:false,
      selectedoptionsArray:[],
      selectOptions:[
        {name:'Выберете парамтеры',servers:['Параметр 1','Параметр 2','Параметр 3'],isExpanded:false}
      ]
      // editServerIp: '',
      // editServerDns: '',
      // selectedServerGroupEdit: '',
    }
  },
  watch: {
    openDialog(newVal) {
      if (newVal && (this.isAddBlock || this.isAddServer || this.isEditServer)) {
        window.addEventListener('keydown', this.handleGlobalEnter);
      } else {
        window.removeEventListener('keydown', this.handleGlobalEnter);
      }

      // Очистка полей
      if (newVal && this.isEditServer && this.server) {
        this.initializeEditFields();
      } else if (newVal && (this.isAddBlock || this.isAddServer)) {
        this.newGroupName = '';
        this.newServerIp = '';
        this.newServerDns = '';
        this.selectedServerGroup = '';
      }
    },
    server: {
      handler(newServer) {
        if (this.isEditServer && this.openDialog && newServer) {
          this.initializeEditFields();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    thisGroups() {
      return [...this.groups].sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  methods: {
    handleGlobalEnter(event) {
      if (event.key === 'Enter') {
        this.searchElement();
      }
    },
    searchElement() {
      if (this.isAddServer) {
        this.selectedServerGroup = document.querySelector('#group').value; //выбранная группа добавление/редактирование
        this.newServerIp = document.querySelector('#ip').value;
        this.newServerDns = document.querySelector('#dns').value;
        this.addServer();
      } else if (this.isEditServer) {
        this.selectedServerGroup = document.querySelector('#group').value; //выбранная группа добавление/редактирование
        this.newServerIp = document.querySelector('#ip').value;
        this.newServerDns = document.querySelector('#dns').value;
        this.saveEditServer();
      } else if (this.isAddBlock) {
        this.newGroupName = document.querySelector('#newGroupAdd').value;
        this.addBlock();
      }
    },
    toggleExpand(index) {
      this.blocks[index].isExpanded = !this.blocks[index].isExpanded;
    },
    pushArrayParametres(server, isChecked) {
      if (isChecked) {
        if (!this.selectedServers.includes(server)) {
          this.selectedServers.push(server);
        }
      } else {
        this.selectedServers = this.selectedServers.filter(s => s !== server);
      }
    },
    initializeEditFields() {
      this.newServerIp = this.server.ipAddres || '';
      this.newServerDns = this.server.hostName || '';

      const group = this.groups.find(g => g.id === this.server.blockId);
      this.selectedServerGroup = group ? group.name : '';

      this.$nextTick(() => {
        const ipInput = document.querySelector('#ip');
        const dnsInput = document.querySelector('#dns');
        const groupSelect = document.querySelector('#group');

        if (ipInput) ipInput.value = this.newServerIp;
        if (dnsInput) dnsInput.value = this.newServerDns;
        if (groupSelect) groupSelect.value = this.selectedServerGroup;
      });
    },
    hideWindow() {
      this.$emit('update:openDialog', false);
      // Очистка модели
      this.newGroupName = '';
      this.newServerIp = '';
      this.newServerDns = '';
      this.selectedServerGroup = '';

      // Принудительно очищаем в DOM
      const groupSelect = document.querySelector('#group');
      const groupNameInput = document.querySelector('#newGroup');
      const serverIpInput = document.querySelector('#ip');
      const serverDnsInput = document.querySelector('#dns');


      if (groupSelect) groupSelect.value = '';
      if (groupNameInput) groupNameInput.value = '';
      if (serverIpInput) serverIpInput.value = '';
      if (serverDnsInput) serverDnsInput.value = '';

    },
    addBlock() {
      if (!this.newGroupName.trim()) {
        alert('Введите название группы');
        return;
      }
      this.$emit('addBlock', this.newGroupName.trim());
      this.hideWindow();
    },
    isValidIPv4(ip) {
      const parts = ip.split('.');
      if (parts.length !== 4) return false;

      for (const part of parts) {
        // Проверяем, что часть - число от 0 до 255 и не содержит ведущих нулей (кроме '0')
        if (!/^\d+$/.test(part)) return false; // Только цифры
        const num = Number(part);
        if (num < 0 || num > 255) return false;
        if (part.length > 1 && part.startsWith('0')) return false; // Запрет "01", "001" и т.п.
      }
      return true;
    },
    addServer() {
      if (!this.newServerIp || !this.isValidIPv4(this.newServerIp)) {
        alert('Введите корректный IPv4 адрес');
        return;
      }
      if (!this.newServerDns.trim()) {
        alert('Введите доменное имя сервера');
        return;
      }
      if (!this.selectedServerGroup) {
        alert('Выберите группу для сервера');
        return;
      }
      this.$emit('addServer', {
        ip: this.newServerIp,
        dns: this.newServerDns.trim(),
        group: this.selectedServerGroup,
      });
      this.hideWindow();
    },
    saveEditServer() {
      console.log('saveEditServer called with:', {
        ip: this.newServerIp,
        dns: this.newServerDns,
        group: this.selectedServerGroup,
        serverId: this.server?.id
      });
      console.log(this.newServerIp);
      if (!this.newServerIp || !this.isValidIPv4(this.newServerIp)) {
        alert('Введите корректный IPv4 адрес');
        return;
      }
      if (!this.newServerDns.trim()) {
        alert('Введите доменное имя сервера');
        return;
      }
      if (!this.selectedServerGroup) {
        alert('Выберите группу для сервера');
        return;
      }
      this.$emit('editServer', {
        id: this.server.id,
        ip: this.newServerIp,
        dns: this.newServerDns.trim(),
        group: this.selectedServerGroup,
      });
      this.hideWindow();
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleGlobalEnter);
  }
};
</script>

<template>
  <div v-if="openDialog" class="dialog-overlay">
    <div
        ref="modalRoot"
        class="dialog-content"
        :class="{'dialog-content-add-block': isAddBlock, 'dialog-content-add-server': isAddServer || isEditServer}"
        :style="themeStatus
        ? { background: themeLight.backgroundComponent, color: themeLight.textColor }
        : { background: themeDark.backgroundComponent, color: themeDark.textColor }"
    >
      <template v-if="isAddBlock">
        <h1 class="dialog-title"
            :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }">
          Добавить блок
        </h1>
        <div class="dialog-inputs">
          <div class="dialog-field">
            <label class="dialog-label" for="newGroup"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Группа:</label>
            <ui-input id="newGroupAdd" placeholder=""
                      :themeStatus="themeStatus"
                      :themeLight="themeLight"
                      :themeDark="themeDark"></ui-input>
          </div>
        </div>
        <div class="dialog-buttons">
          <main-button @click="searchElement" :themeStatus="themeStatus" :themeLight="themeLight"
                       :themeDark="themeDark">
            Сохранить
          </main-button>
          <main-button @click="hideWindow" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"
                       class="drop">
            Отмена
          </main-button>
        </div>
      </template>
      <template v-if="isAddServer || isEditServer">
        <h1 class="dialog-title"
            :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }">
          {{ isEditServer ? 'Редактирование сервера' : 'Добавление сервера' }}
        </h1>
        <div class="dialog-inputs">
          <div class="dialog-field">
            <label class="dialog-label" for="ip"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >IP-адрес:</label>
            <ui-input id="ip" placeholder="" :themeStatus="themeStatus"
                      :themeLight="themeLight"
                      :themeDark="themeDark"/>
          </div>
          <div class="dialog-field">
            <label class="dialog-label" for="dns"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Доменное имя:</label>
            <ui-input id="dns" placeholder="" :themeStatus="themeStatus"
                      :themeLight="themeLight"
                      :themeDark="themeDark"/>
          </div>
          <div class="dialog-field">
            <label class="dialog-label" for="group"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Группа:</label>
            <ui-select id="group"
                       :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark">
              <option disabled value="">Выбрать группу</option>
              <option v-for="group in thisGroups" :key="group.id" :value="group.name">
                {{ group.name }}
              </option>
            </ui-select>
          </div>
        </div>
        <select-checkbox :blocks="selectOptions" :show-add-btn="true" :show-delete-btn="true" :show-delete-server="false"
                         :show-check-box="true" :themeStatus="themeStatus"
                         :themeLight="themeLight" :themeDark="themeDark"></select-checkbox>
        <div class="dialog-buttons">
          <main-button @click="searchElement" :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark">
            Сохранить
          </main-button>
          <main-button @click="hideWindow" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"
                       class="drop">
            Отмена
          </main-button>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.servers {
  padding-left: 20px;
  transition: all 0.3s ease;
}

.block-header {
  display: flex;
  justify-content: space-between;
}

.server-checkbox {
  margin-right: 2%;
}


.block-header div {
  display: flex;
  align-items: center;
  gap: 10px;
}

.delete-btn {
  background: #F44336;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.lbl-check {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.add-btn {
  margin-left: 10%;
  background: #38bdf8;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.server-item {
  margin-bottom: 2%;
}

.btn-server {
  margin-bottom: 2%;
}

.block {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.dialog-content {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-content-add-block {
  min-width: 470px;
  min-height: 235px;
  max-height: 80vh;
  overflow-y: auto;
}

.dialog-content-add-server {
  min-width: 470px;
  min-height: 405px;
  max-height: 80vh;
  overflow-y: auto;
}

.drop {
  background: #757575 !important;
}

.dialog-title {
  font-size: 28px;
  color: #212121;
  text-align: center;
  font-family: "Segoe UI Semibold";
}

.dialog-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-grow: 1;
}

.dialog-field {
  display: flex;
  flex-direction: column;
}

.dialog-label {
  margin-bottom: 7px;
  font-size: 14px;
  color: #333;
}

.dialog-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  width: 100%;
}

select {
  width: 100%;
}

button {
  width: 48%;
}

</style>