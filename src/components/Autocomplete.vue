<template>
  <div class="autocomplete search-field-container">
    <input type="text" v-model="searchQuery" @input="handleInput" class="input-field" :disabled="isDisabled"/>
    <span>
      <img src="/images/svg/search-24.svg" alt="search">
    </span>
    <ul v-if="showSuggestions" class="suggestions">
      <li v-for="(item, index) in items" :key="index" @click="selectItem(item)" class="suggestion">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineExpose, computed } from 'vue'; 

const props = defineProps({ 
  fetchItems: {
    type: Function,
    required: true
  },
  itemSelected: {
    type: Function,
    required: true
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

const searchQuery = ref('');
const items = ref([]);
const showSuggestions = ref(false);

const handleInput = async () => {
  showSuggestions.value = true;
  items.value = await props.fetchItems(searchQuery.value); 
};

const selectItem = (item) => {
  searchQuery.value = item.name;
  showSuggestions.value = false;
  props.itemSelected(item); 
};
  
defineExpose({ searchQuery });
</script>

<style scoped>
.autocomplete {
  position: relative;
  display: inline-block;
}

.input-field {
  padding-right: 20px;  
  width: 100%;
  padding-left: 50px;
  -webkit-box-sizing: border-box; 
  -moz-box-sizing: border-box; 
  box-sizing: border-box; 
}

.suggestions {
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.suggestion {
  padding: 8px 12px;
  cursor: pointer;
}

.suggestion:hover {
  background-color: #f0f0f0;
}

.autocomplete {
  width: 100%;
}
</style>
