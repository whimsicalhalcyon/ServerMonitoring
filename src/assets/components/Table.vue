<script>

</script>

<template>
  <div class="rounded-[12px] overflow-hidden">
    <table class="table-auto border-separate border-spacing-0 w-full text-left">
      <thead class="bg-neutral-50">
      <tr class="bg-neutral-300">
        <th class="px-4 py-2 border border-neutral-400 rounded-tl-[12px]"></th>
        <th class="px-4 py-2 border border-neutral-400">DNS-имя</th>
        <th class="px-4 py-2 border border-neutral-400">IP-адрес</th>
        <th class="px-4 py-2 border border-neutral-400">Состояние</th>
        <th class="px-4 py-2 border border-neutral-400 w-[280px]">Ошибки</th>
        <th class="px-4 py-2 border border-neutral-400">Группа</th>
        <th class="px-4 py-2 border border-neutral-400 rounded-tr-[12px]">Графики</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400" title="Это подсказка при наведении">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      <tr>
        <td class="px-4 py-2 border border-neutral-400">
          <button
              type="button"
              class="w-6 h-6 rounded-sm border-2 border-neutral-400 text-neutral-400 hover:border-sky-600 hover:text-sky-600 transition-colors flex items-center justify-center"
              aria-label="Выбрать строку"
          >
            <!-- Иконка "галочка" для выбранного состояния, пока просто пусто -->
          </button>
        </td>
        <td class="px-4 py-2 border border-neutral-400">server1.local</td>
        <td class="px-4 py-2 border border-neutral-400">192.168.0.1</td>
        <td class="px-4 py-2 border border-neutral-400 text-green-500">Активировано</td>
        <td class="px-4 py-2 border border-neutral-400 flex justify-between max-w-[280px]">
          <div class="error bg-neutral-400">1</div>
          <div class="error bg-sky-400">3</div>
          <div class="error bg-yellow-400">7</div>
          <div class="error bg-orange-400">1</div>
          <div class="error bg-red-500">4</div>
          <div class="error bg-red-800">6</div>
        </td>
        <td class="px-4 py-2 border border-neutral-400">APP</td>
        <td class="px-4 py-2 border border-neutral-400">Открыть</td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<style scoped>
tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}

tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}
.error{
  width: 25px;
  height: 25px;
  border-radius: 3px;
  text-align: center;
  color: white;
}
</style>