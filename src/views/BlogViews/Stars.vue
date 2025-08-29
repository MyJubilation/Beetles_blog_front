<template>
	<div style="width: 1700px;">
		<div style="display: flex; width: 100%;">
			<div class="folder">
				<div class="folder-title">
					<span style="color: #1a1a1a; font-size: 18px; font-weight: 600; line-height: 25px;">我创建的收藏夹</span>
					<div class="addNewStarFolder" @click="()=>{addNewStarFolderVisible = true;}">
						<el-icon><Plus /></el-icon>
						新建收藏夹
					</div>
				</div>
				<el-dialog
				    v-model="addNewStarFolderVisible"
				    title="新建收藏夹"
				    width="500"
					style="height: 400px; padding: 20px; border-radius: 20px;"
				  >
					<div style="font-weight: 500; color: #1a1a1a; margin-top: 20px;">
						<span>收藏夹名称</span>
					</div>
					<el-input v-model="addNewStarFolderInputName" style="width: 100%; padding: 0; margin-top: 10px;" placeholder="请填写收藏夹名称" />
					<div style="font-weight: 500; color: #1a1a1a; margin-top: 10px;">
						<span>收藏夹简介（选填）</span>
					</div>
					<el-input
						v-model="addNewStarFolderInputSummary"
						style="width: 100%; padding: 0; margin-top: 10px;"
						:rows="2"
						type="textarea"
						placeholder="请输入描述内容"
						/>
					<div style="font-weight: 500; color: #1a1a1a; margin-top: 10px;">
						<span>设置可见范围</span>
					</div>
					<el-radio-group 
					  v-model="addNewStarFolderInputIsVisible"
					  text-color="#68A88B"
					  fill="#68A88B">
						<el-radio value="0" size="large">私密</el-radio>
						<el-radio value="1" size="large">公开</el-radio>
					</el-radio-group>
					<div class="addNewStarFolderButton" @click="addNewStarFolder()">新建</div>
				</el-dialog>
				<div class="folder-content" v-for="(item, index) in folderList" :key="index">
				    <div class="folder-content-item"
				         :class="{ 'active': activeIndex === index }"
				         @click="getStarFolderContents(item, index)">
				        <div class="folder-content-item-foldername">{{ item.folderName }}</div>
				        <div class="folder-content-item-foldercount">
				            <span>内容数：{{ item.contentCount }}</span>
				        </div>
				    </div>
				</div>
			</div>
			<div class="foldercontent-box">
				<div class="foldercontent-box-title-box">
					<div class="foldercontent-box-title-box-title-name">
						<div style="display: flex; align-items: center;" v-if="!folderNameEditVisible">
							<span>{{ folderContent?.folderInfo.folderName }}</span>
							<el-icon class="editButton" @click="editFolderInfo('folderName')"
								v-if="folderContent?.folderInfo.folderName !='默认收藏夹'"><EditPen /></el-icon>
						</div>
						<div v-else>
							<el-input v-model="editInput" style="width: 240px;height: 30px;color: #222226;" show-word-limit maxlength="10" placeholder="请输入..." />
							<el-button style="height: 30px; margin-left: 10px; border-radius: 10px;" color="#58C9B9"
								@click="changeStarFolderInfo('folderName')">
								<el-icon><Check /></el-icon>
							</el-button>
							<el-button style="height: 30px; margin-left: 4px; border-radius: 10px; border: 1px solid #969698;" 
								color="white" @click="()=>{folderNameEditVisible=false;editInput = ''}">
								<el-icon><Close /></el-icon>
							</el-button>
						</div>
					</div>
					<div class="foldercontent-box-title-box-title-summary">
						<div style="width: 1280px;">
							<div style="display: flex; align-items: center;" v-if="!folderSummaryEditVisible">
								<span v-if="folderContent?.folderInfo.summary!=null">{{ folderContent?.folderInfo.summary }}</span>
								<span v-else style="color: #969698;">还没有填写描述哦</span>
								<el-icon class="editButton" @click="editFolderInfo('folderSummary')"><EditPen /></el-icon>
								<div style="display: flex; margin-left: auto; color: #666;">
									<div class="foldercontent-box-title-box-topNaviButton">删除</div>
								</div>
							</div>
							<div v-else>
								<el-input v-model="editInput" style="width: 240px;height: 30px;color: #222226;" show-word-limit maxlength="30" placeholder="请输入..." />
								<el-button style="height: 30px; margin-left: 10px; border-radius: 10px;" color="#58C9B9"
									@click="changeStarFolderInfo('folderSummary')">
									<el-icon><Check /></el-icon>
								</el-button>
								<el-button style="height: 30px; margin-left: 4px; border-radius: 10px; border: 1px solid #969698;" 
									color="white" @click="()=>{folderSummaryEditVisible=false;editInput = ''}">
									<el-icon><Close /></el-icon>
								</el-button>
							</div>
						</div>
					</div>
				</div>
				<div class="foldercontent-box-list-box">
					<div v-if="folderContent?.list!=''">
						<el-scrollbar height="740px">
							<div class="foldercontent-box-list-box-list-item" v-for="item in folderContent?.list">
								<div>
									<router-link :to="`/article/details/${item.articleId}`" style="text-decoration: none;" target="_blank">
										<div class="foldercontent-box-list-box-list-con">
											<div style="width: 89%; height: 58px; font-size: 14px !important; white-space: nowrap;
												text-overflow: ellipsis; overflow: hidden;">
												<em class="starType">Blog</em>
												<span class="subtitle">{{item.title}}</span>
											</div>
										</div>
									</router-link>
								</div>
							</div>
						</el-scrollbar>
						<div class="foldercontent-box-list-box-pageNavi">
							<el-pagination
								 v-model:current-page="currentPage"
								 :page-size="pageSize"
								 layout="total, prev, pager, next"
								 :total="totalDetailsSize"
								 :pager-count="10"
								 @current-change="getStarFolderContents(folderList[activeIndex], activeIndex)"
							   />
						</div>
					</div>
					<div v-else class="foldercontent-box-list-box" style="height: 770px;">
						<div style="border-radius: 8px; background: #f9f9f9; padding: 30px; height: 400px;
							display: flex; align-items: center; justify-content: center; flex-direction: column;">
							<div style="color: #1a1a1a; text-overflow: ellipsis; font-size: 16px; font-weight: 400;">
								此文件夹暂时没有收藏
							</div>
							<router-link :to="`/homepage/main`" class="toHomePageButton">
								去Beelog主页
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, reactive } from 'vue';
	import Header from '../../views/Header.vue';
	import { post, get } from '../../request';
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	import { async } from '@kangc/v-md-editor';
import { ElMessage } from 'element-plus';
	
	const route = useRoute()
	const userId = computed(() => route.params.id);
	
	const folderList = ref([
		// {"folderName": "默认收藏夹", "contentCount": 12, "id": "123"},
		// {"folderName": "学习", "contentCount": 2, "id": "123"}
	])
	
	// {
	// 	folderInfo:{summary: xx,id: xx,folderName: xx},
	// 	list:[
	// 		{articleId: xx, id: xx, folderName: xx, title: xx}
	// 	]
	// }
	const folderContent = ref();
	
	// 跟踪当前选中的收藏夹
	const activeIndex = ref(0);
	
	const currentPage = ref(1);
	const pageSize = ref(10);
	const totalDetailsSize = ref(0);
	
	const folderNameEditVisible = ref(false);
	const folderSummaryEditVisible = ref(false);
	
	const editInput = ref();
	
	const editFolderInfo = (type) => {
		if(type == "folderName"){
			editInput.value = folderContent.value.folderInfo.folderName;
			folderNameEditVisible.value = true;
		}else if(type == "folderSummary"){
			editInput.value = folderContent.value.folderInfo.summary;
			folderSummaryEditVisible.value = true;
		}
	}
	const changeStarFolderInfo = async (type) => {
		if(editInput.value == "默认收藏夹" && type == "folderName"){
			ElMessage('该修改内容有误，不能为"默认收藏夹"，请修改后重新提交');
		}else {
			const response = await post("/changeStarFolderInfo",{
				"type": type,
				"value": editInput.value,
				"id": folderContent.value.folderInfo.id
			});
			console.log(response);
			if(type == "folderName"){
				folderNameEditVisible.value = false;
			}else if(type == "folderSummary"){
				folderSummaryEditVisible.value = false;
			}
			getStarFolderList();
		}
	}
	
	const addNewStarFolderVisible = ref(false);
	const addNewStarFolderInputName = ref();
	const addNewStarFolderInputSummary = ref();
	const addNewStarFolderInputIsVisible = ref('0');
	
	const addNewStarFolder = async () => {
		// console.log("userId: ",localStorage.getItem("userId")," | folderName: ",addNewStarFolderInputName.value,
		// " | summary: ",addNewStarFolderInputSummary.value," | isVisible",addNewStarFolderInputIsVisible.value);
		// 发送请求
		const response = await post("/addNewStarFolder",{
			"userId": localStorage.getItem("userId"),
			"folderName": addNewStarFolderInputName.value,
			"summary": addNewStarFolderInputSummary.value,
			"isVisible": addNewStarFolderInputIsVisible.value
		})
		console.log(response);
		if(response.code == 200){
			addNewStarFolderInputName.value = '';
			addNewStarFolderInputSummary.value = '';
			addNewStarFolderInputIsVisible.value = '0';
			addNewStarFolderVisible.value = false;
			ElMessage.success("创建成功");
			// 查询收藏夹列表
			getStarFolderList();
		}else {
			ElMessage(response.msg);
		}
	}
	
	// 收藏夹列表获取
	const getStarFolderList = async () => {
		// 获取收藏夹列表
		const response = await post("/getStarFolderList",{
			"userId": localStorage.getItem("userId")
		});
		folderList.value = response.data;
		
		// console.log(response.data);
		// 获取收藏夹对应内容
		getStarFolderContents(folderList.value[activeIndex.value], activeIndex.value)
	}
	
	// 处理收藏夹点击事件
	const getStarFolderContents = async (folder, index) => {
		// 设置当前点击的收藏夹为active状态
		activeIndex.value = index;
		totalDetailsSize.value = folder.contentCount;
		
		const response = await post("/getStarFolderContents",{
			"folderId": folder.id,
			"userId": localStorage.getItem("userId"),
			"pageSize": pageSize.value,
			"currentPage": currentPage.value
		});
		
		folderContent.value = response.data;
		console.log(folderContent.value);
	}
	
	
	
	onMounted(() => {
		// getStarFolderContents();
		getStarFolderList();
	})
	
