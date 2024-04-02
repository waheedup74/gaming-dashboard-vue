<template>
    <div class="accounts-section">
        <div class="account-banner">
           <div class="img-container">
               <img src="/images/master_account.png" alt=""  />
           </div>
            <h1>Account</h1>
        </div>
        <div class="desktop-tabs">
            <!-- <router-link to="/account" @click="switchTab('account')" :class="{ active: tab === 'account' }" class="tab">
                Account 
            </router-link> -->
            <router-link to="/security" @click="switchTab('security')" :class="{ active: tab === 'security' }" class="tab">
                 SECURITY 
            </router-link>
            <router-link to="/sessions"  @click="switchTab('sessions')" :class="{ active: tab === 'sessions' }" class="tab">
                 SESSIONS 
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const tab = ref(null);

const switchTab = (type) => {
    tab.value = type;
};
</script>