<template>
  <div>
    <div class="banner">
      <img src="/images/players.png" />
      <h1>Players</h1>
    </div>
      <div class="right-btn-container">
        <router-link to="/import-players">
          <button class="btn-normal"><img src="/images/svg/upload.svg" alt="icon" >Import Players</button>
        </router-link>
      </div>
    <div class="card">
      <div class="fliters-container">
        <div @click="showFilters = !showFilters" class="filters-header">
          <div class="filter">
            <img src="/images/svg/filter-32.svg" alt="filter">
            <p>Filter</p>
          </div>
          <div>
            <img :style="[showFilters ? { rotate: '180deg' } : { rotate: '0deg' }]" src="/images/svg/chevron-down-32.svg"
              alt="filter">
          </div>
        </div>
        <form v-if="showFilters" class="filter-form">
          <div class="filters-container">
            <div>
              <label for="id">ID</label>
              <input v-model="idFilter" type="text" placeholder="123456" />
            </div>
            <div>
              <label for="id">SIGNUP DATE</label>
              <DatePicker :getDate="signupDate" ref="signupDateFilterRef" />
            </div>
            <div>
              <label for="id">SIGNUP CODE</label>
              <input v-model="signupCodeFilter" type="text" placeholder="promo1" />
            </div>
            <div>
              <label for="id">LAST BET</label>
              <DatePicker :getDate="lastBetDate" ref="lastBetFilterRef" />
            </div>
            <!-- <div>
              <label for="id">GGR</label>
              <input v-model="ggrFilter" type="text" placeholder="1.23"/>
              </div> -->
            <div>
              <label for="id">WAGER</label>
              <input v-model="wagerFilter" type="text" placeholder="1.23" />
            </div>
            <div>
              <label for="id">LAST DEPOSIT DATE</label>
              <DatePicker :getDate="lastDepositDate" ref="lastDepositFilterRef" />
            </div>
            <div></div>
            <div class="buttons">
              <button @click.prevent="clearFilters" class="cancel" type="button">Clear</button>
              <button @click.prevent="filterPlayers" type="submit" class="button search">Search</button>
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
              <th><span>Signup Date <span @click="sortBy('signupDate')" v-html="getSortIcon('signupDate')" /></span></th>
              <th><span>Signup Code <span @click="sortBy('signupPromoCode')" v-html="getSortIcon('signupPromoCode')" /></span></th>
              <th><span>Total Deposit <span @click="sortBy('totalDeposited')" v-html="getSortIcon('totalDeposited')" /></span></th>
              <th><span>Total Wager <span @click="sortBy('totalWager')" v-html="getSortIcon('totalWager')" /></span></th>
              <!-- <th><span>Total GGR <span @click="sortBy('totalGGR')" v-html="getSortIcon('totalGGR')" /></span></th>-->
            </tr>
          </thead>
          <tbody v-if="players.length > 0">
            <tr v-for="(player, index) in players" :key="index">
              <td>
                <router-link
                  :to="{ name: 'player-details', params: { id: player.externalId } }">{{ player.externalId }}</router-link>
              </td>
              <td>{{ formatDate(player.signupDate) }}</td>
              <td>{{ player.signupPromoCode }}</td>
              <td>£{{ addCommas(player.totalDeposited) }}</td>
              <td>£{{ addCommas(player.totalWager) }}</td>
              <!-- <td :style="[player.totalGGR < 0 ? { color: '#FF3E1D' } : { color: '#82E14F' }]" class="ggr"> £{{ addCommas(player.totalGGR) }}</td> -->
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6" style="text-align: center;">
                <template v-if="playersFetched">
                  No players found.
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template v-if="!playersFetched">
        <div class="api-loader">
          <div class="loader">
          </div>
        </div>
      </template>
      <Pagination @page-changed="setPage" :pageSize="pageSize" :pageCount="pageCount" :rowCount="rowCount" />
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
import { ref, onMounted } from "vue";
import api from "@/api/api";
import { formatDate, addCommas, SortingIcon } from "@/utils";
import playersList from "@/assets/players.json";

const showFilters = ref(false);
const players = ref(playersList.players);
const idFilter = ref('');
const signupDateFilter = ref('');
const signupDateFilterRef = ref(null);
const signupCodeFilter = ref('');
const lastBetFilter = ref('');
const lastBetFilterRef = ref(null);
const ggrFilter = ref('');
const wagerFilter = ref('');
const lastDepositFilter = ref('');
const lastDepositFilterRef = ref(null);
const pageCount = ref(1);
const rowCount = ref(0);
const pageSize = ref(100);
const currentPage = ref(1);
const sortByColumn = ref('signupDate');
const sortDirection = ref('desc');
const playersFetched = ref(true);

const signupDate = (date) => {
  signupDateFilter.value = date.formattedDate;
}

const lastBetDate = (date) => {
  lastBetFilter.value = date.formattedDate;
}

const lastDepositDate = (date) => {
  lastDepositFilter.value = date.formattedDate;
}

onMounted( () => {
  // await getPlayers();

});

const getPlayers = async () => {
  playersFetched.value = true;
  players.value = playersList;


  // const response = await api.players.getPlayers(idFilter.value, signupDateFilter.value, signupCodeFilter.value, lastBetFilter.value, ggrFilter.value, wagerFilter.value, lastDepositFilter.value, currentPage.value, sortByColumn.value, sortDirection.value, pageSize.value);
  // playersFetched.value = true;
  // players.value = response.data.players;
  // pageCount.value = response.data.pageCount;
  // rowCount.value = response.data.rowCount;
};

const filterPlayers = async () => {
  currentPage.value=1;
  await getPlayers();
}

const clearFilters = async () => {
  currentPage.value = 1;
  idFilter.value = '';
  signupDateFilter.value = '';
  signupCodeFilter.value = '';
  lastBetFilter.value = '';
  ggrFilter.value = '';
  wagerFilter.value = '';
  lastDepositFilter.value = '';
  signupDateFilterRef.value.reset();
  lastBetFilterRef.value.reset();
  lastDepositFilterRef.value.reset();
  await getPlayers();
}

const setPage = async (index) => {
  currentPage.value = index;
  if(currentPage.value < 1) currentPage.value = 1;
  if(currentPage.value > pageCount) currentPage.value = pageCount;
  await getPlayers();
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
  await getPlayers();
}
</script>
