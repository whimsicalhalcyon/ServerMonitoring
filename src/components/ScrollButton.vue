<script>
export default {
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>

<template>
  <button
      v-show="isVisible"
      @click="scrollToTop"
      class="scroll-to-top z-100 fixed bottom-8 right-8 w-12 h-12 bg-sky-400 text-white rounded-full shadow-lg hover:bg-green-80 transition-all duration-300 flex items-center justify-center cursor-pointer"
      aria-label="Вернуться наверх"
  >
    <i class="fa-solid fa-chevron-up text-xl"></i>
  </button>
</template>

<style scoped>

</style>