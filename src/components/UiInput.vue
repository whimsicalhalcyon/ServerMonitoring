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
  <input type="text" placeholder="Поиск по имени сервера" :style="themeStatus ? {borderColor: themeLight.borderColor}: {borderColor: themeDark.borderColor}">
</template>

<style scoped>
input {
  background: rgba(33, 33, 33, 0);
  border-radius: 8px;
  width: 31%;
  height: 40px;
  border: 1px solid;
  padding: 0 14px 0 14px;
}
</style>