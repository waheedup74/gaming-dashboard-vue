<template>
  <div class="edit-role">
    <div class="desktop-view">
      <div class="banner">
        <img src="/images/roles.png" alt="" />
        <h1>{{ roleName }}</h1> 
      </div>
    </div>

    <div class="mobile-view">
      <div class="banner">
        <h1>{{ roleName }}</h1>
      </div>
    </div>
    <div class="breadcrumbs">
      <router-link to="/roles">Roles</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <span class="current">Edit Role</span>
    </div>
    <div class="desktop-view">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Users in Role</h3>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>UserName</span></th>
                <th><span>Email</span></th>
                <th><span>Date Joined</span></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="users">
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.userName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.dateJoined.split("T")[0] }}</td>
                <td>
                  <a :style="{opacity: user.userName === 'admin' ? '0.5': '1', cursor: user.userName === 'admin' ? 'not-allowed': 'pointer'}" @click="showModal(user, 'delete')" href="javascript:void(0)">
                    Remove
                  </a>
                </td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td :class="{ 'at-hover': !showAddUserForm }" colspan="7" class="add-user-container">
                  <div v-if="!showAddUserForm" @click.prevent="showAddUserForm = !showAddUserForm">
                    <a href="javascript:void(0)" class="add-new">+ New User</a>
                  </div>
                  <div v-if="showAddUserForm" class="add-user-form">
                    <form @submit.prevent="onAddUserInRole">
                      <SelectDropdown @selected="handleSelected" :dataList="dropdownList(allUsers)" :isOutline='false' position="relative" name="user"/>
                      <div class="buttons">
                        <button type="submit">Add</button>
                        <button @click.prevent="showAddUserForm = false" class="cancel" type="button">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="card permissions">
        <div class="card-header">
          <h3 class="card-title">Permissions</h3>
        </div>
        <div class="table-container">
          <table>
            <tr>
              <th></th>
              <th></th>
            </tr>
            <tbody v-if="permissions">
              <tr v-for="(permission, index) in permissions" :key="index">
                <td>{{ permission.split(/(?=[A-Z])/).join(' ') }}</td>
                <td>
                  <img v-if="isRoleExist(permission) === true" src="/images/svg/rounded-check-24.svg" alt="">
                  <img v-if="isRoleExist(permission) === false" src="/images/svg/rounded-uncheck-24.svg" alt="">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <teleport to="body">
      <Modal v-if="isModalVisible" :isOpen="isModalVisible" @close-modal="closeModal">
        <div @click="closeModal" class="cross-button">
          <img src="/images/svg/close-gray-32.svg" alt="close">
        </div>
        <div v-if="modalType === 'delete'" class="delete-modal">
          <h1>Are you sure?</h1>
          <p>
            You are about to remove the user: <span>{{ user.userName }}</span>
            <br />
            from the role: <span>{{ roleName }}</span>
          </p>
          <div class="listButtons">
            <button @click="closeModal" class="button cancel" >Cancel</button>
            <button @click="removeUser(user.id)" class="button">
              Yes, remove this user
            </button>
          </div>
        </div>
      </Modal>
    </teleport>

    <div class="mobile-view">
      <div class="tabs">
        <div :class="{ active: tab === 'users' }" @click="switchTab('users')" class="tab">
          Users
        </div>
        <div :class="{ active: tab === 'permission' }" @click="switchTab('permission')" class="tab">
          Permission
        </div>
      </div>
      <div class="mobile-view">
        <div v-if="tab === 'users'" class="card">
          <div class="table-container">
            <table>
              <tbody v-if="users">
                <tr>
                  <td colspan="2">
                    <h3>Users in Role</h3>
                  </td>
                </tr>
                <tr v-for="(user, index) in users" :key="index">
                  <td>{{ user.userName }}</td>
                  <td style="display: flex; justify-content: flex-end; align-items: center;">
                    <img @click="showModal(user, 'delete')" src="/images/svg/delete-primary-24.svg" alt="delete">
                  </td>
                </tr>
                <tr>
                  <td :class="{ 'at-hover': !showAddUserForm }" colspan="2" class="add-user-container">
                    <div v-if="!showAddUserForm"  @click.prevent="showAddUserForm = !showAddUserForm">
                      <a href="javascript:void(0)">+ New User</a>
                    </div>
                    <div v-if="showAddUserForm" class="add-user-form">
                      <form @submit.prevent="onAddUserInRole">
                        <select name="" id="" v-model="name">
                          <option :value="user.userName" v-for="user in allUsers" :key="user.id">
                            {{ user.userName }}
                          </option>
                        </select>
                        <button @click.prevent="showAddUserForm = false" type="button" class="cancel">
                          Cancel
                        </button>
                        <button type="submit" class="button">Add</button>
                      </form>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="tab === 'permission'" class="card" >
          <div class="table-container">
            <table>
              <tbody v-if="users">
                <tr>
                  <td colspan="2">
                    <h3>Permissions</h3>
                  </td>
                </tr>
                <tr v-for="(permission, index) in permissions" :key="index">
                  <td>{{ permission }}</td>
                  <td>
                    <label class="checkbox-container">
                      <input
                        type="checkbox"
                        :checked="isRoleExist(permission) === true"
                        disabled="disabled"
                      />
                      <span class="checkmark"></span>
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button class="button btn-lg">Save</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/PopoverModal.vue";
import { ref, onMounted } from "vue";
import SelectDropdown from "@/components/SelectDropdown.vue";
import api from "@/api/api";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const user = ref(null);
const modalType = ref(null);
const name = ref("");
const email = ref("");
const roleName = ref("");
const users = ref([]);
const allUsers = ref([]);
const permissions = ref([]);
const claims = ref([]);
const roleId = ref("");
const showAddUserForm = ref(false);
const isModalVisible = ref(false);
const tab = ref("users");
const selectedOption = ref({
  user: "",
});

