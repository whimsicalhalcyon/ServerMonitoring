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
      isSelected: null,
      openMonitor: false,
      openMistakes: false,
      openInteraction: false,
      themeLight: {
        background: '#f5f5f5',
        backgroundComponent: '#ffffff',
        backgroundFilter: '#E0E0E0',
        backgroundButton:'#4FC3F7',
        backgroundButtonDrop: '#757575',
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
      themeStatusLight: true
    }
  },
  methods : {
    openMonitorWindow(status) {
      this.openMonitor = status;
      this.openMistakes = false;
      this.openInteraction = false
    },
    openMistakesWindow(status) {
      this.openMonitor = false;
      this.openMistakes = status;
      this.openInteraction = false
    },
    openInteractionWindow(status) {
      this.openMonitor = false;
      this.openMistakes = false;
      this.openInteraction = status
    },
    changeToTheme(status) {
      this.themeStatusLight = status
    },
  },


  created() {
    // добавление страницы в локал сторадж, чтобы она при перезагрузке не пропадала
    const page_state = localStorage.getItem('monitorState');
    if(page_state) {
      this.openMonitor = JSON.parse(page_state)
    }
  },

  watch: {
    openMonitor(newValue) {
      localStorage.setItem('monitorState', JSON.stringify(newValue));
    }
  }
}
</script>

<template>
  <div class="page" :style="themeStatusLight ? {background: this.themeLight.background}: {background: this.themeDark.background}">
    <menu-page @open-monitor="openMonitorWindow" @open-mistakes="openMistakesWindow" @open-interaction="openInteractionWindow" :open-interaction="openInteraction" :open-mistakes="openMistakes" :open-monitor="openMonitor" :themeStatus="themeStatusLight" :themeLight="themeLight" :themeDark="themeDark" @changeTheme="changeToTheme"></menu-page>
    <page-monitor v-if="openMonitor" :themeStatus="themeStatusLight" :themeLight="themeLight" :themeDark="themeDark"></page-monitor>
    <page-interaction v-if="openInteraction" :isSelected="isSelected" @update:isSelected="isSelected=$event" :themeStatus="themeStatusLight" :themeLight="themeLight" :themeDark="themeDark"></page-interaction>
    <page-mistakes v-if="openMistakes" ></page-mistakes>
  </div>

</template>

<style scoped>
.page {
  display: flex;
  gap: 20px;

  padding-right: 20px;
}
</style>
