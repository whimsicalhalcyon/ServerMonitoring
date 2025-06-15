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
    <div class="errorBlock" v-for="item in errorsData" :key="item.id">
      <input type="checkbox" :id="'error' + item.id">
      <label :for="'error' + item.id" :style="themeStatus?{color:themeLight.textCheckbox}:{color:themeDark.textCheckbox}">{{item.errors[item.id-1]}}</label>
    </div>
  </div>
</template>

<style scoped>
.errorGroup {
  width: 48.96%;
  display: flex;
  gap:2%;
  width: 100%;
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