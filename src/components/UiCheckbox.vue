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
  },
}
</script>

<template>
  <div class="errorGroup">
    <div class="errorBlock" v-for="i in 6" :key="i">
      <input type="checkbox" :id="'error' + i">
      <label :for="'error' + i" :style="themeStatus?{color:themeLight.textCheckbox}:{color:themeDark.textCheckbox}">Тип
        ошибки {{ i }}</label>
    </div>
  </div>
</template>

<style scoped>
.errorGroup {
  width: 48.96%;
  display: flex;
  gap: 1.18%;
  justify-content: space-between;
}

.errorBlock {
  display: flex;
  align-items: center;
  width: 15.68%;
}

.errorBlock input[type="checkbox"] {
  margin-right: 10%;
  transform: scale(1.1);
}

.errorBlock label {
  font-size: 14px;
}
</style>