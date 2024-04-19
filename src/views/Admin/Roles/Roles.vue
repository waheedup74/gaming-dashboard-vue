<template>
  <div>
    <div class="banner">
      <img src="/images/roles.png" alt="" />
      <h1>Roles</h1>
    </div>

    <div class="desktop-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Name</span></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="roles">
              <tr v-for="(role, index) in roles" :key="index">
                <td>{{ role.name }}</td>
                <td>
                  <a @click="editRole(role.id, 'edit')" href="javascript:void(0)">
                    Details
                  </a>
                </td>
                <!-- <td>
                  <a @click="showModal(role, 'delete')" href="javascript:void(0)">
                    Delete
                  </a>
                </td> -->
              </tr>
              <!-- <tr>
                <td :class="{ 'at-hover': !showAddRoleForm }" colspan="7" class="add-user-container">
                  <div v-if="!showAddRoleForm" @click.prevent="showAddRoleForm = !showAddRoleForm">
                    <a href="javascript:void(0)" class="add-new">+ New Role</a>
                  </div>
                  <div v-if="showAddRoleForm" class="add-user-form">
                    <form @submit.prevent="onCreateRole">
                      <input v-model="name" type="text" placeholder="Name" required />
                      <div class="buttons">
                        <button type="submit">Create</button>
                        <button @click.prevent="showAddRoleForm = false" type="button" class="cancel">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- <teleport to="body">
      <Modal v-if="isModalVisible" :isOpen="isModalVisible" @close-modal="closeModal">
        <div @click="closeModal" class="cross-button">
          <img src="/images/svg/close-gray-32.svg" alt="close" />
        </div>
        <div v-if="modalType === 'delete'" class="delete-modal">
          <h1>Are you sure?</h1>
          <p>
            You are about to delete the role: <span>{{ role.name }}</span>.
          </p>
          <div class="listButtons">
            <button @click="closeModal" class="button cancel" >Cancel</button>
            <button  @click="deleteRole(role.id)" class="button">
              Yes, delete this role
            </button>
          </div>
        </div>
      </Modal>
    </teleport> -->

    <div class="mobile-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Name</span></th>
                <th><span>Actions</span></th>
              </tr>
            </thead>
            <tbody v-if="roles">
              <tr v-for="(role, index) in roles" :key="index">
                <td>{{ role.name }}</td>
                <td style=" display: flex; justify-content: space-between; align-items: center;">
                  <img @click="editRole(role.id, 'edit')" src="/images/svg/edit-primary-24.svg" alt="edit">
                  <!-- <img @click="showModal(role.id, 'delete')" src="/images/svg/delete-primary-24.svg" alt="delete"> -->
                </td>
              </tr>
              <!-- <tr>
                <td :class="{ 'at-hover': !showAddRoleForm }" colspan="2" class="add-user-container">
                  <div v-if="!showAddRoleForm" @click.prevent="showAddRoleForm = !showAddRoleForm">
                    <a href="javascript:void(0)" class="add-new">+ New Role</a>
                  </div>
                  <div v-if="showAddRoleForm" class="add-user-form">
                    <form @submit.prevent="onCreateRole">
                      <input type="text" placeholder="Name" v-model="name" required />
                      <button  @click.prevent="showAddRoleForm = false" type="button" class="cancel">
                        Cancel
                      </button>
                      <button type="submit" class="button">Create</button>
                    </form>
                  </div>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import Modal from "@/components/Modal/PopoverModal.vue";
import { ref, onMounted } from "vue";
import router from "@/router/index";
import api from "@/api/api";
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const roles = ref([
  {
    name: "Admin"
  },
  {
    name: "Operator"
  },
  {
    name: "Support"
  },
]);
const role = ref(null);
const modalType = ref(null);
const name = ref("");
const showAddRoleForm = ref(false);
const isModalVisible = ref(false);

// const showModal = (data, type) => {
//   isModalVisible.value = true;
//   modalType.value = type;
//   role.value = data;
// };

// const closeModal = () => {
//   isModalVisible.value = false;
// };

onMounted(async () => {
  getRoles();
  // if(authStore.tenantId) {
  //   router.push('/');
  // }  
});

const getRoles = async () => {
  const response = await api.auth.getRoles();
  roles.value = response.data.roles;
};

const editRole = (id) => {
  router.push(`/roles/${id}`);
};

// const onCreateRole = () => {
//   if (name.value) {
//     createRole(name.value);
//   }
//   name.value = "";
// };

// const createRole = async (name) => {
//   const response = await api.auth.createRole(name);
//   if (response.status == 200) {
//     getRoles();
//   }
//   showAddRoleForm.value = false;
// };

// const deleteRole = async (id) => {
//   // const response = await api.auth.remove(id);
//   closeModal();
//   // if (response.status === 200) {
//   //   getRoles();
//   // }
// };
</script>
