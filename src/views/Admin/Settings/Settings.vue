<template>
  <div>
      <div class="banner">
          <img src="/images/svg/settings.svg" alt=""/>
          <h1>Settings</h1>
      </div>
      <div class="right-btn-container">
          <button @click="showModal" class="btn-red-lg">
              <img src="/images/svg/warning-24.svg" alt="warning">
              Disable Bonuses</button>
      </div>
      <div class="settings-form-container">
          <form @submit.prevent="submitPragmaticForm" autocomplete="off">
              <div class="settings-card-container">
                  <div v-if="alertMessage" class="error-message" style="margin-bottom: 10px;">
                      <span>{{ alertMessage }}</span>
                  </div>
                  <h3>Pragmatic Play</h3>
                  <div class="from-group">
                      <div>
                          <label for="">Url</label>
                          <input v-model="pragmaticForm.url" type="text" placeholder="url.com">
                          <p v-if="pragmaticFormErrors.url" class="error-message">{{ parseErrorMessage(pragmaticFormErrors.url).message }}</p>
                      </div>
                      <div>
                          <label for="">username</label>
                          <input v-model="pragmaticForm.username" type="text" placeholder="username1">
                          <p v-if="pragmaticFormErrors.username" class="error-message" >{{ parseErrorMessage(pragmaticFormErrors.username).message }}</p>
                      </div>
                      <div>
                          <label for="">secret</label>
                          <input v-model="pragmaticForm.secret" type="password" placeholder="******">
                          <p v-if="pragmaticFormErrors.secret" class="error-message">{{ parseErrorMessage(pragmaticFormErrors.secret).message }}</p>
                      </div>
                  </div>
              </div>
              <div class="right-btn-container">
                  <button type="submit" class="btn-xl">Save</button>
              </div>
          </form>
      </div>
      <teleport to="body">
          <Modal v-if="isModalVisible" @close-modal="closeModal" :isOpen="isModalVisible">
              <div @click="closeModal" class="cross-button">
                  <img src="/images/svg/close-gray-32.svg" alt="close">
              </div>
              <div class="delete-modal">
                  <h1>Are you sure?</h1>
                  <p>
                      You are about to disable all bonuses <br /> for the brand: <span class="settings">{{ authStore.tenantName }}</span>
                  </p>
                  <div class="listButtons">
                      <button @click="closeModal" class="button cancel">Cancel</button>
                      <button @click="disbaleBonus" class="btn-red-lg">
                          Yes, disable all bonuses
                      </button>
                  </div>
              </div>
          </Modal>
      </teleport>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Modal from "@/components/Modal/PopoverModal.vue";
import { useAuthStore } from "@/stores/authStore";
import { parseErrorMessage } from "@/utils";
import { z } from 'zod';
import api from "@/api/api"; 
import router from "@/router/index";

const authStore = useAuthStore();
const isModalVisible = ref(false); 
const alertMessage = ref(''); 

const pragmaticForm = reactive({
  id: null,
  url: '',
  username: '',
  secret: '',
  tenantId: ''
})

const pragmaticFormErrors = reactive({
  url: '',
  username: '',
  secret: ''
});

const pragmaticFormValidationSchemas = [
  { field: 'url', schema: z.string().url({message: "Please enter a valid site url (http://www.site.com)"}) },
  { field: 'username', schema: z.string().min(3, {message: "Please enter username"}) },
  { field: 'secret', schema: z.string().min(3, {message: "Please enter your secret (minimum 3 character)"})},
];

const submitPragmaticForm = async () => {
  alertMessage.value = '';
  for (const { field, schema } of pragmaticFormValidationSchemas) {
  try {
      schema.parse(pragmaticForm[field]);
      pragmaticFormErrors[field] = '';
  } catch (error) {
      pragmaticFormErrors[field] = error.message;
  }
  }
  if (Object.values(pragmaticFormErrors).some(error => error !== '')) {
      return;
  }
  
  try {
      const response = await api.settingsApi.createOrUpdate(pragmaticForm); 

      if (response.status == 200) { 
          router.push('/');
      } else {
        alertMessage.value = 'An unexpected error occurred. Please try again later.';
      }
    } catch (error) {
      alertMessage.value = 'An unexpected error occurred. Please try again later.';
    }

};

const showModal = () => {  
isModalVisible.value = true;
};

const closeModal = () => {
isModalVisible.value = false;
};

const disbaleBonus = async () => {
closeModal();
};

onMounted(async () => {
  const response = await api.settingsApi.get(); 
  pragmaticForm.id = response.data.settings?.id; 
  pragmaticForm.url = response.data.settings?.url;
  pragmaticForm.username = response.data.settings?.username;
  pragmaticForm.secret = response.data.settings?.secret; 
})
</script>