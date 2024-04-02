<template>
  <div>
    <div class="banner">
      <img src="/images/players.png" alt="player" />
      <h1>Player: {{ playerId }}</h1>
    </div>
    <div class="breadcrumbs">
      <router-link to="/players">Players</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <span class="current">Player {{ playerId }}</span>
    </div>
    <div class="desktop-tabs">
      <div @click="switchTab('overview')" :class="{ active: tab === 'overview'}" class="tab"> OVERVIEW </div>
      <div @click="switchTab('payments')" :class="{ active: tab === 'payments'}" class="tab"> PAYMENTS </div>
      <div @click="switchTab('bets')" :class="{ active: tab === 'bets'}" class="tab"> BETS </div>
      <div @click="switchTab('bonus')" :class="{ active: tab === 'bonus'}" class="tab">BONUSES </div>
    </div>
    <div v-if="tab === 'overview'">
      <div class="right-btn-container">
        <div class="buttons">
          <button v-if="player?.excludeBonuses" @click="showModal('enable')" class="btn-green">
            Enable bonuses
          </button>
          <!-- !! TEMPORARY HIDING !! -->
          <!-- <button v-if="!player?.excludeBonuses" @click="showModal('disable')" class="btn-red">
            Exclude from Bonuses
          </button> -->
          <button v-if="!player?.excludeBonuses" @click="showModal('bonus')" class="btn-normal">
            <img src="/images/svg/plus-24.svg" alt="plus">
            Add Bonus
          </button>
        </div>
      </div>
      <div v-if="player === null && playerFetched" class="player-not-found">
        Player not found
      </div>
       <template v-if="!playerFetched">
        <div class="api-loader-details-page">
          <div class="loader"></div>
        </div>
      </template>
      <div v-if="player != null" class="player-stats-container player-stats-container-large">
        <div class="card">
          <div class="stat-container">
            <div class="stats">
              <p>Total Wager</p>
              <h3>£{{addCommas(player.totalWager)}}</h3>
            </div>
            <img src="/images/svg/wager-80.svg" alt="TW">
          </div>
        </div>
        <div class="card">
          <div class="stat-container">
            <div class="stats">
              <p>GGR</p>
              <h3 style="color: #82e14f">£{{addCommas(player.totalGGR)}}</h3>
            </div>
            <img src="/images/svg/ggr-80.svg" alt="ggr">
          </div>
        </div>
      </div>
      <div v-if="player != null" class="player-stats-container">
        <div class="card">
          <div class="stat-container">
            <div class="stats">
              <p>Total Deposited</p>
              <h3>£{{addCommas(player.totalDeposited)}}</h3>
            </div>
            <img src="/images/svg/DepositAmount.svg" alt="DA">
          </div>
        </div>
        <div class="card card-16">
          <div class="stat-container">
            <div class="stats">
              <p>Last Deposit</p>
              <div>
                <h4>£{{addCommas(player.lastDepositAmount)}}</h4>
                <span>{{player.lastDepositAmount === 0 ? "N/A" : player.lastDepositDate.split('.')[0].replace('T', ' ')}}</span>
              </div>
            </div>
            <img src="/images/svg/LastDeposit-88.svg" alt="LD">
          </div>
        </div>
        <div class="card">
          <div class="stat-container">
            <div class="stats">
              <p>Deposit Count</p>
              <h3>{{player.depositCount}}</h3>
            </div>
            <img src="/images/svg/DepositCount.svg" alt="DC">
          </div>
        </div>
        <div class="card">
          <div class="stat-container">
            <div class="stats">
              <p>Total Bonuses</p>
              <h3 style="color: #ff3e1d">£{{addCommas(player.totalBonusAmount)}}</h3>
            </div>
            <img src="/images/svg/Bonuses.svg" alt="Bo">
          </div>
        </div>
        <div class="card card-16">
          <div class="stat-container">
            <div class="stats">
              <p>Signup Date</p>
              <div>
                <h4>{{player.signupDate.split('T')[0]}}</h4>
                <span>{{player.signupDate.split('T')[1].split('.')[0]}}</span>
              </div>
            </div>
            <img src="/images/svg/SignupDate.svg" alt="SD">
          </div>
        </div>
        <div class="card card-16">
          <div class="stat-container">
            <div class="stats">
              <p>Last Bet</p>
              <div>
                <h4>£{{addCommas(player.lastBetAmount)}}</h4>
                <span>{{player.lastBetAmount === 0 ? "N/A": player.lastBetDate.split('.')[0].replace('T', ' ')}}</span>
              </div>
            </div>
            <img src="/images/svg/LastBet.svg" alt="LB">
          </div>
        </div>
        <div class="card">
          <div class="stat-container">
            <div class="stats">
              <p>Total Bets</p>
              <h3>{{player.totalBets}}</h3>
            </div>
            <img src="/images/svg/TotalBets.svg" alt="TB">
          </div>
        </div>
        <div class="card">
          <div class="stat-container">
            <div class="stats" >
              <p>Signup Code</p>
              <h4 class="code">{{player.signupPromoCode || "N/A"}}</h4>
            </div>
            <img src="/images/svg/SignupCode.svg" alt="SC">
          </div>
        </div>
      </div>
    </div>

    <div v-if="tab === 'payments'" class="mt-24"> 
      <template v-if="!isPayment">
        <div class="api-loader-details-page">
          <div class="loader"></div>
        </div>
      </template>
      <div v-else class="card">
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
                  <label for="date-placed">Id</label>
                  <input v-model="paymentId" type="text" placeholder="" class="input-field" />
                </div>
                <div class="input-field-container">
                  <label for="date-placed">DATE Placed</label>
                  <DatePicker :getDate="paymentDatePlaced" ref="datePlacedref" />
                </div>
                <div class="input-field-container">
                  <label for="type">Type</label>
                  <SelectDropdown :dataList="paymentOptionsList" @selected="paymentHandleSelected" :customStyle="dropdownStyle" position="absolute" name="type" ref="typeDropDownref"/>
                </div>
                <div class="input-field-container">
                  <label for="amount">Amount</label>
                  <input v-model="amount" type="text" placeholder="£0.00" class="input-field" />
                </div>
                <div class="buttons">
                <button class="cancel" type="button" @click="() => paymentHandleClear()">Clear</button>
                <button class="button search" type="submit">Search</button>
              </div>
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
              <th><span>Id <span @click="sortByPayments('externalId')" v-html="getSortIconPayments('externalId')" /></span></th>
              <th><span>Date <span @click="sortByPayments('dateCreated')" v-html="getSortIconPayments('dateCreated')" /></span></th>
              <th><span>Type<span @click="sortByPayments('type')" v-html="getSortIconPayments('type')" /></span></th>
              <th><span>Currency <span @click="sortByPayments('currency')" v-html="getSortIconPayments('currency')" /></span></th>
              <th><span>Amount <span @click="sortByPayments('amount')" v-html="getSortIconPayments('amount')" /></span></th>
            </tr>
          </thead>
          <tbody v-if="payments.length > 0">
            <tr v-for="payment in payments" :key="payment.id">
              <td>{{payment.externalId}}</td>
              <td>{{formatDate(payment.dateCreated)}}</td>
              <td>
                <div v-if="payment.type === 'deposit'" class="category-logo-container">
                  <img src="/images/svg/Deposit.svg" alt="icon"> <span>Deposit</span>
                </div>
                <div class="category-logo-container" v-else>
                  <img src="/images/svg/withdraw.svg" alt="icon"> <span>Withdrawal</span>
                </div>
              </td>
              <td>{{payment.currency}}</td>
              <td>{{addCommas(payment.amount)}}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7" style="text-align: center;">No payments found.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination @page-changed="setPaymentPage" :pageSize="paymentsPageSize" :pageCount="paymentsPageCount" :rowCount="paymentsRowCount" /> 
    </div>
    </div>

    <div v-if="tab === 'bets'" class="mt-24">
      <template v-if="!isBets">
        <div class="api-loader-details-page">
          <div class="loader"></div>
        </div>
      </template>
      <div v-else class="card">
        <div class="palyer-bet-filters">
          <div @click="showFilters = !showFilters" class="filters-header">
            <div class="filter">
              <img src="/images/svg/filter-32.svg" alt="filter">
              <p>Filter</p>
            </div>
            <div>
              <img :style="[showFilters ? { rotate: '180deg' } : { rotate: '0deg' }]" src="/images/svg/chevron-down-32.svg" alt="filter">
            </div>
          </div>
        <form v-if="showFilters" @submit.prevent="() => getBets()" class="filter-form">
          <div class="filters-container">
            <div>
              <label for="id">ID</label>
              <input v-model="betsId" type="text" placeholder="Id"/>
            </div>
            <div>
              <label for="id">date placed</label>
              <DatePicker :getDate="getBetsDatePlaced" ref="betsDatePlacedref"/>
            </div>
            <div>
              <label for="id">Game</label>
              <input v-model="betsGameId" type="text" placeholder="Game ID"/>
            </div>
            <div>
              <label for="id">Wager</label>
              <input v-model="betsWager" type="text" placeholder="£0.00"/>
            </div>
            <div class="buttons">
              <button @click.prevent="betsHandleClear" class="cancel" type="button">Clear</button>
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
                <th><span>Id <span @click="sortByBets('externalId')" v-html="getSortIconBets('externalId')" /></span></th>
                <th><span>Date <span @click="sortByBets('dateCreated')" v-html="getSortIconBets('dateCreated')" /></span></th>
                <th><span>Game<span @click="sortByBets('gameId')" v-html="getSortIconBets('gameId')" /></span></th>
                <th><span>Currency <span @click="sortByBets('currency')" v-html="getSortIconBets('currency')" /></span></th>
                <th><span>Wager <span @click="sortByBets('wager')" v-html="getSortIconBets('wager')" /></span></th>
              </tr>
            </thead>
            <tbody v-if="bets.length > 0">
              <tr v-for="bet in bets" :key="bet.id">
                <td>{{bet.externalId}}</td>
                <td>{{formatDate(bet.dateCreated)}}</td>
                <td>{{bet.gameId}}</td>
                <td>{{bet.currency}}</td>
                <td>{{addCommas(bet.wager)}}</td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7" style="text-align: center;">No bets found.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination @page-changed="setBetPage" :pageSize="betsPageSize" :pageCount="betsPageCount" :rowCount="betsRowCount" /> 
      </div>
    </div>
    <div v-if="tab === 'bonus'">
      <template v-if="!isBonus">
        <div class="api-loader-details-page">
          <div class="loader"></div>
        </div>
      </template>
      <template v-else>
        <div class="right-btn-container">
          <div class="buttons">
            <button v-if="player?.excludeBonuses" @click="showModal('enable')" class="btn-green">
              Enable bonuses
            </button>
            <!-- !! TEMPORARY HIDING !! -->
            <!-- <button v-if="!player?.excludeBonuses" @click="showModal('disable')" class="btn-red">
              Exclude from Bonuses
            </button> -->
            <button v-if="!player?.excludeBonuses" @click="showModal('bonus')" class="btn-normal">
              <img src="/images/svg/plus-24.svg" alt="plus">
              Add Bonus
            </button>
          </div>
        </div>
        <!-- !! TEMPORARY HIDING !! -->
        <!-- <div v-if="bonusBalance != null" class="bonus-detail-container">
          <div class="bonusDetail"> 
            <h3>
              Current Bonus Balance
            </h3>
            <h1>
              £{{bonusBalance.balance}}
            </h1>
            <div class="dates">
              <div>
                <img src="/images/svg/calendar-blue-48.svg" alt="icon">
              </div>
              <div class="title-container">
                <p>Date Credited</p>
                <img src="/images/svg/right-arrow-24.svg" alt="">
                <p>Expiry Date</p>
              </div>
              <div class="date-container" style="">
                <p class="date">{{formatDateOnly(bonusBalance.dateCredited)}}</p>
                <img src="/images/svg/right-arrow-24.svg" alt="">
                <p class="date"> {{formatDateOnly(bonusBalance.dateExpires)}}</p>
              </div>
            </div>
          </div>
          <div class="active-bonus">
            <h3>Active Bonus</h3>
            <div class="section-one">
              <div class="section-one-sub">
                <p>Current Wager: <span>£{{bonusBalance.currentWager}}</span></p>
                <p>Wager Required: <span>£{{bonusBalance.wagerRequired}}</span></p>
              </div>
              <div class="progress-bar-container">
                <div class="progress-bar-indicator" :style="{width: (bonusBalance.currentWager/bonusBalance.wagerRequired * 100)+'%'}"></div>
              </div>
            </div>
            <div class="section-two">
              <div class="section-two-sub">
                <p>Bonus Credited: <span>£{{bonusBalance.bonusCredited}}</span></p>
                <p>Currency: <span>{{bonusBalance.currency}}</span></p>
                <p>Rollover: <span>{{bonusBalance.rollover}}x</span></p>
              </div>
                <button @click="showModal('forfeit')" class="btn-red">Forfeit Bonus</button>
            </div>
          </div>
          <div class="img-container"></div>
        </div> -->
        <div class="table-card">
          <h3>Bonus Credited</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th><span>Date <span @click="sortByBonus('dateCredited')" v-html="getSortIconBonus('dateCredited')"  /></span></th>
                  <th><span>Currency <span @click="sortByBonus('currency')" v-html="getSortIconBonus('currency')"  /></span></th>
                  <th><span>Type<span @click="sortByBonus('type')" v-html="getSortIconBonus('type')"  /></span></th>
                  <th><span>Amount <span @click="sortByBonus('amount')" v-html="getSortIconBonus('amount')"  /></span></th>
                  <th><span>Status <span @click="sortByBonus('status')" v-html="getSortIconBonus('status')"  /></span></th>
                  <!-- !! TEMPORARY HIDING !! -->
                  <!-- <th></th> -->
                </tr>
              </thead>
              <tbody v-if="bonuses.length > 0">
                <tr v-for="(b, index) in bonuses" :key="index">
                  <td>{{formatDate(b.dateCredited)}}</td>
                  <td>{{b.currency}}</td>
                  <td style="text-transform: uppercase">
                    <span v-if="b.type === 'Free Spins'" class="badge badge-yellow">{{ b.type }}</span>
                    <span v-else-if="b.type === 'Deposit Bonus + Free Spins'" class="badge badge-purple">{{ b.type }}</span>
                    <span v-else-if="b.type === 'Cashback'" class="badge badge-red">{{ b.type }}</span>
                    <span v-else-if="b.type === 'Deposit Bonus'" class="badge badge-blue">{{ b.type }}</span>
                    <span v-else class="badge badge-yellow">{{ b.type }}</span>
                  </td>
                  <td>£{{addCommas(b.amount)}}</td>
                  <td style="text-transform: uppercase">
                    <span v-if="b.status === 'error'" class="status-error"><img src="/images/svg/error-red-16.svg" alt="icon">{{ b.status  }} </span>
                    <span v-else-if="b.status === 'Complete'">{{ b.stats }} </span>
                    <span v-else-if="b.status === 'active'" class="active-green">{{ b.status }} </span>
                    <span v-else-if="b.status === 'Forfeited'">{{ b.status }} </span>
                    <span v-else>{{ b.status }} </span>
                  </td>
                  <!-- !! TEMPORARY HIDING !! -->
                  <!-- <td>
                    <a @click="showModal('bonusDetail')" href="#" >
                      Details
                    </a>
                  </td> -->
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="7" style="text-align: center;">No record found.</td>
                </tr>
              </tbody>
            </table>
            
            <Pagination @page-changed="setBonusPage" :pageSize="bonusPageSize" :pageCount="bonusPageCount" :rowCount="bonusRowCount" /> 
          </div>
        </div>
      </template>
    </div>
  
    <teleport to="body">
      <Modal v-if="isModalVisible" :isOpen="isModalVisible" @close-modal="closeModal">
        <div v-if="(modalType === 'bonus' || modalType === 'bonusDetail')" @click="closeModal" class="cross-button-banner-modal">
          <img src="/images/svg/close-32.svg" alt="icon">
        </div>
        <div v-if="modalType === 'bonus'" class="detail-modal">
          <div class="modal-banner">
            <h1>Add Bonus</h1>
          </div>
          <div class="player-modal">
            <form @submit.prevent="submitBonusForm">
              <div class="bonus-form">
                  <div class="form-group">
                      <div>
                          <label for="currency">CURRENCY</label>
                          <SelectDropdown :dataList="currencyList" @selected="currencySelected" defaultValue="GBP" :customStyle="dropdownStyle" position="absolute" name="currency" />
                          <div v-if="bonusFormErrors.currency" class="error-message">{{ parseErrorMessage(bonusFormErrors.currency).message }}</div>
                      </div>
                      <div>
                          <label for="expiers">EXPIRES (IN DAYS)</label>
                          <input v-model="bonusForm.expireInDays" type="text" placeholder="0">
                            <div v-if="bonusFormErrors.expireInDays" class="error-message" >{{ parseErrorMessage(bonusFormErrors.expireInDays).message }}</div>
                      </div>
                  </div>
                  <div>
                      <label for="game">Game</label>
                      <div>                        
                          <Autocomplete :itemSelected="handleGameSelected" :fetchItems="getGamesBy" />
                      </div>
                      <div v-if="bonusFormErrors.searchGame" class="error-message">{{ parseErrorMessage(bonusFormErrors.searchGame).message }}</div>
                  </div>
                  <div class="form-group">
                      <div>
                          <label for="spins">NUMBER OF SPINS</label>
                          <input v-model="bonusForm.numberOfSpins" type="text" placeholder="5">
                          <div v-if="bonusFormErrors.numberOfSpins" class="error-message">{{ parseErrorMessage(bonusFormErrors.numberOfSpins).message }}</div>
                      </div>
                      <div>
                          <label for="freespins">VALUE OF FREE SPIN</label>
                          <input v-model="bonusForm.freeSpins" type="text" placeholder="10">
                          <div v-if="bonusFormErrors.freeSpins" class="error-message">{{ parseErrorMessage(bonusFormErrors.freeSpins).message }}</div>
                      </div>
                  </div>
              </div>
              <div class="right-btn-container">
                <button type="submit" class="btn-xl">Save</button>
              </div>
            </form>
          </div>
        </div>
        <div v-if="modalType === 'disable'">
          <div  @click="closeModal" class="cross-button">
              <img src="/images/svg/close-gray-32.svg" alt="close">
          </div>
          <div class="delete-modal">
              <h1>Are you sure?</h1>
              <p>
                You are about to exclude the player: <span class="settings"> {{ playerId }}</span> <br /> from all bonuses.
              </p>
              <div class="listButtons">
                  <button @click="closeModal" class="button cancel">Cancel</button>
                  <button @click="handleModalConfirmation" class="btn-red-lg">
                      Yes, exclude from all bonuses
                  </button>
              </div>
          </div>
        </div>
        <div v-if="modalType === 'enable'">
          <div  @click="closeModal" class="cross-button">
              <img src="/images/svg/close-gray-32.svg" alt="close">
          </div>
          <div class="delete-modal">
              <h1>Are you sure?</h1>
              <p>
                You are about to enable bonuses <br />for the player: <span class="settings"> {{ playerId }}</span>
              </p>
              <div class="listButtons">
                  <button @click="closeModal" class="button cancel">Cancel</button>
                  <button @click="handleModalConfirmation" class="btn-green-lg">
                      Yes, enable all bonuses
                  </button>
              </div>
          </div>
        </div>
        <div class="bonus-detail-modal">
          <div v-if="modalType === 'bonusDetail'" class="detail-modal">
            <div class="modal-banner">
              <h1>Bonus Details</h1>
            </div>
            <div class="bonus-detail">
              <p>Bonus Type: <span>Free Spins</span></p>
              <p>Free Spins Value: <span>£0.20</span></p>
              <p>Number of Spins: <span>50</span></p>
              <p>Game: <span>Sweet Bonanza</span></p>
              <p>Expiry Date: <span>2024-01-01</span></p>
            </div>
          </div>
        </div>
        <div v-if="modalType === 'forfeit'">
          <div  @click="closeModal" class="cross-button">
              <img src="/images/svg/close-gray-32.svg" alt="close">
          </div>
          <div class="delete-modal">
              <h1>Are you sure?</h1>
              <p>
                You are about to forfeit the bonus balance <br />
                from the player: <span class="settings"> {{ playerId }}</span>
              </p>
              <p><span class="disable-color">£{{bonusBalance.balance}}</span> will be removed from their balance.</p>
              <div class="listButtons">
                  <button @click="closeModal" class="button cancel">Cancel</button>
                  <button @click="handleModalConfirmation" class="btn-red-lg">
                      Yes, forfeit bonus balance
                  </button>
              </div>
          </div>
        </div>
      </Modal>
    </teleport>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker.vue';
