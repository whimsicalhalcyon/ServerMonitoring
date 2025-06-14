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
  computed: {
    textColor() {
      return this.themeStatus ? this.themeLight.textCheckbox : this.themeDark.textCheckbox;
    }
  }
}
</script>

<template>
  <div class="errorGroup">
    <input type="checkbox" :id="'error' + i">
    <label :for="'error' + i" :style="themeStatus?{color:themeLight.textCheckbox}:{color:themeDark.textCheckbox}"></label><slot></slot>
  </div>
</template>

<style scoped>
.errorGroup {
  display: flex;
  gap: 1.18%;
  justify-content: space-between;
  align-items: center;
}

.errorBlock {
  display: flex;
  align-items: center;
  width: 15.68%;
}

label {
  margin-left: 10px;
}

.errorBlock input[type="checkbox"] {
  margin-right: 10%;
  transform: scale(1.1);
}

.errorBlock label {
  font-size: 14px;
}
</style>