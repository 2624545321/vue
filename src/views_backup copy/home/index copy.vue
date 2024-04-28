<template>
    <div class="app-container">
        <div class="cbl_bg">
            <!-- 搜索 -->
            <div class="result_search">
                <el-date-picker
                    v-model="data.searchTime"
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
                <span class="search-word" >  主题词：</span>
                <div class="searchInput">
                    <el-input class="search_sytle" size="small" type="text" placeholder="主题词" v-model="status.search_word" />  
                </div>

                <ul v-if="!!data.time_search_type" class="fl overflow_hidden">
                    <li class="fl">
                        <button class="cbl_button no_outline" :class="{'bg_blue': status.time_search_type == 0 }" @click="timeSearchType(0)"> 查看 </button>
                    </li>
                    <li class="fl" v-for="(item,index) in data.time_search_type" :key="index">
                        <button class="cbl_button no_outline " :class="{'bg_blue': status.time_search_type == item.value}" @click="timeSearchType(item.value)"> {{item.name}}</button>
                    </li>
                </ul>
            </div>
            <!-- 主体 -->
            <div class="cbl_container">
                <!-- 媒体传播数据变化趋势 -->
                <div class="media_totla_list " v-if="!!result.overall_detail_data" id="detailResult">
                    <div class="repost_info overflow_hidden">
                        <!-- <p >共发布稿件 <span class="red cursorPointer" @click="getAllArticlePage()">{{ result.repost_description_data.articleSum }}</span> 篇， -->
                        <!-- ui-sref="communicationsPower.communicationsPowerNews({infVal:1,menutype:influ,starttime:status.startTime,endtime:status.endTime})" -->
                            <!-- 其中原创稿件  -->
                            <!-- <a  class="red cursorPointer" target="_blank" >{{ result.repost_description_data.originalNum }}</a> -->
                            <!-- <router-link :to="{ name: 'original' , params: {starttime: data.searchTime[0], endtime: data.searchTime[1]  }}"   tag="span" class="red cursorPointer"> {{result.repost_description_data.originalNum}}</router-link>
                             篇，
                            传播 <span class="red cursorPointer" @click="getAllRepostMedia('','',true)">{{ result.repost_description_data.mediaCount }}</span> 家，
                            共转载 <span class="red cursorPointer" @click="getMediaReprintArticlePage()">{{ result.repost_description_data.reprintSum }}</span> 次。
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <span class="client-detail" @click="status.showAppRepostInfo = true" v-show="!status.showAppRepostInfo">移动端详情</span>
                            <span class="client-detail" @click="status.showAppRepostInfo = false" v-show="status.showAppRepostInfo">收起</span>
                        </p> -->
                        <!-- <p v-show="status.showAppRepostInfo">
                            其中
                            <span v-for="(item,index) in result.mobile_description_data" :key="index">
                                <span v-if="item.channelName == 'APP'">
                                    客户端转载有 <span class="red cursorPointer" @click="getAllRepostMedia('APP',false,true)">{{ item.mediaCount }}</span> 家，
                                    转载 <span class="red cursorPointer" @click="getMediaReprintArticlePage('','APP')">{{ item.reprintSum}}</span> 次；
                                </span>
                                <span v-if="item.channelName == '微信'">
                                    微信转载有 <span class="red cursorPointer" @click="getAllRepostMedia('微信',false,true)">{{ item.mediaCount }}</span> 家，
                                    转载 <span class="red cursorPointer" @click="getMediaReprintArticlePage('','微信')">{{ item.reprintSum }}</span> 次；
                                </span>
                                <span v-if="item.channelName == '第三方公众平台'">
                                    自媒体转载有 <span class="red cursorPointer" @click="getAllRepostMedia('第三方公众平台',false,true)">{{ item.mediaCount }}</span> 家，
                                    转载 <span  class="red cursorPointer" @click="getMediaReprintArticlePage('','第三方公众平台')">{{ item.reprintSum }}</span> 次；
                                </span>
                            </span>
                        </p>     -->
                    </div>

                    <ul class="group_item overflow_hidden">
                        <li v-for="(item,index) in result.overall_detail_data" :key="index" :class="{ 'active' : status.channel_search_type == item.code }" @click="mediaSearchType(item.code)">
                            <i>
                                <img v-if="item.code == 5"  src="@/assets/imgs/jtgj_03.png">
                                <img v-if="item.code == 1" src="@/assets/imgs/jtgj_05.png">
                                <img v-if="item.code == 7" src="@/assets/imgs/jtgj_11.png">
                                <img v-if="item.code == 8" src="@/assets/imgs/jtgj_09.png">
                                <img v-else src="@/assets/imgs/zmt_logo.png">
                            </i>
                            <span v-if="item.code == 5">报纸</span>
                            <span v-if="item.code == 18">自媒体</span>
                            <span v-if="item.code == 1">{{item.channelName}}</span>
                            <span v-if="item.code == 8">{{item.channelName}}</span>

                            <p>
                                <span v-if="item.originalArticle == 0" style="width:100%;">{{item.originalArticle}}/{{item.articleSum}}</span>
                                <span v-else style="width:100%;">
                                    <router-link :to="{ name: 'original' , params: { mediatype : item.code, starttime: data.searchTime[0], endtime: data.searchTime[1]  }}" class="cursor underline_num">{{ item.originalArticle }}</router-link>
                                    /{{item.articleSum}}</span>
                                <span>原创/总稿</span>
                            </p>
                        </li>
                        
                    </ul>
                    <div class="clear-both"></div>
                    <div class="child_media mt20 overflow_hidden" >
                        <span :class="{'activeas': data.childMediaArr == ''}" @click="childMediaSearchType('')">全部</span>
                        <!-- v-show="item.isshow" -->
                        <span :class="{'activeas': data.childMediaArr == item}" @click="childMediaSearchType(item)" v-for="(item,index) in result.child_media_data" :key="index" >{{item}}</span>
                    </div>
                    <!-- 各个媒体排名列表 -->
                    <div class="ranking_right mb20 overflow_hidden">
                        <div class="table ">
                            <ul class="ul_nav">
                                <li class="order">排名</li>
                                <li class="tit" :class="{'wechat_tit': status.channel_search_type == 8}">标题</li>
                                <li class="repost_num">渠道</li>
                                <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'websiteCount'}" @click="getOriginalRankPage('websiteCount')">网媒</a></li>
                                <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'appCount'}" @click="getOriginalRankPage('appCount')">客户端</a></li>
                                <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'wxCount'}" @click="getOriginalRankPage('wxCount')">微信</a></li>
                                <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'weMediaCount'}" @click="getOriginalRankPage('weMediaCount')">自媒体</a></li>
                                <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'interactIndex'}" @click="getOriginalRankPage('interactIndex')" v-if="status.channel_search_type == 8" >在看数</a></li>
                                <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'readIndex'}" @click="getOriginalRankPage('readIndex')" v-if="status.channel_search_type == 8" >阅读数</a></li>
                                <li class="repost_num"><a class="orderby" :class="{'order_bg': data.order_type == 'ceiIndex'}" @click="getOriginalRankPage('ceiIndex')">传播力</a></li>
                            </ul>
                            <ul class="item_ul" v-for="(item ,index) in result.original_data" :key="index">
                                <li class="order"><span :class="{'order_bg1': index == 0 , 'order_bg2' : index == 1  , 'order_bg3':index == 2 }">{{ index+1 }}</span></li>
                                <!-- ui-sref="communicationsPowerdetail({metadataid:item.zbGuid,articletype:item.articleType})" -->
                                <li class="tit" :class="{'wechat_tit': status.channel_search_type == 8}" :title="item.title"><a  target="_blank" :href="'/spread/#/detail?guid='+item.zbGuid">{{item.title}}</a></li>
                                <li class="repost_num text_ellipsis" :title="item.mediaName" >{{item.mediaName}}</li>
                                <li class="repost_num" v-if="item.websiteCount == 0">{{item.websiteCount}}</li>
                                <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'网站')">{{item.websiteCount}}</a></li>
                                <li class="repost_num" v-if="item.appCount == 0">{{item.appCount}}</li>
                                <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'APP')">{{item.appCount}}</a></li>
                                <li class="repost_num" v-if="item.wxCount == 0">{{item.wxCount}}</li>
                                <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'微信')">{{item.wxCount}}</a></li>
                                <li class="repost_num" v-if="item.weMediaCount == 0">{{item.weMediaCount}}</li>
                                <li class="repost_num" v-else><a class="underline_num" @click="getArticleReprintPage(item.zbGuid,'第三方公众平台')">{{item.weMediaCount}}</a></li>
                                
                                <li class="repost_num" v-if="status.channel_search_type == 8"> {{item.interactIndex}} </li>  
                                <li class="repost_num" v-if="status.channel_search_type == 8"> {{item.readIndex}} </li>  
                                <li class="repost_num">{{item.ceiIndex}}</li>  
                            </ul>
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

                    <div class="cbl_index">
                    <div class="echars_div main_container " style="width:49%">
                        <div class="second_tit">
                            <span class="title">网媒转载数量排名</span>
                            <a class="detail" @click='getAllRepostMedia("网站",true)'>更多</a>
                        </div>
                        <div class="clear_both"></div>
                        <div class="line_div" id="bar_media_repost">
                        </div>
                        <p class="pic_mark">
                            说明：显示转载发稿的网媒转载量排名<span ng-if="!!data.home_website_repost_media">，其中“{{data.home_website_repost_media}}”转载最多。</span>
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
                            说明：显示转载发稿的客户端转载量排名<span ng-if="!!data.home_app_repost_media">，其中“{{data.home_app_repost_media}}”转载最多。</span>
                        </p>
                    </div>
                </div>
                <div class="cbl_index">
                    <div class="echars_div main_container " style="width:49%">
                        <div class="second_tit">
                            <span class="title">微信转载数量排名</span>
                            <a class="detail" @click='getAllRepostMedia("微信",true)'>更多</a>
                        </div>
                        <div class="clear_both"></div>
                        <div class="line_div" id="home_wechat_repost">
                        </div>
                        <p class="pic_mark">
                            说明：显示转载发稿的微信公众号转载量排名<span ng-if="!!data.home_wechat_repost_media">，其中“{{data.home_wechat_repost_media}}”转载最多。</span>
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
                            说明：显示转载发稿的自媒体转载量排名<span ng-if="!!data.home_zmt_repost_media">，其中“{{data.home_zmt_repost_media}}”转载最多。</span>
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
                                <li class="order"><a @click="getAuthorArticleReprintPage('websiteSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'websiteSum'}">网媒</a></li>
                                <li class="order"><a @click="getAuthorArticleReprintPage('appSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'appSum'}">客户端</a></li>
                                <li class="order"><a @click="getAuthorArticleReprintPage('weiXinSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'weiXinSum'}">微信</a></li>
                                <li class="order"><a @click="getAuthorArticleReprintPage('articleCount')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'articleCount'}">发稿数</a></li>
                                <li class="order"><a @click="getAuthorArticleReprintPage('ceiIndexSum')" class="orderby" :class="{'order_bg' :data.author_rank_order == 'ceiIndexSum'}">传播力</a></li>
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
                            @current-change="authorPageChange"
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

                <div class="cbl_index">
                    <div class="main_container">
                        <div id="linechart" style="width:100%; height:380px"> </div>
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
        <!-- 所有稿件 -->
        <all-repost :modal-obj='dialog.allrepost' :modal-show.sync="dialog.allRepostVisible"></all-repost>
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
import  allRepost  from '@/components/util/allRepost'
import  mediaRepost  from '@/components/util/mediaRepost'

