<template>
	<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
	<div style="margin-top: 64px; display: flex; width: 97vw;">
		<div class="mainCss">
			  <el-menu
				default-active="1-1"
				class="aside"
				@open="handleOpen"
				@close="handleClose"
			  >
				<el-sub-menu index="1">
				  <template #title>
					<el-icon><Odometer /></el-icon>
					<span>仪表盘</span>
				  </template>
					<el-menu-item index="1-1" class="aside-item" @click="toUrl(`/admin/homepage/main`)">工作台</el-menu-item>
					<el-menu-item index="1-2" class="aside-item" @click="toUrl(`/admin/homepage/main`)">item two</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="2">
				  <template #title>
					<el-icon><Operation /></el-icon>
					<span>列表页</span>
				  </template>
					<el-menu-item index="2-1" class="aside-item" @click="toUrl(`/admin/homepage/form/basicForm`)">基础表单</el-menu-item>
					<el-menu-item index="2-2" class="aside-item" @click="toUrl(`/admin/homepage/main`)">item two</el-menu-item>
					<el-menu-item index="2-3" class="aside-item">item three</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="3">
				  <template #title>
					<el-icon><Expand /></el-icon>
					<span>表单页</span>
				  </template>
					<el-menu-item index="3-1" class="aside-item" @click="toUrl(`/admin/homepage/form/basicForm`)">基础表单</el-menu-item>
					<el-menu-item index="3-2" class="aside-item" @click="toUrl(`/admin/homepage/main`)">item two</el-menu-item>
					<el-menu-item index="3-3" class="aside-item">item three</el-menu-item>
				</el-sub-menu>
				<el-sub-menu index="4">
				  <template #title>
					<el-icon><Expand /></el-icon>
					<span>审核页</span>
				  </template>
					<el-menu-item index="4-1" class="aside-item" @click="toUrl(`/admin/homepage/form/basicForm`)">内容审核</el-menu-item>
					<el-menu-item index="4-2" class="aside-item" @click="toUrl(`/admin/homepage/main`)">举报审核</el-menu-item>
					<el-menu-item index="4-3" class="aside-item">item three</el-menu-item>
				</el-sub-menu>
				<el-menu-item index="7">
				  <el-icon><Warning /></el-icon>
				  <span>常见问题</span>
				</el-menu-item>
			  </el-menu>
			<div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import Header from '../AdminHeader.vue';
	import { post, get } from '../../../request';
	
	import {
	  Document,
	  Menu as IconMenu,
	  Location,
	  Setting,
	} from '@element-plus/icons-vue'
import router from '../../../router';
	
	
	const userId = localStorage.getItem("userId");
	
	const handleOpen = (key: string, keyPath: string[]) => {
	  // console.log(key, keyPath)
	}
	const handleClose = (key: string, keyPath: string[]) => {
	  // console.log(key, keyPath)
	}
	
	const toUrl = (url) => {
		router.push(url);
	}
	
	onMounted(() => {
	 //  console.log(' .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------.  .----------------. \n' +
		// '| .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. || .--------------. |\n' + 
		// '| |   ______     | || |  _________   | || |  _________   | || |  _________   | || |   _____      | || |  _________   | || |    _______   | |\n' + 
		// '| |  |_   _ \    | || | |_   ___  |  | || | |_   ___  |  | || | |  _   _  |  | || |  |_   _|     | || | |_   ___  |  | || |   /  ___  |  | |\n' +
		// '| |    | |_) |   | || |   | |_  \_|  | || |   | |_  \_|  | || | |_/ | | \_|  | || |    | |       | || |   | |_  \_|  | || |  |  (__ \_|  | |\n' +
		// "| |    |  __'.   | || |   |  _|  _   | || |   |  _|  _   | || |     | |      | || |    | |   _   | || |   |  _|  _   | || |   '.___`-.   | |\n" +
		// '| |   _| |__) |  | || |  _| |___/ |  | || |  _| |___/ |  | || |    _| |_     | || |   _| |__/ |  | || |  _| |___/ |  | || |  |`\____) |  | |\n' +
		// "| |  |_______/   | || | |_________|  | || | |_________|  | || |   |_____|    | || |  |________|  | || | |_________|  | || |  |_______.'  | |\n" +
		// '| |              | || |              | || |              | || |              | || |              | || |              | || |              | |\n' +
		// "| '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' || '--------------' |\n" +
		// " '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------'  '----------------' ");
		
		console.log('%c    ____               __   __           \n' +
					'%c   / __ ) ___   ___   / /_ / /___   _____\n' +
					'%c  / __  |/ _ \\ / _ \\ / __// // _ \\ / ___/\n' +
					'%c / /_/ //  __//  __// /_ / //  __/(__  ) \n' +
					'%c/_____/ \\___/ \\___/ \\__//_/ \\___//____/  \n' +
					'%c                                         ',
					// 'color:#ff0000','color:#ff3b00','color:#ff7500','color:#FF7B00','color:#FFAD00','color:#FEDA00'
					'color:#FEDA00','color:#93FF00','color:#1AFF00','color:#00FF3B','color:#00FFB1','color:#00E0F9'
					);
	});
	
</script>

<style scoped>
	.mainCss {
		margin-left: 250px;
		width: 100%;
		display: flex;
		/* justify-content: center; */
		
	}
	
	::-webkit-scrollbar {
	  width: 8px;          /* 滚动条宽度 */
	  height: 8px;         /* 滚动条高度（垂直滚动时） */
	}
	
	.aside {
		width: 240px;
		height: 90vh;
		position: fixed;
		top: 64px;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: white;
		padding: 4px 8px;
		overflow-y: auto;
		font-weight: 400;
		font-size: 20px;
		
		/* --el-menu-bg-color: #e5e5e5; */
		/* --el-menu-text-color: #e5e5e5; */
		--el-menu-active-color: #68A88B;
	}
	.aside-item {
		/* display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 10px;
		height: 36px;
		border-radius: 5px;
		color: black;
		text-decoration: none;
		transition: color 0.3s ease;
		transition: background-color 0.3s ease; */
	}
	.aside-item:hover {
		/* color: #006FFF; */
		background-color: #e5e5e5;
	}
	.aside-item-icon {
		margin-left: 10px;
	}
	.aside-item-name {
		margin-left: 16px;
	}
	.naviInfo {
		/* padding: 10px; */
		font-size: 14px;
		color: #666;
		text-decoration: none;
	}
</style>