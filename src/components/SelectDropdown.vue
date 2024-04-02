<template>
  <div>
    <div class="custom-select-container">
      <div :class="{ 'focused': isFocused, 'no-outline': !props.isOutline }" @click="toggleDropdown" :style="props.customStyle" @focusout="handleClose" class="custom-select" tabindex="0" ref="dropdownRef">
        <div v-if="!selectedOption" class="default-option">
          {{ props.placeholder || 'Select an option' }}
        </div>
        <div v-else class="selected-option">
          {{ selectedOption }}
        </div>
      </div>
      <div @click="toggleDropdown(true)" class="dropdown-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path :class="{ 'focused-dropdown': isFocused }" d="M17.2656 7.63281L12 12.8985L6.73436 7.63281L5 9.36717L12 16.3672L19 9.36717L17.2656 7.63281Z" fill="#B4BDC6" />
        </svg>
      </div>
      <div v-if="isFocused" :style="{ position: props.position }" class="options-list">
        <div v-for="option in props.dataList" @click="selectOption(option)" :key="option.name" class="custom-option">
          {{ option.name }}
        </div>
        <div v-if="props.isCreateList" class="custom-option" >
          <div @click="props.onClick" class="create-list-option">
            <img src="/images/svg/plus-gray-24.svg" alt="icon">
            <p>
              Create new list
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue';
const emits = defineEmits(['selected']);
const props = defineProps({
  position: String,
  name: String,
  customStyle: Object,
  dataList: Array,
  isOutline: {
    default: true,
    type: Boolean
  },
  isCreateList: {
    default: false,
    type: Boolean
  },
  onClick: {
    type: Function
  },
  dropdownValue: {
    type: Object
  },
  defaultValue: {
    type: String,
    default: ''
  },
  placeholder: String
});
const selectedOption = ref(props.defaultValue);
const isFocused = ref(false);
const dropdownRef = ref(null);

watch(() => props.dropdownValue, (newValue, oldValue) => {
      if (newValue !== oldValue) {
        selectedOption.value = newValue.name
      }
    });

const selectOption = (option) => {
  selectedOption.value = option.name;
  nextTick(() => {
    emits('selected', { option: option.name, id: option.id, name: props.name });
    handleClose();
  });
};

const handleClose = () => {
  setTimeout(() => {
    isFocused.value = false;
  }, 250);
};

const toggleDropdown = (icon) => {
  isFocused.value = !isFocused.value;
  if (icon && isFocused.value) {
    dropdownRef.value.focus();
  }
};
</script>

<style scoped>
.create-list-option {
  display: flex; 
  column-gap: 8px;
  & p {
    margin: 0;
  }
}
</style>