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
  <button :style="themeStatus ? {background: themeLight.backgroundButton, color: themeLight.textButton}: {background: themeDark.backgroundButton, color: themeDark.textButton}"><slot></slot></button>
</template>

<style scoped>
button {
  width: 17%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  transition: .2s;

}
</style>