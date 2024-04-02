<template>
    <AccountMenu/>
    <div class="account-detail">
        <div class="card">
            <h3>Account Details</h3>
            <form method="post" autocomplete="off">
                <div class="account-profile-row">
                    <div>
                        <input type="text" placeholder="First Name">
                        <input type="text" placeholder="Last Name">
                        <select name="" id="">
                            <option value="" disabled selected>Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input type="date" placeholder="D.O.B">
                        <input type="tel" placeholder="Phone Number">
                        <select name="" id="">
                            <option value="" disabled selected>Language</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" placeholder="Address">
                        <input type="text" placeholder="City">
                        <input type="text" placeholder="State">
                        <select name="" id="">
                            <option value="" disabled selected>Country</option>
                            <option value="usa">USA</option>
                            <option value="canada">Canada</option>
                            <option value="uk">UK</option>
                            <option value="india">India</option>
                            <option value="australia">Australia</option>
                        </select>
                        <input type="text" placeholder="Postcode">
                        <select name="" id="">
                            <option value="" disabled selected>Currency</option>
                            <option value="usd">USD</option>
                            <option value="eur">EUR</option>
                            <option value="gbp">GBP</option>
                            <option value="aud">AUD</option>
                            <option value="brl">BRL</option>
                        </select>   
                    </div>
                </div>
               <div class="right-btn-container">
                  <button type="submit" class="btn-lg">Save changes</button>
               </div>
            </form>
        </div>
    </div>
 </template>
 
 <script setup>
 import AccountMenu from '@/components/AccountMenu.vue';
 </script>