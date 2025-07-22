<template>
    <div class="apply">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item>应用中心</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="top-group">
            <div class="search">
                <el-input
                    v-model="searchVal"
                    size="large"
                    placeholder="支持输入应用名称/应用所有者名称搜索"
                    @keyup.enter="search"
                >
                    <template #suffix>
                        <el-icon class="el-input__icon search-icon" @click="search">
                            <Search />
                        </el-icon>
                    </template>
                </el-input>
                <el-button type="primary" size="large" @click="changeRouter('/market/apply-edit')">创建应用</el-button>
            </div>
        </div>
        <div>
            <el-tabs v-model="activeService" class="demo-tabs" @tab-click="handleTabClick">
                <template v-for="item in tabs" :key="item.name">
                    <el-tab-pane :label="item.title" :name="item.name">
                        <div class="item-group">
                            <template v-for="(app, index) in applicationList" :key="index + app.name">
                                <MarketBlock :detail="app" :refreshCardList="search" :pageFrom="activeService" />
                            </template>
                        </div>
                    </el-tab-pane>
                </template>
            </el-tabs>
        </div>
        <div class="pagination-wrap">
            <el-pagination
                layout="prev, pager, next"
                :total="pagination.total"
                :page-size="pagination.pageSize"
                :current-page="pagination.page"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
            />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import $application from '@/plugins/application'
import MarketBlock from '@/views/components/MarketBlock.vue'
import { useRouter, useRoute } from 'vue-router'
import { userInfo } from '@/plugins/account'

// const userDid = userInfo?.metadata?.did;

const searchVal = ref('')
const activeService = ref('market')
const applicationList = ref([])
const router = useRouter()
const route = useRoute()
const tabs = [
    {
        name: 'market',
        title: '应用市场'
    },
    {
        name: 'myCreate',
        title: '我创建的'
    },
    {
        name: 'myApply',
        title: '我申请的'
    }
]

const pagination = ref({
    pageSize: 10,
    page: 1,
    total: 0
})

const handleTabClick = (tab) => {
    console.log(tab, '---acccc--')
    activeService.value = tab.name

    pagination.value.page = 1 // 切换标签时重置页码
}

const search = async () => {
    try {
        // 根据当前激活的标签页传递不同的查询参数
        let condition = { keyword: searchVal.value }

        if (activeService.value === 'myCreate') {
            /**
             * todo 学虎 调用我的创建列表也接口
             * 调用完接口以后，下面的注释也可以放开。
             */
            //  const rst  = await 我的创建列表接口
            /**
             * applicationList 数据源，从rst中获取的
             */
            //  applicationList.value = applications || []
            /**
             * 总条数，分页器需要用到
             */
            //  pagination.value.total = page.total || 0
            //return;
        } else if (activeService.value === 'myApply') {
            /**
             * todo 学虎 调用我的申请列表也接口
             * 调用完接口以后，下面的注释也可以放开。
             */
            //  const rst  = await 我的申请列表接口
            /**
             * applicationList 数据源，从rst中获取的
             */
            //  applicationList.value = applications || []
            /**
             * 总条数，分页器需要用到
             */
            //  pagination.value.total = page.total || 0
            //return;
        }

        const rst = await $application.search(pagination.value.page, pagination.value.pageSize, condition)

        console.log(rst, '-rst-')

        const { applications, page } = rst.body || {}
        applicationList.value = applications || []
        pagination.value.total = page.total || 0
    } catch (error) {
        console.error('获取应用列表失败', error)
        // 处理错误，如显示提示信息
    }
}

const handleCurrentChange = (currentPage) => {
    pagination.value.page = currentPage
}

const handleSizeChange = (pageSize) => {
    pagination.value = {
        ...pagination.value,
        pageSize,
        page: 1 // 切换每页数量时重置页码
    }
}

const changeRouter = (url) => {
    router.push(url)
}

// 监听分页参数或搜索关键词变化，触发数据请求
watch(
    [() => pagination.value.page, () => pagination.value.pageSize, () => searchVal.value, () => activeService.value],
    () => {
        search()
    },
    { immediate: true }
)

onMounted(() => {
    search()
})
</script>
<style scoped lang="less">
:deep(.el-tabs__nav-scroll) {
    background: white;
    padding-left: 12px;
}
.apply {
    margin: 20px;

    .top-group {
        background: white;
        margin-top: 20px;
        padding: 12px;
        .search {
            width: 50%;
            display: flex;
            gap: 20px;
        }
        @media (max-width: 768px) {
            .search {
                width: 100%;
            }
        }
    }
    .item-group {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
    }

    .pagination-wrap {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 24px;

        .el-pagination * {
            background-color: transparent;
        }
    }
}
</style>
