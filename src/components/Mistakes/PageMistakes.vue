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
        startDate: '',
        endDate:'',
        search: ''
      },
      currentSearch: '',
      filteredServersData: [],
      selectedErrors: [],

      dateStart: '',
      dateEnd: '',
      selectGroup:'',
      sortGroup:'',
      selectMistake:'',
      inputSearch: '',
      nameServer:'',
      errorFinal: []
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
    toggleCheckBox(type) {
      const index = this.checkedGroups.indexOf(type);
      if (index === -1) {
        this.checkedGroups.push(type);
      } else {
        this.checkedGroups.splice(index, 1);
      }
    },

    clearFilters() {
      this.filters = {
        group: '',
        error: '',
        startDate: '',
        endDate: '',

        checkedGroups: []
      };
      this.currentSearch =''
      this.errorFinal = this.problems;
    },
    isValidDateTime(dateTimeString) {
      const regex = /^(\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}|\d{4}-\d{2}-\d{2} \d{2}:\d{2})$/;
      if (!regex.test(dateTimeString)) return false;

      const date = new Date(dateTimeString.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'));
      return !isNaN(date.getTime());
    },
    filterByDateTime() {
      try {
        if (this.filters.startDate && !this.isValidDateTime(this.filters.startDate)) {
          throw new Error('Некорректная начальная дата/время');
        }

        if (this.filters.endDate && !this.isValidDateTime(this.filters.endDate)) {
          throw new Error('Некорректная конечная дата/время');
        }

        let filtered = [...this.problems];
        filtered = this.applyGroupFilter(filtered);
        filtered = this.applyErrorStatusFilter(filtered);
        filtered = this.applySearchFilter(filtered);
        filtered = this.applyImportanceFilter(filtered);
        filtered = this.applyDateFilter(filtered);

        this.errorFinal = filtered;
        return this.errorFinal;

      } catch (error) {
        console.error('Ошибка фильтрации:', error);
        return this.errorFinal;
      }
    },
    applySearchFilter(filtered) {
      if (this.currentSearch !== '') {
        console.log(filtered.filter(elem => elem.hostName.toLowerCase().includes(this.inputSearch.toLowerCase())))
        return filtered.filter(elem => elem.hostName.toLowerCase().includes(this.inputSearch.toLowerCase()))
      }
      else {
        return filtered
      }
    },
    applyGroupFilter(filtered) {
      if (!this.filters.group || this.filters.group === "Все") {
        return filtered;
      }
      return filtered.filter(server =>
          server.block?.id === this.filters.group
      );
    },

    applyErrorStatusFilter(filtered) {
      if (this.filters.error) {
        return filtered.map(server => {
          if (!server.errors) return server;

          const serverCopy = {...server};
          if (this.filters.error === 'Ошибка') {
            serverCopy.errors = serverCopy.errors.filter(e => !e.state);
          } else if (this.filters.error === 'Решено') {
            serverCopy.errors = serverCopy.errors.filter(e => e.state);
          }
          return serverCopy;
        }).filter(server =>
            !this.filters.error || (server.errors && server.errors.length > 0)
        );
      }
      return filtered;
    },

    applyImportanceFilter(filtered) {
      if (this.checkedGroups.length > 0) {
        return filtered.filter(server => {
          if (!server.errors || server.errors.length === 0) return false;
          return server.errors.some(error =>
              this.checkedGroups.includes(Number(error.importance))
          );
        }).map(server => ({
          ...server,
          errors: server.errors.filter(error =>
              this.checkedGroups.includes(Number(error.importance))
          )
        }));
      }
      return filtered;
    },
    parseDateTime(dateString) {
      if (!dateString) return null;
      // Обрабатываем оба формата: datetime-local и строковый
      return new Date(dateString.includes('T') ? dateString :
          dateString.replace(/(\d{2})\.(\d{2})\.(\d{4})/, '$3-$2-$1'));
    },

    applyDateFilter(filtered) {
      const startDate = this.parseDateTime(this.filters.startDate);
      const endDate = this.parseDateTime(this.filters.endDate);

      if (!startDate && !endDate) return filtered;

      return filtered.filter(server => {
        if (!server.errors || server.errors.length === 0) return false;

        return server.errors.some(error => {
          const errorDate = new Date(error.createdAt);
          return (!startDate || errorDate >= startDate) &&
              (!endDate || errorDate <= endDate);
        });
      });
    },

    uniqueGroups() {
      if (this.serverGroup.length > 0) {
        return this.serverGroup;
      }
      const blocks = this.problems.filter(server => server.block).map(server => server.block);
      return [...new Set(blocks)];
    },

  },
  computed: {
    thisGroups() {
      const uniqueGroups = [];
      const seenIds = new Set();

      this.problems.forEach(server => {
        if (server.block && !seenIds.has(server.block.id)) {
          seenIds.add(server.block.id);
          uniqueGroups.push(server.block);
        }
      });

      return uniqueGroups.sort((a, b) => a.name.localeCompare(b.name));
    }
  },
  mounted() {
    console.log('page problems:', this.problems);
    this.$watch('checkedGroups', (newVal) => {
      console.log('checkedGroups changed:', newVal);
    }, { deep: true });
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
              id="inputIp"
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
          <ui-select id="filterSelectGroup" class="select"
                     :themeStatus="themeStatus"
                     :themeLight="themeLight" :themeDark="themeDark"
                     v-model="filters.group">
            <option disabled value="">Выбрать группу</option>
            <option value="Все">Все</option>
            <option v-for="group in thisGroups" :key="group.id" :value="group.id">
              {{ group.name }}
            </option>
          </ui-select>

          <ui-select
              id="selectError"
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
              id="inputStartDate"
              v-model="filters.startDate"
              placeholder="Начальная дата"
              type="datetime-local"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
          </ui-input>

          <ui-input
              id="inputEndDate"
              @change="filterByDateTime"
              v-model="filters.endDate"
              placeholder="Конечная дата"
              type="datetime-local"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark">
          </ui-input>

          <main-button
              @click="filterByDateTime"
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
            <ui-checkbox-interaction class="check" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" v-model="checkedGroups"></ui-checkbox-interaction>
          </div>
        </div>
      </div>
    </div>

    <div class="table-mistakes">
      <table-mistakes
          ref="tableMistakes"
          :problems="errorFinal.length > 0 ? errorFinal : problems"
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