<template>
	<div style="background-color: #F3F4F6;">
		<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
		<div style="margin-top: 64px; display: flex; width: 97vw; justify-content: center; min-height: 1800px; padding-bottom: 32px;">
			<div style="width: 1300px;">
				<div class="UserInfo">
					<div style="height: 100px; display: flex;">
						<div style="height: 100%; width: 120px; display: flex; justify-content: center; pointer-events: none;">
							<el-avatar
								:size="100"
								src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
							  />
						</div>
						<div style="height: 100%; width: 1000px; margin-left: 10px;">
							<div style="margin-top: 26px; display: flex;">
								<span style="font-size: 22px;font-weight: 500;line-height: 24px;color: #222226;">
									{{ userShortInfo.userNickname }}
								</span>
								<div style="position: relative; font-size: 0; float: right; display: flex; margin-right: auto;">
									<button class="userInfo-addStarButton" @click="changeUserFollows()">
										<div style="display: flex;" v-if="!isFollowed">
											<div>
												<img style="width: 16px;height: 16px;margin-right: 4px; margin-top: 6px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAADiNXWtAAAATUlEQVRIDWNgIBGEhqX9B2FitTERq5BcdaMWEAy50SAaAUHECPMjKbkTpocYmuapiBhHoKgZLYtQgoMaHJpH8qgFBKNp6AcRQS8OegUANucKeNlfARMAAAAASUVORK5CYII=" />
											</div>
											<span style="margin-top: 1px;">关注</span>
										</div>
										<div v-else style="color: #999aaa; border-color: #555666;">
											已关注
										</div>
									</button>
								</div>
							</div>
							<div style="margin-top: 10px;">
								<span class="userinfo-hanzi">
									<span class="userinfo-number">
										{{ userShortInfo.views!=null ? userShortInfo.views : "--" }}
									</span>
									总访问量
								</span>
								<el-divider direction="vertical" />
								<span class="userinfo-hanzi">
									<span class="userinfo-number">
										{{ userShortInfo.type!=null ? userShortInfo.type : "--" }}
									</span>
									原创
								</span>
								<el-divider direction="vertical" />
								<!-- <span class="userinfo-hanzi"><span class="userinfo-number">7,932</span>排名</span>
								<el-divider direction="vertical" /> -->
								<span class="userinfo-hanzi">
									<span class="userinfo-number">
										{{ userShortInfo.fans!=null ? userShortInfo.fans : "--" }}
									</span>
									粉丝
								</span>
								<el-divider direction="vertical" />
								<span class="userinfo-hanzi">
									<span class="userinfo-number">
										{{ userShortInfo.follows!=null ? userShortInfo.follows : "--" }}
									</span>
									关注
								</span>
							</div>
						</div>
					</div>
					<div style="height: 50px;">
						<div style="padding-left: 130px;">
							<span class="userinfo-hanzi" style="margin-right: 32px;">IP属地：<span>{{ IPTextValue }}</span></span>
							<span class="userinfo-hanzi">加入Beelog时间：<span>{{ userShortInfo.createTime }}</span></span>
						</div>
					</div>
				</div>
				<div style="display: flex; margin-top: 10px;">
					<div class="navi-box">
						<div class="navi-item">
							<div style="font-size: 16px; font-weight: 500; line-height: 48px; border-bottom: 1px solid #e8e8ed;
								color: #222226; padding-left: 16px; display: flex; align-items: center;">
								个人成就
							</div>
							<div style="padding: 16px;">
								<div style="display: flex; align-items: center; margin-bottom: 12px;">
									<img :src="like"  alt="点赞" width="22" height="22" style="margin-right: 10px;">
									<div style="color: #555666;">获得<span style="font-size: 20px; color: #222226; font-weight: 500;">&nbsp;{{ userShortInfo.likes }}&nbsp;</span>次点赞</div>
								</div>
								<div style="display: flex; align-items: center; margin-bottom: 12px;">
									<img :src="comment"  alt="评论" width="22" height="22" style="margin-right: 10px;">
									<div style="color: #555666;">内容获得<span style="font-size: 20px; color: #222226; font-weight: 500;">&nbsp;{{ userShortInfo.comments }}&nbsp;</span>次评论</div>
								</div>
								<div style="display: flex; align-items: center; margin-bottom: 12px;">
									<img :src="star"  alt="收藏" width="22" height="22" style="margin-right: 10px;">
									<div style="color: #555666;">获得<span style="font-size: 20px; color: #222226; font-weight: 500;">&nbsp;{{ userShortInfo.stars }}&nbsp;</span>次收藏</div>
								</div>
							</div>
						</div>
					</div>
					<div class="article-box">
						<div class="topNaviList">
							<div 
							    class="topNaviList-item" 
							    :class="{ 'selected': activeTab === '文章' }"
							    @click="switchTab('文章')"
							  >
							    文章
							  </div>
							  <!-- <div 
							    class="topNaviList-item" 
							    :class="{ 'selected': activeTab === '评论' }"
							    @click="switchTab('评论')"
							  >
							    评论
							  </div> -->
						</div>
						<div class="article-content-box">
							<router-link :to="`/article/details/${item.id}`" target="_blank" class="article-content-item" v-for="item in detailsList">
								<img src="../../assets/LOGO.png" class="article-content-item-img" />
								<div>
									<div>
										<div class="article-content-item-title">{{ item.title }}</div>
										<div class="article-content-item-summary">
											{{ item.summary }}
										</div>
									</div>
									<div class="article-content-item-buttonInfo">
										<div style="color: #e33e33;background: rgba(227, 62, 51, .1);
											font-size: 12px;width: 34px;text-align: center;line-height: 20px;border-radius: 2px;
											margin-right: 8px;">{{ item.type==1 ? "原创" : "转载" }}</div>
										<div class="article-content-item-buttonInfo-content">发布博客于：&nbsp;2025.08.15&nbsp;·</div>
										<div class="article-content-item-buttonInfo-content">{{ item.views }}&nbsp;阅读&nbsp;·</div>
										<div class="article-content-item-buttonInfo-content">{{ item.likes }}&nbsp;点赞&nbsp;·</div>
										<div class="article-content-item-buttonInfo-content">{{ item.comments }}&nbsp;评论&nbsp;·</div>
										<div class="article-content-item-buttonInfo-content">{{ item.stars }}&nbsp;收藏&nbsp;</div>
									</div>
								</div>
							</router-link>
						</div>
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
	import { ref, computed, onMounted } from 'vue'
	import Header from '../../views/Header.vue';
	import { get, post } from '../../../src/request.js';
	import { ElMessage } from 'element-plus'
	import router from '../../router';
	import { sleep } from '../../axios';
	import { useRoute, onBeforeRouteUpdate } from 'vue-router';
	import like from '../../assets/icons/User/Likes.svg';
	import comment from '../../assets/icons/User/Comments.svg';
	import star from '../../assets/icons/User/Stars.svg';
	
	const route = useRoute()
	const userId = computed(() => route.params.id);
	
	const IPInfo = ref();
	const IPTextValue = ref("未知");
	
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
	
	const getUserInfo = async () => {
		getUserLocation();
		// 获取: 总访问量 原创 粉丝 关注 || 点赞 评论 收藏
		const response = await post("/getUserShortInfo",{
			"userId": userId.value
		});
		userShortInfo.value = response.data;
		// console.log(userShortInfo.value);
	}
	
	const getUserLocation = async () => {
	  try {
		// 使用ipapi.co直接获取完整信息
		const response = await fetch('https://ipapi.co/json/');
		IPInfo.value = await response.json();
		if(IPInfo.value.country_name == "China"){
			console.log(IPInfo.value.city);
			console.log(IPInfo.value.region);
			IPTextValue.value = IPInfo.value.city + "-" + IPInfo.value.region;
		}else {
			IPTextValue.value = IPInfo.value.country;
		}
		
		console.log('用户IP属地信息:', {
		  ip: IPInfo.value.ip,
		  country_name: IPInfo.value.country_name,
		  region: IPInfo.value.region,
		  city: IPInfo.value.city,
		  latitude: IPInfo.value.latitude,
		  longitude: IPInfo.value.longitude,
		  country: IPInfo.value.country
		});
		console.log(IPTextValue.value);
		// city: "Chengdu"
		// country: "China"
		// ip: "117.139.220.233"
		// latitude: 30.6667
		// longitude: 104.0667
		// region: "Sichuan"
	  } catch (error) {
		console.error('获取IP属地失败:', error);
	  }
	}
	
	const detailsList = ref([]);
	
	const getUserDetailsInfo = async (type) => {
		const response = await post("/getUserDetailsInfoList",{
			"authorId": userId.value,
			"userId": localStorage.getItem("userId"),
			"type": "details"
		})
		// params:[details_id, cover_img, title, summary, type(是否原创), create_time, views, likes, comments, stars, visibility(访问权限)]
		console.log(response);
		detailsList.value = response.data;
	}
	
	
	const activeTab = ref('文章'); // 默认选中"文章"标签
	
	const switchTab = (tabName) => {
	  activeTab.value = tabName;
	}
	
	// ------------------ 关注功能 ----------------------
	const isFollowed = ref(false);
	
	const checkIsFollowed = async () => {
		if(localStorage.getItem("userId") != null && userId.value != localStorage.getItem("userId")){
			const response = await post("/checkIsFollowed",{
				"userId": userId.value,
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
			if(userId.value == localStorage.getItem("userId")){
				ElMessage("不能关注自己");
			}else {
				const response = await post("/removeUserFollows", {
					"userId": userId.value,
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
			if(userId.value == localStorage.getItem("userId")){
				ElMessage("不能关注自己");
			}else {
				const response = await post("/addUserFollows", {
					"userId": userId.value,
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
	// ------------------ 关注功能 ----------------------
	
	
	onMounted(() => {
		getUserInfo();
		getUserDetailsInfo("details");
		checkIsFollowed();
	})
</script>

<style scoped>
	a {
		text-decoration: none;
	}
	
	.UserInfo {
		width: 1260px;
		height: 150px;
		margin-top: 10px;
		background-color: white;
		padding: 20px;
	}
	.navi-box {
		width: 350px;
		margin-right: 10px;
		
		height: 1000px;
	}
	.article-box {
		width: 940px;
		background-color: white;
		
		min-height: 1000px;
	}
	
	.article-content-item {
		margin: 0 24px;
		padding: 24px 0;
		display: flex;
		border-bottom: 1px solid #f0f0f2;
	}
	.article-content-item:hover {
		cursor: pointer;
	}
	.article-content-item-img {
		width: 178px;
		height: 100px;
		border: 1px solid #f5f6f7;
		border-radius: 2px;
		object-fit: cover;
		display: block;
		margin-right: 16px;
		position: relative;
	}
	.article-content-item-title {
		font-size: 18px;
		font-weight: 500;
		line-height: 24px;
		color: #222226;
		overflow: hidden;
		white-space: normal;
		word-break: break-word;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
	.article-content-item-title:hover {
		color: #fc5531;
	}
	.article-content-item-summary {
		width: 716px;
		color: #555666;
		margin-top: 4px;
		line-height: 19px;
		overflow: hidden;
		white-space: normal;
		word-break: break-word;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.article-content-item-buttonInfo {
		margin-top: 12px;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}
	.article-content-item-buttonInfo-content {
		color: #555666;
		line-height: 20px;
		font-size: 14px;
		margin-right: 8px;
	}
	
	.topNaviList {
		width: 100%;
		height: 48px;
		line-height: 48px;
		background: #fff;
		box-shadow: 0 1px 0 0 #e8e8ed;
		border-radius: 2px 2px 0 0;
		display: flex;
		align-items: center;
		ransform: translateZ(0);
	}
	
	.navi-item {
		background-color: white;
	}
	
	.topNaviList-item {
	    font-size: 16px;
	    color: #555666;
	    padding: 0 16px;
	    cursor: pointer;
	    text-align: center;
	    align-items: center;
	    position: relative;
	    float: left;
	    transition: all 0.3s ease; /* 添加过渡效果使阴影变化更平滑 */
	}
	
	.topNaviList-item:hover {
	    color: #222226;
	}
	
	.topNaviList-item::after {
	  content: '';
	  position: absolute;
	  bottom: 0;
	  left: 50%;
	  transform: translateX(-50%);
	  width: 0;
	  height: 2px;
	  background-color: #222226;
	  transition: width 0.3s ease; /* 添加过渡效果 */
	}
	.topNaviList-item.selected {
	  color: #222226;
	  font-weight: 500;
	}
	.topNaviList-item.selected::after {
	  content: '';
	  position: absolute;
	  bottom: 0;
	  /* left: 35%; */
	  width: 30%;
	  height: 2px;
	  background-color: #222226;
	}
	
	.userInfo-addStarButton {
		border: 1px solid #ccccd8;
		color: #555666;
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		font-size: 16px;
		width: 96px;
		text-align: center;
		height: 32px;
		border-radius: 20px;
		margin-left: 16px;
		text-decoration: none;
		background-color: white;
	}
	.userInfo-addStarButton:hover {
		border: 1px solid #4a4a4f;
		cursor: pointer;
	}
	.userinfo-hanzi {
		font-size: 14px;
		line-height: 16px;
		margin-top: 2px;
		white-space: nowrap;
		color: #555666;
	}
	.userinfo-number {
		font-weight: 600;
		font-size: 20px;
		line-height: 24px;
		margin-right: 4px;
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
	
	/* @media (max-width: 768px) {
		.comment-panel {
			width: 100%;
			right: -100%;
		}
	} */
</style>