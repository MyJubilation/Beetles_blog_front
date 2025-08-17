<template>
	<div class="article-box" v-for="item in articleList">
		<div class="article-item">
			<div style="display: flex; width: 100%; margin-left: 10px; min-width: 0;">
				<div style="flex-grow: 1; max-width: 84%; margin: 8px 0 4px 0;">
					<div class="article-author" >
						<el-avatar :size="23.2" :src="item.details.avatar ? item.details.avatar : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" />
						<span style="padding: 0 10px;">{{ item.details.author }}</span>
					</div>
					<router-link :to="`/article/details/${item.details.id}`" class="article-title">
						{{ item.details.title }}
					</router-link>
					<div style="user-select: none;">
						<span>{{ item.viewTime }}</span>
					</div>
				</div>
				<router-link :to="`/article/details/${item.details.id}`" style="width: 128px; margin-right: 0px;">
					<img :src="item.details.coverImg ? item.details.coverImg : 'https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png'" style="height: 84px; width: 128px;border: 1px solid black; border-radius: 5px;"/>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed, onMounted, reactive } from 'vue'
	import { useRoute, onBeforeRouteUpdate } from 'vue-router'
	import Header from '../../views/Header.vue';
	import { post, get } from '../../request';
	
	const route = useRoute()
	const userId = computed(() => route.params.id);
	
	// 文章信息
	const articleList = ref([
		// id, title, author, authorId, avatar, coverImg
	]);
	
	const getViewHistoryList = async (type) => {
		const responce = await post("/getHistory",{
			"userId": userId.value,
			"type": type
		});
		// console.log(responce.data);
		articleList.value = responce.data;
	}
	
	onMounted(() => {
		getViewHistoryList("details");
	})
	
	// params:[userId,page,size]
	// 后端返回数据：
	// {
	//     "code": 200,
	//     "msg": "获取历史记录成功",
	//     "data": [
	//         {
	//             "viewTime": "2025-07-31 23:12:02",
	//             "details": {
	//                 "summary": "Docker基础知识",
	//                 "createTime": "2025-07-18 18:55:24",
	//                 "author": "甲壳虫",
	//                 "updateTime": "2025-07-18 18:55:24",
	//                 "stars": 0,
	//                 "avatar": "https://beetles-1.oss-cn-chengdu.aliyuncs.com/%E7%94%B2%E5%A3%B3%E8%99%AB%20LOGO.png",
	//                 "title": "【Docker】Docker基础知识",
	//                 "content": "# 常用命令\n\n* ```\n  // 启动docker\n  systemctl start docker\n  // 启动时便启动docker\n  systemctl enable docker\n\n  // 进入root\n  su\n\n  // vi 编辑\n  vi xxx\n  // 换写文件内容\n  echo xxx >（>>） xxx               eg:echo \"hello\" > index.html\n      ----\">\"为直接覆盖，\">>\"为在末尾续写\n  ```\n* ```\n  // 查看当前docker容器\n  docker ps\n  ```\n* **关于nginx**\n  ```\n  // 在docker run nginx后，想退出nginx\n  ctrl+c\n  // nginx页面存储位置\n  /usr/share/nginx/html\n  ```\n* **关于vim**\n  ```\n  vim xxxxx\n  // 执行写操作\n  i\n  // 保存退出\n  esc\n  :wq\n  ```\n* **关于镜像**\n  ```\n  // 检索\n  docker search\n  // 下载\n  docker pull     ||   docker pull:latest    ||    docker pull:1.26.0\n  // 列表\n  docker images\n  // 删除\n  docker rmi\n  ```\n* **关于容器**\n  ```\n  // 运行\n  docker run\n      ----docker run -d xxx            ----后台启动\n      ----docker run -d -p 88:80       ----后台启动，并将88端口映射为80端口，88不能重复，80可以重复（80是独立容器内的端口，每个容器都有80端口，88是整个docker的端口）\n  // 查看\n  docker ps\n  // 停止\n  docker stop\n  // 启动\n  docker start\n  // 重启\n  docker restart\n  // 状态\n  docker stats\n  // 日志\n  docker logs\n  // 进入\n  docker exec\n      ----docker exec -it xxx /xx/xx   ----交互模式进入\n  // 删除\n  docker rm\n      ----docker rm -f xxx             ----强制删除\n  ```\n* **关于保存镜像**\n  ```\n  // 提交\n  docker commit\n  // 保存\n  docker save\n  // 加载\n  docker load\n  ```\n* **关于分享社区**\n  ```\n  // 登录\n  docker login\n  // 命名\n  docker tag\n  // 推送\n  docker push\n  ```\n\n# docker存储\n\n* **目录挂载和卷目录区别：一个相当于外设一个目录（类似于C盘D盘），一个相当于复制目录内容后新开一个文件夹**\n\n## 目录挂载\n\n> **每次重启容器后，对应容器内容会初始化，之前设置的内容将会消失。**\n\n![image-20250304163916038](file:///D:/MdBlogs/img/Docker/image-20250304163916038.png?lastModify=1752835982)\n\n![image-20250304164432196](file:///D:/MdBlogs/img/Docker/image-20250304164432196.png?lastModify=1752835982)\n\n## 卷目录\n\n> **在目录挂载后，如/etc/nginx在外部目录没有对应文件，启动时会报错，需要将外部目录同步内部初始状态时的文件。**\n\n* **卷映射:-v ngconf:/etc/nginx**\n* **存储的路径默认为：/var/lib/docker/volumes/**<volume-name>\n",
	//                 "view_count": 0,
	//                 "likes": 0
	//             }
	//         }
	//     ]
	// }
</script>

<style scoped>
	.article-box {
		width: 58vw;
		min-width: 885px;
		border-top: 1px solid #e5e5e5;
		/* padding-left: 200px; */
		/* margin-left: 280px; */
	}
	.article-item {
		width: 100%;
		height: 80px;
		border-bottom: 1px solid #e5e5e5;
		padding: 16px 0px;
	}
	.article-title {
		height: 24px;
		/* max-width: 900px; */
		font-weight: bold;
		white-space: nowrap; /* 防止换行 */
		overflow: hidden; /* 隐藏溢出内容 */
		text-overflow: ellipsis; /* 用省略号表示省略部分 */
		color: black;
		text-decoration: none;
		 display: inline-block;
	}
	.article-title:hover {
		color: #006FFF;
	}
	.article-author {
		height: 23.2px;
		display: flex;
		/* margin-left: 10px; */
		text-decoration: none;
		color: black;
		user-select: none;
	}
</style>