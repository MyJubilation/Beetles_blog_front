<template>
	<div style="background-color: #F3F4F6;">
		<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000; background-color: white;"></Header>
		<div style="margin-top: 64px; margin-bottom: 10px; display: flex; width: 97vw; justify-content: center;">
			<div style="width: 1400px;">
				<div style="width: 100%; margin-top: 10px; background-color: white;">
					<div style="padding: 16px;">
						<!-- <div style="font-size: 16px; font-weight: 500;">筛选</div> -->
						<div style="display: flex;">
							<div
								@click="topTimeNaviButton = '默认'; changeTopTimeNaviButton('默认')"
								:class="{ active: topTimeNaviButton === '默认' }"
								class="topNaviTimeList-item">
								默认
							</div>
							<div
								@click="topTimeNaviButton = '最新'; changeTopTimeNaviButton('最新')"
								:class="{ active: topTimeNaviButton === '最新' }"
								class="topNaviTimeList-item">
								最新
							</div>
						</div>
					</div>
				</div>
				<div style="display: flex;">
					<div v-if="loading" style="margin-top: 10px; min-height: 700px; width: 75%; margin-right: 10px; background-color: white; padding:16px;">
						<div v-for="i in 5" :key="i" class="skeleton-item">
						  <div class="skeleton-line title"></div>
						  <div class="skeleton-line content"></div>
						  <div class="skeleton-line content"></div>
						  <div class="skeleton-line date"></div>
						</div>
					  </div>
					<div v-else style="margin-top: 10px; min-height: 700px; width: 75%; margin-right: 10px; background-color: white; padding:16px;">
						<!-- 使用 processedList 而不是 articleList -->
						<div class="article-box" v-for="item in processedList">
							<div class="article-item">
								<!-- <router-link :to="`/user/${item.authorId}`" class="article-author" target="_blank">
									<el-avatar :size="23.2" :src="item.avatar ? item.avatar : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" />
									<span style="padding: 0 10px;">{{ item.author }}</span>
								</router-link> -->
								<div style="display: flex; width: 100%; margin-left: 10px; min-width: 0;">
									<div style="flex-grow: 1; margin: 8px 0 4px 0;">
										<!-- 修改这里：使用 v-html 渲染标题 -->
										<router-link :to="`/article/details/${item.id}`" class="article-title" target="_blank" v-html="item.title"></router-link>
										<!-- 修改这里：使用 v-html 渲染摘要 -->
										<router-link :to="`/article/details/${item.id}`" class="article-summary" target="_blank" v-html="item.summary"></router-link>
										<div class="detailsNaviInfo">
											<div style="display: flex; align-items: center; color: #999; margin-right: 20px; cursor: default;">
												<el-icon><View /></el-icon>
												<span style="margin-left: 3px;">阅读 {{ item.views }}</span>
											</div>
											<div class="detailsNaviInfo-item">
												<img :src="like"  alt="点赞" width="20" height="20">
												<span style="margin-left: 3px;">{{ item.likes }} 赞</span>
											</div>
											<div class="detailsNaviInfo-item">
												<img :src="star" alt="收藏" width="20" height="20">
												<span style="margin-left: 3px;">收藏 {{ item.stars }}</span>
											</div>
											<router-link :to="`/user/${item.authorId}`" target="_blank"
												class="detailsNaviInfo-item-author" style="margin-left: auto;">
												{{ item.author }}
											</router-link>
											<div class="detailsNaviInfo-item">{{ item.createTime }}</div>
										</div>
									</div>
									<!-- <router-link :to="`/article/details/${item.id}`" style="width: 128px; margin-right: 0px;" target="_blank">
										<img :src="item.coverImg ? item.coverImg : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" style="height: 84px; width: 128px;border: 1px solid black; border-radius: 5px;"/>
									</router-link> -->
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
					</div>
					<div style="width: 25%; min-height: 200px; min-width: 250px; background-color: white; margin: 10px 0 0 0;">
						
					</div>
				</div>
			</div>
		</div>
		<div class="copyright-box">
			<div class="copyright-box-footer">
				<div class="footer-colums-t">
					<router-link :to="`/aboutme`" target="_blank" class="footer-colums-t-item">
						<div style="color: inherit;">关于我</div>
					</router-link>
				</div>
				<div class="footer-colums-b">
					<a href="https://beian.miit.gov.cn/#/Integrated/index" class="footer-colums-b-item">
						<div>蜀ICP备2024095321号-1</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, watch } from 'vue';
	import { post } from '../../request.js';
	import { ElMessage } from 'element-plus';
	import Header from '../Header.vue';
	import { useRoute } from 'vue-router';
	import router from '../../router';
	import like from '../../assets/icons/like.svg';
	import star from '../../assets/icons/star.svg';
	
	const route = useRoute();
	const inputValue = ref('');
	const articleList = ref([]);
	
	const currentPage = ref(1);
	const pageSize = ref(20);
	const totalDetailsSize = ref(0);
	
	const loading = ref(false);
	
	// 优化高亮关键词函数，处理特殊字符
	function highlightKeyword(text, keyword) {
	  if (!text || !keyword) return text;
	  // 转义特殊字符，防止正则表达式错误
	  const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	  const regex = new RegExp(escapedKeyword, 'gi');
	  return text.replace(regex, match => {
	    return `<span style="color: #68A88B;">${match}</span>`;
	  });
	}
	
	// 处理数据，高亮显示搜索关键词
	const processedList = computed(() => {
	  return articleList.value.map(item => {
	    return {
	      ...item,
	      title: highlightKeyword(item.title || '', inputValue.value),
	      content: highlightKeyword(item.content || '', inputValue.value),
	      summary: highlightKeyword(item.summary || '', inputValue.value)
	    };
	  });
	});
	
	const topTimeNaviButton = ref('默认');
	
	const changeTopTimeNaviButton = async (index) => {
		topTimeNaviButton.value = index;
		await getInputValue();
	}
	
	const getInputValue = async () => {
		loading.value = true;
		try {
			// 获取URL参数
			const encodedInput = route.query.input;
				  
			if (encodedInput) {
				// 先解码一次（将%25解码为%），然后再解码原始内容
				inputValue.value = decodeURIComponent(decodeURIComponent(encodedInput));
			}
			
			const response = await post("/selectDetailsList", {
				"currentPage": 1,
				"pageSize": 20,
				"userId": localStorage.getItem("userId"),
				"input": inputValue.value,
				"timeNaviType": topTimeNaviButton.value
			});
			
			articleList.value = response.data.content;
			totalDetailsSize.value = response.data.total;
		}catch (error) {
			console.error('获取数据失败:', error);
		} finally {
			loading.value = false;
		}
	}
	
	// 搜索框按钮点击事件
	const selectDetailsList = async () => {
		if(inputValue.value != ''){
			// router.push({
			//         path: '/select',
			//         query: { input: encodeURIComponent(inputValue.value) }
			//       })
			const routeData = router.resolve({
			  path: '/select',
			  query: { input: encodeURIComponent(inputValue.value) }
			});
			window.open(routeData.href, '_blank');
		} else {
			ElMessage.warning("请输入搜索内容");
		}
	}
	
	
	
	onMounted(() => {
		getInputValue();
	});
	
	watch(
	  () => route.query.input,
	  (newInput) => {
	    if (newInput) {
	      inputValue.value = decodeURIComponent(decodeURIComponent(newInput));
	      getInputValue(); // 重新获取数据
	    }
	  },
	  { immediate: true } // 组件挂载时立即执行一次
	);
	
