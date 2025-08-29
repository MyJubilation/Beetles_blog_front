<template>
  <div class="markdown-reader">
    <div class="markdown-header" v-if="showHeader">
      <h2>{{ displayTitle }}</h2>
      <div class="header-actions">
        <button @click="toggleFullscreen">全屏</button>
        <button @click="copyMarkdown">复制</button>
      </div>
    </div>
    <div class="markdown-content" v-html="compiledMarkdown"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { get, post } from '../../request.js';
import 'highlight.js/styles/github.css'

// 导入额外的语言支持
import 'highlight.js/lib/languages/javascript'
import 'highlight.js/lib/languages/python'
import 'highlight.js/lib/languages/java'
import 'highlight.js/lib/languages/css'
import 'highlight.js/lib/languages/xml'
import 'highlight.js/lib/languages/json'
import 'highlight.js/lib/languages/sql'
import 'highlight.js/lib/languages/bash'
import 'highlight.js/lib/languages/dockerfile'
import 'highlight.js/lib/languages/yaml'


// 定义props
const props = defineProps({
  detailsId: {
    type: String,
    required: true,
	default: ''
  },
  content: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  showHeader: {
    type: Boolean,
    default: false
  }
  
})

// 定义emit
const emit = defineEmits(['fullscreen'])

// 响应式数据
const detailsContent = ref("")
const title = ref("")
const summary = ref("")
const commentsCount = ref(0)
const likes = ref(0)
const stars = ref(0)
const createTime = ref("")
const updateTime = ref("")
const view_count = ref(0)
const author = ref("")
const authorId = ref("")
const avatar = ref("")

// 计算属性：显示标题（优先使用props中的title，否则使用从API获取的title）
const displayTitle = computed(() => props.title || title.value || 'Markdown Reader')

// 计算属性：编译后的Markdown
const compiledMarkdown = computed(() => {
  const contentToRender = detailsContent.value || props.content
  return marked(contentToRender)
})

// 配置marked
const configureMarked = () => {
  marked.setOptions({
    highlight: function(code, lang) {
      // 检查语言是否有效
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      
      try {
        return hljs.highlight(code, { language }).value
      } catch (err) {
        console.error('代码高亮错误:', err)
        return hljs.highlightAuto(code).value
      }
    },
    breaks: true,
    gfm: true,
    // 其他marked选项
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  })
}

const detailsId = ref("");
// 获取文章详情内容
const getDetailsContent = async () => {
	console.log("props.detailsId.value",props.detailsId);
  try {
    const response = await post('/getDetailsContent', {
      "detailsId": props.detailsId
    })
    
    detailsContent.value = response.data.content
    title.value = response.data.title
    summary.value = response.data.summary
    likes.value = response.data.likes
    stars.value = response.data.stars
    createTime.value = response.data.createTime
    updateTime.value = response.data.updateTime
    view_count.value = response.data.view_count
    author.value = response.data.author
    authorId.value = response.data.user_id
    avatar.value = response.data.avatar
    
    console.log(response.data)
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}

// 方法：切换全屏
const toggleFullscreen = () => {
  emit('fullscreen')
}

// 方法：复制Markdown内容
const copyMarkdown = () => {
  const textToCopy = detailsContent.value || props.content
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('已复制到剪贴板')
    })
    .catch(err => {
      console.error('复制失败:', err)
    })
}
configureMarked()
// 生命周期钩子
onMounted(() => {
  // 只有当提供了detailsId时才获取内容
  if (detailsId) {
    getDetailsContent()
  }
})
</script>

<style scoped>
/* 样式部分保持不变 */
.markdown-reader {
  /* border: 1px solid #ddd; */
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.markdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.markdown-header h2 {
  margin: 0;
  font-size: 18px;
}

.header-actions button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
}

.header-actions button:hover {
  background-color: #e0e0e0;
}

.markdown-content {
  /* padding: 20px; */
  overflow: auto;
  flex: 1;
}

/* Markdown内容样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-content :deep(p) {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-content :deep(code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

/* 添加更多代码块样式 */
.markdown-content :deep(pre) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
  position: relative;
  margin: 16px 0;
}

.markdown-content :deep(pre code) {
  display: block;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: 0;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 14px;
  line-height: 1.45;
  word-wrap: normal;
}

/* 添加代码语言标签 */
.markdown-content :deep(pre)::before {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  right: 10px;
  padding: 2px 8px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 0 0 4px 4px;
}

/* 添加行号支持 */
.markdown-content :deep(pre code.hljs) {
  padding-left: 0;
}

.markdown-content :deep(.hljs-ln-numbers) {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: right;
  color: #ccc;
  border-right: 1px solid #ccc;
  vertical-align: top;
  padding-right: 5px;
}

.markdown-content :deep(.hljs-ln-code) {
  padding-left: 10px;
}

.markdown-content :deep(blockquote) {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 2em;
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-content :deep(li) {
  margin-bottom: 0.25em;
}

.markdown-content :deep(table) {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin-bottom: 16px;
}

.markdown-content :deep(table th),
.markdown-content :deep(table td) {
  padding: 6px 13px;
  border: 1px solid #dfe2e5;
}

.markdown-content :deep(table th) {
  background-color: #f6f8fa;
  font-weight: 600;
}

.markdown-content :deep(table tr:nth-child(2n)) {
  background-color: #f8f8f8;
}

.markdown-content :deep(img) {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

.markdown-content :deep(hr) {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #e1e4e8;
  border: 0;
}
</style>