<script>

export default {
  data() {
    return {
      showButton: false,
    };
  },
  props : {
    openMonitor: {
      type: Boolean,
      default: false
    },
    openInteraction: {
      type: Boolean,
      default: false
    },
    openMistakes: {
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showButton = window.scrollY > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },

}
</script>

<template>
  <div class="panel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
    <div class="buttons">
      <button class="button">
        <i class="fa-solid fa-database" @click="$emit('open-mistakes')"></i>
     </button>

      <button class="button">
        <i class="fa-solid fa-database" @click="$emit('open-interaction', true)"></i>
      </button>

      <button class="button check" :style="themeStatus ? {background: themeLight.panelButton}: {background: themeDark.panelButton}" @click="$emit('open-monitor')">
        <i class="fa-solid fa-database"></i>
      </button>

      <button class="theme" v-on:click="$emit('changeTheme', !themeStatus)" >
        <svg width="31" height="25" viewBox="0 0 31 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.4 3.125C11.78 3.125 11.3667 2.70833 11.3667 2.08333V1.04167C11.3667 0.416667 11.78 0 12.4 0C13.02 0 13.4333 0.416667 13.4333 1.04167V2.08333C13.4333 2.70833 13.02 3.125 12.4 3.125Z" fill="#757575"/>
          <path d="M5.06333 6.14583C4.75333 6.14583 4.54667 6.04167 4.34 5.83333L2.17 3.64583C1.75667 3.22917 1.75667 2.60417 2.17 2.1875C2.58333 1.77083 3.20333 1.77083 3.61667 2.1875L5.78667 4.375C6.2 4.79167 6.2 5.41667 5.78667 5.83333C5.58 6.04167 5.37333 6.14583 5.06333 6.14583Z" fill="#757575"/>
          <path d="M2.06667 13.5417H1.03333C0.413333 13.5417 0 13.125 0 12.5C0 11.875 0.413333 11.4583 1.03333 11.4583H2.06667C2.68667 11.4583 3.1 11.875 3.1 12.5C3.1 13.125 2.68667 13.5417 2.06667 13.5417Z" fill="#757575"/>
          <path d="M2.89333 23.125C2.58333 23.125 2.37667 23.0208 2.17 22.8125C1.75667 22.3958 1.75667 21.7708 2.17 21.3542L4.34 19.1667C4.75333 18.75 5.37333 18.75 5.78667 19.1667C6.2 19.5833 6.2 20.2083 5.78667 20.625L3.61667 22.8125C3.41 23.0208 3.20333 23.125 2.89333 23.125Z" fill="#757575"/>
          <path d="M12.4 25C11.78 25 11.3667 24.5833 11.3667 23.9583V22.9167C11.3667 22.2917 11.78 21.875 12.4 21.875C13.02 21.875 13.4333 22.2917 13.4333 22.9167V23.9583C13.4333 24.5833 13.02 25 12.4 25Z" fill="#757575"/>
          <path d="M21.7 21.875C16.5333 21.875 12.4 17.7083 12.4 12.5C12.4 7.29167 16.5333 3.125 21.7 3.125C26.8667 3.125 31 7.29167 31 12.5C31 17.7083 26.8667 21.875 21.7 21.875Z" fill="#757575"/>
          <path d="M10.3333 12.5C10.3333 9.27083 11.6767 6.35417 13.7433 4.27083C13.33 4.16667 12.9167 4.16667 12.4 4.16667C7.85333 4.16667 4.13333 7.91667 4.13333 12.5C4.13333 17.0833 7.85333 20.8333 12.4 20.8333C12.9167 20.8333 13.33 20.8333 13.7433 20.7292C11.6767 18.6458 10.3333 15.7292 10.3333 12.5Z" fill="#757575"/>
        </svg>
      </button>
    </div>

    <div v-if="showButton"  @click="scrollToTop" class="scroll-to-top"><img src="../assets/svg/up-square-svgrepo-com.svg" class="img"></div>
  </div>

</template>

<style scoped>
.panel {
  width: 80px;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  z-index: 111;
}

.buttons {
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 20px;


}
.button {
  width: 80px;
  height: 44px;
  background: none;
  cursor: pointer;


}
.button:hover {
  background: #3E3E40;
  border-right: 3px solid #757575;
}
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  cursor: pointer;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;



}
.img {
  width: 34px;
  height: 34px;
  stroke: #212121;
}

.theme {
  height: 48px;
  background: none;
  cursor: pointer;
}

</style>


