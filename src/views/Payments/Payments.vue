<template>
  <div>
    <div class="banner">
      <img src="/images/payments.png" />
      <h1>Payments</h1>
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
        <form v-if="showFilters" @submit.prevent="() => getPayments()" autocomplete="off">
          <div class="payment-filter-form">
            <div class="horizontal-form-container">
              <div class="input-fields">
                <div class="input-field-container">
                  <label for="id">ID</label>
                  <input v-model="paymentId" type="text" placeholder="Payment ID" class="input-field" />
                </div>
                <div class="input-field-container">
                  <label for="player">Player</label>
                  <input v-model="playerId" type="text" placeholder="Player ID" class="input-field" />
                </div>
                <div class="input-field-container">
                  <label for="date-placed">DATE</label>
                  <DatePicker :getDate="datePlaced" ref="datePlacedref" />
                </div>
              </div>
            </div>
            <div class="horizontal-form-container">
              <div class="input-fields">
                <div class="input-field-container">
                  <label for="amount">Amount</label>
                  <input v-model="amount" type="text" placeholder="£0.00" class="input-field"/>
                </div>
                <div class="input-field-container">
                  <label for="type">Type</label>
                  <SelectDropdown :dataList="optionsList" @selected="handleSelected" position="absolute" name="type" ref="typeDropDownref"/>
                </div>
              </div>
              <div class="buttons">
                <button @click="() => handleClear()" class="cancel" type="button">Clear</button>
                <button class="button search" type="submit">Search</button>
              </div>
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
              <th><span>PLAYER <span @click="sortBy('externalPlayerId')" v-html="getSortIcon('externalPlayerId')" /></span></th>
              <th><span>Date <span @click="sortBy('dateCreated')" v-html="getSortIcon('dateCreated')" /></span></th>
              <th><span>Currency <span @click="sortBy('currency')" v-html="getSortIcon('currency')" /></span></th>
              <th><span>Amount <span @click="sortBy('amount')" v-html="getSortIcon('amount')" /></span></th>
              <th><span>Type<span @click="sortBy('type')" v-html="getSortIcon('type')" /></span></th>
            </tr>
          </thead>
          <tbody >
            <tr v-for="payment in 4" :key="payment">
              <td>10001</td>
              <td>
                <router-link :to="{ name: 'player-details', params: { id: 10001}}">Test Player
                </router-link>
              </td>
              <td>2024-04-20</td>
              <td>GBP</td>
              <td>{{addCommas(400)}}</td>
              <td>
                <!-- <div v-if="payment.type === 'deposit'" class="category-logo-container">
                  <img src="/images/svg/Deposit.svg" alt="icon"> <span>Deposit</span>
                </div> -->
                <div class="category-logo-container">
                  <img src="/images/svg/withdraw.svg" alt="icon"> <span>Withdrawal</span>
                </div>
              </td>
            </tr>
          </tbody>
          <!-- <tbody v-else>
            <tr>
              <td colspan="7" style="text-align: center;">
                <template v-if="paymentsFetched">
                  No payments found.
                </template>
              </td>
            </tr>
          </tbody> -->
        </table>
      </div>
      <Pagination @page-changed="setPage" :pageSize="paymentsPageSize" :pageCount="paymentsPageCount" :rowCount="paymentsRowCount" />
      <!-- <template v-if="!paymentsFetched">
        <div class="api-loader">
          <div class="loader">
          </div>
        </div>
      </template>  -->
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
import SelectDropdown from "@/components/SelectDropdown.vue";
import { ref, onMounted } from "vue";
import api from "@/api/api";
import { addCommas, SortingIcon, formatDate } from "@/utils";

const typeDropDownref = ref(null);
const datePlacedref = ref(null);
const showFilters = ref(false);
const optionsList = [
  {
    name: "deposit",
    id: 1,
  },
  {
    name: "withdrawal",
    id: 2,
  },
];

const paymentId = ref('');
const playerId = ref('');
const dateCreated = ref('');
const type = ref('');
const amount = ref('');
const payments = ref([]);
const paymentsPageCount = ref(1);
const paymentsRowCount = ref(0);
const paymentsPageSize = ref(100);
const paymentsCurrentPage = ref(1);
const paymentsFetched = ref(false);
const sortByColumn = ref('dateCreated');
const sortDirection = ref('desc');

const getPayments = async () => {
  paymentsFetched.value = false;
  payments.value = [];
  const response = await api.payments.getPayments(paymentId.value, playerId.value, dateCreated.value, type.value, amount.value, paymentsCurrentPage.value, sortByColumn.value, sortDirection.value, paymentsPageSize.value);
  paymentsFetched.value = true;
  payments.value = response.data.payments;
  paymentsPageCount.value = response.data.pageCount;
  paymentsRowCount.value = response.data.rowCount;
}

const handleClear = () => {
  paymentId.value = '';
  playerId.value = '';
  dateCreated.value = '';
  type.value = '';
  amount.value = '';
  datePlacedref.value.reset();
  const typeDropDown = typeDropDownref.value;
  if (typeDropDown && typeDropDown.reset) {
    typeDropDown.reset();
  }
  getPayments();
}

const handleSelected = (options) => {
  const {option} = options 
  type.value = option;
};

const datePlaced = (date) => {
  dateCreated.value = date.formattedDate;
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
  await getPayments();
}

const setPage = async (index) => {
  paymentsCurrentPage.value = index;
  if(paymentsCurrentPage.value < 1) paymentsCurrentPage.value = 1;
  if(paymentsCurrentPage.value > paymentsPageCount.value) paymentsCurrentPage.value = paymentsPageCount.value;
  await getPayments();
}

onMounted(async () => {
  await getPayments();
});
</script>

<style scoped>
.hr-40 {
  margin: 40px 0;
  height: 1px;
  background: #D9DEE3;
}
</style>