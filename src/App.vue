<script>
import MenuPage from "./assets/components/MenuPage.vue";
import PageInteraction from "./assets/components/PageInteraction.vue";
import ModalWindow from "./assets/components/ModalWindow.vue";

export default {
  components: {PageInteraction, MenuPage, ModalWindow},
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
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
  },
}
</script>

<template>
  <div class="container-page flex flex-row">
    <menu-page @open-monitor="openMonitorWindow" :open-monitor="openMonitor"></menu-page>
    <page-interaction v-if="openMonitor" @open-modal="openModal"></page-interaction>
    <modal-window :visible="modalVisible" @close="closeModal"></modal-window>
  </div>
</template>

<style scoped>

</style>
