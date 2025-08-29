<template>
	<!-- <Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header> -->
	<div v-if="loading" class="article-box">
		<div v-for="i in 5" :key="i" class="skeleton-item">
		  <div class="skeleton-line title"></div>
		  <div class="skeleton-line content"></div>
		  <div class="skeleton-line content"></div>
		  <div class="skeleton-line date"></div>
		</div>
	</div>
	<div v-else>
		<div v-infinite-scroll="getFollowedDetailsInfoList" class="infinite-list"
			:infinite-scroll-disabled="isAllDetailsList"
			style="overflow-y: auto;height: calc(100vh - 64px); width: 1720px;">
		    <div v-for="item in detailsInfoList" class="article-box">
				<div class="article-item">
					<router-link :to="`/user/${item.authorId}`" class="article-author" target="_blank">
						<el-avatar :size="23.2" :src="item.avatar ? item.avatar : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" />
						<span style="padding: 0 10px;">{{ item.author }}</span>
					</router-link>
					<div style="display: flex; width: 100%; margin-left: 10px; min-width: 0;">
						<div style="flex-grow: 1; max-width: 84%; margin: 8px 0 4px 0;">
							<router-link :to="`/article/details/${item.id}`" class="article-title" target="_blank">{{ item.title }}</router-link>
							<router-link :to="`/article/details/${item.id}`" class="article-summary" target="_blank">{{ item.summary }}</router-link>
							<div class="detailsNaviInfo">
								<!-- <div style="display: flex; align-items: center; color: #999; margin-right: 20px; cursor: default;">
									<el-icon><View /></el-icon>
									<span style="margin-left: 3px;">阅读 {{ item.views }}</span>
								</div> -->
								<div class="detailsNaviInfo-item" @click="likeDetail(item)">
									<img :src="like"  alt="点赞" width="20" height="20">
									<span style="margin-left: 3px;">{{ item.likes }} 赞</span>
								</div>
								<div class="detailsNaviInfo-item" @click="starDetail(item)">
									<img :src="star" alt="收藏" width="20" height="20">
									<span style="margin-left: 3px;">收藏 {{ item.stars }}</span>
								</div>
							</div>
						</div>
						<router-link :to="`/article/details/${item.id}`" style="width: 128px; margin-right: 0px;" target="_blank">
							<img :src="item.coverImg ? item.coverImg : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" style="height: 84px; width: 128px;border: 1px solid black; border-radius: 5px;"/>
						</router-link>
					</div>
				</div>
			</div>
			<div style="width: 63vw; margin-top: 20px; margin-bottom: 40px;" v-if="isAllDetailsList">
				<div style="width: 100%; display: flex; color: #969696;
					justify-content: center; align-items: center;">
					<span>已经到底了哦</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue';
	import Header from '../../views/Header.vue';
	import { get, post } from '../../../src/request.js';
	import { ElMessage } from 'element-plus'
	import router from '../../router';
	import { sleep } from '../../axios';
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	import like from '../../assets/icons/like.svg';
	import star from '../../assets/icons/star.svg';
	
	
	const loading = ref(false);
	const route = useRoute()
	const userId = computed(() => route.params.id);
	const isAllDetailsList = ref(false);
	
	// // 当前总共数据条数
	// const currentPageNum = ref();
	
	const count = ref(0)
	const load = () => {
	  count.value += 2
	}
	
	const detailsInfoList = ref([
		// 用户昵称:userNickname ; 用户名:userName ; 用户ID:userId ; 性别:sex ; 个人简介: bio ; 邮箱: email ; 电话号码: phonenumber ; 创建时间: createTime
		
	])
	
	const getFollowedDetailsInfoList = async () => {
		console.log(detailsInfoList.value.length);
		const response = await post("/getFollowedDetailsInfoList",{
			"userId": localStorage.getItem("userId"),
			"currentPageNum": detailsInfoList.value.length
		});
		console.log(response);
		if(response.data.length<9){
			isAllDetailsList.value = true;
		}
	    detailsInfoList.value = [...detailsInfoList.value, ...response.data];
	}
	
	// 点赞功能
	const likeDetail = async (item) => {
		// 点赞功能
		const response = await post("/likeDetail", {
			"detailsId": item.id,
			"userId": localStorage.getItem("userId")
		})
		// console.log(response);
		if(response.code == 200){
			const status = response.data;
			item.likes += status;
		}else {
			ElMessage(response.msg);
		}
	}
	// 收藏功能
	const starDetail = async (item) => {
		const response = await post("/starDetail", {
			"detailsId": item.id,
			"userId": localStorage.getItem("userId")
		})
		// console.log(response);
		if(response.code == 200){
			const status = response.data;
			item.stars += status;
			status == 1 ? isStared.value = true : isStared.value = false;
		}else {
			ElMessage(response.msg);
		}
	}
	
	
	
	const checkIsLogin = async () => {
		try{
			const response = await get('/checkIsLogin');
		} catch (error) {
			console.error('未登录:', error);
		}
	}
	onMounted(() => {
		checkIsLogin();
		// getFollowedDetailsInfoList();
	})
