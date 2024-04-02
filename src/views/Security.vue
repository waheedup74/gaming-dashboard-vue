<template>
  <div>
  <AccountMenu />
  <div class="card-wrapper">
    <div class="card">
      <h3>Change Password</h3>
      <form @submit.prevent="changePassword" method="post" autocomplete="off">
        <label for="">Old Password</label>
        <input v-model="changePasswordForm.oldPassword" type="password" placeholder="Old Password"  :style="[{'margin-bottom': changePasswordFormErrors.oldPassword ? '0px' : '24px'}]"/>
        <div v-if="changePasswordFormErrors.oldPassword" class="error-message" style="margin-bottom: 24px;" >{{ parseErrorMessage(changePasswordFormErrors.oldPassword).message }}</div>  

        <label for="">New Password</label>
        <input v-model="changePasswordForm.newPassword" type="password" placeholder="New Password" :style="[{'margin-bottom': changePasswordFormErrors.newPassword ? '0px' : '24px'}]">
        <div v-if="changePasswordFormErrors.newPassword" class="error-message" style="margin-bottom: 24px;">{{ parseErrorMessage(changePasswordFormErrors.newPassword).message }}</div>   

        <label for="">Confirm New Password</label>
        <input v-model="changePasswordForm.confirmPassword" type="password" placeholder="Confirm New Password" :style="[{'margin-bottom': changePasswordFormErrors.confirmPassword ? '0px' : '24px'}]">
        <div v-if="changePasswordFormErrors.confirmPassword" class="error-message" style="margin-bottom: 24px;">{{ parseErrorMessage(changePasswordFormErrors.confirmPassword).message }}</div>    

        <div class="right-btn-container">
          <button type="submit" class="btn-lg">Save</button>
        </div>
      </form>
    </div>

    <div class="card twofa-container">
      <h3>Two-factor authentication (2FA)</h3>
      <!-- <h3>{{ authStore.tfaEnabled ? 'Disable' : 'Enable' }} 2fa</h3> -->
      <form @submit.prevent="toggleTfa" method="post" autocomplete="off">
        <div class="twofa-form" v-if="!authStore.tfaEnabled">
          <div class="qrcode-container">
            <qrcode-vue :value="tfaForm.tfaUri" :size="240" level="H" />
          </div>
          <div>
            <div  v-if="!authStore.tfaEnabled">
              <label for="">Backup code</label>
              <input v-model="tfaForm.tfaKey" type="text" disabled :style="[{'margin-bottom': tfaFormErrors.tfaKey ? '0px' : '24px'}]">
            </div>
            <div>
              <label for="">2fa code</label>
              <input v-model="tfaForm.tfaToken" type="text" placeholder="123456" :style="[{'margin-bottom': tfaFormErrors.tfaToken ? '0px' : '24px'}]">
              <div v-if="tfaFormErrors.tfaToken" class="error-message" style="margin-bottom: 24px;">{{ parseErrorMessage(tfaFormErrors.tfaToken).message }}</div>   
            </div>
            <div class="tfa-status">
             Currently: <span v-if="authStore.tfaEnabled" class="enable">Enabled</span> 
             <span v-if="!authStore.tfaEnabled" class="disable">Disabled</span>
            </div>
          </div>

        </div>
        <div class="right-btn-container">
          <button type="submit" class="btn-lg">{{ authStore.tfaEnabled ? 'Disable 2FA' : 'Enable 2FA' }}</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script setup>
import { onMounted, reactive} from 'vue';
import QrcodeVue from 'qrcode.vue';
import api from '@/api/api';
import { useAuthStore } from '@/stores/authStore';
import AccountMenu from '@/components/AccountMenu.vue';
import { z } from 'zod';
import { parseErrorMessage } from "@/utils";

const authStore = useAuthStore();

const tfaForm = reactive({
    tfaKey: '',
    tfaUri: '',
    tfaToken: '',
})

const tfaFormErrors = reactive({
    tfaKey: '',
    tfaToken: '',
});

const tfaFormValidationSchemas = [
    { field: 'tfaToken', schema: z.string().min(6, {message: 'Code must be 6 characters or more'}) },
];

onMounted(async () => {
  if (!authStore.tfaEnabled) {
    const response = await api.auth.getTfaCode();
    tfaForm.tfaKey = response.data.tfaKey;
    tfaForm.tfaUri = response.data.uri;
    tfaForm.tfaToken = '';
  }
});

async function toggleTfa() {
  for (const { field, schema } of tfaFormValidationSchemas) {
        try {
            schema.parse(tfaForm[field]);
            tfaFormErrors[field] = '';
        } catch (error) {
            tfaFormErrors[field] = error.message;
        }
  }

  if (Object.values(tfaFormErrors).some(error => error !== '')) {
        return;
  }

  const response = await api.auth.toggleTfa(tfaForm.tfaToken);
  if (response.status == 200) {
    tfaForm.tfaKey = '';
    tfaForm.tfaUri = '';
    tfaForm.tfaToken = '';
    authStore.toggleTfa();
    // TODO return this with the first request
    if (!authStore.tfaEnabled) {
      const response = await api.auth.getTfaCode();
      tfaForm.tfaKey = response.data.tfaKey;
      tfaForm.tfaUri = response.data.uri;
    }
  }
}

const changePasswordForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
})

const changePasswordFormErrors = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const changePasswordFormValidationSchemas = [
    { field: 'oldPassword', schema: z.string().min(8, {message: 'Old password required'}) },
    { field: 'newPassword', schema: z.string().min(8, {message: 'Password must be at least 8 characters long'}) },
    { field: 'confirmPassword', schema: z.string().refine(() =>  {return changePasswordForm.newPassword === changePasswordForm.confirmPassword}, {message: "Passwords do not match."}) },
];

async function changePassword() {
  for (const { field, schema } of changePasswordFormValidationSchemas) {
        try {
            schema.parse(changePasswordForm[field]);
            changePasswordFormErrors[field] = '';
        } catch (error) {
            changePasswordFormErrors[field] = error.message;
        }
  }

  if (Object.values(changePasswordFormErrors).some(error => error !== '')) {
        return;
  }

  const response = await api.auth.changePassword(changePasswordForm.oldPassword, changePasswordForm.newPassword);
  if (response.status == 200) {
    alert('success');
  } else {
    alert('false');
  }
}
</script>