const handleSelected = (options) => {
  const {option, name} = options 
  selectedOption.value[name] = option;
};

function dropdownList (list){
  return list.map(u => ({
    name: u.userName,
    id: u.id
  }));
}

onMounted(async () => {
  getRole();
  getUsers();
  if(authStore.tenantId) {
    router.push('/');
  } 
});

const showModal = (data, type) => {
  if(data.userName === 'admin'){
    return null;
  }
  
  isModalVisible.value = true;
  modalType.value = type;
  user.value = data;
  email.value = data.email;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const getRole = async () => {
  roleId.value = route.params.id;
  const response = await api.auth.getRole(roleId.value);
  roleName.value = response.data.role.name;
  users.value = response.data.users;
  permissions.value = response.data.permissions;
  claims.value = response.data.claims;
};

const isRoleExist = (permission) => {
  for (var i = 0; i < claims.value.length; i++) {
    if (claims.value[i].value == permission) {
      return true;
    }
  }
  return false;
};

const switchTab = (type) => {
  tab.value = type;
};

// async function togglePermission(permission) {
//   if (isChecked(permission)) {
//     const response = await api.auth.removeClaimFromRole(
//       roleId.value,
//       permission
//     );
//     getRole();
//   } else {
//     const response = await api.auth.addClaimToRole(roleId.value, permission);
//     getRole();
//   }
// }

function isChecked(permission) {
  for (var i = 0; i < claims.value.length; i++) {
    if (
      claims.value[i].value == permission &&
      claims.value[i].type == "permission"
    ) {
      return true;
    }
  }
  return false;
}

const getUsers = async () => {
  const response = await api.auth.getUsers();
  allUsers.value = response.data.users;
};

async function removeUser(userId) {
  const response = await api.auth.removeUserFromRole(roleId.value, userId);
  if (response.status == 200) {
    await getRole();
    isModalVisible.value = false
  }
}

const onAddUserInRole = () => {
  if (selectedOption.value.user) {
    addUserToRole(selectedOption.value.user, roleId.value);
  }
  selectedOption.value.user = "";
  showAddUserForm.value = false;
};

const addUserToRole = async (name, id) => {
  const response = await api.auth.addUserToRole(id, name);
  if (response.status == 200) {
    getRole();
  }
};
</script>
