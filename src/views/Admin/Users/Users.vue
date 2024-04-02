<template>
  <div>
    <div class="banner">
      <img src="/images/users.png" alt="" />
      <h1>Users</h1>
    </div>

    <div class="desktop-view">
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th class="w-25"><span>Username <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th class="w-25"><span>Email <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th class="w-25"><span>Date Joined <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="users.length > 0">
              <tr v-for="(user, index) in users" :key="index">
                <template v-if="!user?.deleted">
                  <td>
                    <span v-if="user.id !== editId">{{ user.userName }}</span>
                    <div v-if="user.id === editId" class="add-user-form edit-user-form ">
                      <form>
                        <input v-model="editForm.selectedName" type="text" placeholder="" form="edit-form" class="user-name"/>
                      </form>
                    </div>
                    <p v-if="editErrors.selectedName && user.id === editId" class="error-message" >{{ parseErrorMessage(editErrors.selectedName).message }}</p>
                  </td>
                  <td>
                    <span v-if="user.id !== editId">{{ user.email }}</span>
                    <span v-if="user.id !== editId && !user.email" class="disable-text">No email address found.</span>
                    <div v-if="user.id === editId" class="add-user-form edit-user-form">
                      <form @submit.prevent="submitEditForm(user.id)" id="edit-form">
                        <input v-model="editForm.selectedEmail" type="email" placeholder="Email address"/>
                        <div class="buttons">
                          <button type="submit">Save</button>
                          <button @click.prevent="editId = ''" class="cancel" type="button">
                            Cancel
                          </button>
                        </div>
                      </form>
                     <p v-if="editErrors.selectedEmail  && user.id === editId" class="error-message">{{ parseErrorMessage(editErrors.selectedEmail).message }}</p>
                    </div>
                  </td>
                  <td>{{ user.dateJoined.split("T")[0] }}</td>
                  <td>
                    <a @click="showModal(user, 'view')" href="javascript:void(0)">
                      Details
                    </a>
                  </td>
                  <td>
                    <a @click="editIt(user)" href="javascript:void(0)">Edit</a>
                  </td>
                  <td>
                    <a :style="{opacity: user.userName === 'admin' ? '0.5': '1', cursor: user.userName === 'admin' ? 'not-allowed': 'pointer'}" @click="showModal(user, 'delete')" href="javascript:void(0)">
                      Delete
                    </a>
                  </td>
                </template>
              </tr>
              <tr>
                <td :class="{ 'at-hover': !showAddUserForm }" colspan="6" class="add-user-container">
                  <div v-if="!showAddUserForm" @click.prevent="showAddUserForm = !showAddUserForm" class="">
                    <a href="javascript:void(0)" class="add-new">+ New User</a>
                  </div>
                  <div v-if="showAddUserForm" class="add-user-form">
                    <form @submit.prevent="submitAddForm">
                      <div>
                        <input v-model="addForm.name" type="text" placeholder="Username"/>
                        <p v-if="addErrors.name" class="error-message">{{ parseErrorMessage(addErrors.name).message }}</p>
                      </div>
                      <div>
                        <input v-model="addForm.email" type="email" placeholder="Email address"  />
                        <p v-if="addErrors.email" class="error-message">{{ parseErrorMessage(addErrors.email).message }}</p>

                      </div>
                      <div class="buttons">
                        <button type="submit">Create</button>
                        <button @click.prevent="showAddUserForm = false" class="cancel" type="button">
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr ><td colspan="6" style="text-align: center;">No users found.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card">
        <div @click="showDelateTable = !showDelateTable" class="card-header">
          <h3 class="disabled-title" :class="{'mb-0': !showDelateTable}">Deleted Users</h3>
            <img :class="{  rotate: showDelateTable }"  src="/images/svg/chevron-down-24.svg" alt="chevron">
        </div>
        <div v-if="showDelateTable" class="table-container">
          <table v-if="users">
            <thead>
              <tr>
                <th class="w-25">Username</th>
                <th class="w-25">Email</th>
                <th class="w-25">Date Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <template v-if="user?.deleted">
                  <td>{{ user.userName }} {{ index }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.dateJoined.split("T")[0] }}</td>
                  <td>
                    <a @click="showModal(user, 'view')" href="javascript:void(0)">
                      Details
                    </a>
                  </td>
                </template>
              </tr>
              <tr>
                  <template v-if="users.map(user => user.deleted).filter(deleted => deleted).length === 0">
                    <td colspan="4" style="text-align: center;">No users found.</td>
                </template>
              </tr>
            </tbody>
           
          </table>
        </div>
      </div>
    </div>

    <teleport to="body">
      <Modal v-if="isModalVisible" @close-modal="closeModal" :isOpen="isModalVisible">
        <div v-if="user && (modalType === 'view' || modalType === 'edit')" @click="closeModal" class="cross-button-banner-modal">
          <img src="/images/svg/close-32.svg" alt="">
        </div>
        <div v-if="user && modalType === 'view'" class="detail-modal">
          <div class="modal-banner">
            <h1>User Information</h1>
          </div>
          <div class="modal-contant-container">
            <div class="detail">
              <div class="item-container">
                <div class="item">
                  <img src="/images/svg/person-blue-56.svg" alt="user">
                </div>
                <h4>Username</h4>
                <p>{{ user.userName }}</p>
              </div>
              <div class="item-container">
                <div class="item">
                  <img src="/images/svg/mail-blue-56.svg" alt="mail">
                </div>
                <h4>Email Address</h4>
                <p>{{ user.email }}</p>
              </div>
              <div class="item-container">
                <div class="item">
                  <img src="/images/svg/calendar-blue-56.svg" alt="calendar">
                </div>
                <h4>Date Joined</h4>
                <p>{{ user.dateJoined.split("T")[0] }}</p>
              </div>
            </div>
            <div class="hr"></div>
            <div class="card">
              <h4><span>Admin's</span> brands</h4>
              <div class="modal-brands-container">
                <div v-for="tenant in tenants" :key="tenant.key">
                  <div class="icon-sm-container">
                    <img v-if="tenant.iconUrl" :src="tenant.iconUrl" alt="" class="brand-icon-info"/>
                    <div v-else :style="[{ color: getTennantFromStore(tenant).defaultLogo.color }, { background: getTennantFromStore(tenant).defaultLogo.background }]" class="brand-icon-info">
                      {{ capitalizeFirstLetter(getTennantFromStore(tenant).name[0]) }}
                    </div>
                  </div>
                  <p class="brand-name">{{tenant.name}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="user && modalType === 'edit'" class="edit-modal" >
          <div class="modal-banner">
            <h1>Edit User</h1>
          </div>
          <div class="form-container">
            <form @submit.prevent="onUpdateUser(user, email)">
              <input v-model="selectedUser" type="text" placeholder="Username" />
              <input v-model="selectedEmail" type="text" placeholder="Email address" required />
              <div class="listButtons">
                <button @click="closeModal()" type="button" class="cancel">
                  Cancel
                </button>
                <button type="submit" class="button">Save</button>
              </div>
            </form>
          </div>
        </div>

        <div v-if="modalType === 'delete'" @click="closeModal" class="cross-button">
          <img src="/images/svg/close-gray-32.svg" alt="close">
        </div>
        <div v-if="modalType === 'delete'" class="delete-modal">
          <h1>Are you sure?</h1>
          <p>
            You are about to delete the user: <span>{{ user.userName }}</span>
          </p>
          <div class="listButtons">
            <button @click="closeModal" class="button cancel">Cancel</button>
            <button @click="deleteUser(user.id)" class="button">
              Yes, delete this user
            </button>
          </div>
        </div>
      </Modal>
    </teleport>

    <div class="mobile-view">
      <div class="tabs">
        <div @click="switchTab('user')"  :class="{ active: tab === 'user' }"  class="tab">
          Users
        </div>
        <div @click="switchTab('delete')" :class="{ active: tab === 'delete' }" class="tab">
          Deleted Users
        </div>
      </div>
      <div v-if="tab === 'user'">
        <div class="users-list-card">
          <div v-for="(u, index) in users" :key="index">
            <div v-if="!u?.deleted" class="deleted">
              <div :class="{hideme: user?.id === u.id}" class="mobile-user-list-container">
                <p class="user-name" style="padding: 6px 24px 6px 0px;">
                  {{ u.userName }}
                </p>
                <img  @click="getUser(u.id)" src="/images/svg/view-primary-24.svg" alt="view">
              </div>
              <div v-if="user">
                <div v-if="user.id === u.id" class="user-detail-container" >
                  <div class="user-name-container" style="position: relative">
                    <div :style="{ color: u.userLogo.color, background: u.userLogo.background}" class="user-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" > 
                        <path :fill="u.userLogo.color" d="M16 2.66699C14.6815 2.66699 13.3925 3.05799 12.2962 3.79053C11.1999 4.52307 10.3454 5.56426 9.8408 6.78244C9.33622 8.00061 9.2042 9.34105 9.46143 10.6343C9.71867 11.9275 10.3536 13.1154 11.286 14.0477C12.2183 14.9801 13.4062 15.615 14.6994 15.8722C15.9926 16.1295 17.333 15.9974 18.5512 15.4929C19.7694 14.9883 20.8106 14.1338 21.5431 13.0375C22.2757 11.9411 22.6667 10.6522 22.6667 9.33366C22.6667 7.56555 21.9643 5.86986 20.714 4.61961C19.4638 3.36937 17.7681 2.66699 16 2.66699ZM16 13.3337C15.2089 13.3337 14.4355 13.0991 13.7777 12.6595C13.1199 12.22 12.6072 11.5953 12.3045 10.8644C12.0017 10.1335 11.9225 9.32922 12.0769 8.5533C12.2312 7.77737 12.6122 7.06464 13.1716 6.50523C13.731 5.94582 14.4437 5.56486 15.2196 5.41052C15.9956 5.25618 16.7998 5.33539 17.5307 5.63814C18.2616 5.94089 18.8864 6.45358 19.3259 7.11138C19.7654 7.76917 20 8.54253 20 9.33366C20 10.3945 19.5786 11.4119 18.8284 12.1621C18.0783 12.9122 17.0609 13.3337 16 13.3337ZM28 28.0003V26.667C28 24.1916 27.0167 21.8177 25.2663 20.0673C23.516 18.317 21.142 17.3337 18.6667 17.3337H13.3333C10.858 17.3337 8.48401 18.317 6.73367 20.0673C4.98333 21.8177 4 24.1916 4 26.667V28.0003H6.66667V26.667C6.66667 24.8989 7.36905 23.2032 8.61929 21.9529C9.86953 20.7027 11.5652 20.0003 13.3333 20.0003H18.6667C20.4348 20.0003 22.1305 20.7027 23.3807 21.9529C24.631 23.2032 25.3333 24.8989 25.3333 26.667V28.0003H28Z" /> 
                      </svg>
                    </div>
                    <div>
                      <h3 :style="{ color: u.userLogo.color }">
                        {{ user?.userName }}
                      </h3>
                      <p>
                        {{ user?.dateJoined.split("T")[0] }}
                      </p>
                    </div>
                    <span>
                      <img @click="closeUserDetail" src="/images/svg/close-gray-24.svg" alt="close">
                    </span>
                  </div>
                  <p class="email">
                    {{ user?.email }}
                  </p>
                  <div class="card">
                    <h4> <span> Admin's</span> brands</h4>
                    <div class="admins-brands-container">
                      <div v-for="tenant in tenants" :key="tenant.key">
                        <div class="admin-brand-icon-container">
                          <img v-if="tenant.id % 2 === 0" src="/images/apes.png" alt="" />
                          <img v-else src="/images/dice-logo.png" alt="" />
                        </div>
                        <p class="brand-name">{{tenant.name}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="buttons">
                    <button  @click="showModal(u, 'delete')"  class="button delete-btn">
                      Delete
                    </button>
                    <button @click="showModal(u, 'edit')" :style="{ background: u.userLogo.color, boxShadow: `3px 3px 6px 0 ${u.userLogo.color}40`,}"
                      class="button">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button v-if="!isAddUser" @click="isAddUser = true" class="button create-brand-btn">
          + New User
        </button>
        <div class="card" v-if="isAddUser">
          <form @submit.prevent="createUser">
            <input v-model="name" type="text" placeholder="Username" required />
            <input v-model="email" type="text" placeholder="Email address" required />
            <button @click="isAddUser = false" type="button" class="cancel">
              Cancel
            </button>
            <button type="submit" class="button">Create</button>
                      </form>
        </div>
      </div>
      <div v-if="tab === 'delete'">
        <div v-for="(user, index) in users" :key="index" class="card brand-user-card">
          <div class="user-name-container">
            <div class="user-avatar">
              <img src="/images/svg/person-gray-32.svg" alt="user">
            
            </div>
            <div>
              <h3>
                {{ user.userName }}
              </h3>
              <p>{{ user.dateJoined.split("T")[0] }}</p>
            </div>
          </div>
          <p class="email">
            {{ user.email }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/PopoverModal.vue";
import { ref, onMounted, reactive } from "vue";
import api from "@/api/api";
import { COLORS, capitalizeFirstLetter, SortingIcon, parseErrorMessage } from "@/utils";
import { useAuthStore } from "@/stores/authStore";
import { z } from 'zod';
import router from "@/router/index";

const users = ref([]);
const user = ref(null);
const tenants=ref([]);
const modalType = ref(null);
const name = ref("");
const email = ref("");
const showDelateTable = ref(false);
const showAddUserForm = ref(false);
const isModalVisible = ref(false);
const editId = ref("");
const tab = ref("user");
const isAddUser = ref(false);
const selectedColor = ref(null);
const selectedUser = ref("");
const selectedEmail = ref("");
const authStore = useAuthStore();
const colors = ref(COLORS);

const addForm = reactive({
    name: '',
    email: '',
});

const editForm = reactive({
    selectedName: '',
    selectedEmail: ''
})

const addErrors = reactive({
    name: '',
    email: '',
});

const editErrors = reactive({
    selectedName: '',
    selectedEmail: ''
})

const addFromValidationSchemas = [
    { field: 'name', schema: z.string().min(3, {message: "Please enter username"}) },
    { field: 'email', schema: z.string().regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, {message: 'Please enter a valid email address'})},
  ];

  const editFromValidationSchemas = [
    { field: 'selectedName', schema: z.string().min(3, {message: "Please enter username"}) },
    { field: 'selectedEmail', schema: z.string().regex(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, {message: 'Please enter a valid email address'})},
  ];

const submitAddForm = () => {
      for (const { field, schema } of addFromValidationSchemas) {
        try {
          schema.parse(addForm[field]);
          addErrors[field] = '';
        } catch (error) {
          addErrors[field] = error.message;
        }
      }
      if (Object.values(addErrors).some(error => error !== '')) {
        return;
      }
      createUser(addForm.name, addForm.email);

    };

const submitEditForm = (id) => {
  for (const { field, schema } of editFromValidationSchemas) {
    try {
      schema.parse(editForm[field]);
      editErrors[field] = '';
    } catch (error) {
      editErrors[field] = error.message;
    }
  }
  if (Object.values(editErrors).some(error => error !== '')) {
    return;
  }
  updateUser({
      id,
      name: editForm.selectedName,
      email: editForm.selectedEmail,
    });
};

const showModal = (data, type) => {
  if(type !== 'view' && data.userName === 'admin'){
    return null;
  }
  
  isModalVisible.value = true;
  modalType.value = type;
  user.value = data;
  email.value = data.email;
  if (type === "view") {
    getUser(user.value.id);
  }
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  if(authStore.tenantId) {
    router.push('/');
  } 
  getUsers();
});

const getUsers = async () => {
  const response = await api.auth.getUsers();
  users.value = response.data.users;
  setLogo(users.value);
};

const getUser = async (id) => {
  const response = await api.auth.getUser(id);
  tenants.value = response.data.tenants;
  user.value = response.data.user;
  name.value = user.value.userName;
  email.value = user.value.email;
};

const createUser = async (name, email) => {
  const response = await api.auth.createUser(name, email);
  if (response.status == 200) {
    getUsers();
  }
  isAddUser.value = false;
  addForm.name = "";
  addForm.email = "";
  showAddUserForm.value = false;
};

const onUpdateUser = (id) => {
  if (id) {
    updateUser({
      id,
      name: selectedUser.value,
      email: selectedEmail.value,
    });
    selectedUser.value = "";
    selectedUser.value = "";
    editId.value = "";
  }
};

const updateUser = async ({ id, name, email }) => {
  const response = await api.auth.updateUser(id, name, email );
  editForm.selectedName = "";
  editForm.selectedEmail = "";
  editId.value = "";
  closeModal();
  if (response.status == 200) {
    getUsers();
  }
  getUser(id);
  closeModal();
};

const deleteUser = async (id) => {
  const response = await api.auth.deleteUser(id);
  if (response.status === 200) {
    getUsers();
  }
  closeModal();
};

const editIt = (u) => {
  editId.value = u.id;
  editForm.selectedEmail = u.email;
  editForm.selectedName = u.userName;
};

const switchTab = (type) => {
  tab.value = type;
};

const closeUserDetail = () => {
  user.value = null;
};
const setLogo = (usersList) => {
  usersList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    selectedColor.value = colors.value[randomNumber];
    e.userLogo = selectedColor.value;
  });
};

const getTennantFromStore = (tenant) => {
  return authStore.allTenants.find(tnt => tnt.key === tenant.key)
}
</script>

<style scoped>
.w-25 {
  width: 25%;
}
</style>
