<template>
    <div class="theme-section">
        <div class="banner">
            <img src="/images/theme.png" alt="" />
            <h1>Theme</h1>
        </div>
        <div class="desktop-tabs">
            <div @click="switchTab('styles')" :class="{ active: tab === 'styles'}" class="tab"> STYLES </div>
            <div @click="switchTab('banner-carrousel')" :class="{ active: tab === 'banner-carrousel'}" class="tab"> BANNER CARROUSEL </div>
            <div @click="switchTab('game-carrousel')" :class="{ active: tab === 'game-carrousel'}" class="tab"> GAME CARROUSEL </div>
        </div>

        <div v-if="tab === 'styles'">
        <div class="styles-card">
            <img src="/images/coming-soon.svg" alt="img">
        </div>
        </div>
        <div v-if="tab === 'banner-carrousel'">
            <div class="card">
                <div class="carrousel-container">
                    <div class="carrousel-img-container">
                        <div class="bg-image">
                            <img src="/images/game-banner.png" alt="banner" class="banner-image">
                        </div>
                        <div class="middle">
                            <div class="icon">
                                <img src="/images/svg/edit-primary-27.svg" alt="">
                            </div>
                        </div>
                        <div class="close-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" /></svg>
                        </div>
                    </div>
                    <div class="carrousel-img-container" v-for="b in bannerCarrousel">
                        <div class="bg-image" >
                            <!-- <img src="/images/game-banner.png" alt="banner" class="banner-image"> -->
                        </div>
                        <div class="middle">
                            <div class="icon" @click="showModal('editBanner')">
                                <img src="/images/svg/edit-primary-27.svg" alt="">
                            </div>
                        </div>
                        <div class="close-icon" @click="removeContainer">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" /></svg>
                        </div>
                    </div>
                    <div class="carrousel-plus" @click="addContainer">
                       <img src="/images/svg/plus-primary-40.svg" alt="plus">     
                    </div>
                </div>
            </div>
        </div>
        <div v-if="tab === 'game-carrousel'">carrousel -2</div>
        <div class="right-btn-container" v-if="tab === 'banner-carrousel' || tab === 'game-carrousel'">
            <button class="btn-sm">Save</button>
        </div>
    <teleport to="body">
      <Modal v-if="isModalVisible" @close-modal="closeModal" :isOpen="isModalVisible">
        <div v-if="modalType === 'editBanner'" @click="closeModal" class="cross-button-banner-modal">
          <img src="/images/svg/close-32.svg" alt="">
        </div>
        <div v-if="modalType === 'editBanner'" class="detail-modal theme-modal">
          <div class="modal-banner">
            <h1>Edit: Slide 1</h1>
          </div>
          <div class="player-modal">
            <div class="detail">
                <div class="edit-modal-container">
                    <div class="column left">
                    <form action="">
                        <div class="input-field-container">
                            <label for="">LINK URL <img @click="toggleQuery = !toggleQuery" src="/images/svg/question-20.svg" alt=""></label>
                            <input :style="[toggleQuery ? 'marginBottom: 8px' : '']" type="text" placeholder="/mondayreload">
                            <div v-if="toggleQuery" class="alert-blue">
                                <div>
                                    <img src="/images/svg/alert-question-blue.svg" alt="">
                                </div>
                                <div>
                                    <h5>What does it mean?</h5>
                                    <p>This is the page that the user is directed <br /> to upon clicking on the banner.</p>
                                </div>
                            </div>
                        </div>
                        <div class="input-field-container">
                            <label for="">Who should see this banner?</label>
                            <div class="radio-container">
                                <div class="radio-check"><img src="/images/svg/round-uncheck-16.svg" alt=""> <span>Logged Out Players</span></div>
                                <div class="radio-check"><img src="/images/svg/round-check-16.svg" alt="" style="margin-left: -6px;"> <span>Logged In Players</span></div>
                                <div class="radio-check"><img src="/images/svg/round-uncheck-16.svg" alt=""> <span>Both</span></div>
                            </div>
                        </div>
                    </form>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="column right">
                        <div class="modal-carrousel-container">
                            <div>
                                <p class="title">Desktop:</p>
                                <div class="modal-carrousel-img-container">
                                    <div class="bg-image" >
                                        <!-- <img src="/images/game-banner.png" alt="banner" class="banner-image"> -->
                                    </div>
                                    <div class="middle">
                                        <div class="icon" @click="modalType = 'assetsGallery'">
                                            <img src="/images/svg/edit-primary-27.svg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="title">Tablet:</p>
                                <div class="modal-carrousel-img-container">
                                    <div class="bg-image" >
                                        <!-- <img src="/images/game-banner.png" alt="banner" class="banner-image"> -->
                                    </div>
                                    <div class="middle">
                                        <div class="icon" @click="modalType = 'assetsGallery'">
                                            <img src="/images/svg/edit-primary-27.svg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="title">Mobile:</p>
                                <div class="modal-carrousel-img-container">
                                    <div class="bg-image" >
                                        <!-- <img src="/images/game-banner.png" alt="banner" class="banner-image"> -->
                                    </div>
                                    <div class="middle">
                                        <div class="icon"  @click="modalType = 'assetsGallery'">
                                            <img src="/images/svg/edit-primary-27.svg" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <div v-if="modalType === 'assetsGallery'" @click="closeModal" class="cross-button-banner-modal">
          <img src="/images/svg/close-32.svg" alt="">
        </div>
        <div v-if="modalType === 'assetsGallery'" class="detail-modal gallery-modal">
          <div class="modal-banner">
            <h1>Asset Gallery</h1>
          </div>
          <div class="player-modal">
            <div class="nav-section">
                <div class="go-back" @click="modalType = 'editBanner'">
                    <img src="/images/svg/chevron-left.svg" alt="" />
                    <span>Go back</span>
                </div>
                <button class="btn-normal">
                    <img src="/images/svg/upload.svg" alt="icon"> Upload
                </button>
            </div>
            <div class="gallery-container">
                <div class="img-outer-container" v-for="b in 10"  @click="isSelected = !isSelected">
                    <div class="gallery-img-container" :class="{'isSelected': isSelected}" :style="[isSelected ? 'border: 2px solid #696CFF' : '' ]">
                        <div class="bg-image">
                            <div class="truncate">monday_reload_banner_710x300.jpg</div>
                            <img src="/images/game-banner.png" alt="banner" class="gallery-image">
                        </div>
                        <!-- <div class="middle">
                            <div class="icon" @click="showModal('editBanner')">
                                <img src="/images/svg/edit-primary-27.svg" alt="">
                            </div>
                        </div> -->
                        <div class="check-icon" v-if="isSelected">
                            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                                <g filter="url(#filter0_d_1811_39730)">
                                    <path d="M18.5524 3H7.75234C5.76411 3 4.15234 4.61177 4.15234 6.6V17.4C4.15234 19.3882 5.76411 21 7.75234 21H18.5524C20.5406 21 22.1524 19.3882 22.1524 17.4V6.6C22.1524 4.61177 20.5406 3 18.5524 3Z" fill="#696CFF"/>
                                </g>
                                <path d="M9.63528 11.5666L9.53338 11.4723L9.43147 11.5666L8.54858 12.384L8.42969 12.4941L8.54858 12.6042L11.4876 15.3251L11.5895 15.4194L11.6914 15.3251L17.7524 9.71389L17.8713 9.60382L17.7524 9.49375L16.8695 8.67637L16.7676 8.58203L16.6657 8.67637L11.5895 13.3759L9.63528 11.5666Z" fill="white" stroke="white" stroke-width="0.3"/>
                                <defs>
                                    <filter id="filter0_d_1811_39730" x="0.152344" y="1" width="26" height="26" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="2"/>
                                    <feGaussianBlur stdDeviation="2"/>
                                    <feComposite in2="hardAlpha" operator="out"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0.411765 0 0 0 0 0.423529 0 0 0 0 1 0 0 0 0.4 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1811_39730"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1811_39730" result="shape"/>
                                    </filter>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </Modal>
    </teleport>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Modal from "@/components/Modal/PopoverModal.vue";

