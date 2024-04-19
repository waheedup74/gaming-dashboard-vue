<template>
    <div class="cms-section">
        <div class="banner">
            <img src="/images/pages.png" alt="" />
            <h1>Edit: Template 1</h1>
        </div>
        <div class="breadcrumbs">
            <router-link to="/email-templates">Email Templates</router-link>
            <span>
                <img src="/images/svg/chevron-breadcrumb.svg" alt="chevron">
            </span>
            <span class="current">Edit Template 1</span>
        </div>
        <div class="card">
            <form>
                <div class="hroiz-form-container ">
                    <div class="input-field-container">
                        <label for="">Name</label>
                        <input type="text" placeholder="Choose a name for the page">
                    </div>
                    <div class="input-field-container">
                        <label for="">Subject</label>
                        <input type="text" placeholder="/newpage">
                    </div>
                    <div class="input-field-container">
                        <label for="">Locale</label>
                        <SelectDropdown :dataList="optionsList" @selected="handleSelected" position="absolute" name="provider" :placeholder="'Select a language'"/>
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
                <button class="btn-lg">Save Changes</button>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SelectDropdown from "@/components/SelectDropdown.vue";
  </script>