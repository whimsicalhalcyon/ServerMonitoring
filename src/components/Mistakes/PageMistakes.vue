<script>

import UiSelect from "@/components/UiSelect.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import MistakeCheckbox from "@/components/Mistakes/MistakeCheckbox.vue";
import UiCheckboxInteraction from "@/components/UiCheckboxInteraction.vue";
import TableMistakes from "@/components/Mistakes/TableMistakes.vue";

export default {
  components: {
    UiSelect, MainButton, UiInput, MistakeCheckbox, TableMistakes, UiCheckboxInteraction,
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
    problems: {
      type: Array,
      default: () => []
    },
    servers: {
      type: Array,
      default: () => []
    },
    serverGroup: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openPanel: true,
      optionProblem: [
        {name: 'all', value: 'Любое' },
        {name: 'mistake', value: 'Ошибка' },
        {name: 'answer', value: 'Решено' }
      ],
      sortOptions: {
        field: null,
        direction: 'asc' // 'asc' или 'desc'
      },
      currentSearch: '',
      activeSearch: '',
      currentIpSearch: '',
      activeFilters: {
        group: '',
        status: 'Любое',
        startDate: '',
        endDate: '',
        errorTypes: [],
        importance: []
      },
      filters: {
        group: '',
        status: 'Любое',
        startDate: '',
        endDate: '',
        errorTypes: [],
        importance: []
      },
      importanceOptions: [
        { value: 'Критическая', label: 'Критическая' },
        { value: 'Высокая', label: 'Высокая' },
        { value: 'Средняя', label: 'Средняя' },
        { value: 'Информация', label: 'Информация' }
      ]
    }
  },
  computed: {
    filteredProblems() {
      let filtered = [...this.problems];

      // Фильтрация по группе серверов
      if (this.filters.group) {
        filtered = filtered.filter(problem => {
          const server = this.findServerById(problem.idServer);
          return server && server.idServerGroup === this.filters.group;
        });
      }

      // Фильтрация по статусу
      if (this.filters.status && this.filters.status !== "Любое") {
        filtered = filtered.filter(problem => {
          return this.filters.status === "Ошибка" ? !problem.statusProblem : problem.statusProblem;
        });
      }

      // Поиск по имени сервера
      if (this.currentSearch) {
        const searchTerm = this.currentSearch.toLowerCase();
        filtered = filtered.filter(problem => {
          const server = this.findServerById(problem.idServer);
          return server && server.nameServer.toLowerCase().includes(searchTerm);
        });
      }

      if (this.currentIpSearch) {
        const searchTerm = this.currentIpSearch.toLowerCase();
        filtered = filtered.filter(problem => {
          const server = this.findServerById(problem.idServer);
          return server && server.ipAdress.toLowerCase().includes(searchTerm);
        });
      }

      // Фильтрация по типу ошибки
      if (this.filters.errorTypes.length > 0) {
        filtered = filtered.filter(problem =>
            this.filters.errorTypes.includes(problem.typeError)
        );
      }

      // Фильтрация по важности
      if (this.filters.importance.length > 0) {
        filtered = filtered.filter(problem =>
            this.filters.importance.includes(problem.errorImportanceText)
        );
      }

      // Фильтрация по дате (если нужно)
      // if (this.filters.startDate) {...}
      // if (this.filters.endDate) {...}

      // Сортировка
      if (this.sortOptions.field) {
        filtered.sort((a, b) => {
          let field = this.sortOptions.field;
          let valueA = a[field];
          let valueB = b[field];

          // Для специальных полей
          if (field === 'serverName') {
            const serverA = this.findServerById(a.idServer);
            const serverB = this.findServerById(b.idServer);
            valueA = serverA ? serverA.nameServer : '';
            valueB = serverB ? serverB.nameServer : '';
          } else if (field === 'duration') {
            valueA = this.calculateDuration(a.dateTimeProblem, a.dateProblemSolution);
            valueB = this.calculateDuration(b.dateTimeProblem, b.dateProblemSolution);
          }

          // Сравнение значений
          if (valueA < valueB) {
            return this.sortOptions.direction === 'asc' ? -1 : 1;
          }
          if (valueA > valueB) {
            return this.sortOptions.direction === 'asc' ? 1 : -1;
          }
          return 0;
        });
      }

      return filtered;
    }
  },
  methods: {
    findServerById(serverId) {
      return this.servers.find(s => s.idServer === serverId);
    },

    calculateDuration(start, end) {
      const startDate = new Date(start);
      const endDate = end === '-' ? new Date() : new Date(end);
      return endDate - startDate;
    },
    applyFilters() {
      this.activeSearch = this.currentSearch;
      this.activeFilters = JSON.parse(JSON.stringify(this.filters));
    },
    toggleSort(field) {
      if (this.sortOptions.field === field) {
        // Изменяем направление сортировки, если поле то же
        this.sortOptions.direction = this.sortOptions.direction === 'asc' ? 'desc' : 'asc';
      } else {
        // Устанавливаем новое поле и направление по умолчанию
        this.sortOptions.field = field;
        this.sortOptions.direction = 'asc';
      }
    },

    clearFilters() {
      this.filters = {
        group: '',
        status: 'Любое',
        startDate: '',
        endDate: '',
        errorTypes: [],
        importance: []
      };
      this.currentSearch = '';
      this.sortOptions = {
        field: null,
        direction: 'asc'
      };
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
  }
}
</script>

