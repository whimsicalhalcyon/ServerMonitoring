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
  display: flex;
  gap:2%;
  width: 100%;
}

.errorBlock {
  display: flex;
  align-items: center;
  width: 15.33%;
}

.errorBlock input[type="checkbox"] {
  margin-right: 5%;
  transform: scale(1.1);
}

.errorBlock label {
  font-size: 14px;
}
</style>