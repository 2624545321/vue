<template>
    <div class="app-container">
        <div class="create_event">
            <!-- 信息 -->
            <div v-if='status.eventInfo'>
                <div class="clear_both"></div>
                <div class="overflow_hidden addevent" style="width: 80%;margin:20px auto">
                    <div class="fl eventtags">
                        <p><span class="red">* </span>标题：</p>
                        <p><span class="red">* </span>持续时间：</p>
                        <p><span class="red">* </span>关键词：</p>
                        <p>地点：</p>
                        <p>人物：</p>
                        <p>描述：</p>
                    </div>
                    <div class="fl eventcont">
                        <p>
                            <el-input class="border_box textinput" size="small"   v-model="data.event.eventName" placeholder="请输入标题" />
                        </p>
                        <p>
                            <!-- :picker-options="pickerBeginDateBefore" -->
                            <el-date-picker
                                v-model="data.event.searchTime"
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
                        </p>
                        <p>
                            <el-input  size="small" class="border_box textinput" placeholder="请输入关键词，多个用“，”隔开" v-model="data.event.keywords" />
                        </p>
                        <p>
                            <el-input  size="small" class="border_box textinput" placeholder="请输入发生地点" v-model="data.event.place" />
                        </p>
                        <p>
                            <el-input  size="small" class="border_box textinput" placeholder="请输入人物" v-model="data.event.characters" />
                        </p>  
                            <el-input type="textarea" class="border_box" placeholder="请输入详细描述" v-model="data.event.eventDescribe" />
                          
                    </div>
                </div>
                
                <div class="clear_both"></div>
                <div class="btnblock"> 
                    <el-button  size="small" type="primary" @click="next" :disabled="!data.event.eventName || !data.event.searchTime || !data.event.keywords">下一步</el-button>
                    <router-link :to="{ name: 'event' }" tag="button" class="reset el-button--small el-button--primary el-button">取消</router-link> 
                </div>
            </div>

            <div v-if="status.relationDoc">
                <div class="overflow_hidden">
                    <el-button size="small" type="primary" @click="saveDocList()" :disabled="data.right_doc_list.length===0"> 确认关联 </el-button>
                    <el-button size="small" type="primary" @click="showSelectList" > 查看已选稿件 </el-button>
                </div>
                
                <div class="edit_right_mid mt20 overflow_hidden">
                    <div class="edit_mid_received_left">
                        <div class="disaster_rili eventdoc" style="padding-left:0">
                            <el-date-picker
                                v-model="doc_search.searchTime"
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
                            <span class="meidaTab">媒体：</span>
                            <el-select size="small" v-model="data.product_type" filterable placeholder="请选择" @change="getLable">
                                <el-option
                                    v-for="item in data.media_list"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                            <span v-show="data.product_type" >
                                <!-- <trs-checkbox ischecked="status.resetallbm" callback="resetall()"></trs-checkbox> -->
                                <span @click="restall" v-if='status.resetallbm'>取消选择</span>
                            </span>
                        </div>
                    </div>
                    <div class="edit_mid_received_right">
                        <div class="input-group edit_input_group">
                            <el-input size="small" v-model="doc_search.keywords" placeholder="请输入关键字搜索" @keypress="resetall($event)" />
                            <el-button size="small" type="primary" class="fr" @click="searchfull()">检索</el-button>
                        </div>
                    </div>
                </div>
                <div class=" overflow_hidden mt20" v-if="data.product_type == '中国航空报'">
                    <div class="overflow_hidden channel_box first" >
                        <div class="channel_tab" >版面：</div>
                        <div class="channel_item">
                            <span class="bm-item" >
                                <el-checkbox-group v-model="data.selectBmArray">
                                    <el-checkbox  v-for="(item,index) in data.bmlist" :key="index" :label="item.name"></el-checkbox>
                                </el-checkbox-group>
                            </span>
                        </div>
                        <div class="channel_more">
                            <a @click="showMore('first')" v-show="status.show_more_first">更多</a>
                            <a @click="closeMore('first')" v-show="!status.show_more_first">收起</a>
                        </div>
                    </div>
                    <!-- <div class="overflow_hidden mt10 channel_box second">
                        <div class="channel_tab">栏目：</div>
                        <div class="channel_item">
                            <span class="bm-item" >
                                <el-checkbox-group v-model="data.selectChnlArray">
                                    <el-checkbox  v-for="(item,index) in data.channellist" :key="index" :label="item.name"></el-checkbox>
                                </el-checkbox-group>
                            </span>
                        </div>
                        <div class="channel_more">
                            <a @click="showMore('second')" v-show="status.show_more_second">更多</a>
                            <a @click="closeMore('second')" v-show="!status.show_more_second">收起</a>
                        </div>
                    </div> -->
                    
                </div>
                <!-- style="min-height:unset" -->
                <div class="edit_table border_radius_5 mt10" >
                    <el-table class="mt20"
                        :data="data.left_doc_list"
                        element-loading-text="Loading"
                        v-loading="listLoading"
                        :stripe='true'
                        :header-cell-style="theadBg"
                        fit
                        highlight-current-row
                        @selection-change="handleSelectionChange"
                        :row-key="getRowKeys"
                        ref="relationList"
                    >
                        <el-table-column align="center"  width="30" type="selection" :reserve-selection="true"></el-table-column>
                        <el-table-column align="center" label="序号" width="80">
                            <template slot-scope="scope">
                                {{ (scope.$index+1) + (page.PAGESIZE * (page.CURRPAGE - 1)) }}
                            </template>
                        </el-table-column>
                        <el-table-column align="left" label="标题" >
                            <template slot-scope="scope">
                                <a target="_blank" :href="'/spread/#/detail?guid='+scope.row.zbGuid" :title="scope.row.title">{{ scope.row.title }}</a>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="日期" width="120">
                            <template slot-scope="scope">
                                <span>{{ scope.row.pubTime | timeFormat('YYYY-MM-DD',true) }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="作者" width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.author }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="媒体" width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.mediaName }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        class="textCenter mt20"
                        background
                        :current-page="page.CURRPAGE"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="page.PAGESIZE"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.ITEMCOUNT"
                        :hide-on-single-page="true"
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        @prev-click="handleCurrentChange"
                        @next-click="handleCurrentChange"
                    >
                   
                    </el-pagination>
                </div>
            </div>
            
            <!-- 已选稿件 -->
            <el-dialog title="已选稿件列表" :visible.sync="status.relateListStatus"  width="80%" custom-class="relation-box"
                :close-on-press-escape="false"
                :close-on-click-modal="false"
            >
                <el-button type="primary" size="small" class="mb10" @click="resetdoc" :disabled="data.selectRightArray.length === 0">取消选择</el-button>
                <el-table
                    :data="data.right_doc_list"
                    element-loading-text="Loading"
                    :stripe='true'
                    :header-cell-style="theadBg"
                    fit
                    highlight-current-row
                    @selection-change="selectionChange"
                    :row-key="getRowKeys"
                >
                    <el-table-column align="center"  width="30" type="selection" ></el-table-column>
                    
                    <el-table-column align="left" label="标题" >
                        <template slot-scope="scope">
                            <a target="_blank" :href="'/spread/#/detail?guid='+scope.row.zbGuid" :title="scope.row.title">{{ scope.row.title }}</a>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="日期" width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.pubTime | timeFormat('YYYY-MM-DD',true) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="作者" width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.author }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="媒体" width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.mediaName }}</span>
                        </template>
                    </el-table-column>

                </el-table>
                <div class="btn-box mt10">
                    <el-button type="primary" size="small" @click="saveDocList">确定关联</el-button>
                    <el-button type="info" size="small" @click="status.relateListStatus = false">取消</el-button>
                </div>

            </el-dialog>

        </div>
    </div>
