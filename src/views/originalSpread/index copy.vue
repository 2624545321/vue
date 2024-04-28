<template>
    <div class="app-container">
        <!-- 检索 -->
        <div class="search-box overflow-hidden">
            <div class="search-item fl">
                <el-input class="search-item-input fl" size="small"  v-model="status.staffName" placeholder="标题、正文" clearable/>
            </div>
            <div class="search-item fl">
                <el-input class="search-item-input fl" size="small" v-model="status.zbReporter" placeholder="作者" clearable/>
            </div>
            <div class="search-item fl">
                <el-select v-model.lazy="status.selectProductText" size="small" placeholder="请选择" class="search-item-input fl"  @change="selectProduct($event)">
                    <el-option v-for="(item,index) in data.channel_data" :key="index" :label="item.showName" :value="item.cod">{{ item.showName }}</el-option>
                </el-select>
            </div>
            <div class=" search-time fl">
                <el-date-picker
                    v-model="data.searchTime"
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
            </div>
            <!-- <div class="clear-both"></div> -->
            <div class="search-item fl">
                <el-input class="search-item-input fl" size="small" v-model="status.startExp" placeholder="最小传播力" clearable/>
            </div>
            <div class="fl">
                <span class="fl search-tab">至：</span>
            </div>
            <div class="search-item fl">
                <el-input class="search-item-input fl" size="small" v-model="status.endExp" placeholder="最大传播力" clearable/>
            </div>
            <!-- <div class="search-item fl"> -->
            <el-button class="fr" size="small" type="primary" @click="fullTextSearch">检索</el-button>
            <!-- </div> -->
        </div>
        <!-- 分类 -->
        <div class="child_media overflow_hidden">
            <span :class="{'activeas': status.currentMedia == 'all'}" @click="selectMedia('all')">全部</span>
            <!-- v-show="item.isshow"  -->
            <span  v-for="(item,index) in data.child_media_data" :key="index" :class="{'activeas':status.currentMedia == item}" @click="selectMedia(item)">{{ item }}</span>
        </div>
        <!-- table -->
        <el-table class="mt20"
            v-loading="listLoading"
            :data="data.datalist"
            :stripe='true'
            element-loading-text="Loading"
            :header-cell-style="theadBg"
            fit
            highlight-current-row
            @sort-change="sortChange"
            :default-sort = "{prop: 'ceiIndex', order: 'descending'}"
        >
            <el-table-column align="center" label="序号" width="80">
                <template slot-scope="scope">
                {{ (scope.$index+1) + (page.list.PAGESIZE * (page.list.CURRPAGE - 1)) }}
                </template>
            </el-table-column>
             <el-table-column label="标题" align="left"  width="300">
                <template slot-scope="scope">
                    <a :href="'/spread/#/detail?guid='+scope.row.zbGuid" target="_blank" v-html="scope.row.title">{{ scope.row.title }}</a>
                    <!-- <router-link :to="{ name: 'detail',params:{metadataid:scope.row.zbGuid, articletype:0}}" tag="a" target="_blank" >{{ scope.row.title }}</router-link> -->
                    <!-- <span :title="scope.row.title">{{ scope.row.title }}</span> -->
                </template>
            </el-table-column>
            <el-table-column label="作者" align="center">
                <template slot-scope="scope">
                    <span :title="scope.row.author">{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column label="渠道" align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.mediaType == '电子报'" :title="scope.row.editionName">{{ scope.row.editionName }}</span>
                    <span v-else :title="scope.row.docChannle">{{ scope.row.docChannel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发稿日期" 
                align="center"
                width="180" 
                sortable='custom'
                prop="pubTime"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.mediaType == '电子报'">{{ scope.row.pubTime | timeFormat('YYYY-MM-DD',true) }}</span>
                    <span v-else>{{ scope.row.pubTime | timeFormat('YYYY-MM-DD HH:mm:ss',true) }}</span>
                </template>
            </el-table-column>
            <el-table-column label="网媒" align="center" width="90" sortable='custom' prop="websiteCount">
                <template slot-scope="scope">
                    <span v-if="scope.row.websiteCount != 0 " class="cursor" @click="getArticleReprintPage(scope.row.zbGuid,'网站')">{{ scope.row.websiteCount }}</span>
                    <span v-else >{{ scope.row.websiteCount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="客户端" align="center" width="90" sortable='custom' prop="appCount">
                <template slot-scope="scope">
                    <span v-if="scope.row.appCount != 0 " class="cursor" @click="getArticleReprintPage(scope.row.zbGuid,'APP')">{{ scope.row.appCount }}</span>
                    <span v-else >{{ scope.row.appCount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="微信" align="center" width="90" sortable='custom' prop="wxCount">
                <template slot-scope="scope">
                    <span v-if="scope.row.wxCount != 0 " class="cursor" @click="getArticleReprintPage(scope.row.zbGuid,'微信')">{{ scope.row.wxCount }}</span>
                    <span v-else >{{ scope.row.wxCount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="自媒体" align="center" width="90" sortable='custom' prop="weMediaCount">
                <template slot-scope="scope">
                    <span v-if="scope.row.weMediaCount != 0 " class="cursor"  @click="getArticleReprintPage(scope.row.zbGuid,'第三方公众平台')">{{ scope.row.weMediaCount }}</span>
                    <span v-else >{{ scope.row.weMediaCount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="传播力" align="center" width="90" sortable='custom' prop="ceiIndex">
                <template slot-scope="scope">
                    <span >{{ scope.row.ceiIndex }}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            class="textCenter mt20"
            background
            :current-page="page.list.CURRPAGE"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page.list.PAGESIZE"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.list.ITEMCOUNT"
            :hide-on-single-page="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="handleCurrentChange"
            @next-click="handleCurrentChange"
        >
        </el-pagination>
        <div class="mt20" id="line_bar" style="width:50%;height:380px;"></div>
        <!-- 稿件转载列表 -->
        <doc-repost :modal-obj='dialog.modalObj' :modal-show.sync="dialog.modalVisible"></doc-repost>
    </div>
</template>
<script>
import { timeFormat } from '../../utils/timeFormat'
import  docRepost  from '@/components/util/docRepost'
export default {
    components: {
        docRepost
    },
    data() {
        console.log(this.$route.params)
        var stateParams = this.$route.params
        return {
            theadBg: {background:'#eef1f6',color:'#606266'},
            pickerBeginDateBefore: {
                disabledDate(time) {
                    // -8.64e7
                    return time.getTime() > (Date.now());
                }
            },
            listLoading: true,
            dialog: {
                modalObj:{
                    startDate : '',
                    endDate : '',
                    searchWord: '',
                    media_type:'',
                    zbGuid:'',
                },
                modalVisible: false,
            },
            data: {
                channel_data: [
                    {
                        showName:'全部',
                        cod:''
                    },
                    {
                        showName:'报纸',
                        cod:'5'
                    },
                    {
                        showName:'网站',
                        cod:'1'
                    },
                    {
                        showName:'客户端',
                        cod:'7'
                    },
                    {
                        showName:'微信',
                        cod:'8'
                    }
                ],
                searchTime:[timeFormat(new Date().getTime() - 7 * 24 * 60 * 60 * 1000,true), timeFormat(new Date(),true)],
                child_media_data:[],
                datalist:[],
            },
            params: {
                method: 'post',
                url: '/cas/spread2v/homepage/main.do',
                data: {}
            },
            page : {
                list: {
                    ITEMCOUNT: 0,
                    PAGECOUNT: 0,
                    PAGESIZE: 20,
                    CURRPAGE: 1,
                },
            },
            status: {
                orderType:'DESC',
                staffName:'',
                zbReporter:'',
                selectProductText:'全部',
                startExp:'',
                endExp:'',
                currentMedia:'all',
                channel_search_type:'',
                articleFType: 1,
                page_no: '1',
                page_size: '20',
                orderBy: "ceiIndex",
                productType: stateParams.mediatype ,
                startTime: !!stateParams.starttime ? stateParams.starttime : timeFormat(new Date(),true), //InfluenceTable_tpl.html
                endTime: !!stateParams.endtime ? stateParams.endtime: timeFormat(new Date(),true),
            },
        }
    },
    created() {
        this.status.selectProductText = !!this.$route.params.mediatype ? this.getChannelText() : '全部'
        this.params.data = {
            startDate : timeFormat(this.data.searchTime[0]),
            endDate : timeFormat(this.data.searchTime[1]),
            searchWord: this.status.search_word,
        }
        this.getMediaByChannelType()
        this.getReprintAndIndexTrend()
        this.InfluenceTableData()
    },
    methods: {
        getChannelText(){
            var channellist = this.data.channel_data
            var productType = ''
            for (let i = 0; i < channellist.length; i++) {
                if(channellist[i].cod == this.$route.params.mediatype){
                    productType = channellist[i].showName
                    break
                }
            }
            return productType
        },
        selectMedia(media) {
            this.status.currentMedia = media
        },
        getMediaByChannelType(){
            var postParams = {
                method:'post',
                url: '/cas/spread2v/homepage/main.do',
                data: {
                    method : "getMediaByChannelType",
                    startDate : timeFormat(this.data.searchTime[0]),
                    endDate : timeFormat(this.data.searchTime[1]),
                    searchWord: this.status.search_word,
                    params:{
                        channelType : this.status.productType,
                    }
                }
            }
            postParams.data.params = JSON.stringify(postParams.data.params)
            let that = this
            this.$http(postParams).then(function (data) {
                that.data.child_media_data = data.Records
                // for (let i = 0; i < data.Records.length; i++) {
                //     var element1 = data.Records[i];
                //     for (let j = 0; j < that.data.child_media_data.length; j++) {
                //        var element2 = that.data.child_media_data[j]
                //        if(element1 == element2.name){
                //             element2.isshow = true
                //        }
                        
                //     }
                // }
            });
        },
        InfluenceTableData(){
            this.listLoading = true
            var startMedia = this.status.currentMedia == 'all' ? '' : this.status.currentMedia
            var params = {
                interfaceType : 2,
                levelType: this.status.articleFType,
                model: this.status.orderType,
                startExp: this.status.startExp,
                endExp: this.status.endExp,
                startTime: timeFormat(this.data.searchTime[0],true) + " 00:00:00",
                endTime: timeFormat(this.data.searchTime[1],true) + " 23:59:59",
                orderBy: this.status.orderBy,
                pageNo: this.page.list.CURRPAGE,
                pageSize: this.page.list.PAGESIZE,
                staffName : this.status.staffName,
                zbReporter : this.status.zbReporter,
                dataType : 0,
                channelType : this.status.productType,
                startMedia : startMedia,

                typeid:'cas',
                // serviceid: 'xhs/articleDetail/',
                // modelId:'main.do',
                method:'searchCeiToOutServiceModi',

            }
            this.params.url='/cas/xhs/articleDetail/main.do'
            this.params.data = params
            let that = this
            this.$http(that.params).then(function (data) {
                that.listLoading = false
                that.data.datalist = data.Records;
                that.page.list.ITEMCOUNT=data.TotalRecordCount;
                that.page.list.PAGECOUNT=Math.ceil(data.TotalRecordCount / that.status.page_size);
            });
        },
        handleSizeChange(value){
            this.page.list.PAGESIZE = value
            this.InfluenceTableData()
        },
        handleCurrentChange(val){
            this.page.list.CURRPAGE = val
            this.InfluenceTableData()
        },
        fullTextSearch(){
            this.page.list.CURRPAGE = 1
            this.InfluenceTableData()
            this.getReprintAndIndexTrend()
        },
        selectMedia(item){
            this.status.currentMedia = item;
            this.InfluenceTableData();
        },
        selectProduct(val){
            this.status.currentMedia = 'all';
            // this.status.selectProductText = product.showName;
            this.status.productType = val;
            this.getMediaByChannelType();
            this.InfluenceTableData();
        },
        /**
         * 渠道发稿
         */
        getReprintAndIndexTrend(){
            let productType = this.status.currentMedia == 'all' ? '' : this.status.currentMedia
             var params = {
                method : 'getReprintAndIndexTrend',
                startDate : timeFormat(this.data.searchTime[0]),
                endDate : timeFormat(this.data.searchTime[1]),
                searchWord : this.status.search_word,
                params :{
                    productType : productType,
                    channelType : this.status.channel_search_type
                }
            }
            params.params = JSON.stringify(params.params);
            var postParams = {
                url : '/cas/spread2v/homepage/main.do',
                method:"post",
                data: params
            }
            
            let that = this
            this.$http(postParams).then(function (result) {
                var data = result.Records;
                var yAxis_data = data.channelList;
                var index = yAxis_data.indexOf("APP");
                yAxis_data.splice(index,1,'客户端');
                that.lineBar(yAxis_data, data.countTrend)
            });
        },
        lineBar(yAxis_data,countTrend){
            var series_data = new Array(yAxis_data.length)
            for(let key in countTrend){
                if(key != 'dateList'){
                    var sum = 0
                    for (let i = 0; i < countTrend[key].length; i++) {
                        sum += countTrend[key][i];
                    }
                    countTrend[key] = sum
                }

            }
            for (let i = 0; i < yAxis_data.length; i++) {
               if(yAxis_data[i] == '电子报'){
                    series_data[i] = countTrend.dzbList
               } else if(yAxis_data[i] == '网站') {
                   series_data[i] = countTrend.websiteList
               } else if (yAxis_data[i] == '客户端') {
                   series_data[i] = countTrend.appList
               } else if (yAxis_data[i] == '微信') {
                   series_data[i] = countTrend.weiXinList
               }
                
            }
            var option = {
                title: {
                    text:'渠道发稿量',
                    textStyle:{
                        color:'#666',
                        // color:'#169BD5',
                        fontWeight:'normal',
                        lineHeight:10
                    },
                    x:'center',
                    y:'bottom',
                },
                color: ['#169BD5'],
                yAxis: {
                    type: 'category',
                    data: yAxis_data,
                    splitLine: {
                        show: true,
                        lineStyle:{
                            type:'dashed'
                        }
                    },
                    name:'媒体'
                },
                xAxis: {
                    type: 'value',
                    splitLine: {
                        show: false,
                    },
                    name:'发稿量'
                },
                grid : {
					top:'10%',
					left : 0, 
					right : '10%',
					bottom : '10%',
					containLabel : true  //grid 区域是否包含坐标轴的刻度标签
				},
                series: [{
                    data: series_data,
                    type: 'bar',
                    barWidth: '80%',
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    },
                    cursor:'text',
                }]
            };
            let myChart = this.$echarts.init(document.getElementById('line_bar'));
            myChart.setOption(option);
        },
        sortChange( column,){
            if(!column.order) return
            this.status.orderBy = column.prop
            this.status.orderType = column.order == "ascending" ? "ASC" : 'DESC'
            this.InfluenceTableData()
        },
        getArticleReprintPage(id,media_type){
            this.dialog. modalObj.startDate = timeFormat(this.data.searchTime[0])
            this.dialog.modalObj.endDate = timeFormat(this.data.searchTime[1])
            this.dialog.modalObj.searchWord = this.status.search_word
            this.dialog.modalObj.zbGuid = id
            this.dialog.modalObj.media_type = media_type;
            this.dialog.modalVisible = true;
        },
        
        
    },
    
    filters:{
        timeFormat(value,type,flag){
            return timeFormat(value,flag,type)
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        padding-bottom: .5rem;
    }
    .meida-type-box{
        overflow: hidden;
        margin-bottom: 20px;
        span{
            display: inline-block;
            margin-right: 15px;
            padding: 8px 14px;
            color: #606266;
            border: 1px solid #EBEEF5;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
        }
        .is-active{
            border-color: #409EFF;
            color: #409EFF;
        }
    }
    .search-box{
        .search-item {
            width: 150px;
            .search-item-input{
                width: 90%;
            }   
            .el-input--suffix .el-input__inner{
                padding-right: 25px;
            }
            
        }
        .search-tab {
            color: #606266;
            line-height: 32px;
            font-size: 13px;
        }
        .search-time {
            margin-right: 15px;
        }
        .el-date-editor--daterange.el-input__inner{
            width: 320px;
        }
        .el-date-editor .el-range-input{
            text-align: left;
        }
    }

</style>