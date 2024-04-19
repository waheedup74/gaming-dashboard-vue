<template>
    <div>
        <div class="banner">
            <img src="/images/pages.png" alt="" />
            <h1>Email Templates</h1>
        </div>
        <div class="right-btn-container">
            <router-link to="/email-templates/create">
                <button class="btn-normal">
                    <img src="/images/svg/plus-24.svg" alt="icon">
                    Create New Template</button>
            </router-link>
        </div>
        <div class="card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Subject</th>
                            <th>Locale</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in pagesList">
                            <td>{{ data.name }}</td>
                            <td>{{ data.subject }}</td>
                            <td><img :src="data.local" alt=""></td>
                            <td>
                                <router-link :to="'/email-templates/edit/'+data.id">Edit</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div class="pagination">
                <div class="pagination-text">Showing 1 to 20 of 2100 entries</div>
                <div class="pagination-btns static">
                    <button class="previous disabled">Previous</button>
                    <button class="num-btn active">1</button>
                    <button class="num-btn">2</button>
                    <button class="num-btn">3</button>
                    <button class="num-btn">4</button>
                    <button class="next">Next</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const pagesList = ref([
    {
        id: 1,
        name: 'Email1',
        subject: 'Free Spins',
        local: '/images/svg/uk.svg',
    },
    {
        id: 2,
        name: 'Email2',
        subject: 'Welcome Offer',
        local: '/images/svg/br.svg',
    },
])
</script>
