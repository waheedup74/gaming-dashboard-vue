<template>
    <div>
        <div class="banner">
            <img src="/images/welcome-offers.png" alt="" />
            <h1>Welcome Offers</h1>
        </div>
        <div class="right-btn-container">
            <button @click="goto('create')" class="btn-lg">
                <img src="/images/svg/plus-24.svg" alt="plus">
                Create Welcome Offer</button>
        </div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Active Offers</h3>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="w-11"><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>Start <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>End <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-15"><span>Promo Code <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>Players <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-15"><span>Total Wagered <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>Bonuses <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"></th>
                            <th class="w-11"></th>
                        </tr>
                    </thead>
                    <tbody> 
                        <tr v-for="(offer, index) in 4" :key="index">
                            <td>New Offer</td>
                            <td>2024-04-20</td>
                            <td>2024-04-20</td>
                            <td>abcd_code</td>
                            <td>Player Name</td>
                            <td>£200</td>
                            <td>£30</td>
                            <td><router-link :to="{ name: 'welcome-offer-detail', params: { id: 100 }}">Details</router-link></td>
                            <td><router-link :to="{ name: 'edit-welcome-offer', params: { id: 100 }}">Edit</router-link></td>
                        </tr>
                        <!-- <tr v-if="!activeWelcomeOffers.length"><td colspan="9" style="text-align: center;">No records found.</td></tr> -->
                    </tbody>
                </table>
            </div>
            <Pagination @page-changed="loadActiveWelcomeOffers" :pageSize="pageSize" :pageCount="pageActiveCount" :rowCount="rowActiveCount" />
        </div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Past Offers</h3>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th class="w-11"><span>Name <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>Start <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>End <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-15"><span>Promo Code <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>Players <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-15"><span>Total Wagered <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"><span>Bonuses <span v-html="SortingIcon('#B4BDC6', '#B4BDC6')" /></span></th>
                            <th class="w-11"></th>
                            <th class="w-12"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(offer, index) in 4" :key="index">
                            <td>Past Offer</td>
                            <td>2024-04-20</td>
                            <td>2024-04-20</td>
                            <td>abcd_code</td>
                            <td>Player Name</td>
                            <td>£200</td>
                            <td>£30</td>
                            <td><router-link :to="{ name: 'welcome-offer-detail', params: { id: 100}}">Details</router-link></td>
                            <!-- <td><router-link :to="{ name: 'edit-welcome-offer', params: { id: offer.id }}">Edit</router-link></td> -->
                        </tr>
                        <!-- <tr v-if="!pastWelcomeOffers.length"><td colspan="9" style="text-align: center;">No records found.</td></tr> -->
                    </tbody>
                </table>
            </div>
            <Pagination @page-changed="loadPastWelcomeOffers" :pageSize="pageSize" :pageCount="pagePastCount" :rowCount="rowPastCount" />
        </div>
    </div>
</template>

<script>
    import Pagination  from '@/components/Pagination.vue';

    export default {
        components: { Pagination  },
    };
</script>


<script setup> 
import {SortingIcon, addCommas} from '@/utils';
import { ref, onMounted} from "vue"; 
import router from "@/router/index";
import api from "@/api/api";
import { formatDateOnly } from "@/utils";

const pastWelcomeOffers = ref([])
const activeWelcomeOffers = ref([]) 
const pageActiveCount = ref(1)
const rowActiveCount = ref(1)
const pagePastCount = ref(1)
const rowPastCount = ref(1)
const pageSize = ref(0)

const goto = () => {
    router.push('/welcome-offers/create')
}

async function loadActiveWelcomeOffers(pageNumber) {
    const response = await api.bonuses.getActiveWelcomeOffersPagination(pageNumber)
    if (response.status == 200) { 
        activeWelcomeOffers.value = response.data.offers;
        pageActiveCount.value = response.data.pageCount;
        rowActiveCount.value = response.data.rowCount;
        pageSize.value = response.data.pageSize;
    }
}

async function loadPastWelcomeOffers(pageNumber) {
    const response = await api.bonuses.getPastWelcomeOffersPagination(pageNumber)
    if (response.status == 200) {
        pastWelcomeOffers.value = response.data.offers; 
        pagePastCount.value = response.data.pageCount;
        rowPastCount.value = response.data.rowCount;
        pageSize.value = response.data.pageSize;
    }
}
 
onMounted(async () => {
    await loadActiveWelcomeOffers(1);
    await loadPastWelcomeOffers(1);
})

</script>

<style scoped>
.w-11 {
    width: 11%;
}

.w-12 {
    width: 12%;
}

.w-15 {
    width: 15%;
}
</style>