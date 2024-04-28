<template>
    <div class="all-repost">
        <el-dialog title="所有稿件列表" :visible.sync="modalShow" custom-class="spreadPath" width="80%" 
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
                    <label for="productType">渠道：</label>
                    <div class="input-box">
                        <el-input name="productType" size="small" v-model.trim="search.productType" placeholder="渠道"/>
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
                <el-table-column label="标题" align="left"  width="400">
                    <template slot-scope="scope">
                        <a :title="scope.row.DOCTITLE " v-html="scope.row.DOCTITLE" target="_blank" :href="'/spread/#/reportDetail?guid='+scope.row.ZB_GUID_CHAR+'&indexname=product_232_formal'">{{ scope.row.DOCTITLE }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="发布日期" align="center">
                    <template slot-scope="scope">
                        <span >{{ scope.row.DOCPUBTIME | timeFormat('YYYY-MM-DD HH:mm:ss',true) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="渠道" align="center">
                    <template slot-scope="scope">
                        <span :title="scope.row.MC">{{ scope.row.MC }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="版面/栏目" align="center" >
                    <template slot-scope="scope">
                        <span :title="scope.row.DOCCHANNEL.split(';')[0]">{{ scope.row.DOCCHANNEL.split(';')[0] }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="原创" align="center" >
                    <template slot-scope="scope">
                        <span v-if="scope.row.isOriginal == 1">是</span>
                        <span v-else>否</span>
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
            },
            search: {
                title:'',
                productType:'',
            }
        }
    },
    methods: {
        fullTextSearch(val){
            this.page.CURRPAGE = typeof val == 'number' ? val : 1
            this.getAllArticlePage()
        },
        /**
         * 所有稿件列表
         */
        getAllArticlePage(){
            this.listLoading = true
            var params = {
                method:'getAllArticlePage',
                startDate : this.modalObj.startDate,
                endDate : this.modalObj.endDate,
                searchWord: this.modalObj.searchWord,
                // searchWord: this.search.title || this.modalObj.searchWord,
                params:{
                    title: this.search.title,   
                    page: this.page.CURRPAGE,
                    pageSize:this.page.PAGESIZE,
                    "sort":"",
                    productType: this.search.productType
                }
            }
            params.params = JSON.stringify(params.params);
            let postParams = {
                method:'post',
                url:'/cas/spread2v/homepage/main.do',
                data: params
            }
            let _that = this
            this.$http(postParams).then(function(res){
                _that.listLoading = false
                _that.data.list = res.Records;
                _that.page.ITEMCOUNT = res.TotalRecordCount;
                _that.page.PAGECOUNT = Math.ceil(_that.page.ITEMCOUNT/_that.page.PAGESIZE);
            
            }).catch(function (err) {
                console.log(err);
            })
        },
    },
    watch:{
        modalShow : function (val) {
            if(val){
                this.page.CURRPAGE = 1 
                this.search.title = ''
                this.search.productType = ''
                this.getAllArticlePage()
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
    .all-repost{
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