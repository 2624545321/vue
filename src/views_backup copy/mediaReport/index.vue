<template>
    <div class="app-container">
        <div class="overflow_hidden">
             <el-date-picker
                v-model="status.searchTime"
                :picker-options="pickerBeginDateBefore"
                :clearable="false"
                type="daterange"
                align="left"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                size="small"
                :editable="false"
                class="fl">
            </el-date-picker>
            <el-button size="small" type="primary" @click="fullTextSearch">检索</el-button>
        </div>
        <!-- 列表开始 -->
        <!-- 集团稿件转载情况，中央媒体转载、区域媒体转载 -->
        <div class="overflow_hidden mt20">
            <p class="title">
                集团稿件转载情况
            </p>
            <div class="child_media mt10 overflow_hidden" >
                <span :class="{'activeas': status.selectGroup == '1'}" @click="getReprint(1)">中央</span>
                <span :class="{'activeas': status.selectGroup == '2'}" @click="getReprint(2)">地方</span>
            </div>
            <el-table
                class="mt10"
                v-loading="status.groupLoading"
                :data="result.grouplist"
                element-loading-text="Loading"
                :stripe='true'
                :header-cell-style="theadBg"
                fit
                highlight-current-row
            >
                <el-table-column align="center" label="序号" width="80">
                    <template slot-scope="scope">
                        {{ (scope.$index+1) + (page.group_page.PAGESIZE * (page.group_page.CURRPAGE - 1)) }}
                    </template>
                </el-table-column>
                <el-table-column label="标题" align="left" >
                    <template slot-scope="scope">
                        <a :href="'/spread/#/detail?guid='+scope.row.zbGuid" target="_blank" :title="scope.row.title">{{ scope.row.title }}</a>
                    </template>
                </el-table-column>

                <el-table-column label="媒体" align="center" width="200">
                    <template slot-scope="scope">
                        <span >{{ scope.row.mediaName }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="时间" align="center" width="200">
                    <template slot-scope="scope">
                        <span >{{ scope.row.pubTime | timeFormat('YYYY-MM-DD HH:mm:ss',true) }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                class="textCenter mt20"
                background
                :current-page="page.group_page.CURRPAGE"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page.group_page.PAGESIZE"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.group_page.ITEMCOUNT"
                :hide-on-single-page="true"
                @size-change="groupSizeChange"
                @current-change="groupCurrentChange"
                @prev-click="groupCurrentChange"
                @next-click="groupCurrentChange"
            >
            </el-pagination>
        </div>
        <!-- 同行业稿件列表 -->
        <!-- 中央媒体报道、行业媒体报道、地方媒体报道 -->
       
        <div class="overflow_hidden m220">
            <p class="title">
                集团稿件报道情况
            </p>
            <div class="child_media mt10 overflow_hidden" >
                <span :class="{'activeas': status.selectOhter == 'center'}" @click="getMediaReport('center')">中央</span>
                <span :class="{'activeas': status.selectOhter == 'industry'}" @click="getMediaReport('industry')">行业</span>
                <span :class="{'activeas': status.selectOhter == 'other'}" @click="getMediaReport('other')">地方</span>
            </div>
            <el-table
                class="mt10"
                v-loading="status.otherLoading"
                :data="result.otherlist"
                element-loading-text="Loading"
                :stripe='true'
                :header-cell-style="theadBg"
                fit
                highlight-current-row
                :cell-class-name="titleNowrap"
            >
                <el-table-column align="center" label="序号" width="80">
                    <template slot-scope="scope">
                        {{ (scope.$index+1) + (page.other_page.PAGESIZE * (page.other_page.CURRPAGE - 1)) }}
                    </template>
                </el-table-column>
                <!-- show-overflow-tooltip -->
                <el-table-column label="标题" align="left"  >
                    <template slot-scope="scope">
                        <a :href="'/spread/#/reportDetail?guid='+scope.row.ZB_GUID+'&indexname='+scope.row.INDEX" target="_blank" :title="scope.row.DOCTITLE">{{ scope.row.DOCTITLE }}</a>
                    </template>
                </el-table-column>

                <el-table-column label="媒体" align="center" width="200">
                    <template slot-scope="scope">
                        <span >{{ scope.row.IR_SITENAME }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="时间" align="center" width="200">
                    <template slot-scope="scope">
                        <span >{{ scope.row.DOCPUBTIME | timeFormat('YYYY-MM-DD HH:mm:ss',true) }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                class="textCenter mt20"
                background
                :current-page="page.other_page.CURRPAGE"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page.other_page.PAGESIZE"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.other_page.ITEMCOUNT"
                :hide-on-single-page="true"
                @size-change="otherSizeChange"
                @current-change="otherCurrentChange"
                @prev-click="otherCurrentChange"
                @next-click="otherCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>


<script>
import { timeFormat } from '../../utils/timeFormat'
import { calendarFormat } from 'moment';

    export default {
        data() {
            return {
                pickerBeginDateBefore: {
                    disabledDate(time) {
                        // -8.64e7
                        return time.getTime() > (Date.now());
                    }
                },
                params: {
                    method: 'get',
                    url: '/cas/spread2v/bigscreen/main.do',
                    params: {}
                },
                page:{
                    group_page: {
                        CURRPAGE: 1,
                        PAGESIZE: 10,
                        ITEMCOUNT : 0,
                        PAGECOUNT : 0, 
                    },
                    other_page: {
                        CURRPAGE: 1,
                        PAGESIZE: 10,
                        ITEMCOUNT : 0,
                        PAGECOUNT : 0, 
                    }
                },
                status: {
                    selectGroup: '1',
                    selectOhter: 'center',
                    groupLoading:true,
                    otherLoading: true,
                    searchTime:[timeFormat(new Date().getTime() - 24 * 7 * 60 * 60 * 1000,true), timeFormat(new Date(),true)]
                },
                result: {
                    grouplist:[],
                    otherlist: [],
                },
                theadBg: {background:'#eef1f6',color:'#606266'}
            }
        },
        created() {
            this.getReprint()
            this.getMediaReport('center')
        },
        methods: {
            fullTextSearch(){

                this.getReprint()
                this.getMediaReport('center')
            },    
             /**
             * 中央媒体报道
             */
            getMediaReport(type){
                this.status.otherLoading = true
                if (!!type) {
                    this.status.selectOhter = type
                    this.page.other_page.CURRPAGE = 1
                }
                var postparams={
                    url: "/zyzx/bigscreen/getbigscreendata",
                    method: 'post',
                    data: {
                        pageNum: this.page.other_page.CURRPAGE,
                        pageSize: this.page.other_page.PAGESIZE,
                        searchType: this.status.selectOhter,
                        endDate: timeFormat(this.status.searchTime[1]),
                        startDate: timeFormat(this.status.searchTime[0])
                    }
                }
                let that = this
                this.$http(postparams).then(function (res) {
                    that.status.otherLoading = false
                    that.result.otherlist = res.Records
                    that.page.other_page.ITEMCOUNT = res.TotalRecordCount;
                    that.page.other_page.PAGECOUNT = Math.ceil(that.page.other_page.ITEMCOUNT/that.page.other_page.PAGESIZE);
                
                }).catch(function (err) {
                    console.log(err);
                })
            },
            /**
             * 
             */
            getReprint(type){
                 // type    中央 1，地方 2
                if(!!type){
                    this.status.selectGroup = type
                    this.page.group_page.CURRPAGE = 1
                }
                var params = {
                    mediaLevel: this.status.selectGroup,
                    method: 'getReprint',
                    pageNo: this.page.group_page.CURRPAGE,
                    pageSize: this.page.group_page.PAGESIZE,
                    serviceSource: 'getReprint',
                    endDate: timeFormat(this.status.searchTime[1]),
                    startDate: timeFormat(this.status.searchTime[0])
                }
                this.params.params = Object.assign(this.params.params,params)
                let that = this
                this.$http(that.params).then(function (res) {
                    that.status.groupLoading = false
                    that.result.grouplist = res.Records;
                    that.page.group_page.ITEMCOUNT = res.TotalRecordCount;
                    that.page.group_page.PAGECOUNT = Math.ceil(that.page.group_page.ITEMCOUNT/that.page.group_page.PAGESIZE);
                
                }).catch(function (err) {
                    console.log(err);
                })
            },
            groupCurrentChange(val){
                this.page.group_page.CURRPAGE = val;
                this.getReprint()
            },
            groupSizeChange(val){
                this.page.group_page.PAGESIZE = val;
                this.getReprint()
            },
            otherCurrentChange(val){
                this.page.other_page.CURRPAGE = val
                this.getMediaReport()
            },
            otherSizeChange(val){
                this.page.other_page.PAGESIZE = val
                this.getMediaReport()
            },
            titleNowrap(row){
               if(row.columnIndex == 1){
                   return 'titleNowrap'
               }
            }

        },
        filters:{
            timeFormat(value,type,flag){
                return timeFormat(value,flag,type)
            }
        }
    }
</script>
<style scoped>
    .title {
        font-size: 18px;
        font-weight: bold;
        color: #606266
    }
    .el-button {
        margin-left: 20px;
    }
</style>