<template>
  <AccountMenu/>
  <div class="account-detail"> 
    <div class="card">
      <h3>Sessions</h3>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><span>Date</span></th>
              <th><span>IP</span></th>
              <th><span>Device</span></th>
              <th><span>Country</span></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(session, index) in 6" :key="index">
              <td>2024-04-20</td>
              <td>167.195.100.30</td>
              <td>Windows</td>
              <td>UK</td>
              <td>
                <button @click.prevent="logoutSession(session.id)" class="table-btn">Logout</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api/api';
import AccountMenu from '@/components/AccountMenu.vue';
const sessions = ref([]);

onMounted(async () => {
  getSessions();
});

const getSessions = async () => {
  const response = await api.auth.getSessions();
  sessions.value = response.data.sessions;
};

async function logoutSession(id) {
  const response = await api.auth.endSession(id);
  if (response.status == 200) {
    // TODO remove session from array
    getSessions();
  }
}
</script>