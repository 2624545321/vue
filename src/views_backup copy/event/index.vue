<template>
    <div class="app-container">
        <!-- 检索 开始 -->
        <div class="search-box overflow-hidden">
            <div class="search-item fl">
                <el-input class="search-item-input fl" size="small"  v-model="search.eventName" placeholder="事件名称" clearable/>
            </div>
            <div class="search-item fl">
                <el-input class="search-item-input fl" size="small"  v-model="search.keywords" placeholder="关键词" clearable/>
            </div>
            <div class="search-item fl">
                <el-input class="search-item-input fl" size="small"  v-model="search.author" placeholder="创建人" clearable/>
            </div>
            <div class="search-item fl">
                <el-date-picker
                    v-model="search.searchTime"
                    :picker-options="pickerBeginDateBefore"
                    :clearable="false"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    size="small"
                    :editable="false"
                    class="fl">
                </el-date-picker>
            </div>
            <div class="search-item fr">
                <el-button class="fr" size="small" type="primary" @click="fullTextSearch">检索</el-button>
            </div>
        </div>
        <!-- 检索 结束 -->

        <!-- 新建按钮 start -->
        <div class="overflow-hidden mb20">
            <router-link :to="{ name: 'event_edit'}" tag="button" class="el-button--small el-button--primary el-button">新建</router-link>
        </div>
        <!-- 新建按钮 end -->
        <!-- table 开始 -->
        <el-table
            v-loading="listLoading"
            :data="data.event_list"
            element-loading-text="Loading"
            :stripe='true'
            :header-cell-style="theadBg"
            fit
            highlight-current-row
        >
            <el-table-column align="center" label="序号" width="80">
                <template slot-scope="scope">
                {{ (scope.$index+1) + (page.PAGESIZE * (page.CURRPAGE - 1)) }}
                </template>
            </el-table-column>
            <el-table-column label="事件" align="left" width="300">
                <template slot-scope="scope">
                    <router-link :to="{ name: 'event_detail' , params: {id : scope.row.id ,name: scope.row.eventName}}" tag="span" :title="scope.row.eventName " class="cursor">{{ scope.row.eventName }}</router-link>
                    <!-- <span :title="scope.row.eventName">{{ scope.row.eventName }}</span> -->
                </template>
            </el-table-column>
            <el-table-column label="稿件数" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.articleNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建人" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdUser }}</span>
                </template>
            </el-table-column>
            <el-table-column label="开始时间" align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.startDate }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="结束时间">
                <template slot-scope="scope">
                    <span>{{ scope.row.endDate }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <span class="cursorPointer">
                        <router-link :to="{ name: 'event_edit',params:{eventid:scope.row.id}}" tag="span">
                            <svg-icon icon-class="edit" />
                            编辑
                        </router-link>
                    </span>
                    <span class="cursorPointer" @click="deleteEvent(scope.row.id)">
                        <svg-icon icon-class="delete" />删除
                    </span>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 start -->
        <div class="block">
            <el-pagination
                class="textCenter mt20"
                background
                :current-page="page.CURRPAGE"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page.PAGESIZE"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.ITEMCOUNT"
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                @prev-click="handlePageChange"
                @next-click="handlePageChange"
            >
            </el-pagination>
        </div>
        <!-- 分页 end -->

</div>
</template>

<script>
import { timeFormat } from '../../utils/timeFormat'
import { alertMsg } from '../../utils/msg'
export default {
    data(){
        return{
            theadBg: {background:'#eef1f6',color:'#606266'},
            pickerBeginDateBefore: {
                disabledDate(time) {
                    // -8.64e7
                    return time.getTime() > (Date.now());
                }
            },
            listLoading:true,
            search: {
                eventName:'',
                keywords:'',
                author:'',
                searchTime:'',
            },
            page : {
                "CURRPAGE": 1,
                "PAGESIZE": 20,
                "ITEMCOUNT": 0,
                "PAGECOUNT": 1
            },
            params: {
                method: 'post',
                url: '/cas/spread2v/event/main.do',
                data: {}
            },
            data: {
                event_list:[]
            },
            theadBg: {background:'#eef1f6',color:'#606266'}
        }
    },
    created(){
        this.requestData()
    },
    methods: {
        requestData() {
            var params = {
                method :'getPageEvent',
                startDate :	!!this.search.searchTime ? timeFormat(this.search.searchTime[0],true) : '',
                endDate	: !!this.search.searchTime ? timeFormat(this.search.searchTime[1], true) : '',
                pageNo	: this.page.CURRPAGE,
                pageSize : this.page.PAGESIZE,	
                eventName : this.search.eventName,	
                keywords :	this.search.keywords,
                createdUser	:	this.search.author,
            }
            this.params.data = params
            let that = this
            this.$http(that.params).then(function (data) {
                that.listLoading = false
                if(!data) return
                that.data.event_list = data.Records;
                that.page.ITEMCOUNT = data.TotalRecordCount;
                that.page.PAGECOUNT = Math.ceil(that.page.ITEMCOUNT/that.page.PAGESIZE)
            });
        },
        /**
         * 删除事件
         */
        deleteEvent(id){
            var params = {
                method :'deleteEvent',
                id : id
            }
            this.params.data = params
            let that = this
            this.$confrimmsg('是否永久删除选中记录?', '提示', 'warning' ,'删除',function(){
                that.$http(that.params).then(function () {
                    that.requestData();
                });
            });
        },
        handlePageChange(val){
            this.page.CURRPAGE = val 
            this.requestData()
        },
        handleSizeChange(val){
            this.page.PAGESIZE = val
            this.requestData()
        },
        fullTextSearch(){
            this.page.CURRPAGE = 1
            this.requestData()
        }

    }
}
</script>
<style lang="scss" scoped>
    .search-box{
        .search-item {
            width: unset;
            .search-item-input{
                width: 90%;
            }   
            .search-tab {
                color: #606266;
                line-height: 32px;
            }
        }
    }
</style>