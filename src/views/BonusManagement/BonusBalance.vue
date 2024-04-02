<template>
    <div>
        <div class="banner">
            <img src="/images/welcome-offers.png" alt="" />
            <h1>Bonus Balances</h1>
        </div>
        <div class="right-btn-container">
            <button @click="exportToCSV(balances)" class="btn-normal">
                <img src="/images/svg/upload.svg" alt="icon">
                Export CSV</button>
        </div>
        <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><span>Player <span @click="sortByBonus('playerId')" v-html="getSortIconBonus('playerId')"  /></span></th>
                <th><span>Issued <span @click="sortByBonus('dateCredited')" v-html="getSortIconBonus('dateCredited')"  /></span></th>
                <th><span>expiry date<span @click="sortByBonus('dateExpires')" v-html="getSortIconBonus('dateExpires')"  /></span></th>
                <th><span>currency<span @click="sortByBonus('currency')" v-html="getSortIconBonus('currency')"  /></span></th>
                <th><span>Rollover <span @click="sortByBonus('rollover')" v-html="getSortIconBonus('rollover')"  /></span></th>
                <th><span>Progress </span></th>
                <th><span>Balance <span @click="sortByBonus('balance')" v-html="getSortIconBonus('balance')"  /></span></th>
              </tr>
            </thead>
            <tbody v-if="balances.length > 0">
              <tr v-for="b in balances" :key="index">
                <td>
                    <router-link :to="'/players/' + b.playerId ">
                        {{b.playerId}}
                    </router-link>
                </td>
                <td>{{formatDate(b.dateCredited)}}</td>
                <td>{{formatDate(b.dateExpires)}}</td>
                <td>{{b.currency}}</td>
                <td>{{b.rollover}}x</td>
                <td>
                    <div class="progress">
                        <div class="progress-bar-container">
                            <div :style="{width: (b.currentWager/b.wagerRequired * 100)+'%'}" class="progress-bar-indicator"></div>
                        </div>
                            {{(b.currentWager/b.wagerRequired * 100).toFixed(2)}}%
                    </div>
                </td>
                <td>£{{ addCommas(b.balance) }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" style="text-align: center;">No record found.</td>
              </tr>
            </tbody>
          </table>
        </div>
            <Pagination @page-changed="setBonusPage" :pageSize="bonusPageSize" :pageCount="bonusPageCount" :rowCount="bonusRowCount" />  
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted} from "vue"; 
import { addCommas, SortingIcon, formatDate } from "@/utils";
import api from "@/api/api";
import Pagination from '@/components/Pagination.vue'; 

const balances = ref([]);
const bonusPageCount = ref(1);
const bonusRowCount = ref(0);
const bonusPageSize = ref(100);
const bonusCurrentPage = ref(1);
const bonussortByColumn = ref('dateCredited');
const bonussortDirection = ref('desc');
 
const getBonuses = async () => { 
  const response = await api.bonuses.getBonusBalances(bonusCurrentPage.value, bonussortByColumn.value, bonussortDirection.value, bonusPageSize.value);
  if (response.status == 200) { 
      balances.value = response.data.balances; 
      bonusPageCount.value = response.data.pageCount;
      bonusRowCount.value = response.data.rowCount;
  }
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
  await getBonuses();  
})

const exportToCSV = async () => {
  const response = await api.bonuses.getBonusBalances(bonusCurrentPage.value, bonussortByColumn.value, bonussortDirection.value, 9999);
  if(response.status === 200) {
      const dataArray = response.data.balances;
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
.pagination-btns {
    column-gap: 8px;
}

.progress {
    display: flex; 
    align-items: center; 
    column-gap: 16px;
    & .progress-bar-container {
      height: 16px !important;
      border-radius: 100px;
      width: 200px;
    }
    & .progress-bar-indicator::before {
      background-image: none;
      background-color: #696CFF;
    }
}
</style>