<script>

import UiInput from "@/components/UiInput.vue";
import UiSelect from "@/components/UiSelect.vue";
import MainButton from "@/components/MainButton.vue";
import ModalWindow from "@/components/ServerCharts/Components/ModalWindow.vue";
import Graphic from "@/components/ServerCharts/Components/Graphic.vue";

export default {
  components: {
    UiSelect, UiInput, Graphic, MainButton, ModalWindow
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
    }
  },
  data() {
    return {
      openPanel: true,
      modalWindow: false,
      valueDateStart: '',
      valueDateEnd: '',

    }
  },
  methods: {
    togglePanel() {
      this.openPanel = !this.openPanel
    },
    toggleWindow() {
      this.modalWindow = !this.modalWindow
    },
  },
}

</script>

<template>
  <div class="main">
    <div class="text">
      <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Мониторинг</p>
      <div class="">
        <i class="fa-solid fa-chevron-up " style="cursor: pointer;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"
           :class="openPanel ? 'fa-chevron-down' : 'fa-chevron-up'" @click="togglePanel"></i>
      </div>
    </div>
    <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
      <div class="top">
        <ui-input :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
        <ui-select :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          <option>Выбрать сервера</option>
          <option>Все</option>
          <option>web</option>
          <option>app</option>
        </ui-select>
        <ui-select :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          <option>Сортировка по имени</option>
          <option>Без сортировки</option>
          <option>По возрастанию</option>
          <option>По убыванию</option>
        </ui-select>
        <ui-select :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">
          <option>Выбрать интервал</option>
          <option>Последние 5 минут</option>
          <option>Последние 15 минут</option>
          <option>Последние 30 минут</option>
          <option>Последний час</option>
          <option>Последние 12 часов</option>
          <option>Последний день</option>
          <option>Последние 12 дней</option>

          </ui-select>
        </div>
        <div class="bottom">
          <ui-input class="date" placeholder="дд.мм.гггг 00:00"  :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">

          </ui-input>
          <ui-input class="date" placeholder="дд.мм.гггг 00:00" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></ui-input>
          <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Найти</main-button>
          <ui-select class="select" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" :style="themeStatus ? {borderColor: themeLight.borderColor, background: themeLight.backgroundComponent}: {borderColor: themeDark.borderColor, background: themeDark.backgroundComponent}">
            <option>Выбрать формат</option>
            <option>PDF</option>
            <option>PNG</option>
            <option>DOCX</option>
          </ui-select>
          <main-button class="btn" :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark">Выгрузить</main-button>
        </div>
      </div>
    </div>
    <div class="graphics">
      <div class="graphic" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}" v-for="n in 70" :key="n">
        <div class="top">
          <p :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}">Name server</p>
          <button style="background: none; cursor: pointer" class="setting"  @click="toggleWindow">
            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.4324 0C11.5799 4.64632e-06 11.7235 0.0468053 11.8426 0.133662C11.9618 0.220519 12.0503 0.342949 12.0954 0.483321L12.8615 2.86371C13.1832 3.02111 13.4911 3.198 13.7849 3.39718L16.2308 2.87068C16.375 2.83989 16.5253 2.85567 16.6599 2.91574C16.7946 2.97582 16.9067 3.07709 16.9802 3.20496L18.9107 6.54643C18.9844 6.67423 19.0156 6.82214 18.9998 6.96884C18.9841 7.11553 18.9221 7.25343 18.8229 7.36264L17.1445 9.21514C17.169 9.57036 17.169 9.92685 17.1445 10.2821L18.8229 12.1374C18.9221 12.2466 18.9841 12.3845 18.9998 12.5312C19.0156 12.6779 18.9844 12.8258 18.9107 12.9536L16.9802 16.2964C16.9065 16.424 16.7943 16.525 16.6597 16.5848C16.525 16.6447 16.3749 16.6602 16.2308 16.6293L13.7849 16.1028C13.4924 16.3006 13.1832 16.4789 12.8629 16.6363L12.0954 19.0167C12.0503 19.157 11.9618 19.2795 11.8426 19.3663C11.7235 19.4532 11.5799 19.5 11.4324 19.5H7.57141C7.42397 19.5 7.28033 19.4532 7.16118 19.3663C7.04203 19.2795 6.95353 19.157 6.90841 19.0167L6.14373 16.6377C5.82285 16.4808 5.51334 16.3016 5.21748 16.1014L2.77302 16.6293C2.62881 16.6601 2.47855 16.6443 2.34388 16.5843C2.20921 16.5242 2.09709 16.4229 2.02366 16.295L0.0931621 12.9536C0.0194445 12.8258 -0.01178 12.6779 0.00399087 12.5312C0.0197618 12.3845 0.0817131 12.2466 0.180912 12.1374L1.8593 10.2821C1.83499 9.92777 1.83499 9.57223 1.8593 9.21793L0.180912 7.36264C0.0817131 7.25343 0.0197618 7.11553 0.00399087 6.96884C-0.01178 6.82214 0.0194445 6.67423 0.0931621 6.54643L2.02366 3.20357C2.09729 3.07595 2.2095 2.97497 2.34415 2.91515C2.47881 2.85533 2.62896 2.83976 2.77302 2.87068L5.21748 3.39857C5.51277 3.19939 5.82198 3.01971 6.14373 2.86232L6.9098 0.483321C6.95477 0.343401 7.04286 0.221295 7.16145 0.13448C7.28004 0.0476655 7.42305 0.000592894 7.57002 0L11.4324 0ZM8.0812 1.39286L7.29005 3.85404L6.75659 4.1145C6.49434 4.24283 6.24118 4.38896 5.99888 4.55186L5.5058 4.88614L2.97638 4.34014L1.55566 6.80271L3.28977 8.72207L3.24798 9.31264C3.22797 9.60387 3.22797 9.89613 3.24798 10.1874L3.28977 10.7779L1.55288 12.6973L2.97498 15.1599L5.50441 14.6152L5.99748 14.9481C6.23978 15.111 6.49295 15.2572 6.7552 15.3855L7.28866 15.646L8.0812 18.1071H10.9254L11.7193 15.6446L12.2514 15.3855C12.5134 15.2575 12.7661 15.1113 13.0077 14.9481L13.4994 14.6152L16.0302 15.1599L17.4509 12.6973L15.7154 10.7779L15.7572 10.1874C15.7773 9.89567 15.7773 9.60294 15.7572 9.31125L15.7154 8.72068L17.4523 6.80271L16.0302 4.34014L13.4994 4.88336L13.0077 4.55186C12.7661 4.38863 12.5134 4.24249 12.2514 4.1145L11.7193 3.85543L10.924 1.39286H8.0812ZM9.50191 5.57143C10.6101 5.57143 11.673 6.01167 12.4566 6.7953C13.2402 7.57894 13.6805 8.64177 13.6805 9.75C13.6805 10.8582 13.2402 11.9211 12.4566 12.7047C11.673 13.4883 10.6101 13.9286 9.50191 13.9286C8.39368 13.9286 7.33085 13.4883 6.54721 12.7047C5.76358 11.9211 5.32334 10.8582 5.32334 9.75C5.32334 8.64177 5.76358 7.57894 6.54721 6.7953C7.33085 6.01167 8.39368 5.57143 9.50191 5.57143ZM9.50191 6.96428C8.76309 6.96428 8.05454 7.25778 7.53211 7.7802C7.00969 8.30262 6.7162 9.01118 6.7162 9.75C6.7162 10.4888 7.00969 11.1974 7.53211 11.7198C8.05454 12.2422 8.76309 12.5357 9.50191 12.5357C10.2407 12.5357 10.9493 12.2422 11.4717 11.7198C11.9941 11.1974 12.2876 10.4888 12.2876 9.75C12.2876 9.01118 11.9941 8.30262 11.4717 7.7802C10.9493 7.25778 10.2407 6.96428 9.50191 6.96428Z" fill="#757575"/>
            </svg>



          </button>
        </div>
        <graphic :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark"></graphic>
      </div>
    </div>
    <modal-window :themeStatus="themeStatus" :themeLight="themeLight" :themeDark="themeDark" v-model:openDialog="modalWindow"></modal-window>
  </div>


</template>

<style scoped>

.main .panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: fit-content;
  padding: 20px;
  border-radius: 12px;
  gap: 14px;
  margin-top: 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
}
.main .panel .top {
  display: flex;
  gap: 1.1%
}
.main .panel .bottom {
  display: flex;
  gap: 1.1%
}

.main .panel .bottom .date {
  width: 14.95%;
}
.main .panel .bottom .btn {
  width: 10%;
}
.main .panel .bottom .select {
  width: 10.8%;
  border: 1px solid;
  margin-left: auto;
}
.main .graphics {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1.1%;

}
.main .graphics .graphic {
  margin-top: 1.1%;
  width: 32.6%;
  height: 28%;
  border-radius: 12px;
  padding: 14px;
}
.main .graphics .graphic .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.main .graphics .graphic .top p {
  font-size: 18px;
}
.main .text {
  display: flex;
  gap: 8px;
  padding-top: 20px;
  align-items: center;
}
.main .text p {
  font-size: 28px;
}
.main .text i {
  margin-top: 4px;
  font-size: 18px;
}

</style>