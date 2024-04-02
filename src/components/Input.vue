<template>
    <div class="input-component">
        <label>{{ props.inputLabel }}</label>
        <div class="password">
            <input :type="props.isPassword ? passwordType : props.inputType" :placeholder="props.inputPlaceholder" :value="modelValue" :style="props.style" @input="$emit('update:modelValue', $event.target.value)">
            <span v-if="props.isPassword">
                <svg v-if="passwordType === 'password'" @click="togglePasswordType" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 9.33398C11.206 9.33923 10.4459 9.65698 9.88447 10.2185C9.32299 10.7799 9.00524 11.54 9 12.334C9 13.976 10.358 15.334 12 15.334C13.641 15.334 15 13.976 15 12.334C15 10.693 13.641 9.33398 12 9.33398Z" fill="#B4BDC6"/>
                    <path d="M12 5.33398C4.36704 5.33398 2.07304 11.951 2.05204 12.018L1.94604 12.334L2.05105 12.65C2.07305 12.717 4.36704 19.334 12 19.334C19.633 19.334 21.927 12.717 21.948 12.65L22.054 12.334L21.949 12.018C21.927 11.951 19.633 5.33398 12 5.33398ZM12 17.334C6.64904 17.334 4.57604 13.488 4.07404 12.334C4.57804 11.176 6.65204 7.33398 12 7.33398C17.351 7.33398 19.424 11.18 19.926 12.334C19.422 13.492 17.348 17.334 12 17.334Z" fill="#B4BDC6"/>
                </svg>
                <svg v-else @click="togglePasswordType" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19C12.946 19 13.81 18.897 14.598 18.719L12.841 16.962C12.568 16.983 12.291 17 12 17C6.64898 17 4.57598 13.154 4.07398 12C4.45093 11.1588 4.96003 10.3834 5.58198 9.70303L4.18398 8.30503C2.64598 9.97203 2.06298 11.651 2.05198 11.684C1.983 11.8894 1.983 12.1117 2.05198 12.317C2.07298 12.383 4.36698 19 12 19ZM12 5.00003C10.163 5.00003 8.65398 5.39603 7.39598 5.98103L3.70698 2.29303L2.29298 3.70703L20.293 21.707L21.707 20.293L18.388 16.974C21.002 15.023 21.935 12.359 21.949 12.317C22.018 12.1117 22.018 11.8894 21.949 11.684C21.927 11.617 19.633 5.00003 12 5.00003ZM16.972 15.558L14.692 13.278C14.882 12.888 15 12.459 15 12C15 10.359 13.641 9.00003 12 9.00003C11.541 9.00003 11.112 9.11803 10.723 9.30903L8.91498 7.50103C9.9075 7.16044 10.9507 6.99103 12 7.00003C17.351 7.00003 19.424 10.846 19.926 12C19.624 12.692 18.76 14.342 16.972 15.558Z" fill="#8E9BAA"/>
                </svg>
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
    inputLabel: {
        type: String
    },
    inputType: {
        default: 'text',
        type: String
    },
    inputPlaceholder: {
        type: String
    },
    modelValue: {
        type: String
    },
    isPassword: {
        type: Boolean,
        default: false
    },
    style: {
        type: Object
    }
});
const passwordType = ref('password');

const togglePasswordType = () => {
    passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
}
</script>
