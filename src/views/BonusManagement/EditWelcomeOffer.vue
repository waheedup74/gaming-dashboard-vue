<template>
    <div>
        <div class="banner">
            <img src="/images/welcome-offers.png" alt="" />
            <h1>Edit: {{ route.params.id }}</h1>
        </div>
        <div class="breadcrumbs" style="margin-bottom: 0px">
            <router-link to="/welcome-offers">Welcome Offers</router-link>
            <span>
            <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
            </span>
            <span class="current">{{ route.params.id }}</span>
        </div>
        <div class="right-btn-container">
            <button v-if="active && (new Date(endDateFilter) > new Date())" @click="showModal()" class="btn-red" >Disable Offers</button>
        </div>
        <div class="edit-offer-container">
            <div class="card">
                <h3>Welcome Offer Details</h3>
                <form action="">
                    <div>
                        <label for="">Name</label>
                        <input v-model="name" type="text" placeholder="Splash 100">
                    </div>
                    <div>
                        <label for="">Start Date</label>
                        <DatePicker :getDate="startDate" :startDate="true" ref="startDateFilterRef" />
                    </div>
                    <div>
                        <label for="">End Date</label>
                        <DatePicker :getDate="endDate" :endDate="true" ref="endDateFilterRef" />
                    </div>
                    <div>
                        <label for="">MAX WIN FOR THIS CAMPAIGN (IN £)</label>
                        <input v-model="maxBudget" type="number" placeholder="0">
                    </div>
                    <div>
                        <label for="">Currency</label>
                        <SelectDropdown @selected="handleSelected" :dataList="optionsList" :isOutline='true' :dropdownValue="selectedCurrency" position="absolute" name="currency" />
                    </div>
                </form>
            </div>
            <div class="card">
                <h3>Conditions</h3>
                <form action="">
                    <div>
                        <label for="">MINIMUM DEPOSIT</label>
                        <input v-model="minimumDeposit" type="number" placeholder="0">
                    </div>
                    <div>
                        <label for="">SIGNUP BONUS CODE</label>
                        <input v-model="signupCode" type="text" placeholder="Splash100">
                    </div>
                    <div>
                        <label for="">WAGER REQUIRED</label>
                        <input v-model="wagerRequired" type="number" placeholder="0">
                    </div>
                    <div>
                        <label for="">PERIOD (IN DAYS)</label>
                        <input v-model="periodInDays" type="number" placeholder="0">
                    </div>
                    <div>
                        <label for="">ELIGIBLE GAMES</label>
                        <SelectDropdown :dataList="eligibleGames" @selected="handleSelected" :customStyle="dropdownStyle" :isCreateList="true" :dropdownValue="newList" :onClick="showCreateListModal" position="absolute" name="eligibleGame" />
                    </div>
                </form>
            </div>
            <div class="card ">
                <h3>Free Spins</h3> 
                <form action="">
                    <div class="form-group">
                        <div>
                            <label for="">NUMBER OF SPINS</label>
                            <input v-model="numberOfSpins" type="number" placeholder="0" disabled>
                        </div>
                        <div>
                            <label for="">EXPIRES( IN DAYS)</label>
                            <input v-model="expireInDays" type="number" placeholder="0" disabled>
                        </div>
                    </div>
                    <div>
                        <label for="game">GAME</label>
                        <div class="search">
                            <Autocomplete :itemSelected="handleGameSelected" :fetchItems="fetchItems" ref="gameRef" isDisabled="true" /> 
                        </div>
                    </div>
                    <!-- !! TEMPORARY HIDING !! -->
                    <!-- <div class="check-section">
                        <div class="space" style=""></div>
                        <div class="check-container" >
                            <div @click="isrequirePlaythrough = !isrequirePlaythrough" class="checkbox" >
                                <img :src="isrequirePlaythrough ? '/images/svg/check-24.svg' : '/images/svg/uncheck-24.svg'" alt="check">
                                <span>Requires Playthrough?</span>
                            </div>
                        </div>
                    </div> -->
                    <div v-if="isrequirePlaythrough" class="form-group" >
                        <div>
                            <label for="">Rollover</label>
                            <input v-model="numberOfSpins" type="number" placeholder="0x" >
                        </div>
                        <div>
                            <label for="">Period( IN DAYS)</label>
                            <input v-model="expireInDays" type="number" placeholder="0">
                        </div>
                    </div>
                    <div v-if="isrequirePlaythrough">
                        <label for="">ELIGIBLE GAMES</label>
                        <SelectDropdown :dataList="eligibleGames" @selected="handleSelected" :customStyle="dropdownStyle" :isCreateList="true" :dropdownValue="newList" :onClick="showCreateListModal" position="absolute" name="eligibleGame" />
                    </div>
                </form>
            </div> 
        </div>
        <div class="import-btns">
            <button class="btn-cancel-outline" @click="router.push('/welcome-offers')" >Cancel</button>
            <button @click.prevent="saveOffer" class="btn-lg">Save</button>
        </div>

        <teleport to="body">
            <Modal v-if="isModalVisible" @close-modal="closeModal" :isOpen="isModalVisible">
                <div >
                    <div @click="closeModal" class="cross-button">
                        <img src="/images/svg/close-gray-32.svg" alt="close">
                    </div>
                    <div class="delete-modal">
                        <h1>Are you sure?</h1>
                        <p>
                            You are about to disable the welcome offer: <br /> <span class="settings">{{ route.params.id }}</span>
                        </p>
                        <div class="listButtons">
                            <button @click="closeModal" class="button cancel">Cancel</button>
                            <button @click="disbaleBonus" class="btn-red-lg">
                                Yes, disable welcome offer
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </teleport>

        <teleport to="body">
            <Modal v-if="isCreateListModalVisible" @close-modal="closeCreateListModal" :isOpen="isCreateListModalVisible">
                <div>
                    <div  @click="closeCreateListModal" class="cross-button-banner-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" > <path d="M19.3332 2.54699L17.4532 0.666992L9.99984 8.12033L2.5465 0.666992L0.666504 2.54699L8.11984 10.0003L0.666504 17.4537L2.5465 19.3337L9.99984 11.8803L17.4532 19.3337L19.3332 17.4537L11.8798 10.0003L19.3332 2.54699Z" fill="white" /> </svg>
                    </div>
                    <div  class="detail-modal">
                        <div class="modal-banner">
                            <h1>Create Game List</h1>
                        </div>
                        <div class="cwo-modal">
                            <div class="create-list">
                                <form action="">
                                    <div class="form-group">
                                        <div>
                                            <label for="">List Name</label>
                                            <input  v-model="gameList.name" type="text" id="id" name="id" placeholder="Brand Casino">
                                        </div>
                                        <div>
                                            <label for="game">Game</label>
                                            <div>                        
                                                <Autocomplete :itemSelected="handleItemSelected" :fetchItems="fetchItems" /> 
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="table-container">
                            <table>
                                <thead>
                                <tr>
                                    <th><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                                    <th><span>Provider <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                                    <th><span>Id <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                                    <th><span>Category <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody v-if="gameList.games.length > 0">
                                <tr v-for="(game, index) in gameList.games" :key="index">
                                    <td>{{ game.name }}</td>
                                    <td>
                                    <div class="provider-logo-container">
                                        <img v-if="game.provider === 'Pragmatic'" src="/images/pragmatic-play-dark.svg" alt="" class="provider-logo">
                                        <span v-else>{{ game.provider }}</span>
                                    </div>
                                    </td>
                                    <td>{{ game.id }}</td>
                                    <td>
                                    <div class="category-logo-container">
                                        <div :style="{ background: game?.categoryLogo?.background }" class="category-logo">
                                        <img :src="game.categoryIcon" :style="{ color: game?.categoryLogo?.color }" style="height: 100%"
                                            alt="" />
                                        </div>
                                        <div>{{ game.category }}</div>
                                    </div>
                                    </td>
                                    <td>
                                    <a @click="remove(index)" class="btn-remove">Remove</a>
                                    </td>
                                </tr>
                                </tbody>
                                <tbody v-else>
                                <tr>
                                    <td colspan="5" style="text-align: center;">No games found.</td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            <div class="right-btn-container">
                                <button @click="closeCreateListModal" class="cancel-lg">Cancel</button>
                                <button @click="saveList" class="btn-xl" >Create</button>
                            </div>
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
  export default {
    components: { DatePicker },
    components: { Autocomplete  },
  };
