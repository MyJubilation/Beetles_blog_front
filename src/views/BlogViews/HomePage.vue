<template>
	<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
	<div style="margin-top: 64px; display: flex; width: 97vw;">
		<div class="mainCss">
			<aside class="aside">
				<div style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">
					<router-link :to="{ path:'/homepage/main' }" class="aside-item">
						<el-icon :size="24" class="aside-item-icon"><House /></el-icon>
						<div class="aside-item-name">首页</div>
					</router-link>
					<router-link :to="{ path:'/writingarticles' }" class="aside-item">
						<el-icon :size="24" class="aside-item-icon"><EditPen /></el-icon>
						<div class="aside-item-name">创作</div>
					</router-link>
					<router-link :to="`/homepage/userInfo/${userId}`" class="aside-item">
						<el-icon :size="24" class="aside-item-icon"><User /></el-icon>
						<div class="aside-item-name">个人中心</div>
					</router-link>
				</div>
				<div style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">
					<a class="aside-item" href="#">
						<el-icon :size="24" class="aside-item-icon"><Connection /></el-icon>
						<div class="aside-item-name">关注</div>
					</a>
					<a class="aside-item" href="#">
						<el-icon :size="24" class="aside-item-icon"><Clock /></el-icon>
						<div class="aside-item-name">历史</div>
					</a>
					<a class="aside-item" href="#">
						<el-icon :size="24" class="aside-item-icon"><Star /></el-icon>
						<div class="aside-item-name">收藏</div>
					</a>
					<!-- <a class="aside-item" href="#">
						<el-icon :size="24" class="aside-item-icon"><Setting /></el-icon>
						<div class="aside-item-name">设置</div>
					</a> -->
				</div>
				<div style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">
					<a class="aside-item" href="#">
						<el-icon :size="24" class="aside-item-icon"><ChatLineSquare /></el-icon>
						<div class="aside-item-name">AI问答</div>
					</a>
				</div>
				<div style="margin-top: 10px;">
					<a href="https://beian.miit.gov.cn/#/Integrated/index" class="naviInfo">蜀ICP备2024095321号-1</a>
					<img src="../../assets/Keli01.webp" style="width: 220px; margin-top: 120px; pointer-events: none;"/>
				</div>
			</aside>
			<div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import Header from '../../views/Header.vue';
	import { post, get } from '../../request';
	
	
	const userId = localStorage.getItem("userId");
	
	
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
		margin-left: 280px;
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
		
		padding: 20px;
		
		overflow-y: auto;
	}
	.aside-item {
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 10px;
		height: 36px;
		border-radius: 5px;
		color: black;
		text-decoration: none;
		/* transition: color 0.3s ease; */
		transition: background-color 0.3s ease;
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