</script>


<style scoped>
.article-box {
		/* width: 58vw; */
		/* width: 75%; */
		min-width: 885px;
		border-top: 1px solid #e5e5e5;
		/* padding-left: 200px; */
		/* margin-left: 280px; */
	}
	.article-item {
		width: 100%;
		height: 90px;
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
		width: 100%;
	}
	.detailsNaviInfo-item {
		display: flex;
		align-items: center;
		transition: background-color 0.3s ease;
		color: #999;
		margin-right: 20px;
		text-decoration: none;
		cursor: default;
	}
	
	.detailsNaviInfo-item-author {
		display: flex;
		align-items: center;
		/* transition: background-color 0.3s ease; */
		color: #999;
		margin-right: 20px;
		text-decoration: none;
		cursor: default;
	}
	.detailsNaviInfo-item-author:hover {
		cursor: pointer;
		color: #484848;
	}
	
	
	.copyright-box {
		width: 100%;
		background: #fff;
	}
	.copyright-box-footer {
		margin: 0 auto;
		/* width: 100%; */
		min-width: 972px;
		box-shadow: 0 -1px 0 0 rgba(0, 0, 0, .05);
		background: #fff;
		padding: 24px 34px 20px;
	}
	.footer-colums-t {
		display: flex;
		justify-content: center;
		-webkit-box-pack: center;
	}
	.footer-colums-t-item {
		margin: 0 8px;
		color: #999aaa;
		font-size: 14px;
		height: 16px;
		line-height: 16px;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		text-decoration: none;
	}
	.footer-colums-t-item:hover {
		cursor: pointer;
	}
	.footer-colums-b {
		margin-top: 8px;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		flex-wrap: wrap;
	}
	.footer-colums-b-item {
		font-size: 12px;
		color: #999aaa;
		height: 16px;
		line-height: 16px;
		margin: 4px 6px;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		text-decoration: none;
	}
	
	.topNaviTimeList-item {
		padding: 4px 6px;
		margin-right: 16px;
		color: #555666;
		border-radius: 5px;
		transition: all 0.3s ease;
	}
	.topNaviTimeList-item.active {
		color: #121216;
		background-color: #c8edc9;
	}
	.topNaviTimeList-item:hover {
		cursor: pointer;
		color: #121216;
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