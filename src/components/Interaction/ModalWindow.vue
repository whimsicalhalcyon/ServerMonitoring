<script>
import UiInput from '@/components/UiInput.vue';
import UiSelect from '@/components/UiSelect.vue';
import MainButton from '@/components/MainButton.vue';

export default {
  components: {UiInput, UiSelect, MainButton},
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
    isEditServer: {type: Boolean, default: false}
  },
  emits: ['addBlock', 'addServer', 'update:openDialog', 'editServer'],
  data() {
    return {
      newGroupName: '',//добавление нового блока (группы)
      newServerIp: '',//добавление нового ip сервера
      newServerDns: '',//добавление нового доменного имени сервера
      selectedServerGroup: '',//выбранная группа сервера при добавлении
      // editServerIp: '',
      // editServerDns: '',
      // selectedServerGroupEdit: '',
    }
  },
  watch: {
    openDialog(newVal) {
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
  methods: {
    initializeEditFields() {
      console.log('Initializing fields with server:', this.server);
      this.newServerIp = this.server.ipAddres || '';
      this.newServerDns = this.server.hostName || '';

      const group = this.groups.find(g => g.id === this.server.blockId);
      this.selectedServerGroup = group ? group.name : '';
    },
    hideWindow() {
      this.$emit('update:openDialog', false);
      this.newGroupName = '';
      this.newServerIp = '';
      this.newServerDns = '';
      this.selectedServerGroup = '';
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
};
</script>

<template>
  <div v-if="openDialog" class="dialog-overlay">
    <div
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
            <ui-input id="newGroup" v-model:modelValueInteraction="newGroupName" placeholder=""
                      :themeStatus="themeStatus"
                      :themeLight="themeLight"
                      :themeDark="themeDark"></ui-input>
          </div>
        </div>
        <div class="dialog-buttons">
          <main-button @click="addBlock" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
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
            <ui-input id="ip" v-model:modelValueInteraction="newServerIp" placeholder="" :themeStatus="themeStatus"
                      :themeLight="themeLight"
                      :themeDark="themeDark"/>
          </div>
          <div class="dialog-field">
            <label class="dialog-label" for="dns"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Доменное имя:</label>
            <ui-input id="dns" v-model:modelValueInteraction="newServerDns" placeholder="" :themeStatus="themeStatus"
                      :themeLight="themeLight"
                      :themeDark="themeDark"/>
          </div>
          <div class="dialog-field">
            <label class="dialog-label" for="group"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Группа:</label>
            <ui-select id="group" v-model:selectGroupValue="selectedServerGroup"
                       :themeStatus="themeStatus"
                       :themeLight="themeLight" :themeDark="themeDark">
              <option disabled value="">Выбрать группу</option>
              <option v-for="group in groups" :key="group.id" :value="group.name">
                {{ group.name }}
              </option>
            </ui-select>
          </div>
        </div>
        <div class="dialog-buttons">
          <main-button @click="isEditServer ? saveEditServer() : addServer()" :themeStatus="themeStatus"
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