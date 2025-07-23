<template>
	<Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header>
	<div>
		<p>{{ userId }}</p>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted } from 'vue'
	import Header from '../../views/Header.vue';
	import { get, post } from '../../../src/request.js';
	import { ElMessage } from 'element-plus'
	import router from '../../router';
	import { sleep } from '../../axios';
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	
	const route = useRoute()
	const userId = computed(() => route.params.id);
	
	
	onMounted(() => {
		
	})
</script>

<style scoped>
</style>