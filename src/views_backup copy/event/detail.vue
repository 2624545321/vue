<template>
    <div class="app-container ">
        <div class="cbl_bg">
            <div class="cbl_container">
                <div class="result_search">
                    <div class="media_totla_list overflow_hidden" style="margin-top: 0">
                        <div class="second_tit">
                            <span class="title">{{data.eventInfo.eventName}}</span>
                            <span style="float: right; text-align:right;">共<span class="red">{{page.original_page.ITEMCOUNT}}</span>篇关联稿件</span>
                        </div>
                        <div class="overflow_hidden eventDetail" >

                            <div class="overflow_hidden fl" style="width: 50%">
                                <ul>
                                    <li>
                                            <span class="tab_left">时间：</span>
                                            <span class="info_right">{{data.eventInfo.startDate}}至{{data.eventInfo.endDate}}</span>
                                    </li>
                                    <li>
                                            <span class="tab_left">关键词：</span>
                                            <span class="info_right">{{data.eventInfo.keywords}}</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div class="overflow_hidden left" style="width: 50%">
                                <ul>
                                    <li>
                                            <span class="tab_left">地点：</span>
                                            <span class="info_right">{{data.eventInfo.place}}</span>
                                    </li>
                                    <li>
                                            <span class="tab_left">人物：</span>
                                            <span class="info_right">{{data.eventInfo.characters}}</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <p>
                                <span class="tab_left" style="width: 6.5%">描述：</span>
                                <span class="info_right" style="width: 93.5%;">{{data.eventInfo.eventDescribe}}</span>
                            </p>
                        </div>
                    </div>

                    <!-- 各个媒体排名列表 -->
                    <div class="media_totla_list ">
                        <div class="ranking_right overflow_hidden">
                            <div class="second_tit">
                                <span class="title">事件关联稿件列表</span>
                            </div>
                            <div class="table ">
                                <ul class="ul_nav">
                                    <li class="order">排名</li>
                                    <li class="tit">标题</li>
                                    <li class="repost_num">渠道</li>
                                    <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'websiteCount'}" @click="getOriginalRankPage('websiteCount')">网媒</a></li>
                                    <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'appCount'}" @click="getOriginalRankPage('appCount')">客户端</a></li>
                                    <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'wxCount'}" @click="getOriginalRankPage('wxCount')">微信</a></li>
                                    <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'weMediaCount'}" @click="getOriginalRankPage('weMediaCount')">自媒体</a></li>
                                    <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'ceiIndex'}" @click="getOriginalRankPage('ceiIndex')">传播力</a></li>
                                </ul>
                                <ul class="item_ul" v-for="(item ,index) in result.original_data" :key="index">
                                    <li class="order"><span :class="{'order_bg1': index == 0 && page.original_page.CURRPAGE == 1 , 'order_bg2' : index == 1 && page.original_page.CURRPAGE == 1 , 'order_bg3':index == 2 && page.original_page.CURRPAGE == 1}">{{ index+1 }}</span></li>
                                    <!-- ui-sref="communicationsPowerdetail({metadataid:item.zbGuid,articletype:item.articleType})" -->
                                    <li class="tit" :title="item.title"><a  target="_blank" :href="'/spread/#/detail?guid='+item.zbGuid">{{item.title}}</a></li>
                                    <li class="repost_num text_ellipsis" :title="item.mediaName" ng-bind="item.mediaName">{{item.mediaName}}</li>
                                    <li class="repost_num" v-if="item.websiteCount == 0">{{item.websiteCount}}</li>
                                    <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'网站')">{{item.websiteCount}}</a></li>
                                    <li class="repost_num" v-if="item.appCount == 0">{{item.appCount}}</li>
                                    <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'APP')">{{item.appCount}}</a></li>
                                    <li class="repost_num" v-if="item.wxCount == 0">{{item.wxCount}}</li>
                                    <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'微信')">{{item.wxCount}}</a></li>
                                    <li class="repost_num" v-if="item.weMediaCount == 0">{{item.weMediaCount}}</li>
                                    <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'第三方公众平台')">{{item.weMediaCount}}</a></li>
                                    <li class="repost_num">{{item.ceiIndex}}</li>  
                                </ul>
                                <div class="clear-both"></div>
                                <el-pagination
                                    class="textCenter mt20"
                                    background
                                    small
                                    :hide-on-single-page="page.original_page.ITEMCOUNT == 0"
                                    layout="total, prev, pager, next"
                                    :current-page="page.original_page.CURRPAGE"
                                    :page-size="page.original_page.PAGESIZE"
                                    :total="page.original_page.ITEMCOUNT"
                                    @current-change="getOriginalRankPage"
                                    @prev-click="getOriginalRankPage"
                                    @next-click="getOriginalRankPage"
                                >
                                </el-pagination>  
                                <!-- 分页end  -->   
                                
                            </div>
                        </div>
                    </div>

                    <!-- 媒体转载量、各渠道发稿量趋势 -->
                    <div class="cbl_index ">
                        <div class="echars_div main_container " style="width:49%">
                            <div class="second_tit">
                                <span class="title">各类型媒体转载情况</span>
                            </div>
                            <div class="line_div" id="line_media_doc"></div>
                        </div>
                        <div class="echars_div main_container " style="width:49%; float:right;">
                            <div class="second_tit">
                                <span class="title">各等级媒体转载分布</span>
                            </div>
                            <div class="line_div" id="radar_media_spread"></div>
                        </div>
                    </div>

                    <div class="cbl_index ">
                        <div class="echars_div main_container " style="width:49%">
                            <div class="second_tit">
                                <span class="title">网媒转载数量排名</span>
                                <a class="detail" @click='getAllRepostMedia("网站",true)'>更多</a>
                            </div>
                            <div class="clear_both"></div>
                            <div class="line_div" id="bar_media_repost">
                            </div>
                            <p class="pic_mark">
                                说明：显示转载集团发稿的网媒转载量排名<span ng-if="!!data.home_website_repost_media">，其中“{{data.home_website_repost_media}}”转载最多。</span>
                            </p>
                        </div>
                        <div class="echars_div main_container " style="width:49%; float:right;">
                            <div class="second_tit">
                                <span class="title">客户端转载数量排名</span>
                                <a class="detail" @click='getAllRepostMedia("APP",true)'>更多</a>
                            </div>
                            <div class="line_div" id="home_app_repost">
                            </div>
                            <p class="pic_mark">
                                说明：显示转载集团发稿的客户端转载量排名<span ng-if="!!data.home_app_repost_media">，其中“{{data.home_app_repost_media}}”转载最多。</span>
                            </p>
                        </div>
                    </div>
                    <div class="cbl_index mt20">
                        <div class="echars_div main_container " style="width:49%">
                            <div class="second_tit">
                                <span class="title">微信转载数量排名</span>
                                <a class="detail" @click='getAllRepostMedia("微信",true)'>更多</a>
                            </div>
                            <div class="clear_both"></div>
                            <div class="line_div" id="home_wechat_repost">
                            </div>
                            <p class="pic_mark">
                                说明：显示转载集团发稿的微信公众号转载量排名<span ng-if="!!data.home_wechat_repost_media">，其中“{{data.home_wechat_repost_media}}”转载最多。</span>
                            </p>
                        </div>
                        <div class="echars_div main_container " style="width:49%;float:right">
                            <div class="second_tit">
                                <span class="title">自媒体转载数量排名</span>
                                <a class="detail" @click='getAllRepostMedia("第三方公众平台",true)'>更多</a>
                            </div>
                            <div class="clear_both"></div>
                            <div class="line_div" id="home_zmt_repost">
                            </div>
                            <p class="pic_mark">
                                说明：显示转载集团发稿的自媒体转载量排名<span ng-if="!!data.home_zmt_repost_media">，其中“{{data.home_zmt_repost_media}}”转载最多。</span>
                            </p>
                        </div>
                    </div>
                        <!--  -->
                    <div class="cbl_index">
                        <div class="echars_div main_container szb_half_container" style="width:49%;height:522px">
                            <div class="second_tit">
                                <span class="title">作者稿件转载排行</span>
                            </div>
                            <div class="line_div mt20 m_repost_order">
                                <ul class="fr ul_nav">
                                    <li class="order" style="width: 10%">排行</li>
                                    <li class="order" >作者</li>
                                    <li class="order"><a @click = "getAuthorArticleReprintPage('websiteSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'websiteSum'}">网媒</a></li>
                                    <li class="order"><a @click = "getAuthorArticleReprintPage('appSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'appSum'}">客户端</a></li>
                                    <li class="order"><a @click = "getAuthorArticleReprintPage('weiXinSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'weiXinSum'}">微信</a></li>
                                    <li class="order"><a @click = "getAuthorArticleReprintPage('articleCount')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'articleCount'}">发稿数</a></li>
                                    <li class="order"><a @click = "getAuthorArticleReprintPage('ceiIndexSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'ceiIndexSum'}">传播力</a></li>
                                </ul>
                                <ul class="item_ul fr" v-for="(item,index) in result.author_rank_data" :key="index"> 
                                    <li class="order" style="width: 10%">
                                        <span  :class="{'order_bg1': index == 0 && page.author_rank_page.CURRPAGE == 1 , 'order_bg2' : index == 1 && page.author_rank_page.CURRPAGE == 1 , 'order_bg3':index == 2 && page.author_rank_page.CURRPAGE == 1}">
                                            {{(index+1) + (page.author_rank_page.CURRPAGE-1) * page.author_rank_page.PAGESIZE}}
                                        </span>
                                    </li>
                                    <li class="order text_ellipsis text_center"  :title="item.author" style="margin-top:0;">{{item.author}}</li>
                                    <li class="order" v-if="item.websiteSum != 0"><a class="underline_num" @click="getAuthorRepost(item.author,'网站')">{{item.websiteSum}}</a></li>
                                    <li class="order" v-else>0</li>
                                    <li class="order" v-if="item.appSum != 0"><a class="underline_num" @click="getAuthorRepost(item.author,'APP')">{{item.appSum}}</a></li>
                                    <li class="order" v-else>0</li>
                                    <li class="order" v-if="item.weiXinSum != 0"><a class="underline_num" @click="getAuthorRepost(item.author,'微信')">{{item.weiXinSum}}</a></li>
                                    <li class="order" v-else>0</li>
                                    <li class="order" v-if="item.articleCount != 0"><a class="underline_num" @click="getArticleCountPage(item.author)">{{item.articleCount}}</a></li>
                                    <li class="order" v-else>0</li>
                                    <li class="order">{{item.ceiIndexSum}}</li>
                                </ul>
                            </div>
                            <div class="clear_both"></div>
                            <el-pagination
                                class="textCenter mt20"
                                background
                                small
                                :hide-on-single-page="page.author_rank_page.ITEMCOUNT == 0"
                                layout="pager"
                                :current-page="page.author_rank_page.CURRPAGE"
                                :page-size="page.author_rank_page.PAGESIZE"
                                :total="page.author_rank_page.ITEMCOUNT"
                                @current-change="getAuthorArticleReprintPage"
                            >
                            </el-pagination>
                        </div>
                        <div class="echars_div main_container " style="width:49%;float:right;height:522px;">
                            <div class="second_tit">
                                <span class="title">转载稿件地域分布</span>
                            </div>
                            <div class="clear_both"></div>
                            <div class="line_div" id="map_repost"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- 稿件转载列表 -->
        <doc-repost :modal-obj='dialog.docrepost' :modal-show.sync="dialog.docrepostVisible"></doc-repost>
        <!-- 发稿量 -->
        <publish-doc :modal-obj='dialog.publish' :modal-show.sync="dialog.publishVisible"></publish-doc>
        <!-- 媒体转载列表 -->
        <media-list :modal-obj='dialog.medialist' :modal-show.sync="dialog.medialistVisible"></media-list>
        <!-- 媒体转载稿件列表 -->
        <media-repost :modal-obj='dialog.mediarepost' :modal-show.sync="dialog.mediaRepostVisible"></media-repost>
    </div>
