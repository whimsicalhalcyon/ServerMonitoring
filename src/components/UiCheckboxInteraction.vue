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
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    errorsData() {
      return [
        {value: 1, label: 'Не классифицирована', color: '#BDBDBD'},
        {value: 2, label: 'Информация', color: '#4FC3F7'},
        {value: 3, label: 'Предупреждение', color: '#FFEB3B', textColor: 'black'},
        {value: 4, label: 'Средняя', color: '#FF9800'},
        {value: 5, label: 'Высокая', color: '#F44336'},
        {value: 6, label: 'Критическая', color: '#780303'}
      ];
    },
  },
  methods: {
    toggleError(value) {
      const newValue = [...this.modelValue]; // Используем modelValue
      const index = newValue.indexOf(value);

      if (index === -1) {
        newValue.push(value);
      } else {
        newValue.splice(index, 1);
      }

      this.$emit('update:modelValue', newValue);
    }
  }
}
</script>

<template>
  <div class="errorGroup">
    <label class="errorBlock" v-for="item in errorsData" :key="item.value">
      <input type="checkbox" :checked="modelValue.includes(item.value)" @change="toggleError(item.value)" :id="`error-${item.value}`">
      <span
          :style="themeStatus ? {color: themeLight.textCheckbox}:{color: themeDark.textCheckbox}">{{item.label}}</span>
    </label>
  </div>
</template>

<style scoped>
.errorGroup {
  display: flex;
  align-items: center;
}

.errorBlock {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
</style>