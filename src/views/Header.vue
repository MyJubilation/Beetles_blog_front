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
					<!-- <router-link :to="`/selectDetails?input=${input}`"> -->
						<el-button style="height: 40px; margin-left: 20px;" color="#58C9B9" @click="selectDetailsList()">
							<el-icon><Select /></el-icon>
							<span>搜索</span>
						</el-button>
					<!-- </router-link> -->
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
					
					<div class="container">
					  <div 
					    class="user-avatar" 
					    @mouseenter="startShowTimer"
					    @mouseleave="cancelShowTimer"
					  >
					    <router-link class="el-avatar-userImg" :to="`/user/${userId}`" target="_blank">
					    	<el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
					    </router-link>
					  </div>
						<div
							class="user-avatar-navList" 
							:class="{ 'show': showUserAvatarNavListVisible }"
							@mouseenter="cancelHideTimer"
							@mouseleave="hideUserAvatarNavList"
							>
							<div v-if="userId!==null">
								<div style="display: flex; justify-content: center; text-align: center; padding: 20px 0 12px 0;
									border-bottom: 1px solid #e8e8ed; font-weight: 500; font-size: 16px; color: #1a1a1a; overflow: hidden;">
									<div>{{ userNickname }}</div>
								</div>
								<div class="user-avatar-navList-box-userShortInfo">
									<router-link :to="`/user/${userId}`" target="_blank" style="display: block;"
										class="user-avatar-navList-box-userShortInfo-item">
										<span>
											{{ userShortInfo.fans!=null ? userShortInfo.fans : "--" }}
										</span>
										粉丝
									</router-link>
									<router-link :to="`/user/${userId}`" target="_blank" style="display: block;"
										class="user-avatar-navList-box-userShortInfo-item">
										<span>
											{{ userShortInfo.follows!=null ? userShortInfo.follows : "--" }}
										</span>
										关注
									</router-link>
									<router-link :to="`/user/${userId}`" target="_blank" style="display: block;"
										class="user-avatar-navList-box-userShortInfo-item">
										<span>{{ userShortInfo.likes != '' ? userShortInfo.likes : "--" }}</span>
										获赞
									</router-link>
								</div>
								<div style="scrollbar-color: #888 transparent;">
									<div style="border-bottom: 1px solid #e8e8ed;" class="user-avatar-navList-box">
										<div class="user-avatar-navList-box-item">
											<router-link :to="`/user/${userId}`" target="_blank" style="display: inline-block; width: 100%; text-align: left;">
												我的主页
											</router-link>
										</div>
										<div class="user-avatar-navList-box-item">
											<router-link :to="`/homepage/userInfo/${userId}`" target="_blank" style="display: inline-block; width: 100%; text-align: left;">
												个人中心
											</router-link>
										</div>
									</div>
									<div class="user-avatar-navList-box">
										<div class="user-avatar-navList-box-item" @click="logout">
											<router-link style="display: inline-block; width: 100%; text-align: left;">
												退出
											</router-link>
										</div>
									</div>
								</div>
							</div>
							<div v-else style="min-height: 240px;">
								<div style="display: block; padding: 0 16px; height: 40px; line-height: 40px;
									margin-top: 20px; color: inherit; width: 100%;">
									<div>
										登录后您可以：
									</div>
									<div style="margin-left: 30px;">
										<div style="color: #888;">
											<div>创作文章</div>
											<div>关注博主</div>
											<div style="margin-bottom: 20px;">与AI对话</div>
										</div>
									</div>
									<router-link class="user-avatar-navList-login-button" :to="`/login`"
										style="width: 200px;color: white;">
										登录
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
	      </div>
	    </header>
	  </div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
	import { post, get } from '../request';
	import { ElMessage } from 'element-plus';
	import router from '../router';
	import { sleep } from '../axios';
