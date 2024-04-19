<template>
    <div>
        <div class="banner">
            <img src="/images/welcome-offers.png" alt="" />
            <h1>Create Welcome Offer</h1>
        </div>
        <div class="card create-offer-container">
            <div class="create-offer-img-container">
                <div class="cwo-form-container">
                    <form @submit.prevent="">
                        <div class="create-offer-form">
                            <div>
                                <label for="game">Name</label>
                                <input v-model="name" type="text" placeholder="Welcome Offer">
                            </div>
                            <div class="form-group">
                                <div>
                                    <label for="id">Start DATE</label>
                                    <DatePicker :getDate="startDate" :startDate="true" ref="startDateFilterRef" />
                                </div>
                                <div>
                                    <label for="id">End DATE</label>
                                    <DatePicker :getDate="endDate" :endDate="true" ref="endDateFilterRef" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div>
                                    <label for="expiers">Max Budget</label>
                                    <input v-model="maxBudget" type="text" placeholder="£0.00" @input="handleInput('maxBudget', $event)">
                                </div>
                                <div>
                                    <label for="currency">CURRENCY</label>
                                    <SelectDropdown :dataList="optionsList" @selected="handleSelected" :customStyle="dropdownStyle" position="absolute" name="currency" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="right-img">
                    <img src="/images/welcome-offer.png" alt="">
                </div>
            </div>
        </div>

        <div class="cwo-section-2">
            <div class="card conditions">
                <h3>Conditions</h3>
                <form @submit.prevent="">
                    <div class="form-group">
                        <div>
                            <label for="">Minimum deposit</label>
                            <input v-model="minimumDeposit" @input="handleInput('minimumDeposit', $event)" type="text" placeholder="0">
                        </div>
                        <div>
                            <label for="">Signup code</label>
                            <input v-model="signupCode" type="text" placeholder="Brand Casino">
                        </div>
                    </div>
                    <div class="form-group">
                        <div>
                            <label for="">wager required</label>
                            <input v-model="wagerRequired" @input="handleInput('wagerRequired', $event)" type="text" placeholder="0">
                        </div>
                        <div>
                            <label for="">period (in days)</label>
                            <input v-model="periodInDays" @input="handleInput('periodInDays', $event)" type="text" placeholder="0">
                        </div>
                    </div>
                    <div>
                        <label for="currency">Eligible Games</label> 
                        <SelectDropdown :dataList="eligibleGames" @selected="handleSelected" :customStyle="dropdownStyle" :isCreateList="true" :dropdownValue="newList" :onClick="showModal" position="absolute" name="eligibleGame" />
                    </div>           
                </form>
            </div>

            <div class="card conditions">
                <h3>Free Spins</h3>
                <div>
                    <form @submit.prevent="">
                        <div class="form-group">
                            <div>
                                <label for="">NUMBER OF SPINS</label>
                                <input v-model="numberOfSpins" @input="handleInput('numberOfSpins', $event)" type="text" placeholder="0">
                            </div>
                            <div>
                                <label for="">EXPIRES (IN DAYS)</label>
                                <input v-model="expireInDays" @input="handleInput('expireInDays', $event)" type="text" placeholder="0">
                            </div>
                        </div>
                        <div>
                            <label for="game">Game</label>
                            <div class="">
                                <Autocomplete :itemSelected="handleGameSelected" :fetchItems="fetchItems" /> 
                            </div>
                        </div>
                        <!-- !! TEMPORARY HIDING !! -->
                        <!-- <div class="check-section">
                            <div class="space"></div>
                            <div class="check-container">
                                <div @click="isrequirePlaythrough = !isrequirePlaythrough" class="checkbox" >
                                    <img :src="isrequirePlaythrough ? '/images/svg/check-24.svg' : '/images/svg/uncheck-24.svg'" alt="check">
                                    <span>Requires Playthrough?</span>
                                </div>
                            </div>
                        </div> -->
                    </form>
                </div>
            </div>
        </div>

        <div v-if="isrequirePlaythrough" class="card playthrough">
            <h3 class="title">Playthrough Requirements</h3>
            <form action="">
                <div>
                    <label for="">Rollover</label>
                    <input v-model="rollover" type="text" placeholder="0x" />
                </div>
                <div>
                    <label for="currency">Eligible Games</label> 
                    <SelectDropdown :dataList="eligibleGames" @selected="handleSelected" :customStyle="dropdownStyle" :isCreateList="true" :dropdownValue="newList" :onClick="showModal" position="absolute" name="eligibleGame" />
                </div> 
                <div>
                    <label for="">Period (IN Days)</label>
                    <input v-model="periodInDays" type="text" placeholder="0">
                </div>
            </form>
        </div>

        <div class="right-btn-container">
            <button @click.prevent="saveOffer" class="btn-lg">Create Welcome Offer</button>
        </div>

        <teleport to="body">
            <Modal v-if="isModalVisible" :isOpen="isModalVisible" @close-modal="closeModal">
                <div  @click="closeModal" class="cross-button-banner-modal">
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
                        <button @click="closeModal" class="cancel-lg">Cancel</button>
                        <button @click="saveList" class="btn-xl">Create</button>
                    </div>
                </div>
                </div>
            </Modal>
        </teleport>
    </div>
