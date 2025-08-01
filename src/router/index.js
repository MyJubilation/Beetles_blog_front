import { createRouter, createWebHistory } from "vue-router"

import Homepage from "@/views/BlogViews/Homepage.vue"
import WritingArticles from "@/views/writingArticles/WritingArticles.vue"
import AboutMe from "@/views/AboutMe.vue"
import Login from "@/views/Login/Login.vue"
import Register from "@/views/Login/Register.vue"
import AdminHomepage from "@/views/Admin/Homepage/Homepage.vue"

const constantRoutes = [
	{
		path: "/",
		redirect: "/homepage/main"
	},
	{
		path: "/homepage",
		component: Homepage,
		children:[
		  {
		    path:'userInfo/:id',
		    name:'userInfo',
		    component: () => import('../views/User/UserInfo.vue')
		  },
		  {
		    path:'main',
		    name:'main',
		    component: () => import('../views/BlogViews/Main.vue')
		  }
		]
	},
	{
		path: "/user/:id",
		name:'user',
		component: () => import('../views/User/User.vue')
	},
	{
		path: "/article/details/:id",
		name:'details',
		component: () => import('../views/BlogViews/Details.vue')
	},
	{
		path: "/login",
		component: Login
	},
	{
		path: '/register',
		name: 'Register',
		component: Register
	},
	{
		path: "/aboutme",
		component: AboutMe
	},
	{
		path: "/writingarticles",
		component: WritingArticles
	},
	
	{
		path: "/admin/homepage",
		component: AdminHomepage,
		children:[
		  {
		    path:'main',
		    name:'adminMain',
		    component: () => import('../views/Admin/Homepage/Main.vue')
		  },
		  {
		    path:'form/basicForm',
		    name:'basicForm',
		    component: () => import('../views/Admin/Homepage/Form/BasicForm.vue')
		  }
		]
	},
]


const router = createRouter({
	history: createWebHistory(),
	routes: constantRoutes
})

export default router