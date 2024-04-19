<template>
  <div>
    <div class="games">
      <div class="banner">
        <img src="/images/games.png" alt="" />
        <h1>Games</h1>
      </div>
      <div class="right-btn-container">
        <router-link to="/games/games-lists">
          <button class="btn-lg">
            <img src="/images/svg/list-24.svg" alt="list">
            Eligible Games Lists
          </button>
        </router-link>
      </div>
      <div class="card">
        <form @submit.prevent="submitSearchForm">
          <div class="search-game-form">
            <div class="horizontal-form-container">
              <div class="input-fields">
                <!-- <div class="input-field-container">
                  <label for="">Provider</label>
                  <SelectDropdown :dataList="optionsList" @selected="handleSelected" position="absolute" name="provider"/>
                </div> -->
                <div class="input-field-container">
                  <label for="">Name</label>
                  <input v-model="searchForm.gameName" type="text" placeholder="Game1" class="input-field"/>
                  <div>{{ searchForm.game }}</div>
                </div>
              </div>
              <div class="buttons">
                <button class="cancel" type="button" @click="clearField">Clear</button>
                <button class="button search" type="submit">Search</button>
              </div>
            </div>
            <div v-if="searchFormErrors.gameName" class="error-message">{{ parseErrorMessage(searchFormErrors.gameName).message }}</div>
          </div>
        </form>
        <div class="hr"></div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Provider <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Id <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Free Spins <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Minimum Bet <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                <th><span>Category <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(game) in 4" :key="game">
                <td>Game name</td>
                <td>
                  <div class="provider-logo-container">
                    <img  src="/images/pragmatic-play-dark.svg" alt="" class="provider-logo">
                    <!-- <span v-else>{{ game.provider }}</span> -->
                  </div>
                </td>
                <td>game_id</td>
                <td>
                  <img src="/images/svg/check-green-r.svg" alt="check">
                  <!-- <img src="/images/svg/cross-red-r.svg" alt="cross" v-else> -->
                </td>
                <td>10</td>
                <td>
                  <div class="category-logo-container">
                    <div class="category-logo" >
                      <img  src="/images/slotIcon2.svg" style="height: 100%" alt="" />
                    </div>
                    Slots
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
       
        <template>
          <Pagination @page-changed="setPage" :pageSize="pageSize" :pageCount="pageCount" :rowCount="rowCount" />
        </template>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import Pagination from '@/components/Pagination.vue';
import SelectDropdown from "@/components/SelectDropdown.vue"
import api from "@/api/api";
import { capitalizeFirstLetter, SortingIcon, parseErrorMessage } from "@/utils";
import { z } from 'zod';

const gameName = ref('');
const provider = ref('');
const currentPage = ref(1);
const pageCount = ref(1);
const rowCount = ref(0);
const pageSize = ref(10);
const allGames = ref([]);
const optionsList = [
  {
    name: "Option 1",
    id: 1,
  },
  {
    name: "Option 2",
    id: 2,
  },
  {
    name: "Option 3",
    id: 3,
  },
  {
    name: "Option 4",
    id: 4,
  },
];
const selectedOption = ref({
  provider: "",
});

const handleSelected = (options) => {
  const { option, name } = options
  selectedOption.value[name] = option;
};

onMounted(async () => {
  // await getGames();
});

const searchForm = reactive({
    gameName: '',
})

const searchFormErrors = reactive({
    gameName: '',
});

const submitSearchForm = () => {
    currentPage.value = 1;
    getGames()
};

const getGames = async () => {
  // TODO pass provider from dropdown box and name from search box and page from pagination control
  const response = await api.games.getGames(provider.value, searchForm.gameName, currentPage.value);
  allGames.value = response.data.game;
  pageCount.value = response.data.pageCount;
  rowCount.value = response.data.rowCount;
};

const clearField = async () => {
  searchForm.gameName = '';
  const response = await api.games.getGames(provider.value, '', currentPage.value);
  allGames.value = response.data.game;
  pageCount.value = response.data.pageCount;
  rowCount.value = response.data.rowCount;
}

// An array to define categories data
  const categories = [
        {
            categoryName: "Table",
            categoryIcon: "/images/slotIcon2.svg",
            background: "#FFF2D6",
            providerImage: "/images/game1.png",
        },
        {
            categoryName: "Live Games",
            categoryIcon: "/images/slotIcon3.svg",
            background: "#E7E7FF",
            providerImage: "/images/game1.png",
        },
        {
            categoryName: "Slots",
            categoryIcon: "/images/slotIcon1.svg",
            background: "#D7F5FC",
            providerImage: "/images/game1.png",
        }
    ]

const setPage = async (index) => {
  currentPage.value = index;
  if(currentPage.value < 1) currentPage.value = 1;
  if(currentPage.value > pageCount) currentPage.value = pageCount;
  // await getGames();
}
</script>
