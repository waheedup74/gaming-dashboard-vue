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
            <h4>Reset your password <img src="/images/Lock.png" alt="lock"></h4>
            <div v-if="!linkSent">
                <p>Your new password must be different from previously used passwords.</p>
                <form @submit.prevent="submitresetPasswordForm" autocomplete="off">
                    <div>
                        <label for="">New Password</label>
                        <div class="password">
                            <input v-model="resetPasswordForm.newPassword" :type="newPasswordType" placeholder="Password">
                            <img v-if="newPasswordType === 'password'" @click="toggleNewPasswordType" src="/images/svg/show.svg" alt="">
                            <img v-else @click="toggleNewPasswordType" src="/images/svg/hide.svg" alt="">
                        </div>
                        <div v-if="resetPasswordFormErrors.newPassword" class="error-message" >{{ parseErrorMessage(resetPasswordFormErrors.newPassword).message }}</div>          
                    </div>
                    <div>
                        <label for="">Confirm Password</label>
                        <div class="password">
                            <input v-model="resetPasswordForm.confirmPassword" :type="confirmPasswordType" placeholder="Password">
                            <img v-if="confirmPasswordType === 'password'" @click="toggleConfirmPasswordType" src="/images/svg/show.svg" alt="">
                            <img v-else @click="toggleConfirmPasswordType" src="/images/svg/hide.svg" alt="">
                        </div>
                    <div v-if="resetPasswordFormErrors.confirmPassword" class="error-message" >{{ parseErrorMessage(resetPasswordFormErrors.confirmPassword).message }}</div>          
                    </div>
                    <div v-if="showError" class="error-message" style="margin-bottom: 10px;"> 
                        <span>Invalid token or email. Please double-check your information and try again.</span> 
                    </div>
                    <button type="submit" class="btn-lg">Reset Password</button>
                </form>
            </div>
            <div v-if="linkSent" class="success-alert">
                <div>
                    <img src="/images/svg/alert-green-check.svg" alt="icon">
                </div>
                <div>
                    <h3>Well done!</h3>
                    <p>You have successfully reset your password.</p>
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
import { ref, reactive} from "vue";
import { parseErrorMessage } from "@/utils";
import { z } from 'zod';
import { useRoute, useRouter } from "vue-router";
import api from "@/api/api";

const route = useRoute(); 
const router = useRouter();
const newPasswordType = ref('password');
const confirmPasswordType = ref('password');
const linkSent = ref(false);
const showError = ref(false);
const passMinLength = 8;

const resetPasswordForm = reactive({
   newPassword: '',
   confirmPassword: '',
})

const resetPasswordFormErrors = reactive({
    newPassword: '',
   confirmPassword: '',
});

const resetPasswordFormValidationSchemas = [
    { field: 'newPassword', schema: z.string().min(passMinLength, {message: ` Password must be at least ${passMinLength} characters long`}) },
    { field: 'confirmPassword', schema: z.string().refine(() =>  {return resetPasswordForm.newPassword === resetPasswordForm.confirmPassword}, {message: "Passwords do not match."}) },
  ];

const submitresetPasswordForm = async () => { 
    showError.value = false;

    if (!route.query.email || !route.query.token)
    {
        showError.value = true;
        return;
    }

    for (const { field, schema } of resetPasswordFormValidationSchemas) {
        try {
            schema.parse(resetPasswordForm[field]);
            resetPasswordFormErrors[field] = '';
        } catch (error) {
            resetPasswordFormErrors[field] = error.message;
        }
    }
    if (Object.values(resetPasswordFormErrors).some(error => error !== '')) {
        return;
    }
 
    try {
        const response = await api.auth.resetPassword(route.query.email, route.query.token, resetPasswordForm.confirmPassword); 

        if (response.status == 200) {
            linkSent.value = true
            router.push('/');
        } else {
          showError.value = true;
        }
      } catch (error) {
          showError.value = true;
      }
};

const toggleNewPasswordType = () => {
    newPasswordType.value = newPasswordType.value === 'password' ? 'text' : 'password';
}

const toggleConfirmPasswordType = () => {
    confirmPasswordType.value = confirmPasswordType.value === 'password' ? 'text' : 'password';
}
</script>
  