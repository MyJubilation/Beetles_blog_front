<template>
	<!-- <Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header> -->
	<div style="height: 64px; display: flex;">
		<router-link class="logo" :to="{path:'/'}">
			<img src="@/assets/LOGO.png" style="height: 40px;" />
			<p class="logoText">Beetles</p>
		</router-link>
	</div>
	<div style="display: flex; width: 100vw;height: 87vh;">
		<div class="mainCss">
			<div id="vditor" />
			<!-- <button @click="test">测试</button> -->
		</div>
	</div>
	<div style="width: 100vw; height: 50px; display: flex;">
		<router-link :to="{ path:'/' }" style="margin-left: 20px; margin-top: 13px;" class="footerButtom">
			<span>返回首页</span>
		</router-link>
		<button class="footerButtom" style="margin-left: auto;">保存草稿</button>
		<button class="footerButtom" @click="openSendDialog">发布文章</button>
	</div>
	<el-dialog
	    v-model="isSendDialogOpen"
	    title="发布文章"
	    width="800"
		style="height: 640px;"
	  >
	    <div style="height: 460px; padding: 20px;">
			<div class="sendDetailsScroll">
				<el-tooltip
				        effect="dark"
				        content="格式可为:【文章主题】文章标题内容"
				        placement="left"
				      >
				        	<span style="font-size: 16px;">文章标题<span style="color: red;">*</span><el-icon><Warning /></el-icon></span>
				      </el-tooltip>
				<el-input v-model="detailsInfo.title" style="width: 600px; margin-left: 12px;" placeholder="文章标题字数不可多于40字" maxlength="40" />
			</div>
			<div class="sendDetailsScroll">
				<el-tooltip
				        effect="dark"
				        content="标签最多可选6个"
				        placement="left"
				      >
							<span style="font-size: 16px;">文章标签<el-icon><Warning /></el-icon></span>
				      </el-tooltip>
				<!-- <el-input-tag
				    v-model="detailsInfo.tags"
				    placeholder="支持不多于10个标签"
				    aria-label="Please click the Enter key after input"
					style="width: 600px; margin-left: 20px;"
					max="10"
					draggable
				  /> -->
				<button class="addTagsButtom" @click="()=>{isAddTagsDialogOpen?isAddTagsDialogOpen=false:isAddTagsDialogOpen=true}">
					<el-icon><Plus /></el-icon>
					<span style="margin-left: 4px;">添加文章标签</span>
				</button>
				<el-dialog
				    v-model="isAddTagsDialogOpen"
				    title="标签"
				    width="600"
					style="height: 540px;"
				  >
				    <div style="height: 360px; padding: 10px;">
						<div style="display: flex;">
							<el-select
							        v-model="tagsInputValue"
							        multiple
							        filterable
							        remote
							        reserve-keyword
							        placeholder="请输入文字进行搜索"
							        :remote-method="selectTags"
							        :loading="loading"
							        style="width: 100%;"
									clearable
							      >
							        <el-option
							          v-for="item in options"
							          :key="item.value"
							          :label="item.label"
							          :value="item.value"
							        />
							      </el-select>
							<button @click="sendTagsToList" class="sendTagsToListButton">确认</button>
						</div>
						<div class="TagsRecommend">
								<el-scrollbar height="400px" style="min-width: 160px;">
									<div v-for="item in tagsList" class="typeNaviList"
									 :class="{ 'selected-tag': selectedTag === item.name }"
									 @click="changeTagContentList(item.name)">
										<span>{{ item.title }}</span>
									</div>
								</el-scrollbar>
							<div class="typeContent">
								<span style="width: 100%;">添加标签</span>
								<span v-for="item in tagContentList"
									class="typeContentButton"
									@click="chooseTag(item.content)">
									{{item.content}}
								</span>
							</div>
						</div>
					</div>
				  </el-dialog>
			</div>
			<div class="sendDetailsScroll">
				<div style="margin-left: 100px;display: flex; flex-wrap: wrap; gap: 20px;">
					<el-tag v-for="(tag, index) in tagsInputValue"
						closable
						@close="removeCurrentTag(index)"
						type="success"
						class="tagListNavi"
						effect="light">
						{{ tag }}
					</el-tag>
				</div>
			</div>
			<div class="sendDetailsScroll">
				<el-tooltip
				        effect="dark"
				        content="摘要将在文章预览处展示"
				        placement="left"
				      >
							<span style="font-size: 16px;">文章摘要<el-icon><Warning /></el-icon></span>
				      </el-tooltip>
				  <el-input v-model="detailsInfo.summary" style="width: 600px; margin-left: 20px;" placeholder="请输入文章摘要(不超过45字)" maxlength="45" />
			</div>
			<!-- <div style="height: 200px; width: 100%; display: flex;">
				<span style="font-size: 16px;">添加封面</span>
				<el-upload
				    class="avatar-uploader"
				    :action="uploadImg"
				    :show-file-list="false"
				    :on-success="handleAvatarSuccess"
				    :before-upload="beforeAvatarUpload"
				  >
				    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
				    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
				  </el-upload>
			</div> -->
			<div class="sendDetailsScroll">
				<span style="font-size: 16px;">文章类型</span>
				<el-radio-group v-model="detailsType" style="margin-left: 36px;">
				      <el-radio value="1" size="large">原创</el-radio>
				      <el-radio value="2" size="large">转载</el-radio>
				    </el-radio-group>
			</div>
			<div class="sendDetailsScroll">
				<span style="font-size: 16px;">可见范围</span>
				<el-radio-group v-model="visibility" style="margin-left: 36px;">
				      <el-radio value="1" size="large">全部可见</el-radio>
				      <el-radio value="2" size="large">仅我可见</el-radio>
				      <el-radio value="3" size="large">仅粉丝可见</el-radio>
				    </el-radio-group>
			</div>
		</div>
	    <template #footer>
	      <div class="dialog-footer">
	        <el-button type="primary" @click="sendDetails" style="margin-right: 20px;">
	          发送文章
	        </el-button>
	      </div>
	    </template>
	  </el-dialog>
