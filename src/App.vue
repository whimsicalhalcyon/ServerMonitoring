<script >
import pageMonitor from "@/components/ServerCharts/PageMonitor.vue";
import menuPage from "@/components/MenuPage.vue";

export default {
  components: {
    pageMonitor, menuPage
  },
  data() {
    return {
      openMonitor: false
    }
  },
  methods : {
    openMonitorWindow() {
      this.openMonitor = true
    }
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
  <div class="container-page flex flex-row">
    <menu-page @open-monitor="openMonitorWindow" :open-monitor="openMonitor"  class="fixed z-50"></menu-page>
    <page-monitor v-if="openMonitor" class="fixed top-0 left-[95px]"></page-monitor>
  </div>

</template>

<style scoped>

</style>
