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
  display: flex;
  width: 100%;
  gap: 2%;
}
.errorBlock:nth-child(1){
  width:22.29%;
  display: flex;
  align-items: center;
}
.errorBlock:nth-child(2){
  width:14.22%;
  display: flex;
  align-items: center;
}
.errorBlock:nth-child(3){
  width:18.07%;
  display: flex;
  align-items: center;
}
.errorBlock:nth-child(4){
  width:9.88%;
  display: flex;
  align-items: center;
}
.errorBlock:nth-child(5){
  width:9.88%;
  display: flex;
  align-items: center;
}
.errorBlock:nth-child(6){
  width:13.73%;
  display: flex;
  align-items: center;
}
.errorBlock input[type="checkbox"] {
  margin-right: 5%;
  transform: scale(1.1);
}

.errorBlock label {
  font-size: 14px;
}
</style>