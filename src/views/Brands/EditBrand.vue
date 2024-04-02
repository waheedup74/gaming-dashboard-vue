<template>
  <div class="edit-brand">
    <div class="banner">
      <div class="brand-icon-main-container">
        <div v-if="brandData.iconUrl" class="brand-img-container">
          <img :src="brandData.iconUrl" alt="" />
        </div>
        <div v-else :style="{color: brandData.defaultLogo.color, background: brandData.defaultLogo.background}" class="brand-icon-container">{{capitalizeBrand(brandData.name)[0]}}</div>
        <div @click="showModal('', 'uploadImg')" class="svg-icon-container">
          <img src="/images/svg/edit-16.svg" alt="edit">
        </div>
      </div>
      <h1>{{ capitalizeBrand(brandData.name) }}</h1>
    </div>

    <div class="breadcrumbs">
      <router-link to="/brands">Brands</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron-right">
      </span>
      <span class="current">Manage Brand</span>
    </div>

    <div class="desktop-view">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Users in Brand</h3>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>UserName <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Email <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Date Joined <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="users.length > 0">
              <tr v-for="(user, index) in users" :key="index">
                <td>{{ user.userName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.dateJoined.split("T")[0] }}</td>
                <td >
                  <a :style="{opacity: user.userName === 'admin' ? '0.5': '1', cursor: user.userName === 'admin' ? 'not-allowed': 'pointer'}" @click="showModal(user, 'delete')" href="javascript:void(0)">
                    Delete
                  </a>
                </td>
              </tr>
              <tr>
                <td :class="{ 'at-hover': !showAddUserForm }" colspan="7" class="add-user-container">
                  <div v-if="!showAddUserForm" @click.prevent="showAddUserForm = !showAddUserForm">
                    <a href="javascript:void(0)" class="add-new">+ New User</a>
                  </div>
                  <div v-if="showAddUserForm" class="add-user-form" >
                    <form @submit.prevent="onAddUserInBrand">
                      <SelectDropdown @selected="handleSelected" :dataList="dropdownList(allUsers)" :placeholder="'Select a user'" :isOutline='false' position="relative" name="user"/>
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
            <tbody v-else>
              <tr ><td colspan="4" style="text-align: center;">No users found.</td></tr>
              <tr>
                <td :class="{ 'at-hover': !showAddUserForm }" colspan="7" class="add-user-container">
                  <div v-if="!showAddUserForm" @click.prevent="showAddUserForm = !showAddUserForm">
                    <a href="javascript:void(0)" class="add-new">+ New User</a>
                  </div>
                  <div v-if="showAddUserForm" class="add-user-form" >
                    <form @submit.prevent="onAddUserInBrand">
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
    </div>

    <teleport to="body">
      <Modal v-if="isModalVisible" :isOpen="isModalVisible" @close-modal="closeModal"
      >
        <div v-if="modalType === 'delete'"  @click="closeModal" class="cross-button">
          <img src="/images/svg/close-gray-32.svg" alt="close">
        </div>
        <div v-if="modalType === 'delete'" class="delete-modal">
          <h1>Are you sure?</h1>
          <p>
            You are about to delete the user: <span>{{ user.userName }}</span>
            <br />
            as a user form the brand <span>{{ capitalizeBrand(brandId) }}</span>
          </p>
          <div class="listButtons">
            <button @click="closeModal" class="button cancel">Cancel</button>
            <button @click="removeUserFromBrand(user.id)" class="button">
              Yes, delete this user
            </button>
          </div>
        </div>
        <div v-if="modalType === 'uploadImg'" class="upload-logo-modal">
          <div @click="closeModal" class="cross-button-banner-modal">
            <img src="/images/svg/close-32.svg" alt="close">
          </div>
          <div class="modal-banner">
            <h1>Upload Logo</h1>
          </div>
          <div class="modal-contant-container">
            <div class="logo-container">
              <div class="logo-up-container">
                <img :src="newLogo ? newLogo : '/images/test-logo.jpg'" class="logo-img" alt=""/>
              </div>

              <div class="upload-btn">
                <label>
                  Upload new photo
                  <input @change="uploadImg" type="file" ref="file" accept="image/gif, image/jpeg, image/png" hidden/>
                </label>
              </div>

              <div class="listButtons">
                <button @click="closeModal" class="button cancel">
                  Cancel
                </button>
                <button class="button">Save</button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </teleport>

    <div class="mobile-view">
      <div class="card card-header">
        <h2>Users in Brand</h2>
      </div>
      <div v-for="(user, index) in users" :key="index" class="card brand-user-card">
        <div class="user-name-container">
          <div :style="{ color: user.brandLogo.color, background: user.brandLogo.background}" class="user-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" > 
              <path :fill="user.brandLogo.color"  d="M16 2.66699C14.6815 2.66699 13.3925 3.05799 12.2962 3.79053C11.1999 4.52307 10.3454 5.56426 9.8408 6.78244C9.33622 8.00061 9.2042 9.34105 9.46143 10.6343C9.71867 11.9275 10.3536 13.1154 11.286 14.0477C12.2183 14.9801 13.4062 15.615 14.6994 15.8722C15.9926 16.1295 17.333 15.9974 18.5512 15.4929C19.7694 14.9883 20.8106 14.1338 21.5431 13.0375C22.2757 11.9411 22.6667 10.6522 22.6667 9.33366C22.6667 7.56555 21.9643 5.86986 20.714 4.61961C19.4638 3.36937 17.7681 2.66699 16 2.66699ZM16 13.3337C15.2089 13.3337 14.4355 13.0991 13.7777 12.6595C13.1199 12.22 12.6072 11.5953 12.3045 10.8644C12.0017 10.1335 11.9225 9.32922 12.0769 8.5533C12.2312 7.77737 12.6122 7.06464 13.1716 6.50523C13.731 5.94582 14.4437 5.56486 15.2196 5.41052C15.9956 5.25618 16.7998 5.33539 17.5307 5.63814C18.2616 5.94089 18.8864 6.45358 19.3259 7.11138C19.7654 7.76917 20 8.54253 20 9.33366C20 10.3945 19.5786 11.4119 18.8284 12.1621C18.0783 12.9122 17.0609 13.3337 16 13.3337ZM28 28.0003V26.667C28 24.1916 27.0167 21.8177 25.2663 20.0673C23.516 18.317 21.142 17.3337 18.6667 17.3337H13.3333C10.858 17.3337 8.48401 18.317 6.73367 20.0673C4.98333 21.8177 4 24.1916 4 26.667V28.0003H6.66667V26.667C6.66667 24.8989 7.36905 23.2032 8.61929 21.9529C9.86953 20.7027 11.5652 20.0003 13.3333 20.0003H18.6667C20.4348 20.0003 22.1305 20.7027 23.3807 21.9529C24.631 23.2032 25.3333 24.8989 25.3333 26.667V28.0003H28Z" /> 
            </svg>
          </div>
          <div>
            <h3 :style="{ color: user.brandLogo.color }">
              {{ user.userName }}
            </h3>
            <p>{{ user.dateJoined.split("T")[0] }}</p>
          </div>
        </div>
        <p class="email">
          {{ user.email }}
        </p>
        <div>
          <button :style="{ background: user.brandLogo.color, boxShadow: `3px 3px 6px 0 ${user.brandLogo.color}40`, opacity: user.userName === 'admin' ? '0.5': '1', cursor: user.userName === 'admin' ? 'not-allowed': 'pointer'}" @click="showModal(user, 'delete')" class="button">
            Delete
          </button>
        </div>
      </div>
      <button v-if="!isAddUser" @click="isAddUser = true" class="button create-brand-btn">
        <img src="/images/svg/plus-24.svg" alt="plus">
        New User
      </button>
      <div v-if="isAddUser" class="card">
        <form @submit.prevent="onAddUserInBrand">
          <select v-model="name" name="" id="">
            <option v-for="user in allUsers" :key="user.id" :value="user.userName">
              {{ user.userName }}
            </option>
          </select>
          <button @click="isAddUser = false" type="button" class="cancel">
            Cancel
          </button>
          <button type="submit" class="button submit">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal/PopoverModal.vue";