</template>

<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import Vditor from 'vditor';
	import 'vditor/dist/index.css';
	import Header from '../../views/Header.vue';
	
	import { get, post } from '../../../src/request.js';
	
	import { ElMessageBox } from 'element-plus';
	import { ElMessage } from 'element-plus'
	import { Plus } from '@element-plus/icons-vue'
	import type { UploadProps } from 'element-plus'
	import router from '../../router';
	import { sleep } from '../../axios';
	
	const isSendDialogOpen = ref(false);
	const isAddTagsDialogOpen = ref(false);
	
	// 文章类型（原创，转载）
	const detailsType = ref("1");
	const visibility = ref("1");
	// 文章摘要
	// const summary = ref("");
	const imageUrl = ref('');
	
	const detailsInfo = ref({title:"", tags:[], coverImg:"", summary:"", type:"", visibility:""});
	
	const vditor = ref<Vditor | null>(null);
	
	const uploadImg = "api/uploadImg";
	
	const test = () => {
		console.log(vditor.value.getValue());
		// vditor.value.setTheme("dark");
		// vditor.
	};
	
	const checkIsLogin = async () => {
		try{
			const response = await get('/checkIsLogin');
		} catch (error) {
			console.error('未登录:', error);
		}
	}
	
	const handleAvatarSuccess: UploadProps['onSuccess'] = (
	  response,
	  uploadFile
	) => {
	  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
	  console.log(imageUrl.value);
	}
	
	const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
		if (rawFile.size / 1024 / 1024 > 3) {
		  ElMessage.error('上传图片大小超过3MB，请重新上传');
		  return false;
		}
		// else if (rawFile.type !== 'image/jpeg') {
		// 	ElMessage.error('Avatar picture must be JPG format!');
		// 	return false;
		// }
	  return true;
	}
	
	const openSendDialog = () => {
		isSendDialogOpen.value = true;
	}
	
	const sendDetails = async () => {
		// 设置文章类型和可见范围
		detailsInfo.value.type = detailsType.value;
		detailsInfo.value.visibility = visibility.value;
		detailsInfo.value.tags = tagsInputValue.value;
		// isSendDialogOpen.value = false;
		// console.log(localStorage.getItem("userId"));
		// 验证输入数据是否合规
		
		try {
			// params:userId, detailsInfo
			const response = await post('/sendDetails', {
				"title": detailsInfo.value.title,
				"tags": detailsInfo.value.tags,
				"coverImg": detailsInfo.value.coverImg,
				"summary": detailsInfo.value.summary,
				"type": detailsInfo.value.type,
				"visibility": detailsInfo.value.visibility,
				"content": vditor.value.getValue(),
				"userId": localStorage.getItem("userId")
			});
			ElMessage({
				message: '发布文章成功，即将返回主页面...',
				type: 'success',
			});
			isSendDialogOpen.value = false;
			// 清除vditor的数据
			vditor.value.setValue("");
			await sleep(600);
			// 返回主页面
			router.push("/homepage/main");
		} catch (error) {
			console.error('发送文章失败:', error);
		}
	}
	
	// -----------文章 start 标签--------------
	const tagsInputValue = ref<string[]>([]);
	const loading = ref(false);
	interface ListItem {
	  value: string
	  label: string
	}
	const tagsList = ref([]);
	
	const list = ref<ListItem[]>([])
	const options = ref<ListItem[]>([])
	const selectTags = (query: string) => {
		console.log("query:",query);
		console.log("list:",list);
		if (query) {
				loading.value = true;
				setTimeout(() => {
					loading.value = false
					// 进行筛选，筛选出所有符合Query字段的数据列表
					options.value = list.value.filter((item) => {
						return item.label.toLowerCase().includes(query.toLowerCase())
					})
				  
					//  判断是否已经到达最大标签数量
					if(tagsInputValue.value.length > MAX_TAG_LENGTH){
						ElMessage("已达最大标签数量，请勿多选");
						// 删除多的那个
						tagsInputValue.value.pop();
					}else {
						// 未溢出时的功能
					}
					console.log("options:",options.value);
					console.log("tagsInputValue:",tagsInputValue);
				}, 200)
		} else {
			options.value = []
		}
	}
	
	const sendTagsToList = () => {
		console.log(tagsInputValue.value);
		
		// 关闭标签弹窗
		isAddTagsDialogOpen.value = false;
	}
	
	// 顶部搜索栏数据
	const states = ref([
		// {"content": 'Python', "tag": 'Python'},
		// {"content": 'backend', "tag": '后端'},
		// {"content": 'front', "tag": '前端'},
	]);
	
	// 下方标签栏数据
	const tag = ref([]);
	
	const getTagList = async () => {
		const response = await get("/getTagList");
		console.log(response.data);
		tagsList.value = response.data;
	}
	
	const getStatusList = async () => {
		const response = await get("/getStatusList");
		console.log(response.data);
		states.value = response.data;
		// console.log(states.value);
		// 设置list值
		list.value = states.value.map((item) => {
		    return { value: `${item.tag}:${item.content}`, label: `${item.content}` }
		  })
	}
	const tagContentList = ref([]);
	const selectedTag = ref(null);
	const changeTagContentList = (name) => {
		selectedTag.value = name;
		// 更新子标签内容
		// tagContentList.value = tagsList.value.content;
		const tag = tagsList.value.find(tag => tag.name === name);
		
		if (tag) {
		  tagContentList.value = tag.content;
		// console.log(tagContentList.value)
		} else {
		  console.warn("未找到分类");
		}
	}
	
	const MAX_TAG_LENGTH = 6;// 标签最大数量
	
	const chooseTag = (value) => {
		console.log("value",value);
		console.log("selectedTag",selectedTag.value);
		// 标签大类：selectedTag.value，子标签内容：value
		const tag = selectedTag.value;
		const content = value;
		// 查询是否重复
		if(tagsInputValue.value.includes(`${tag}:${content}`)){
			// 重复之后的功能
			ElMessage("标签重复，请重新选择！")
		}else {
			// 点击后将数据保存到上方搜索栏中
			tagsInputValue.value = [...tagsInputValue.value, `${tag}:${content}`];
			selectTags(content);
			
		}
	}
	
	const removeCurrentTag = (index) => {
		console.log("123:",index);
		tagsInputValue.value.splice(index, 1);
	}
	
	// -----------文章 end 标签--------------
	
	onMounted(() => {
		vditor.value = new Vditor('vditor', {
			height:865,
			width:1998,
			toolbar:['headings','bold','italic','strike','|','line','quote','list',
					'ordered-list','check','outdent','indent','code','inline-code','insert-after','insert-before',
					'undo','redo','upload','link','table','record','edit-mode','both',
					'outline','code-theme','content-theme','devtools','br','preview'],
			after: () => {
			  // vditor.value is a instance of Vditor now and thus can be safely used here
			  // vditor.value!.setValue('Vue Composition API + Vditor + TypeScript Minimal Example');
			},
		});
		// console.log(detailsInfo.value.title);
		checkIsLogin();
		getStatusList();
		getTagList();
	});
	