</template>
<script>
import { timeFormat } from '@/utils/timeFormat'
import chinaJson from '../../assets/datas/china.json'
import  docRepost  from '@/components/util/docRepost'
import  mediaList  from '@/components/util/mediaList'
import  publishDoc  from '@/components/util/publishDoc'
import  mediaRepost  from '@/components/util/mediaRepost'
export default {
    components: {
        docRepost,
        publishDoc,
        mediaList,
        mediaRepost,
    },
    data() {
        var routerParams = this.$route.params.id
        if(!routerParams){
            this.$router.push(`/event`)
        }
        // console.log(this.$route.params)
        return{
            dialog: {
                docrepost:{
                    startDate : '',
                    endDate : '',
                    searchWord: '',
                    media_type:'',
                    zbGuid:'',
                    author:'',
                    area:'',
                },
                docrepostVisible: false,

                publish: {
                    searchWord: '',
                    media_type:'',
                    searchWord: '',
                    author:'',
                },
                publishVisible: false,

                medialist: {
                    startDate : '',
                    endDate : '',
                    searchWord: '',
                    channeltype:'',
                    producttype:'',
                    medialevel:'',
                    mediatype:'',
                    showType:false,
                },
                medialistVisible: false,
                
                mediarepost:{
                    startDate : '',
                    endDate : '',
                    searchWord: '',
                    channeltype:'',
                    producttype:'',
                    media_name:'',
                    media_type:'',
                },
                mediaRepostVisible : false
            },
             page: {
                all_article_page:{
                    CURRPAGE : 1,
                    PAGESIZE : 8,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                original_page: {
                    CURRPAGE : 1,
                    PAGESIZE : 10,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0,
                },
                media_level_page : {
                    CURRPAGE : 1,
                    PAGESIZE : 10,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                author_rank_page : {
                    CURRPAGE : 1,
                    PAGESIZE : 10,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0,
                },
                area_page : {
                    CURRPAGE : 1,
                    PAGESIZE : 34,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                doc_repost_page : {
                    CURRPAGE : 1,
                    PAGESIZE : 8,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                repost_page : {
                    CURRPAGE : 1,
                    PAGESIZE : 10,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                media_repost_page: {
                    CURRPAGE : 1,
                    PAGESIZE : 8,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                hot_keyword_page:{
                     CURRPAGE : 1,
                    PAGESIZE : 8,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                szb_first_bm_page : {
                    CURRPAGE : 1,
                    PAGESIZE : 10,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                },
                szb_pub_doc_page : {
                    CURRPAGE : 1,
                    PAGESIZE : 8,
                    ITEMCOUNT : 0,
                    PAGECOUNT : 0, 
                }

            },
            params: {
                method: 'post',
                url: '/cas/spread2v/homepage/main.do',
                data: {}
            },
            data: {
                eventInfo: [],
                zbGuIds:[],
                event_id : this.$route.params.id,
                event_name : this.$route.params.name,
                media_type_list : [
                    {
                        name : '全部',
                        value : ''
                    },
                    {
                        name : '网站',
                        value : '网站'
                    },
                    {
                        name : '客户端',
                        value : 'APP'
                    },
                    {
                        name : '微信',
                        value : '微信'
                    },
                    {
                        name : '自媒体',
                        value : '第三方公众平台'
                    },
                ],
                media_level_list:[
                    {
                        name : '全部',
                        value : ''
                    },
                    {
                        name : '核心',
                        value : '核心'
                    },
                    {
                        name : '一级',
                        value : '一级'
                    },
                    {
                        name : '二级',
                        value : '二级'
                    },
                ],
                childMediaArr : '',
                media_level : '全部',
                media_type  : '全部',
                channel_type : '',
                channel_name : '全部',
                media_name:'',
                channel_type_list:[
                    {
                        showName:'全部',
                        cod:''
                    },
                    {
                        showName:'中经网',
                        cod:'1'
                    },
                    {
                        showName:'数字报',
                        cod:'5'
                    },
                    {
                        showName:'客户端',
                        cod:'7'
                    },
                    {
                        showName:'微信',
                        cod:'8'
                    },
                ],
                author_rank_order : 'ceiIndexSum',      //默认作者排序字段
                order_type :'ceiIndex',         //默认稿件列表排序字段
                author_name : '',
                field_name:'',
                edition_name:'',
                area:'',
                media_order_title:'',
            },
            status: {
                channel_search_type : '',  
                search_word : '',          //主题词
                startTime:'',
                endTime:'',
                group_hotspot:1,
                showOrgUrl:false,
            },
            result: {
                overall_detail_data:[],
                all_article_list:[],       
                repost_description_data:'',
                mobile_description_data:'', 
                original_data:[],
                media_level_data:[],
                author_rank_data:[],
                doc_repost_data:[],
            },
            
        }
    },
    created() {
        this.getEventById().then(data => {
            this.params.url = '/cas/spread2v/homepage/main.do'
            this.params.data = {
                startDate : timeFormat(this.status.startTime),
                endDate : timeFormat(this.status.endTime),
                searchWord: this.status.search_word,
            }
            this.requestData()
        })
    },
    methods: {
        getEventById(){
            return new Promise((resolve, reject) => {
                var params = {
                    method: 'getEventById',
                    id : this.$route.params.id
                }
                this.params.url="/cas/spread2v/event/main.do"
                this.params.data = params
                let _that = this
                this.$http(_that.params).then(function (data) {
                    if(data.Records.articleNumber != 0){
                        data.Records.articleCEIResultVOList.forEach(function(item){
                            _that.data.zbGuIds.push(item.zbGuid);
                        })
                    }
                    _that.data.eventInfo = data.Records;
                    _that.status.startTime = data.Records.startDate
                    _that.status.endTime = data.Records.endDate
                    // this.event = data.Records
                    resolve(data.Records)
                }).catch(err => {
                    reject()
                });
            })
        },
        requestData(){
            // 获取列表
            this.getOriginalRankPage();
            // 关键词
            // this.getKeywordSta();
            this.getMediaTypeReprint();       //各类型媒体转载情况
            this.getLevelMediasReprint();     //各等级媒体转载情况
            this.home_getMediaReloadPage('网站');        //根据不同媒体类型，媒体级别展示媒体列表
            this.home_getMediaReloadPage('APP');
            this.home_getMediaReloadPage('微信');
            this.home_getMediaReloadPage('第三方公众平台');
            this.getAuthorArticleReprintPage()     //作者排行
            this.getAreaReprint()       //转载稿件地域分布
        },
        getOriginalRankPage(val) {
            if(!!val) this.page.original_page.CURRPAGE = val
            var params = {
                method : "getOriginalRankPage",
                params : {
                    page: this.page.original_page.CURRPAGE,
                    pageSize:  this.page.original_page.PAGESIZE,
                    channelType: this.status.channel_search_type,
                    sortField : this.data.order_type ,
                    productType:this.data.childMediaArr,
                    sort : 'desc',
                    zbGuIds:this.data.zbGuIds
                },
            }
            params.params = JSON.stringify(params.params)
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                that.page.original_page.ITEMCOUNT = data.TotalRecordCount;
                that.page.original_page.PAGECOUNT = Math.ceil(that.page.original_page.ITEMCOUNT/that.page.original_page.PAGESIZE);
                that.result.original_data = data.Records;
            });
        },
        /**
         * 各类型媒体转载情况
         */
        getMediaTypeReprint(){
            var params = {
                method : 'getMediaTypeReprint',
                params : {
                    zbGuIds:this.data.zbGuIds
                }
            }
            params.params = JSON.stringify(params.params)
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                var result = data.Records;
                if(!result) return;
                var series_data = result.reprints.concat([]);
                var randar_indicator = []
                var max_value = result.reprints.sort(function(a,b){
                    return parseInt(b) - parseInt(a)
                })
                
                result.mediaTypes.forEach((item, index) => {
                    if(item == '第三方公众平台'){
                        item = "自媒体"
                    }
                    var indicator = {
                        name : item,
                        max : '',
                    }
                    if(parseInt(series_data[index]) < 1000 && parseInt(max_value[0]) >= 1000){
                        indicator.max = 1000
                    }else{
                        indicator.max = max_value[0]
                    }
                    randar_indicator.push(indicator)
                })
                var option = {
                    tooltip: {},
                    radar: {
                        name: {
                            textStyle: {
                                color: '#000',
                                borderRadius: 3,
                                padding: [3, 5]
                        }
                        },
                        indicator:  randar_indicator,
                        center:['50%','45%'],
                    },
                    series: [{
                        type: 'radar',
                        areaStyle: {normal: {}},
                        data : [
                            {
                                value : series_data,
                                // value : [4300, 10000, 28000, 35000],
                                name : '转载量'
                            }
                            
                        ]
                    }]
                };
                let myChart = that.$echarts.init(document.getElementById('line_media_doc'))
                myChart.setOption(option);
            });
        },
        /**
         * 各个等级媒体转载情况
         */
        getLevelMediasReprint(){
            var params = {
                method : 'getLevelMediasReprint',
                params : {
                    zbGuIds:this.data.zbGuIds
                }
            }
            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                var result = data.Records;
                that.getRepostMediaSpread(result);
            });
        },
        getRepostMediaSpread(data){
            var legend_data = data.levelList;
            var series_data = [];
            let that = this
            legend_data.forEach(function(item,index){
                var item_value = '';
                if(item == '核心媒体'){
                    item_value = data.mediaLevelList[0].coreMedias
                }else if(item == '一级媒体'){
                    item_value = data.mediaLevelList[0].lv1Medias
                }else{
                    item_value = data.mediaLevelList[0].lv2Medias
                }
                var s_data_item = {
                    value:item_value, 
                    name:item,
                    itemStyle:{
                        normal:{
                            color: that.getColor(index),
                        }
                    }
                }
                series_data.push(s_data_item)
            });

            this.sortByKey(series_data,"value")

            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}次 ({d}%)"
                },
                series : [
                    {
                        name: '转载媒体',
                        type: 'pie',
                        radius : '75%',
                        center: ['50%', '50%'],
                        data:series_data,
                        label: {
                            normal: {
                                show: true,
                                formatter: "{b}\n{d}%",
                                lineHeight:16,
                            },
                        },
                    }
                ]
            };
            let myChart = this.$echarts.init(document.getElementById('radar_media_spread'))
            myChart.setOption(option);
            let _that = this
            myChart.on('click',function(params){
                _that.dialog.medialist.startDate = timeFormat(_that.status.startTime)
                _that.dialog.medialist.endDate = timeFormat(_that.status.endTime)
                _that.dialog.medialist.searchWord = _that.status.search_word
                _that.dialog.medialist.showType = true
                _that.dialog.medialist.channeltype = _that.data.channel_type
                _that.dialog.medialist.producttype = _that.data.childMediaArr
                _that.dialog.medialist.medialevel = params.name.substring(0,2)
                _that.dialog.medialistVisible = true
                // this.getMediaLevelSpread(media_level);
            })
        },
       
        getMediaLevelSpread(title){
            title = title+'媒体'
            var media_level = this.data.media_level == '全部'?'' :this.data.media_level
            var media_type = this.data.media_type == '全部'?'' :this.data.media_type
            var params = {
                method : "getMediaLevelSpread",
                params:{
                    mediaLevel:media_level,
                    mediaType: media_type,
                    channelType : this.data.channel_type,
                    mediaName:this.data.media_name,
                    number : '',
                    zbGuIds : this.data.zbGuIds,
                }
            }

            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (result) {
                this.result.spread_data = result.Records
                this.spread_data.title = title;
            });
        },
        /**
         * 根据不同媒体类型展示稿件转正情况-柱状图
         * @param {媒体类型} media_type 
         */
        home_getMediaReloadPage(media_type){
            if(!media_type){
                media_type = this.data.media_type == '全部' ? '' : this.data.media_type;
                media_type = media_type == '自媒体' ? '第三方公众平台' : media_type;
            }
            var media_level = this.data.media_level == '全部' ? '' : this.data.media_level;
            var params = {
                method : "getMediaReloadPage",
                params:{
                    page: this.page.media_level_page.CURRPAGE,
                    pageSize:this.page.media_level_page.PAGESIZE,
                    mediaLevel:media_level,
                    mediaType: media_type,
                    mediaName:this.data.media_name,
                    title:this.status.searchWorld,
                    sortField:"reloadSum",
                    sort:"desc" ,
                    zbGuIds : this.data.zbGuIds,
                }
            }
            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                that.eachResultForEcharts(data.Records,media_type);
            });
        },
        eachResultForEcharts(result,media_type){
            var name_data = [], value_data = [],id = '',color=[];
            result.forEach(function(item){
                name_data.push(item.mediaName);
                value_data.push(item.reloadSum);
            });
            if(media_type == '微信'){
                this.data.home_wechat_repost_media = name_data[0];
                id = 'home_wechat_repost';
                color = new Array('#F8B551');
            }else if(media_type == "APP"){
                this.data.home_app_repost_media = name_data[0];
                id = 'home_app_repost';
                color = new Array('#F5625A');
            }else if(media_type == "网站"){
                this.data.home_website_repost_media = name_data[0];
                id = 'bar_media_repost';
                color = new Array('#3398DB');
            }else if(media_type == "第三方公众平台"){
                this.data.home_zmt_repost_media = name_data[0];
                id = 'home_zmt_repost';
                color = new Array('#ffd85c');
            }
            this.echarts_bar(name_data,value_data,id,color);
        },
        echarts_bar(xAxis_data,series_data,id,color){
            var option = {
                color: color,
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '7%',
                    // bottom: '10%',
                    top:'5%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : xAxis_data,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel :{
                            formatter:function(value){
                                if(!!value){
                                    return value.split("").join("\n");
                                }
                            }
                        },
                        name:'媒体'
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine: {
                            show: true,
                            lineStyle:{
                                type:'dashed'
                            }
                        },
                    }
                ],
                series : [
                    {
                        name:'转载量',
                        type:'bar',
                        barWidth: '60%',
                        data:series_data,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                }
                    },
                    cursor:'text',
                    }
                ]
            };
            var myChart = this.$echarts.init(document.getElementById(id));
            myChart.setOption(option);
            let _that = this
            myChart.on("click", function(params){
                let meidatype=''
                if(id == 'bar_media_repost'){
                   meidatype = '网站'
                }else if(id == 'home_app_repost'){
                   meidatype = 'APP'
                }else if(id == 'home_wechat_repost'){
                   meidatype = '微信'
                }else{
                   meidatype = '第三方公众平台'
                }
                _that.getMediaReprintArticlePage(params.name,meidatype)
            });
        }, 
        getMediaReprintArticlePage(media_name,media_type){
            this.data.mediarepost = {
                startDate : '',
                endDate : '',
                searchWord: '',
                channeltype:'',
                producttype:'',
                media_name:'',
                media_type:'',
            }
            this.dialog.mediarepost.startDate = timeFormat(this.status.startTime)
            this.dialog.mediarepost.endDate = timeFormat(this.status.endTime)
            this.dialog.mediarepost.searchWord = this.status.search_word
            this.dialog.mediaRepostVisible = true

            this.dialog.mediarepost.media_name = media_name
            this.dialog.mediarepost.media_type = media_type;
            this.dialog.mediarepost.channeltype = this.data.channel_type
            this.dialog.mediarepost.producttype = this.data.childMediaArr
        },
        /**
         * 作者稿件转载排行
         */
        getAuthorArticleReprintPage(val){
            if(!!val) this.page.author_rank_page.CURRPAGE = val
            var params = {
                method : 'getAuthorArticleReprintPage',
                params : {
                    page: this.page.author_rank_page.CURRPAGE,
                    pageSize:this.page.author_rank_page.PAGESIZE,
                    sort :'desc',
                    sortField : this.data.author_rank_order,
                    zbGuIds : this.data.zbGuIds,
                }
            }
            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (result) {   
                that.result.author_rank_data = result.Records;
                that.page.author_rank_page.ITEMCOUNT = result.TotalRecordCount;
                that.page.author_rank_page.PAGECOUNT = Math.ceil(that.page.author_rank_page.ITEMCOUNT/that.page.author_rank_page.PAGESIZE);
                
            })
        },
         /**
         * 转载稿件地域分布
         */

        getAreaReprint(){
            var params = {
                method : "getAreaReprint",
                params:{
                    page: this.page.area_page.CURRPAGE,
                    pageSize: this.page.area_page.PAGESIZE,
                    sortField:"",
                    sort:"desc",
                    zbGuIds : this.data.zbGuIds,
                }
            }
            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {  
                that.echarts_map(data.Records)
            });
        },
        echarts_map(result){
            var series_data =[];
            var max = [];
            result.forEach(function(item){
                var one_data = {
                    name:'',
                    value:'',
                }
                one_data.name = item.area;
                one_data.value = item.reprintSum;
                max.push(item.reprintSum);
                series_data.push(one_data);
            }) 
            max = this.sortItem(max);
            var option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data:['转载数'],
                    selectedMode : false,
                },
                visualMap: {
                    min: 0,
                    max: max[0],
                    left: 'left',
                    top: 'bottom',
                    text: ['高','低'],           // 文本，默认为数值文本
                    calculable: true
                },
                
                series: [
                    {
                        name: '转载数',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        label: {
                            normal: {
                                show: true
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        data:series_data
                    },
                    
                ]
            };
            var myChart =this.$echarts.init(document.getElementById('map_repost'));
            this.$echarts.registerMap('china', chinaJson);
            myChart.setOption(option);
            let _that = this
            myChart.on("click", function(params){
                _that.initModalParams()
                // _that.dialog = _that.$options.data().dialog
                _that.dialog.docrepost.area = params.name
            });
        },
        getArticleReprintPage(id,media_type){
            this.initModalParams()
            // this.dialog = this.$options.data().dialog
            this.dialog.docrepost.zbGuid = id
            this.dialog.docrepost.media_type = media_type;
        },
        getAuthorRepost(name,media_type){
            this.initModalParams()
            // this.dialog = this.$options.data().dialog
            this.dialog.docrepost.author = name
            this.dialog.docrepost.media_type = media_type;
        },
        getArticleCountPage(name) {
            this.dialog.publish.author = name
            this.dialog. publish.startDate = timeFormat(this.status.startTime)
            this.dialog.publish.endDate = timeFormat(this.status.endTime)
            this.dialog.publish.searchWord = this.status.search_word
            this.dialog.publishVisible = true;
        },
        initModalParams() {
            this.dialog.docrepost = {
                startDate : timeFormat(this.status.startTime),
                endDate : timeFormat(this.status.endTime),
                searchWord: this.status.search_word,
                media_type:'',
                zbGuid:'',
                author:'',
                area:'',
            }
            this.dialog.docrepostVisible = true;
        },
        getAllRepostMedia(media_type,isMore,isTop){
            // this.dialog = this.$options.data().dialog
            this.dialog.medialist.startDate = timeFormat(this.status.startTime)
            this.dialog.medialist.endDate = timeFormat(this.status.endTime)
            this.dialog.medialist.searchWord = this.status.search_word
            this.dialog.medialist.showType = false
            this.dialog.medialist.channeltype = this.data.channel_type
            this.dialog.medialist.producttype = this.data.childMediaArr
            this.dialog.medialist.mediatype = media_type
            this.dialog.medialistVisible = true
        },
        /**
         * 数组对象排序
         * @param {*} data 
         * @param {*} key 
         */
        sortByKey(data,key){
            data.sort(function(a,b){
                var x=a[key];
                var y=b[key];
                return((x<y) ? 1 : ((x>y) ? -1: 0))
            })
            this.data.pie_media_repost_explain = data[0].name
        },
        /**
         * 获取颜色
         * @param {*} index 
         */
        getColor(index){
            var color = [
                '#01a2d9','#ffd85c','#F5625A','#FF9600'
            ]
            return color[index]
        },
        /**
         * 对数组排序
         * @param {数组} item 
         */
        sortItem(item){
            return item.sort(function(a,b){
                return b-a;
            })
        }

    }
}
</script>

<style lang="scss" scoped>
    .result_search{
        padding: 0
    }
    .media_totla_list {
        .ranking_right {
            .table{
                margin-bottom: 0;
                .el-pager {
                    float: unset;
                    width: unset;
                }
            }
        }
    }
    
    
</style>