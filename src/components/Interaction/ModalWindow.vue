<script>
import UiInput from '@/components/UiInput.vue';
import UiSelect from '@/components/UiSelect.vue';
import MainButton from '@/components/MainButton.vue';

export default {
  components: {
    UiInput, MainButton, UiSelect
  },
  props: {
    openDialog: {
      type: Boolean,
      default: false
    },
    themeStatus: {
      type: Boolean,
      default: true
    },
    themeLight: {
      type: Object,
      required: true
    },
    themeDark: {
      type: Object,
      required: true
    },
  },
  methods: {
    hideWindow() {
      this.$emit("update:openDialog", false);
    }
  }
}
</script>

<template>
  <div v-if="openDialog" class="dialog-overlay">
    <div
        class="dialog-content"
        :style="themeStatus
        ? { background: themeLight.backgroundComponent, color: themeLight.textColor }
        : { background: themeDark.backgroundComponent, color: themeDark.textColor }"
    >
      <h1 class="dialog-title" :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }">
        Добавление узла
      </h1>

      <div class="dialog-inputs">
        <div class="dialog-field">
          <label class="dialog-label" for="ip"
                 :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
          >IP-адрес:</label>
          <ui-input
              id="ip"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
          />
        </div>

        <div class="dialog-field">
          <label class="dialog-label" for="dns"
                 :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
          >Доменное имя:</label>
          <ui-input
              id="dns"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
          />
        </div>

        <div class="dialog-field">
          <label class="dialog-label" for="group"
                 :style="themeStatus ? { color: themeLight.textColor } : { color: themeDark.textColor }"
          >Группа:</label>
          <ui-select
              id="group"
              :themeStatus="themeStatus"
              :themeLight="themeLight"
              :themeDark="themeDark"
          >
            <option>APP</option>
            <option>APP2006</option>
            <option>IvanZolo2004</option>
          </ui-select>
        </div>
      </div>

      <div class="dialog-buttons">
        <main-button
            :themeStatus="themeStatus"
            :themeLight="themeLight"
            :themeDark="themeDark"
            @click="hideWindow"
        >Сохранить</main-button>

        <main-button
            :themeStatus="themeStatus"
            :themeLight="themeLight"
            :themeDark="themeDark"
            @click.stop="hideWindow"
            class="drop"
        >
          Отмена
        </main-button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}
.drop{
  background: #757575 !important;
}
.dialog-content {
  background-color: #ffffff;
  border-radius: 12px;
  min-width: 470px;
  min-height: 430px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 10001;
}

.dialog-title {
  font-size: 28px;
  color: #212121;
  text-align: center;
  font-family:"Segoe UI Semibold";
}

.dialog-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialog-field {
  display: flex;
  flex-direction: column;
}

.dialog-label {
  margin-bottom: 7px;
  font-size: 14px;
  color: #333;
}

.dialog-buttons {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
input{
  width: 100%;
}
select{
  width: 100%;
}
button{
  width: 48%;
}
</style>
