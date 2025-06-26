<script>

import UiSelect from "@/components/UiSelect.vue";
import UiInput from "@/components/UiInput.vue";
import MainButton from "@/components/MainButton.vue";
import MistakeCheckbox from "@/components/Mistakes/MistakeCheckbox.vue";
import UiCheckboxInteraction from "@/components/UiCheckboxInteraction.vue";
import TableMistakes from "@/components/Mistakes/TableMistakes.vue";
import * as XLSX from "xlsx";

export default {
  components: {
    UiSelect, MainButton, UiInput, MistakeCheckbox, TableMistakes, UiCheckboxInteraction,
  },
  props: {
    themeLight: Object,
    themeDark: Object,
    themeStatus: Boolean,
    problems: {
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
      isSelected: null,
      appliedSearchTerm:'',
      selectGroupPanel: {
        status: '',
        group: '',
        startDate: '',
        endDate:''
      },
      currentSearch: '',
      currentIpSearch:'',
      checkedGroups: [],
      optionProblem: [
        {name: 'all', value: 'Любое'},
        {name: 'mistake', value: 'Ошибка'},
        {name: 'answer', value: 'Решено'}
      ],
      sortOptions: {
        field: null,
        direction: 'asc'
      },
      importanceOptions: [
        {value: 5, label: 'Критическая'},
        {value: 4, label: 'Высокая'},
        {value: 3, label: 'Средняя'},
        {value: 2, label: 'Предупреждение'},
        {value: 1, label: 'Информация'}
      ],
      filters : {
        group: '',
        error: '',
      }
    }
  },
  computed: {
    uniqueGroups() {
      const groups = new Map();
      this.problems.forEach(server => {
        if (server.block && server.block.id) {
          groups.set(server.block.id, server.block);
        }
      });
      return Array.from(groups.values());
    },
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

      return filtered;
    },
    sortedGroups() {
      let filtered = [...this.problems];

      if (this.filters.group) {
        filtered = filtered.filter(server =>
            server.block?.id === this.filters.group
        );
      }

      filtered = filtered.map(server => {
        const serverCopy = {...server};

        if (this.filters.error && serverCopy.errors) {
          if (this.filters.error === 'Ошибка') {
            serverCopy.errors = serverCopy.errors.filter(error => !error.state);
          } else if (this.filters.error === 'Решено') {
            serverCopy.errors = serverCopy.errors.filter(error => error.state);
          }
        }

        return serverCopy;
      }).filter(server => {
        return !this.filters.error ||
            (server.errors && server.errors.length > 0);
      });

      return filtered.sort((a, b) => {
        if (this.filters.group) {
          const aInGroup = a.block?.id === this.filters.group;
          const bInGroup = b.block?.id === this.filters.group;
          if (aInGroup && !bInGroup) return -1;
          if (!aInGroup && bInGroup) return 1;
        }
        const groupCompare = (a.block?.name || '').localeCompare(b.block?.name || '');
        if (groupCompare !== 0) return groupCompare;
        return (a.hostName || '').localeCompare(b.hostName || '');
      });
    },
    searchServers() {
      return this.sortedGroups.filter(item => item.hostName && item.hostName.toLowerCase().includes(this.currentSearch.toLowerCase()));
    }
  },
  methods: {
    findServerById(serverId) {
      return this.problems.find(s => s.idServer === serverId);
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    },

    exportToExcel() {
      const wb = XLSX.utils.book_new();

      const excelData = this.problems.map(problem => {
        const server = this.findServerById(problem.idServer);
        const duration = this.calculateDuration(problem.createdAt, problem.finishedAt);

        const durationFormatted = this.formatDuration(duration);

        return {
          'Сервер': server ? server.hostName : 'Неизвестно',
          'Важность': problem.message,
          'Дата возникновения': this.formatDate(problem.createdAt),
          'Дата решения': problem.finishedAt === '-' ? '-' : this.formatDate(problem.finishedAt),
          'Статус': problem.state ? 'Решено' : 'Ошибка',
          'Продолжительность': durationFormatted,
        };
      });

      const ws = XLSX.utils.json_to_sheet(excelData);

      XLSX.utils.book_append_sheet(wb, ws, "Ошибки серверов");

      const fileName = `server_errors_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, fileName);
    },

    formatDuration(ms) {
      if (!ms) return '-';

      const seconds = Math.floor(ms / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;

      let result = '';
      if (days > 0) result += `${days}д `;
      if (remainingHours > 0) result += `${remainingHours}ч `;
      if (remainingMinutes > 0) result += `${remainingMinutes}м `;
      if (remainingSeconds > 0 && days === 0) result += `${remainingSeconds}с`;

      return result.trim() || '-';
    },

    calculateDuration(start, end) {
      const startDate = new Date(start);
      const endDate = end ? new Date(end) : new Date();
      const diff = endDate - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      return `${days}д ${hours}ч ${minutes}м`;
    },
    toggleSort(field) {
      if (this.sortOptions.field === field) {
        this.sortOptions.direction = this.sortOptions.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortOptions.field = field;
        this.sortOptions.direction = 'asc';
      }
    },
    applyFilters() {
      this.appliedSearchTerm = this.currentSearch;
    },

    clearFilters() {
      this.selectGroupPanel = {
        status: '',
        group: '',
        startDate: '',
        endDate: ''
      };

      this.currentSearch = '';
      this.currentIpSearch = ''
      this.sortOptions = {
        field: null,
        direction: 'asc'
      };

      this.$refs.tableMistakes?.resetSort?.();
    },
  },
  mounted() {
    console.log('page problems:', this.problems);
  }
}
</script>

<template>
  <div class="main">
    <div class="main-top" :style="themeStatus ? {background: themeLight.background} : {background: themeDark.background}">
      <div class="text">
        <p :style="themeStatus ? {color: themeLight.textColor} : {color: themeDark.textColor}">Ошибки</p>
        <div class="themes" @click="$emit('changeTheme', !themeStatus)">
          <i class="fa-solid fa-sun" :class="themeStatus ? 'fa-moon' : 'fa-sun'"
             :style="themeStatus ? {color: themeDark.backgroundComponent} : {color: themeLight.backgroundComponent}"></i>
        </div>
      </div>

      <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent} : {background: themeDark.backgroundComponent}">
        <div class="top">
          <ui-input
              v-model="currentSearch"
              placeholder="Поиск по имени сервера"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
          </ui-input>

          <main-button
              style="width: 4%;"
              @click="exportToExcel"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
            <i class="fa-solid fa-file-excel"></i>
          </main-button>
        </div>

        <div class="line" :style="themeStatus ? {borderColor: themeLight.borderColor} : {borderColor: themeDark.borderColor}"></div>

        <div class="bottom">
          <ui-select
              v-model="filters.group"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
            <option value="">Все группы серверов</option>
            <option v-for="group in uniqueGroups" :key="group.id" :value="group.id">
              {{group.name}}
            </option>
          </ui-select>

          <ui-select
              v-model="filters.error"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
            <option value="">Состояние</option>
            <option v-for="option in optionProblem" :value="option.value">
              {{option.value }}
            </option>
          </ui-select>

          <ui-input
              v-model="selectGroupPanel.startDate"
              placeholder="Начальная дата"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
          </ui-input>

          <ui-input
              v-model="selectGroupPanel.endDate"
              placeholder="Конечная дата"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
          </ui-input>

          <main-button
              @click="applyFilters"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
            Найти
          </main-button>

          <main-button
              @click="clearFilters"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
              class="btn-close">
            Сбросить
          </main-button>
        </div>

        <div class="bottom-checkbox">
          <div class="textLeft">
            <p :style="themeStatus ? {color: themeLight.textCheckbox} : {color: themeDark.textCheckbox}">
              Тип ошибки:
            </p>
          </div>

          <div class="checkbox-group">
            <ui-checkbox-interaction
                :themeStatus="themeStatus"
                :themeLight="themeLight"
                :themeDark="themeDark">
            </ui-checkbox-interaction>
          </div>
        </div>
      </div>
    </div>

    <div class="table-mistakes">
      <table-mistakes
          ref="tableMistakes"
          :problems="searchServers"
          :themeStatus="themeStatus"
          :themeLight="themeLight"
          :themeDark="themeDark"
          :sortOptions="sortOptions"
          @sort="toggleSort">
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