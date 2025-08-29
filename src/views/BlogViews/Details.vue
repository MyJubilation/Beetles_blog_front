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
					<div class="asideBox-userbox">
						<router-link class="el-avatar-userImg" :to="`/user/${userShortInfo.userId}`" target="_blank">
							<el-avatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
						</router-link>
						<div style="margin-left: 8px;">
							<router-link class="asideBox-userbox-username" :to="`/user/${userShortInfo.userId}`" target="_blank">{{ userShortInfo.userNickname }}</router-link>
							<div style="display: flex; margin-top: 8px;">
								<div class="asideBox-userbox-desc">
									入站时间:
									<span>
										{{ userShortInfo.createTime!=null ? userShortInfo.createTime : "--" }}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div class="asideBox-userinfobox">
						<div class="asideBox-userinfobox-item">
							<router-link :to="`/user/${userShortInfo.userId}`" target="_blank">
								<span class="asideBox-userinfobox-item-num">{{ userShortInfo.type }}</span>
								<span class="asideBox-userinfobox-item-name">原创</span>
							</router-link>
						</div>
						<div class="asideBox-userinfobox-item">
							<span class="asideBox-userinfobox-item-num">{{ userShortInfo.likes }}</span>
							<span class="asideBox-userinfobox-item-name">点赞</span>
						</div>
						<div class="asideBox-userinfobox-item">
							<span class="asideBox-userinfobox-item-num">{{ userShortInfo.stars }}</span>
							<span class="asideBox-userinfobox-item-name">收藏</span>
						</div>
						<div class="asideBox-userinfobox-item">
							<span class="asideBox-userinfobox-item-num">
								{{ userShortInfo.fans!=null ? userShortInfo.fans : "--" }}
							</span>
							<span class="asideBox-userinfobox-item-name">粉丝</span>
						</div>
					</div>
				</div>
				<div class="asideBox" style="padding: 0px;">
					<el-calendar>
					    <template #header="{ date }">
					      <span>{{ date }}</span>
					    </template>
					  </el-calendar>
				</div>
				<div class="asideBox">
					<p>侧边左盒子3</p>
				</div>
			</div>
			<!-- <div v-html="detailsContent" class="markdown-body" style="border-radius: 5px; padding: 10px;"></div> -->
			<div class="details">
				<h1 style="display: flex; justify-content: center;">{{ title }}</h1>
				<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
					<span>
						作者(昵称)：
						<span style="color: #999ABB; margin-left: 6px;">{{ author }}</span>
					</span>
				</div>
				<div style="display: flex; justify-content: center; align-items: center;">
					<el-icon size="20" style="margin-right: 10px;"><Clock /></el-icon>
					<span style="color: #999ABB;">
						于
						<span style="font-size: 14px;">
							{{ createTime }}
						</span>
						发布
					</span>
					<span v-if="updateTime!=createTime && updateTime!=null" style="color: #999ABB;margin-left: 20px;">
						于
						<span style="font-size: 14px;">
							{{ updateTime }}
						</span>
						修改
					</span>
					<el-icon size="20" style="margin-left: 40px; margin-right: 10px;"><View /></el-icon>
					<span style="color: #999ABB;">浏览量：<span style="font-size: 14px;">{{ view_count }}</span></span>
				</div>
				<el-divider>
					<!-- <el-icon><star-filled /></el-icon> -->
					<span style="color: #969698; font-size: 18px;">摘 要</span>
				</el-divider>
				<span style="font-size: 20px; color: #a6a6a8;">{{ summary }}</span>
				<el-divider>
					<!-- <el-icon><star-filled /></el-icon> -->
					<span style="color: #b0b1b3; font-size: 18px;">正 文</span>
				</el-divider>
				<!-- <div v-html="detailsContent" class="content"></div> -->
				<div class="content">
					<MarkdownReader
						:showToc="true"
						:detailsId= "route.params.id"
						title="我的Markdown文档"
					/>
				</div>
				<div class="detailsBottonNavi">
					<div style="margin-left: 20px; display: flex; align-items: center;">
						<el-avatar style="height: 30px; width: auto;" src="https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png"></el-avatar>
						<span style="margin-left: 8px; font-size: 16px; font-weight: 600;">{{ userShortInfo.userNickname }}</span>
						<button class="follow-button" @click="changeUserFollows()">
							<div v-if="!isFollowed">
								<span>关注</span>
							</div>
							<div v-else style="color: #999aaa; border-color: #555666;">
								已关注
							</div>
						</button>
					</div>
					<div style="margin-left: 50%; display: flex;">
						<div class="detailsBottonNavi-buttom" @click="likeDetail">
							<img :src="isLiked ? likedFill : likeFill"  alt="点赞" width="24" height="24">
							<span :style="{ color: isLiked ? '#FD9983' : '#C3C2CC', marginLeft: '8px' }">{{ likes }}</span>
						</div>
						<!-- <div class="detailsBottonNavi-buttom">
							<img src="@/assets/unlike-fill.svg" alt="图标" width="24" height="24">
						</div> -->
						<div class="detailsBottonNavi-buttom" @click="()=>{getStarFolderList(); starDialogVisible = true;}">
							<img :src="isStared ? staredFill : starFill" alt="收藏" width="24" height="24">
							<span :style="{ color: isStared ? '#FD9983' : '#C3C2CC', marginLeft: '8px' }">{{ stars }}</span>
						</div>
						<div class="detailsBottonNavi-buttom" @click="commentDetail">
							<img src="@/assets/message-fill.svg" alt="评论" width="24" height="24">
							<span style="color: #C3C2CC; margin-left: 8px;">{{comments.length}}</span>
						</div>
					</div>
				</div>
			</div>
			<el-dialog
			    v-model="starDialogVisible"
			    title="添加收藏夹"
			    width="600"
				style="height: 500px; padding: 20px;"
			  >
			  <div class="addNewStarFolderButton">
				  <span>新建收藏夹</span>
			  </div>
			  <div class="addNewStarFolder-box">
				  <div class="addNewStarFolder-box-item" v-for="item in folderList" @click="starDetail(item.id)">
					  <div>
							<div style="font-size: 14px; font-weight: 500; color: #555666; line-height: 20px;">
								{{ item.folderName }}
							</div>
							<div style="font-weight: 400; color: #999aaa; line-height: 17px; margin-top: 8px; ">
								{{ item.contentCount }}条内容
							</div>
					  </div>
					  <div style="border: 1px solid black; height: 30px; width: 60px; border-radius: 16px;
					              display: flex; align-items: center; justify-content: center;"
					              :style="{
					                color: folderId != item.id ? '#555666' : '#999aaa',
					                background: folderId != item.id ? '#fff' : 'rgba(232, 232, 237, 0.3)',
					                borderColor: folderId != item.id ? 'black' : '#e8e8ed'
					              }">
					    <span v-if="folderId !== item.id">收藏</span>
					    <span v-else>已收藏</span>
					  </div>
				  </div>
			  </div>
			</el-dialog>
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
					<textarea placeholder="写下你的评论..." v-model="newComment" style="font-size: 16px;"></textarea>
					<div class="submit-comment">
						<button @click="submitComment">发布</button>
					</div>
				</div>
				<div class="comment-list" v-for="(comment, index) in comments" :key="index">
					<div>
						<img src="../../../public/favicon.png" style="height: 32px; width: 32px; padding: 10px 0;" />
					</div>
					<div class="comment-item">
						<div class="comment-user">{{ comment.author }}</div>
						<div class="comment-text">{{ comment.comment }}</div>
						<div class="comment-time">{{ comment.createTime }}</div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="overlay" class="overlay" :class="{ 'active': isCommentPanelOpen }" @click="commentDetail"></div>
		
		
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
	import { ref, computed, onMounted, reactive } from 'vue'
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	import MarkdownIt from 'markdown-it'
	import { async } from '@kangc/v-md-editor';
	import { get, post } from '../../request';
	import Header from '../../views/Header.vue';
	import 'github-markdown-css';
	import { htmlToPDF } from '../../lib/utils/html2pdf';
	
	import likedFill from '../../assets/icons/liked-fill.svg';
	import likeFill from '../../assets/icons/like-fill.svg';
	import starFill from '../../assets/icons/star-fill.svg';
	import staredFill from '../../assets/icons/stared-fill.svg';
	
	// var md = new MarkdownIt();
	import highlightJs from 'highlight.js'; // 使用 ES 模块导入
	import { ElMessage } from 'element-plus';
	import { sleep } from '../../axios';
	import MarkdownReader from '../../lib/utils/MarkdownReader.vue';
		
	// top值范围[100,500]
	// 弹幕取评论的前10条进行滚动
	const danmakus = ref([
		// { text: '已经点赞收藏了', left: 0, top: 1000, duration: 3 },
		// { text: '写的太好了！', left: 0, top: 300, duration: 5 },
		// { text: '有效果！', left: 0, top: 150, duration: 7 },
		// { text: '感谢博主', left: 0, top: 200, duration: 4 },
		// { text: '太棒了！', left: 0, top: 100, duration: 10 },
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
	const commentsCount = ref(0);
	const likes = ref(0);
	const stars = ref(0);
	const createTime = ref();
	const updateTime = ref();
	const view_count = ref();
	const author = ref();
	const authorId = ref();
	const avatar = ref();
	
	const getDetailsContent = async () => {
		// 获取文章信息
		const response = await post('/getDetailsContent', {
			"detailsId": detailsId.value
		})
		detailsContent.value = md.render(response.data.content);
		title.value = response.data.title;
		summary.value = response.data.summary;
		likes.value = response.data.likes;
		stars.value = response.data.stars;
		createTime.value = response.data.createTime;
		updateTime.value = response.data.updateTime;
		view_count.value = response.data.view_count;
		author.value = response.data.author;
		authorId.value = response.data.user_id;
		avatar.value = response.data.avatar;
		console.log("getDetailsContent",response.data);
		// console.log(authorId.value);
		
		getUserShortInfo();
		checkIsFollowed();
		// getStarFolderList();
	}
	
	const userShortInfo = ref({
		avatar: '',
		userId: '',
		userNickname: '',
		
		views: 0,
		type: 0,
		createTime: '',
		likes: 0,
		comments: 0,
		stars: 0
	});
	
	const getUserShortInfo = async () => {
		console.log(authorId.value);
		const response = await post("/getUserShortInfo",{
			"userId": authorId.value
		});
		console.log("getUserShortInfo",response.data);
		userShortInfo.value = response.data;
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
	
	const starDialogVisible = ref(false);
	
	// 点赞功能
	const likeDetail = async () => {
		// 点赞功能
		const response = await post("/likeDetail", {
			"detailsId": detailsId.value,
			"userId": localStorage.getItem("userId")
		})
		// console.log(response);
		if(response.code == 200){
			isLiked.value ? likes.value-- : likes.value++;
			// 切换主题
			isLiked.value ? isLiked.value = false : isLiked.value = true;
		}else {
			ElMessage(response.msg);
		}
	}
	// 收藏功能
	const starDetail = async (folderId) => {
		const response = await post("/starDetail", {
			"detailsId": detailsId.value,
			"userId": localStorage.getItem("userId"),
			"folderId": folderId
		})
		console.log(response);
		if(response.code == 200){
			starDialogVisible.value = false;
			isStared.value ? stars.value-- : stars.value++;
			// 切换主题
			isStared.value ? isStared.value = false : isStared.value = true;
		}else {
			ElMessage(response.msg);
		}
	}
	
	const isCommentPanelOpen = ref(false);
	const newComment = ref('');
	const comments = ref([
		// author, authorId, avatar, content, createTime, id
		// { author: '清蒸甲壳虫', comment: '这是一条评论内容', createTime: '2023-01-01 12:00' },
		// { author: '清蒸甲壳虫', comment: '这是另一条评论内容', createTime: '2023-01-02 13:00' },
		// { author: '清蒸甲壳虫', comment: '这是一条评论内容', createTime: '2023-01-01 12:00' }
	]);
	
	const commentDetail = () => {
		isCommentPanelOpen.value = !isCommentPanelOpen.value;
		// getComments();
	}
	
	const getComments = async () => {
		// 获取评论列表
		const response = await post("/getCommentsList",{
			"detailsId": detailsId.value,
		});
		// console.log(response);
		if(response.code == 200){
			comments.value = response.data;
		}else {
			ElMessage(response.msg);
		}
	}
	
	const folderList = ref([
		// {"folderName": "默认收藏夹", "contentCount": 12, "id": "123"},
		// {"folderName": "学习", "contentCount": 2, "id": "123"}
	])
	
	const folderId = ref("");
	// 收藏夹列表获取
	const getStarFolderList = async () => {
		// 获取收藏夹列表
		const response = await post("/getStarFolderList",{
			"userId": localStorage.getItem("userId")
		});
		folderList.value = response.data;
		const response1 = await post("/getFolderId",{
			"detailsId": detailsId.value,
			"userId": localStorage.getItem("userId")
		});
		folderId.value = response1.data;
		
		// console.log(response.data);
	}
	
	const getCommentsDanmakus = async () => {
		// 获取弹幕数据
		// const danmakus = ref([{ text: '已经点赞收藏了', left: 0, top: 350, duration: 3 },]);
		const response = await post("/getCommentsDanmakus",{
			"detailsId": detailsId.value,
		});
		// console.log(response);
		if(response.code == 200){
			danmakus.value = response.data;
			// console.log(danmakus.value);
		}else {
			ElMessage(response.msg);
		}
	}
	
	const submitComment = async () => {
		if (newComment.value.trim()) { // 移除字符串两端的空白字符
			checkIsLogin();
			// 将评论保存到数据库
			// params: [ 文章id, 用户id, 用户评论内容 ]
			const response = await post("/addComment", {
				"detailsId": detailsId.value,
				"userId": localStorage.getItem("userId"),
				"comment": newComment.value
			})
			// console.log(response);
			if(response.code == 200){
				// 添加评论成功
				comments.value.unshift({ // 在队首添加评论信息
					author: localStorage.getItem("userNickname"),
					comment: newComment.value,
					createTime: new Date().toLocaleString()
				})
				newComment.value = ''
			}else {
				ElMessage(response.msg);
			}
		}else {
			ElMessage("请输入评论内容");
		}
	}
	
	const checkIsLogin = async () => {
		try{
			const response = await get('/checkIsLogin');
		} catch (error) {
			console.error('未登录:', error);
		}
	}
	
	const checkIslikeANDIsStar = async () => {
		// 查询是否点赞和收藏
		// 如果未登录，则不用查询
		if(localStorage.getItem("userId") != null){
			const response = await post("/checkIslikeANDIsStar",{
				"detailsId": detailsId.value,
				"userId": localStorage.getItem("userId")
			})
			if(response.code == 200){
				response.data.isLike == 1 ? isLiked.value = true : isLiked.value = false;
				response.data.isStar == 1 ? isStared.value = true : isStared.value = false;
			}else {
				ElMessage(response.msg);
			}
		}
	}
	
	const addHistory = async (type) => {
		// console.log("ENTER addHistory");
		// 查询用户是否登录
		if(localStorage.getItem("userId")!=null){
			// 新增历史记录
			const response = await post("/addHistory",{
				"userId": localStorage.getItem("userId"),
				"articleId": detailsId.value,
				"type": type
			})
			// console.log("response:",response.data.msg);
		}
	}
	
	// ------------------ 关注功能 ----------------------
	const isFollowed = ref(false);
	
	const checkIsFollowed = async () => {
		if(localStorage.getItem("userId") != null && authorId.value != localStorage.getItem("userId")){
			const response = await post("/checkIsFollowed",{
				"userId": authorId.value,
				"followerId": localStorage.getItem("userId")
			});
			console.log("checkIsFollowed:",response);
			if(response.data == "1"){
				// 已经关注，修改按钮文章，修改isFollowed值为true
				isFollowed.value = true;
			}
		}
		
	}
	
	const changeUserFollows = async () => {
		// 用户关注
		if(isFollowed.value){
			// 已经关注了，取消关注
			// 判断是否id都为同一人
			if(authorId.value == localStorage.getItem("userId")){
				ElMessage("不能关注自己");
			}else {
				const response = await post("/removeUserFollows", {
					"userId": authorId.value,
					"followerId": localStorage.getItem("userId")
				});
				if(response.code == 200){
					//  添加成功后的逻辑
					isFollowed.value = false;
					userShortInfo.value.fans--;
					ElMessage({
						message: response.msg,
						type: 'success',
					});
				}else {
					ElMessage(response.msg);
				}
			}
		}else {
			// userId:被关注的人id
			// followerId:关注的人id
			// 判断是否id都为同一人
			if(authorId.value == localStorage.getItem("userId")){
				ElMessage("不能关注自己");
			}else {
				const response = await post("/addUserFollows", {
					"userId": authorId.value,
					"followerId": localStorage.getItem("userId")
				});
				if(response.code == 200){
					//  添加成功后的逻辑
					isFollowed.value = true;
					userShortInfo.value.fans++;
					ElMessage({
						message: response.msg,
						type: 'success',
					});
				}else {
					ElMessage(response.msg);
				}
			}
		}
	}
	
	onMounted(() => {
		getDetailsContent();
		getComments();
		getCommentsDanmakus();
		checkIslikeANDIsStar();
		addHistory("details");
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
		width: 1050px;
		padding: 26px;
		margin-bottom: 24px;
	}
	.content {
		/* border: 1px solid black; */
		max-width: 100%;
		background-color: white;
		min-height: 950px;
		margin-bottom: 200px;
	}
	
	.follow-button {
		margin-left: 10px;
		border-radius: 20px;
		border: 2px solid #e5e5e5;
		background-color: white;
		height: 30px;
		width: 60px;
	}
	.follow-button:hover {
		cursor: pointer;
		border: 2px solid #9d9d9d;
	}
	
	/* 使用深度选择器来影响 v-html 内容 */
	::v-deep .content p img {
	  max-width: 1000px;
	  height: auto;
	  border-radius: 5px;
	  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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
	
	.asideBox-userbox {
		width: 100%;
		/* background-color: #68A88B; */
		/* border: 1px solid black; */
		height: 60px;
		display: flex;
	}
	.el-avatar-userImg:hover {
		cursor: pointer;
	}
	.asideBox-userbox-username {
		color: #222226;
		font-size: 18px;
		font-weight: 600;
		text-decoration: none;
	}
	.asideBox-userbox-username:hover {
		cursor: pointer;
	}
	.asideBox-userbox-desc {
		padding: 0 4px;
		display: inline-block;
		border-radius: 2px;
		background: #f5f6f7;
		color: #555666;
		font-size: 13px;
		font-style: normal;
		font-weight: 400;
	}
	.asideBox-userinfobox {
		display: flex;
		height: 76px;
		/* margin: 0 16px; */
		margin-top: 16px;
		border-radius: 2px;
		background: #fafafa;
		-webkit-box-align: center;
		align-items: center;
	}
	.asideBox-userinfobox-item {
		/* display: block; */
		color: #555666;
		-webkit-box-flex: 1;
		flex: 1;
		text-align: center;
	}
	.asideBox-userinfobox-item a {
		text-decoration: none;
	}
	.asideBox-userinfobox-item a:hover {
		cursor: pointer;
		text-decoration: none;
	}
	.asideBox-userinfobox-item-num {
		display: block;
		/* width: 60px; */
		color: #222226;
		font-size: 15px;
		font-weight: 500 !important;
	}
	.asideBox-userinfobox-item-name {
		display: block;
		/* width: 60px; */
		margin-top: 4px;
		color: #555666;
		font-size: 13px;
		font-weight: 400;
	}
	
	@media (max-width: 1650px) {
		.details {
			max-width: 850px;
		}
		::v-deep .content p img {
		  max-width: 800px;
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
		font-size: 16px;
		width: 100%;
		height: 100px;
		padding: 10px 10px 0 10px;
		border-radius: 8px 8px 8px 8px; /* 依次是左上、右上、右下、左下 */
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
	}
	
	/* 深度绑定日历样式 */
	::v-deep .el-calendar-table .el-calendar-day {
	  height: 40px;
	}
	
	@media (max-width: 768px) {
		.comment-panel {
			width: 100%;
			right: -100%;
		}
	}
	
	.addNewStarFolderButton {
		width: 520px;
		background-color: #FAFAFA;
		color: #555666;
		padding: 0 20px;
		height: 44px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		font-weight: 500;
		font-size: 15px;
		margin-top: 10px;
		margin-bottom: 30px;
	}
	.addNewStarFolderButton:hover {
		cursor: pointer;
		background-color: #F5F6F7;
	}
	.addNewStarFolder-box {
		color: #555666;
		font-size: 14px;
		font-weight: 400;
		/* padding: 0 20px 0; */
		/* margin: 24px 0; */
		height: 316px;
		overflow: auto;
		overscroll-behavior: contain;
	}
	.addNewStarFolder-box-item {
		/* width: 100%; */
		height: 62px;
		line-height: 62px;
		padding: 8px 12px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #f0f0f5;
		border-radius: 8px;
		transition: background-color 0.2s ease;
	}
	.addNewStarFolder-box-item:hover {
		background-color: #F5F6F7;
	}
</style>