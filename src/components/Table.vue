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
    isSelected:{
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
        background: this.currTheme.backgroundComponent,
        color: this.currTheme.textColor,
        border: `1px solid ${this.currTheme.borderColor}`
      };
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
      <tr v-for="i in 70" key="i">
        <td :style="cellStyle">
          <button
              class="select-btn"
              :style="{
                borderColor: currTheme.borderColor,
                color: currTheme.borderColor
              }"
              @click="toggleSelect(i)"
          >
            <i class="fa-solid fa-check" v-if="isSelected===i"></i>
          </button>
        </td>
        <td :style="cellStyle">server1.local</td>
        <td :style="cellStyle">192.168.0.1</td>
        <td :style="cellStyle">Активировано</td>
        <td :style="cellStyle" class="error-container">
          <div class="error" style="background-color: #BDBDBD;" title="Это подсказка">1</div>
          <div class="error" style="background-color: #4FC3F7;">3</div>
          <div class="error" style="background-color: #FFEB3B; color: black;">7</div>
          <div class="error" style="background-color: #FF9800;">1</div>
          <div class="error" style="background-color: #F44336;">4</div>
          <div class="error" style="background-color: #B71C1C;">6</div>
        </td>
        <td :style="cellStyle">APP</td>
        <td :style="cellStyle"><a>Открыть</a></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>

.table-container {
  border-radius: 12px;
  overflow: hidden;
}

.custom-table {
  width: 100%;
  border-collapse: separate; /* это важно для границ */
  border-spacing: 0;
  text-align: left;
}

th,
td {
  padding: 12px;
  vertical-align: middle;
  box-sizing: border-box;
}

th.rounded-tl {
  border-top-left-radius: 12px;
}

th.rounded-tr {
  border-top-right-radius: 12px;
}

tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
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
  gap: 4px;
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