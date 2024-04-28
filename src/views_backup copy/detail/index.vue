<template>
    <div class="app-container">
        <Header />
        <div class="influceDetail">
            <div class="webscreen">
                <div style="width: 98%;margin: 0 auto;line-height: 68px;text-align: left;
                    font-size: 24px;font-family:'微软雅黑';	box-sizing: border-box;overflow: hidden;">
                    <div style="width: 80%;	display: inline-block;font-size: 16px;font-weight: bold;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;line-height: 36px;padding-top: 20px;" v-html="data.InfDetails.title"></div>
                    <div style="float:right;margin-top: 16px;" class="kzw"><a href="javascript:void(0)" @click="scrollTo('cont')" v-show="status.showContent">看正文</a></div>
                    <div style="float:right;margin-top: 16px;margin-right: 1%" class="kzw"><a target="_blank" :href="data.InfDetails.url" v-if="data.InfDetails.url">查看原文</a></div>
                </div>
                <div class=" x_xlxx">
                    <dl class="xl_fgtime">
                    <dt style="margin-top: 3px;">发稿时间：
                        <div v-if="data.InfDetails.mediaType != '电子报'">{{data.InfDetails.pubTime | timeFormat('YYYY-MM-DD HH:mm:ss',true)}}</div>
                        <div v-else>{{data.InfDetails.pubTime | timeFormat('YYYY-MM-DD',true) }}</div>
                    </dt>
                    <dt style="margin-top: 3px;"> 作者：<div>{{data.InfDetails.author}}</div></dt>
                    <dt v-if="data.InfDetails.ceiIndex  > 0.1" style="clear: both">传播力指数：<span class="red">{{data.InfDetails.ceiIndex|fixedNum(2)}}</span></dt>
                    <dt v-if="data.InfDetails.contribOfRead * 100 > 0.1">阅读贡献：<span >{{data.InfDetails.contribOfRead*100|fixedNum(1) }}%</span></dt>
                    <dt v-if="data.InfDetails.websiteUV +data.InfDetails.wxUV +data.InfDetails.appUV +data.InfDetails.websiteComment +data.InfDetails.appComment +data.InfDetails.wxPraises +data.InfDetails.appPraises +data.InfDetails.wxShares +data.InfDetails.appShares!=0" style="clear: both">共有
                        <span>{{data.InfDetails.websiteUV +data.InfDetails.wxUV +data.InfDetails.appUV}}</span>
                         人浏览该稿件
                    </dt>
                    <dt v-if="data.InfDetails.websiteComment +data.InfDetails.appComment +data.InfDetails.wxPraises +data.InfDetails.appPraises +data.InfDetails.wxShares +data.InfDetails.appShares!=0">
                        <span>{{data.InfDetails.websiteComment +data.InfDetails.appComment +data.InfDetails.wxPraises +data.InfDetails.appPraises +data.InfDetails.wxShares +data.InfDetails.appShares}}</span> 人对稿件进行点赞、评论或分享。
                    </dt>
                    <dt  style="clear: both">
                        有
                        <span>{{data.hexinData.yijiLev.yijiLevNums0 + data.hexinData.yijiLev.yijiLevNums1 + data.hexinData.yijiLev.yijiLevNums2 + data.hexinData.yijiLev.yijiLevNums3
                                + data.hexinData.erjiLev.erjiLevNums0 + data.hexinData.erjiLev.erjiLevNums1 + data.hexinData.erjiLev.erjiLevNums2 + data.hexinData.erjiLev.erjiLevNums3
                                + data.hexinData.hexinLev.hexinLevNums0 + data.hexinData.hexinLev.hexinLevNums1 + data.hexinData.hexinLev.hexinLevNums2 + data.hexinData.hexinLev.hexinLevNums3}}</span> 家媒体采用该稿件，
                    </dt>
                    <dt >
                        其中包括核心媒体
                        <span >{{data.hexinData.hexinLev.hexinLevNums0 + data.hexinData.hexinLev.hexinLevNums1 + data.hexinData.hexinLev.hexinLevNums2 + data.hexinData.hexinLev.hexinLevNums3}}</span> 家、
                    </dt>
                    <dt >
                        一级媒体
                        <span >{{data.hexinData.yijiLev.yijiLevNums0 + data.hexinData.yijiLev.yijiLevNums1 + data.hexinData.yijiLev.yijiLevNums2 + data.hexinData.yijiLev.yijiLevNums3}}</span> 家、
                    </dt>
                    <dt >
                        二级媒体
                        <span>{{data.hexinData.erjiLev.erjiLevNums0 + data.hexinData.erjiLev.erjiLevNums1 + data.hexinData.erjiLev.erjiLevNums2 + data.hexinData.erjiLev.erjiLevNums3}}</span> 家。
                    </dt>
                    <dt style="clear: both">
                        稿件传播力渠道覆盖情况：<span></span></dt>
                    <dt v-if="channelNumData.web/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100> 0.1">
                        网站
                        <span>{{channelNumData.web/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100|fixedNum(1)}} %</span> ，
                    </dt>
                    <dt v-if="channelNumData.app/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100 > 0">
                        APP
                        <span class="redZ">{{channelNumData.app/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100|fixedNum(1) }}%</span> ，
                    </dt>
                    <dt v-if="channelNumData.weChat/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100 > 0">
                        微信
                        <span >{{channelNumData.weChat/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100|fixedNum(1)}}%</span> ，
                    </dt>
                    <dt v-if="channelNumData.newspaper/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100 > 0">
                        报纸
                        <span class="redZ" >{{channelNumData.newspaper/(channelNumData.web+channelNumData.app+channelNumData.newspaper+channelNumData.weChat)*100|fixedNum(1)}}%</span> ，
                    </dt>
                    <dt>
                        该稿件共经历
                        <span v-if='arrLengthNum(data.propagationPathArr)!=0'>
                            <span class="redZ" >{{arrLengthNum(data.propagationPathArr)-1}}</span>
                        </span>
                        <span v-else>
                            <span class="redZ">0</span>
                        </span> 层转载。
                    </dt>
                    </dl>
                    <div class="clear"></div>
                </div>

                <div class="jtnlist">
                    <p>
                        外部媒体转载
                        <span>
                            <img src="../../assets/imgs/xiaotubiao.png"  class="tubiao" @click="syshixianb()">
                        </span>
                        <!-- <a id="export" class="cursorPointer fr export-btn" @click="exportData()">导出</a> -->
                    </p>
                    <div class="xbbtabb">
                        <div class="detail_search_media_type">
                            <span @click="tabOrderType()" :class="{'detail_select': status.orderByLevel == true}">等级分类</span>
                            <span @click="tabOrderType()" :class="{'detail_select': status.orderByLevel == false}">类型分类</span>
                        </div>
                        <div class="content mt10" v-show="status.orderByLevel">
                            <div class="overflow_hidden">
                                <table  class="overflow_hidden media_div">
                                    <tr>
                                        <td class="x_mt_tit left_tit">
                                            核心媒体
                                        </td>
                                        <td class="right_info">
                                            <div style="text-align: left">
                                                共<span >{{data.hexinData.hexinLev.hexinLevNums0 + data.hexinData.hexinLev.hexinLevNums1 + data.hexinData.hexinLev.hexinLevNums2 + data.hexinData.hexinLev.hexinLevNums3}}</span>家媒体采用
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="zhankai" >展开全部</span>
                                                <span class="shouqi" >收起</span>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.hexinLev.hexinLevNums0 > 0">
                                                <div class="info_mark " >
                                                    网站有<span >{{data.hexinData.hexinLev.hexinLevNums0}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.hexinLev.hexinLev0" :key="index"><a class="one_media" :href="hexinweb.fullUrl" target="_blank">{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-else-if="data.hexinData.hexinLev.hexinLevNums2 > 0">
                                                <div class="info_mark">
                                                    客户端有<span >{{data.hexinData.hexinLev.hexinLevNums2}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinapp,index) in data.hexinData.hexinLev.hexinLev2" :key="index"><a class="one_media" :href="hexinapp.fullUrl"   target="_blank">{{hexinapp.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-else-if="data.hexinData.hexinLev.hexinLevNums1 > 0">
                                                <div class="info_mark">
                                                    微信有<span>{{data.hexinData.hexinLev.hexinLevNums1}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.hexinLev.hexinLev1" :key="index"><a class="one_media" :href="hexinweb.fullUrl" target="_blank">{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-else-if="data.hexinData.hexinLev.hexinLevNums3 > 0">
                                                <div class="info_mark">
                                                    自媒体有<span >{{data.hexinData.hexinLev.hexinLevNums3}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.hexinLev.hexinLev3" :key="index"><a class="one_media" :href="hexinweb.fullUrl"  target="_blank">{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="x_mt_tit left_tit">
                                            一级媒体
                                        </td>
                                        <td  class="right_info">
                                            <div style="text-align: left">
                                                共<span>{{data.hexinData.yijiLev.yijiLevNums0 + data.hexinData.yijiLev.yijiLevNums1 + data.hexinData.yijiLev.yijiLevNums2 + data.hexinData.yijiLev.yijiLevNums3}}</span>家媒体采用
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="zhankai">展开全部</span>
                                                <span class="shouqi">收起</span>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums0 > 0">
                                                <div class="info_mark">
                                                    网站有<span >{{data.hexinData.yijiLev.yijiLevNums0}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(yijiweb,index) in data.hexinData.yijiLev.yijiLev0" :key="index"><a class="one_media" :href="yijiweb.fullUrl"  target="_blank">{{yijiweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums2 > 0">
                                                <div class="info_mark">
                                                    客户端有<span>{{data.hexinData.yijiLev.yijiLevNums2}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(yijiapp,index) in data.hexinData.yijiLev.yijiLev2" :key="index"><a class="one_media" :href="yijiapp.fullUrl"  target="_blank">{{yijiapp.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums1 > 0"> 
                                                <div class="info_mark">
                                                    微信有<span>{{data.hexinData.yijiLev.yijiLevNums1}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(yijiweb,index) in data.hexinData.yijiLev.yijiLev1" :key="index"><a class="one_media" :href="yijiweb.fullUrl" target="_blank">{{yijiweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums3 > 0">
                                                <div class="info_mark">
                                                    自媒体有<span>{{data.hexinData.yijiLev.yijiLevNums3}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(yijiweb,index) in data.hexinData.yijiLev.yijiLev3" :key="index"><a class="one_media" :href="yijiweb.fullUrl"  target="_blank">{{yijiweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="x_mt_tit left_tit">
                                            二级媒体
                                        </td>
                                        <td  class="right_info">
                                            <div style="text-align: left">
                                                共<span>{{data.hexinData.erjiLev.erjiLevNums0 + data.hexinData.erjiLev.erjiLevNums1 + data.hexinData.erjiLev.erjiLevNums2 + data.hexinData.erjiLev.erjiLevNums3}}</span>家媒体采用
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="zhankai" >展开全部</span>
                                                <span class="shouqi">收起</span>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNums0 > 0">
                                                <div class="info_mark">
                                                    网站有<span >{{data.hexinData.erjiLev.erjiLevNums0}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(erjiLevweb,index) in data.hexinData.erjiLev.erjiLev0" :key="index"><a target="_blank" class="one_media" :href="erjiLevweb.fullUrl" >{{erjiLevweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNums2 > 0">
                                                <div class="info_mark">
                                                    客户端有<span>{{data.hexinData.erjiLev.erjiLevNums2}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(erjiLevapp,index) in data.hexinData.erjiLev.erjiLev2" :key="index"><a target="_blank" class="one_media" :href="erjiLevapp.fullUrl" >{{erjiLevapp.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNums1 > 0">
                                                <div class="info_mark">
                                                    微信有<span>{{data.hexinData.erjiLev.erjiLevNums1}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(erjiLevweb,index) in data.hexinData.erjiLev.erjiLev1" :key="index"><a target="_blank" class="one_media" :href="erjiLevweb.fullUrl" >{{erjiLevweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNums3 > 0">
                                                <div class="info_mark">
                                                    自媒体有<span>{{data.hexinData.erjiLev.erjiLevNums3}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(erjiLevweb,index) in data.hexinData.erjiLev.erjiLev3" :key="index"><a target="_blank" class="one_media" :href="erjiLevweb.fullUrl" >{{erjiLevweb.mediaName}}</a></span>
                                                </div>
                                            </div >
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                        <!-- 按照类型分类 -->
                        <div class="content" v-show="!status.orderByLevel">
                            <div class="overflow_hidden">
                                <table  class="overflow_hidden media_div">
                                    <tr>
                                        <td class="x_mt_tit left_tit">
                                            网站
                                        </td>
                                        <td class="right_info">
                                            <div style="text-align: left">
                                                共<span>{{data.hexinData.hexinLev.hexinLevNums0 + data.hexinData.yijiLev.yijiLevNums0 + data.hexinData.erjiLev.erjiLevNums0}}</span>家媒体采用
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="zhankai" >展开全部</span>
                                                <span class="shouqi" >收起</span>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.hexinLev.hexinLevNums0 > 0">
                                                <div class="info_mark " >
                                                    核心媒体有<span>{{data.hexinData.hexinLev.hexinLevNums0}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.hexinLev.hexinLev0" :key="index"><a target="_blank"  class="one_media" :href="hexinweb.fullUrl" >{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums0 > 0">
                                                <div class="info_mark">
                                                    一级媒体有<span>{{data.hexinData.yijiLev.yijiLevNums0}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinapp,index) in data.hexinData.yijiLev.yijiLev0" :key="index"><a target="_blank"  class="one_media" :href="hexinapp.fullUrl" >{{hexinapp.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNums0 > 0">
                                                <div class="info_mark">
                                                    二级媒体有<span>{{data.hexinData.erjiLev.erjiLevNums0}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.erjiLev.erjiLev0" :key="index"><a target="_blank"  class="one_media" :href="hexinweb.fullUrl" >{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="x_mt_tit left_tit">
                                            客户端
                                        </td>
                                        <td class="right_info">
                                            <div style="text-align: left">
                                                共<span>{{data.hexinData.hexinLev.hexinLevNums2 + data.hexinData.yijiLev.yijiLevNums2 + data.hexinData.erjiLev.erjiLevNums2}}</span>家媒体采用
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="zhankai" >展开全部</span>
                                                <span class="shouqi" >收起</span>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.hexinLev.hexinLevNums2 > 0">
                                                <div class="info_mark " >
                                                    核心媒体有<span>{{data.hexinData.hexinLev.hexinLevNums2}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.hexinLev.hexinLev2" :key="index"><a target="_blank" class="one_media" :href="hexinweb.fullUrl" >{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums2 > 0">
                                                <div class="info_mark">
                                                    一级媒体有<span>{{data.hexinData.yijiLev.yijiLevNums2}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinapp,index) in data.hexinData.yijiLev.yijiLev2" :key="index"><a target="_blank" class="one_media" :href="hexinapp.fullUrl">{{hexinapp.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNums2 > 0">
                                                <div class="info_mark">
                                                    二级媒体有<span>{{data.hexinData.erjiLev.erjiLevNums2}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.erjiLev.erjiLev2" :key="index"><a target="_blank" class="one_media" :href="hexinweb.fullUrl">{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="x_mt_tit left_tit">
                                            微信
                                        </td>
                                        <td class="right_info">
                                            <div style="text-align: left">
                                                共<span>{{data.hexinData.hexinLev.hexinLevNums1 + data.hexinData.yijiLev.yijiLevNums1 + data.hexinData.erjiLev.erjiLevNums1}}</span>家媒体采用
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="zhankai" >展开全部</span>
                                                <span class="shouqi" >收起</span>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.hexinLev.hexinLevNums1 > 0">
                                                <div class="info_mark " >
                                                    核心媒体有<span>{{data.hexinData.hexinLev.hexinLevNums1}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.hexinLev.hexinLev1" :key="index"><a target="_blank" class="one_media" :href="hexinweb.fullUrl" >{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums1 > 0">
                                                <div class="info_mark">
                                                    一级媒体有<span >{{data.hexinData.yijiLev.yijiLevNums1}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinapp,index) in data.hexinData.yijiLev.yijiLev1" :key="index"><a target="_blank" class="one_media" :href="hexinapp.fullUrl">{{hexinapp.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNum1 > 0">
                                                <div class="info_mark">
                                                    二级媒体有<span>{{data.hexinData.erjiLev.erjiLevNums1}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.erjiLev.erjiLev1" :key="index"><a target="_blank" class="one_media" :href="hexinweb.fullUrl" >{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="x_mt_tit left_tit">
                                            自媒体
                                        </td>
                                        <td class="right_info">
                                            <div style="text-align: left">
                                                共<span >{{data.hexinData.hexinLev.hexinLevNums3 + data.hexinData.yijiLev.yijiLevNums3 + data.hexinData.erjiLev.erjiLevNums3}}</span>家媒体采用
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span class="zhankai" >展开全部</span>
                                                <span class="shouqi" >收起</span>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.hexinLev.hexinLevNums3 > 0">
                                                <div class="info_mark " >
                                                    核心媒体有<span >{{data.hexinData.hexinLev.hexinLevNums3}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.hexinLev.hexinLev3" :key="index"><a target="_blank"  class="one_media" :href="hexinweb.fullUrl">{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.yijiLev.yijiLevNums3 > 0">
                                                <div class="info_mark">
                                                    一级媒体有<span>{{data.hexinData.yijiLev.yijiLevNums3}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinapp,index) in data.hexinData.yijiLev.yijiLev3"  :key="index"><a target="_blank"  class="one_media" :href="hexinapp.fullUrl">{{hexinapp.mediaName}}</a></span>
                                                </div>
                                            </div>
                                            <div class="overflow_hidden" v-if="data.hexinData.erjiLev.erjiLevNums3 > 0">
                                                <div class="info_mark">
                                                    二级媒体有<span>{{data.hexinData.erjiLev.erjiLevNums3}}</span>家：
                                                </div>
                                                <div class="fl media_order">
                                                    <span v-for="(hexinweb,index) in data.hexinData.erjiLev.erjiLev3"  :key="index"><a target="_blank" class="one_media" :href="hexinweb.fullUrl">{{hexinweb.mediaName}}</a></span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- v-show="data.infDetails.ceiIndex > 0" -->
                <div class="img_box">
                    <div class="column-title" >
                        <span class="title"><img src="../../assets/imgs/ico2.png" height="32" style="margin-right:10px;"/>转载媒体统计</span>
                    </div>
                    <div class="detail-echart-box" id="repost_media"></div>
                </div>
                
                <!-- v-show="data.infDetails.ceiIndex > 0" -->
                <div class="img_box" >
                    <div class="column-title">
                        <span class="title"><img src="../../assets/imgs/ico4.png" height="32" style="margin-right:10px;"/>原创稿件媒体采用传播力分析</span>
                    </div>
                    <div class="detail-echart-box" id="meida_analysis"></div>
                </div>

                <!--  v-show="data.infDetails.ceiIndex > 0" -->
                <div class="img_box">
                    <div class="column-title">
                        <span class="title"><img src="../../assets/imgs/ico2.png" height="32" style="margin-right:10px;"/>稿件传播力渠道覆盖</span>
                    </div>
                    <div class="detail-echart-box" id="spread_cover"></div>
                </div>

                <!-- v-show ="data.infDetails.ceiIndex > 0" -->
                <div class="img_box" >
                    <div class="column-title">
                        <span class="title"><img src="../../assets/imgs/ico5.png" height="32" style="margin-right:10px;"/>稿件传播力地域排行</span>
                    </div>
                    <div class="detail-echart-box" id="place_order"></div>
                </div>
                <!-- v-show="data.infDetails.ceiIndex>0" -->
                <div class="img_box"  style="width:98.2%;">
                    <div class="column-title">
                        <span class="title"><img src="../../assets/imgs/ico1.png" height="32" style="margin-right:10px;"/>稿件传播力路径图</span>
                        <el-button class="fr" @click="allScreen()" size="small">全屏展示</el-button>
                    </div>
                    <div class="detail-echart-box" id="graph"></div>
                </div>
                
                <div class="text_con" v-show="status.showContent">
                    <div id="conts" style="text-align: center;"></div>
                    <div id="cont"></div>
                </div>
            </div>

            <!-- 路径图 -->
            <el-dialog title="传播路径图" :visible.sync="status.dialogVisible" custom-class="spreadPath" width="80%">
                <div id="all-screen" style="width:100%; height:100%"></div>
            </el-dialog>
            

            <!-- <el-tooltip placement="top" content="返回顶部"> -->
                <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
            <!-- </el-tooltip> -->
        </div>
    </div>
</template>
<script>
import { Header } from '../../layout/components'
import BackToTop from '@/components/BackToTop'
import $ from 'jquery'
import { timeFormat } from '../../utils/timeFormat'
import { macarons } from '../../utils/echart_macarons_theam'
import node from '@babel/register/lib/node'
// import { mediacount } from './components/meidiaCount'
export default {
    components: {
        Header,
        BackToTop,
        // mediacount
    },
   data() {
        return {
           data:{
                guid:'',
                InfDetails:{
                    ceiIndex:0
                },
                links:[],
                propagationPathArr:[],
                hexinData:{
                    erjiLev:{},
                    hexinLev:{},
                    topLev:{},
                    yijiLev:{},
                },
                exportDataList:[],
                graphOptions:{},
            },
            status: {
                showContent: false,
                iframesrc5:'',
                iframesrc6:'',
                orderByLevel:true,
                dialogVisible:false
            },
            myBackToTopStyle: {
                right: '50px',
                bottom: '50px',
                width: '40px',
                height: '40px',
                'border-radius': '4px',
                'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
                background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
            },
            channelNumData : {
                web: 0,
                app: 0,
                newspaper: 0,
                weChat: 0,
            },
            placeHolderStyle : {
                normal : {
                    color: 'rgba(0,0,0,0)',
                    label: {show:false},
                    labelLine: {show:false}
                },
                emphasis : {
                    color: 'rgba(0,0,0,0)'
                }
            },
            dataStyle : {
                normal: {
                    label: {show:false},
                    labelLine: {show:false}
                }
            },
            graph : {
                series_categories:[],
                treeListData:[],
                treeListlink:[],
            },
            idTmr:''
        }
    },
    created(){
        this.data.guid = this.GetQueryString()
        this.getInflienceDetails()
        this.gethexinTable()
        this.getContent()
        this.InfluenceChannel()
        this.getMediaByZbGuid()
        this.getArticleDetail()
        this.getMediaTypeCEIByZbGuid()
        this.getAreaByZbGuid()
    },
    methods: {
        GetQueryString() { 
            var url = window.location.href
            let guid = url.split('=')[1]
            return guid;
        },
        scrollTo(id){
            document.getElementById(id).scrollIntoView();
        },
        /**
         * 获取详情
         */
        getInflienceDetails() {
          var params = {
            method: "getArticleDetail",
            zbGuid: decodeURI(this.data.guid),
          };
          var postParams = {
              method:'post',
              url:'/cas/xhs/bigScreen/main.do',
             data:params
          }
          let _that = this
          this.$http(postParams).then(function(data){
                _that.data.InfDetails =data.detail.Records[0].data[0];
                if(!!_that.data.InfDetails.url && _that.data.InfDetails.url.indexOf("mp.weixin.qq.com") > -1){
                    if(_that.data.InfDetails.url.indexOf('http') < 0){
                        _that.data.InfDetails.url = '//'+_that.data.InfDetails.url;
                    }
                }
                _that.propagationPath()
          })
        },
        gethexinTable() {
            var params = {
                method: "getAllLev",
                // zbGuid: '中国航空报_3291102707821570822_14567945',
                zbGuid: decodeURI(this.data.guid),
            };

            var postParams = {
                    method:'post',
                    url:'/cas/xhs/articleDetail/main.do',
                   data:params
                }
            let _that = this
            this.$http(postParams).then(function(data){
                _that.data.hexinData =data.data;
                _that.$set(_that.data.hexinData,data.data)
                setTimeout(function(){
                    _that.showZhankai();
                },100)
            
            });
        },
        showZhankai(){
            console.log('showZhankai')
            $(".right_info").each(function(){
                var show_zhankai = false;
                $(this).find('.media_order').each(function(){
                    if($(this).height()*1>78){
                    $(this).height("78px")
                    $(this).css("display","block")
                    show_zhankai = true;
                    }
                })
                if(!!show_zhankai){
                    $(this).find('.zhankai').show();
                }
                
            });
        },
        propagationPath() {
            var params = {
                "method": "getExReprintMaualsByGUID",
                "zbGuid": decodeURI(this.data.guid),
                "mc": this.data.InfDetails.productType,
            }
            var postParams = {
                method:'post',
                url:'/cas/xhs/bigScreen/main.do',
               data:params
            }
            let _that = this
            this.$http(postParams).then(function(result){
                _that.graph.treeListlink =result.links;
                _that.getTreeSymbol()
                _that.setNodeData(result.nodes);  
                _that.getTreeChart()
            });
        },
        /** 处理数图数据 listdata*/
        setNodeData(nodes) {
            var listdata = []
            var size = 33;
            // var colorArr = ["#253afb","#fb2222","#fabf48","#75fbf8"];
            
            //生成不同的颜色代码
            function createColorCode(code,colorArr){
                if($.inArray(code, colorArr)==-1 && code.length>6){
                    colorArr[0]=code;
                }else{
                    code='#'+Math.floor(Math.random()*16777215).toString(16);
                    createColorCode(code,colorArr);
                }
                return colorArr;
            }

            for(var i=0; i<nodes.length; i++){
                let that = this
                var category = nodes[i].name == this.graph.treeListlink[0].source ? 0 : 1
                // var category = nodes[i].target == $scope.data.treeListlink[0].source ? 0 : 1
                if (category == 0) {
                    size = 50
                } else if (category == 1) {
                    size = 30; 
                } else {
                    size=10
                }
                // var color=createColorCode('#'+Math.floor(Math.random()*16777215).toString(16),colorArr);
                var color = that.getColor(nodes[i].group)
                listdata.push({
                    category: category ,
                    name: nodes[i].name,
                    symbolSize: size,
                    value: nodes[i].value,
                    itemStyle: {
                        "color":color
                    },
                    draggable: "true"
                });
            }

            this.graph.treeListData = listdata
        },
         /** 处理数图 series_categories*/
        getTreeSymbol(){
            let levels = 2
            let temp = ["一","二","三"];
            for(var i=0; i<=levels; i++){
                this.graph.series_categories.push({
                    name : i===0?'父节点':'层级'+temp[i],
                    // symbol : i===0?'image://./img/file_one.png': (i===1?'image://./img/file_second.png':'circle'),
                    // symbol : i===0?'image://./img/file_one.png': 'circle',
                    // symbolSize: i===0?[405,388]:(i===1?[154,154]:[42,42])
                });
            }
        },
        getTreeChart() {
            var myGraphChart = this.$echarts.init(document.getElementById("graph"));
            var graphOptions = {
                animationDuration: 3000,
                animationEasingUpdate: 'quinticInOut',
                series: [{
                    name: '路径传播图',
                    type: 'graph',
                    layout: 'force',
                    force: {
                        repulsion: 3000,
                        gravity: 0.6,
                        // edgeLength: [10,50],
                        layoutAnimation: true,
                    },
                    data: this.graph.treeListData,
                    links:this.graph.treeListlink,
                    categories: this.graph.series_categories,
                    focusNodeAdjacency: false,
                    roam: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'bottom',
                            formatter: '{b}',
                        }
                    },
                }]
            };
            this.data.graphOptions = graphOptions
            myGraphChart.setOption(graphOptions);
        },
        getColor(group){
            // var colorArr = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
            var colorArr = ['#ff6254','#32e3ec', '#6df2c5', '#3da0ff', '#c1f488',  '#f38c2a', '#ff6254','#edc552'];

            if(group == 1){
                return colorArr[0]
            }else if(group == 3){
                return colorArr[1]
            }else if(group == 5){
                return colorArr[2]
            }else if(group == 7){
                return colorArr[3]
            }else if(group == 8){
                return colorArr[4]
            }else if(group == 18){
                return colorArr[5]
            }
        },
        
        InfluenceChannel() {
            var params = {
                "method": "getMediaTypeCEIByZbGuid",
                "zbGuid": decodeURI(this.data.guid),
            }
            var postParams = {
                method:'post',
                url:'/cas/xhs/articleDetail/main.do',
               data:params
            }
            let _that = this
            this.$http(postParams).then(function(data){
                var Records =data.Records
                for (var i = 0; i < Records.length; i++) {
                    if (Records[i].name == '网站') {
                        _that.channelNumData.web = Records[i].value;
                    } else if (Records[i].name == 'APP') {
                        _that.channelNumData.app = Records[i].value;
                    } else if (Records[i].name == '报纸') {
                        _that.channelNumData.newspaper = Records[i].value;
                    } else if (Records[i].name == '微信') {
                        _that.channelNumData.weChat = Records[i].value;
                    }
                }
            });
        },
        arrLengthNum(arr) {
            if (arr != undefined && arr != null) {
                return arr.length
            } else {
                return 0
            }
        },
        syshixianb(){
            $(".xbbtabb").slideToggle();
        },
        tabOrderType(){
            this.status.orderByLevel = !this.status.orderByLevel;
            let that = this
            setTimeout(function(){
                that.showZhankai();
            },100)
        },
        exportData(){
            
            // 所有核心媒体
              let hexinMedia = this.data.hexinData.hexinLev.hexinLev0.concat(this.data.hexinData.hexinLev.hexinLev1, this.data.hexinData.hexinLev.hexinLev2, this.data.hexinData.hexinLev.hexinLev3)
              let yijiMedia = this.data.hexinData.yijiLev.yijiLev0.concat(this.data.hexinData.yijiLev.yijiLev1, this.data.hexinData.yijiLev.yijiLev2, this.data.hexinData.yijiLev.yijiLev3)
              let erjiMedia = this.data.hexinData.erjiLev.erjiLev0.concat(this.data.hexinData.erjiLev.erjiLev1, this.data.hexinData.erjiLev.erjiLev2, this.data.hexinData.erjiLev.erjiLev3)
              this.data.exportDataList = hexinMedia.concat(yijiMedia, erjiMedia)
              alert(this.data.exportDataList)
                debugger

              this.export()
        },
        getContent() {
            var params = {
                method:'getIRContent',
                zbGuid: decodeURI(this.data.guid),
            }
            var postParams = {
                method:'post',
                url:'/cas/ce/articledetail/main.do',
                data: params
            }
            let _that = this
            this.$http(postParams).then(function(data){
                if (data.Records.length>0) {
                    var result = data.Records[0].IR_CONTENT;
                    // console.log(result)
                    if (result == null || result == undefined) {
                    $('.text_con').hide()
                        _that.status.showContent = false;
                    }else{
                        _that.status.showContent = true;
                    }
                    if (result != null) {
                        var result = result.replace(/&lt;/g, '<')
                        result = result.replace(/&gt;/g, '>')
                        //result= result.replace(/&nbsp;/g,'    ')
                        result = result.replace(/&nbsp;/g, '')
                        result = result.replace(/　　/g, '')
                        result = result.replace(/\n\n/g, '\n')
                        result = result.replace(/\n/g, '\n')

                        result = result.replace(/&quot;/g, '"')
                        result = result.replace(/&amp;nbsp;/g, ' ')
                        result = result.replace(/&amp;/g, '&')
                        result = result.replace(/; /g, '')
                        result = result.replace(/;/g, '')
                        var aa = "       ";
                        var c = aa.concat(result);
                        $('#cont').html("<pre>" + c + "</pre>");
                    }
                    $("img").one("error", function(e) {
                        $(this).css({
                        'display': 'none' //图片加载失败让其隐藏
                        });
                    });
                } else {
                    $('.text_con').hide()
                }
            })
        },
        getMediaByZbGuid(){
            var params = {
              method: "getMediaByZbGuid",
              zbGuid: decodeURI(this.data.guid),
            }
            var postParams = {
                method:'post',
                url:'/cas/xhs/articleDetail/main.do',
                data:params
            }
            let _that = this
            this.$http(postParams).then(function(data){
                var result = data.Records;
                _that.getRepostMedia(result)
            })
        },
        getRepostMedia(result){
            var series_data = [];
            for(var key in result){
                var one_data = {
                    name : '',value:''
                }
                one_data.name = key;
                one_data.value = result[key];
                series_data.push(one_data);

            }
            var option = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} 次({d}%)"
                },
                series : [
                    {
                        name: '转载数',
                        type: 'pie',
                        radius : '80%',
                        center: ['50%', '50%'],
                        data:series_data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            var myChart = this.$echarts.init(document.getElementById('repost_media'));
            myChart.setOption(option);
        },
        /**
         * 雷达图
         */
        getArticleDetail(){
            var params = {
              method: "getArticleDetail",
              zbGuid: decodeURI(this.data.guid),
            }
            var postParams = {
                method:'post',
                url:'/cas/xhs/bigScreen/main.do',
                data:params
            }
            let _that = this
            this.$http(postParams).then(function(result){
                var lists = result;
                var listInfo = lists.detail.Records[0].data[0];
                var myChart = _that.$echarts.init(document.getElementById('meida_analysis'));
                var exCoreMedias = listInfo.exCoreMedias,
                    exLv1Medias = listInfo.exLv1Medias,
                    exLv2Medias = listInfo.exLv2Medias,
                    coreMedias = 0;
                var exmedias=listInfo.exmedias.length;
                var max = 0;
                if(exCoreMedias > exLv1Medias){
                    if(exCoreMedias > exLv2Medias){
                        max = exCoreMedias;
                    }else{
                        max = exLv2Medias;
                    }
                }else{
                    if(exLv1Medias > exLv2Medias){
                        max = exLv1Medias;
                    }else{
                        max = exLv2Medias;
                    }
                }
                if(max < exmedias){
                    max = exmedias;
                }

                for(var i = 0;i<listInfo.exmedias.length;i++){
                    if(listInfo.exmedias[i].mediaLevel == "核心头条"){
                        coreMedias++;
                    }
                };
                var option = {
                    tooltip: {},
                    
                    radar: {
                        name: {
                            textStyle: {
                                color: 'black',
                                // backgroundColor: '#999',
                                // borderRadius: 3,
                                // padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '核心媒体', max: max},
                            { name: '一级媒体', max: max},
                            { name: '二级媒体', max: max},
                        ],
                        center: ['50%', '60%']
                    },
                    series: [{
                        name: '媒体分析',
                        type: 'radar',
                        areaStyle: {normal: {}},
                        data: [
                            {
                                value: [exCoreMedias, exLv1Medias, exLv2Medias],
                                name: '原创稿件影响力分析'
                            }
                        ]
                    }]
                };
                myChart.setOption(option);
            })
        },
        getMediaTypeCEIByZbGuid(){
            var params = {
              method: "getMediaTypeCEIByZbGuid",
              zbGuid: decodeURI(this.data.guid),
            }
            var postParams = {
                method:'post',
                url:'/cas/xhs/bigScreen/main.do',
                data:params
            }
            let _that = this
            this.$http(postParams).then(function(result){
                var data=result.Records;
                var xMarks=new Array();
                var series=new Array();
                var sum=0;
                if(data!=null &&data.length>0){
                    //数据排序
                    data.sort(function(value1, value2) {
                        var num1 = parseInt(value1.value);
                        var num2 = parseInt(value2.value);
                        return  num1-num2;
                    });
                    //数据算和cddcda
                    for(var i=data.length-1;i>=0;i--){
                        //去除值为0的项
                        if(data[i].value==0){
        //                    data.splice(0,i+1);
                        }
                        sum+=data[i].value;
                    }
                    for(var j=data.length-1;j>=0;j--){
                        //得到图例数组
                        if(data[j].value==0)
                            continue;
                        xMarks.push(data[j].name);
                        //生成series数据
                        var serie={
                            name:j+1,
                            type:'pie',
                            clockWise:false,
                            radius : [20*(j+3), 20*(j+4)],
                            itemStyle : _that.dataStyle,
                            data:[
                                data[j],
                                {
                                    value:(sum-data[j].value).toFixed(2),
                                    name:'invisible',
                                    itemStyle : _that.placeHolderStyle,
                                    tooltip:{show: false},
                                }
                            ]
                        };
                        series.push(serie);
                    }

                    // 自媒体
                    xMarks.push('自媒体');
                }
                var option = {
                    title: {
                        text: '',
                        x: 'center',
                        y: 'center',
                        itemGap: 20,
                        textStyle : {
                            color : 'rgba(30,144,255,0.8)',
                            fontFamily : '微软雅黑',
                            fontSize : 35,
                            fontWeight : 'bolder'
                        }
                    },
                    tooltip : {
                        show: true,
                        formatter: "{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient : 'vertical',
                        x : document.getElementById('spread_cover').offsetWidth / 2,
                        y : 95,
                        itemGap:12,
                        data:xMarks
                    },
                    series : series
                };
                var myChart = _that.$echarts.init(document.getElementById('spread_cover'),macarons);
                myChart.setOption(option);
            })
        },
        getAreaByZbGuid(){
            var params = {
              method: "getAreaByZbGuid",
              zbGuid: decodeURI(this.data.guid),
            }
            var postParams = {
                method:'post',
                url:'/cas/xhs/area/main.do',
                data:params
            }
            let _that = this
            this.$http(postParams).then(function(result){
                var myChart = _that.$echarts.init(document.getElementById('place_order'), macarons);
                var option = {
                    title : {
                        text: '',
                        subtext: ''
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        data:['转载量'],
                        show:false

                    },
                    calculable : true,
                    series : [
                        {
                            name:'转载量',
                            type:'pie',
                            radius : '65%',
                            clockWise : false,
                            center: ['50%', '50%'],
                            data:result,
                            itemStyle: {
                                normal: {
                                    // color: 各异,
                                    borderColor: '#fff',
                                    borderWidth: 1,
                                    label: {
                                        show: true,
                                        position: 'outer'
                                    },
                                    labelLine: {
                                        show: true,
                                        length: 20,
                                        lineStyle: {
                                            // color: 各异,
                                            width: 1,
                                            type: 'solid'
                                        }
                                    }
                                }
                            }
                        }
                    ]
                };

                myChart.setOption(option);
            })
        },
        export() {
            if (this.getExplorer() == 'ie') {
                var curTbl = document.getElementById(tableid);
                var oXL = new ActiveXObject("Excel.Application");
                var oWB = oXL.Workbooks.Add();
                var xlsheet = oWB.Worksheets(1);
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                sel.select();
                sel.execCommand("Copy");
                xlsheet.Paste();
                oXL.Visible = true;

                try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls",
                            "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                    print("Nested catch caught " + e);
                } finally {
                    oWB.SaveAs(fname);
                    oWB.Close(savechanges = false);
                    oXL.Quit();
                    oXL = null;
                    this.idTmr = window.setInterval("Cleanup();", 1);
                }

            } else {
                // $('#export').attr('href',tableToExcel());
                this.tableToExcel()
            }
        },
        Cleanup() {
            window.clearInterval(idTmr);
            // 垃圾回收
            CollectGarbage()
        },
        tableToExcel(){
            var uri = 'data:application/vnd.ms-excel;base64,';
            // <tr><td >关键词</td><td>权重</td></tr>
            var bodyHead = '<html><head><meta charset="UTF-8"><title>关键词</title>'
                            +'</head><body>'
                            +'<table>'
            var bodyFooter = '</table></body></html>';
            var template = '<tr><td>序号</td><td>转载标题</td><td>转载链接</td><td>转载媒体</td><td>转载级别</td><td>转载时间</td></tr>'
            var base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            };
            var format = function(s, c) {
                return s.replace(/{(\w+)}/g, c)
            }
            return function(event) {
                var list = this.data.exportDataList
                for (let i = 0; i < list.length; i++) {
                    template += '<tr><td>'+ (i+1) +"</td><td>"+list[i].title+"</td><td>"+list[i].url+"</td><td>"+list[i].mediaName+"</td><td>"+list[i].mediaLevel+"媒体</td><td>"+ timeFormat(list[i].pubTime)+"</td></tr>"
                }
                template = bodyHead + template + bodyFooter;
                $('#export').attr('href',uri + base64(template));
            }
        },
        getExplorer() { 
            var explorer = window.navigator.userAgent ;  
            //ie  
            if (explorer.indexOf("MSIE") >= 0) {
                    return 'ie';
            }
            //firefox  
            else if (explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
            }
            //Chrome  
            else if (explorer.indexOf("Chrome") >= 0) {
                return 'Chrome';
            }
            //Opera  
            else if (explorer.indexOf("Opera") >= 0) {
                return 'Opera';
            }
            //Safari  
            else if (explorer.indexOf("Safari") >= 0) {
                return 'Safari';
            }
        },
        allScreen(){
            this.status.dialogVisible = true
            let _that = this
            setTimeout(function(){
                let allScreen = _that.$echarts.init(document.getElementById("all-screen"));
                allScreen.setOption(_that.data.graphOptions);
            },300)
        },

    },
    filters:{
        timeFormat(value,type,flag){
            return timeFormat(value,flag,type)
        },
        fixedNum(value,num){
            return(value.toFixed(num))
        }
    }
}
</script>
<style lang="scss">
    .media_order {
        a {
            color: #337ab7;
        }
        a:hover{
            color: #337ab7;
        }
    }
    .spreadPath {
        .el-dialog__body {
            height: 500px;
        }
        div {
            width: 100%;
            height: 100%;
        }
    }

</style>