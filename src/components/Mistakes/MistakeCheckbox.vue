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
      checkboxId: `checkbox-${Math.random().toString(36).substr(2, 9)}`
    }
  }
  ,

  computed: {
    textColor() {
      return this.themeStatus ? this.themeLight.textCheckbox : this.themeDark.textCheckbox;
    }
  },
  methods: {
    toggleCheckbox() {
      const checkbox = document.getElementById(this.checkboxId);
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
      }
    }
  }
}
</script>

<template>
  <div class="errorGroup">
    <input type="checkbox" :id="'error' + i">
    <label :style="themeStatus?{color:themeLight.textCheckbox}:{color:themeDark.textCheckbox}"></label>
    <span
        class="slot-content"
        :style="{ color: textColor, fontSize: '14px' }"
        @click="toggleCheckbox"
    >
      <slot></slot>
    </span>
  </div>
</template>

<style scoped>
.errorGroup {
  display: flex;
  gap: 1.18%;
  justify-content: space-between;
  align-items: center;
}

.errorBlock {
  display: flex;
  align-items: center;
  width: 15.68%;
}

label {
  margin-left: 10px;
  font-size: 14px;
}

.errorBlock input[type="checkbox"] {
  margin-right: 10%;
  transform: scale(1.1);
}

.slot-content {
  cursor: pointer
}
</style>