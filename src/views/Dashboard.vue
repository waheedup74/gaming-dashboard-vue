<template>
  <div>
    <div class="dashboard-banner">
      <img v-if="authStore.tenantName && authStore.tenantIcon" :src="authStore.tenantUrl" alt="" />
      <div v-if="authStore.tenantName && !authStore.tenantIcon" :style="[{ color: getDefaultLogoColor('color') }, { backgroundColor: getDefaultLogoColor('background') }]" class="defaultBrandIcon">{{ authStore.tenantName[0] }}</div>
      <img v-if="!authStore.tenantName && !authStore.tenantIcon" src="/images/master_dashboard.png" alt="" />
      <h1>{{ authStore.tenantName || "Master" }} Dashboard</h1>
    </div>
    <div class="right-btn-container">
      <button v-if="intervalPaused" @click="pauseInterval()" class="btn-red interval-btn">
        <img src="/images/svg/pause-white-24.svg" alt="icon" >
      </button> 
      <button v-else @click="playInterval()" class="btn-green interval-btn">
        <img src="/images/svg/play.svg" alt="" style="height: 24px;">
      </button>
    </div>
    <div class="dashboard-stats-container">
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Players</p>
            <h3 style="color: #696CFF">{{ addCommas(24564) }}</h3>
          </div>
          <img src="/images/svg/Players.svg" alt="Pl">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Deposit Count</p>
            <h3>{{ addCommas(5643) }}</h3>
          </div>
          <img src="/images/svg/DepositCount.svg" alt="DC">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Total Deposited</p>
            <h3>£{{ addCommas(34125) }}</h3>
          </div>
          <img src="/images/svg/DepositAmount.svg" alt="DA">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Total Wager</p>
            <h3>£{{ addCommas(3625) }}</h3>
          </div>
          <img src="/images/svg/TotalWager.svg" alt="TW">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Bonuses Credited</p>
            <h3>{{ addCommas(110) }}</h3>
          </div>
          <img src="/images/svg/Bonuses.svg" alt="Bo">
        </div>
      </div>
      <div class="card">
        <div class="stat-container">
          <div>
            <p>Total Bonus Amount</p>
            <h3>£{{ addCommas(1196.10) }}</h3>
          </div>
          <img src="/images/svg/TotalBonusAmount.svg" alt="TB">
        </div>
      </div>

    </div>
    <div  class="card">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th><span>Brands <span @click="sortBy('brandName')" v-html="getSortIcon('brandName')"/></span></th>
              <th><span>Players <span @click="sortBy('playersCount')" v-html="getSortIcon('playersCount')"/></span></th>
              <th><span>Deposit Count <span @click="sortBy('depositCount')" v-html="getSortIcon('depositCount')"/></span></th>
              <th><span>Total Deposited <span @click="sortBy('totalDepositAmount')" v-html="getSortIcon('totalDepositAmount')"/></span></th>
              <th><span>Wager <span @click="sortBy('totalWager')" v-html="getSortIcon('totalWager')"/></span></th>
              <th><span>Bonuses <span @click="sortBy('numBonusesCredited')" v-html="getSortIcon('numBonusesCredited')"/></span></th>
              <th><span>Bonus Amount <span @click="sortBy('totalBonusesCredited')" v-html="getSortIcon('totalBonusesCredited')"/></span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(stats, index) in authStore.allTenants" :key="index">
              <td>
                <div class="brand-name-container">
                  <div :style="[{ color: stats.defaultLogo.color }, { background: stats.defaultLogo.background }]" class="brand-name-logo">
                    {{ capitalizeFirstLetter(stats.name[0]) }}
                  </div>
                  <a @click.prevent="setTenant(stats.key, stats.name, stats.iconUrl)" href="#">{{ stats.name }}</a>
                </div>
              </td>
              <td>{{ addCommas(675) }}</td>
              <td>{{ addCommas(78788) }}</td>
              <td>£{{ addCommas(753856.76) }}</td>
              <td>£{{ addCommas(8986.74) }}</td>
              <td>{{ addCommas(8787) }}</td>
              <td>£{{ addCommas(67534.76) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAuthStore } from "@/stores/authStore";
import { addCommas, capitalizeFirstLetter } from '@/utils';
import router from "@/router/index";
import { SortingIcon } from '@/utils';
import api from '@/api/api';

const authStore = useAuthStore();
const brandsStats = ref([
    {
        id: 2,
        tenantId: "test2",
        playersCount: 23483,
        depositCount: 126,
        totalBets: 28984,
        numBonusesCredited: 47,
        totalWager: 1366.34,
        totalDepositAmount: 1245.34,
        totalBonusesCredited: 448.34
    },
    {
        id: 1,
        tenantId: "test1",
        playersCount: 1023,
        depositCount: 124,
        totalBets: 28984,
        numBonusesCredited: 57,
        totalWager: 13566.34,
        totalDepositAmount: 12454.34,
        totalBonusesCredited: 748.34
    }
]);
const totalStats = ref({ playersCount: 0, depositCount: 0, totalDepositAmount: 0, totalWager: 0, numBonusesCredited: 0, totalBonusesCredited: 0 });
const intervalId = ref(null);
const intervalPaused = ref(false);
const sortDirection = ref('desc');
const sortByColumn = ref('brandName');

const getDefaultLogoColor = (name) => {
  console.log(authStore.allTenants)
  return authStore.allTenants.find(item => item.name.toLocaleLowerCase() === authStore.tenantName.toLocaleLowerCase())?.defaultLogo[name]
}

async function setTenant(tenantId, name, icon) {
  authStore.setTenant(tenantId, name, icon);
  router.push("/");
}

function getTenant(tenantId) {
  for (var i = 0; i < authStore.allTenants.length; i++) {
    if (authStore.allTenants[i].key === tenantId) return authStore.allTenants[i];
  }
  return null;
}

watch(() => authStore.tenantName, async () => {
  await loadBrands();
});

watch(() => authStore.allTenants, async () => {
  await loadBrands();
});



async function loadBrands() {
  const updatedStats = { ...totalStats.value };
  if (authStore.tenantName) {
    const response = await api.brands.getBrandStats();
    const stats = response.data?.stats;

    if (stats && JSON.stringify(stats) !== JSON.stringify(updatedStats)) {
      updatedStats.playersCount = stats.playersCount;
      updatedStats.depositCount = stats.depositCount;
      updatedStats.totalDepositAmount = stats.totalDepositAmount;
      updatedStats.totalWager = stats.totalWager;
      updatedStats.numBonusesCredited = stats.numBonusesCredited;
      updatedStats.totalBonusesCredited = stats.totalBonusesCredited;
      totalStats.value = updatedStats;
    }
  } else { 
    const response = await api.brands.getAllBrandStats();
    const brandsStatsData = response.data.brandsStats; 
    if (brandsStatsData && JSON.stringify(brandsStatsData) !== JSON.stringify(brandsStats.value)) { 
      brandsStats.value = brandsStatsData;
      updatedStats.playersCount = 0;
      updatedStats.depositCount = 0;
      updatedStats.totalDepositAmount = 0;
      updatedStats.totalWager = 0;
      updatedStats.numBonusesCredited = 0;
      updatedStats.totalBonusesCredited = 0;

      for (let i = 0; i < brandsStatsData.length; i++) {
        updatedStats.playersCount += brandsStatsData[i].playersCount;
        updatedStats.depositCount += brandsStatsData[i].depositCount;
        updatedStats.totalDepositAmount += brandsStatsData[i].totalDepositAmount;
        updatedStats.totalWager += brandsStatsData[i].totalWager;
        updatedStats.numBonusesCredited += brandsStatsData[i].numBonusesCredited;
        updatedStats.totalBonusesCredited += brandsStatsData[i].totalBonusesCredited;

        brandsStatsData[i].brand = getTenant(brandsStatsData[i].tenantId);
        brandsStatsData[i].brandName = brandsStatsData[i].brand?.name;
      }

      totalStats.value = updatedStats;
    }
  } 
}

onMounted(async () => {
  const tenantStorage = JSON.parse(localStorage.getItem('tenant'));
  await setTenant(tenantStorage.id, tenantStorage.name, tenantStorage.logo);  
  await loadBrands(); 
});

const getUpdatedData = () => {
  intervalId.value = setInterval(async () => {
    await loadBrands();
  }, 1000)
  intervalPaused.value = false;
}

const pauseInterval = () => {
  clearInterval(intervalId.value);
  intervalId.value = null; 
  intervalPaused.value = false;
}
const playInterval = () => {
  getUpdatedData();
  intervalPaused.value = true;
}

const sortBy = (property) => {
  if (property === sortByColumn.value) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortByColumn.value = property;
    sortDirection.value = 'desc';
  }

  if (brandsStats.value) {
    brandsStats.value = brandsStats.value.sort((a, b) => {
      let comparison = 0;
      let valueA = typeof a[property] === 'string' ? a[property].toUpperCase() : a[property];
      let valueB = typeof b[property] === 'string' ? b[property].toUpperCase() : b[property];

      if (valueA < valueB) 
          comparison = -1; 
        
      if (valueA > valueB) 
          comparison = 1; 

      return sortDirection.value === 'asc' ? comparison : -comparison;
    });
  }
}
 
const getSortIcon = (property) => {
    const disableColor = '#B4BDC6';
    const enableColor = '#000000'; 
    if (property != sortByColumn.value)
      return SortingIcon(disableColor, disableColor);
    if (sortDirection.value == 'desc') 
      return SortingIcon(disableColor, enableColor);
    return SortingIcon(enableColor, disableColor);
}
</script>
