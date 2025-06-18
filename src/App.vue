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
        openInteraction: this.openInteraction
      }));
    }
  },


  created() {
    // добавление страницы в локал сторадж, чтобы она при перезагрузке не пропадала
    const pageState = localStorage.getItem('pageState');
    if (pageState) {
      const { openMonitor, openMistakes, openInteraction } = JSON.parse(pageState);
      this.openMonitor = openMonitor;
      this.openMistakes = openMistakes;
      this.openInteraction = openInteraction;
    }
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
    }
  },
  mounted() {
    this.themeLocal
  }
}
</script>

<template>
  <div class="page" :style="themeStatusLight ? {background: this.themeLight.background}: {background: this.themeDark.background}">
    <menu-page :checkButton="checkButton" @open-monitor="openMonitorWindow" @open-mistakes="openMistakesWindow" @open-interaction="openInteractionWindow" :open-interaction="openInteraction" :open-mistakes="openMistakes" :open-monitor="openMonitor" :themeStatus="themeStatusLight" :themeLight="themeLight" :themeDark="themeDark"></menu-page>
    <page-monitor v-if="openMonitor" :themeStatus="themeStatusLight" :themeLight="themeLight" :themeDark="themeDark" @changeTheme="changeToTheme"></page-monitor>
    <page-interaction v-if="openInteraction" :themeStatus="themeStatusLight" :themeLight="themeLight" :themeDark="themeDark" @changeTheme="changeToTheme"></page-interaction>
    <page-mistakes v-if="openMistakes" :themeStatus="themeStatusLight" :themeLight="themeLight" :themeDark="themeDark" @changeTheme="changeToTheme"></page-mistakes>
  </div>

</template>

<style scoped>
.page {
  display: flex;
  gap: 20px;
  padding-right: 20px;
}
</style>
