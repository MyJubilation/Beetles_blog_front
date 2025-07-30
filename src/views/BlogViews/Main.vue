<template>
	<div>
		<img src="../../assets/像素画风景01.gif" style="height: 100px; width: 100%; pointer-events: none; min-width: 885px;" />
	</div>
	<div class="article-box" v-for="item in articleList">
		<div class="article-item">
			<router-link :to="`/user/${item.authorId}`" class="article-author" >
				<el-avatar :size="23.2" :src="item.avatar ? item.avatar : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" />
				<span style="padding: 0 10px;">{{ item.author }}</span>
			</router-link>
			<div style="display: flex; width: 100%; margin-left: 10px; min-width: 0;">
				<div style="flex-grow: 1; max-width: 84%; margin: 8px 0 4px 0;">
					<router-link :to="`/article/details/${item.id}`" class="article-title">{{ item.title }}</router-link>
					<router-link :to="`/article/details/${item.id}`" class="article-summary">{{ item.summary }}</router-link>
					<div class="detailsNaviInfo">
						<div style="display: flex; align-items: center; color: #999; margin-right: 20px; cursor: default;">
							<el-icon><View /></el-icon>
							<span style="margin-left: 3px;">阅读 {{ item.views }}</span>
						</div>
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
				<router-link :to="`/article/details/${item.id}`" style="width: 128px; margin-right: 0px;">
					<img :src="item.coverImg ? item.coverImg : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" style="height: 84px; width: 128px;border: 1px solid black; border-radius: 5px;"/>
				</router-link>
			</div>
		</div>
	</div>
	<div>
		 <el-pagination
		      v-model:current-page="currentPage"
		      :page-size="pageSize"
		      layout="total, prev, pager, next"
		      :total="totalDetailsSize"
			  :pager-count="10"
			  @current-change="getDetailsInfoList"
		    />
	</div>
</template>

<script setup>
	
	import { ref, onMounted } from 'vue';
	import Header from '../../views/Header.vue';
	import { post, get } from '../../request';
	import like from '../../assets/icons/like.svg';
	import liked from '../../assets/icons/like-fill.svg';
	import star from '../../assets/icons/star.svg';
	import stared from '../../assets/icons/star-fill.svg';
	
	const currentPage = ref(1);
	const pageSize = ref(20); // TODO 暂定为10，生产环境时改为20
	const totalDetailsSize = ref(0);
	
	const viewCount = ref(0);
	
	// 文章信息
	const articleList = ref([
		// id, title, summary, author, authorId, avatar, coverImg, views, likes, stars
	]);
	// const articleList = ref([
	// 	{id:"1", title:"【MediaSoup】MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。不同的数据类型对应着最优的输入方法，犹如一把钥匙对应一把锁。要想充分发挥Excel的数据处理优势，首先需要深入了解其支持的数据类型体系。", 
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// 	{id:"1", title:"【MediaSoup】MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。不同的数据类型对应着最优的输入方法，犹如一把钥匙对应一把锁。要想充分发挥Excel的数据处理优势，首先需要深入了解其支持的数据类型体系。",
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// 	{id:"1", title:"【MediaSoup】MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。不同的数据类型对应着最优的输入方法，犹如一把钥匙对应一把锁。要想充分发挥Excel的数据处理优势，首先需要深入了解其支持的数据类型体系。",
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// 	{id:"1", title:"【MediaSoup】MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。不同的数据类型对应着最优的输入方法，犹如一把钥匙对应一把锁。要想充分发挥Excel的数据处理优势，首先需要深入了解其支持的数据类型体系。",
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// 	{id:"1", title:"MediaSoup MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。不同的数据类型对应着最优的输入方法，犹如一把钥匙对应一把锁。要想充分发挥Excel的数据处理优势，首先需要深入了解其支持的数据类型体系。",
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// 	{id:"1", title:"【MediaSoup】MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。",
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// 	{id:"1", title:"【MediaSoup】MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。",
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// 	{id:"1", title:"【MediaSoup】MS_DUMP打印转换为PLOGI的形式MS_DUMP打印转换为PLOGI的形式", summary:"Excel作为强大的数据处理工具，为用户提供了丰富多样的数据输入方式。",
	// 	author:"甲壳虫", avatar:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", coverImg:"https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"},
	// ])
	
	// 获取文章信息
	// 获取点赞收藏状态
	const isLiked = ref(false);
	const isStared = ref(false);
	
	const test = () => {
		
	};
	
	const getDetailsInfoList = async () => {
		console.log("获取文章数据列表");
		// if(currentPage == null){
		// 	currentPage.value = 1;
		// }
		// 进行查询
		try{
			// params: 页数，每页条数
			console.log(currentPage.value + "  " + pageSize.value);
			const response = await post('/getDetailsInfoList',{
				"pageSize": pageSize.value,
				"currentPage": currentPage.value,
				"userId": localStorage.getItem("userId")
			});
			
			// const list = response.data.listInfo;
			//     // 为每个 item 添加 isStared 字段，默认为 false
			//     articleList.value = list.map(item => ({
			//       ...item,
			//       isStared: false,
			//       isStared: false
			//     }));
			
			articleList.value = response.data.listInfo;
			console.log(articleList);
			totalDetailsSize.value = response.data.total;
		} catch (error) {
			console.error('获取文章数据列表:', error);
		}
	};
	
	// 点赞功能
	const likeDetail = async (item) => {
		// 点赞功能
		const response = await post("/likeDetail", {
			"detailsId": item.id,
			"userId": localStorage.getItem("userId")
		})
		console.log(response);
		if(response.code == 200){
			const status = response.data;
			item.likes += status;
			// // 查询是否点赞和收藏
			// // 如果未登录，则不用查询
			// const response = await post("/checkIslikeANDIsStar",{
			// 	"detailsId": detailsId.value,
			// 	"userId": localStorage.getItem("userId")
			// })
			// if(response.code == 200){
			// 	response.data.isLike == 1 ? isLiked.value = true : isLiked.value = false;
			// 	response.data.isStar == 1 ? isStared.value = true : isStared.value = false;
			// }else {
			// 	ElMessage(response.msg);
			// }
			// isLiked.value ? likes.value-- : likes.value++;
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
		console.log(response);
		if(response.code == 200){
			const status = response.data;
			item.stars += status;
			status == 1 ? isStared.value = true : isStared.value = false;
			// isStared.value ? stars.value-- : stars.value++;
		}else {
			ElMessage(response.msg);
		}
	}
	
	onMounted(() => {
		getDetailsInfoList();
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
	
	
	.article-box {
		width: 58vw;
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
		white-space: nowrap; /* 防止换行 */
		overflow: hidden; /* 隐藏溢出内容 */
		text-overflow: ellipsis; /* 用省略号表示省略部分 */
		color: black;
		text-decoration: none;
		 display: inline-block;
	}
	.article-title:hover {
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
</style>