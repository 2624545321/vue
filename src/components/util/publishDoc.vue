<template>
    <div class="publish-doc">
        <el-dialog :title="modalObj.author+'发稿列表'" :visible.sync="modalShow" custom-class="spreadPath" width="80%" 
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
                <el-table-column label="标题" align="left"  width="400">
                    <template slot-scope="scope">
                        <a :href="'/spread/#/detail?guid='+scope.row.zbGuid" target="_blank" :title="scope.row.title">{{ scope.row.title }}</a>
                    </template>
                </el-table-column>
                <el-table-column label="发布日期" align="center" >
                    <template slot-scope="scope">
                        <span >{{ scope.row.pubTime | timeFormat('YYYY-MM-DD HH:mm:ss',true) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="作者" align="center" >
                    <template slot-scope="scope">
                        <span >{{ scope.row.author }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="传播力" align="center" >
                    <template slot-scope="scope">
                        <span >{{ scope.row.ceiIndex }}</span>
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
    name:'publishDoc',
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
            }
        }
    },
    methods: {
        fullTextSearch(val){
            this.page.CURRPAGE = typeof val == 'number' ? val : 1
            this.getArticleCountPage()
        },
        getArticleCountPage(){
            this.listLoading = true
            var params = {
                method : 'getArticleCountPage',
                startDate : this.modalObj.startDate,
                endDate : this.modalObj.endDate,
                searchWord: this.modalObj.search_word,
                params : {
                    page: this.page.CURRPAGE,
                    pageSize:this.page.PAGESIZE,
                    dataType:"0",
                    author:this.modalObj.author,
                    sort :'desc',
                    sortField : 'ceiIndex',
                    title:this.search.title,
                    // productType :this.modalObj.producttype,
                    // channelType: this.modalObj.channeltype,
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
                this.getArticleCountPage()
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
    .publish-doc{
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
                        width: 80%;
                        float: left ;
                    }
                }
            }
        }

    }
</style>