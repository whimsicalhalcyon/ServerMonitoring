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
    }
  },
  data() {
    return {
      openPanel: true,
    }
  },
  methods: {
    togglePanel() {
      this.openPanel = !this.openPanel
    },
  }
  // data() {
  //   return {
  //     panelVisible: true
  //   }
  // }
}
</script>

<template>
  <div class="main">
    <div class="panel" v-if="openPanel" :style="themeStatus ? {background: themeLight.backgroundComponent}: {background: themeDark.backgroundComponent}">
    </div>
    <div class="table"></div>
  </div>

<!--  <div class="flex flex-col w-full px-4 xl:px-8 2xl:px-16">-->
<!--    &lt;!&ndash; Заголовок + панель &ndash;&gt;-->
<!--    <div class="sticky top-0 z-30 w-full bg-[#f5f5f5] rounded-b-xl pb-5 shadow-sm">-->
<!--      <div class="flex items-center gap-[15px] py-5">-->
<!--        <h1 class="text-4xl text-black-700">Узлы сети</h1>-->
<!--        <button-->
<!--            @click="panelVisible = !panelVisible"-->
<!--            class="text-black-700 hover:text-black-900 transition text-xl"-->
<!--            title="Свернуть/развернуть"-->
<!--        >-->
<!--          <i :class="panelVisible ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down'"></i>-->
<!--        </button>-->
<!--      </div>-->

<!--      &lt;!&ndash; Панель управления &ndash;&gt;-->
<!--      <transition name="fade">-->
<!--        <section-->
<!--            v-if="panelVisible"-->
<!--            class="w-full bg-white rounded-xl px-5 py-5 text-neutral-500 shadow"-->
<!--        >-->
<!--          &lt;!&ndash; Верхняя часть &ndash;&gt;-->
<!--          <div class="flex flex-wrap justify-between items-center gap-4">-->
<!--            <div class="flex flex-wrap gap-4">-->
<!--              <UiInput class="w-[280px] max-w-full" />-->
<!--              <MainButton @click="$emit('open-modal')">Добавить узел</MainButton>-->
<!--              <MainButton class="w-10"><i class="fa-solid fa-file-excel"></i></MainButton>-->
<!--            </div>-->

<!--            <div class="flex items-center gap-3 border rounded-lg border-neutral-400 px-3 py-2 h-12 min-w-[280px]">-->
<!--              <p class="text-sm">Выбранный узел:</p>-->
<!--              <div class="flex gap-3">-->
<!--                <button class="svg bg-sky-400 hover:bg-sky-700">-->
<!--                  <i class="fa-solid fa-pen-to-square"></i>-->
<!--                </button>-->
<!--                <button class="svg bg-red-500 hover:bg-red-800">-->
<!--                  <i class="fa-solid fa-trash"></i>-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--          <div class="my-5 h-px bg-neutral-400 w-full"></div>-->

<!--          &lt;!&ndash; Нижняя часть &ndash;&gt;-->
<!--          <div class="flex flex-wrap justify-between gap-5">-->
<!--            <div class="flex flex-col gap-2">-->
<!--              <p class="text-xl text-neutral-800">Тип ошибки:</p>-->
<!--              <div class="flex flex-wrap gap-3">-->
<!--                <UiCheckbox v-for="i in 6" :key="i" />-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="flex flex-col gap-2">-->
<!--              <p class="text-xl text-neutral-800">Состояние:</p>-->
<!--              <UiSelect />-->
<!--            </div>-->

<!--            <div class="flex flex-col gap-2">-->
<!--              <p class="text-xl text-neutral-800">Группа:</p>-->
<!--              <UiSelect />-->
<!--            </div>-->

<!--            <div class="flex items-end">-->
<!--              <div class="flex gap-3">-->
<!--                <DisabledButton class="bg-neutral-400">Сбросить</DisabledButton>-->
<!--                <MainButton>Применить</MainButton>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </section>-->
<!--      </transition>-->
<!--    </div>-->

<!--    &lt;!&ndash; Таблица &ndash;&gt;-->
<!--    <section class="mt-6 w-full">-->
<!--      <Table />-->
<!--    </section>-->
<!--  </div>-->
</template>

<style scoped>
  .main {
    width: 100%;
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
    position: sticky;
    top: 0;
    z-index: 1000;
  }
</style>