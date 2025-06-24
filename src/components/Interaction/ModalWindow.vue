<script>
import UiInput from '@/components/UiInput.vue';
import UiSelect from '@/components/UiSelect.vue';
import MainButton from '@/components/MainButton.vue';
import SelectCheckbox from "@/components/ServerCharts/SelectCheckbox.vue";

export default {
  components: { UiInput, UiSelect, MainButton, SelectCheckbox },
  props: {
    openDialog: { type: Boolean, default: false },
    themeStatus: { type: Boolean, default: true },
    themeLight: { type: Object, required: true },
    themeDark: { type: Object, required: true },
    isAddBlock: { type: Boolean, default: false },
    isAddServer: { type: Boolean, default: false },
  },
  data() {
    return {
      selectOPen: false,
      selectedOptionsArray: [],
      selectOptions: [
        {name: 'Выберите параметры', servers: ['Параметр 1', 'Параметр 2', 'Параметр 3'], isExpanded: false }
      ]
    }
  },
  methods: {
    hideWindow() {
      this.$emit('update:openDialog', false);
    },
    addBlock() {
      const blockName = this.$refs.blockName.value;
      if (blockName) {
        this.$emit('addBlock', blockName);
        this.hideWindow();
      }
    },
    addServer() {
      const ip = this.$refs.ip.value;
      const dns = this.$refs.dns.value;
      const group = this.$refs.group.value;
      if (ip && dns && group) {
        this.$emit('addServer', { ip, dns, group });
        this.hideWindow();
      }
    },
    toggleDropdown() {
      this.$el.querySelector('.dropdown-content').classList.toggle('show');
    },
    handleCheckboxChange(option) {
      if (this.selectedOptionsArray.includes(option)) {
        this.selectedOptionsArray = this.selectedOptionsArray.filter((item) => item !== option);
      } else {
        this.selectedOptionsArray = [...this.selectedOptionsArray, option];
      }
    },
    showCheckboxes() {
      let checkboxes = document.getElementById("checkboxes");
      if (!this.selectOPen) {
        checkboxes.style.display = "block";
        this.selectOPen = true;
      } else {
        checkboxes.style.display = "none";
        this.selectOPen = false;
      }
    }
  },
};
</script>

<template>
  <div v-if="openDialog" class="dialog-overlay">
    <div
        class="dialog-content"
        :class="{'dialog-content-add-block': isAddBlock, 'dialog-content-add-server': isAddServer}"
        :style="themeStatus
        ? { background: themeLight.backgroundComponent, color: themeLight.textColor }
        : { background: themeDark.backgroundComponent, color: themeDark.textColor }"
    >
      <template v-if="isAddBlock">
        <h1 class="dialog-title" :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }">
          Добавить блок
        </h1>
        <div class="dialog-inputs">
          <div class="dialog-field">
            <label class="dialog-label" for="group"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Группа:</label>
            <ui-select id="group" ref="group" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
              <option>APP</option>
              <option>APP2006</option>
              <option>IvanZolo2004</option>
            </ui-select>
          </div>
        </div>
        <div class="dialog-buttons">
          <main-button @click="addBlock" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
            Сохранить
          </main-button>
          <main-button @click="hideWindow" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="drop">
            Отмена
          </main-button>
        </div>
      </template>
      <template v-if="isAddServer">
        <h1 class="dialog-title" :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }">
          Добавление сервера
        </h1>
        <div class="dialog-inputs">
          <div class="dialog-field">
            <label class="dialog-label" for="ip"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >IP-адрес:</label>
            <ui-input id="ip" ref="ip" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" />
          </div>
          <div class="dialog-field">
            <label class="dialog-label" for="dns"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Доменное имя:</label>
            <ui-input id="dns" ref="dns" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" />
          </div>
          <div class="dialog-field">
            <label class="dialog-label" for="group"
                   :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
            >Группа:</label>
            <ui-select id="group" ref="group" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
              <option>APP</option>
              <option>APP2006</option>
              <option>IvanZolo2004</option>
            </ui-select>
          </div>
          <select-checkbox
              :blocks="selectOptions"
              :show-delete-btn="true"
              :show-delete-server="false"
              :show-add-btn="true"
              :show-check-box="true"></select-checkbox>
        </div>
        <div class="dialog-buttons">
          <main-button @click="addServer" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
            Сохранить
          </main-button>
          <main-button @click="hideWindow" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="drop">
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