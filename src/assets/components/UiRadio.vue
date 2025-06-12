<script setup lang="ts">
</script>

<template>
  <div class="flex flex-row gap-3">
    <!-- Радио кнопки в строку -->
    <div class="flex flex-row gap-5 flex-wrap">
      <label class="flex items-center gap-2 cursor-pointer whitespace-nowrap">
        <input type="radio" name="time" value="day" class="form-radio text-blue-600" />
        <span>За день</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer whitespace-nowrap">
        <input type="radio" name="time" value="week" class="form-radio text-blue-600" />
        <span>За неделю</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer whitespace-nowrap">
        <input type="radio" name="time" value="month" class="form-radio text-blue-600" />
        <span>За месяц</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer whitespace-nowrap">
        <input type="radio" name="time" value="custom" class="form-radio text-blue-600" />
        <span>Выбрать период</span>
      </label>
    </div>

    <div class="mt-3 flex flex-col gap-4">
      <div class="flex flex-wrap gap-6 items-center">
        <label for="start-date" class="flex flex-col text-neutral-700 text-sm">
          С:
          <input
              type="date"
              id="start-date"
              class="mt-1 rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label for="start-time" class="flex flex-col text-neutral-700 text-sm">
          Время:
          <input
              type="time"
              id="start-time"
              class="mt-1 rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>

      <div class="flex flex-wrap gap-6 items-center">
        <label for="end-date" class="flex flex-col text-neutral-700 text-sm">
          По:
          <input
              type="date"
              id="end-date"
              class="mt-1 rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label for="end-time" class="flex flex-col text-neutral-700 text-sm">
          Время:
          <input
              type="time"
              id="end-time"
              class="mt-1 rounded border border-gray-300 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
