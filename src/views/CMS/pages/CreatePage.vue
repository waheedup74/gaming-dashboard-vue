<template>
    <div class="cms-section">
        <div class="banner">
            <img src="/images/pages.png" alt="" />
            <h1>Create New Page</h1>
        </div>
        <div class="breadcrumbs">
            <router-link to="/pages">Pages</router-link>
            <span>
                <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
            </span>
            <span class="current">Create New Page</span>
        </div>
        <div class="card ">
            <form>
                <div class="hroiz-form-container ">
                    <div class="input-field-container">
                        <label for="">Name</label>
                        <input type="text" placeholder="Choose a name for the page">
                    </div>
                    <div class="input-field-container">
                        <label for="">URL <img @click="showDetail = !showDetail" src="/images/svg/question-20.svg" alt=""></label>
                        <input type="text" placeholder="/newpage">
                        <div v-if="showDetail" class="alert-blue">
                            <div>
                                <img src="/images/svg/alert-question-blue.svg" alt="">
                            </div>
                            <div>
                                <h5>What does it mean?</h5>
                                <p>This means that ..............</p>
                            </div>
                        </div>
                    </div>
                    <div class="input-field-container">
                        <label for="">Locale</label>
                        <SelectDropdown :dataList="optionsList" @selected="handleSelected" position="absolute" name="provider" :placeholder="'Select a language'"/>
                    </div>
                    <div class="last-column">
                        <div class="publish">
                            <label class="checkbox-container">
                                <input @click="isPublished = !isPublished" type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                                Published
                        </div>
                        <button @click="isSEO = !isSEO"  class="btn-outline-primary" type="button">SEO 
                            <svg :class="{'rotate': isSEO}" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.2656 7.63281L12 12.8985L6.73436 7.63281L5 9.36717L12 16.3672L19 9.36717L17.2656 7.63281Z" /></svg>
                        </button>
                    </div>
                </div>
                <div v-if="isSEO" class="hroiz-form-container seo-form">
                    <div class="input-field-container">
                        <label for="">Meta Title</label>
                        <input type="text" placeholder="Choose the title of the page for SEO">
                    </div>
                    <div class="input-field-container">
                        <label for="">Meta description</label>
                        <input type="text" placeholder="Write a page description for SEO">
                    </div>
                </div>

                <div class="content-section">
                    <h3>Content</h3>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Type Text"></textarea>
                </div>
            </form>
        </div>
        <div class="right-btn-container">
            <div class="buttons">
                <button class="cancel-outline">Cancel</button>
                <button class="btn-lg">Create New Page</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectDropdown from "@/components/SelectDropdown.vue";

const isPublished = ref(false);
const isSEO = ref(false);
const showDetail = ref(false);
</script>