<template>
	<div style="background-color: #F3F4F6;">
		<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
		<div style="margin-top: 64px; display: flex; width: 97vw; justify-content: center;">
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
	</div>
	
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	import MarkdownIt from 'markdown-it'
	import { async } from '@kangc/v-md-editor';
	import { post } from '../../request';
	import Header from '../../views/Header.vue';
	import 'github-markdown-css';
	import { htmlToPDF } from '../../lib/utils/html2pdf';
	
	// var md = new MarkdownIt();
	import highlightJs from 'highlight.js'; // 使用 ES 模块导入
	
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
		// 导出为PDF
		htmlToPDF(title.value);
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
</style>