<script>
import UiInput from "@/components/UiInput.vue";
import UiSelect from "@/components/UiSelect.vue";
import MainButton from "@/components/MainButton.vue";
import DisabledButton from "@/components/Interaction/DisabledButton.vue"
import UiRadio from "@/components/UiRadio.vue";



export default {
  // components: {
  //   UiRadio, UiSelect, MainButton, DisabledButton, UiInput
  // },
  // data() {
  //   return {
  //     openPanel: true,
  //   }
  // },
  // methods: {
  //   togglePanel() {
  //     this.openPanel = !this.openPanel
  //   },
  // }
}
</script>

<template>
  <div></div>
<!--  <div class="container-full m-5 mt-5 w-full flex flex-col items-center">-->
<!--    <div class="fix flex flex-col sticky top-0 z-30 w-full max-w-[1780px] xl:max-w-[1920px] 2xl:max-w-[2300px] bg-[#f5f5f5] rounded-b-xl pb-5">-->
<!--      <div class="container-title flex items-center">-->
<!--        <h1 class="text-4xl text-green-70 mb-5 mt-5">Ошибки</h1>-->
<!--      </div>-->
<!--      <div class="container-scroll flex flex-end justify-end ml-5">-->
<!--        <i class="fa-solid fa-chevron-up text-zinc-300 hover:text-zinc-500 cursor-pointer duration-300"-->
<!--           :class="openPanel ? 'fa-chevron-down' : 'fa-chevron-up'" @click="togglePanel"></i>-->
<!--      </div>-->

<!--      &lt;!&ndash; Панель фильтрации &ndash;&gt;-->
<!--      <section class="section-menu w-full max-w-[1780px] xl:max-w-[1920px] 2xl:max-w-[2300px] bg-white rounded-xl px-5 py-5 text-neutral-500">-->
<!--        <div class="flex items-center justify-between">-->
<!--          &lt;!&ndash; Важность &ndash;&gt;-->
<!--          <div class="flex flex-col">-->
<!--            <label class="text-xl text-neutral-800">Важность:</label>-->
<!--            <ui-select />-->
<!--          </div>-->

<!--          &lt;!&ndash; Состояние &ndash;&gt;-->
<!--          <div class="flex flex-col">-->
<!--            <label class="text-xl text-neutral-800">Состояние:</label>-->
<!--            <ui-select />-->
<!--          </div>-->

<!--          &lt;!&ndash; Время &ndash;&gt;-->
<!--          <div class="flex items-center gap-4">-->
<!--            <label class="text-xl text-neutral-800 min-w-[70px]">Время:</label>-->
<!--            <ui-radio />-->
<!--          </div>-->

<!--          &lt;!&ndash; Кнопки &ndash;&gt;-->
<!--          <div class="flex">-->
<!--            <disabled-button class="bg-neutral-400">Сбросить</disabled-button>-->
<!--            <main-button class="ml-3">Применить</main-button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </section>-->
<!--    </div>-->

<!--    &lt;!&ndash; Таблица &ndash;&gt;-->
<!--    <section class="table-section w-full max-w-[1780px] xl:max-w-[1920px] 2xl:max-w-[2300px]">-->
<!--      <Table />-->
<!--    </section>-->
<!--  </div>-->
<!--  <scroll-button></scroll-button>-->
</template>


<style scoped>
div {
  background: red;
  width: 500px;
  height: 500px;
}
</style>