<script >
import MenuPage from "./assets/components/MenuPage.vue";
import PageInteraction from "./assets/components/PageInteraction.vue";
export default {
  components: {PageInteraction, MenuPage},
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
}
</script>

<template>
<div class="container-page flex flex-row">
  <menu-page @open-monitor="openMonitorWindow" :open-monitor="openMonitor"></menu-page>
  <page-interaction  v-if="openMonitor"></page-interaction>
</div>
</template>

<style scoped>

</style>
