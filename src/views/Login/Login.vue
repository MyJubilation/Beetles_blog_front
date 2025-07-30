<template>
  <div class="main">
	  <div class="wrapper">
	    <div>
	      <h1>登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 录</h1>
	      <div class="input-box">
	        <i class="fas fa-envelope icon"></i>
	        <input id="usernameInput" type="text" ref="username" required />
	        <label>用户名</label>
	      </div>
	      <div class="input-box">
	        <i class="fas fa-lock icon"></i>
	        <input id="passwordInput" type="password" ref="password" required />
	        <label>密码</label>
	      </div>
	      <!-- <div class="row">
	        <a @click="forgotPassword">Forgot password?</a>
	      </div> -->
	      <button @click="login" class="btn">登 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 录</button>
	  
	      <div class="signup-link">
	        <p>还没有账号？
	        	<router-link :to="{ path:'/register' }">
	        	点 击 注 册
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
	import { ElMessage } from 'element-plus';
	
	const username = ref(null);
	const password = ref(null);
	
	const login = async () => {
		try {
			console.log("username:" + username.value.value + "password:" + password.value.value);
			const response = await post('/login', 
								{	"userName": username.value.value, 
									"password": password.value.value,
								});
			// 存储 token 到 localStorage
			console.log(response);
			if(response.data.token){
				localStorage.setItem('Jwttoken', response.data.token);
				// sessionStorage.setItem("userName",username.value.value);
				localStorage.setItem("userName",username.value.value);
				// 获取并储存用户id
				const response01 = await get('/getUserInfo',{
					"userName": username.value.value
				})
				localStorage.setItem("userId",response01.data.id);
				localStorage.setItem("userNickname",response01.data.nickName);
				localStorage.setItem("avatar",response01.data.avatar);
				// 确保 token 存储完成后再跳转
				// console.log("登录成功，正在跳转01");
				ElMessage({
					message:'登录成功，正在跳转',
					type:'success'
				})
				await new Promise(resolve => setTimeout(resolve, 1000)); // 短暂延迟
				if(response.data.type == '0'){
					router.push("/admin/homepage/main");
				}else{
					router.push("/homepage/main");
				}
				// console.log("登录成功，正在跳转02,session为：" + localStorage.getItem("userName"));
				
			}else{
				ElMessage("测试");
			}
		} catch (error) {
			console.error('登录失败:', error);
		}
		// console.log(username.value.value + "//" + password.value.value);
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
  height: 450px;
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
