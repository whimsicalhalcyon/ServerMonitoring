<script>
import Table from '@/components/Table.vue';
import UiSelect from "@/components/UiSelect.vue";
import uiInput from "@/components/UiInput.vue";
export default {
  components: {
    Table, UiSelect, uiInput,
  },
  props: {
    themeLight: {
      type: Object,
      required: true
    },
    themeDark: {
      type: Object,
      required: true
    },
    themeStatus: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      openPanel: true,
      isSelected: null,
    }
  },
  methods: {
    togglePanel() {
      this.openPanel = !this.openPanel
    },
  }
  // data() {
  //   return {
  //     panelVisible: true
  //   }
  // }
}
</script>

<template>
  <div class="main">
    <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
    </div>
    <div class="table">
      <Table
          :theme-light="themeLight"
          :theme-dark="themeDark"
          :theme-status="themeStatus"
          :is-selected="isSelected"
          @update:isSelected="isSelected=$event"
      />
    </div>
  </div>
</template>

<style scoped>
  .main {
    width: 100%;
  }
  .main .panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    padding: 20px;
    border-radius: 12px;
    gap: 14px;
    margin-top: 20px;
    position: sticky;
    top: 0;
    z-index: 1000;
  }
</style>