const tab = ref('styles');
const bannerCarrousel = ref([1,2,3])
const isModalVisible = ref(false)
const modalType = ref(null);
const toggleQuery = ref(false);
const isSelected = ref(false)

const switchTab = async (type) => {
  tab.value = type;
  if(type === 'banner-carrousel') {
    getBennerCarrousel()
  } else  if(type === 'game-carrousel') {
    getGameCarrousel()
  }
};

const getBennerCarrousel = () => {
    console.log("this is banner carrousel")
}

const getGameCarrousel = () => {
    console.log("this is getGame carrousel")
}

const addContainer = () => {
    bannerCarrousel.value.push(1);
} 

const removeContainer = () => {
    bannerCarrousel.value.pop();
}

const showModal = (type) => {
  isModalVisible.value = true;
  modalType.value = type;
  console.log(type)
};

const closeModal = () => {
  isModalVisible.value = false;
};

</script>

<style scoped>

.nav-section {
    width: 100%; 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 40px;

    & .go-back {
        display: flex; 
        align-items: center; 
        gap: 8px; 
        cursor: pointer;
        & span {
            font-size: 18px; 
            font-weight: 500; 
            color: #696cff;
        }
    }
}
.gallery-container {
    display: flex; 
    flex-direction: row; 
    flex-wrap: wrap;
    gap: 24px;

    & .img-outer-container {
        width: 176px; 
        height: 176px; 
        padding: 8px;
    }
}
.gallery-img-container {
    position: relative;
    display: flex;
    min-width: 164px;
    max-width: 164px;
    height: 164px;
    justify-content: center;
    align-items: center;
    border: 2px solid #A8A9FF;
    background-image: url('/images/svg/bg-light.svg');
    background-repeat: no-repeat;
    background-position: top;
    cursor: pointer;
    border-radius: 6.957px;
}
 .check-icon {
    position: absolute;
    top: -10px;
    right: -10px;
}
 .bg-image {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
.gallery-img-container:not(.isSelected):hover .gallery-image {
    margin-top: 20px;
}
 .gallery-image {
    width: 100%;
    position: relative;
    padding: 0 10px;
}

 .middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.gallery-img-container:not(.isSelected):hover  .bg-image {
    opacity: 0.5;
    background:  #696CFF;
    border-radius: 6px;
}

 .gallery-img-container:not(.isSelected):hover .middle {
  opacity: 1;
}

.truncate {
  position: absolute;
  top: 0;
  padding: 12px 9px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #566A7F;
  text-align: center;
  font-size: 14px;
  font-weight: 400;

}

.gallery-img-container:not(.isSelected):hover .truncate {
  white-space: normal;
  overflow: visible;
  text-overflow: unset;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  word-wrap: break-word;
  line-height: normal
}

.icon {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    fill: #FFF;
    border-radius: 50%;
    filter: drop-shadow(3.75px 3.75px 7.5px rgba(105, 108, 255, 0.25));
}

 .icon:hover {
    cursor: pointer;
    width: 44px;
    height: 44px;
}



@media (min-width: 1600px) {
    .gallery-modal {
        width: 1572px;
    }  
}

@media (min-width: 1200px) and (max-width: 1599px){
    .gallery-modal {
        width: 1100px;
    }  
}
</style>
