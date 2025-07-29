<template>
	<div class="header-wrapper">
	    <!-- 顶部状态栏 -->
	    <header :class="[{ 'header-sticky': isSticky }, { 'header-border': hasScrolled }]">
			<!-- 导航内容（Logo、菜单等） -->
			<div class="header-content">
				<router-link class="logo" :to="{path:'/'}">
					<img src="@/assets/LOGO.png" style="height: 40px;" />
					<p class="logoText">Beetles</p>
				</router-link>
				<div style="display: flex; align-items: center; margin-left: 330px;">
					<el-input v-model="input" style="width: 700px; height: 40px; border-radius: 90;" placeholder="" clearable/>
					<el-button style="height: 40px; margin-left: 20px;" color="#58C9B9"><el-icon><Select /></el-icon><span>搜索</span></el-button>
				</div>
				<div class="NavList">
					<router-link :to="{ path:'/admin/homepage/main' }" style="width: 80px;">
						<span>管理页</span>
					</router-link>
					<router-link :to="{ path:'/' }">
						<span>首页</span>
					</router-link>
					<a href="http://chat.beetles.icu" style="width: 120px;">
						<span>在线聊天室</span>
					</a>
					<router-link :to="{ path:'/writingarticles' }">
						<span>创作</span>
					</router-link>
					
					<a style="width: 120px;" @click="logout()">登出</a>
				</div>
	      </div>
	    </header>
	  </div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
	import { post } from '../request';
	import { ElMessage } from 'element-plus';
	import router from '../router';
	import { sleep } from '../axios';
	
	const input = ref('');
	
	// 状态定义
	const isSticky = ref(false); // 是否处于置顶状态（滚动后激活）
	const hasScrolled = ref(false); // 是否下滑超过阈值（显示边框线）
	const scrollThreshold = 50; // 滚动阈值（单位：px）
	
	const logout = async () => {
		try{
			const response = await post("/logout");
			ElMessage({
			    message: '登出成功，正在跳转到首页',
			    type: 'success',
			    plain: true,
			  })
			sleep(500);
			router.push("/homepage/main");
		} catch (error) {
			console.log(error);
		}
	}
	
	
	// 监听滚动事件
	onMounted(() => {
	  window.addEventListener('scroll', handleScroll);
	});
	
	// 移除滚动事件（避免内存泄漏）
	onUnmounted(() => {
	  window.removeEventListener('scroll', handleScroll);
	});
	
	// 滚动事件处理函数
	const handleScroll = () => {
	  const scrollY = window.scrollY || document.documentElement.scrollTop;
	  // 判断是否滚动超过阈值
	  isSticky.value = scrollY > 0;
	  hasScrolled.value = scrollY > scrollThreshold;
	};
	
	// 初始化时触发一次（处理刷新后的初始状态）
	watchEffect(() => {
	  handleScroll();
	});
</script>

<style scoped>
	
	/* 置顶状态（滚动后激活） */
	.header-sticky {
	  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); /* 悬浮阴影（可选） */
	}
	
	/* 下滑后显示底部边框线 */
	.header-border {
		background-color: white;
		transition: background-color 0.5s ease;
		border-bottom-color: #e5e7eb; /* 浅灰色边框 */
	}
	
	/* 导航内容布局 */
	.header-content{
		height: 64px;
		display: flex;
	}
	.logo{
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 50px;
		text-decoration: none;
	}
	.logoText{
		color: #3C3D43;
		transition: color 0.3s ease;
	}
	.logoText:hover {
		color: #68A88B; /* #ff6600 */
	}
	.NavList{
		display: flex;
		margin-left: auto;
		margin-right: 50px;
	}
	.NavList a{
		display: flex;
		justify-content: center;
		align-items: center;
		color: #3C3D43;
		text-decoration: none;
		width: 52px;
		padding: 0 12px;
		transition: color 0.3s ease;
	}
	.NavList a:hover {
		color: #68A88B; /* #ff6600 */
	}
	.NavList a span{
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>