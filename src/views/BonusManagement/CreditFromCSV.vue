<template>
    <div>
        <div class="banner">
            <img src="/images/players.png" alt="" />
            <h1>Credit from CSV</h1>
        </div>
        <div class="card csv-container">
            <div class="csv-img-container">
                <div class="csv-form-container">
                    <form>
                        <div class="bonus-form">
                            <div class="form-group">
                                <div>
                                    <label for="currency">CURRENCY</label>
                                    <SelectDropdown :dataList="optionsList" @selected="handleSelected" defaultValue="GBP" :customStyle="dropdownStyle" position="absolute" name="currency" />
                                    <div v-if="creditCSVFormErrors.currency" class="error-message">{{ parseErrorMessage(creditCSVFormErrors.currency).message }}</div>
                                </div>
                                <div>
                                    <label for="expiers">EXPIRES (IN DAYS)</label>
                                    <input v-model="creditCSVForm.expireInDays" type="number" placeholder="0"  @input="handleInput('expireInDays', $event)" pattern="[0-9]">
                                     <div v-if="creditCSVFormErrors.expireInDays" class="error-message" >{{ parseErrorMessage(creditCSVFormErrors.expireInDays).message }}</div>
                                </div>
                            </div>
                            <div>
                                <label for="game">Game</label>
                                <div class="">
                                    <Autocomplete :itemSelected="handleGameSelected" :fetchItems="fetchItems"/>  
                                </div>
                                <div v-if="creditCSVFormErrors.searchGame" class="error-message">{{ parseErrorMessage(creditCSVFormErrors.searchGame).message  }}</div>
                            </div>
                            <div class="form-group">
                                <div>
                                    <label for="spins">NUMBER OF SPINS</label>
                                    <input v-model="creditCSVForm.numberOfSpins" type="number" placeholder="5">
                                    <div v-if="creditCSVFormErrors.numberOfSpins" class="error-message">{{ parseErrorMessage(creditCSVFormErrors.numberOfSpins).message }}</div>
                                </div>
                                <div>
                                    <label for="freespins">VALUE OF FREE SPIN</label>
                                    <input v-model="creditCSVForm.freeSpins" type="number" placeholder="10">
                                    <div v-if="creditCSVFormErrors.freeSpins" class="error-message">{{ parseErrorMessage(creditCSVFormErrors.freeSpins).message }}</div>
                                </div>
                            </div>
                            <div class="upload-btn-container" v-if="!fileName">
                                <input ref="fileInputRef" type="file" style="display: none;" @change="handleFileUpload" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                      
                                <div>
                                    <button type="button" class="btn-lg" @click.prevent="openFileInput">
                                        <img src="/images/svg/upload.svg" alt="download">
                                        Upload
                                    </button>
                                    <div v-if="creditCSVFormErrors.file" class="error-message">{{ parseErrorMessage(creditCSVFormErrors.file).message }}</div>
                                </div>
                                <p>You can upload any .CSV file with any set of column as long as it has 1 record per row.</p>
                            </div>
                            <div class="upload-btn-container file-name" v-if="fileName">
                                <p>{{ fileName }}</p>
                               <img @click="removeFile" src="/images/svg/close-gray-24.svg" alt="icon" />
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <img src="/images/credit-bg.png" alt="">
                </div>
            </div>
        </div>
        <div class="card" v-if="fileName">
            <h3 class="player-count">Number of players: {{ creditCSVForm.file.length }}</h3>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Player Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in creditCSVForm.file">
                            <td>{{ item }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="right-btn-container">
            <button @click.prevent="submitcreditCSVForm" type="submit" class="btn-xl">Save</button>
        </div>
    </div>
</template>

<script setup>
import SelectDropdown from "@/components/SelectDropdown.vue";
import Autocomplete  from '@/components/Autocomplete.vue';
import { reactive, ref } from "vue";
import { parseErrorMessage } from "@/utils";
import { z } from 'zod';
import api from '@/api/api'; 

const fileInputRef = ref(null);
const fileName = ref('');

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


const dropdownStyle = {
    minWidth: '0px !important',
    width: '100%'
}

const handleSelected = (options) => {
  const {option, name, id} = options 
 creditCSVForm.currency = option;
};

const handleInput = (fieldName, event) => {
    eval(`${fieldName}.value = event.target.value.replace(/\\D/, '');`);
}

const creditCSVForm = reactive({
    currency: 'GBP',
    expireInDays: null,
    freeSpins: null,
    numberOfSpins: null,
    searchGame: {},
    file: []
})

const creditCSVFormErrors = reactive({
    currency: '',
    expireInDays: '',
    freeSpins: '',
    numberOfSpins: '',
    searchGame: '',
    file: ''
});

const creditCSVFormValidationSchemas = [
    { field: 'currency', schema: z.string().min(1, {message: 'Please select a currency'}) },
    { field: 'expireInDays', schema: z.coerce.number({invalid_type_error: 'Please enter expiry days'}).min(1, {message: 'Please enter expiry days'}) },
    { field: 'freeSpins', schema: z.coerce.number({invalid_type_error: 'Please enter free spins'}).min(1, {message: 'Please enter free spins'}) },
    { field: 'numberOfSpins', schema: z.coerce.number({invalid_type_error: 'Please enter number of spins'}).min(1, {message: 'Please enter number of spins'}) },
    { field: 'searchGame', schema: z.object({ name: z.string(), id: z.number(), }).nullable() },
    { field: 'file', schema: z.array(z.string()).min(1, {message: 'File is invalid'}) }
  ];

const openFileInput = () => {
  fileInputRef.value.click();
};

const fetchItems = async (searchQuery) => {
  const response = await api.games.getGames('', searchQuery, 1);
  return response.data.game; 
}

const handleGameSelected = (g) => {
    creditCSVForm.searchGame = g;
}

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  fileName.value = file.name;

  reader.onload = async (e)  => {
    const content = e.target.result;
    const lines = content.split('\n');
  

    lines.forEach(line => {
      const data = line.replace('\r', ''); 
      if (data.trim() !== '') { 
        creditCSVForm.file.push(data);
      }
    });
  }; 
  reader.readAsText(file);
};

const submitcreditCSVForm = async () => {
    for (const { field, schema } of creditCSVFormValidationSchemas) {
        try {
            schema.parse(creditCSVForm[field]);
            creditCSVFormErrors[field] = '';
        } catch (error) {
            creditCSVFormErrors[field] = error.message;
        }
    }
 
    if (Object.values(creditCSVFormErrors).some(error => error !== '')) {
     return;
    }
 
    await api.bonuses.creditFromCSV(creditCSVForm.file, creditCSVForm.searchGame.name, creditCSVForm.searchGame.id, creditCSVForm.currency, 
                                        creditCSVForm.expireInDays, creditCSVForm.numberOfSpins, creditCSVForm.freeSpins); 
};

const removeFile = () => {
    creditCSVForm.file = [];
    fileName.value = '';
}
</script>