import Autocomplete  from '@/components/Autocomplete.vue';
import Pagination from '@/components/Pagination.vue';
export default {
  components: { DatePicker, Autocomplete, Pagination },
};
</script>
<script setup>
import Modal from "@/components/Modal/PopoverModal.vue";
import SelectDropdown from "@/components/SelectDropdown.vue";
import { ref, onMounted, reactive  } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/api";
import { addCommas, SortingIcon, formatDate, formatDateOnly, parseErrorMessage, currencyList } from "@/utils";
import { z } from 'zod';
import { onBeforeRouteUpdate } from 'vue-router';

const showFilters = ref(false);
const route = useRoute();
const tab = ref("overview");
const playerId = ref(route.params.id);
const player = ref(null);
const bonusBalance = ref(null);
const modalType = ref(null);
const isModalVisible = ref(false);

const bonusPageCount = ref(1);
const bonusRowCount = ref(0);
const bonusPageSize = ref(100);
const bonusCurrentPage = ref(1);
const bonussortByColumn = ref('dateCredited');
const bonussortDirection = ref('desc');
const playerFetched = ref(false);
const isPayment = ref(false);
const isBets = ref(false);
const isBonus = ref(false);
const paymentId = ref('');

const dropdownStyle = {
  minWidth: '0px !important',
  width: '100%'
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

const showModal = (type) => {
  isModalVisible.value = true;
  modalType.value = type;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => {
  await getPlayer();
  await getBonusBalance();
});

onBeforeRouteUpdate(async (to, from, next) => {
  playerId.value = to.params.id;
  await getPlayer();
  next()
})

const getBonusBalance = async () => {
  const response = await api.bonuses.getBonusBalance(playerId.value);
  if(response.status == 200) {
    bonusBalance.value = response.data.balance;
  }
};

const getPlayer = async () => {
  playerFetched.value = false;
  const response = await api.players.getPlayer(playerId.value);
  player.value = response.data;
  playerFetched.value = true;
};

const betsDatePlacedref = ref(null);
const betsDatePlaced = ref('');
const betsGameId = ref('');
const betsWager = ref(0);
const betsId = ref('');
const bets = ref([]);
const bonuses = ref([]);
const betsPageCount = ref(1);
const betsRowCount = ref(0);
const betsPageSize = ref(100);
const betsCurrentPage = ref(1); 
const betsSortByColumn = ref('dateCreated');
const betsSortDirection = ref('desc');

const getBets = async () => { 
  isBets.value = false;
  const response = await api.bets.getBets(playerId.value, betsDatePlaced.value, betsGameId.value, betsWager.value, betsCurrentPage.value, betsSortByColumn.value, betsSortDirection.value, betsPageSize.value, betsId.value);
  bets.value = response.data.bets;
  betsPageCount.value = response.data.pageCount;
  betsRowCount.value = response.data.rowCount;
  isBets.value = true;
}
 
const getSortIconBets = (colunm) => {
    const disableColor = '#B4BDC6';
    const enableColor = '#000000';
  
    if (colunm != betsSortByColumn.value) {
      return SortingIcon(disableColor, disableColor)
    }
  
    if (betsSortDirection.value == 'desc') {
      return SortingIcon(disableColor, enableColor);
    }
  
    return SortingIcon(enableColor, disableColor);
}

const sortByBets = async (column) => {
  if (column === betsSortByColumn.value) {
    betsSortDirection.value = betsSortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    betsSortByColumn.value = column;
    betsSortDirection.value = 'desc';
  }
  await getBets();
}

const setBetPage = async (index) => {
  betsCurrentPage.value = index;
  if(betsCurrentPage.value < 1) betsCurrentPage.value = 1;
  if(betsCurrentPage.value > betsPageCount.value) betsCurrentPage.value = betsPageCount.value;
  await getBets();
}


const getBonuses = async () => {
  isBonus.value = false;
  const response = await api.bonuses.getBonuses(playerId.value, bonusCurrentPage.value, bonussortByColumn.value, bonussortDirection.value, bonusPageSize.value);
  bonuses.value = response.data.bonuses;
  bonusPageCount.value = response.data.pageCount;
  bonusRowCount.value = response.data.rowCount;
  isBonus.value = true;
}

const betsHandleClear = () => {
  betsDatePlaced.value = ''
  betsGameId.value = ''
  betsWager.value = 0
  betsDatePlacedref.value.reset();
  getBets();
}

const getBetsDatePlaced = (date) => {
  betsDatePlaced.value = date.formattedDate;
}

const paymentOptionsList = [
  {
    name: "deposit",
    id: 1,
  },
  {
    name: "withdrawal",
    id: 2,
  },
];

const typeDropDownref = ref(null);
const datePlacedref = ref(null);
const paymentDateCreated = ref('');
const paymentType = ref('');
const amount = ref(0);
const payments = ref([]);
const paymentsPageCount = ref(1);
const paymentsRowCount = ref(0);
const paymentsPageSize = ref(100);
const paymentsCurrentPage = ref(1);
const paymentssortByColumn = ref('dateCreated');
const paymentssortDirection = ref('desc');
 
const getPayments = async () => {
  isPayment.value = false;
  const response = await api.payments.getPayments(paymentId.value, playerId.value, paymentDateCreated.value, paymentType.value, amount.value, paymentsCurrentPage.value, paymentssortByColumn.value, paymentssortDirection.value, paymentsPageSize.value);
  payments.value = response.data.payments;
  paymentsPageCount.value = response.data.pageCount;
  paymentsRowCount.value = response.data.rowCount;
  isPayment.value = true;
}

const getSortIconPayments = (colunm) => {
  const disableColor = '#B4BDC6';
  const enableColor = '#000000';

  if (colunm != paymentssortByColumn.value)
    return SortingIcon(disableColor, disableColor)

  if (paymentssortDirection.value == 'desc')
    return SortingIcon(disableColor, enableColor);

  return SortingIcon(enableColor, disableColor);
}

const sortByPayments = async (column) => {
  if (column === paymentssortByColumn.value) {
    paymentssortDirection.value = paymentssortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    paymentssortByColumn.value = column;
    paymentssortDirection.value = 'desc';
  }
  await getPayments();
}
const setPaymentPage = async (index) => {
  paymentsCurrentPage.value = index;
  if(paymentsCurrentPage.value < 1) paymentsCurrentPage.value = 1;
  if(paymentsCurrentPage.value > paymentsPageCount.value) paymentsCurrentPage.value = paymentsPageCount.value;
  await getPayments();
}

const paymentHandleClear = () => {
  paymentDateCreated.value = '';
  paymentType.value = '';
  amount.value = 0;
  datePlacedref.value.reset();
  typeDropDownref.value.reset();
  getPayments();
}

const paymentHandleSelected = (options) => {
  const {option} = options 
  paymentType.value = option;
};

const paymentDatePlaced = (date) => {
  paymentDateCreated.value = date.formattedDate;
}

const switchTab = async (type) => {
  tab.value = type;
  if(type === 'bets') {
    getBets()
  } else  if(type === 'payments') {
    getPayments()
  } else  if(type === 'bonus') {
    getBonuses()
  }
};

const currencySelected = (options) => {
  const {option, name, id} = options 
  bonusForm[name] = id;
};

const handleModalConfirmation = async () => { 
  if (modalType.value === 'forfeit') {
    await forfeitBonues();
  } else {
    await toogleExcludePlayerBonues();
  }  
};
const forfeitBonues = async () => {  
  const response = await api.players.forfeitBonues(player.value.externalId);
  if (response.status == 200) {  
    closeModal();
    await getBonusBalance(); 
  }
};
const toogleExcludePlayerBonues = async () => {   
  const response = await api.players.postToogleExcludePlayerBonues(player.value.id);
  if (response.status == 200) {
    player.value.excludeBonuses = response.data.excludeBonuses;
    closeModal();
  }
};

const bonusForm = reactive({
    currency: 'GBP',
    expireInDays: null,
    freeSpins: null,
    numberOfSpins: null,
    searchGame: ''
})

const bonusFormErrors = reactive({
    currency: '',
    expireInDays: '',
    freeSpins: '',
    numberOfSpins: '',
    searchGame: ''
});

const bonusFormValidationSchemas = [
    { field: 'currency', schema: z.string().min(1, {message: 'Please select a currency'}) },
    { field: 'expireInDays', schema: z.coerce.number().min(1, {message: 'Please enter expiry days'}) },
    { field: 'freeSpins', schema: z.coerce.number().min(1, {message: 'Please enter free spins'}) },
    { field: 'numberOfSpins', schema: z.coerce.number().min(1, {message: 'Please enter number of spins'}) },
    { field: 'searchGame', schema: z.coerce.number().min(1, {message: 'Please enter game name'}) },
  ];
  
const getGamesBy = async (searchQuery) => {
  const response = await api.games.getGames('', searchQuery, 1);
  return response.data.game.filter((e) => e.hasFreeSpins); 
}
  
const handleGameSelected = (game) => {
  bonusForm.searchGame = game.id;
}

const submitBonusForm = async () => {
    for (const { field, schema } of bonusFormValidationSchemas) {
        try {
            schema.parse(bonusForm[field]);
            bonusFormErrors[field] = '';
        } catch (error) {
          bonusFormErrors[field] = error.message;
        }
    }
    if (Object.values(bonusFormErrors).some(error => error !== '')) {
     return;
    }
    
    const response = await api.bonuses.addBonusPlayer(bonusForm.currency, bonusForm.expireInDays, bonusForm.searchGame, bonusForm.numberOfSpins, bonusForm.freeSpins);
    if (response.status == 200) {
      closeModal();
    }
};
</script>

<style scoped>
.mt-24 {
  margin-top: 24px;
}
 .card-16 {
  padding: 16px 24px;
}

.stats {
  height:100%;
  display: flex; 
  flex-direction: column; 
  justify-content: space-between;
}

.code {
  color:  #697A8D;
  font-size: 27px;
  font-weight: 500!important;
  line-height: normal;
}
</style>

