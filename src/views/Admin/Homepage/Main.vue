<template>
	<div class="main">
		<div style="display: flex;">
			<div>
				<el-card>
				    <template #header>
				      <div class="card-header">
				        <span>欢迎回来：<span style="font-weight: 500; font-size: 25px;">{{userName}}</span></span>
				      </div>
				    </template>
					<div style="display: flex; height: 100px;">
						<div class="box-item">
							<el-icon size="40" color="#68A88B" style="margin-right: 20px;"><View /></el-icon>
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										<span style="font-size: 15px; font-weight: 600; color: #68A88B">总 浏 览 量</span>
										<el-tooltip
											effect="dark"
											content="所有文章总共的浏览量之和"
											placement="top"
											>
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
						</div>
						<div class="box-item">
							<el-icon size="40" color="#dd4bbe" style="margin-right: 20px;"><ChatLineSquare /></el-icon>
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										<span style="font-size: 15px; font-weight: 600; color: #dd4bbe">总 评 论 数</span>
										<el-tooltip
											effect="dark"
											content="所有文章总共的评论数之和"
											placement="top"
											>
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
						</div>
						<div class="box-item">
							<el-icon size="40" color="#45a9bd" style="margin-right: 20px;"><User /></el-icon>
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										<span style="font-size: 15px; font-weight: 600; color: #45a9bd">总 用 户 数</span>
										<el-tooltip
											effect="dark"
											content="所有用户数量之和"
											placement="top"
											>
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
						</div>
						<div class="box-item">
							<el-icon size="40" color="#be775c" style="margin-right: 20px;"><User /></el-icon>
							<el-statistic :value="98500">
								<template #title>
									<div style="display: inline-flex; align-items: center">
										<span style="font-size: 15px; font-weight: 600; color: #be775c">总 点 赞 数</span>
										<el-tooltip
											effect="dark"
											content="所有点赞数量之和"
											placement="top"
											>
											<el-icon style="margin-left: 4px" :size="12">
												<Warning />
											</el-icon>
										</el-tooltip>
									</div>
								</template>
							</el-statistic>
						</div>
					</div>
					<div style="display: flex; font-size: 16px; font-weight: 400;">每日内容数据</div>
					<div ref="chartRefTotal" style="width: 100%; height: 500px;"></div>
				    <!-- <template #footer>Footer content</template> -->
				</el-card>
				<div style="display: flex; margin-top: 20px;">
					<el-card style="width: 700px;">
						<template #header>
						  <div class="card-header">
							<span style="font-weight: 400; font-size: 18px;">热门文章</span>
						  </div>
						</template>
						<div>
							<el-table :data="hotDetailsList" height="100%" style="width: 100%" stripe >
								<el-table-column type="index" width="50" />
							    <el-table-column prop="title" label="标题"/>
							    <el-table-column prop="views" label="点击量" width="150" />
							    <el-table-column prop="thanYesterday" label="较昨日"  width="150" />
							</el-table>
						</div>
					</el-card>
					<el-card style="width: 700px; margin-left: 20px;">
						<template #header>
						  <div class="card-header">
							<span style="font-weight: 400; font-size: 18px;">内容类型占比(前五)</span>
						  </div>
						</template>
						<div ref="chartRefType" style="width: 100%; height: 500px;"></div>
					</el-card>
				</div>
			</div>
			<div style="width: 300px; height: 1400px;">
				<el-card style="width: 95%; margin-left: 30px; height: 400px;">
					<template #header>
					  <div class="card-header">
					    <span style="font-weight: 400; font-size: 18px;">快捷操作</span>
					  </div>
					</template>
				</el-card>
				<el-card style="width: 95%; margin-left: 30px; height: 300px; margin-top: 20px;">
					<template #header>
					  <div class="card-header">
					    <span style="font-weight: 400; font-size: 18px;">公告</span>
					  </div>
					</template>
				</el-card>
				<el-card style="width: 95%; margin-left: 30px; height: 200px; margin-top: 20px;">
					<template #header>
					  <div class="card-header">
					    <span style="font-weight: 400; font-size: 18px;">帮助文档</span>
					  </div>
					</template>
				</el-card>
			</div>
		</div>
	</div>
</template>
 
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const hotDetailsList = [
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '484',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '89',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '68',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '46',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '64',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '664',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '786',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '676',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '58588',
    thanYesterday: '40%',
  },
  {
    title: '【JavaScript】JavaScript基础知识',
    views: '7878',
    thanYesterday: '40%',
  },
]
 
// 按需引入 echarts 核心模块
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

const userName = localStorage.getItem("userName");

 
// 注册所需组件和图表类型
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
])
 
// 获取 DOM 引用
const chartRefTotal = ref(null)
const chartRefType = ref(null)
let chartInstanceTotal = null
let chartInstanceType = null
let resizeObserver = null

