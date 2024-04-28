<template>
    <div class="media-repost">
        <el-dialog :title="data.title" :visible.sync="modalShow" custom-class="spreadPath" width="80%" 
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
                <el-table-column label="转载标题" align="left"  width="400" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <a :title="scope.row.title " target="_blank" :href="scope.row.url">{{ scope.row.title }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="渠道" align="center">
                    <template slot-scope="scope">
                        <span >{{ scope.row.productType }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="频道" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.docChannel }}</span>
                    </template>
                </el-table-column>
               
                <el-table-column label="转载时间" align="center" >
                    <template slot-scope="scope">
                        <span> {{ scope.row.pubTime }} </span>
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
    </div>
</template>
<script>
import { timeFormat } from '@/utils/timeFormat'
export default {
    name:'allRepost',
    props:[
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
                list:[],
                title: !!this.modalObj.media_name ? this.modalObj.media_name + '转载稿件列表' : '转载稿件列表',
            },
            search: {
                title:'',
            }
            
        }
    },
    methods: {
        fullTextSearch(val){
            this.page.CURRPAGE = typeof val == 'number' ? val : 1
            this.getMediaReprintArticlePage()
        },
        getMediaReprintArticlePage(){
            this.listLoading=true
            var params = {
                method : 'getMediaReprintArticlePage',
                startDate : this.modalObj.startDate,
                endDate : this.modalObj.endDate,
                searchWord: this.modalObj.searchWord,
                // searchWord: this.search.title || this.modalObj.searchWord,
                params : {
                    title: this.search.title,
                    page: this.page.CURRPAGE,
                    pageSize:this.page.PAGESIZE,
                    mediaName:this.modalObj.media_name,
                    mediaType:this.modalObj.media_type,
                    sortField:'',
                    sort:'desc',
                    productType: this.modalObj.producttype,
                    channelType: this.modalObj.channeltype
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
            })
        }
    },
    watch:{
        modalShow : function (val) {
            if(val){
                this.page.CURRPAGE = 1 
                this.search.title = ''
                this.search.productType = ''
                this.getMediaReprintArticlePage()
            }
            this.$emit('update:modalShow', val);
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
    .media-repost{
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