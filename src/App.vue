<script>
import menuPage from "@/components/MenuPage.vue";
import PageInteraction from "@/components/Interaction/PageInteraction.vue";

export default {
  components: {
    menuPage, PageInteraction
  },
  data() {
    return {
      servers: [],
      groups: [],
      errorBlocks: [],
      serverParameterData: [],
      isDataLoaded: false,
      openMonitor: false,
      openMistakes: false,
      openInteraction: false,
      themeLight: {
        background: '#f5f5f5',
        backgroundComponent: '#ffffff',
        backgroundFilter: '#E0E0E0',
        backgroundButton: '#4FC3F7',
        textColor: '#212121',
        textFilter: '#ffffff',
        textButton: '#ffffff',
        textCheckbox: '#3E3E40',
        borderColor: '#A0A0A0',
        clear: 'rgba(33, 33, 33, 0)',
        grid: 'rgba(117,117,117,0.5)',
        panelButton: '#E0E0E0',
        panelBorder: '#757575',
        radioBorder: '#ffffff',

      },
      themeDark: {
        background: '#2D2D30',
        backgroundComponent: '#1E1E1E',
        backgroundFilter: '#3F3F46',
        backgroundButton: '#007ACC',
        textColor: '#E0E0E0',
        textFilter: '#ffffff',
        textButton: '#ffffff',
        textCheckbox: '#A0A0A0',
        borderColor: '#E0E0E0',
        clear: 'rgba(33, 33, 33, 0)',
        grid: 'rgba(117,117,117,0.5)',
        panelButton: '#2D2D30',
        panelBorder: '#9C9C9C',
        radioBorder: '#000000',
      },
      themeStatusLight: true,
      checkButton: 1,
      isSelected: null,
    }
  },
  methods: {
    async fetchServers() {
      try {
        const res = await fetch('/api/api/servers');
        if (!res.ok) throw new Error('Ошибка загрузки серверов');
        this.servers = await res.json();
      } catch (error) {
        console.error(error);
        alert('Ошибка загрузки серверов');
      }
    },
    async fetchBlocks() {
      try {
        const res = await fetch('/api/api/blocks');
        if (!res.ok) throw new Error('Ошибка загрузки блоков');
        this.groups = await res.json();
        console.log(this.groups);
      } catch (error) {
        console.error(error);
        alert('Ошибка загрузки блоков');
      }
    },
    async fetchErrorBlocks() {
      try {
        const res = await fetch('/api/api/servers/error_block');
        if (!res.ok) throw new Error('Ошибка загрузки error_block');
        this.errorBlocks = await res.json();
      } catch (error) {
        console.error(error);
        alert('Ошибка загрузки error_block');
      }
    },
    async fetchServerParameter() {
      try {
        const res = await fetch('/api/api/blocks/server_parameter');
        if (!res.ok) throw new Error('Ошибка загрузки server_parameter');
        this.serverParameterData = await res.json();
        console.log('Данные serverParameterData:', this.serverParameterData);
      } catch (error) {
        console.error(error);
        alert('Ошибка загрузки server_parameter');
      }
    },
    // async errorBlockWithGroup() {
    //   this.errorBlocks = this.errorBlocks.map(server => {
    //     const group = this.groups.find(g => g.id === (server.blockId || server.block?.id));
    //     return {
    //       ...server,
    //       block: group ? {id: group.id, name: group.name} : {id: null, name: '-'}
    //     };
    //   });
    //   console.log('Synced ErrorBlocks:', this.errorBlocks);
    // },
    async addBlock(name) {
      if (!name.trim()) return alert('Название обязательно');

      const exists = this.groups.find(g => g.name === name.trim());
      if (exists) return alert('Группа уже существует');

      try {
        const res = await fetch('/api/api/blocks', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({name})
        });

        if (!res.ok) throw new Error('Ошибка при добавлении');
        await this.fetchBlocks();
        await this.fetchServerParameter();
      } catch (error) {
        console.error(error);
        alert('Ошибка при добавлении группы');
      }
    },
    async addServer({dns, ip, group}) {
      const targetGroup = this.groups.find(g => g.name === group);
      if (!targetGroup) return alert('Группа не найдена');

      const exists = this.servers.find(s =>
          s.hostName === dns && s.ipAddres === ip && s.blockId === targetGroup.id
      );
      if (exists) return alert('Сервер уже существует');

      const payload = {
        hostName: dns,
        ipAddres: ip,
        blockId: targetGroup.id,
        state: true,
        // errors: [],
        // metrics: [],
        // serverParameters: [],
        // block: null
      };

      try {
        console.log('targetGroup:', targetGroup);
        console.log('exists', exists);
        console.log('payload for addServer:', payload);
        const res = await fetch('/api/api/servers', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error('Ошибка при добавлении');
        await this.fetchServers();
        await this.fetchErrorBlocks();
        await this.fetchServerParameter();
      } catch (error) {
        console.log(error);
        alert('Ошибка при добавлении сервера');
      }
    },
    async deleteBlock(groupId) {
      const group = this.groups.find(g => g.id === groupId);
      if (!group) return alert('Группа не найдена');

      const serversToDelete = this.servers.filter(s => s.blockId === groupId);
      try {
        // for (const s of serversToDelete) {
        //   await fetch(`/api/blocks/${s.id}`, {method: 'DELETE'});
        // }

        const res = await fetch(`/api/api/blocks/${groupId}`, {method: 'DELETE'});
        if (!res.ok) throw new Error('Ошибка удаления группы');

        await this.fetchBlocks();
        await this.fetchServers();
        await this.fetchErrorBlocks();
        await this.fetchServerParameter();
      } catch (error) {
        console.log(error);
        alert('Ошибка удаления группы');
      }
    },
    async deleteServer(id) {
      try {
        const res = await fetch(`/api/api/servers/${id}`, {method: 'DELETE'});
        if (!res.ok) throw new Error('Ошибка удаления');
        await this.fetchServers();
        await this.fetchErrorBlocks();
        await this.fetchServerParameter();
      } catch (error) {
        console.log(error);
        console.log(id);
        alert('Ошибка удаления сервера');
      }
    },
    async editServer({id, ip, dns, group}) {
      console.log('App.vue received editServer:', {id, ip, dns, group});
      const block = this.groups.find(g => g.name === group);
      if (!block) {
        console.log('Группа не найдена:', group);
        return alert('Группа не найдена');
      }

      const updated = {
        id: id,
        hostName: dns,
        ipAddres: ip,
        blockId: block.id,
        state: true,
        errors: [],
        metrics: [],
        serverParameters: [],
        block: null,
      };
      try {
        const res = await fetch(`/api/api/servers/${id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(updated)
        });

        if (!res.ok) throw new Error('Ошибка обновления');
        await this.fetchServers();
        await this.fetchErrorBlocks();
        await this.fetchServerParameter();
      } catch (error) {
        console.log(error);
        alert('Ошибка обновления сервера');
      }
    },
    openMonitorWindow(status) {
      this.openMonitor = status;
      this.openMistakes = false;
      this.openInteraction = false
      this.checkButton = 3;
      this.savePage()
    },
    openMistakesWindow(status) {
      this.openMonitor = false;
      this.openMistakes = status;
      this.openInteraction = false
      this.checkButton = 1;
      this.savePage()
    },
    openInteractionWindow(status) {
      this.openMonitor = false;
      this.openMistakes = false;
      this.openInteraction = status
      this.checkButton = 2;
      this.savePage()
    },
    changeToTheme(status) {
      this.themeStatusLight = status;
      localStorage.setItem('theme', this.themeStatusLight);

    },
    savePage() {
      localStorage.setItem('pageState', JSON.stringify({
        openMonitor: this.openMonitor,
        openMistakes: this.openMistakes,
        openInteraction: this.openInteraction,
        checkButton: this.checkButton
      }));
    },
    checkPage(buttonId) {
      this.checkButton = buttonId;

      switch (buttonId) {
        case 1:
          this.openMistakesWindow(true);
          break;
        case 2:
          this.openInteractionWindow(true);
          break;
        case 3:
          this.openMonitorWindow(true);
          break;
      }
      this.savePage();
    },
    loadPageState() {
      const pageState = localStorage.getItem('pageState');
      if (pageState) {
        const state = JSON.parse(pageState);
        this.openMonitor = state.openMonitor;
        this.openMistakes = state.openMistakes;
        this.openInteraction = state.openInteraction;
        this.checkButton = state.checkButton;
      }
    },
  }
  ,
  created() {
    // добавление страницы в локал сторадж, чтобы она при перезагрузке не пропадала
    this.loadPageState();
  }
  ,


  watch: {
    openMonitor(newValue) {
      localStorage.setItem('monitorState', JSON.stringify(newValue));
    },
    serverParameterData(newValue) {
      console.log('ОТ родителя:', newValue);
    }
  }
  ,
  computed: {
    themeLocal() {
      return localStorage.getItem('theme') === 'true';
    }
  }
  ,
  mounted() {
    this.fetchBlocks();
    this.fetchServers();
    this.fetchErrorBlocks();
    this.fetchServerParameter();
    this.isDataLoaded = true;
  },
}
</script>

<template>
  <div class="page"
       :style="themeStatusLight ? {background: this.themeLight.background}: {background: this.themeDark.background}">
    <menu-page
        :checkButton="checkButton"
        @button-clicked="checkPage"
        :open-interaction="openInteraction"
        :open-mistakes="openMistakes"
        :open-monitor="openMonitor"
        :themeStatus="themeStatusLight"
        :themeLight="themeLight"
        :themeDark="themeDark"></menu-page>
    <page-interaction
        @deleteServer="deleteServer"
        @addBlock="addBlock"
        @addServer="addServer"
        @deleteBlock="deleteBlock"
        @editServer="editServer"
        :isDataLoaded="isDataLoaded"
        :groups="groups"
        :servers="servers"
        :errorBlocks="errorBlocks"
        :serverParameterData="serverParameterData"
        v-show="openInteraction"
        :themeStatus="themeStatusLight"
        :themeLight="themeLight"
        :themeDark="themeDark"
        @changeTheme="changeToTheme"></page-interaction>
  </div>

</template>

<style scoped>
.page {
  display: flex;
  gap: 20px;
  padding-right: 20px;
}
</style>