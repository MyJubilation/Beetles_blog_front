<template>
  <div class="danmaku-container">
    <div 
      v-for="(danmaku, index) in danmakus" 
      :key="index" 
      class="danmaku"
      :style="{
        left: `${danmaku.left}px`, 
        top: `${danmaku.top}px`,
        animationDuration: `${danmaku.duration}s`
      }"
      @animationend="removeDanmaku(index)"
    >
      {{ danmaku.text }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'DanmakuPlayer',
  setup() {
    const danmakus = ref([]);

    // 模拟的评论数据
    const mockComments = [
      { text: '这是一条评论弹幕！' },
      { text: 'Vue3弹幕功能真不错！' },
      { text: '大家觉得这个功能怎么样？' },
      { text: '弹幕效果很流畅。' },
      { text: '期待更多功能！' }
    ];

    // 添加弹幕
    const addDanmaku = (text) => {
      const containerHeight = document.querySelector('.danmaku-container').offsetHeight;
      const danmakuHeight = 30; // 假设弹幕高度为30px
      const top = Math.floor(Math.random() * (containerHeight - danmakuHeight));
      const duration = 5 + Math.random() * 5; // 5-10秒的随机持续时间

      danmakus.value.push({
        text,
        left: window.innerWidth,
        top,
        duration
      });
    };

    // 移除弹幕
    const removeDanmaku = (index) => {
      danmakus.value.splice(index, 1);
    };

    // 组件挂载时添加模拟数据
    onMounted(() => {
      mockComments.forEach(comment => {
        addDanmaku(comment.text);
      });
    });

    return {
      danmakus,
      removeDanmaku
    };
  }
};
</script>

<style scoped>
.danmaku-container {
  position: relative;
  width: 300px;
  height: 300px; /* 假设弹幕容器高度为300px */
  overflow: hidden;
  border: 3px solid black;
}

.danmaku {
  position: absolute;
  white-space: nowrap;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
  animation: danmakuMove linear forwards;
}

@keyframes danmakuMove {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