</script>

<style scoped>
	.mainCss{
		width: 100%;
		display: flex;
		justify-content: center;
		border:1px black solid;
	}
	.MdCss{
		width: 100%;
		margin-top: 50px;
	}
	.sendDetailsScroll {
		display: flex;
		align-items: center;
		height: 60px;
		width: 100%;
		/* background-color: antiquewhite; */
	}
	
	.avatar-uploader {
		width: 200px;
		/* border: 1px solid #e5e5e5; */
		border-radius: 5px;
		margin-left: 20px;
	}
	.avatar-uploader .avatar {
	  width: 178px;
	  height: 178px;
	  display: block;
	}
	.avatar-uploader .el-upload {
	  border: 1px dashed var(--el-border-color);
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	  transition: var(--el-transition-duration-fast);
	}
	
	.avatar-uploader .el-upload:hover {
	  border-color: var(--el-color-primary);
	}
	
	.el-icon.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 178px;
	  height: 178px;
	  text-align: center;
	}
	
	.footerButtom {
		margin-top: 13px;
		margin-right: 40px;
		color: #58C9B9;
		text-decoration: none;
	}
	.footerButtom:hover {
		cursor: pointer;
		text-decoration: none;
	}
	
	.logo{
		width: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 50px;
		text-decoration: none;
	}
	.logoText{
		color: #3C3D43;
		transition: color 0.3s ease;
	}
	
	.addTagsButtom {
		background-color: transparent;
		border: 2px solid rgb(232, 232, 238);
		border-radius: 4px;
		width: 120px;
		height: 28px;
		margin-left: 20px;
	}
	.addTagsButtom:hover {
		background-color: #F4F8FC;
		border: 2px solid #CCE3F4;
		color: #68A88B;
		cursor: pointer;
	}
	.TagsRecommend {
		width: 550px;
		height: 400px;
		display: flex;
		margin-top: 10px;
		/* background-color: #3C3D43; */
	}
	.sendTagsToListButton {
		height: 32px;
		width: 50px;
		background-color: transparent;
		border: 1px #CCE3F4 solid;
		border-radius: 4px;
	}
	.sendTagsToListButton:hover {
		color: #58C9B9;
		border: 1px #58C9B9 solid;
		cursor: pointer;
	}
	.typeNaviList {
		height: 30px;
		margin: 3px 0px;
	}
	.typeNaviList:active {
		color: #68A88B;
	}
	.typeNaviList:hover {
		cursor: pointer;
		color: #68A88B;
	}
	.selected-tag span {
	    color: #507999!important;
	}

	.typeContentButton {
		height: 32px;
		line-height: 32px;
		padding: 0 12px;
		/* background-color: #f0f0f0; */
		background-color: #EBF2F7;
		/* border-radius: 16px; */
		font-size: 14px;
		color: #333;
		cursor: pointer;
		transition: all 0.2s ease;
		display: inline-block;
		white-space: nowrap;
	}
	.typeContentButton:hover {
		/* background-color: #e0e0e0; */
		box-shadow: 1px 1px 2px #999, -1px -1px 2px #eee;
	}
	.typeContent {
		max-width: 400px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 8px;
		overflow-y: auto;
		
		/* 注释后将不显示滚动条，需配合下方::-webkit-scrollbar使用 */
		/* scrollbar-width: thin;
		scrollbar-color: #DDDEE0 #ffffff; */
	}
	.typeContent::-webkit-scrollbar {
		width: 10px;
		height: 20px;
	}
	
</style>