</template>

<script>
import Autocomplete  from '@/components/Autocomplete.vue';

  export default {
    components: { Autocomplete  },
  };
</script>
<script setup>
import Modal from "@/components/Modal/PopoverModal.vue";
import DatePicker from '@/components/DatePicker.vue';
import { ref, onMounted } from 'vue';
import SelectDropdown from "@/components/SelectDropdown.vue";
import api from '@/api/api';
import router from "@/router/index";
import { SortingIcon } from "@/utils";
import { useRoute } from "vue-router";

const route = useRoute(); 
const gameList = ref({ id: 0, name: '', games: [] });

const startDateFilterRef = ref(null);
const endDateFilterRef = ref(null);
const startDateFilter = ref('');
const endDateFilter = ref('');
const name = ref('');
const maxBudget = ref(null);
const minimumDeposit = ref(null);
const signupCode = ref(null);
const wagerRequired = ref(null);
const periodInDays = ref(null);
const numberOfSpins = ref(null);
const game = ref(null);
const expireInDays = ref(null);
const isModalVisible = ref(false);
const newList = ref(null);
const isrequirePlaythrough = ref(false)
const rollover = ref(null)

const defaultGame = {
    name: "All Games",
    id: 0,
};
 
const dropdownStyle = {
    backgroundColor: '#ffffff'
}
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

const eligibleGames = ref([defaultGame]);
const selectedGame = ref(0);

const selectedOption = ref({
    provider: "",
    selectedGame
});

const handleSelected = (options) => {
    const { option, name } = options
    selectedOption.value[name] = option;
};

const handleInput = (fieldName, event) => {
    eval(`${fieldName}.value = event.target.value.replace(/\\D/, '');`);
}

const startDate = (date) => {
    startDateFilter.value = date.formattedDate;
}

const endDate = (date) => {
    endDateFilter.value = date.formattedDate;
}

async function saveOffer() {
//   const response = await api.bonuses.createWelcomeOffer(name.value, startDateFilter.value, endDateFilter.value, maxBudget.value, selectedOption.value['currency'], minimumDeposit.value, signupCode.value, wagerRequired.value, periodInDays.value, selectedGame.value, numberOfSpins.value, game.value, expireInDays.value);
//   if (response.status == 200) {
    router.push("/welcome-offers");
//   }
}
onMounted(() => {
    getGamesLists()
})

const getGamesLists = async () => {
  const response = await api.games.getGameLists('', '', 1);
  eligibleGames.value =[...eligibleGames.value, ...response.data.lists];
  selectedGame.value = eligibleGames.value[0].id;
};

const showModal = () => {
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

onMounted(async () => { 
  if (route.params.id) {
    const response = await api.games.getGameListsById( route.params.id );
    if (response.status == 200) {
      gameList.value = response.data.gameList;
    }
  }
});

const saveList = async () => { 
  try {
    if (gameList.value.name){
      const response = await api.games.createGameList(gameList.value.id, gameList.value.name, gameList.value.games.map((game) => game.id));
      if (response.status == 200)
      await getGamesLists();
      newList.value = gameList.value;
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
</script>