</template>
<script>
import { timeFormat } from '../../utils/timeFormat'
import $ from 'jquery'
export default {
    data(){
        return {
            theadBg: {background:'#eef1f6',color:'#606266'},
            pickerBeginDateBefore: {
                disabledDate(time) {
                    // -8.64e7
                    return time.getTime() > (Date.now());
                }
            },
            listLoading: true,
            status: {
                showBm: true,
                eventInfo:true,
                relationDoc: false,
                isCreate: !this.$route.params.eventid ? true : false,
                relateListStatus:false,
                checked_all:false,   //关联稿件列表是否全选
                checked_all_length: 0,
                copyCurrPage: 1,
                show_more_first: true,
                show_more_second: true,
                resetallbm: false,
                searchTime:[],
                batchOperateBtn : {
                    "hoverStatus": "",
                }
            },
            params: {
                method: 'post',
                url: '/cas/spread2v/event/main.do',
                data: {}
            },
            data: {
                event: {
                    eventName: '',
                    startDate:'',
                    endDate:'',
                    keywords:'',
                    place: '',
                    characters: '',
                    eventDescribe:'',
                    ids:[],
                },
                checked_ids:'',
                right_doc_list:[],
                constRightList:[],
                copySelectRightArray:[],
                event_id: !!this.$route.params ? this.$route.params.eventid : '',
                media_list:[],
                product_type:'',
                selectedArray: [], //已选
                selectRightArray : [],
                selectBmArray: [],
                selectChnlArray: [],
                left_doc_list:[],
                bmlist:[],
                channellist:[],
            },
            doc_search : {
                keywords : '',
                startDate:'',
                endDate:'',
                searchTime:[]
            },
            page: {
                "CURRPAGE": 1,
                "PAGESIZE": 20,
                "ITEMCOUNT": 0,
                "PAGECOUNT": 1
            }
        }
    },
    created(){
        this.data.event.startDate = this.status.searchTime[0]
        this.data.event.endDate = this.status.searchTime[1]
        if(!!this.$route.params.eventid){
            this.getEventById()
        }
    },
    methods: {
        /**
         * 设置反选
         */
        rowMultipleChecked() {
    　　    for (let i = 0; i < this.data.left_doc_list.length; i++) {
　　            for (let j = 0; j < this.data.right_doc_list.length; j++) {//这里我用到了双重for循环 data.left_doc_list这是所有信息
                    if (this.data.right_doc_list[j].zbGuid == this.data.left_doc_list[i].zbGuid) {
                        if(this.$refs.relationList!=undefined){//解决下面用relationList不报错 relationList我是在table ref定义的
                            this.$refs.relationList.toggleRowSelection(this.data.left_doc_list[i]);//这个就是回显的核心
                        }
                    } 
                }
            }
        },
        getRowKeys(row){
            return row.zbGuid;
        },
        handleSelectionChange(vals){
            this.data.selectedArray = vals
            for (let i = 0; i < vals.length; i++) {
               if(this.data.event.ids.indexOf(vals[i].id) < 0){
                   this.data.right_doc_list.push(vals[i])
                   this.data.event.ids.push(vals[i].id)
               } 
            }
        },
        showSelectList(){
            // this.data.right_doc_list = this.data.constRightList.concat([])
            this.status.relateListStatus = true
            // let val = this.data.selectedArray
            // for (let i = 0; i < val.length; i++) {
            //    if(this.data.event.ids.indexOf(val[i].id) < 0){
            //        this.data.right_doc_list.push(val[i])
            //    } 
            // }
        },
        selectionChange(val){
            this.data.selectRightArray = val
        },
        resetdoc(){
            let val = this.data.selectRightArray
            this.data.copySelectRightArray = val.concat([])

            let relationlist = this.data.left_doc_list
            for (let j = 0; j < relationlist.length; j++) {
                for (let i = 0; i < val.length; i++) {
                    if(val[i].zbGuid == relationlist[j].zbGuid){
                        this.$refs.relationList.toggleRowSelection(relationlist[j],false);//这个就是回显的核心
                    }
                }
            }
            
            let that = this
            setTimeout(function(){
                if(val.length == that.data.event.ids.length){
                    that.data.right_doc_list = []
                    that.data.event.ids = []
                    // this.$refs.relationList.toggleAllSelection(true);//这个就是回显的核心
                }else {
                    for (let i = 0; i < val.length; i++) {
                        let index = that.data.event.ids.indexOf(val[i].id)
                        if(index > -1){
                            that.data.right_doc_list.splice(index,1)
                            that.data.event.ids.splice(index,1)
                        } 
                    }
                }
            },500)
        },
        handleSizeChange(val){
            this.page.PAGESIZE = val
            this.getRelationList()
        },
        handleCurrentChange(val){
            this.page.CURRPAGE = val
            this.getRelationList()
        },
        /**
         * 根据主键获取事件详情
         */
        getEventById(){
            var params = {
                method : 'getEventById',
                id : this.$route.params.eventid
            }
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                data.Records.searchTime = [data.Records.startDate, data.Records.endDate]
                that.data.event = data.Records;
                // 获取关联稿件。
                if(data.Records.articleNumber != 0){
                    var ids = [];
                    data.Records.articleCEIResultVOList.forEach(function(item){
                        ids.push(item.id);
                    })
                    that.data.event.ids = ids;
                    that.data.checked_ids = ids;
                }

            });
        },
        next(){
            this.doc_search.searchTime = this.data.event.searchTime
            this.doc_search.keywords = this.data.event.keywords;
            if(!this.status.isCreate){
                this.data.right_doc_list = this.data.event.articleCEIResultVOList;
                this.data.constRightList = this.data.event.articleCEIResultVOList;
            }
            if(this.status.isCreate){
                // 创建
                this.createEvent().then(function(data){
                    if(!data || data.Result != 'OK'){
                       return
                    }
                })
            }else{
                // 修改
                this.updateEvent().then(function(data){
                    if(!data || data.Result != "OK") {
                       return
                    }
                })
            }
            this.status.eventInfo = false;
            this.status.relationDoc = true;
            this.getMediaByChannelType()
            this.getRelationList()
        },
        /**
         * 创建
         */
        createEvent(){
            return new Promise((resolve, reject) => {
                var params = {
                    method : 'save',
                    event : {
                        // createdUserId: $rootScope.userinfo.ID,
                        // createdUser: $rootScope.userinfo.TRUENAME,
                        eventName : this.data.event.eventName,
                        keywords: this.data.event.keywords,
                        startDate: this.data.event.searchTime[0],
                        endDate: this.data.event.searchTime[1],
                        place: this.data.event.place,
                        characters: this.data.event.characters,
                        eventDescribe:this.data.event.eventDescribe
                    },
                }
                params.event = JSON.stringify(params.event);
                this.params.data = Object.assign(this.params.data,params)
                let that = this
                this.$http(that.params).then(function (data) {
                    that.data.event_id = data.Records;
                    resolve(data.Records);
                });
            }).catch( err => {
                console.log(err)
                reject()
            })
        },
        /**
         * 修改
         */
        updateEvent(){
            return new Promise((resolve, reject) => {
                var params = {
                    method : 'updateEvent',
                    event : {
                        eventName : this.data.event.eventName,
                        keywords : this.data.event.keywords,
                        startDate: this.data.event.searchTime[0],
                        endDate: this.data.event.searchTime[1],
                        place : this.data.event.place,
                        characters : this.data.event.characters,
                        articleNumber :this.data.event.articleNumber,
                        eventDescribe:this.data.event.eventDescribe,
                        id:this.data.event_id
                    },
                    ids:this.data.event.ids
                }
                params.event = JSON.stringify(params.event);
                params.ids = JSON.stringify(params.ids);
                this.params.data = Object.assign(this.params.data,params)
                let that = this
                
                this.$http(that.params).then(function(data){
                   resolve(data)
                });
            }).catch(err => {
                reject()
            })
        },
        /**
         * 
         */
        getRelationList(){
            this.listLoading = true
            this.status.checked_all = false
            // 设置版面和栏目检索样式初始化
            this.status.show_more_first = true
            this.status.show_more_second = true
            $(".channel_box.first").css('height','26px')
            $(".channel_box.second").css('height','26px')
            
            var keywords = this.doc_search.keywords;
            var keywordsarr = keywords.split(/，|,|;|；|、| /);
            var arr = []
            keywordsarr.forEach(function(item){
                if(!!item){
                    arr.push(item)
                }
            })
            var params = {
                method : 'getPageArticle',
                startDate : timeFormat(this.doc_search.searchTime[0]),
                endDate : timeFormat(this.doc_search.searchTime[1]),
                searchWord : arr.toString(),
                params : {
                    page: this.page.CURRPAGE,
                    pageSize:this.page.PAGESIZE,
                    productType :this.data.product_type,
                    BM: this.data.selectBmArray.toString(),
                    DOCCHANNEL: this.data.selectChnlArray.toString()
                },
            }
            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function(data){
                that.data.copySelectRightArray = []
                that.listLoading = false
                that.data.left_doc_list = data.Records;
                that.page.ITEMCOUNT = data.TotalRecordCount;
                that.page.PAGECOUNT = Math.ceil(that.page.ITEMCOUNT/that.page.PAGESIZE)
                // 处理选中
                setTimeout(function(){
                    that.rowMultipleChecked()
                },100)
            });
        },
       
        saveDocList() {
            var list = this.data.selectRightArray.length>0 ?this.data.selectRightArray : this.data.right_doc_list
            this.data.event.articleNumber = list.length;
            var ids = []
            list.forEach(function(item){
                ids.push(item.id);
            })
            this.data.event.ids = ids;
            let that = this
            this.updateEvent().then(function(data){
                if(!!data && data.Result == "OK") {
                    that.$msg("关联成功",'success')
                    // 跳转到列表页面
                    that.$router.push(`/event`)
                }
            });
        },
        resetall() {
            this.status.resetallbm = !this.status.resetallbm;
            if(this.status.resetallbm){
                this.data.bmlist.forEach(function(item) {
                    item.ischecked = false
                })
                this.data.channellist.forEach(function(item) {
                    item.ischecked = false
                })
            }
        },
        searchfull() {
            this.page.CURRPAGE = 1;
            this.getRelationList()
        },
        showMore (type){
            if(type == 'first'){
                this.status.show_more_first = false
            }else {
                this.status.show_more_second = false
            }
            var classname = ".channel_box."+type
            $(classname).css('height','unset')
        },
        closeMore (type){
            if(type == 'first'){
                this.status.show_more_first = true
            }else {
                this.status.show_more_second = true
            }
            var classname = ".channel_box."+type
            $(classname).css('height','26px')
        },
        getMediaByChannelType(){
            var postParams = {
                method:'post',
                url: '/cas/spread2v/homepage/main.do',
                data: {
                    method : "getMediaByChannelType",
                    startDate : timeFormat(this.data.event.searchTime[0]),
                    endDate : timeFormat(this.data.event.searchTime[1]),
                    // searchWord: this.status.search_word,
                }
            }
            let that = this
            this.$http(postParams).then(function (data) {
                that.data.media_list = data.Records
            });
        },
        getLable(){
            if(this.data.product_type != '中国航空报') {
                return
            }
            this.data.selectBmArray = []
            this.data.selectChnlArray = []
            // 获取版面和标签
            var params = {
                method : 'getLabels',
                startDate : timeFormat(this.data.event.searchTime[0]),
                endDate : timeFormat(this.data.event.searchTime[1]),
                params : {
                    productType :this.data.product_type,
                },
            }
            params.params = JSON.stringify(params.params);
            var postParams = {
                method:'post',
                url:'/cas/spread2v/event/main.do',
                data : params
            }
            let that = this
            this.$http(postParams).then(function(data){
                var bmlist = [], channellist = []
                if(data.result.BM){
                    for(var key in data.result.BM){
                        var item = {
                            name: key,
                            value: data.result.BM[key],
                            ischecked: false,
                        }
                        bmlist.push(item)
                    }
                }
                if(data.result.DOCCHANNEL){
                    for(var key in data.result.DOCCHANNEL){
                        var item = {
                            name: key,
                            value: data.result.DOCCHANNEL[key],
                            ischecked: false,
                        }
                        channellist.push(item)
                    }
                }
                that.data.bmlist = bmlist
                that.data.channellist = channellist
            });
            that.page.CURRPAGE = 1;
            that.getRelationList()
        }

    },
    filters:{
        timeFormat(value,type,flag){
            return timeFormat(value,flag,type)
        }
    }
}
</script>
<style lang="scss" scoped>
    .btnblock{
        .el-button {
            width: 68px;
        }
        .reset {
            background-color:#B5B5B4 !important;
            border-color: #B5B5B4 !important;
        }
    }
    .edit_mid_received_right {
        .el-input{
            width:74%;
        }
    }
    .relation-box{

        .el-table {
            height: 400px;
            overflow-y: auto;
        }
        .btn-box{
            text-align: center
        }
    }
    .channel_item{
        
        .bm-item{
            margin-right: 10px;
            height: 26px;
            label{
                .el-checkbox__input {
                    margin-right: 5px !important;
                }
                .el-checkbox__label {
                    line-height: 26px;
                }
            }
        }
    }

    
</style>