<script>
import PageMistakes from "@/components/ServerCharts/PageMonitor.vue";
import MenuPage from "@/components/MenuPage.vue";

export default {
  components: {
    MenuPage, PageMistakes
  },
  data() {
    return {
      openMonitor: false
    }
  },
  methods: {
    openMonitorWindow() {
      this.openMonitor = true
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
  </div>
</template>

<style scoped>

</style>
