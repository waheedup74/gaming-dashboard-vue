<template>
    <div>
        <div class="banner">
            <img src="/images/pages.png" alt="" />
            <h1>Legal Pages</h1>
        </div>
        <div class="right-btn-container">
            <router-link to="/legal-pages/create">
                <button class="btn-normal">
                    <img src="/images/svg/plus-24.svg" alt="icon">
                    Create New Legal Page</button>
            </router-link>
        </div>
        <div class="card">
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Locale</th>
                            <th>Published</th>
                            <th>Date Created</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in pagesList">
                            <td>{{ data.name }}</td>
                            <td>{{ data.url }}</td>
                            <td><img :src="data.local" alt=""></td>
                            <td><img :src="data.published" alt=""></td>
                            <td>2024-01-01</td>
                            <td>
                                <router-link :to="'/legal-pages/edit/'+data.id">Edit</router-link>
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
        name: 'Terms',
        url: '/terms',
        local: '/images/svg/uk.svg',
        published:"/images/svg/cross-red-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 2,
        name: 'Responsible Gambling',
        url: '/resgambling',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 3,
        name: 'KYC',
        url: '/kyc',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 4,
        name: 'Payments',
        url: '/payments',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 5,
        name: 'Glossary',
        url: '/glossary',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 6,
        name: 'Self-Exclusion',
        url: '/selfexclusion',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 7,
        name: 'AML',
        url: '/aml',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 8,
        name: 'Disputes',
        url: '/disputes',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 9,
        name: 'Payouts',
        url: '/payouts',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
    {
        id: 10,
        name: 'Bonus Terms',
        url: '/aml',
        local: '/images/svg/br.svg',
        published: "/images/svg/check-green-r.svg",
        dateCreated: '2024-01-01'
    },
])
</script>
