<template>
	<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
	<div class="userInfo">
		<div class="totalInfo">
			<div style="display: flex; padding: 10px;">
				<el-avatar :size="90" :src="userInfo.avatar" style="margin-right: 16px;"/>
				<div>
					<div style="font-size: 20px; font-weight: 500; color: #222226;">甲壳虫</div>
				</div>
			</div>
		</div>
		<el-divider>
			<!-- <el-icon><star-filled /></el-icon> -->
			<span style="color: #969698; font-size: 18px;">基 础 信 息</span>
		</el-divider>
		<div class="basicInfo">
			<div class="infoRow">
				<span class="infoTitle">用户昵称</span>：<span class="infoContent">{{ userInfo.userNickname }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">用户名</span>：<span class="infoContent">{{ userInfo.userName }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">用户ID</span>：<span class="infoContent">{{ userInfo.userId }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">性别</span>：<span class="infoContent">{{ userInfo.sex === 0 ? '男' : (userInfo.sex === 1 ? '女' : '未知') }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">个人简介</span>：<span class="infoContent" :style="{ color: userInfo.bio ? 'black' : '#a3a3a3' }">{{ userInfo.bio == ''? '没有填写个人简介哦' : userInfo.bio }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">邮箱</span>：<span class="infoContent" :style="{ color: userInfo.email ? 'black' : '#a3a3a3' }">{{ userInfo.email == ''? '未填写' : userInfo.email }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">电话号码</span>：<span class="infoContent" :style="{ color: userInfo.phonenumber ? 'black' : '#a3a3a3' }">{{ userInfo.phonenumber == ''? '未填写' : userInfo.phonenumber }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">创建时间</span>：<span class="infoContent">{{ userInfo.createTime }}</span>
			</div>
		</div>
		<div class="basicInfo">
			
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
	
	const route = useRoute()
	const userId = computed(() => route.params.id);
	
	const userInfo = ref({
		// 用户昵称:userNickname ; 用户名:userName ; 用户ID:userId ; 性别:sex ; 个人简介: bio ; 邮箱: email ; 电话号码: phonenumber ; 创建时间: createTime
		userId: 3, avatar: "https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", userNickname: "甲壳虫", 
		userName: "beetles", sex: "2", bio: "", email: "121212@qqqq", phonenumber: "", createTime: "2025-06-10 16:18:03"
	})
	
	const checkIsLogin = async () => {
		try{
			const response = await get('/checkIsLogin');
		} catch (error) {
			console.error('未登录:', error);
		}
	}
	onMounted(() => {
		checkIsLogin();
	})
</script>

<style scoped>
	.userInfo {
		width: 58vw;
		min-width: 885px;
		/* border-top: 3px solid #e5e5e5; */
		/* background-color: #e5e5e5; */
		min-height: 800px;
		padding: 20px;
	}
	.totalInfo {
		height: 150px;
		/* background-color: aliceblue; */
		/* border-bottom: 3px solid #e5e5e5; */
	}
	.basicInfo {
		display: block;
		padding: 20px;
		/* background-color: aliceblue; */
	}
	.infoRow {
		margin-bottom: 20px;
		align-items: center;
		display: flex;
	}
	.infoTitle {
		color: #555666;
		width: 80px;
		margin-right: 20px;
	}
	.infoContent {
		flex: 1;
		margin-left: 10px;
	}
</style>