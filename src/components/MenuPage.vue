<script>

export default {
  props : {
    openMonitor :{
      type:Boolean,
      default: false
    }
  }
}
</script>

<template>
  <div class="container-menu-page bg-white h-250 text-neutral-500 py-5" >
    <div class="container-list flex flex-col items-center">
      <div class="elem-list hover:bg-neutral-100 w-25 flex items-center justify-center p-4 mb-1 hover:border-r-4 active:border-r-4 duration-100">
        <i class="fa-solid fa-database text-2xl"></i>
      </div>
      <div class="elem-list hover:bg-neutral-100 w-25 flex items-center justify-center p-4 mb-1 hover:border-r-4 active:border-r-4 duration-100" @click="$emit('open-monitor')" :class="{'border-r-4 bg-neutral-100' : openMonitor}">
        <i class="fa-solid fa-desktop text-2xl" ></i>
      </div>
      <div class="elem-list hover:bg-neutral-100 w-25 flex items-center justify-center p-4 mb-1 hover:border-r-4 active:border-r-4 duration-100">
        <i class="fa-solid fa-user-tie text-2xl"></i>
      </div>
    </div>
<!--переключатель тем-->
<!--    <div class="change-theme flex flex-col items-center">-->
<!--      <i class="fa-regular fa-sun"></i>-->
<!--      <i class="fa-solid fa-moon"></i>-->
<!--    </div>-->
  </div>
</template>

<style scoped>

</style>