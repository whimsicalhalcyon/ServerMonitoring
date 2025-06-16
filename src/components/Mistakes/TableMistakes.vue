<script>

import MistakeCheckbox from "@/components/Mistakes/MistakeCheckbox.vue";
import UiCheckboxInteraction from "@/components/UiCheckboxInteraction.vue";
export default {
  components: {
    UiCheckboxInteraction,
    MistakeCheckbox,
    uiCheckbox: UiCheckboxInteraction
  },
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
      type: Number,
    },
  },
  methods: {
    toggleSelect(index) {
      this.$emit('update:isSelected', this.isSelected === index ? null : index);
    }
  },
  computed: {
    currTheme() {
      return this.themeStatus ? this.themeLight : this.themeDark;
    },
    cellStyle() {
      return {
        color: this.currTheme.textColor,
        // borderColor: this.currTheme.borderColor
      };
    },
    tableData() {
      const statuses = ['Критическая', 'Высокая', 'Средняя'];
      const states = ['Ошибка', 'Решено'];
      const problems = 'Zabbix agent is not available (for 3m)';

      return Array.from({length: 70}, (_, i) => ({
        id: i + 1,
        time: Date.now(),
        importance: statuses[0],
        recoveryTime: Date.now(),
        state: states[Math.floor(Math.random() * states.length)],
        serverName: 'server-name',
        problem: problems,
        duration: Date.now()
      }));
    }
  }
}
</script>

<template>
  <div
      class="table-container"
      :style="{
      background: currTheme.backgroundComponent,
      color: currTheme.textColor,
      borderColor: currTheme.borderColor
    }"
  >
    <table class="custom-table">
      <thead :style="{ background: currTheme.backgroundFilter }">
      <tr>
        <th class="rounded-tl" :style="cellStyle"></th>
        <th :style="cellStyle">Время</th>
        <th :style="cellStyle">Важность</th>
        <th :style="cellStyle">Время восстановления</th>
        <th :style="cellStyle">Состояние</th>
        <th :style="cellStyle">Имя сервера</th>
        <th :style="cellStyle">Проблема</th>
        <th class="rounded-tr" :style="cellStyle">Длительность</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in tableData" :key="item.id">
        <td :style="cellStyle">
          <mistake-checkbox theme-dark="" theme-light=""></mistake-checkbox>
        </td>
        <td :style="cellStyle">{{ item.time }}</td>
        <td class="name-mistake"
            :style="{
              ...cellStyle,
              color: item.importance === 'Критическая' ? '#9E271E' :
                     item.importance === 'Высокая' ? '#FFCC00' :
                     item.importance === 'Средняя' ? '#F48C3E' :
                     '#4CAF50'
            }"
        >
          {{item.importance}}
        </td>
        <td :style="cellStyle">{{ item.recoveryTime }}</td>
        <td class="status"
            :style="{
              ...cellStyle,
              color: item.state === 'Активно' ? '#9E271E' :
                     item.state === 'Решено' ? '#4CAF50' :
                     '#FFC107',

            }"
        >
          {{ item.state }}
        </td>
        <td :style="cellStyle">{{ item.serverName }}</td>
        <td :style="cellStyle">{{ item.problem }}</td>
        <td :style="cellStyle">{{ item.duration }}</td>
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

.status, .name-mistake {
  font-weight: 600;
}
tbody tr:hover td {
  background-color: rgba(0, 0, 0, 0.03);
}

th:not(:last-child),
td:not(:last-child) {
  border-right: none;
}

</style>