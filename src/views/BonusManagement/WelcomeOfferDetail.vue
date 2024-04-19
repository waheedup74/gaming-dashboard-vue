<template>
    <div>
        <div class="banner">
            <img src="/images/welcome-offers.png" alt="" />
            <h1>New Offer</h1>
        </div>
        <div class="breadcrumbs">
            <router-link to="/welcome-offers">Welcome Offers</router-link>
            <span>
                <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
            </span>
            <span class="current">New offer</span>
        </div>
        <div class="dashboard-stats-container">
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Players</p>
                        <h3>{{ addCommas(100) }}</h3>
                    </div>
                    <img src="/images/svg/Players.svg" alt="DA">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Wager</p>
                        <h3>£{{ addCommas(34676) }}</h3>
                    </div>
                    <img src="/images/svg/TotalWager.svg" alt="TW">
                </div>
            </div>
            <div class="card">
                <div class="stat-container">
                    <div>
                        <p>Total Bonus Credited</p>
                        <h3 style="color: #FF3E1D;">£{{ addCommas(674574) }}</h3>
                    </div>
                    <img src="/images/svg/Bonuses.svg" alt="Bo">
                </div>
            </div>

        </div>
        <div class="card">
            <div class="offer-detail-container">
                <div class="offer-detail-card">
                    <h3>Details</h3>
                    <div class="offer-detail">
                        <p>Start Date: <span>2024-04-20</span></p>
                        <p>End Date: <span>2024-04-20</span></p>
                        <p>Max Win for Canpaign: <span>3000</span></p>
                        <p>Currency: <span>GBP</span></p>
                    </div>
                </div>
                <div class="offer-detail-card">
                    <h3>Conditions</h3>
                    <div class="offer-detail">
                        <p>Min. Deposit: <span>659</span></p>
                        <p>Signup Bonus Code: <span>test_code</span></p>
                        <p>Wager Required: <span>777</span></p>
                        <p>Period (days): <span>10</span></p>
                    </div>
                </div>
                <div class="offer-detail-card">
                    <h3>Free Spins</h3>
                    <div class="offer-detail">
                        <p>Number of Spins: <span>6</span></p>
                        <p>Spin Value: <span>56</span></p>
                        <p>Game: <span>King's Clash</span></p>
                        <p>Expires (Days): <span>29</span></p>
                    </div>
                </div>
                <div class="offer-detail-card">
                    <h3>Playthough Requirements</h3>
                    <div class="offer-detail">
                        <p>Rollover: <span>40x</span></p>
                        <p>Eligible Games: <span><router-link to="/games/create-game-list/1">Game List 1</router-link></span></p>
                        <p>Period (In Days): <span>7</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title mb-0">Player Bonuses</h3>
            </div>
            <div class="right-btn-container">
                <button @click="exportToCSV(bonuses)" class="btn-normal"><img src="/images/svg/export.svg" alt="icon" style="width: 24px; height: 24px">Export</button>
            </div>
            <div class="table-container">
              <table>
            <thead>
              <tr>
                <th><span>Player <span  @click="sortByBonus('playerId')" v-html="getSortIconBonus('playerId')" /></span></th>
                <th><span>Date <span  @click="sortByBonus('dateCredited')" v-html="getSortIconBonus('dateCredited')" /></span></th>
                <th><span>Status <span  @click="sortByBonus('status')" v-html="getSortIconBonus('status')" /></span></th>
                 <!-- !! TEMPORARY HIDING !! -->
                <!-- <th></th> -->
                <th></th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="(b, index) in 4" :key="index">
                <td><router-link :to="{ name: 'player-details', params: { id: 10001 }}">10001</router-link></td>
                <td>2024-04-20</td>
                <td>
                  <span style="text-transform: uppercase" class="active-green">Active</span>
                  <!-- <span v-if="index === 1" class="status-error"><img src="/images/svg/error-red-16.svg" alt="icon">Error </span> -->
                  <!-- <span v-if="index === 2">Complete </span> -->
                  <!-- <span v-if="index === 3" class="active-green">Active </span> -->
                  <!-- <span v-if="index === 4">Forfeited </span> -->
                </td>
                <!-- !! TEMPORARY HIDING !! -->
                <!-- <td>
                  <a @click="showModal('bonusDetail')" href="#" >
                    Details
                  </a>
                </td> -->
                <td>
                  <button class="btn-red-sm">Retry</button>
                </td>
              </tr>
            </tbody>
            <!-- <tbody v-else>
              <tr>
                <td colspan="7" style="text-align: center;">No record found.</td>
              </tr>
            </tbody> -->
          </table> 
          
            <Pagination @page-changed="setBonusPage" :pageSize="bonusPageSize" :pageCount="bonusPageCount" :rowCount="bonusRowCount" />          
            </div> 
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from 'vue-router';
import { addCommas } from '@/utils';
import {SortingIcon} from '@/utils';
import api from '@/api/api';
import { formatDate } from "@/utils";
import Pagination from '@/components/Pagination.vue'; 

