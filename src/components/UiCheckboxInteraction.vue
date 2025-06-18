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
  computed:{
    errorsData() {
      const error = ['Не классифицирована', 'Информация', 'Предупреждение','Средняя','Высокая','Критическая'];
      return Array.from({length: 6}, (_, i) => ({
        id: i + 1,
        errors: error
      }))
    },
  }
}
</script>

<template>
  <div class="errorGroup">
    <label class="errorBlock" v-for="item in errorsData" :key="item.id">
      <input type="checkbox" :id="'error' + item.id">
      <span :style="themeStatus ? {color: themeLight.textCheckbox}:{color: themeDark.textCheckbox}">{{item.errors[item.id-1]}}</span>
    </label>
  </div>
</template>

<style scoped>
.errorGroup {
  display: flex;
  align-items: center;
  text-align: center;
}
.errorBlock {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>