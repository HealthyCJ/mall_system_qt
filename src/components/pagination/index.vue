<template>
    <div class="block">
        <el-pagination
                :current-page.sync='paginations.pageIndex'
                :layout="paginations.layout"
                :page-size="paginations.pageSize"
                :page-sizes="paginations.pageSizes"
                :total="pageTotal"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                background
                v-if='pageTotal > 0'>
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'Pagination',
        props: {
            pageTotal: Number
        },
        data() {
            return {
                paginations: {
                    // 当前位于哪页
                    pageIndex: 1,
                    // 1页显示多少条
                    pageSize: 10,
                    // 每页显示多少条
                    pageSizes: [5, 10, 15, 20],
                    // 翻页属性
                    layout: "total, sizes, prev, pager, next, jumper"
                },
            }
        },
        methods: {
            // 上下分页 pageIndex
            handleCurrentChange(page) {
                this.$emit('handleCurrentChange', page);
            },
            // 每页多少条切换 pageSize
            handleSizeChange(page_size) {
                this.$emit('handleSizeChange', page_size);
            }
        },
        watch: {
            pageTotal: function () {
                this.$nextTick(() => {
                    this.paginations.pageIndex = 1
                })
            },
            /*pageTotal: function (newValue, oldValue) {
                this.$nextTick(() => {
                    this.paginations.pageIndex = 1
                })
            },*/
        },
    }
</script>

<style scoped>
    .block {
        text-align: right;
        padding: 10px 18px;
    }
</style>