</script>

<script setup>
import { ref, onMounted } from 'vue';
import SelectDropdown from "@/components/SelectDropdown.vue";
import Modal from "@/components/Modal/PopoverModal.vue";
import { useRoute } from "vue-router";
import { SortingIcon, formatDateOnly } from "@/utils";
import api from '@/api/api';
import router from "@/router/index";

const route = useRoute();
const name = ref('');
const active = ref(false);
const id = ref('');
const maxBudget = ref(null);
const minimumDeposit = ref(null);
const signupCode = ref(null);
const wagerRequired = ref(null);
const periodInDays = ref(null);
const startDateFilterRef = ref(null);
const endDateFilterRef = ref(null);
const gameRef = ref(null);
const startDateFilter = ref('');
const game = ref(null); 
const expireInDays = ref(null);
const endDateFilter = ref('');
const numberOfSpins = ref(null);
const isModalVisible = ref(false);
const isCreateListModalVisible = ref(false); 
const gameList = ref({ id: 0, name: '', games: [] });
const selectedGame = ref(0);
const selectedCurrency = ref({});
const isrequirePlaythrough = ref(false);
const dropdownStyle = {
    backgroundColor: '#ffffff'
}
const defaultGame = {
    name: "All Games",
    id: 0,
};
const eligibleGames = ref([defaultGame]);
const newList = ref(null)
const optionsList = [
    {
        name: "GBP",
        id: 1,
    },
    {
        name: "EUR",
        id: 2,
    },
    {
        name: "USD",
        id: 3,
    }, 
];
const selectedOption = ref({
    provider: "",
    currency: ""
});