export default {
    components: {
        docRepost,
        publishDoc,
        mediaList,
        allRepost,
        mediaRepost,
    },
    data() {
        return {
            pickerBeginDateBefore: {
                disabledDate(time) {
                return time.getTime() > (Date.now());
                }
            },
            dialog: {
                allRepostVisible: false,
                allrepost:{
                    startDate : '',
                    endDate : '',
                    searchWord:'',
                },
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
            status: {
                time_search_type:0,
                all_article: false,
                media_name:'',
                showAppRepostInfo:false,
                channel_search_type:'',

                repostList:false,
                mediaLevelList:false,
                search_by_level : false,
                mediaRepostList : false,
                showContent : false,
                isMore:false,           //判断是否是点击柱状图的“更多”
                joinArticleOrder : false,
                overOneWeek : false,
                showAppRepostInfo : false,

                szb_startTime:new Date(),
                szb_endTime:new Date(),

                today : true,
                yesterday : true,

                group_hotspot:1,
                showOrgUrl:false,
            },
            data: {
                searchTime:[timeFormat(new Date().getTime() - 7 * 24 * 60 * 60 * 1000,true) , timeFormat(new Date(),true)],
                time_search_type : [
                    {"name":"昨日","value":"-1"},
                    {"name":"今日","value":"1"},
                    {"name":"本周","value":"7"},
                    {"name":"本月","value":"30"}
                ],
                oneday_stemp: 24 * 60 * 60 * 1000,
                maxRange: 24 * 60 * 60 * 1000 * 31,
                oneweek_stemp: 24 * 60 * 60 * 1000 * 7,

                hot_event_order : 'SY_CLUSTER_NUMS',
                eventType:'zyzxfield_000',
                szb_c_date : new Date(),
                doc_title:'',    //稿件标题
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
                childMediaArr : '',
                author_rank_order : 'ceiIndexSum',      //默认作者排序字段
                order_type :'ceiIndex',         //默认稿件列表排序字段
                author_name : '',
                field_name:'',
                edition_name:'',
                area:'',
                media_order_title:'',
                pie_media_repost_explain:'',

                home_zmt_repost_media:'',
                home_wechat_repost_media:'',
                home_wechat_repost_media:'',
                home_website_repost_media:''
            },
            result: {
                overall_detail_data:[],
                all_article_list:[],       
                repost_description_data:'',
                mobile_description_data:'', 
                child_media_data: [],        //子报子刊list
                original_data:[],
                media_level_data:[],
                author_rank_data:[],
                doc_repost_data:[],
                spread_data:[],
                media_repost_data:[]
                
            },
            params: {
                method: 'post',
                url: '/cas/spread2v/homepage/main.do',
                data: {}
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
            spread_data: {
                title:''
            }
        }
    },
    created() {
        this.params.data = {
            startDate : timeFormat(this.data.searchTime[0]),
            endDate : timeFormat(this.data.searchTime[1]),
            searchWord: this.status.search_word,
        }
        this.requestData()
    },
    methods: {
         /**
         * 初始化当前页
         */
        initCurrentPage(){
            this.page.original_page.CURRPAGE = 1;
            this.page.repost_page.CURRPAGE = 1;
            this.page.doc_repost_page.CURRPAGE = 1;
            this.page.media_level_page.CURRPAGE = 1;
            this.page.media_repost_page.CURRPAGE = 1;
            this.page.hot_keyword_page.CURRPAGE = 1;
            this.page.author_rank_page.CURRPAGE = 1;
            this.page.szb_first_bm_page.CURRPAGE = 1;
            this.status.group_hotspot = 1;
            this.data.hot_event_order = 'SY_CLUSTER_NUMS';
            this.status.hotspot_type = this.status.group_hotspot == 0 ? '0' : '2';
            this.data.eventType == 'zyzxfield_001';
        },
        /**
         * 切换时间检索模式
         */
        timeSearchType(value){
            this.status.time_search_type = value;
            this.initCurrentPage();
            // 计算时间
            if(value !=0){
                var Nowdate = new Date();
                this.data.searchTime[1] = timeFormat(Nowdate,true);
                if(value == -1  ){
                    this.data.searchTime[0] = timeFormat(new Date(new Date().getTime() - this.data.oneday_stemp),true);
                    this.data.searchTime[1] = timeFormat(this.data.searchTime[0],true);
                }else if(value == 1){
                    this.data.searchTime[0] = timeFormat(new Date(),true);
                    this.data.searchTime[1] = timeFormat(new Date(),true);
                }else if(value == 7){
                    if(Nowdate.getDay()>0){
                        this.data.searchTime[0] = timeFormat(new Date(Nowdate-(Nowdate.getDay()-1)*86400000),true); 
                    }else{
                        this.data.searchTime[0] = timeFormat(new Date(Nowdate-6*86400000),true); 
                    }
                }else{
                    this.data.searchTime[0] = timeFormat(new Date(Nowdate.getFullYear(),Nowdate.getMonth(),1),true);
                }
            }
            this.params.data.startDate = timeFormat(this.data.searchTime[0])
            this.params.data.endDate = timeFormat(this.data.searchTime[1])
            this.params.data.searchWord = this.status.search_word
            console.log(this.data.searchTime)
            this.$set(this.data.searchTime, this.data.searchTime)
            this.requestData();
        },
        /**
         * 修改时间后，调用以下接口
         */
        requestData(){
            var starttime = new Date(this.data.searchTime[0]).getTime();
            var endtime = new Date(this.data.searchTime[1]).getTime();
            
            if(endtime - starttime > this.data.maxRange){
                // trsconfirm.alertType("最多只能选择一个月的数据！", "", "error", false, "");
                return false;
            }else{
                let that = this
                  //稿件转载详情（描述）
                this.getWhole2Spread().then( function(){

                    that.getMobileSpread()       //稿件在移动端传播情况（描述）
                    that.getWholeSpread()        //集团渠道发稿量与传播力
                    that.requestChangeChannle();
                } )     
            }
        },
        /**
         * 集团稿件传播情况（文字描述）
         */
        getWhole2Spread(){
            return new Promise((resolve, reject) => {
                let params = {
                    method : "getWhole2Spread",
                }
                this.params.data = Object.assign(this.params.data,params)
                let that = this
                this.$http(that.params).then(function (res) {
                    that.result.repost_description_data = res.Records
                    resolve()
                }).catch(function (err) {
                    console.log(err);
                    reject()
                })
            })
            
        },

        /**
         * 集团渠道发稿量与传播力
         */
        getWholeSpread(){
            let params = {
                method : "getWholeSpread",
            }
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (res) {
                that.result.overall_detail_data = res.Records
                // console.log('查看数据')
                // console.log(res.Records)
            }).catch(function (err) {
                console.log(err);
            })
        },
         /**
         *   稿件在移动端传播情况（描述）
         */
        getMobileSpread() {
            let params = {
                method : "getMobileSpread",
            }
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (res) {
                that.result.mobile_description_data = res.Records
            }).catch(function (err) {
                console.log(err);
            })
        },
        requestChangeChannle(){
            var starttime = new Date(this.data.searchTime[0]).getTime();
            var endtime = new Date(this.data.searchTime[1]).getTime();
            this.getMediaByChannelType()     //获取渠道下，子报子刊
            this.getOriginalRankPage()    //原创稿件排名
            this.getMediaTypeReprint();       //各类型媒体转载情况
            this.getLevelMediasReprint();     //各等级媒体转载情况
            this.home_getMediaReloadPage('网站');        //根据不同媒体类型，媒体级别展示媒体列表
            this.home_getMediaReloadPage('APP');
            this.home_getMediaReloadPage('微信');
            this.home_getMediaReloadPage('第三方公众平台');
            this.getAuthorArticleReprintPage()     //作者排行
            this.getAreaReprint()       //转载稿件地域分布
            this.monthSpread()      //   月度转载
            if(endtime - starttime > this.data.oneweek_stemp){
               this.status.overOneWeek = true;
                // getReprintAndIndexTrend();
            }else{
                this.status.overOneWeek = false;
            }
        },

        /**
         * 获取渠道下子报子刊
         */
        getMediaByChannelType(){
            var params = {
                method : "getMediaByChannelType",
                // startDate : timeFormat(this.data.searchTime[0]),
                // endDate : timeFormat(this.data.searchTime[1]),
                // searchWord: this.status.search_word,
                params:{
                    channelType : this.status.channel_search_type,
                }
            }
            params.params = JSON.stringify(params.params)
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                that.result.child_media_data = data.Records
                // for (let i = 0; i < data.Records.length; i++) {
                //     var element1 = data.Records[i];
                //     for (let j = 0; j < that.result.child_media_data.length; j++) {
                //        var element2 = that.result.child_media_data[j]
                //        if(element1 == element2.name){
                //             element2.isshow = true
                //        }
                        
                //     }
                // }
            });
        },
        /**
         * 原创稿件传播排名
         */
        getOriginalRankPage(ordertype){
            if(!!ordertype) {
                this.data.order_type = ordertype
            }
            var params = {
                method : "getOriginalRankPage",
                // startDate : timeFormat(this.data.searchTime[0]),
                // endDate : timeFormat(this.data.searchTime[1]),
                // searchWord: this.status.search_word,
                params : {
                    page: this.page.original_page.CURRPAGE,
                    pageSize:  this.page.original_page.PAGESIZE,
                    channelType: this.status.channel_search_type,
                    sortField : this.data.order_type ,
                    productType:this.data.childMediaArr,
                    sort : 'desc'
                }
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
                // startDate : timeFormat(this.data.searchTime[0]),
                // endDate : timeFormat(this.data.searchTime[1]),
                // searchWord: this.status.search_word,
                params : {
                    productType :this.data.childMediaArr,
                    channelType :this.status.channel_search_type,
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
                    productType :this.data.childMediaArr,
                    channelType :this.status.channel_search_type,
                }
            }
            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                var result = data.Records;
                if(!!result){
                    that.getRepostMediaSpread(result);
                }
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
            // debugger
            let myChart = this.$echarts.init(document.getElementById('radar_media_spread'))
            myChart.setOption(option);
            let _that = this
            myChart.on('click',function(params){
                _that.dialog.medialist.startDate = timeFormat(_that.data.searchTime[0])
                _that.dialog.medialist.endDate = timeFormat(_that.data.searchTime[1])
                _that.dialog.medialist.searchWord = _that.status.search_word
                _that.dialog.medialist.showType = true
                _that.dialog.medialist.channeltype = _that.data.channel_type
                _that.dialog.medialist.producttype = _that.data.childMediaArr
                _that.dialog.medialist.medialevel = params.name.substring(0,2)
                _that.dialog.medialistVisible = true

                // getMediaLevelSpread(media_level);
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
                    channelType: this.status.channel_search_type,
                    title:this.status.searchWorld,
                    sortField:"reloadSum",
                    sort:"desc" ,
                    productType :this.data.childMediaArr,
                }
            }
            params.params = JSON.stringify(params.params);
            this.params.data = Object.assign(this.params.data,params)
            let that = this
            this.$http(that.params).then(function (data) {
                if(data.Records.length > 0){
                    that.eachResultForEcharts(data.Records,media_type);
                }
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
        
        /**
         * 作者排行列表分页
         */
        authorPageChange(val){
            this.page.author_rank_page.CURRPAGE = val
            this.getAuthorArticleReprintPage()
        },
        /**
         * 作者稿件转载排行
         */
        getAuthorArticleReprintPage(val){
            if(!!val) this.data.author_rank_order = val
            var params = {
                method : 'getAuthorArticleReprintPage',
                params : {
                    page: this.page.author_rank_page.CURRPAGE,
                    pageSize:this.page.author_rank_page.PAGESIZE,
                    sort :'desc',
                    sortField : this.data.author_rank_order,
                    channelType : this.status.channel_search_type,
                    productType : this.data.childMediaArr
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
                    channelType : this.status.channel_search_type,
                    productType : this.data.childMediaArr
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
                _that.dialog = _that.$options.data().dialog
                _that.dialog.docrepost.area = params.name
                _that.initModalParams()
            });
        },
        /**
         * 集团选择子报子刊
         */
        childMediaSearchType (child_type){
            if(this.data.childMediaArr == child_type){
                this.data.childMediaArr = '';
            }else{
                this.data.childMediaArr = child_type;
            }
            // requestData()
            this.requestChangeChannle()
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
        },
        /**
         * 月度转载
         */
        monthSpread(){
            let params = {
                method : 'get',
                url: '/cas/spread2v/bigscreen/main.do',
                params :{
                    endDate: timeFormat(this.data.searchTime[1]),
                    interfacename: '稿件传播力及转载量分析',
                    method: 'getMonthCeiAndReadIndex',
                    serviceSource: 'getReprint',
                    startDate: timeFormat(new Date(new Date(this.data.searchTime[1]).getTime() - 30 * 24 * 60 * 60 * 1000 ))
                }
            }
            let that = this
            this.$http(params).then(function (result) {     
                let datelist = []
                let repostlist = []
                let spreadlist = []
                result.forEach(function(item){
                    datelist.push(item.pubDay.substr(4,item.pubDay.length))
                    repostlist.push(item.reprientCount)
                    spreadlist.push(parseInt(item.ceiIndex))
                })
                that.getLineChart(datelist,repostlist,spreadlist)
            })
        },
        getLineChart(datelist,repostlist,spreadlist){
            var fontColor = '#30eee9';
            var option ={
                grid: {
                    left: '5%',
                    right: '5%',
                    top:'20%',
                    bottom: '15%',
                },
                tooltip : {
                    show: true,
                    trigger: 'axis',
                    textStyle:{
                        color: "#e6e6fa"
                    }
                },
                legend: {
                    show:true,
                    x:'center',
                    top:'5%',
                    y:'35',
                    icon: 'circle',
                    textStyle:{
                        color:'#1bb4f6',
                    },
                    data:[{
                        name: '转载数',
                    },
                    {
                        name:'传播力',
                        textStyle : {
                            color:'#a41a80'
                        }
                    }],
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        axisLabel:{
                            // color: fontColor,
                            // textStyle:{
                            //     color:'#706fcb',
                            // },
                        },
                        axisLine:{
                            show:true,
                            // lineStyle:{
                            //     color:'#706fcb',
                            // },
                        },
                        
                        axisTick:{
                            show:false,
                        },  
                        splitLine:{
                            show: false,
                            lineStyle:{
                                // color:'#706fcb',
                                type:'dashed'
                            }
                        },
                        data : datelist
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name : '转载数',
                        min:0,
                        axisLabel : {
                            formatter: '{value}',
                            // textStyle:{
                            //     color:'#706fcb',
                            // }
                        },
                        // axisLine:{
                        //     lineStyle:{
                        //         color:'#706fcb',
                        //     }
                        // },
                        axisTick:{
                            show:false,
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                // color:'#11366e',
                                type:'dashed'
                            }
                        },
                        
                    },
                    {
                        type : 'value',
                        name : '传播力',
                        min:0,
                        axisLabel : {
                            formatter: '{value}',
                            // textStyle:{
                            //     color:'#706fcb',
                            // }
                        },
                        // axisLine:{
                        //     lineStyle:{
                        //         color:'#706fcb',
                        //     }
                        // },
                        axisTick:{
                            show:false,
                        },
                        splitLine:{
                            show:true,
                            lineStyle:{
                                // color:'#11366e',
                                type:'dashed'
                            }
                        },
                        
                    }
                ],
                series : [
                    {
                        name:'转载数',
                        type:'line',
                        symbol:'circle',
                        symbolSize: 8,
                        itemStyle: {
                            normal: {
                                color:'#0092f6',
                                lineStyle: {
                                    color: "#0092f6",
                                    width:1
                                },
                            }
                        },
                        markPoint:{
                            itemStyle:{
                                normal:{
                                    color:'red'
                                }
                            }
                        },
                        data:repostlist,
                        smooth: true
                    },
                    {
                        name:'传播力',
                        type:'line',
                        // stack: '总量',
                        symbol:'circle',
                        symbolSize: 8,
                        yAxisIndex: 1,
                        
                        itemStyle: {
                            normal: {
                                color:'#a41a80',
                                lineStyle: {
                                    color: "#a41a80",
                                    width:1
                                },
                            }
                        },
                        data: spreadlist,
                        smooth: true
                    }
                ]
            };
            let myChart = this.$echarts.init(document.getElementById('linechart'))
            myChart.setOption(option);
        },
        mediaSearchType(type){
            if(this.status.channel_search_type == type){
                this.status.channel_search_type = '';
            }else{
                this.status.channel_search_type = type;
            }
            this.page.original_page.CURRPAGE = 1;
            this.data.childMediaArr = '';
            this.requestChangeChannle()
        },
        getArticleReprintPage(id,media_type){
            this.dialog = this.$options.data().dialog
            this.dialog.docrepost.zbGuid = id
            this.dialog.docrepost.media_type = media_type;
            this.initModalParams()
        },
        getAuthorRepost(name,media_type){
            this.dialog = this.$options.data().dialog
            this.dialog.docrepost.author = name
            this.dialog.docrepost.media_type = media_type;
            this.initModalParams()
        },
        initModalParams() {
            this.dialog. docrepost.startDate = timeFormat(this.data.searchTime[0])
            this.dialog.docrepost.endDate = timeFormat(this.data.searchTime[1])
            this.dialog.docrepost.searchWord = this.status.search_word
            this.dialog.docrepostVisible = true;
        },
        getArticleCountPage(name) {
            this.dialog.publish.author = name
            this.dialog. publish.startDate = timeFormat(this.data.searchTime[0])
            this.dialog.publish.endDate = timeFormat(this.data.searchTime[1])
            this.dialog.publish.searchWord = this.status.search_word
            this.dialog.publishVisible = true;
        },
        getAllRepostMedia(media_type,isMore,isTop){
            this.dialog = this.$options.data().dialog
            this.dialog.medialist.startDate = timeFormat(this.data.searchTime[0])
            this.dialog.medialist.endDate = timeFormat(this.data.searchTime[1])
            this.dialog.medialist.searchWord = this.status.search_word
            this.dialog.medialist.showType = false
            this.dialog.medialist.channeltype = this.data.channel_type
            this.dialog.medialist.producttype = this.data.childMediaArr
            this.dialog.medialist.mediatype = media_type
            this.dialog.medialistVisible = true
        },
        getAllArticlePage(){
            this.dialog = this.$options.data().dialog
            this.dialog.allrepost.startDate = timeFormat(this.data.searchTime[0])
            this.dialog.allrepost.endDate = timeFormat(this.data.searchTime[1])
            this.dialog.allrepost.searchWord = this.status.search_word
            this.dialog.allRepostVisible = true
        },
        getMediaReprintArticlePage(media_name,media_type){
            this.dialog = this.$options.data().dialog
            this.dialog.mediarepost.startDate = timeFormat(this.data.searchTime[0])
            this.dialog.mediarepost.endDate = timeFormat(this.data.searchTime[1])
            this.dialog.mediarepost.searchWord = this.status.search_word
            this.dialog.mediaRepostVisible = true

            this.dialog.mediarepost.media_name = media_name
            this.dialog.mediarepost.media_type = media_type;
            this.dialog.mediarepost.channeltype = this.data.channel_type
            this.dialog.mediarepost.producttype = this.data.childMediaArr
        }

    },
}
</script>
<style lang="scss" scoped>
    .group_item{
        .underline_num{
            color: #000;
            text-decoration: underline;
        }
    }
    
</style>