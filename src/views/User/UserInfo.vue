<template>
	<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
	<div class="userInfo">
		<div class="totalInfo">
			<div style="display: flex; padding: 10px;">
				<el-avatar :size="90" :src="userInfo.avatar" style="margin-right: 16px;"/>
				<div>
					<div style="font-size: 20px; font-weight: 500; color: #222226;">{{ userInfo.userNickname }}</div>
				</div>
			</div>
		</div>
		<el-divider>
			<!-- <el-icon><star-filled /></el-icon> -->
			<span style="color: #969698; font-size: 18px;">基 础 信 息</span>
		</el-divider>
		<div class="basicInfo">
			<div class="infoRow">
				<span class="infoTitle">用户昵称</span>：
				<div v-if="!userNicknameEditVisible">
					<span class="infoContent">
						{{ userInfo.userNickname }}
						<div @click="editBasicInfo('userNickname')">
							<el-icon><Edit /></el-icon>
							<span>编辑</span>
						</div>
					</span>
				</div>
				<div v-else style="margin-left: 10px; display: flex;">
					<el-input v-model="editInput" style="width: 240px;height: 30px;color: #222226;" show-word-limit maxlength="10" placeholder="请输入..." />
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px;" color="#58C9B9" @click="editAdmit('userNickname')">
						<span>提交</span>
					</el-button>
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px; border: 1px solid #969698;" 
						color="white" @click="()=>{userNicknameEditVisible=false;editInput = ''}">
						<span>取消</span>
					</el-button>
				</div>
			</div>
			<div class="infoRow">
				<span class="infoTitle">用户名</span>：<span class="infoContent">
					{{ userInfo.userName }}
				</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">用户ID</span>：<span class="infoContent">{{ userInfo.userId }}</span>
			</div>
			<div class="infoRow">
				<span class="infoTitle">性别</span>：
				<div v-if="!sexEditVisible">
					<span class="infoContent">
						{{ userInfo.sex == 0 ? '男' : (userInfo.sex == 1 ? '女' : '未知') }}
						<div @click="editBasicInfo('sex')">
							<el-icon><Edit /></el-icon>
							<span>编辑</span>
						</div>
					</span>
				</div>
				<div v-else style="margin-left: 10px; display: flex;">
					<el-radio-group v-model="sexEditValue">
					      <el-radio value="0" size="large">男</el-radio>
					      <el-radio value="1" size="large">女</el-radio>
					      <el-radio value="2" size="large">未知</el-radio>
					    </el-radio-group>
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px;" color="#58C9B9"
						@click="editAdmit('sex')">
						<span>提交</span>
					</el-button>
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px; border: 1px solid #969698;" 
						color="white" @click="()=>{sexEditVisible=false;editInput = ''}">
						<span>取消</span>
					</el-button>
				</div>
			</div>
			<div class="infoRow">
				<span class="infoTitle">个人简介</span>：
				<div v-if="!bioEditVisible">
					<span class="infoContent" :style="{ color: userInfo.bio ? 'black' : '#a3a3a3' }">
						{{ (userInfo.bio == ''||userInfo.bio == null)? '没有填写个人简介哦' : userInfo.bio }}
						<div @click="editBasicInfo('bio')">
							<el-icon><Edit /></el-icon>
							<span>编辑</span>
						</div>
					</span>
				</div>
				<div v-else style="margin-left: 10px; display: flex;">
					<el-input
						v-model="editInput"
						style="width: 740px;height: 30px;color: #222226;"
						show-word-limit maxlength="100"
						:rows="2"
						type="textarea"
						placeholder="请输入..." />
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px;" color="#58C9B9" @click="editAdmit('bio')">
						<span>提交</span>
					</el-button>
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px; border: 1px solid #969698;" 
						color="white" @click="()=>{bioEditVisible=false;editInput = ''}">
						<span>取消</span>
					</el-button>
				</div>
			</div>
			<div class="infoRow">
				<span class="infoTitle">邮箱</span>：
				<div v-if="!emailEditVisible">
					<span class="infoContent" :style="{ color: userInfo.email ? 'black' : '#a3a3a3' }">
						{{ (userInfo.email == ''||userInfo.email == null)? '未填写' : userInfo.email }}
						<div @click="editBasicInfo('email')">
							<el-icon><Edit /></el-icon>
							<span>编辑</span>
						</div>
					</span>
				</div>
				<div v-else style="margin-left: 10px; display: flex;">
					<el-input
						v-model="editInput"
						style="width: 240px;height: 30px; border-radius: 10px 0 0 10px;"
						maxlength="30"
						placeholder="请输入..." />
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px;" color="#58C9B9" @click="editAdmit('email')">
						<span>提交</span>
					</el-button>
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px; border: 1px solid #969698;" 
						color="white" @click="()=>{emailEditVisible=false;editInput = ''}">
						<span>取消</span>
					</el-button>
				</div>
			</div>
			<div class="infoRow">
				<span class="infoTitle">电话号码</span>：
				<div v-if="!phonenumberEditVisible">
					<span class="infoContent" :style="{ color: userInfo.phonenumber ? 'black' : '#a3a3a3' }">
						{{ (userInfo.phonenumber == ''||userInfo.phonenumber == null)? '未填写' : userInfo.phonenumber }}
						<div @click="editBasicInfo('phonenumber')">
							<el-icon><Edit /></el-icon>
							<span>编辑</span>
						</div>
					</span>
				</div>
				<div v-else style="margin-left: 10px; display: flex;">
					<el-input
						v-model="editInput"
						style="width: 240px;height: 30px; border-radius: 10px 0 0 10px;"
						maxlength="20"
						placeholder="请输入..." />
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px;" color="#58C9B9" @click="editAdmit('phonenumber')">
						<span>提交</span>
					</el-button>
					<el-button style="height: 30px; margin-left: 20px; border-radius: 10px; border: 1px solid #969698;" 
						color="white" @click="()=>{phonenumberEditVisible=false;editInput = ''}">
						<span>取消</span>
					</el-button>
				</div>
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
	
	// 邮箱格式
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	const phoneRegex = /^1[3-9]\d{9}$/; // 中国手机号格式
	
	const route = useRoute()
	const userId = computed(() => route.params.id);
	
	const userNicknameEditVisible = ref(false);
	const sexEditVisible = ref(false);
	const bioEditVisible = ref(false);
	const emailEditVisible = ref(false);
	const phonenumberEditVisible = ref(false);
	const editInput = ref('');
	const sexEditValue = ref('2');
	
	
	const userInfo = ref({
		// 用户昵称:userNickname ; 用户名:userName ; 用户ID:userId ; 性别:sex ; 个人简介: bio ; 邮箱: email ; 电话号码: phonenumber ; 创建时间: createTime
		// userId: 3, avatar: "https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png", userNickname: "甲壳虫", 
		// userName: "beetles", sex: "2", bio: "", email: "121212@qqqq", phonenumber: "", createTime: "2025-06-10 16:18:03"
	})
	
	const getUserInfo = async () => {
		const response = await post("/getUserInfoById",{
			"userId": localStorage.getItem("userId")
		});
		console.log(response);
		userInfo.value = response.data;
	}
	
	const editBasicInfo = (type) => {
		if(type == 'userNickname'){
			editInput.value = userInfo.value.userNickname;
			userNicknameEditVisible.value = true;
		}else if(type == 'sex'){
			sexEditVisible.value = true;
		}else if(type == 'bio'){
			editInput.value = userInfo.value.bio;
			bioEditVisible.value = true;
		}else if(type == 'email'){
			editInput.value = userInfo.value.email;
			emailEditVisible.value = true;
		}else if(type == 'phonenumber'){
			editInput.value = userInfo.value.phonenumber;
			phonenumberEditVisible.value = true;
		}else {
			ElMessage("发生错误！");
		}
	}
	
	const editAdmit = async (type) => {
		if(type == "sex"){
			editInput.value = sexEditValue.value;
		}
		// 邮箱格式验证
		if(type == "email" && !emailRegex.test(editInput.value)){
			ElMessage.error('请输入有效的邮箱地址');
			return;
		}
		// 电话认证
		if(type == "phonenumber" && !phoneRegex.test(editInput.value)){
		    ElMessage.error('请输入有效的手机号码');
		    return;
		}
		
		const response = await post("/changeUserInfo",{
			"type": type,
			"value": editInput.value,
			"userId": localStorage.getItem("userId")
		});
		console.log(response);
		if(response.code == 200){
			ElMessage({
				message: response.msg,
				type: 'success',
			});
			// 清空输入框
			editInput.value = '';
			// 重新查询
			getUserInfo();
			// 设置visible
			if(type == 'userNickname'){
				userNicknameEditVisible.value = false;
			}else if(type == 'sex'){
				sexEditVisible.value = false;
			}else if(type == 'bio'){
				bioEditVisible.value = false;
			}else if(type == 'email'){
				emailEditVisible.value = false;
			}else if(type == 'phonenumber'){
				phonenumberEditVisible.value = false;
			}else {
				ElMessage("发生错误！");
			}
		}else {
			ElMessage(response.msg);
		}
	}
	
	const checkIsLogin = async () => {
		try{
			const response = await get('/checkIsLogin');
		} catch (error) {
			console.error('未登录:', error);
		}
	}
	onMounted(() => {
		checkIsLogin();
		getUserInfo();
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
		display: flex;
		max-width: 900px;
		min-width: 600px;
	}
	.infoContent:hover div {
		display: block;
	}
	.infoContent div {
		display: none;
		margin-left: 20px;
		color: #0080ff;
	}
	.infoContent div:hover {
		color: #4babff;
		cursor: pointer;
	}
</style>