const startDate = (date) => {
    startDateFilter.value = date.formattedDate;
}

const endDate = (date) => {
    endDateFilter.value = date.formattedDate;
}

const handleSelected = (options) => {
    const { option, name } = options
    selectedOption.value[name] = option;
}

const showModal = () => {  
    isModalVisible.value = true;
};

const closeModal = () => {
    isModalVisible.value = false;
};

const showCreateListModal = () => {  
    isCreateListModalVisible.value = true;
};

const closeCreateListModal = () => {  
    isCreateListModalVisible.value = false;
};

onMounted(async () => {
    await getGamesLists();

    const response = await api.bonuses.getWelcomeOfferById(route.params.id);
    const offer = response.data.offer;

    name.value = offer.name;
    id.value = offer.id;    
    startDateFilterRef.value.setDate(formatDateOnly(offer.startDate));
    endDateFilterRef.value.setDate(formatDateOnly(offer.endDate));    
    maxBudget.value = offer.maxBudget;3
    selectedOption.value.currency = offer.currency; 
    minimumDeposit.value = offer.minDeposit;
    signupCode.value = offer.signupCode;
    wagerRequired.value = offer.wagerRequired;
    periodInDays.value = offer.period;
    numberOfSpins.value = offer.numSpins;
    expireInDays.value = offer.expires; 
    game.value = offer.game; 
    selectedCurrency.value = optionsList.find((e) => e.name == offer.currency) || {}; 
    newList.value = eligibleGames.value.find((e) => e.id == offer.gamesListId) || {}; 
    selectedOption.value.eligibleGame = newList.value.name; 
    gameRef.value.searchQuery = offer.game; 
    active.value = offer.active; 
})

const getGamesLists = async () => {
  const response = await api.games.getGameLists('', '', 1);
  eligibleGames.value = response.data.lists
  selectedGame.value = eligibleGames.value[0].id;
};

const saveList = async () => { 
  try {
    if (gameList.value.name){
      const response = await api.games.createGameList(gameList.value.id, gameList.value.name, gameList.value.games.map((game) => game.id));
      if (response.status == 200)
      await getGamesLists();
      newList.value = gameList.value;
      selectedOption.value.eligibleGame = gameList.value.name;
      gameList.value = { id: 0, name: '', games: [] }
      closeModal()
    }
  } catch (e) {
    if (e.response.status == 400)
      alert('There is already a Game List with this name.'); 
  }
}

const fetchItems = async (searchQuery) => {
  const response = await api.games.getGames('', searchQuery, 1);
  return response.data.game; 
}

const handleItemSelected = (game, autocomplete) => {
  if (!gameList.value.games.find((e) => e.id == game.id)) {
    gameList.value.games.push(game); 
  }
  autocomplete.searchQuery = ''; 
}

const handleGameSelected = (g) => {
    game.value = g.name;
}

const remove = (game) => { 
  gameList.value.games.splice(game, 1);
}
 
const disbaleBonus = async () =>  {  
  const response = await api.bonuses.disableOffer(id.value);
  if (response.status == 200) {
    router.push("/welcome-offers");
  }
}

async function saveOffer() { 
  const eligibleGame = eligibleGames.value.find((e) => e.name == selectedOption.value.eligibleGame);
  const response = await api.bonuses.updateWelcomeOffer(id.value, name.value, startDateFilter.value, endDateFilter.value, maxBudget.value, selectedOption.value.currency, minimumDeposit.value, signupCode.value, wagerRequired.value, periodInDays.value, eligibleGame?.id, numberOfSpins.value, game.value, expireInDays.value);
  if (response.status == 200) {
    router.push("/welcome-offers");
  }
}
</script>