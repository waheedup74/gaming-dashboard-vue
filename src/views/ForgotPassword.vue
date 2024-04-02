<template>
    <div class="auth-container">
        <div class="left-container"></div>
        <div class="right-container">
            <div class="header">
                <div class="logo-container">
                    <img src="/images/app_logo_lg.png" alt="" />
                </div>
                <h2>DNA Bonus Engine</h2>
            </div>
            <h4>Forgot your password? <img src="/images/Lock.png" alt="lock"></h4>
            <div v-if="!linkSent"> 
            <p>No worries. Enter your email address and we will send you a link to reset your password.</p>
            <form @submit.prevent="submitForgotPasswordForm" autocomplete="off">
                <div>
                    <label for="email">Email</label>
                    <input v-model="forgotPasswordForm.email" type="text" placeholder="Enter your email address">
                     <div v-if="forgotPasswordFormErrors.email" class="error-message">{{ parseErrorMessage(forgotPasswordFormErrors.email).message }}</div>
                </div>
                <button type="submit" class="btn-lg">Send Link</button>
            </form>
            </div>
            <div v-if="linkSent" class="success-alert">
                <div>
                    <img src="/images/svg/alert-green-check.svg" alt="icon">
                </div>
                <div>
                    <h3>Almost there...</h3>
                    <p>A link to reset your password has been sent to your email address.</p>
                </div>
            </div>
            <div class="back-to-login">
                <img src="/images/svg/chevron-left.svg" alt="chevron-left">
                <router-link to="/login">
                    Back to Login 
                </router-link>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref, reactive } from "vue";
import { parseErrorMessage } from "@/utils";
import { z } from 'zod';
import api from "@/api/api";

const linkSent = ref(false);
const forgotPasswordForm = reactive({
    email: '',
})

const forgotPasswordFormErrors = reactive({
    email: '',
});

const forgotPasswordFormValidationSchemas = [
    // TODO remove the regex, just validate that there is a @ and at least one .
    { field: 'email', schema: z.string().regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, {message: 'Please enter a valid email address'})},
  ];

const submitForgotPasswordForm = async () => {
    for (const { field, schema } of forgotPasswordFormValidationSchemas) {
    try {
        schema.parse(forgotPasswordForm[field]);
        forgotPasswordFormErrors[field] = '';
    } catch (error) {
        forgotPasswordFormErrors[field] = error.message;
    }
    }
    if (Object.values(forgotPasswordFormErrors).some(error => error !== '')) {
    return;
    }
    
    const response = await api.auth.forgotPassword(forgotPasswordForm.email);
    if (response.status == 200) {
        linkSent.value = true;
    }

};
</script>
  