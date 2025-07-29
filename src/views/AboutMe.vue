<template>
  <div class="danmaku-container">
    <div
      v-for="(danmaku, index) in danmakus"
      :key="index"
      class="danmaku"
      :style="{
        left: danmaku.left + 'px',
        top: danmaku.top + 'px',
        animation: `danmakuMove ${danmaku.duration}s linear forwards`
      }"
      @animationend="removeDanmaku(index)"
    >
      {{ danmaku.text }}
    </div>
  </div>
</template>

<script setup>
	import { ref } from 'vue';
	
	const danmakus = ref([
		{ text: '弹幕1', left: 0, top: 50, duration: 3 },
		{ text: '弹幕2', left: 0, top: 100, duration: 5 },
	]);
	
	const removeDanmaku = (index) => {
      danmakus.value.splice(index, 1);
    }
	
</script>



<style>
.danmaku-container {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  /* background-color: #333; */
}

.danmaku {
  position: absolute;
  white-space: nowrap;
  color: white;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
}

@keyframes danmakuMove {
  from {
    transform: translateX(80vw);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