import SelectDropdown from "@/components/SelectDropdown.vue";
import { ref, onMounted, watchEffect } from "vue";
import api from "@/api/api";
import { useRoute, useRouter } from "vue-router";
import { COLORS } from "@/utils";
import {SortingIcon} from '@/utils';
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const modalType = ref(null);
const brandId = ref("");
const brandData = ref(null)
const name = ref("");
const allUsers = ref([]);
const users = ref([]);
const user = ref({});
const newLogo = ref("");
const showAddUserForm = ref(false);
const isModalVisible = ref(false);
const selectedColor = ref(null);
const isAddUser = ref(false);
const colors = ref(COLORS);
const selectedOption = ref({
  user: "",
});

onMounted(async () => {
  getBrandUsers();
  getUsers();
  if(authStore.tenantId) {
    router.push('/');
  }  
});

const setLogo = (usersList) => {
  usersList.forEach((e) => {
    const randomNumber = Math.floor(Math.random() * 5);
    selectedColor.value = colors.value[randomNumber];
    e.brandLogo = selectedColor.value;
  });
};

const handleSelected = (options) => {
  const {option, name} = options 
  selectedOption.value[name] = option;
};

const showModal = (data, type) => {
  if(data.userName === 'admin'){
    return null;
  }

  user.value = data;
  isModalVisible.value = true;
  modalType.value = type;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const getBrandUsers = async () => {
  brandId.value = route.params.id;
  const response = await api.tenants.getUsers(brandId.value);
  users.value = response.data.users;
  setLogo(users.value);
};

const getUsers = async () => {
  const response = await api.auth.getUsers();
  allUsers.value = response.data.users;
  dropdownList(allUsers.value);
};

function dropdownList (list){
  return list.map(u => ({
    name: u.userName,
    id: u.id
  }));
}

const onAddUserInBrand = () => {
  if (selectedOption.value.user) {
    addUserToBrand(selectedOption.value.user, brandId.value);
  }
  selectedOption.value.user = "";
  showAddUserForm.value = false;
};

const addUserToBrand = async (name, id) => {
  const response = await api.tenants.addUserToTenant(name, id);
  if (response.status === 200) {
    getBrandUsers();
  }
  isAddUser.value = false;
};

async function removeUserFromBrand(userId) {
  const response = await api.tenants.removeUserFromTenant(
    userId,
    brandId.value
  );
  if (response.status == 200) {
    getBrandUsers();
  }
  closeModal();
}

const capitalizeBrand = (id) => {
  return id.charAt(0).toUpperCase() + id.slice(1);
};

const uploadImg = (e) => {
  newLogo.value = e.target.files[0].name;
  const file = e.target.files;
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      newLogo.value = event.target.result;
    };
    fileReader.readAsDataURL(file[0]);
  }
};

watchEffect(() => {
  brandData.value = authStore.allTenants.find((item) => item.key === route.params.id);
})
</script>

