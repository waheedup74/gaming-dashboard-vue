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
      <h4>Welcome to our back office <img src="/images/wave-hand.png" alt="hand"></h4>
      <p>Please sign-in to your account to access all our features</p>
      <form autocomplete="off">
        <div class="">
          <label for="username">USERNAME</label>
          <input v-model="loginForm.username" type="text" placeholder="Username" id="username"/>
          <div v-if="loginFormErrors.username" class="error-message">{{ parseErrorMessage(loginFormErrors.username).message }}</div>
        </div>
        <div class="">
          <label for="password">PASSWORD</label>
        <div class="password">
            <input v-model="loginForm.password" :type="passwordType" placeholder="Password" id="password">
          <img v-if="passwordType === 'password'" @click="togglePasswordType" src="/images/svg/show.svg" alt="">
          <img v-else @click="togglePasswordType" src="/images/svg/hide.svg" alt="">
        </div>
          <div v-if="loginFormErrors.password" class="error-message" >{{ parseErrorMessage(loginFormErrors.password).message }}</div>
        </div>

        <div class="right-btn-container">
          <router-link to="/forgot-password">
            Forgot Password?
          </router-link>
        </div>
        <button @click="login()" type="submit" class="btn-lg">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import router from "@/router/index";
import api from "@/api/api";
import { useAuthStore } from "@/stores/authStore";
import { parseErrorMessage } from "@/utils";
import { z } from 'zod';

const authStore = useAuthStore();
const passwordType = ref('password');

const loginForm = reactive({
    username: '',
    password: ''
})

const loginFormErrors = reactive({
    username: '',
    password: ''
});

const loginFormValidationSchemas = [
    { field: 'username', schema: z.string().min(3, {message: "Username must be at least 3 characters"}) },
    { field: 'password', schema: z.string().min(8, {message: "Password must be at least 8 characters"})},
  ];

const submitLoginForm = () => {
    for (const { field, schema } of loginFormValidationSchemas) {
    try {
        schema.parse(loginForm[field]);
        loginFormErrors[field] = '';
    } catch (error) {
        loginFormErrors[field] = error.message;
    }
    }
    if (Object.values(loginFormErrors).some(error => error !== '')) {
    return;
    }
    login();
};

async function login() {
  // TODO validation
    router.push("/");
}

const togglePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
}
</script>
