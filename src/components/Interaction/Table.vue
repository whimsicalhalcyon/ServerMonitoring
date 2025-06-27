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
      type: Object,
      default: null,
    },
    servers: {
      type: Array,
    },
    errorBlocks: {
      type: Array,
    },
    fetchErrorBlocks: Function,
  },
  data() {
    return {
      sortColumn: {
        dns: false,
        ip: false,
        group: false,
      },
      sortDirections: {
        dns: null,    // null → нет сортировки, true → A–Я, false → Я–А
        ip: null,
        group: null,
      }
    }
  },
  methods: {
    toggleSelect(item) {
      this.$emit('update:modelValue', this.modelValue?.id === item.id ? null : item);
    },
    togglepanel(column) {
      this.sortColumn[column] = !this.sortColumn[column];
      const current = this.sortDirections[column];
      if (current === null) this.sortDirections[column] = true;
      else if (current === true) this.sortDirections[column] = false;
      else this.sortDirections[column] = null;
    },
    getErrorColor(importance) {
      switch (importance) {
        case 0:
          return '#BDBDBD';       // Не классифицирована
        case 1:
          return '#4FC3F7';       // Информация
        case 2:
          return '#FFEB3B';       // предупреждение
        case 3:
          return '#FF9800';       // средняя
        case 4:
          return '#F44336';       // высокая
        case 5:
          return '#780303';       // критическая
      }
    },
    getTextColor(importance) {
      return importance === 2 ? 'black' : 'white';
    },
    getErrorTitle(importance) {
      switch (importance) {
        case 0:
          return 'Не классифицирована';
        case 1:
          return 'Информация';
        case 2:
          return 'Предупреждение';       // Средняя
        case 3:
          return 'Средняя';       // Предупреждение
        case 4:
          return 'Высокая';       // Информация
        case 5:
          return 'Критическая';
      }
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
    groupedErrors() {
      return this.errorBlocks.map((item) => {
        const errorCounts = {};
        // Собираем активные ошибки (state: false) из item.errors
        if (Array.isArray(item.errors)) {
          item.errors.forEach((error) => {
            if (error.serverId === item.id && Number.isInteger(error.importance) && error.state === false) {
              errorCounts[error.importance] = (errorCounts[error.importance] || 0) + 1;
            }
          });
        }
        // Собираем активные ошибки (state: false) из block.servers
        if (item.block && Array.isArray(item.block.servers)) {
          item.block.servers.forEach((server) => {
            if (server && Array.isArray(server.errors)) {
              server.errors.forEach((error) => {
                if (error.serverId === item.id && Number.isInteger(error.importance) && error.state === false) {
                  errorCounts[error.importance] = (errorCounts[error.importance] || 0) + 1;
                }
              });
            }
          });
        }
        // Преобразуем в массив и сортируем по importance
        return Object.entries(errorCounts)
            .map(([importance, count]) => ({
              importance: parseInt(importance),
              count,
            }))
            .sort((a, b) => a.importance - b.importance); // Сортировка для предсказуемого порядка
      });
    },
    sortedErrorBlocks() {
      let sorted = [...this.errorBlocks];

      const sorters = ['dns', 'ip', 'group'];

      sorters.forEach(column => {
        const dir = this.sortDirections[column];
        if (dir !== null) {
          sorted.sort((a, b) => {
            let valA, valB;

            if (column === 'dns') {
              valA = a.hostName || '';
              valB = b.hostName || '';
              return dir
                  ? valA.localeCompare(valB, 'ru')
                  : valB.localeCompare(valA, 'ru');
            }

            if (column === 'group') {
              valA = a.block?.name || '';
              valB = b.block?.name || '';
              return dir
                  ? valA.localeCompare(valB, 'ru')
                  : valB.localeCompare(valA, 'ru');
            }

            if (column === 'ip') {
              const ipToNumber = ip => ip.split('.')
                  .reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);

              valA = ipToNumber(a.ipAddres || '0.0.0.0');
              valB = ipToNumber(b.ipAddres || '0.0.0.0');

              return dir ? valA - valB : valB - valA;
            }
          });
        }
      });

      return sorted;
    }
    // filteredErrors() {
    //   return this.errorServers.filter(s =>
    //       s.errors?.some(e => e.state === false)
    //   );
    // }
  },
  mounted() {
    this.fetchErrorBlocks();
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
        <th :style="cellStyle">
          <div class="header-table">
            <span>DNS-имя</span>
            <i class="fa-solid" style="cursor: pointer;"
               :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
               :class="{
     'fa-sort-up': sortDirections.dns === true,
     'fa-sort-down': sortDirections.dns === false,
     'fa-sort': sortDirections.dns === null
   }" @click="togglepanel('dns')"></i>
          </div>
        </th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>IP-адрес</span>
            <i class="fa-solid " style="cursor: pointer;"
               :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
               :class="{
     'fa-sort-up': sortDirections.ip === true,
     'fa-sort-down': sortDirections.ip === false,
     'fa-sort': sortDirections.ip === null
   }" @click="togglepanel('ip')"></i>
          </div>
        </th>
        <th :style="cellStyle">Состояние</th>
        <th :style="cellStyle">Ошибки</th>
        <th :style="cellStyle">
          <div class="header-table">
            <span>Группа</span>
            <i class="fa-solid " style="cursor: pointer;"
               :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
               :class="{
     'fa-sort-up': sortDirections.group === true,
     'fa-sort-down': sortDirections.group === false,
     'fa-sort': sortDirections.group === null
   }" @click="togglepanel('group')"></i>
          </div>
        </th>
        <th class="rounded-tr" :style="cellStyle">Графики</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in sortedErrorBlocks" :key="item.id">
        <td :style="cellStyle">
          <button
              class="select-btn"
              :style="{
                borderColor: currTheme.borderColor,
                color: currTheme.borderColor
              }"
              @click="toggleSelect(item)"
          >
            <i class="fa-solid fa-check" v-if="this.modelValue?.id === item.id"></i>
          </button>
        </td>
        <td :style="cellStyle">{{ item.hostName }}</td>
        <td :style="cellStyle">{{ item.ipAddres }}</td>
        <td :style="{...cellStyle, color:item.state?'#4CAF50':'#9E271E'}">{{
            item.state ? 'Активировано' : 'Деактивировано'
          }}
        </td>
        <td :style="cellStyle" class="error-container" style="height: 100%">
          <div
              v-if="groupedErrors[index] && groupedErrors[index].length"
              v-for="error in groupedErrors[index]"
              :key="error.importance"
              class="error"
              :title="getErrorTitle(error.importance)"
              :style="{
                backgroundColor: getErrorColor(error.importance),
                color: getTextColor(error.importance),
              }"
          >
            {{ error.count }}
          </div>
          <span v-else :style="cellStyle">Нет ошибок</span>
        </td>
        <!--          <div v-if="item.errors.length" class="error" v-for="(error,index) in item.errors" :key="index" :style="{}" :title="error.type">-->
        <!--            {{error.count}}-->
        <!--          </div>-->
        <!--          <div class="error" style="background-color: #BDBDBD;" title="Не классифицирована">1</div>-->
        <!--          <div class="error" style="background-color: #4FC3F7;" title="Информация">2</div>-->
        <!--          <div class="error" style="background-color: #FFEB3B; color: black;" title="Предупреждение">4</div>-->
        <!--          <div class="error" style="background-color: #FF9800;" title="Средняя">6</div>-->
        <!--          <div class="error" style="background-color: #F44336;" title="Высокая">8</div>-->
        <!--          <div class="error" style="background-color: #B71C1C;" title="Критическая">2</div>-->
        <td :style="cellStyle">{{ item.block?.name }}</td>
        <td :style="cellStyle"><a :style="{color:currTheme.backgroundButton}" href="" class="link">Открыть</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
.header-table {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-container {
  font-size: 15px;
  overflow: hidden;
  border-radius: 8px;
  background: v-bind('currTheme.backgroundComponent');
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
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
  height: 100%;
  min-height: 49px;
  align-items: center;
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