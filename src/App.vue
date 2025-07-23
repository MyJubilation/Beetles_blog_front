<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'
</script>

<template>
	<!-- <Header style="position: fixed;top: 0; left: 0; right: 0; z-index: 1000;"></Header> -->
	<router-view />
	<!-- <Footer></Footer> -->
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
