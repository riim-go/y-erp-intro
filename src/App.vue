<template>
  <div class="main-container">
    <div :class="mainClass">
      <n-carousel draggable show-arrow autoplay>
        <img class="carousel-img" :src="img1" />
        <img class="carousel-img" :src="img2" />

        <template #arrow="{ prev, next }">
          <div class="custom-arrow">
            <button type="button" class="custom-arrow--left" @click="prev">
              <n-icon><ArrowBack /></n-icon>
            </button>
            <button type="button" class="custom-arrow--right" @click="next">
              <n-icon><ArrowForward /></n-icon>
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li v-for="index of total" :key="index" :class="{ ['is-active']: currentIndex === index - 1 }" @click="to(index - 1)" />
          </ul>
        </template>
      </n-carousel>
    </div>
  </div>
</template>

<script setup>
  import { NCarousel, NCarouselItem, NIcon } from 'naive-ui';
  import { ArrowBack, ArrowForward } from '@vicons/ionicons5';
  import { ref, onMounted, onUnmounted, computed } from 'vue';
  import img1 from '@/assets/yerp_tab1_1.png';
  import img2 from '@/assets/yerp_tab2_1.png';

  const width = ref(window.innerWidth);

  const onResize = () => {
    width.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', onResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  const mainClass = computed(() => (width.value >= 768 ? 'main-card' : 'main-card-m'));
</script>

<style scoped>
  .main-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 40px);
    padding: 20px;
  }

  .main-card {
    width: 80%;
    height: calc(100% - 20px);
    padding: 10px;
  }

  .main-card-m {
    width: 100%;
    height: calc(100% - 20px);
    padding: 10px;
  }

  .carousel-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .custom-arrow {
    display: flex;
    position: absolute;
    bottom: 25px;
    right: 10px;
    z-index: 10;
  }

  .custom-arrow button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin-right: 12px;
    color: #fff;
    background-color: rgba(32, 128, 240, 0.5);
    border-width: 0;
    border-radius: 8px;
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .custom-arrow button:hover {
    background-color: rgba(32, 128, 240, 1);
  }

  .custom-arrow button:active {
    transform: scale(0.95);
    transform-origin: center;
  }

  .custom-dots {
    display: flex;
    margin: 0;
    padding: 0;
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 10;
    background: transparent;
  }

  .custom-dots li {
    display: inline-block;
    width: 12px;
    height: 4px;
    margin: 0 3px;
    border-radius: 4px;
    background-color: rgba(32, 128, 240, 0.5);

    transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }

  .custom-dots li.is-active {
    width: 40px;
    background: rgba(32, 128, 240, 1);
  }
</style>
