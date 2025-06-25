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
    },
    modelValueInteraction: {
      type: String,
      default: ''
    },
  },
  methods: {
    onInput(event) {
      const value = event.target.value;
      this.$emit('update:modelValueInteraction', value);
    }
  }
}
</script>

<template>
  <input type="text" @input="onInput" :value="modelValueInteraction" placeholder="Поиск по имени сервера" :style="themeStatus ? {borderColor: themeLight.borderColor, color: themeLight.textColor}: {borderColor: themeDark.borderColor, color: themeDark.textColor}">
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