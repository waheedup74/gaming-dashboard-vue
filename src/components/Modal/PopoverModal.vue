<template>
  <div class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits();

const closeModal= () => {
  emits('close-modal');
}
</script>
