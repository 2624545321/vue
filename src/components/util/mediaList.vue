<template>
    <div class="media-list">
        <el-dialog title="媒体转载稿件列表" :visible.sync="modalShow" custom-class="spreadPath" width="80%" 
                :close-on-press-escape="false"
                :close-on-click-modal="false"
                
        >
            <div class="search-box">
                <div class="search-item">
                    <label for="title">媒体：</label>
                    <div class="input-box">
                        <el-input name="title" size="small" v-model.trim="search.media_name" placeholder="媒体"/>
                    </div>
                </div>
                <div class="search-item" v-if="modalObj.showType">
                    <label for="title">类型：</label>
                    <div class="input-box">
                        <el-select size="small" v-model="search.media_type" filterable placeholder="类型" >
                            <el-option
                                v-for="item in data.media_type"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                                size='small'
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="search-item" v-else>
                    <label for="title">等级：</label>
                    <div class="input-box">
                        <el-select size="small" v-model="search.media_level" filterable placeholder="媒体等级" >
                            <el-option
                                v-for="item in data.media_level_list"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                                size='small'
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div>
                    <el-button size="small" type="primary" @click="fullTextSearch">检索</el-button>
                </div>
            </div>
            <el-table :data="data.list"
                v-loading="listLoading"
                element-loading-text="Loading"
                :header-cell-style="theadBg"
                fit
            >
                <el-table-column align="center" label="序号" width="80">
                    <template slot-scope="scope">
                    {{ (scope.$index+1) + (page.PAGESIZE * (page.CURRPAGE - 1)) }}
                    </template>
                </el-table-column>
                <el-table-column label="转载媒体" align="left"  width="400">
                    <template slot-scope="scope">
                        <span>{{ scope.row.mediaName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="媒体类型" align="center"  v-if="modalObj.showType">
                    <template slot-scope="scope">
                        <span >{{ scope.row.mediaType }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="媒体等级" align="center" v-else >
                    <template slot-scope="scope">
                        <span >{{ scope.row.mediaLevel }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="转载数" align="center" >
                    <template slot-scope="scope">
                        <span class="cursor underline_num" @click="getMediaReprintArticlePage(scope.row.mediaName)">{{ scope.row.reloadSum }}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="textCenter mt20"
                background
                :current-page="page.CURRPAGE"
                :page-size="page.PAGESIZE"
                layout="total, prev, pager, next"
                :total="page.ITEMCOUNT"
                :hide-on-single-page="true"
                @current-change="fullTextSearch"
                @prev-click="fullTextSearch"
                @next-click="fullTextSearch"
            >
            </el-pagination>
        </el-dialog>
        <!-- 媒体转载稿件列表 -->
        <media-repost :modal-obj='dialog' :modal-show.sync="dialog.mediaRepostVisible"></media-repost>
    </div>
</template>
<script>
import  mediaRepost  from '@/components/util/mediaRepost'
export default {
    name:'mediaList',
    props:[
        'modalObj',
        'modalShow'
    ],
    components:{
        mediaRepost,
    },
    data() {
        return {
            listLoading: true,
            theadBg: {background:'#eef1f6',color:'#606266'},
            page: {
                CURRPAGE : 1,
                PAGESIZE : 8,
                ITEMCOUNT : 0,
                PAGECOUNT : 0, 
            },
            data: {
                list:[],
                media_type : [
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
            },
            search: {
                media_type:'',
                media_level: '',
                media_name:'',
            },
            dialog:{
                startDate : '',
                endDate : '',
                media_name:'',
                media_type:'',
                mediaRepostVisible:false
            }
        }
    },
    methods: {
        fullTextSearch(val){
            this.page.CURRPAGE = typeof val == 'number' ? val : 1
            this.getMediaReloadPage()
        },
        getMediaReloadPage(){
            this.listLoading = true
            var media_type = this.modalObj.showType ? this.search.media_type : this.modalObj.mediatype
            var media_level = this.modalObj.showType ? this.modalObj.medialevel : this.search.media_level  
            var params = {
                method : "getMediaReloadPage",
                startDate : this.modalObj.startDate,
                endDate : this.modalObj.endDate,
                searchWord: this.modalObj.search_word,
                params:{
                    page: this.page.CURRPAGE,
                    pageSize:this.page.PAGESIZE,
                    mediaLevel: media_level,
                    mediaType: media_type,
                    mediaName:this.search.media_name,
                    title:this.modalObj.search_word,
                    sortField:"reloadSum",
                    sort:"desc" ,
                    productType :this.modalObj.producttype,
                    channelType: this.modalObj.channeltype,
                }
            }
           params.params = JSON.stringify(params.params);
            let postParams = {
                method:'post',
                url:'/cas/spread2v/homepage/main.do',
                data: params
            }
            let _that = this
            this.$http(postParams).then(function(result){
                _that.listLoading = false
                _that.data.list = result.Records;
                _that.page.ITEMCOUNT = result.TotalRecordCount;
                _that.page.PAGECOUNT = Math.ceil(_that.page.ITEMCOUNT/_that.page.PAGESIZE);
            });
        },
        getMediaReprintArticlePage(medianame){
            debugger
            this.dialog = this.$options.data().dialog
            this.dialog.startDate = this.modalObj.startDate
            this.dialog.endDate = this.modalObj.endDate
            this.dialog.mediaRepostVisible = true
            this.dialog.media_name = medianame

            var media_type = this.modalObj.showType ? this.search.media_type : this.modalObj.mediatype
            this.dialog.media_type = media_type;
        }
    },
    watch:{
        modalShow : function (val) {
            if(val){
                this.page.CURRPAGE = 1 
                this.search.title = ''
                this.search.media_type =''
                this.search.media_level=''
                this.getMediaReloadPage()
            }
            this.$emit('update:modalShow', val);
        },
        
    },
}
</script>
<style lang="scss" scoped>
    .media-list{
        .el-dialog__body {
            padding-top: 10px !important;
            .search-box {
                overflow: hidden;
                .search-item {
                    float: left;
                    width: 25%;
                    label {
                        display: inline-block;
                        float: left;
                        line-height: 32px;
                    }
                    .input-box{
                        width: 75%;
                        float: left ;
                    }
                }
            }
        }

    }
</style>