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
  data() {
    return {
      isHovered: false
    }
  },
  computed: {
    themeStatusE() {
      if (this.isHovered) {
        return this.themeStatus ? this.themeDark.backgroundButton: this.themeLight.backgroundButton

      }
      else {
        return this.themeStatus ? this.themeLight.backgroundButton: this.themeDark.backgroundButton
      }
    }
  }

}
</script>

<template>
  <button :style="themeStatus ? {background: themeLight.backgroundButton, color: themeLight.textButton, backgroundColor: themeStatusE}: {background: themeDark.backgroundButton, color: themeDark.textButton,  backgroundColor: themeStatus}" @mouseenter="isHovered = true" @mouseleave="isHovered = false"><slot></slot></button>
</template>

<style scoped>
button {
  width: 17%;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}
</style>