</script>

<style scoped>
	.folder {
		width: 400px;
		border-radius: 8px;
		background-color: #F3F5F8;
		height: 900px;
		align-self: center;
		/* padding: 16px 0; */
		transition: all .2s ease;

		position: relative;
		display: flex;
		flex-direction: column;
	}
	.folder-title {
		padding: 16px 24px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.folder-content {
		/* flex: 1; */
		overflow: hidden;
		
		padding: 0 24px;
	}
	.folder-content-item {
		padding: 16px;
		background: #fff;
		
		cursor: pointer;
		margin-bottom: 8px;
		border-radius: 8px;
		border: 1px solid transparent;
		transition: all .2s;
	}
	.folder-content-item.active {
		background-color: #d7ffed;/* #E5F1FF */
		border: 1px solid #9bffd2;/* #afd5ff */
	}
	.folder-content-item:hover {
		background-color: #d7ffed;
		border: 1px solid #9bffd2;
	}
	.folder-content-item-foldername {
		overflow: hidden;
		color: #1a1a1a;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		font-weight: 600;
		line-height: 20px;
	}
	.folder-content-item-foldercount {
		margin-top: 8px;
	}
	.folder-content-item-foldercount span {
		overflow: hidden;
		color: #999;
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		margin-right: 8px;
	}
	.foldercontent-box {
		margin-left: 24px;
		flex-direction: column;
		width: 1300px;
		min-width: 400px;
	}
	.foldercontent-box-title-box {
		overflow: hidden;
		flex-shrink: 0;
		margin-top: 16px;
		border-bottom: 1px solid #E8E8ED;
	}
	.foldercontent-box-title-box-title-name {
		align-items: center;
		
	}
	.foldercontent-box-title-box-title-name span {
		max-width: 60%;
		line-height: 32px;
		color: #1a1a1a;
		font-size: 18px;
		font-weight: 600;
		white-space: nowrap;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.foldercontent-box-title-box-title-summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
		line-height: 32px;
		height: 32px;
	}
	.foldercontent-box-title-box-title-summary div span {
		overflow: hidden;
		color: #999aaa;
		text-align: justify;
		text-overflow: ellipsis;
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
	}
	
	.foldercontent-box-list-box {
		padding: 16px 0;
		/* height: 800px; */
	}
	.foldercontent-box-list-box-list {
		overflow-y: auto;
	}
	.foldercontent-box-list-box-list-item {
		padding: 0;
		position: relative;
		margin-top: 0;
		background: #fff;
		border: 1px solid #E5E5E5;
		margin-bottom: 16px;
		border-radius: 8px;
		height: 60px;
		overflow: hidden;
		line-height: 58px;
		transition: all .15s;
		/* cursor: grab; */
		cursor: pointer;
	}
	.foldercontent-box-list-box-list-con {
		padding: 0 16px;
		background: #fff;
		display: flex;
		align-items: center;
		font-size: 14px;
		justify-content: space-between;
		line-height: 58px;
		transition: all .15s;
	}
	.starType {
		height: 20px;
		padding: 0 5px;
		border: 1px solid #d5d5d5;
		background-color: #fff;
		color: #999;
		font-size: 12px;
		vertical-align: top;
		font-weight: 400 !important;
		border-radius: 4px;
		font-style: normal;
		line-height: 58px;
	}
	.subtitle {
		margin-left: 16px;
		padding: 6px 0;
		display: inline;
		cursor: pointer;
		color: #1a1a1a;
		text-overflow: ellipsis;
		font-family: PingFang SC;
		font-size: 18px;
		font-weight: 400;
	}
	.subtitle:hover {
		color: #68A88B;
	}
	.foldercontent-box-list-box-pageNavi {
		margin-top: 30px;
	}
	
	.editButton {
		margin-left: 10px;
		cursor: pointer;
	}
	.addNewStarFolder {
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.addNewStarFolderButton {
		cursor: pointer;
		background-color: #68A88B;
		height: 46px;
		width: 66px;
		border-radius: 10px;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: auto;
		margin-top: 10px;
	}
	.addNewStarFolderButton:hover {
		background-color: #5c967b;
	}
	.toHomePageButton {
		display: block;
		border-radius: 8px;
		background: #68A88B;
		color: #fff;
		text-align: center;
		font-size: 16px;
		font-weight: 400;
		margin-top: 24px;
		padding: 0 16px;
		height: 40px;
		line-height: 40px;
		text-decoration: none;
	}
	.toHomePageButton:hover {
		background: #5d967b;
	}
	.foldercontent-box-title-box-topNaviButton {
		cursor: pointer;
		font-style: normal;
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 14px;
		font-weight: 400;
		line-height: 20px;
		margin-left: 32px;
	}
	.foldercontent-box-title-box-topNaviButton:hover {
		color: #000;
	}
</style>