const route = useRoute();
const offerId = ref(null);
const offer = ref({});
const bonuses = ref([]);
const bonusPageCount = ref(1);
const bonusRowCount = ref(0);
const bonusPageSize = ref(100);
const bonusCurrentPage = ref(1);
const bonussortByColumn = ref('dateCredited');
const bonussortDirection = ref('desc');

async function loadWelcomeOffer() {
    const response = await api.bonuses.getWelcomeOfferById(offerId.value);
    offer.value = response.data.offer;
    await getBonuses();
}

const getBonuses = async () => {
  const response = await api.bonuses.getWoBonuses(offerId.value, bonusCurrentPage.value, bonussortByColumn.value, bonussortDirection.value, bonusPageSize.value);
  bonuses.value = response.data.bonuses;
  bonusPageCount.value = response.data.pageCount;
  bonusRowCount.value = response.data.rowCount;
}

const getSortIconBonus = (colunm) => {
    const disableColor = '#B4BDC6';
    const enableColor = '#000000';
  
    if (colunm != bonussortByColumn.value) {
      return SortingIcon(disableColor, disableColor)
    }
  
    if (bonussortDirection.value == 'desc') {
      return SortingIcon(disableColor, enableColor);
    }
  
    return SortingIcon(enableColor, disableColor);
}

const sortByBonus = async (column) => {
  if (column === bonussortByColumn.value) {
    bonussortDirection.value = bonussortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    bonussortByColumn.value = column;
    bonussortDirection.value = 'desc';
  }
  await getBonuses();
}

const setBonusPage = async (index) => {
  bonusCurrentPage.value = index;
  if(bonusCurrentPage.value < 1) bonusCurrentPage.value = 1;
  if(bonusCurrentPage.value > bonusPageCount.value) bonusCurrentPage.value = bonusPageCount.value;
  await getBonuses();
}

onMounted(async () => {
    offerId.value = route.params.id;
    await loadWelcomeOffer();
})

const exportToCSV = async () => {
  const response = await api.bonuses.getWoBonuses(offerId.value, bonusCurrentPage.value, bonussortByColumn.value, bonussortDirection.value, 9999);
  if (response.status === 200) {
      if (response.data.bonuses.length <= 0) return;

      const dataArray = response.data.bonuses;
      const header = Object.keys(dataArray[0]).join(",") + "\n";
      const csv = header + dataArray.map(row =>
        Object.values(row).join(",")
      ).join("\n");

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");

      if (navigator.msSaveBlob) {
        // For IE 10+
        navigator.msSaveBlob(blob, "data.csv");
      } else {
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
  }  
}
</script>

<style scoped>
.w-25 {
  width: 25%;
}

.ml-auto {
    margin-left: auto;
}
</style>