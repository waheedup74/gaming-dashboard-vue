<template>
    <div>
      <div class="banner">
        <img src="/images/bets.png" />
        <h1>Bets</h1>
      </div>
      <div class="card">
        <div class="payment-filters-container">
          <div @click="showFilters = !showFilters" class="filters-header">
            <div class="filter">
              <img src="/images/svg/filter-32.svg" alt="filter">
              <p>Filter</p>
            </div>
            <div>
              <img :style="[showFilters ? { rotate: '180deg' } : { rotate: '0deg' }]" src="/images/svg/chevron-down-32.svg" alt="filter">
            </div>
          </div>
          <form v-if="showFilters" @submit.prevent="() => getBets()" autocomplete="off" class="filter-form">
          <div class="filters-container">
            <div class="">
                <label for="player">Id</label>
                <input v-model="betsId" type="text" placeholder="Id" class="input-field" />
            </div>
            <div class="">
                <label for="player">Player</label>
                <input v-model="playerId" type="text" placeholder="Player ID" class="input-field" />
            </div>
            <div>
              <label for="id">date placed</label>
              <DatePicker :getDate="getDatePlaced" ref="datePlacedref"/>
            </div>
            <div style="">
              <label for="id">Game</label>
              <input v-model="gameId" type="text" placeholder="Game ID" />
            </div>
            <div class="">
              <label for="id">Wager</label>
              <input v-model="wager" type="text" placeholder="£0.00" step="0.01"/>
            </div>
            <div class="buttons">
              <button  class="cancel" type="button" @click="() => handleClear()">Clear</button>
              <button type="submit" class="button search">Search</button>
            </div>
          </div>
        </form>
          <div class="hr-40"></div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>ID <span @click="sortBy('externalId')" v-html="getSortIcon('externalId')" /></span></th>
                <th><span>PLAYER <span @click="sortBy('playerId')" v-html="getSortIcon('playerId')" /></span></th>
                <th><span>Date <span @click="sortBy('dateCreated')" v-html="getSortIcon('dateCreated')" /></span></th>
                <th><span>Game<span @click="sortBy('gameId')" v-html="getSortIcon('gameId')" /></span></th>
                <th><span>Currency <span @click="sortBy('currency')" v-html="getSortIcon('currency')" /></span></th>
                <th><span>Wager <span @click="sortBy('wager')" v-html="getSortIcon('wager')" /></span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bet in 4" :key="bet">
                <td>bet_id</td>
                <td><router-link :to="{ name: 'player-details', params: { id: 10001 }}">Test Player</router-link></td>
                <td>2024-04-20</td>
                <td>Clash of Kings</td>
                <td>GBP</td>
                <td>{{addCommas(200)}}</td>
              </tr>
            </tbody>
            <!-- <tbody v-else>
              <tr>
                <td colspan="7" style="text-align: center;">
                  <template v-if="betsFetched">
                     No bets found.
                  </template>
                </td>
              </tr>
            </tbody> -->
          </table>
        </div>
        <Pagination @page-changed="setPage" :pageSize="betsPageSize" :pageCount="betsPageCount" :rowCount="betsRowCount" />

        <!-- <template v-if="!betsFetched">
          <div class="api-loader">
            <div class="loader">
            </div>
          </div>
        </template> -->
      </div>
    </div>
  </template>
  
<script>
  import DatePicker from '@/components/DatePicker.vue';
  import Pagination from '@/components/Pagination.vue';
  export default {
    components: { DatePicker, Pagination },
  };
  
</script>
  
<script setup>
  import { addCommas, formatDate, SortingIcon  } from "@/utils";
  import { ref, onMounted } from "vue";
  import api from "@/api/api";

  const datePlacedref = ref(null);
  const showFilters = ref(false);

  const datePlaced = ref('');
  const gameId = ref('');
  const wager = ref(0);
  const playerId = ref('');
  const betsId = ref('');
  const bets = ref([]);
  const betsPageCount = ref(1);
  const betsRowCount = ref(0);
  const betsPageSize = ref(100);
  const betsCurrentPage = ref(1);
  const betsFetched = ref(false);
  const sortByColumn = ref('dateCreated');
  const sortDirection = ref('desc');
  
  const getBets = async () => {
    betsFetched.value = false;
    bets.value = [];
    const response = await api.bets.getBets(playerId.value, datePlaced.value, gameId.value, wager.value, betsCurrentPage.value, sortByColumn.value, sortDirection.value, betsPageSize.value, betsId.value);
    betsFetched.value = true;
    bets.value = response.data.bets;
    betsPageCount.value = response.data.pageCount;
    betsRowCount.value = response.data.rowCount;
  }

  const handleClear = () => {
    datePlaced.value = '';
    gameId.value = '';
    wager.value = 0;
    playerId.value = '';
    datePlacedref.value.reset();
    getBets();
  }

  const getDatePlaced = (date) => {
    datePlaced.value = date.formattedDate;
  }

  
const getSortIcon = (colunm) => {
    const disableColor = '#B4BDC6';
    const enableColor = '#000000';
  
    if (colunm != sortByColumn.value) {
      return SortingIcon(disableColor, disableColor)
    }
  
    if (sortDirection.value == 'desc') {
      return SortingIcon(disableColor, enableColor);
    }
  
    return SortingIcon(enableColor, disableColor);
  }


const sortBy = async (column) => {
  if (column === sortByColumn.value) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortByColumn.value = column;
    sortDirection.value = 'desc';
  }
  await getBets();
}


const setPage = async (index) => {
  betsCurrentPage.value = index;
  if(betsCurrentPage.value < 1) betsCurrentPage.value = 1;
  if(betsCurrentPage.value > betsPageCount.value) betsCurrentPage.value = betsPageCount.value;
  await getBets();
}


  onMounted(async () => {
  await getBets();
  });
</script>
  
<style scoped>
  .hr-40 {
    margin: 40px 0;
    height: 1px;
    background: #D9DEE3;
  }
  .filters-container {
    grid-template-columns: repeat(3, 1fr);
    & .span-two {
      grid-column: span 2;
    }

    & .buttons {
      justify-content: end;
    }
  }
</style>
