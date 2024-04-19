import { ref } from 'vue'
import { defineStore } from 'pinia'
import instance from '@/api/axiosInstance';
import { jwtDecode } from "jwt-decode";
import { tenants } from '@/utils';

export const useAuthStore = defineStore('authStore', () => {
  const userName = ref('');
  const dateJoined = ref('');
  const email = ref('');
  const emailConfirmed = ref(false);
  const tfaEnabled = ref(false);
  const loggedIn = ref(false);
  const tenantId = ref('');
  const tenantName = ref('');
  const tenantIcon = ref('');
  const allTenants = ref(tenants)
  
  function login(data) {
    userName.value = data.user.userName;
    dateJoined.value = data.user.dateJoined;
    email.value = data.user.email;
    emailConfirmed.value = data.user.emailConfirmed;
    tfaEnabled.value = data.user.tfaEnabled;
    loggedIn.value = true;

    localStorage.setItem('authToken', data.jwt);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));

    instance.defaults.headers.common['Authorization'] = `bearer ${data.jwt}`;
  }

  async function loginFromStorage() {
    var refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken != null && refreshToken != undefined) {
      const jwt = localStorage.getItem('authToken');
      if (jwt != null && jwt != undefined) {
        const decodedJwt = jwtDecode(jwt);
        if (Date.now() >= decodedJwt.exp * 1000) {
          try {
            const response = await instance({
              method: 'post',
              url: '/user/refresh-token',
              data: {
                refreshToken: refreshToken,
              }
            });

            if (response.status == 200) {
              localStorage.setItem('authToken', response.data.jwt);
            } else {
              logout();
              return;
            }
          } catch (error) {
            logout();
            return;
          }
        }

        instance.defaults.headers.common['Authorization'] = `bearer ${jwt}`;
        loggedIn.value = true;

        var tenantDetails = localStorage.getItem('tenant');
        if (tenantDetails != null && tenantDetails != undefined) {
          tenantDetails = JSON.parse(tenantDetails);
          tenantId.value = tenantDetails.id;
          tenantName.value = tenantDetails.name;
          tenantIcon.value = tenantDetails.iconUrl;
          instance.defaults.headers.common['Tenant'] = tenantDetails.id;
        }

        //TODO change this doesn't seem the best way to do this
        var user = JSON.parse(localStorage.getItem('user'));
        userName.value = user.userName;
        dateJoined.value = user.dateJoined;
        email.value = user.email;
        emailConfirmed.value = user.emailConfirmed;
        tfaEnabled.value = user.tfaEnabled;
      }
    }
  }

  function logout() {
    userName.value = '';
    dateJoined.value = '';
    email.value = '';
    emailConfirmed.value = false;
    tfaEnabled.value = false;
    loggedIn.value = false;

    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    instance.defaults.headers.common['Authorization'] = '';
    instance.defaults.headers.common['Tenant'] = '';
  }

  function toggleTfa() {
    tfaEnabled.value = !tfaEnabled.value;
    var user = JSON.parse(localStorage.getItem('user'));
    user.tfaEnabled = tfaEnabled.value;
    localStorage.setItem('user', JSON.stringify(user));
  }

  function setTenant(id, name, icon) {
    tenantId.value = id;
    tenantName.value = name;
    tenantIcon.value = icon;
    instance.defaults.headers.common['Tenant'] = id;
    localStorage.setItem('tenant', JSON.stringify({id, name, icon}));
  }

  return { userName, dateJoined, email, emailConfirmed, tfaEnabled , loggedIn, tenantId, tenantName, tenantIcon, allTenants,
    login, logout, loginFromStorage, toggleTfa, setTenant }
})
