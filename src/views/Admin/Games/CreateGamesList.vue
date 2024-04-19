<template>
  <div>
    <div class="banner">
      <img src="/images/games.png" alt="" />
      <h1>Create Games List</h1>
    </div>
    <div class="breadcrumbs">
      <router-link to="/games">Games</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <router-link to="/games/games-lists">Games Lists</router-link>
      <span>
        <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
      </span>
      <span class="current">Create</span>
    </div>
    <form>
      <div class="card">

        <div v-if="alertMessage" class="error-message" style="margin-bottom: 10px;">
          <span>{{ alertMessage }}</span>
        </div>

        <label for="id">List name</label>
        <input v-model="gameList.name" type="text" id="id" name="id" placeholder="Brand Casino" />
        <label for="name">Add Game</label>
        <div>
          <Autocomplete :itemSelected="handleItemSelected" :fetchItems="fetchItems" ref="autocompleteRef" />
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
            <tbody >
              <tr v-for="(game, index) in 4" :key="index">
                <td>Bubbles and Ducks {{ game }}</td>
                <td>
                  <div class="provider-logo-container">
                    <img  src="/images/pragmatic-play-dark.svg" alt=""
                      class="provider-logo">
                    <!-- <span v-else>{{ game.provider }}</span> -->
                  </div>
                </td>
                <td>BND</td>
                <td>
                  <div class="category-logo-container">
                    <div  class="category-logo">
                      <img src="/images/slotIcon1.svg"  style="height: 100%" alt="" />
                    </div>
                    <div>{{ game.category }}</div>
                  </div>
                </td>
                <td>
                  <a class="btn-remove" @click="remove(index)">Remove</a>
                </td>
              </tr>
            </tbody>
            <!-- <tbody v-else>
              <tr>
                <td colspan="5" style="text-align: center;">No games found.</td>
              </tr>
            </tbody> -->
          </table>
        </div>
      </div>
      <div class="right-btn-container">
        <button @click.prevent="saveList" class="btn-xl">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import Autocomplete  from '@/components/Autocomplete.vue';

  export default {
    components: { Autocomplete  },
  };
</script>

<script setup> 
import { onMounted, ref } from "vue"; 
import { useRoute } from "vue-router";
import api from "@/api/api";
import router from "@/router/index";
import {SortingIcon} from '@/utils'; 
 
const route = useRoute(); 
const gameList = ref({ id: 0, name: '', games: [] });  
const alertMessage = ref(null);
const autocompleteRef = ref(null);

onMounted(async () => { 
  if (route.params.id) {
    const response = await api.games.getGameListsById( route.params.id );
    if (response.status == 200) {
      gameList.value = response.data.gameList;
    }
  }
  console.log(gameList.value)
});

const saveList = async () => { 
  alertMessage.value = null;
  
  if (!gameList.value.name){
    alertMessage.value = "Invalid game name. Please fill in the game name.";
    return;
  }

  if (!gameList.value.games.length){
    alertMessage.value = "Please add at least one game before saving.";
    return;
  }

  try {
    const response = await api.games.createGameList(gameList.value.id, gameList.value.name, gameList.value.games.map((game) => game.id));
      if (response.status == 200)
        router.push("/games/games-lists"); 
  } catch (e) {
    if (e.response.status == 400)
       alertMessage.value = 'There is already a Game List with this name.'; 
  }
}

const fetchItems = async (searchQuery) => {
  const response = await api.games.getGames('', searchQuery, 1);
  return response.data.game; 
}

const handleItemSelected = (game) => {
  if (!gameList.value.games.find((e) => e.id == game.id)) {
    gameList.value.games.push(game); 
  }
  autocompleteRef.value.searchQuery = ''; 
}

const remove = (game) => { 
  gameList.value.games.splice(game, 1);
}
</script>

<style scoped>
.btn-remove {
  cursor: pointer;
}
</style>