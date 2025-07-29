<template>
	<div style="background-color: #F3F4F6;">
		<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
		<div style="margin-top: 64px; display: flex; width: 97vw; justify-content: center;">
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
			<div class="asideLeft">
				<div class="asideBox">
					<p>侧边左盒子1</p>
				</div>
				<div class="asideBox">
					<p>侧边左盒子2</p>
				</div>
				<div class="asideBox">
					<p>侧边左盒子3</p>
				</div>
			</div>
			<!-- <div v-html="detailsContent" class="markdown-body" style="border-radius: 5px; padding: 10px;"></div> -->
			<div class="details">
				<h1 style="display: flex; justify-content: center;">{{ title }}</h1>
				<el-divider>
					<!-- <el-icon><star-filled /></el-icon> -->
					<span style="color: #969698; font-size: 18px;">摘 要</span>
				</el-divider>
				<span style="font-size: 20px; color: #a6a6a8;">{{ summary }}</span>
				<el-divider>
					<!-- <el-icon><star-filled /></el-icon> -->
					<span style="color: #b0b1b3; font-size: 18px;">正 文</span>
				</el-divider>
				<div v-html="detailsContent" class="content"></div>
				<div class="detailsBottonNavi">
					<div style="margin-left: 20px; display: flex; align-items: center;">
						<el-avatar style="height: 30px; width: auto;" src="https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"></el-avatar>
						<span style="margin-left: 8px; font-size: 16px; font-weight: 600;">藏宝阁的小师傅</span>
						<button style="margin-left: 10px; border-radius: 20px; border: 2px solid #e5e5e5; background-color: white; height: 30px; width: 60px;">关注</button>
					</div>
					<div style="margin-left: 50%; display: flex;">
						<div class="detailsBottonNavi-buttom" @click="likeDetail">
							<img :src="isLiked ? likedFill : likeFill"  alt="点赞" width="24" height="24">
							<span :style="{ color: isLiked ? '#FD9983' : '#C3C2CC', marginLeft: '8px' }">13</span>
						</div>
						<!-- <div class="detailsBottonNavi-buttom">
							<img src="@/assets/unlike-fill.svg" alt="图标" width="24" height="24">
						</div> -->
						<div class="detailsBottonNavi-buttom" @click="starDetail">
							<img :src="isStared ? staredFill : starFill" alt="收藏" width="24" height="24">
							<span :style="{ color: isStared ? '#FD9983' : '#C3C2CC', marginLeft: '8px' }">133</span>
						</div>
						<div class="detailsBottonNavi-buttom" @click="commentDetail">
							<img src="@/assets/message-fill.svg" alt="评论" width="24" height="24">
							<span style="color: #C3C2CC; margin-left: 8px;">{{comments.length}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="asideRight">
				<div class="asideBox">
					<div>
						<p class="asideTitle">更 多 功 能</p>
					</div>
					<a @click="exportToPDF" class="extraFuncButtom">
						<el-icon ><Link /></el-icon>
						<span>另存为PDF</span>
					</a>
					<a @click="exportToPDF" class="extraFuncButtom">
						<el-icon ><Link /></el-icon>
						<span>另存为PDF</span>
					</a>
					<a @click="exportToPDF" class="extraFuncButtom">
						<el-icon ><Link /></el-icon>
						<span>另存为PDF</span>
					</a>
				</div>
				<div class="asideBox">
					<p>侧边右盒子2</p>
				</div>
				<div class="asideBox">
					<p>侧边右盒子3</p>
				</div>
			</div>
		</div>
		<div class="comment-panel" :class="{ 'active': isCommentPanelOpen }">
			<div class="comment-header">
				<span>评论<span style="margin-left: 4px;">{{comments.length}}</span></span>
				<button class="close-btn" @click="isCommentPanelOpen ? isCommentPanelOpen=false : isCommentPanelOpen=true">&times;</button>
			</div>
			<div class="comment-content">
				<div class="comment-input-area">
					<textarea placeholder="写下你的评论..." v-model="newComment"></textarea>
					<div class="submit-comment">
						<button @click="submitComment">发布</button>
					</div>
				</div>
				<div class="comment-list" v-for="(comment, index) in comments" :key="index">
					<div>
						<img src="../../../public/favicon.png" style="height: 32px; width: 32px; padding: 10px 0;" />
					</div>
					<div class="comment-item">
						<div class="comment-user">{{ comment.user }}</div>
						<div class="comment-text">{{ comment.text }}</div>
						<div class="comment-time">{{ comment.time }}</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="overlay" class="overlay" :class="{ 'active': isCommentPanelOpen }" @click="commentDetail"></div>
	</div>
	
</template>

<script setup>
	import { ref, computed, onMounted, reactive } from 'vue'
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	import MarkdownIt from 'markdown-it'
	import { async } from '@kangc/v-md-editor';
	import { post } from '../../request';
	import Header from '../../views/Header.vue';
	import 'github-markdown-css';
	import { htmlToPDF } from '../../lib/utils/html2pdf';
	
	import likedFill from '../../assets/icons/liked-fill.svg';
	import likeFill from '../../assets/icons/like-fill.svg';
	import starFill from '../../assets/icons/star-fill.svg';
	import staredFill from '../../assets/icons/stared-fill.svg';
	
	// var md = new MarkdownIt();
	import highlightJs from 'highlight.js'; // 使用 ES 模块导入
	
	// top值范围[150,500]
	const danmakus = ref([
		{ text: '已经点赞收藏了', left: 0, top: 350, duration: 3 },
		{ text: '写的太好了！', left: 0, top: 300, duration: 5 },
		{ text: '有效果！', left: 0, top: 150, duration: 7 },
		{ text: '感谢博主', left: 0, top: 200, duration: 4 },
		{ text: '太棒了！', left: 0, top: 100, duration: 3 },
	]);
	
	const removeDanmaku = (index) => {
	  danmakus.value.splice(index, 1);
	}
	
	// 通常的默认值们
	const md = new MarkdownIt({
	  highlight: function (str, lang) {
	    if (lang && highlightJs.getLanguage(lang)) {
	      try {
	        return highlightJs.highlight(lang, str).value;
	      } catch (__) {}
	    }
	    return ''; // 使用额外的默认转义
	  }
	});
	var detailsContent = ref(md.render('')); //传入文本
	
	const route = useRoute()
	const detailsId = computed(() => route.params.id);
	
	const title = ref("");
	const summary = ref("");
	
	const getDetailsContent = async () => {
		// 获取文章信息
		const response = await post('/getDetailsContent', {
			"detailsId": detailsId.value
		})
		detailsContent.value = md.render(response.data.content);
		title.value = response.data.title;
		summary.value = response.data.summary;
		// console.log(response.data);
	}
	
	const exportToPDF = () => {
		// 隐藏div标签
		const elementToHide = document.querySelector('.detailsBottonNavi');
		if (elementToHide) {
			elementToHide.style.display = 'none';
		}
		// 导出为PDF
		htmlToPDF(title.value);
		// 在PDF生成后恢复显示该div标签
		if (elementToHide) {
		    elementToHide.style.display = '';
		}
	}
	
	// 获取文章信息
	// 获取点赞收藏状态
	const isLiked = ref(false);
	const isStared = ref(false);
	
	// 点赞功能
	const likeDetail = () => {
		isLiked.value ? isLiked.value = false : isLiked.value = true;
	}
	// 收藏功能
	const starDetail = () => {
		isStared.value ? isStared.value = false : isStared.value = true;
	}
	
	const isCommentPanelOpen = ref(false);
	const newComment = ref('')
	const comments = ref([
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户2', text: '这是另一条评论内容', time: '2023-01-02 13:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' },
		{ user: '用户1', text: '这是一条评论内容', time: '2023-01-01 12:00' }
	])
	
	const commentDetail = () => {
		isCommentPanelOpen.value = !isCommentPanelOpen.value;
		console.log("进入评论区");
	}
	
	const submitComment = () => {
		if (newComment.value.trim()) {
			comments.value.unshift({
				user: '当前用户',
				text: newComment.value,
				time: new Date().toLocaleString()
			})
			newComment.value = ''
			// 这里可以添加API调用来保存评论到服务器
		}
	}
	
	onMounted(() => {
		getDetailsContent();
	})
</script>

<style scoped>
	body {
		background-color: #F3F4F6;
	}
	.asideLeft {
		width: 300px;
		/* background-color: #F3F4F6; */
		margin-right: 10px;
		border-radius: 5px;
		margin-top: 20px;
	}
	.asideRight {
		width: 300px;
		/* background-color: #F3F4F6; */
		margin-left: 10px;
		border-radius: 5px;
		margin-top: 20px;
	}
	.asideBox {
		padding: 16px;
		background-color: white;
		border-radius: 5px;
		margin-bottom: 10px;
	}
	.details {
		position: relative;
		border-radius: 5px;
		margin-top: 20px;
		background-color: white;
		max-width: 1050px;
		padding: 26px;
	}
	.content {
		/* border: 1px solid black; */
		max-width: 1050px;
		background-color: white;
		min-height: 1000px;
	}
	.extraFuncButtom {
		display: flex;
		align-items: center;
		justify-content: center;
		color: black;
		text-decoration: none;
		margin-bottom: 10px;
		transition: color 0.3s ease;
	}
	.extraFuncButtom:hover {
		color: #68A88B;
		text-decoration: none;
		cursor: pointer;
	}
	
	.asideTitle {
		border-bottom: 3px solid #e5e5e5;
		display: flex;
		justify-content: center;
		padding-bottom: 10px;
		margin-top: 0;
		font-size: 20px;
		font-weight: 400;
	}
	.detailsBottonNavi {
		position: sticky;
		display: flex;
		align-items: center;
		bottom: 0; /* 贴在父元素底部 */
		left: 0; /* 从左侧开始 */
		width: 100%; /* 这里的 100% 是相对于 .details 的宽度，包括 padding */
		height: 50px;
		background-color: white;
		padding: 10px 0;
		/* text-align: center; */
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}
	.detailsBottonNavi-buttom {
		width: 80px;
		display: flex;
		align-items: center;
	}
	.detailsBottonNavi-buttom:hover {
		text-decoration: none;
		cursor: pointer;
	}
	/* .detailsBottonNavi-buttom:hover span {
	  color: #999999;
	}
	.detailsBottonNavi-buttom span {
		color: #C3C2CC;
	} */
	
	/* .asideLeft .asideRight {
	  font-size: 14px;
	} */
	@media (max-width: 1650px) {
		.details {
			max-width: 850px;
		}
	}
	@media (max-width: 1500px) {
		.details {
			max-width: 1050px;
		}
		.asideRight {
			display: none;
		}
	}
	@media (max-width: 1300px) {
		.details {
			max-width: 1050px;
		}
		.asideLeft {
			display: none;
		}
		.asideRight {
			display: none;
		}
	}
	.danmaku {
	  position: absolute;
	  white-space: nowrap;
	  color: black;
	  background-color: rgba(214, 214, 214, 0.7);
	  /* background-color: transparent; */
	  padding: 5px 10px;
	  border-radius: 5px;
	  z-index: 1000;
	}
	
	@keyframes danmakuMove {
	  from {
	    transform: translateX(80vw);
	  }
	  to {
	    transform: translateX(-100%);
	  }
	}
	@media print {
	    .details .detailsBottonNavi {
	          display: none; /* 在打印时隐藏该元素 */
	        }
	  }
	  

	
	.comment-panel {
		position: fixed;
		right: -480px;
		top: 0;
		width: 460px;
		height: 100%;
		background-color: white;
		box-shadow: -2px 0 10px rgba(0,0,0,0.1);
		transition: right 0.3s ease-in-out;
		z-index: 2001;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
	}
	::-webkit-scrollbar {
	  width: 8px;          /* 滚动条宽度 */
	  height: 8px;         /* 滚动条高度（垂直滚动时） */
	}
	
	.comment-panel.active {
		right: 0;
	}
	
	.comment-header {
		padding: 24px;
		border-bottom: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.close-btn {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: #666;
	}
	
	.comment-content {
		flex: 1;
		padding: 24px;
	}
	
	
	.comment-input-area {
		margin-bottom: 20px;
	}
	
	.comment-input-area textarea {
		width: 100%;
		height: 100px;
		padding: 10px 10px 0 10px;
		border-radius: 8px 8px 0 0; /* 依次是左上、右上、右下、左下 */
		resize: none;
		background-color: rgba(248,249,251,0.8);
		border: none;
		outline: none;
	}
	
	.submit-comment {
		/* width: 100%; */
		height: 32px;
		/* background-color: rgba(248,249,251,0.8); */
	}
	.submit-comment button {
		width: 60px;
		height: 24px;
		margin-left: auto;
		margin-right: 10px;
		padding: 0px 15px;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	
	.comment-list {
		margin-top: 20px;
		display: flex;
	}
	
	.comment-item {
		padding: 10px 0;
		border-bottom: 1px solid #eee;
		width: 100%;
	}
	
	.comment-user {
		font-weight: bold;
		margin-bottom: 5px;
	}
	
	.comment-text {
		margin-bottom: 5px;
	}
	
	.comment-time {
		font-size: 12px;
		color: #999;
	}
	
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(116, 116, 116, 0.5);
		display: none;
		z-index: 1999;
	}
	
	.overlay.active {
		display: block;
	}
	
	@media (max-width: 768px) {
		.comment-panel {
			width: 100%;
			right: -100%;
		}
	}
</style>