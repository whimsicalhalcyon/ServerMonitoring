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
    problems : {
      type: Array,

    },

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
      },
      sortConfig: {
        column: null,
        ascending: 'asc'
      }
    }

  },
  methods: {
    toggleSelect(index) {
      this.$emit('update:isSelected', this.isSelected === index ? null : index);
    },
    togglepanel(column) {
      if (this.sortConfig.column === column) {
        this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortConfig.column = column;
        this.sortConfig.direction = 'asc';
      }

      Object.keys(this.sortColumn).forEach(key => {
        this.sortColumn[key] = false;
      });

      if (this.sortConfig.column) {
        this.sortColumn[this.sortConfig.column] = true;
      }
    },

    compareValues(a, b, column) {
      const valueGetters = {
        time: item => this.parseDate(item.createdAt),
        importance: item => parseInt(item.importance),
        recoveryTime: item => item.finishedAt ? this.parseDate(item.finishedAt) : new Date(0),
        state: item => item.state ? 1 : 0,
        serverName: item => this.findServerName(item.serverId),
        problem: item => item.message,
        duration: item => this.getDurationInMinutes(item.createdAt, item.finishedAt)
      };

      const getValue = valueGetters[column];
      const valA = getValue(a);
      const valB = getValue(b);

      if (typeof valA === 'string') return valA.localeCompare(valB);
      if (valA instanceof Date) return valA - valB;
      return valA - valB;
    },
    dateDifference(dateStart, dateEnd) {
      const start = new Date(dateStart)
      const end = !dateEnd || dateEnd === '-' ? new Date() : new Date(dateEnd);

      const diffInMilliseconds = end - start;
      if (diffInMilliseconds < 0) return "0 мин";

      const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

      const parts = [];
      if (days > 0) parts.push(`${days} д`);
      if (hours > 0) parts.push(`${hours} ч`);
      parts.push(`${minutes} мин`);

      return parts.join(' ') || '0 мин';

    },
    findServerName(serverId) {
      const server = this.servers.find(s => s.id === serverId);
      return server ? server.hostName : 'Неизвестный сервер';
    },
    resetSort() {
      this.sortConfig = {
        column: null,
        direction: 'asc'
      };
      Object.keys(this.sortColumn).forEach(key => {
        this.sortColumn[key] = false;
      });
    },
    handleSort(field) {
      if (field === 'serverGroup') {
        this.$emit('sort', 'group');
      } else {
        this.$emit('sort', field);
      }
    }
  },
  computed: {
    currTheme()
    {
      return this.themeStatus ? this.themeLight : this.themeDark;
    },
    cellStyle()
    {
      return {
        color: this.currTheme.textColor,
        // borderColor: this.currTheme.borderColor
      }
    },
    tableData()
    {
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
      }))
    }
  ,
    sortedProblems()
    {
      const allErrors = [];
      this.problems.forEach(server => {
        if (!server.errors) return;
        server.errors.forEach(error => {
          allErrors.push({
            ...error,
            serverName: server.hostName || 'Неизвестный сервер',
            ip: server.ipAddres || '—'
          });
        });
      });

      if (!this.sortConfig.column) return allErrors;

      const getValue = (item) => {
        switch (this.sortConfig.column) {
          case 'time':
            return new Date(item.createdAt);
          case 'importance':
            return parseInt(item.importance);
          case 'recoveryTime':
            return item.finishedAt ? new Date(item.finishedAt) : new Date(0);
          case 'state':
            return item.state ? 1 : 0;
          case 'serverName':
            return item.serverName;
          case 'problem':
            return item.message;
          case 'duration':
            return this.getDurationInMinutes(item.createdAt, item.finishedAt);
          default:
            return item[this.sortConfig.column];
        }
      };

      return allErrors.sort((a, b) => {
        const valA = getValue(a);
        const valB = getValue(b);

        if (typeof valA === 'string') return this.sortConfig.direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        return this.sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      });
    }
  },
  mounted() {
    console.log('Received problems:', this.problems);
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
               :class="[sortConfig.column === 'time'? (sortConfig.direction === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'): 'fa-chevron-down']" @click="togglepanel('time')"></i>
          </div>
        </th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>Важность</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
               :class="[sortConfig.column === 'importance'? (sortConfig.direction === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'): 'fa-chevron-down']" @click="togglepanel('importance')"></i>
          </div>
        </th>
        <th :style="cellStyle">
        <div class="header-table">
          <span>Время восстановления</span>
          <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
              :class="[sortConfig.column === 'recoveryTime'? (sortConfig.direction === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'): 'fa-chevron-down']" @click="togglepanel('recoveryTime')"></i>
        </div></th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>Состояние</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
               :class="[sortConfig.column === 'state'? (sortConfig.direction === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'): 'fa-chevron-down']" @click="togglepanel('state')"></i>
          </div>
        </th>
        <th :style="cellStyle">
        <div class="header-table">
          <span>Имя сервера</span>
          <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
             :class="[sortConfig.column === 'serverName'? (sortConfig.direction === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'): 'fa-chevron-down']" @click="togglepanel('serverName')"></i>
        </div></th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>Проблема</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
               :class="[sortConfig.column === 'problem'? (sortConfig.direction === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'): 'fa-chevron-down']" @click="togglepanel('problem')"></i>
          </div>
        </th>
        <th class="rounded-tr" :style="cellStyle">
          <div class="header-table">
            <span>Длительность</span>
            <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
                :class="[sortConfig.column === 'duration'? (sortConfig.direction === 'asc' ? 'fa-chevron-up' : 'fa-chevron-down'): 'fa-chevron-down']" @click="togglepanel('duration')"></i>
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in sortedProblems" :key="item.id">
        <td :style="cellStyle">
          {{item.createdAt
            ? item.createdAt.split('T')[0].split('-').reverse().join('.') + ' ' +
            item.createdAt.split('T')[1].substring(0,8)
            : '-' }}
        </td>

        <td class="name-mistake"
            :style="{
          ...cellStyle,
          color: item.importance === 5 ? '#B71C1C' :
                 item.importance === 4 ? '#F44336' :
                 item.importance === 3 ? '#FF9800' :
                 item.importance === 2 ? '#FFEB3B' :
                 item.importance === 1 ? '#4FC3F7' :
                 '#4CAF50'
        }">
          {{ item.importance === 5 ? 'Критическая' :
            item.importance === 4 ? 'Высокая' :
                item.importance === 3 ? 'Средняя' :
                    item.importance === 2 ? 'Предупреждение' :
                        item.importance === 1 ? 'Информация' : 'Не классифицирована' }}
        </td>

        <td :style="cellStyle" v-if="item.finishedAt">
          {{ item.finishedAt
            ? item.finishedAt.split('T')[0].split('-').reverse().join('.') + ' ' +
            item.finishedAt.split('T')[1].substring(0,8)
            : '-' }}
        </td>
        <td :style="cellStyle" style="text-align:center" v-else>
          -
        </td>

        <td class="status"
            :style="{
          ...cellStyle,
          color: item.state ? '#4CAF50' : '#9E271E'
        }">
          {{ item.state ? 'Решена' : 'Ошибка' }}
        </td>

        <td :style="cellStyle">{{ item.serverName }}</td>

        <td :style="cellStyle">{{ item.message }}</td>

        <td :style="cellStyle">{{ dateDifference(item.createdAt, item.finishedAt) }}</td>
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
  padding: 12px 10px;
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