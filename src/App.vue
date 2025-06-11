<script>
import PageMistakes from "@/components/ServerCharts/PageMonitor.vue";
import MenuPage from "@/components/MenuPage.vue";
import PageInteraction from "@/assets/components/PageInteraction.vue";
import ModalWindow from "@/assets/components/ModalWindow.vue";


export default {
  components: {
    MenuPage, PageMistakes, ModalWindow, PageInteraction,
  },
  data() {
    return {
      openMonitor: false,
      modalVisible: false,
    }
  },
  methods: {
    openMonitorWindow() {
      this.openMonitor = true
    },
    closeMonitorWindow() {
      this.openMonitor = false;
    },
    closeModal() {
      this.modalVisible = false;
    },
    openModal() {
      this.modalVisible = true;
    },
  },
  created() {
    // добавление страницы в локал сторадж, чтобы она при перезагрузке не пропадала
    const page_state = localStorage.getItem('monitorState');
    if (page_state) {
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
  <div class="container-page flex flex-row">
    <menu-page @open-monitor="openMonitorWindow" :open-monitor="openMonitor"></menu-page>
    <page-mistakes v-if="openMonitor" @open-modal="openModal"></page-mistakes>
    <page-interaction v-if="openMonitor" @open-modal="openModal"></page-interaction>
    <modal-window :visible="modalVisible" @close="closeModal"></modal-window>
  </div>
</template>

<style scoped>

</style>
