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
    isSelected: {
      type: Object,
      default: null,
    },

  },
  methods: {
    toggleSelect(item) {
      this.$emit('update:isSelected', this.isSelected?.id === item.id ? null : item);
    }
  },
  computed: {
    currTheme() {
      return this.themeStatus ? this.themeLight : this.themeDark;
    },
    cellStyle() {
      return {
        color: this.currTheme.textColor,
      };
    },
    tableData() {
      const condition = ['Активировано', 'Деактивировано'];
      const group = ['APP', 'APP2006','IvanZolo2004'];
      return Array.from({length: 70}, (_, i) => ({
        id: i + 1,
        dns: `server${i+1}.local`,
        groups: group[Math.floor(Math.random() * group.length)],
        conditions: condition[Math.floor(Math.random() * condition.length)],
      }))
    },
  }

}
</script>


<template>
  <div
      class="table-container"
      :style="{
      background: currTheme.backgroundComponent,
      color: currTheme.textColor,
      borderColor:currTheme.borderColor
    }"
  >
    <table class="custom-table">
      <thead :style="{ background: currTheme.backgroundFilter }">
      <tr>
        <th class="rounded-tl" :style="cellStyle"></th>
        <th :style="cellStyle">DNS-имя</th>
        <th :style="cellStyle">IP-адрес</th>
        <th :style="cellStyle">Состояние</th>
        <th :style="cellStyle">Ошибки</th>
        <th :style="cellStyle">Группа</th>
        <th class="rounded-tr" :style="cellStyle">Графики</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableData" key="item.id">
        <td :style="cellStyle">
          <button
              class="select-btn"
              :style="{
                borderColor: currTheme.borderColor,
                color: currTheme.borderColor
              }"
              @click="toggleSelect(item)"
          >
            <i class="fa-solid fa-check" v-if="isSelected?.id===item.id"></i>
          </button>
        </td>
        <td :style="cellStyle">{{ item.dns }}</td>
        <td :style="cellStyle">192.168.0.{{item.id}}</td>
        <td :style="{...cellStyle, color:item.conditions==='Активировано'?'#4CAF50':'#9E271E'}">{{ item.conditions }}</td>
        <td :style="cellStyle" class="error-container">
          <div class="error" style="background-color: #BDBDBD;" title="Не классифицирована">1</div>
          <div class="error" style="background-color: #4FC3F7;" title="Информация">2</div>
          <div class="error" style="background-color: #FFEB3B; color: black;" title="Предупреждение">4</div>
          <div class="error" style="background-color: #FF9800;" title="Средняя">6</div>
          <div class="error" style="background-color: #F44336;" title="Высокая">8</div>
          <div class="error" style="background-color: #B71C1C;" title="Критическая">2</div>
        </td>
        <td :style="cellStyle">{{ item.groups }}</td>
        <td :style="cellStyle"><a :style="{color:currTheme.backgroundButton}" href="" class="link">Открыть</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>

.table-container {
  font-size: 15px;
  overflow: hidden;
  border-radius: 8px;
  background: v-bind('currTheme.backgroundComponent');
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
}

th {
  font-weight: normal;
  padding: 12px 16px;
}

td {
  padding: 12px 16px;
  color: v-bind('currTheme.textColor');
  background: v-bind('currTheme.backgroundComponent');
}

tbody tr:nth-child(even) td {
  background-color: rgba(0, 0, 0, 0.02);
}

tbody tr:last-child td {
  border-bottom: none;
}

th:first-child {
  border-top-left-radius: 12px;
}

th:last-child {
  border-top-right-radius: 12px;
}

tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

tbody tr:hover td {
  background-color: rgba(0, 0, 0, 0.03);
}

th:not(:last-child),
td:not(:last-child) {
  border-right: none;
}

.select-btn {
  width: 24px;
  height: 24px;
  border: 2px solid;
  border-radius: 4px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-btn:hover {
  border-color: #4FC3F7;
  color: #4FC3F7;
}

.error-container {
  display: flex;
  gap: 5px;
}

.error {
  width: 25px;
  height: 25px;
  border-radius: 3px;
  text-align: center;
  line-height: 25px;
  font-size: 14px;
  color: white;
}
</style>