<template>
  <div class="main">
    <div class="main-top" :style="themeStatus ? {background: themeLight.background}: {background: themeDark.background}">
      <div class="text">
        <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Ошибки</p>
        <div class="themes" v-on:click="$emit('changeTheme', !themeStatus)">
          <i class="fa-solid fa-sun" :class="themeStatus ? 'fa-moon': 'fa-sun'"
             :style="themeStatus ? {color: themeDark.backgroundComponent}: {color: themeLight.backgroundComponent}"></i>
        </div>
      </div>
      <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
        <div class="top">
          <ui-input
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              v-model="currentSearch"
              placeholder="Поиск по имени сервера"
              @input="currentSearch = $event.target.value">
          </ui-input>
          <main-button
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              style="width: 4%;">
            <i class="fa-solid fa-file-excel"></i>
          </main-button>
        </div>
        <div class="line"
             :style="themeStatus?{borderColor:themeLight.borderColor}:{borderColor:themeDark.borderColor}"></div>
        <div class="bottom">
          <ui-select
              class="select"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              id="selectGroup"
              v-model="filters.group">
            <option value="">Все группы серверов</option>
            <option v-for="group in serverGroup" :key="group.idServerGroup" :value="group.idServerGroup">
              {{group.nameServerGroup}}
            </option>
          </ui-select>

          <ui-select
              class="select"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              v-model="filters.status">
            <option v-for="option in optionProblem" :value="option.value">{{option.value}}</option>
          </ui-select>

          <ui-input
              class="date"
              placeholder="Начальная дата"
              type="datetime-local"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              v-model="filters.startDate">
          </ui-input>

          <ui-input
              class="date"
              placeholder="Конечная дата"
              type="datetime-local"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              v-model="filters.endDate">
          </ui-input>
          <main-button
              class="btn"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
          @click="applyFilters">Найти</main-button>
          <main-button
              class="btn btn-close"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              @click="clearFilters">
            Сбросить
          </main-button>
        </div>
        <div class="bottom-checkbox">
          <div class="textLeft">
            <p style="margin-bottom: 10px;"
               :style="themeStatus ? {color: themeLight.textCheckbox} : {color: themeDark.textCheckbox}">
              Тип ошибки:
            </p>
          </div>
          <ui-checkbox-interaction
              class="check"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              v-model="filters.errorTypes">
          </ui-checkbox-interaction>

        </div>
      </div>
    </div>

    <div class="table-mistakes">
      <table-mistakes
          :problems="filteredProblems"
          :servers="servers"
          :themeStatus="themeStatus"
          :themeLight="themeLight"
          :themeDark="themeDark"
          :sortOptions="sortOptions"
          @sort="toggleSort"
          class="table-mistakes">
      </table-mistakes>
    </div>
  </div>
</template>

<style scoped>

.main {
  width: 100%;
  height: 100%;
}

.main .main-top {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  z-index: 1000;
  padding-bottom: 1.1%;
}
.themes {
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin-left: auto;
}

.text i {
  margin-top: 4px;
  font-size: 18px;
}
.main .panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 12px;
  gap: 14px;
  margin-top: 20px;
}
.main .panel .top {
  display: flex;
  gap: 1.1%
}
.main .panel .bottom {
  display: flex;
  gap: 1.1%
}

.line {
  border-bottom: 1px solid;
}

.check {
  gap: 1.1%;
}


.bottom-checkbox {
  display: flex;
  flex-direction: column;
}

.main .panel .bottom .date {
  width: 14.95%;
}
.main .panel .bottom .btn {
  width: 10%;
}

.download {
  width: 2%;
}

.mistakes {
  font-size: 32px;
}

.select-data, .btn-data {
  width: 10%;
}

.btn-close {
  background: #757575 !important;
}

.main .main-top .text {
  display: flex;
  gap: 8px;
  padding-top: 20px;
  align-items: center;

}
.main .main-top .text p {
  font-size: 28px;
}


</style>