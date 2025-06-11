<script >
import MenuPage from "./assets/components/MenuPage.vue";
import PageMistakes from "./assets/components/PageMistakes.vue";
export default {
  components: {
    MenuPage, PageMistakes
  },
  data(){
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
