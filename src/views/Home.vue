<template>
    <p>username: {{authStore.userName}}</p>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();
</script>
