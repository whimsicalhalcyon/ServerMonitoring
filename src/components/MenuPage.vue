<script>
export default {
  data() {
    return {
      showButton: false,
      isHovered: true,
    };
  },
  props: {
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
    checkButton: {
      type: Number,
      required: true
    }
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
    handleButtonClick(buttonId) {
      this.$emit('button-clicked', buttonId);
    }
  },
  computed: {
    themeStatusE() {
      if (this.isHovered) {
        return this.themeStatus ? this.themeDark.backgroundFilter : this.themeLight.backgroundFilter;
      } else {
        return this.themeStatus ? this.themeLight.backgroundFilter : this.themeDark.backgroundFilter;
      }
    },
    checkMistakes() {
      return this.checkButton === 1
          ? (this.themeStatus ? this.themeLight.background : this.themeDark.background) : 'none';
    },
    checkInteraction() {
      return this.checkButton === 2
          ? (this.themeStatus ? this.themeLight.background : this.themeDark.background) : 'none';
    },
    checkMonitor() {
      return this.checkButton === 3
          ? (this.themeStatus ? this.themeLight.background : this.themeDark.background) : 'none';
    }
  }
}
</script>

<template>
  <div class="panel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
    <div class="buttons">
      <button class="button" @click="handleButtonClick(1)" :style="{background: checkMistakes, borderColor: themeDark.borderColor}">
        <i class="fa-solid fa-bug" style="font-size: 18px;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"></i>
      </button>

      <button class="button" @click="handleButtonClick(2)" :style="{background: checkInteraction, borderColor: themeDark.borderColor}">
        <i class="fa-solid fa-server" style="font-size: 18px;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"></i>
      </button>

      <button class="button" @click="handleButtonClick(3)" :style="{background: checkMonitor, borderColor: themeDark.borderColor}">
        <i class="fa-solid fa-chart-line" style="font-size: 18px;" :style="themeStatus ? {color: themeLight.textColor}: {color: themeDark.textColor}"></i>
      </button>
    </div>

    <div v-if="showButton" @click="scrollToTop" class="scroll-to-top"><img src="../assets/svg/up-square-svgrepo-com.svg" class="img"></div>
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
</style>