// 生成近10天的日期数组
function generateLastTenDays() {
  const dates = [];
  const today = new Date(); // 使用当前日期或指定日期
  
  for (let i = 9; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    dates.push(formattedDate);
  }
  
  return dates;
}
// 初始化图表
const initChart = () => {
  if (chartRefTotal.value) {
	// 创建 echarts 实例
	chartInstanceTotal = echarts.init(chartRefTotal.value);

	// 配置项
	const option1 = {
		grid: {
		    left: '3%',    // 左边距
		    right: '1%',   // 右边距
		    top: '10%',    // 上边距
		    bottom: '4%'  // 下边距
		  },
	  tooltip: {
		show: true,
		trigger: 'axis',  // 设置触发类型为坐标轴
		formatter: function(params) {
			// console.log(params);
		  // 自定义提示框内容
		  let result = '';
		  params.forEach(param => {
			result += `${param.name}<p style="background-color: #ffffff; padding: 7px; border-radius:5px; font-size:16px;"><span style="color: #666A6A;">当日内容量</span><span style="margin-left:60px; font-weight:500;">${param.value}</span></p>`;
			// result += `${param.name} : ${param.value}`;
		  });
		  return result;
		},
		backgroundColor: 'rgba(244, 244, 244, 0.7)',
		borderColor: '#d0d0d0',
		borderWidth: 1,
		textStyle: {
		  color: '#000000',
		  fontSize: 14,
		}
	  },
	  xAxis: {
		type: 'category',
		data: generateLastTenDays() // 使用生成的日期数组
	  },
	  yAxis: {
		type: 'value'
	  },
	  series: [
		{
		  data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901], // 更新数据以匹配10天
		  type: 'line',
		  smooth: true
		}
	  ]
	};
	// 渲染图表
	chartInstanceTotal.setOption(option1);
  }
  if (chartRefType.value) {
    // 创建 echarts 实例
    chartInstanceType = echarts.init(chartRefType.value);
  
    // 配置项
  	const option2 = {
  	  tooltip: { // 图表的提示框配置项，用于在鼠标悬停在图表上时显示相关信息
  	    trigger: 'item' // 提示框的触发方式为 ‘item’，即当鼠标悬停在饼图的某个扇形区域上时显示提示信息
  	  },
  	  legend: { // 图表的图例配置项，用于显示图表中各个数据系列的名称
  	    top: '5%', // 图例距离图表顶部的距离为 5%
  	    left: 'center' // 图例水平居中显示
  	  },
  	  series: [ // 图表的数据系列配置项，用于定义图表的数据和样式
  	    {
  	      name: 'Tag',
  	      type: 'pie', // 图形类型
  	      radius: ['40%', '70%'],   // 圆的内外半径比例
  	      avoidLabelOverlap: false, // 是否避免标签重叠
  	      itemStyle: { // 饼图扇形区域的样式配置
  	        borderRadius: 10, // 扇形区域的圆角半径为 10
  	        borderColor: '#fff', // 扇形区域的边框颜色为白色
  	        borderWidth: 2 // 扇形区域的边框宽度为 2
  	      },
  	      label: { // 饼图标签的配置
  	        show: false, // 不显示标签
  	        position: 'center' // 标签位置为扇形区域的中心
  	      },
  	      emphasis: { // 饼图扇形区域在鼠标悬停或选中时的样式配置
  	        label: { // 饼图扇形区域在鼠标悬停或选中时的样式配置
  	          show: true,
  	          fontSize: 30,
  	          fontWeight: 'bold' // 标签字体加粗
  	        }
  	      },
  	      labelLine: { // 标签连接线的配置
  	        show: false // 不显示标签连接线
  	      },
  	      data: [
  	        { value: 1048, name: 'Java' },
  	        { value: 735, name: '前端' },
  	        { value: 580, name: '后端' },
  	        { value: 484, name: 'Vue' },
  	        { value: 300, name: 'Markdowm' }
  	      ]
  	    }
  	  ]
  	};
  
    // 渲染图表
    chartInstanceType.setOption(option2);
  }
};
 
// 使用 ResizeObserver 监听图表容器尺寸变化
const setupResizeObserver = () => {
  if (chartRefTotal.value) {
    resizeObserver = new ResizeObserver(() => {
      chartInstanceTotal?.resize()
    })
 
    resizeObserver.observe(chartRefTotal.value)
  }
}
 
// 生命周期：挂载时初始化图表
onMounted(() => {
  initChart()
  setupResizeObserver()
})
 
// 生命周期：卸载前清理资源
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chartInstanceTotal?.dispose()
})
</script>

<style scoped>
	.main {
		/* background-color: #e5e5e5; */
		/* border: 2px solid #e5e5e5; */
		width: 1680px;
		min-height: 90vh;
		padding: 10px;
	}
	.box-item {
		/* border: 1px solid black; */
		padding: 10px;
		display: flex;
		justify-content: center;
		width: 300px;
		align-items: center;
		margin-bottom: 10px;
	}
	.el-statistic{
		--el-statistic-content-font-size: 30px;
	}
</style>