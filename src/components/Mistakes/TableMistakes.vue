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
    servers : {
      type: Array,
    }

  },
  data() {
    return {
      sortColumn: {
        time:false,
        importance: false,
        recoveryTime: false,
        state: false,
        serverName:false,
        problem: false,
        duration: false
      }
    }

  },
  methods: {
    toggleSelect(index) {
      this.$emit('update:isSelected', this.isSelected === index ? null : index);
    },
    togglepanel(column) {
      this.sortColumn[column] = !this.sortColumn[column];
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
        <th :style="cellStyle">
          <div class="header-table">
            <span>Время</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="sortColumn.time ? 'fa-chevron-up' : 'fa-chevron-down'" @click="togglepanel('time')"></i>
          </div>
        </th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>Важность</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="sortColumn.importance ? 'fa-chevron-up' : 'fa-chevron-down'" @click="togglepanel('importance')"></i>
          </div>
        </th>
        <th :style="cellStyle">
        <div class="header-table">
          <span>Время восстановления</span>
          <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="sortColumn.recoveryTime ? 'fa-chevron-up' : 'fa-chevron-down'" @click="togglepanel('recoveryTime')"></i>
        </div></th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>Состояние</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="sortColumn.state ? 'fa-chevron-up' : 'fa-chevron-down'" @click="togglepanel('state')"></i>
          </div>
        </th>
        <th :style="cellStyle">
        <div class="header-table">
          <span>Имя сервера</span>
          <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="sortColumn.serverName ? 'fa-chevron-up' : 'fa-chevron-down'" @click="togglepanel('serverName')"></i>
        </div></th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>Проблема</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="sortColumn.problem ? 'fa-chevron-up' : 'fa-chevron-down'" @click="togglepanel('problem')"></i>
          </div>
        </th>
        <th class="rounded-tr" :style="cellStyle">
          <div class="header-table">
            <span>Длительность</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
               :class="sortColumn.duration ? 'fa-chevron-up' : 'fa-chevron-down'" @click="togglepanel('duration')"></i>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in servers" :key="item.id">
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
              color: item.serverStatus === false ? '#9E271E' :
                     item.serverStatus === true ? '#4CAF50' :
                     '#9E271E',

            }"
        >
          {{item.serverStatus == true ? item.serverStatus='Решена' : item.serverStatus ='Ошибка'}}
        </td>
        <td :style="cellStyle">{{ item.nameServer }}</td>
        <td :style="cellStyle">{{ item.problems }}</td>
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

tbody tr:hover td {
  background-color: rgba(0, 0, 0, 0.03);
}

th:not(:last-child),
td:not(:last-child) {
  border-right: none;
}

.header-table {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>