<template>
  
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue';
import { post } from '../../../../request';


const testDS = async () => {
	const response = await post("/AIchat",{
		"messages": [{ role: "user", content: "你好啊，请介绍一下你自己" }],
		"model": "deepseek-chat"
	});
	console.log("AICHAT DONE");
	console.log(response.data);
};


onMounted(() => {
	// testDS();
})
</script>

<style scoped>

</style>