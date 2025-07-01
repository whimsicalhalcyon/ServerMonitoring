<script>
import ModalWindow from '@/components/Interaction/ModalWindow.vue';
import MainButton from '@/components/MainButton.vue';

export default {
  components: {ModalWindow, MainButton},
  props: {
    openDialog: {type: Boolean, default: false},
    themeStatus: {type: Boolean, default: true},
    themeLight: {type: Object, required: true},
    themeDark: {type: Object, required: true},
    groups: {type: Array, default: () => []},
    serverParameterData: {type: Array, default: () => []},
  },
  emits: ['addBlock', 'addServer', 'update:openDialog', 'deleteBlock'],
  data() {
    return {
      addBlockModal: false,
      addServerModal: false,
      expandedBlocks: new Set(),
    };
  },
  computed: {
    blocks() {
      if (!Array.isArray(this.serverParameterData)) return [];

      return this.serverParameterData.map(group => ({
        id: group.id,
        name: group.name,
        servers: Array.isArray(group.servers)
            ? [...group.servers]
                .sort((a, b) => a.hostName.localeCompare(b.hostName)) // сортировка по А–Я
                .map(server => server.hostName)
            : []
      }));
    },
    thisGroups() {
      return [...this.blocks].sort((a, b) => a.name.localeCompare(b.name));
    },

  },
  methods: {
    hideWindow() {
      this.$emit('update:openDialog', false);
      this.addBlockModal = false;
      this.addServerModal = false;
    }
    ,
    togglePanel(blockId) {
      if (this.expandedBlocks.has(blockId)) {
        this.expandedBlocks.delete(blockId);
      } else {
        this.expandedBlocks.add(blockId);
      }
      this.expandedBlocks = new Set(this.expandedBlocks); // Триггерим реактивность
    },
    isExpanded(blockId) {
      return this.expandedBlocks.has(blockId);
    },
    openAddBlock() {
      this.addBlockModal = true;
    },
    openAddServer() {
      this.addServerModal = true;
    },
    addBlock(blockName) {
      if (this.groups.find(g => g.name === blockName)) {
        alert('Группа с таким именем уже существует');
        return;
      }
      this.$emit('addBlock', blockName);
    },
    addServer(server) {
      // const block = this.blocks.find(b => b.name === serverName.group);
      // if (block && !block.servers.includes(serverName.dns)) {
      //   block.servers.push(serverName.dns);
      // }
      this.$emit('addServer', server);
    },
    deleteBlock(groupId) {
      // if (groupId === null) {
      //   alert('Нельзя удалить категорию "Без группы"');
      //   return;
      // }
      const group = this.groups.find(g => g.id === groupId);
      if (!group) return;
      if (!window.confirm(`Вы точно хотите удалить группу ${group.name}?`)) return;
      this.$emit('deleteBlock', groupId);
      this.expandedBlocks.delete(groupId);
    },
    editServer(server) {
      this.$emit('editServer', server);
    }
  },
  watch: {},
}
;
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
      <div class="blocks-container">
        <div v-if="blocks.length === 0" class="no-groups">
          Нет групп для отображения
        </div>
        <div v-for="block in thisGroups" :key="block.id" class="block">
          <div class="block-header"
               @click="togglePanel(block.id)">
            <span>{{ block.name }}</span>
            <div v-if="block.id !== null">
              <i class="fa-solid fa-chevron-up " style="cursor: pointer;"
                 :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
                 :class="isExpanded(block.id)? 'fa-chevron-up' : 'fa-chevron-down'"></i>
              <button @click.stop="deleteBlock(block.id)" class="delete-btn">Х</button>
            </div>
          </div>
          <div class="servers" v-if="isExpanded(block.id)">
            <div v-if="block.servers.length === 0" class="server-item">
              Нет серверов
            </div>
            <div v-for="server in block.servers"
                 :key="server" class="server-item">
              {{ server }}
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <main-button @click="hideWindow" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"
                     class="drop">
          Отмена
        </main-button>
      </div>
      <modal-window
          :groups="groups"
          v-model:openDialog="addBlockModal"
          :themeStatus="themeStatus"
          :themeLight="themeLight"
          :themeDark="themeDark"
          is-add-block
          @addBlock="addBlock"
      />
      <modal-window
          :groups="groups"
          v-model:openDialog="addServerModal"
          :themeStatus="themeStatus"
          :themeLight="themeLight"
          :themeDark="themeDark"
          is-add-server
          @addServer="addServer"
      />
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

.blocks-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.block {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
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

.servers {
  padding-left: 20px;
  transition: all 0.3s ease;
}

.server-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.delete-btn {
  background: #F44336;
  color: white;
  border: none;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
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