<template>
  <div>
    <el-upload
    				  v-if="uploadVisible"
    				  class="upload-demo"
    				  :on-success="afterUpdateImg"
    				  drag
    				  :limit="1"
    				  action="/api/imgUpload">
    				  <i class="el-icon-upload"></i>
    				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    				  <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
    				</el-upload>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import MarkdownReader from '../lib/utils/MarkdownReader.vue';

// 获取文章详情内容

const uploadVisible = ref(true)

const afterUpdateImg = (response, file, fileList) => {
				// 先加载，后关闭上传处
				console.log("response: " + response);
				// 上传
				// this.imageName = response;
				// this.imageSrc = '/testImg/' + response;
				// console.log("imageSrc: " + this.imageSrc);
				// 关闭上传处
				uploadVisible.value = false;
			};


onMounted(() => {
	
})
// 在 <script setup> 中，顶层的变量和函数会自动暴露给模板使用
// 所以不需要再写 return { markdownText }
</script>