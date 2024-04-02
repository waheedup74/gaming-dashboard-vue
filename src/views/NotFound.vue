<template>
    <div class="container">
      <h1 class="first-four">4</h1>
      <div class="cog-wheel1">
        <div class="cog1">
          <div class="top"></div>
          <div class="down"></div>
          <div class="left-top"></div>
          <div class="left-down"></div>
          <div class="right-top"></div>
          <div class="right-down"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
      
      <div class="cog-wheel2"> 
        <div class="cog2">
          <div class="top"></div>
          <div class="down"></div>
          <div class="left-top"></div>
          <div class="left-down"></div>
          <div class="right-top"></div>
          <div class="right-down"></div>
          <div class="left"></div>
          <div class="right"></div>
        </div>
      </div>
      <h1 class="second-four">4</h1>
      <p class="wrong-para">Uh Oh! Page not found!</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  const rotateCog = (selector, direction) => {
    const cog = document.querySelector(selector);
    let rotation = 0;
  
    const animate = () => {
      rotation += direction * 0.2;
      cog.style.transform = `rotate(${rotation}deg)`;
      requestAnimationFrame(animate);
    };
  
    animate();
  };
  
  onMounted(() => {
    rotateCog(".cog1", 1);
    rotateCog(".cog2", -1);
  });
  
  </script>

<style scoped>
.container {
  width: 600px;
  height: 600px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-align: center;
}

.cog-wheel1,
.cog-wheel2 {
  transform: scale(0.7);
}

.cog1,
.cog2 {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  border: 36px solid #696CFF;
  position: relative;
}

.cog2 {
  border: 36px solid #bfc0ff;
}

.top,
.down,
.left,
.right,
.left-top,
.left-down,
.right-top,
.right-down {
  width: 60px;
  height: 60px;
  background-color: #696CFF;
  position: absolute;
}

.cog2 .top,
.cog2 .down,
.cog2 .left,
.cog2 .right,
.cog2 .left-top,
.cog2 .left-down,
.cog2 .right-top,
.cog2 .right-down {
  background-color: #bfc0ff;
}

.top {
  top: -84px;
  left: 54px;
}

.down {
  bottom: -84px;
  left: 54px;
}

.left {
  left: -84px;
  top: 54px;
}

.right {
  right: -84px;
  top: 54px;
}

.left-top {
  transform: rotateZ(-45deg);
  left: -48px;
  top: -48px;
}

.left-down {
  transform: rotateZ(45deg);
  left: -48px;
  top: 150px;
}

.right-top {
  transform: rotateZ(45deg);
  right: -48px;
  top: -48px;
}

.right-down {
  transform: rotateZ(-45deg);
  right: -48px;
  top: 150px;
}

.cog2 {
  position: relative;
  left: -60.2px;
  bottom: 60px;
}

h1 {
  color: #697a8d;
}

.first-four {
  position: relative;
  left: 36px;
  font-size: 240px;
}

.second-four {
  position: relative;
  right: 108px;
  z-index: -1;
  font-size: 240px;
}

.wrong-para {
  position: absolute;
  bottom: 90px;
  padding: 22px 90px 22px 22px;
  font-weight: 600;
  color: #697a8d;
}
</style>


  