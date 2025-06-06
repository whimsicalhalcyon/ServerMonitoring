<script >
import pageMonitor from "@/components/ServerCharts/PageMonitor.vue";
import menuPage from "@/components/MenuPage.vue";

export default {
  components: {
    pageMonitor, menuPage
  }
}
</script>

<template>
  <div class="container-page flex flex-row">
    <menu-page></menu-page>
    <page-monitor></page-monitor>
  </div>

</template>

<style scoped>

</style>
