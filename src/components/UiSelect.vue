<script>
export default {
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
    }
  },
}
</script>

<template>
  <select :style="themeStatus ? {background: themeLight.backgroundFilter, color: themeLight.textColor}: {background: themeDark.backgroundFilter, color: themeDark.textColor}"><slot></slot></select>
</template>

<style scoped>
  select {
    border-radius: 8px;
    width: 21.9%;
    height: 40px;
    padding: 0 0 0 13px;
    cursor: pointer;
  }

</style>