import { async } from '@kangc/v-md-editor';
	
	const input = ref('');
	
	// 状态定义
	const isSticky = ref(false); // 是否处于置顶状态（滚动后激活）
	const hasScrolled = ref(false); // 是否下滑超过阈值（显示边框线）
	const scrollThreshold = 50; // 滚动阈值（单位：px）
	
	const userId = localStorage.getItem("userId");
	const userNickname = localStorage.getItem("userNickname");
	
	const userShortInfo = ref({
		avatar: '',
		userId: '',
		userNickname: '',
		
		views: '',
		type: '',
		createTime: '',
		likes: '',
		comments: '',
		stars: ''
	});
	
	const getUserInfo = async () => {
		if(userId!=null){
			// 获取: 总访问量 原创 粉丝 关注 || 点赞 评论 收藏
			const response = await post("/getUserShortInfo",{
				"userId": userId
			});
			userShortInfo.value = response.data;
			console.log(userShortInfo.value);
		}
	}
	
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
			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	}
	
	const checkIsLogin = async () => {
		if(localStorage.getItem("userId")!=null){
			try{
				const response = await get('/checkIsLogin');
			} catch (error) {
				console.error('未登录:', error);
			}
		}
	}
	
	// ----------------用户头像悬浮功能--------------------
	const showUserAvatarNavListVisible = ref(false); // 控制菜单是否显示
	const showTimer = ref();                         // 延迟显示的定时器
	const hideTimer = ref();                         // 延迟隐藏的定时器
	
	// 当鼠标移入头像时，调用 startShowTimer
	const startShowTimer = () => {
		// if(localStorage.getItem("userId")!=null){
			cancelShowTimer(); // 先清除之前的定时器，防止重复触发
			showTimer.value = setTimeout(() => {
				showUserAvatarNavListVisible.value = true;
			}, 300);
		// }else{
		// 	// 弹出推荐登录的弹窗
		// }
	};
	
	// 如果鼠标在 300ms 内移出头像，就会调用 cancelShowTimer，取消即将触发的显示,避免菜单“误弹出”
	const cancelShowTimer = () => {
	  if (showTimer.value) {
	    clearTimeout(showTimer.value);
	    showTimer.value = null;
	  }
	};
	
	// 当鼠标移出头像或菜单时，调用 startHideTimer
	// 设置一个 100ms 的延迟，再将菜单隐藏,延迟是为了给用户时间将鼠标移入菜单，防止菜单闪烁消失
	const startHideTimer = () => {
	  hideTimer.value = setTimeout(() => {
	    showUserAvatarNavListVisible.value = false;
	  }, 100);
	};
	
	// 如果鼠标在 100ms 内移入菜单，就调用 cancelHideTimer，取消即将触发的隐藏,这样菜单就不会消失，用户可以正常操作菜单项
	const cancelHideTimer = () => {
	  if (hideTimer.value) {
	    clearTimeout(hideTimer.value);
	    hideTimer.value = null;
	  }
	};
	
	// 当鼠标移出菜单区域且没有移回头像时，调用此函数,它会立即隐藏菜单，并清除可能存在的隐藏定时器
	const hideUserAvatarNavList = () => {
	  cancelHideTimer();
	  showUserAvatarNavListVisible.value = false;
	};
	
	// ----------------用户头像悬浮功能--------------------
	
	
	// 搜索框按钮点击事件
	const selectDetailsList = async () => {
		console.log(input.value);
		if(input.value != ''){
			router.push({
			        path: '/select',
			        query: { input: encodeURIComponent(input.value) }
			      })
			// const routeData = router.resolve({
			//   path: '/select',
			//   query: { input: encodeURIComponent(input.value) }
			// });
			// window.open(routeData.href, '_blank');
		}else {
			ElMessage("请输入");
		}
	}
	
	// 监听滚动事件
	onMounted(() => {
	  window.addEventListener('scroll', handleScroll);
	  getUserInfo();
	  checkIsLogin();
	});
	
	// 移除滚动事件（避免内存泄漏）
	onUnmounted(() => {
	  window.removeEventListener('scroll', handleScroll);
	  cancelShowTimer();
	  cancelHideTimer();
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
	 /* 悬浮阴影 */
	  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05); */
	}
	
	/* 下滑后显示底部边框线 */
	.header-border {
		background-color: white;
		/* transition: background-color 0.5s ease; */
		border-bottom-color: #e5e7eb;
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
		margin-right: 20px;
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
	
	
	.container {
	  position: relative;
	  /* display: inline-block; */
	  display: flex;
	  align-items: center;
	}
	
	.user-avatar {
	  /* padding: 10px; */
	  /* background-color: #f0f0f0; */
	  cursor: pointer;
	}
	
	.user-avatar-navList {
	  position: absolute;
	  top: 100%;
	  right: 0;
	  width: 248px;
	  /* padding: 15px; */
	  background-color: white;
	  border: 1px solid #ddd;
	  border-radius: 20px 0px 20px 20px;
	  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	  opacity: 0;
	  visibility: hidden;
	  transform: translateY(-10px);
	  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
	  z-index: 100;
	}
	
	.user-avatar-navList.show {
	  opacity: 1;
	  visibility: visible;
	  transform: translateY(0);
	}
	
	.user-avatar-navList-box {
		padding: 8px 0;
		font-weight: 400;
		color: #555666;
		border-radius: 0 0 4px 4px;
	}
	.user-avatar-navList-box-userShortInfo {
		display: flex;
		justify-content: space-around;
		color: #999aaa;
		font-size: 14px;
		text-align: center;
		padding: 8px 0;
		border-bottom: 1px solid #e8e8ed;
	}
	.user-avatar-navList-box-userShortInfo-item {
		display: block;
		height: 50px;
		line-height: 20px;
		color: inherit;
	}
	.user-avatar-navList-box-userShortInfo-item span {
		font-size: 20px;
		color: #1a1a1a;
		font-style: normal;
		font-weight: 600;
		display: block;
		line-height: 30px;
		height: 30px;
	}
	.user-avatar-navList-box-item {
		display: block;
		padding: 0 16px;
		height: 40px;
		line-height: 40px;
		color: inherit;
	}
	.user-avatar-navList-box-item:hover {
		cursor: pointer;
		background-color: #F0F0F5;
	}
	.user-avatar-navList-login-button {
		display: inline-block;
		text-align: left;
		border-radius: 20px;
		background-color: #68A88B;
	}
	.user-avatar-navList-login-button:hover {
		background-color: #50826b;
	}
</style>