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
  <input :style="themeStatus ? {borderColor: themeLight.radioBorder}: {borderColor: themeDark.radioBorder}">
</template>

<style scoped>
  input {
    border: 1px solid
  }
</style>