</script>

<style scoped>
	
	
	
	.infinite-list {
	  padding: 0;
	  margin: 0;
	  list-style: none;
	}
	.infinite-list .infinite-list-item {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 50px;
	  background: var(--el-color-primary-light-9);
	  margin: 10px;
	  color: var(--el-color-primary);
	}
	.infinite-list .infinite-list-item + .list-item {
	  margin-top: 10px;
	}
	
	
	
	
	.article-box {
		/* width: 58vw; */
		width: 63vw;
		min-width: 885px;
		border-top: 1px solid #e5e5e5;
		/* padding-left: 200px; */
		/* margin-left: 280px; */
	}
	.article-item {
		width: 100%;
		height: 110px;
		border-bottom: 1px solid #e5e5e5;
		padding: 16px 0px;
	}
	.article-title {
		height: 24px;
		/* max-width: 900px; */
		font-weight: bold;
		overflow: hidden;
		white-space: nowrap; /* 防止换行 */
		text-overflow: ellipsis; /* 用省略号表示省略部分 */
		color: black;
		text-decoration: none;
		display: inline-block;
		width: 100%;
		word-break: break-word;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
	.article-title:hover {
		/* 68A88B */
		color: #006FFF;
	}
	.article-summary {
		width: 100%; /* 宽度自适应 */
		max-width: 100%;
		overflow: hidden; /* 隐藏溢出内容 */
		text-overflow: ellipsis; /* 用省略号表示省略部分 */
		text-decoration: none;
		color: #666;
		display: inline-block;
		
		white-space: nowrap;
		word-break: break-word;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
	.article-author {
		height: 23.2px;
		display: flex;
		margin-left: 10px;
		text-decoration: none;
		color: black;
	}
	.article-author:hover{
		color: #006FFF;
	}
	
	.detailsNaviInfo {
		display: flex;
	}
	.detailsNaviInfo-item {
		display: flex;
		align-items: center;
		transition: background-color 0.3s ease;
		color: #999;
		margin-right: 20px;
		text-decoration: none;
	}
	.detailsNaviInfo-item:hover {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
	
	.skeleton-item {
	  padding: 16px;
	  border-bottom: 1px solid #eee;
	}
	
	.skeleton-line {
	  height: 16px;
	  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
	  background-size: 200% 100%;
	  animation: skeleton-loading 1.5s infinite;
	  margin-bottom: 10px;
	  border-radius: 4px;
	}
	
	.skeleton-line.title {
	  width: 60%;
	  height: 20px;
	}
	
	.skeleton-line.content {
	  width: 100%;
	}
	
	.skeleton-line.date {
	  width: 30%;
	  height: 14px;
	}
	
	@keyframes skeleton-loading {
	  0% {
	    background-position: 200% 0;
	  }
	  100% {
	    background-position: -200% 0;
	  }
	}
</style>