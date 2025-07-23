// src/utils/axios.js
import axios from 'axios';
import router from './router';
import { ElMessage } from 'element-plus';

// 创建 Axios 实例
const instance = axios.create({
  baseURL: '/api', // 设置基础 URL，所有请求都会附加该前缀
  timeout: 60000, // 请求超时时间（毫秒）
  withCredentials: true, // 允许携带 Cookie
  headers: {
    'Content-Type': 'application/json',
    'Jwttoken': '',
	},
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 可以在发送请求之前对配置进行处理，例如动态添加 token
	// console.log("Jwttoken" + localStorage.getItem("Jwttoken"));
    if (localStorage.getItem('Jwttoken')) {
      config.headers.Jwttoken = localStorage.getItem('Jwttoken');
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.error('请求拦截器错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
		if(response.data.msg == 'Logout successful'){
			// 清除localStorage
			localStorage.clear();
			// 将jwt设置为空
			response.config.headers.Jwttoken = '';
			return response.data;
		}else {
			// 对响应数据进行处理
			return response.data;
		}
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
		const status = error.response.status;
		// console.log("error:");
		console.log(error);
		if (status === 403) {
			if(error.response.config.url == "/login"){
				ElMessage.error("用户名或密码错误，请重试");
			}else {
				// 清除localStorage
				localStorage.clear();
				// 将jwt设置为空
				error.response.config.headers.Jwttoken = '';
				console.error('未授权，请重新登录');
				console.log(error.response);
				// 可以跳转到登录页面
				router.push("/login");
			}
		} 
	  // else if (status === 403) {
   //      console.error('拒绝访问');
   //    }
    }
    return Promise.reject(error);
  }
);

export default instance;

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
