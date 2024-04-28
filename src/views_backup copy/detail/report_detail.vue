<template>
    <div class="app-container">
        <Header />
        <div class="resource_detail_main clearfix">
            <div class="resource_detail_article resouse-detail-wfqd">
                <div class="cont-box-wfqd">
                    <div class="article_title clearfix">
                        <h4 v-if="!!detailInfos.YT">{{detailInfos.YT}}</h4>
                        <h1 v-if="detailInfos.ZB_TYPE != 'wb'">{{detailInfos.DOCTITLE}}</h1>
                        <h4 v-if="!!detailInfos.FB">{{detailInfos.FB}}</h4>
                    </div>
                    <div class="article_originInfo clearfix">
                        <ul>
                            <li class="clearfix">
                                <div class="article_infoItem">
                                    <span>发布媒体：</span>
                                    <span  :title="detailInfos.ZB_SOURCE_SITE">{{detailInfos.ZB_SOURCE_SITE}}</span>
                                </div>
                                <div class="article_infoItem">
                                    <span>发布时间：</span>
                                    <span>{{detailInfos.DOCPUBTIME}}</span>
                                </div>
                            </li>
                            <li>
                                <div class="article_infoItem">
                                    <span>作者：</span>
                                    <span :itle="detailInfos.DOCAUTHOR">{{detailInfos.DOCAUTHOR}}</span>
                                </div>
                                <div class="article_infoItem">
                                    <span>字数：</span>
                                    <span>{{detailInfos.TXS}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="article_keywords clearfix" v-if="data.keywordsArray.length>0">
                        <div class="keywords_bubble" v-for="(keyword,index) in data.keywordsArray" v-show="index<5" :key="index"   :title="keyword" >{{keyword}}</div>
                    </div>
                    <div class="article_content contentSize" >
                        <div class="noEditPic">
                            <p v-html="detailInfos.IR_CONTENT"></p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- 左侧 -->
            <div class="resource_detail_rightInfo">
                <div class="resource_detail_relatedInfo relatedInfo_minHeight">
                    <!--  -->
                    <div class="relatedInfo_list infohide" :class="{infoshow: status.listOpen =='draftInfo'} ">
                        <div class="relatedInfo_block relatedInfo_groupEntityInfo">
                            <div class="relatedInfo_header" @click="status.attrDropdown.groupEntityInfo=!status.attrDropdown.groupEntityInfo" :class="{ 'active':status.attrDropdown.groupEntityInfo}">
                                <h4>稿件实体信息</h4>
                                <span>{{status.attrDropdown.groupEntityInfo?"收起":"展开"}}<i class="iconfont icon-xialajiantou-xiao"></i></span>
                            </div>
                            <div class="relatedInfo_body" v-show="status.attrDropdown.groupEntityInfo">
                                <div class="groupEntityInfo_body" v-if="detailInfos.GJINFO_TYPE=='xhsg'">
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件属性：</div>
                                        <div class="row_right">新华社稿</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件标签：</div>
                                        <div class="row_right">
                                            <div class="groupEntityInfo_label" v-for="(tag,index) in data.tagArray" :key="index" :title="tag">{{tag}}</div>
                                        </div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">源文件：</div>
                                        <div class="row_right" >{{detailInfos.ZK}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">事发地点：</div>
                                        <div class="row_right">{{detailInfos.INCIDENT_PLACE}}</div>
                                    </div>
                                </div>
                                <div class="groupEntityInfo_body" v-if="detailInfos.GJINFO_TYPE=='szb'">
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件属性：</div>
                                        <div class="row_right">{{detailInfos.GJSX}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">版名：</div>
                                            <div class="row_halfright">{{detailInfos.BM}}</div>
                                        </div>
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">版次：</div>
                                            <div class="row_halfright">{{detailInfos.BC}}</div>
                                        </div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">稿件ID：</div>
                                            <div class="row_halfright">{{detailInfos.ZB_GUID}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="groupEntityInfo_body" v-if="detailInfos.GJINFO_TYPE=='wz'">
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件属性：</div>
                                        <div class="row_right">{{detailInfos.GJSX}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">创建时间：</div>
                                            <div class="row_halfright">{{detailInfos.DOCPUBTIME}}</div>
                                        </div>
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">稿件ID：</div>
                                            <div class="row_halfright">{{detailInfos.ZB_GUID}}</div>
                                        </div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">所属栏目：</div>
                                        <div class="row_right">{{detailInfos.DOCCHANNEL}}</div>
                                    </div>
                                </div>
                                <div class="groupEntityInfo_body" v-if="detailInfos.GJINFO_TYPE=='app'">
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件属性：</div>
                                        <div class="row_right">{{detailInfos.GJSX}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">创建时间：</div>
                                            <div class="row_halfright">{{detailInfos.DOCPUBTIME}}</div>
                                        </div>
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">稿件ID：</div>
                                            <div class="row_halfright" >{{detailInfos.ZB_GUID}}</div>
                                        </div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">所属栏目：</div>
                                            <div class="row_halfright">{{detailInfos.DOCCHANNEL}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="groupEntityInfo_body" v-if="detailInfos.GJINFO_TYPE=='wb'">
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件属性：</div>
                                        <div class="row_right">{{detailInfos.GJSX}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件ID：</div>
                                        <div class="row_right">{{detailInfos.ZB_GUID}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">是否原创：</div>
                                            <div class="row_halfright">
                                                <span class="orginal">{{detailInfos.ZB_ORIGINAL=='1' ?'原创':'非原创'}} </span>
                                            </div>
                                        </div>
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">认证类型：</div>
                                            <div class="row_halfright">{{detailInfos.CERTIFICATE_FLAG}}</div>
                                        </div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">账号地域：</div>
                                            <div class="row_halfright">{{detailInfos.SITE_AREA}}</div>
                                        </div>
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">账号类型：</div>
                                            <div class="row_halfright">{{detailInfos.ZB_BELONGING}}</div>
                                        </div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">转载来源：</div>
                                        <div class="row_right">{{detailInfos.IR_RETWEETED_SCREEN_NAME}}</div>
                                    </div>
                                </div>
                                <div class="groupEntityInfo_body" v-if="detailInfos.GJINFO_TYPE=='wx'">
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件属性：</div>
                                        <div class="row_right">{{detailInfos.GJSX}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="row_left">稿件ID：</div>
                                        <div class="row_right" >{{detailInfos.ZB_GUID}}</div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">是否原创：</div>
                                            <div class="row_halfright">
                                                <span class="orginal">{{detailInfos.ZB_ORIGINAL=='1'?'原创':'非原创'}} </span>
                                            </div>
                                        </div>
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">认证类型：</div>
                                            <div class="row_halfright">{{detailInfos.CERTIFICATE_FLAG}} </div>
                                        </div>
                                    </div>
                                    <div class="groupEntityInfo_row">
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">账号地域：</div>
                                            <div class="row_halfright"> {{detailInfos.SITE_AREA}} </div>
                                        </div>
                                        <div class="groupEntityInfo_halfrow">
                                            <div class="row_halfleft">账号类型：</div>
                                            <div class="row_halfright">{{detailInfos.ZB_BELONGING}} </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="groupEntityInfo_body" v-if="!detailInfos.GJINFO_TYPE">
                                    <div class="groupEntityInfo_row" v-if="!!detailInfos.ZB_SOURCE_SITE ">
                                        <div class="row_left">来源：</div>
                                        <div class="row_right" >{{detailInfos.ZB_SOURCE_SITE}} </div>
                                    </div>
                                    <div class="groupEntityInfo_row" v-if="!!detailInfos.DOCCHANNEL">
                                        <div class="row_left">所属栏目：</div>
                                        <div class="row_right">{{detailInfos.DOCCHANNEL}} </div>
                                    </div>
                                    <div class="groupEntityInfo_row" v-if="!!detailInfos.BC">
                                        <div class="row_left">版次：</div>
                                        <div class="row_right">{{detailInfos.BC}} </div>
                                    </div>
                                    <div class="groupEntityInfo_row" v-if="detailInfos.ENTITY_PLACE && detailInfos.ENTITY_PLACE !='NULL'">
                                        <div class="row_left">地点：</div>
                                        <div class="row_right">{{detailInfos.ENTITY_PLACE}} </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <!--  -->
                    <div class="relatedInfo_list infohide" :class="{infoshow: status.listOpen=='relationInfo'} ">
                        <div class="relatedInfo_block relatedInfo_draftRelatedInfo">
                            <div class="relatedInfo_header" @click="status.attrDropdown.draftRelatedInfo=!status.attrDropdown.draftRelatedInfo" :class="{ 'active':status.attrDropdown.draftRelatedInfo}">
                                <h4>稿件关联信息</h4>
                                <span>{{status.attrDropdown.draftRelatedInfo?"收起":"展开"}}<i class="iconfont icon-xialajiantou-xiao"></i></span>
                            </div>
                            <div class="relatedInfo_body" v-show="status.attrDropdown.draftRelatedInfo">
                                <div class="draftRelatedInfo_head">
                                    <ul>
                                        <li :title="relatedInfo.name" v-for="(relatedInfo,index) in data.draftRelatedInfo.relatedInfo" :key="index" :class="{'active': data.draftRelatedInfo.selectedRelatedInfo==relatedInfo.value}" @click="data.draftRelatedInfo.selectedRelatedInfo=relatedInfo.value">{{relatedInfo.name}}</li>
                                    </ul>
                                </div>
                                <div class="draftRelatedInfo_body" v-if="data.draftRelatedInfo.selectedRelatedInfo==''&&data.draftRelatedInfo.relatedLeaders&&data.draftRelatedInfo.relatedLeaders.length>0">
                                    <ul>
                                        <li v-for="(relatedLeader,index) in data.draftRelatedInfo.relatedLeaders" :key="index" class="relatedLeaders">
                                            <img :src="relatedLeader.LEADERPICTURE">
                                            <div class="info">
                                                <div class="leader_name" :title="relatedLeader.LEADERNAME">{{relatedLeader.LEADERNAME}}</div>
                                                <div class="leader_title" :title="relatedLeader.LEADERPOSITION">{{relatedLeader.LEADERPOSITION}} </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="draftRelatedInfo_body" v-if="data.draftRelatedInfo.selectedRelatedInfo=='1'&&data.draftRelatedInfo.relatedOrganizations&&data.draftRelatedInfo.relatedOrganizations.length>0">
                                    <ul>
                                        <li v-for="(relatedOrganization,index) in data.draftRelatedInfo.relatedOrganizations" :key="index">
                                            <div class="icon" :class="'color'+relatedOrganization.random"> {{relatedOrganization.name.substring(0,1)}} </div>
                                            <div class="info" :title="relatedOrganization.name"> {{relatedOrganization.name}} </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="draftRelatedInfo_body" v-if="data.draftRelatedInfo.selectedRelatedInfo=='2'&&data.draftRelatedInfo.relatedAreas&&data.draftRelatedInfo.relatedAreas.length>0">
                                    <ul>
                                        <li v-for="(relatedArea,index) in data.draftRelatedInfo.relatedAreas" :key="index">
                                            <div class="icon" :class="'color'+relatedArea.random" > {{relatedArea.name.substring(0,1)}} </div>
                                            <div class="info"  :title="relatedArea.name"> {{relatedArea.name}} </div>
                                        </li>
                                    </ul>
                                </div>
                                <div class="resource_detail_nodata" v-if="data.draftRelatedInfo.selectedRelatedInfo==''&&!(data.draftRelatedInfo.relatedLeaders&&data.draftRelatedInfo.relatedLeaders.length>0)">暂无关联领导人</div>
                                <div class="resource_detail_nodata" v-if="data.draftRelatedInfo.selectedRelatedInfo=='1'&&!(data.draftRelatedInfo.relatedOrganizations&&data.draftRelatedInfo.relatedOrganizations.length>0)">暂无关联机构</div>
                                <div class="resource_detail_nodata" v-if="data.draftRelatedInfo.selectedRelatedInfo=='2'&&!(data.draftRelatedInfo.relatedAreas&&data.draftRelatedInfo.relatedAreas.length>0)">暂无关联地域</div>
                            </div>
                        </div>
                        <div class="relatedInfo_block relatedInfo_relevantDraft">
                            <div class="relatedInfo_header" @click="status.attrDropdown.relevantDraft=!status.attrDropdown.relevantDraft" :class="{'active':status.attrDropdown.relevantDraft}">
                                <h4>相关稿件（{{data.relevantDraft.page.ITEMCOUNT||"0"}}）</h4>
                                <span>{{status.attrDropdown.relevantDraft?"收起":"展开"}}<i class="iconfont icon-xialajiantou-xiao"></i></span>
                            </div>
                            <div class="relatedInfo_body" v-show="status.attrDropdown.relevantDraft">
                                <div class="edit_table" v-if="data.relevantDraft.draftList&&data.relevantDraft.draftList.length>0">
                                    <table class="table table-striped data-table black-box">
                                        <thead>
                                            <tr>
                                                <th class="media">媒体</th>
                                                <th>稿件标题</th>
                                                <th class="transmit">转发量</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(draftList,index) in data.relevantDraft.draftList" :key="index">
                                                <td class="media" > {{draftList.mediaChar_m}} </td>
                                                <td class="title">
                                                    <a :title="draftList.title" target="_blank" :href="'/spread/#/reportDetail?guid='+draftList.ZB_GUID">{{draftList.title}}</a>
                                                </td>
                                                <td class="transmit">{{draftList.tranNum}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="page cls-paging" v-if="data.relevantDraft.draftList&&data.relevantDraft.draftList.length>0">
                                    <!-- 分页 -->
                                    <el-pagination
                                        class="textCenter mt20"
                                        background
                                        :current-page="data.relevantDraft.page.CURRPAGE"
                                        :page-size="data.relevantDraft.page.PAGESIZE"
                                        layout="prev, pager, next"
                                        :total="data.relevantDraft.page.ITEMCOUNT"
                                        :hide-on-single-page="true"
                                        @size-change="sizeChange"
                                        @current-change="currentChange"
                                        @prev-click="currentChange"
                                        @next-click="currentChange"
                                        :small="true"
                                    >
                                    </el-pagination>
                                </div>
                                <div class="resource_detail_nodata" v-if="!(data.relevantDraft.draftList&&data.relevantDraft.draftList.length>0)">暂无相关稿件</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="resource_detail_attrInfo">
                    <button @click="status.listOpen='draftInfo'" :class="{ 'active':status.listOpen=='draftInfo'}">
                        <p></p>稿
                        <p></p>件
                        <p></p>信
                        <p></p>息
                    </button>
                    <button @click="status.listOpen='relationInfo'" :class="{ 'active':status.listOpen=='relationInfo'}">
                        <p>关</p>
                        <p>联</p>
                        <p>信</p>
                        <p>息</p>
                    </button>
                </div>
            </div>

        </div>
    </div>
        
</template>
<script>
import { Header } from '../../layout/components'
import BackToTop from '@/components/BackToTop'
export default {
    components: {
        Header,
        BackToTop,
        // mediacount
    },
    data(){
        return{
            data:{
                guid:'',
                indexname:'',
                keywordsArray:[],
                draftRelatedInfo: { //稿件关联信息
                    relatedInfo: [{ //关联信息分类
                        name: "关联领导人",
                        value: ""
                    }, {
                        name: "关联机构",
                        value: "1"
                    }, {
                        name: "关联地域",
                        value: "2"
                    }],
                    selectedRelatedInfo: "", //选中的关联信息分类
                    relatedLeaders: [], //关联领导人
                    relatedOrganizations: [
                        
                    ], //关联机构
                    relatedAreas: [], //关联地域
                },
                tenantInfo:{
                    TENANTID:'232'
                },
                relevantDraft: { //相关稿件
                    page: { //相关稿件分页
                        CURRPAGE: 1,
                        PAGESIZE: 10,
                    },
                    draftList: [] //相关稿件列表
                },
                keywords:""
            },
            status: {
                listOpen: 'draftInfo',
                attrDropdown: {
                    groupProcess: true, //集团取签流程
                    groupEntityInfo: true, //集团实体信息
                    authorInfo: true, //作者信息 
                    draftRelatedInfo: true, //稿件关联信息
                    relevantDraft: true, //相关稿件
                    groupReprint: true, //集团转载
                    relatedHotwords: true, //关联热点词
                    reprintMedia: true //转载媒体
                },
            },
            detailInfos:{
                DOCTITLE:'',
                DOCPUBTIME:'',
                ZB_SOURCE_SITE:'',
                DOCAUTHOR:'',
                TXS:'',
                IR_CONTENT:""

            }
        }
    },
    created(){
        this.data.guid = this.GetQueryString('guid')
        this.data.indexname = this.GetQueryString('indexname')
        let _that = this
        this.getDetail().then(function(){
            _that.getRelevantDraft()
            _that.getRelatedLeaders()
        })
    },
    methods: {
        GetQueryString(param) { 
            var arr = window.location.href.split('?')
            var query=''
            if(arr.length>1){
                query = arr[1]
            }
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == param){
                    return pair[1];
                }
            }
            return(false);
        },
        getDetail(){
            return new Promise((resolve, reject) => {
                var postParams = {
                    method:'post',
                    url:'/zyzx/jtcpg/dataDetail',
                    data: {
                        guid:this.data.guid,
                        indexName: this.data.indexname
                    }
                }
                let _that = this
                this.$http(postParams).then(function (data) {
                    data.content[0].IR_CONTENT = data.content[0].IR_CONTENT.replace(/amp;/g,'').replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\n/g,"<br />");
                    if(!!data.content[0].ZB_KEYWORDS5||data.content[0].ZB_KEYWORDS5==''){
                        _that.data.keywordsArray = data.content[0].ZB_KEYWORDS5 === "" ? [] : data.content[0].ZB_KEYWORDS5.split(";");
                    };
                    _that.keywords = data.content[0].ZB_KEYWORDS5;
                    _that.detailInfos = data.content[0]

                    if (!!data.content[0].ENTITY_ORG) {
                            var org = data.content[0].ENTITY_ORG.split(";");
                            for (var i = 0; i < org.length; i++) {
                                _that.data.draftRelatedInfo.relatedOrganizations.push({
                                    name: org[i],
                                    random: Math.ceil(Math.random() * 5)
                                });
                            }
                        }
                        if (!!data.content[0].ENTITY_PLACE) {
                            var entityPlace = data.content[0].ENTITY_PLACE.split(";");
                            for (var j = 0; j < entityPlace.length; j++) {
                                _that.data.draftRelatedInfo.relatedAreas.push({
                                    name: entityPlace[j],
                                    random: Math.ceil(Math.random() * 5)
                                });
                            }
                        }

                    resolve(data.Records)
                }).catch(err => {
                    reject()
                }) 
            })
        },
        /**
         * 相关稿件
         */
        getRelevantDraft() {
            var params = {
                tarentId: this.data.tenantInfo.TENANTID,
                guid: this.data.guid,
                pageSize: this.data.relevantDraft.page.PAGESIZE,
                pageNum: this.data.relevantDraft.page.CURRPAGE,
                keywords: this.keywords
            };
            let postParams = {
                method: 'post',
                url:'/zyzx/relevant/getRelevantManuscript',
                data: params
            }
            let _that = this
            this.$http(postParams).then(function(data){
                _that.data.relevantDraft.page = {
                    CURRPAGE: parseInt(data.pageNum),
                    ITEMCOUNT: parseInt(data.totalNum) ,
                    PAGECOUNT: Math.ceil(parseInt(data.totalNum)/parseInt(data.pageSize)),
                    PAGESIZE: parseInt(data.pageSize)
                };
                _that.data.relevantDraft.draftList = data.content;
            })
        },
        /**
         * 相关领导
         */
        getRelatedLeaders() {
            var params = {
                tenantId: this.data.tenantInfo.TENANTID,
                names: this.detailInfos.ENTITY_NAME
            };
            let postParams = {
                method:'post',
                url: '/zyzx/relevant/getRelevantLeader',
                data:params
            }
            let _that = this
            this.$http(postParams).then(function(data){
                _that.data.draftRelatedInfo.relatedLeaders = data;
            })
        },
        currentChange(val){
            this.data.relevantDraft.page.CURRPAGE = val
            this.getRelevantDraft()
        },
        sizeChange(val) {
            this.data.relevantDraft.page.PAGESIZE = val
            this.getRelevantDraft()
        }
    }
}
</script>
<style lang="scss" scoped>
    .app-container {
        background: #F5F7FA;
    }
</style>