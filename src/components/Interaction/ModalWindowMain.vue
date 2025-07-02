<script>
import ModalWindow from '@/components/Interaction/ModalWindow.vue';
import MainButton from '@/components/MainButton.vue';
import SelectCheckbox from "@/components/ServerCharts/SelectCheckbox.vue";


export default {
  components: { ModalWindow, MainButton, SelectCheckbox },
  props: {
    openDialog: { type: Boolean, default: false },
    themeStatus: { type: Boolean, default: true },
    themeLight: { type: Object, required: true },
    themeDark: { type: Object, required: true },
  },
  data() {
    return {
      blocks: [
        { name: 'app', servers: ['nn-lsed-app01.nnov.ru', 'nn-lsed-app02.nnov.ru', 'nn-lsed-app03.nnov.ru'], isExpanded: false },
        { name: 'backup', servers: [], isExpanded: false },
        { name: 'bl', servers: [], isExpanded: false },
        { name: 'convert', servers: [], isExpanded: false },
        { name: 'custom', servers: [], isExpanded: false },
      ],
      addBlockModal: false,
      addServerModal: false,
    };
  },
  methods: {
    hideWindow() {
      this.$emit('update:openDialog', false);
    },
    openAddBlock() {
      this.addBlockModal = true;
    },
    openAddServer() {
      this.addServerModal = true;
    },
    toggleExpand(blockIndex) {
      this.blocks[blockIndex].isExpanded = !this.blocks[blockIndex].isExpanded;
    },
    deleteBlock(blockIndex) {
      if (window.confirm(`Вы точно хотите удалить блок ${this.blocks[blockIndex].name}?`)) {
        this.blocks.splice(blockIndex, 1);
        alert(`Блок ${this.blocks[blockIndex].name} удалён!`);
      }
    },
  },
};
</script>

<template>
  <div v-if="openDialog" class="dialog-overlay">
    <div
        class="dialog-content"
        :style="themeStatus
        ? { background: themeLight.backgroundComponent, color: themeLight.textColor }
        : { background: themeDark.backgroundComponent, color: themeDark.textColor }"
    >
      <h1 class="dialog-title" :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }">
        Редактирование списка серверов
      </h1>
      <div class="dialog-buttons">
        <main-button @click="openAddBlock" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          Добавить блок
        </main-button>
        <main-button @click="openAddServer" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          Добавить сервер
        </main-button>
      </div>
      <select-checkbox
          :blocks="blocks"
          :show-delete-btn="false"
          :show-delete-server="true"
          :show-check-box="false"></select-checkbox>
      </div>
      <div class="dialog-footer">
        <main-button @click="hideWindow" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" class="drop">
        </main-button>
      </div>
      <modal-window
          v-model:openDialog="addBlockModal"
          :themeStatus="themeStatus"
          :themeLight="themeLight"
          :themeDark="themeDark"
          is-add-block
      />
      <modal-window
          v-model:openDialog="addServerModal"
          :themeStatus="themeStatus"
          :themeLight="themeLight"
          :themeDark="themeDark"
          is-add-server
      />
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
  min-width: 600px;
  min-height: 400px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-title {
  font-size: 28px;
  text-align: center;
  font-family: "Segoe UI Semibold";
}

.dialog-buttons {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
}


.block-header {
  font-weight: bold;
  margin-bottom: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.block-header div {
  display: flex;
  align-items: center;
  gap: 10px;
}



.dialog-footer {
  margin-top: auto;
}

.drop {
  background: #757575 !important;
}

button {
  width: 100%;
}

i {
  font-family: "FontAwesome";
}
</style>