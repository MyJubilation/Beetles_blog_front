<template>
  <div class="main">
	  <div class="wrapper">
	    <div>
	      <h1>注 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 册</h1>
		  <!-- 性别 -->
	      <div class="input-box">
	        <input id="usernameInput" type="text" ref="username" required />
	        <label>*用户名(不得少于5字符且仅为数字或字母)</label>
	      </div>
		  <div class="input-box">
		    <input id="usernameInput" type="text" ref="nickname" required />
		    <label>*昵称</label>
		  </div>
	      <div class="input-box">
	        <input id="passwordInput" type="password" ref="password" required />
	        <label>*密码</label>
	      </div>
		  <div class="input-box">
		    <input id="usernameInput" type="text" ref="phonenumber" required />
		    <label>电话</label>
		  </div>
		  <div class="input-box">
		    <input id="usernameInput" type="text" ref="email" required />
		    <label>邮箱</label>
		  </div>
		  <div class="input-box" style="border-bottom: 0px solid #fff;">
			  <span style="color: #fff;">性别 ： </span>
		    <el-select
		          v-model="sex"
		          placeholder="请选择"
		          size="large"
		          style="width: 100px; margin-left: 10px;"
		        >
				<el-option
				        v-for="item in sexList"
				        :key="item.value"
				        :label="item.label"
				        :value="item.value"
				      />
			</el-select>
		  </div>
		  
		  
		  <div class="row" style="color: red;">带“*”为必填</div>
		  
	      <!-- <div class="row">
	        <a @click="forgotPassword">Forgot password?</a>
	      </div> -->
	      <button @click="register" class="btn">注 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 册</button>
	  
	      <div class="signup-link">
	        <p>已有账号？
	        	<router-link :to="{ path:'/login' }">
	        	点 击 登 录
	        	</router-link>
	        </p>
	      </div>
	    </div>
	  </div>
  </div>
</template>

<script setup>
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	import { ref, computed, onMounted, getCurrentInstance, watch } from 'vue'
	import { get, post } from '@/request';
	import router from '@/router';
	import { ElMessage } from 'element-plus'
	
	const username = ref(null);
	const nickname = ref(null);
	const password = ref(null);
	const phonenumber = ref(null);
	const email = ref(null);
	
	const regex = /^[a-zA-Z0-9]+$/;
	
	const sex = ref(null);
	const sexList = [
	  {
	    value: '0',
	    label: '男',
	  },
	  {
	    value: '1',
	    label: '女',
	  },
	  {
	    value: '2',
	    label: '未知',
	  }
	];
	
	const register = async () => {
		try {
			// 验证必填项是否已填
			if(username.value.value == ""){
				ElMessage("请输入用户名");
			}else { 
				if(nickname.value.value == ""){
					ElMessage("请输入昵称");
				}else {
					if(password.value.value == ""){
						ElMessage("请输入密码");
					}else {
						// 判断账号长度
						if(username.value.value.length < 5){
							ElMessage("账号长度不得小于5字符");
						}else {
							if(regex.test(username.value.value)){
								// 发送给后端请求
								// console.log("username:" + username.value.value + "password:" + password.value.value);
								const response = await post('/register',
													{	"userName": username.value.value,
														"nickName": nickname.value.value,
														"password": password.value.value,
														"phonenumber": phonenumber.value.value,
														"email": email.value.value,
														"sex": sex.value
													});
								// 存储 token 到 localStorage
								if(response.code == 200){
									console.log("注册成功，正在跳转01");
									ElMessage({
									    message: '注册成功，正在跳转',
									    type: 'success',
									  })
									await new Promise(resolve => setTimeout(resolve, 1000)); // 短暂延迟
									router.push("/login");
								}else{
									ElMessage(response.msg);
								}
							}else {
								ElMessage("账号格式错误，仅支持数字和字母，请修改后重试");
							}
						}
					}
				}
			}
		} catch (error) {
			console.error('登录失败:', error);
		}
		// console.log(username.value.value.length);
	};
	
	const validateEmail = () => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

      this.isEmail = emailRegex.test(email.value.value);
    };
	const validatePhone = () => {
	  const phoneRegex = /^[0-9]{10}$/;
	
	  this.isPhone = phoneRegex.test(phonenumber.value.value);
	};
	
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.main {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: #282a37; */
  background: #282a37;
  background-size: cover;
  background-position: center;
}

.wrapper {
  position: relative;
  width: 400px;
  height: 750px;
  background: #3e404d;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);
}

.wrapper:hover {
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.5);
  background: #46474e;
}

.wrapper h1 {
  font-size: 2em;
  color: #fff;
  text-align: center;
}

.wrapper .input-box {
  position: relative;
  width: 310px;
  margin: 30px 0;
  border-bottom: 2px solid #fff;
}

.wrapper .input-box input {
  width: 100%;
  height: 50px;
  background: transparent;
  outline: none;
  border: none;
  font-size: 1em;
  color: #fff;
  padding: 0 50px 0 5px;
}

.wrapper .input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  font-size: 1em;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.wrapper .input-box input:focus ~ label,
.wrapper .input-box input:valid ~ label {
  top: -5px;
}

.wrapper .input-box .icon {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 1.2em;
  line-height: 57px;
}

.wrapper .row {
  margin: -15px 0 15px;
  font-size: 0.9em;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.wrapper .row label {
  display: flex;
  align-items: center;
  gap: 5px;
}

.wrapper .row a {
  color: #fff;
  text-decoration: none;
}

.wrapper .options a:hover {
  text-decoration: underline;
}

.wrapper .btn {
  width: 100%;
  height: 40px;
  background: #fff;
  outline: none;
  border: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 1.3em;
  font-weight: 500;
  color: #000;
  margin-top: 10px;
}

.btn:hover {
  background: #ffffea;
}

.wrapper .signup-link {
  font-size: 0.9em;
  color: #fff;
  text-align: center;
  margin: 25px 0 10px;
}

.wrapper .signup-link a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
}

.wrapper .signup-link a:hover {
  text-decoration: underline;
}

@media (max-width: 360px) {
  .wrapper {
    width: 100%;
    height: 100vh;
    border: none;
    border-radius: 0px;
  }

  .wrapper .input-box {
    width: 290px;
  }
  #img {
    z-index: -90;
  }
}
</style>
