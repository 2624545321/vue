<template>
    <div class="doc-repost">
        <el-dialog title="稿件转载列表" :visible.sync="modalShow" custom-class="spreadPath" width="80%" 
                :close-on-press-escape="false"
                :close-on-click-modal="false"
        >
            <div class="search-box">
                <div class="search-item">
                    <label for="title">标题：</label>
                    <div class="input-box">
                        <el-input name="title" size="small" v-model.trim="search.title" placeholder="标题"/>
                    </div>
                </div>
                <div class="search-item">
                    <label for="medianame">媒体名称：</label>
                    <div class="input-box">
                        <el-input name="medianame" size="small" v-model.trim="search.media_name" placeholder="媒体名称"/>
                    </div>
                </div>
                <div class="search-item">
                    <label for="medialevel">媒体级别：</label>
                    <div class="input-box">
                        <el-select size="small" v-model="search.media_level" filterable placeholder="媒体级别" >
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
            <el-table :data="data.repostlist"
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
                <el-table-column label="转载标题" align="left"  width="400">
                    <template slot-scope="scope">
                        <a :href="scope.row.url" target="_blank" :title="scope.row.title">{{ scope.row.title }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="转载媒体" align="center" >
                    <template slot-scope="scope">
                        <span :title="scope.row.mediaName">{{ scope.row.mediaName }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="栏目" align="center" >
                    <template slot-scope="scope">
                        <span :title="scope.row.docChannel">{{ scope.row.docChannel }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="媒体级别" align="center" width="100">
                    <template slot-scope="scope">
                        <span :title="scope.row.mediaLevel">{{ scope.row.mediaLevel }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="转载时间" align="center" >
                    <template slot-scope="scope">
                        <span :title="scope.row.pubTime">{{ scope.row.pubTime }}</span>
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
                @current-change="handleCurrentChange"
                @prev-click="handleCurrentChange"
                @next-click="handleCurrentChange"
            >
            </el-pagination>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'docRepost',
    props: [
        'modalObj',
        'modalShow'
    ],
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
                repostlist:[],
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
                title:'',
                media_name:'',
                media_level:'',
            }
        }
    },
    methods: {
        handleCurrentChange(val){
            this.page.CURRPAGE = val
            this.getArticleReprintPage()
        },
        getArticleReprintPage(){
            this.listLoading = true
            var media_type = this.modalObj.media_type == '全部' ? '' : this.modalObj.media_type;
            var media_level = this.search.media_level == '全部' ? '' : this.search.media_level;
            let params = {
                method : 'getArticleReprintPage',
                startDate : this.modalObj.startDate,
                endDate : this.modalObj.endDate,
                searchWord: this.modalObj.search_word,

                params : {
                    page: this.page.CURRPAGE,
                    pageSize:this.page.PAGESIZE,
                    mediaName:this.search.media_name,
                    mediaType: media_type,
                    mediaLevel:media_level,
                    zbGuid:this.modalObj.zbGuid,
                    title:this.search.title,
                    sort:'desc',

                    author:this.modalObj.author,
                    fieldName: this.modalObj.fieldName,
                    area: this.modalObj.area,
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
                _that.data.repostlist = result.Records;
                _that.page.ITEMCOUNT = result.TotalRecordCount;
                _that.page.PAGECOUNT = Math.ceil(_that.page.ITEMCOUNT/_that.page.PAGESIZE);
            })
        },
        initStatus(){
            this.page.CURRPAGE = 1
            this.search = {
                title:'',
                media_name:'',
                media_level:'',
            }
        },
        fullTextSearch(){
            this.page.CURRPAGE = 1
            this.getArticleReprintPage()
        },
    },
    watch:{
        modalShow : function (val) {
            if(val){
                this.initStatus()
                this.getArticleReprintPage()
            }
            this.$emit('update:modalShow', val);
        },
        
    }
}
</script>
<style lang="scss" scoped>
    .doc-repost{
        .el-dialog__body {
            padding-top: 10px !important;
            .search-box {
                overflow: hidden;
                .search-item {
                    float: left;
                    margin-right: 20px;
                    width: 25%;
                    label {
                        display: inline-block;
                        float: left;
                        line-height: 32px;
                    }
                    .input-box{
                        width: 70%;
                        float: left ;
                    }
                }
            }
        }

    }
    
</style>