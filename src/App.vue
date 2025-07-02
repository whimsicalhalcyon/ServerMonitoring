<script >
import pageMonitor from "@/components/ServerCharts/PageMonitor.vue";
import menuPage from "@/components/MenuPage.vue";
import pageMistakes from "@/components/Mistakes/PageMistakes.vue";
import pageInteraction from "@/components/Interaction/PageInteraction.vue";

export default {
  components: {
    pageMonitor, menuPage, pageMistakes, pageInteraction
  },
  data() {
    return {
      servers:[],
      serversGroups: [],
      parameters: [],
      openMonitor: false,
      openMistakes: false,
      openInteraction: false,
      themeLight: {
        background: '#f5f5f5',
        backgroundComponent: '#ffffff',
        backgroundFilter: '#E0E0E0',
        backgroundButton:'#4FC3F7',
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
        backgroundButton:'#007ACC',
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
  methods : {
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
    async fetchServers(){

      const resServersGroup = await fetch('/src/api.json');
      // const resServersGroup = await fetch('/api/Blocks/server_metric');
      this.serversGroups = await resServersGroup.json();


    }

  },
  created() {
    // добавление страницы в локал сторадж, чтобы она при перезагрузке не пропадала
    this.loadPageState()
  },


  watch: {
    openMonitor(newValue) {
      localStorage.setItem('monitorState', JSON.stringify(newValue));
    },
  },
  computed: {
    themeLocal() {
      if (localStorage.getItem('theme') === 'true') {
        this.themeStatusLight = true
      } else {
        this.themeStatusLight = false
      }
    },


  },
  mounted() {
    this.themeLocal
    this.fetchServers()
    setInterval(this.fetchServers, 60000)
  },

}
</script>

<template>
  <div class="page" :style="themeStatusLight ? {background: this.themeLight.background}: {background: this.themeDark.background}">
    <menu-page
        class="height"
        :checkButton="checkButton"
        @button-clicked="checkPage"
        :open-interaction="openInteraction"
        :open-mistakes="openMistakes"
        :open-monitor="openMonitor"
        :themeStatus="themeStatusLight"
        :themeLight="themeLight"
        :themeDark="themeDark" ></menu-page>
    <page-monitor
        class="height"
        :serversGroups="serversGroups"
        :servers="servers"
        :parameters="parameters"
        v-if="openMonitor"
        :themeStatus="themeStatusLight"
        :themeLight="themeLight"
        :themeDark="themeDark"
        @changeTheme="changeToTheme"></page-monitor>
    <page-interaction
        class="height"
        v-bind:servers="servers"
        v-if="openInteraction"
        :themeStatus="themeStatusLight"
        :themeLight="themeLight"
        :themeDark="themeDark"
        @changeTheme="changeToTheme"></page-interaction>
    <page-mistakes
        class="height"
        v-if="openMistakes"
        :themeStatus="themeStatusLight"
        :themeLight="themeLight"
        :themeDark="themeDark"
        @changeTheme="changeToTheme"></page-mistakes>
  </div>

</template>

<style scoped>
.page {
  display: flex;
  gap: 20px;
  padding-right: 20px;
}
.height {
  min-height: 100vh;
}
</style>