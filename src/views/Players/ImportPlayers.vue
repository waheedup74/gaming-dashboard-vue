<template>
    <div>
        <div class="banner">
            <img src="/images/players.png" />
            <h1>Import Players</h1>
        </div>
        <div class="breadcrumbs">
            <router-link to="/players">Players</router-link>
            <span>
                <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
            </span>
            <span class="current">Import Players</span>
        </div>
        <div class="card import-container">
            <div class="import-img-container">
                <div class="form-container">
                    <div>
                        <h3>Import</h3>
                        <p>Want to  import a list of players? <br />
                        Simply upload a .CSV file containing the chosen list of players. We will let you know if there are duplicates in your list, in which case, you  can edit the list and re-upload it. </p>
                    </div>
                    <input @change="handleFileUpload" ref="fileInputRef" type="file" style="display: none;" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                      
                    <div class="upload-btn-container">
                        <div>
                            <button @click="openFileInput" class="btn-lg">
                                <img src="/images/svg/upload.svg" alt="download">
                                Upload
                            </button>
                        </div>
                        <p>You can upload any .CSV file with any set of column as long as it has 1 record per row.</p>
                    </div>
                </div>
                <div class="right-img">
                    <img src="/images/import-bg.png" alt="">
                </div>
            </div>
        </div>
        <div class="card">
          <div class="table-title">Players</div>
            <div class="table-container striped">
                <table>
                    <thead>
                        <tr>
                          <th><span>ID <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Signup date <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>FTD Date <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>FTD Amount <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Deposits <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Deposited <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Bets <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Wager <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th><span>Signup Code <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                        </tr>
                    </thead>
                    <tbody v-if="players.length">
                        <tr v-for="(player, index) in players" :key="index">
                            <td> {{ player.external_id }}</td>
                            <td> {{ formatDate(player.signup_date) }}</td>
                            <td> {{ formatDate(player.first_deposit_date) }}</td>
                            <td> {{ addCommas(player.first_deposit_amount) }}</td>
                            <td> {{ player.deposit_count }}</td>
                            <td> {{ addCommas(player.total_deposited) }}</td>
                            <td> {{ player.total_bets }}</td>
                            <td> {{ addCommas(player.total_wager) }}</td>
                            <td> {{ player.signup_promo_code }}</td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                      <div class="no-data-found">No players found.</div>
                    </tbody>
                </table>
            </div> 
        </div>
        <div class="sm-card">
            <p>Players to import: <span class="normal">{{ players.length }}</span></p>
            <p>Duplicates detected: <span class="red">{{ duplicates.length }}</span></p>
        </div>
        <div class="import-btns">
            <button class="btn-cancel-outline" @click="router.push('/players')">Cancel</button>
            <button class="btn-xl" @click="save">Import</button>
        </div>
        
    <teleport to="body">
      <Modal v-if="isModalVisible" @close-modal="closeModal" :isOpen="isModalVisible">
        <div @click="closeModal" class="cross-button-banner-modal">
          <img src="/images/svg/close-32.svg" alt="">
        </div>
        <div class="detail-modal">
          <div class="modal-banner">
            <h1>Import Players</h1>
          </div>
          <div class="import-modal-container">
            <div class="img-container">
                <img src="/images/import-bg.png" alt="">
            </div>
            <div v-if="!uploaded" class="uploading-container">
                <div class="percent-container">
                    <div class="percent">
                        <h3>70%</h3>
                        <p>Uploading...</p>
                    </div>
                    <div class="img-container">
                        <img src="/images/svg/pause-gray-32.svg" alt="icon">
                    </div>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-indicator" style="width:80%"></div>
                </div>
            </div>
            <div v-if="!uploaded" class="right-btn-container">
                <button class="cancel">Cancel</button>
            </div>
            <div v-if="uploaded" class="success-container">
                <div class="success-alert">
                    <div>
                        <img src="/images/svg/alert-green-check.svg" alt="icon">
                    </div>
                    <div>
                        <h3>Success!</h3>
                        <p>Your list of players has been imported.</p>
                    </div>
                </div>
                <div class="return">
                    <img src="/images/svg/chevron-left.svg" alt="icon">
                    <router-link to="/players">Back to Players</router-link>
                </div>
            </div>
          </div>
        </div>
      </Modal>
    </teleport>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import Modal from "@/components/Modal/PopoverModal.vue"; 
import { formatDate, SortingIcon, addCommas } from "@/utils";
import router from "@/router/index";
import api from '@/api/api'; 

const isModalVisible = ref(false);
const uploaded = ref(false);
const fileInputRef = ref(null);
const fileName = ref('');
const players = ref([]);
 
const showModal = () => { 
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
};

const openFileInput = () => {
  fileInputRef.value.click();
};

const duplicates = computed(() => { 
    return players.value.filter((item, index) => players.value.indexOf(players.value.find((e) => e.external_id == item.external_id)) !== index);    
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  fileName.value = file.name;

  reader.onload = async (e)  => {
    const content = e.target.result; 
    const lines = content.split('\n'); 

    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].replace('\r', '').split(','); 

        if (columns[2]) {
            players.value.push({
                id: columns[0],
                tenant_id: columns[1],
                external_id: columns[2],
                signup_date: new Date(columns[3]),
                signup_promo_code: columns[4],
                first_deposit_date: new Date(columns[5]),
                first_deposit_amount: columns[6],
                last_deposit_date: new Date(columns[7]),
                deposit_count: columns[8],
                total_deposited: columns[9],
                total_wager: columns[10],
                total_ggr: columns[11],
                total_bets: columns[12],
                last_bet_date: new Date(columns[13]),
                total_bonus_amount: columns[14],
                last_bet_amount: columns[15],
                last_deposit_amount: columns[16],
                exclude_bonuses: (columns[17] == 'true' || columns[17] == '1'),
            }); 
        }
    }
  }; 
  reader.readAsText(file);
};

const save = async () => { 
  const response = await api.players.postPlayersFromCSV(players.value);
  if (response.status === 200) {
    players.value = [];
    uploaded.value = true;
    isModalVisible.value = false;
    showModal();
  }
};

</script>

<style scoped>
.table-container {
  max-height: 600px;
  min-height: 112px;
  overflow: auto;

}
tbody { 
    display: block; 
    width: 100%; 
  } 
thead tr { 
    display: block; 
  } 
th,  td { 
    min-width: 175px;
    padding: 0 4px;  
}
 
.progress-bar-container {
  height: 16px;
  background: #D9DEE3;
  border-radius: 100px;
  position:relative; 
}
.progress-bar-indicator {
  height: 100%;
  border-radius: 25px;
  -webkit-mask:linear-gradient(#fff 0 0);
          mask:linear-gradient(#fff 0 0);
}
.progress-bar-indicator::before {
  content:"";
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  border-radius: 100px;
  background-image: linear-gradient(90deg, #696CFF 0%, #FF6247 50.5%, #FFB316 100%);
}

::-webkit-scrollbar {
  width: 12px !important;
  height: 12px !important;
}
::-webkit-scrollbar-track {
  background: #D9DEE3;
}
::-webkit-scrollbar-thumb {
  background: #8E9BAA;
}
</style>
