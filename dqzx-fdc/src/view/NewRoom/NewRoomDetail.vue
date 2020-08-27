<template>
    <div >
        <van-swipe class="img" :autoplay="3000" v-if="swiperlist.length>0">
            <van-swipe-item v-for="(item,index) in swiperlist" :key="index">
                <MyImage :src="item" fit="cover"/>
            </van-swipe-item>
        </van-swipe>
        <div v-if="roominfo.collect == undefined||roominfo.collect == 0" class="collect" @click="collectfang">
            <MyImage :src="shoucangpic" fit="cover"/>
        </div>
        <div v-if="roominfo.collect != undefined&&roominfo.collect > 0" @click="uncollectfang" class="collect">
            <MyImage :src="shoucangpicsele" fit="cover"/>
        </div>
        <div class="titlebox">
            <label class="title" v-if="roominfo.title !== undefined">{{roominfo.title}}</label>
            <div class="desclist">
                <div v-if="roominfo.nature !== undefined&&roominfo.nature == 1">
                    <label class="desc1">住宅</label>
                </div>
                <div v-else-if="roominfo.nature !== undefined&&roominfo.nature == 2">
                    <label class="desc1">商业</label>
                </div>
                <div v-else-if="roominfo.nature !== undefined&&roominfo.nature == 3">
                    <label class="desc1">别墅</label>
                </div>
                <div v-if="roominfo.nature !== undefined&&roominfo.nature == 4">
                    <label class="desc"> 商铺</label>
                </div>
                <div v-if="roominfo.nature !== undefined&&roominfo.nature == 5">
                    <label class="desc"> 写字楼</label>
                </div>
                <div v-if="roominfo.status !== undefined&&roominfo.status == 0">
                    <label class="desc"> 待售</label>
                </div>
                <div v-else-if="roominfo.status !== undefined&&roominfo.status == 1">
                    <label class="desc"> 已售</label>
                </div>
                <div v-else-if="roominfo.status !== undefined&&roominfo.status == 2">
                    <label class="desc">售罄</label>
                </div>
                <div v-else-if="roominfo.decoration !== undefined&&roominfo.decoration == 1">
                    <label class="desc">毛坯</label>
                </div>
                <div v-else-if="roominfo.decoration !== undefined&&roominfo.decoration == 2">
                    <label class="desc">简装</label>
                </div>
                <div v-else-if="roominfo.decoration !== undefined&&roominfo.decoration == 3">
                    <label class="desc">精装</label>
                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="xiangqin">
            <div class="div">
                <label class="title">楼盘详情</label>
            </div>
            <div class="detail">
                <div >
                    <label class="junjia" style="font-weight: bold">均价</label>
                    <label class="price" v-if="roominfo.unitPrice&&roominfo.unitPrice != 0">{{roominfo.unitPrice}}<span class="danwei">元/m²</span></label>
                    <label v-if="roominfo.unitPrice&&roominfo.unitPrice == 0">价格待定</label>
                </div>
                <van-row style="margin-top: 0.23rem;width:95%">
                   <van-col :span="12">
                        <label class="grey">户型</label>
                        <label v-if="huxin != ''" class="huxin">{{huxin}}</label>
                        <label v-else class="huxin">待定</label>
                   </van-col>
                    <van-col :span="11">
                        <label class="grey">建面</label>
                        <label v-if="mianji != ''" class="huxin">{{mianji}}</label>
                        <label v-else class="huxin">待定</label>
                    </van-col>
                </van-row>
                <div style="margin-top: 0.23rem">
                    <div>
                        <label class="grey">开盘</label>
                        <label class="huxin">{{roominfo.openDate}}</label>
                    </div>
                </div>
                <div style="margin-top: 0.23rem">
                    <label class="grey">交付日期</label>
                    <label class="huxin">{{roominfo.deliverDate}}</label>
                </div>
                <van-row style="margin-top: 0.23rem;width:95%">
                    <van-col :span="13">
                        <label class="grey">占地面积</label>
                        <label class="huxin">{{roominfo.totalArea}}㎡</label>
                    </van-col>
                    <van-col :span="11">
                        <label class="grey">建筑面积</label>
                        <label class="huxin">{{roominfo.buildingArea}}㎡</label>
                    </van-col>
                </van-row>
                <van-row style="margin-top: 0.23rem;width:95%">
                    
                    <van-col :span="13">
                        <label class="grey">容积率</label>
                        <label class="huxin">{{roominfo.volumeRate}}%</label>
                    </van-col>
                    <van-col :span="11">
                        <label class="grey" >绿化率</label>
                        <label class="huxin">{{roominfo.greeningRate}}%</label>
                    </van-col>
                </van-row>
                <van-row style="margin-top: 0.23rem;width: 95%">
                    <van-col :span="13">
                        <label  class="grey">规划车位</label>
                        <label class="huxin">{{roominfo.parkingNumber}}个</label>
                    </van-col>
                    <van-col :span="11">
                        <label class="grey">车位配比</label>
                        <label class="huxin">{{roominfo.parkingSpaceRatio}}</label>
                    </van-col>
                </van-row>
                <van-row style="margin-top: 0.23rem;width: 95%">
                    <van-col :span="13">
                        <label class="grey">规划楼栋</label>
                        <label class="huxin">{{roominfo.totalFloor}}栋</label>
                    </van-col>
                    <van-col :span="11">
                        <label class="grey">规划户数</label>
                        <label class="huxin">{{roominfo.totalHousehold}}户</label>
                    </van-col>
                    
                    
                </van-row>
                <van-row style="margin-top: 0.23rem;width: 95%">
                    <label  class="grey">物业公司</label>
                    <label class="huxin">{{roominfo.propertyCompany}}</label>
                </van-row>
                <van-row style="margin-top: 0.23rem;width: 95%">
                    <van-col :span="9">
                        <label  class="grey">物业费</label>
                    <label class="huxin">{{roominfo.propertyCosts}}月/㎡</label>
                    </van-col>
                    <!-- <van-col :span="6">
                        <label class="grey">水</label>
                        <label class="huxin" v-if="roominfo.water == 1">民水</label>
                        <label class="huxin" v-if="roominfo.water == 2">商业水</label>
                    </van-col>
                    <van-col :span="6">
                        <label  class="grey">电</label>
                        <label class="huxin" v-if="roominfo.electricity == 1">民电</label>
                        <label class="huxin" v-if="roominfo.electricity == 2">商电</label>
                    </van-col> -->
                </van-row>
                <div style="margin-top: 0.23rem;display:inline-block;width: 95%" @click="locations">
                    <label class="grey" style="float:left">地址</label>
                    <div class="dizhi" style="float:left;margin-top: -0.05rem">
                        {{roominfo.localName}}
                    </div>
                    <van-image class="location" :src="locationpic" fit="cover" width="0.31rem" height="0.31rem"
                             ></van-image>
                </div>
                <div class="bluerect">

                    <div class="zhiye">
                        <label >置业直通车</label>
                        <button class="btnyuyue" @click="yuyue">预约看房</button>
                    </div>
                    <div class="zuijia">
                        <label>系统推进最佳经纪人为您服务</label>
                    </div>

                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="zhulihuxin">
            <div class="div">
                <label class="dongtai1">主力户型<span>({{totalhuxin}})</span></label>
            </div>
            <div class="showarea10" v-if="huxinarrays.length>0">
                <div v-for="(item,index) in huxinarrays" :key="index">
                    <huxinBox
                            :img="item.img"
                            :name="item.name"
                            :status="item.status"
                            :type="item.type"
                            :area="item.area"
                            :id="item.id"
                    />
                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="dongtai">
            <div class="div">
                <label class="dongtai1">楼盘动态<span>({{total}})</span></label>
                <label class="gengduo" @click="dongtaigengduo">更多</label>
            </div>
            <div class="showarea">
                <div class="dongtaiarea" v-if="dongtailist.length != undefined&&dongtailist.length>0" :style="(dongtailist.length>=3)?'height: 8.13rem':''">
                    <ul
                      v-infinite-scroll="onLoad"
                      infinite-scroll-distance="10">
                      <div v-for="(item,index) in dongtailist" :key="index">
                          <DongTai  :img="item.img" :title="item.title" :desc="item.introduction"/>
                      </div>
                    </ul>
                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="zhoubian">
            <div class="div">
                <label class="dongtai1">位置与周边</label>
            </div>
            <div style="display: inline-block;width: 100%">
                <div style="display: inline-block;width: 100%;">
                    <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                        <li @click="clickaround(1);currentPage = 1" :class="{active:around==1}" style="margin-left: 15px;margin-bottom: 6.6px">公交</li>
                        <li @click="clickaround(2);currentPage = 1" :class="{active:around==2}" style="margin-left: 20px">学校</li>
                        <li @click="clickaround(3);currentPage = 1" :class="{active:around==3}" style="margin-left: 20px">医院</li>
                        <li @click="clickaround(4);currentPage = 1" :class="{active:around==4}" style="margin-left: 20px">商场</li>
                    </ul>
                </div>
                <div style="display: inline-block;width: 100%">
                    <div id="container"></div>
                </div>
                <van-row style="display: inline-block;width: 100%">
                    <div id="panel0" v-if="zhoubianarray.length != undefined&&zhoubianarray.length > 0" :style="(zhoubianarray.length >= 5)?'height: 3.6rem':''">
                        <div v-for="(item,index) in zhoubianarray" 
                        @click="openMarkerTipById1(index,$event)"  
                        @mouseout="onmouseout_MarkerStyle(index+1,$event)" :key="index">
                            <MapList  :name="item.name" :address="item.address" :distance="item.distance" />
                        </div>
                    </div>
                </van-row>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="tiwen">
            <div class="div">
                <label class="douzaiwen">大家都在问<span>({{totals}})</span></label>
                <label class="gengduo" @click="wentigengduo">更多</label>
            </div>
            <div class="wentilist" v-if="anslist.length != undefined&&anslist.length > 0">
                <WentiList :question="answer.content" :time="answer.time" :answer="answer.answer" :id="answer.id" type="new" :roomid="roomid" :area="mianji"></WentiList>
            </div>
            <div class="btn">
                <button class="tiwen" @click="tiwen">我要提问</button>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="tiwen">
            <div class="div">
                <label class="douzaiwen">置业顾问<span>({{jinjitotal}})</span></label>
            </div>
            <div class="div">
                <label style="margin-left: 0.34rem">为你提供以下服务：政策解读 楼盘导览 户型解析</label>
            </div>
            <div class="wentilist" v-if="jinjirenlist.length != undefined&&jinjirenlist.length > 0">
                <div v-for="(item,index) in jinjirenlist" :key="index">
                    <JinjiList :bname="item.bname" :bid="item.bid" :id="item.id" :nid="item.nid" :avatar="item.avatar" :phone="item.phone"/>
                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="tiwen">
            <div class="div">
                <label class="douzaiwen">猜你喜欢</label>
            </div>
            <div class="fcarr" v-if="zhoubianfcarr.length != undefined&&zhoubianfcarr.length>0">
                <div v-for="(item,index) in zhoubianfcarr" :key="index">
                    <RoomBox
                            :title="item.title"
                            :room_id="item.id"
                            :img="item.img[0]"
                            :price="item.unitPrice"
                            :status="item.status"
                            :areaId="item.areaid"
                            :min="item.minArea"
                            :max="item.maxArea"
                            :nature="item.nature"
                            danwei="元/m²起"
                    ></RoomBox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '../../mixin/mixin'
import { ImagePreview } from 'vant';
var map,placeSearch;
    export default {
        name: "NewRoomDetail",
        mixins:[mixin],
        components:{
            ImagePreview,
        },
        watch:{
            '$route.params.time'(){
               //执行数据更新查询
　　           this.init();
　　         }
        },
        created() {
            this.init();
        },
        mounted(){
            
        },
        data() {
            return {
                roominfo: {},
                swiperlist:[],
                huxinarrays:[],
                roomid: 0,
                anslist: [],
                locationpic: require('../../assets/images/icon/location.png'),
                mainhuxintype: [],
                position: [],
                dongtailist:[],
                marker: [],
                currentPage:1,
                pagesize0:5,
                totalss:0,
                windowsArr:[],
                selectedIndex:-1,
                page:0,
                total:0,
                totals:0,
                count:0,
                totalhuxin:0,
                around:1,
                mianji:'',
                jinjitotal:0,
                jinjirenlist:[],
                huxin:'',
                huxinarray:[],
                zhoubianarray:[],
                zhoubianfcarr:[],
                area:'',
                answer:'',
                shoucangpic:require('../../assets/images/czw/收藏a.png'),
                shoucangpicsele:require('../../assets/images/czw/收藏b.png'),
                ischn:false,
                refresh:true,
            }
        },
        methods: {
            init(){
                this.roomid = this.$route.params.id;
                // this.mianji = this.$route.query.area;
                this.getHomeInfo(this.roomid);
                this.getNewRoomQuestion(this.roomid);
                this.roomdongtai(this.roomid);
                this.getlocation();
            },
            getlocation(){
                this.$wxMethod.getLocation((res)=>{
                    console.log(res)
                },
                (err)=>{
                    console.log(err)
                })
            },
            previewImg(img){
                ImagePreview({
                   images: [
                      img
                   ],
                  closeable: true,
               });
            },
            initMap(){
                var longitude = '';
                var latitude = '';
                if(longitude == ''){
                    longitude = 116.397428;
                }
                if(latitude == ''){
                    latitude = 39.90923;
                }
                var center = [longitude, latitude];
                var map = new AMap.Map('container', {
                    resizeEnable: true,
                    zoom: 16,
                    scrollWheel: false,
                    center:center
                })

            },
            addzhoubian(val){
                console.log(val);
                this.currentPage = val;
                this.clickaround(this.around);
            },
            functionChina(str){
                for(let i=0;i<str.length;i++){
                    if(str.charCodeAt(i) < 255){
                        return false;
                    }
                }
                return true;
            },
            getHomeInfo(roomid) {
                let self = this;
                // console.log('12345')
                let token = localStorage.getItem("token");
                self.$axios.get('http://house-api.zjlaishang.com:9001/new/show/' + roomid, {
                    headers:{
                        'token':token
                        // token:token,
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        // 'TOKEN': token
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if (res.data.code == 200) {
                        self.roominfo = res.data.data;
                        let isarray0 =  (self.roominfo instanceof Array)
                        if(isarray0 == true){
                            if(self.roominfo.length == 0){
                                self.$toast("这个房子已下架");
                                self.$router.go(-1);
                            }
                        }
                        let j = 0;
                        let huxinarr = [];
                        let isarray = (self.roominfo.img instanceof Array);
                        let isarray2 = (typeof huxinarr);
                        self.swiperlist.length = 0;
                        self.huxinarrays.length = 0;
                        self.mianji = self.roominfo.minArea + "-" + self.roominfo.maxArea+"㎡";
                        self.totalhuxin = self.roominfo.unitType.length;
                        self.huxinarrays = self.roominfo.unitType;
                        self.jinjitotal = self.roominfo.broker.length;
                        self.jinjirenlist = self.roominfo.broker;
                        console.log(self.jinjirenlist);
                        self.getfujin(self.roomid);
                        if(self.roominfo.unitType != undefined&&self.roominfo.unitType.length > 0){
                            console.log(self.huxinarrays);
                            for(let i=0;i<self.roominfo.unitType.length;i++){
                                huxinarr.push(self.roominfo.unitType[i].type)
                            }
                            self.huxinarray = [];
                            for(var u=0,len=huxinarr.length;u<len;u++){
                                if(self.huxinarray.indexOf(huxinarr[u]) === -1){
                                    self.huxinarray.push(huxinarr[u]);
                                }
                           }
                            for(let k=1;k < self.huxinarray.length; k++){
                                for(let m=0;m<self.huxinarray.length-k;m++){
                                    if(self.huxinarray[m]>self.huxinarray[m+1]){
	                                   var temp = self.huxinarray[m];
	                                   self.huxinarray[m]=self.huxinarray[m+1]; 
	                                   self.huxinarray[m+1]=temp;
                                    }
                                }
                            }
                            for(let p=0;p<self.huxinarray.length;p++){
                                if(p == 0){
                                    self.huxin += ""+self.huxinarray[p];
                                }else{
                                    self.huxin += "/"+self.huxinarray[p];
                                }
                            }
                            self.huxin += "室";
                            self.ischn = self.functionChina(self.roominfo.localName);
                        }
                        if(isarray == true&&self.roominfo.img.length > 0){
                            self.roominfo.img.forEach(item=>{
                                self.swiperlist.push(item);
                            })
                        }else{
                            self.swiperlist.length = 0;
                        }
                        console.log(self.swiperlist);
                        // self.mainActiveIndex = self.roominfo.hasUnitType.split(',');
                        if(self.roominfo.local != undefined&&self.roominfo.local != null){
                            self.position = self.roominfo.local.split(',');
                            if(self.position.length < 2){
                                self.createMap(self.position[0],'');
                            }else{
                                self.createMap(self.position[0],self.position[1]);
                            }
                            // self.createMap(self.position[0],self.position[1]);
                            self.clickaround(1);
                        }else{
                            self.createMap('','');
                        }
                    } else {
                        self.$toast(res.data.msg);
                    }
                })
            },
            getfujin(roomid){
                let self = this;
                self.$axios.get("http://house-api.zjlaishang.com:9001/new/nearby/"+self.roominfo.areaId+'/'+roomid,{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        res.data.data.forEach(item=>{
                            self.zhoubianfcarr.push(item);
                        })
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            clickaround(index){
                this.around = index;
                let self = this;
                if(self.around == 1){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        if(self.position.length < 2){
                            self.createMap(self.position[0],'');
                        }else{
                            self.createMap(self.position[0],self.position[1]);
                        }
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    self.zhoubianarray.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
                        map.clearMap()
                        placeSearch = new AMap.PlaceSearch({
                            type: '公交', // 兴趣点类别
                            city: "0572", // 兴趣点城市
                            citylimit: true,  //是否强制限制在设置的城市内搜索
                            pageSize:self.pagesize0,
                            pageIndex: self.currentPage, // 页码
                            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                        });
                        var cpoint = [120.110881,30.873851]; //中心点坐标
                        if(self.roominfo.local != undefined&&self.roominfo.local != null){
                            cpoint[0] = self.position[0];
                            cpoint[1] = self.position[1];
                        }
                        placeSearch.searchNearBy('', cpoint, 1000, function(status, result) {
                            if(status != 'no_data'){
                                self.zhoubianarray = result.poiList.pois;
                               self.totalss = result.poiList.count;
                               for(let i=0;i<self.zhoubianarray.length;i++){
                                  self.addmarker(i, self.zhoubianarray[i]);
                                }
                                map.setFitView()
                            }
                        });
                    })
                }else if(self.around == 2){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        if(self.position.length < 2){
                            self.createMap(self.position[0],'');
                        }else{
                            self.createMap(self.position[0],self.position[1]);
                        }
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    self.zhoubianarray.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
                        map.clearMap()
                        placeSearch = new AMap.PlaceSearch({
                            type: '学校', // 兴趣点类别
                            city: "0572", // 兴趣点城市
                            citylimit: true,  //是否强制限制在设置的城市内搜索
                            pageSize:self.pagesize0,
                            pageIndex: self.currentPage, // 页码
                            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                        });
                        var cpoint = [120.110881,30.873851]; //中心点坐标
                        if(self.roominfo.local != undefined&&self.roominfo.local != null){
                            cpoint[0] = self.position[0];
                            cpoint[1] = self.position[1];
                        }
                        placeSearch.searchNearBy('', cpoint, 1000, function(status, result) {
                            if(status != 'no_data'){
                                self.zhoubianarray = result.poiList.pois;
                               self.totalss = result.poiList.count;
                               for(let i=0;i<self.zhoubianarray.length;i++){
                                  self.addmarker(i, self.zhoubianarray[i]);
                                }
                                map.setFitView()
                            }
                        });
                    })
                }else if(self.around == 3){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        if(self.position.length < 2){
                            self.createMap(self.position[0],'');
                        }else{
                            self.createMap(self.position[0],self.position[1]);
                        }
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    self.zhoubianarray.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
                        map.clearMap()
                        placeSearch = new AMap.PlaceSearch({
                            type: '医院', // 兴趣点类别
                            city: "0572", // 兴趣点城市
                            citylimit: true,  //是否强制限制在设置的城市内搜索
                            // map: map, // 展现结果的地图实例
                            pageSize:self.pagesize0,
                            pageIndex: self.currentPage, // 页码
                            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                        });
                        var cpoint = [120.110881,30.873851]; //中心点坐标
                        if(self.roominfo.local != undefined&&self.roominfo.local != null){
                            cpoint[0] = self.position[0];
                            cpoint[1] = self.position[1];
                        }
                        placeSearch.searchNearBy('', cpoint, 1000, function(status, result) {
                            if(status != 'no_data'){
                                self.zhoubianarray = result.poiList.pois;
                               self.totalss = result.poiList.count;
                               for(let i=0;i<self.zhoubianarray.length;i++){
                                  self.addmarker(i, self.zhoubianarray[i]);
                                }
                                map.setFitView()
                            }
                        });
                    })
                }else if(self.around == 4){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        if(self.position.length < 2){
                            self.createMap(self.position[0],'');
                        }else{
                            self.createMap(self.position[0],self.position[1]);
                        }
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    self.zhoubianarray.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
                        map.clearMap()
                        placeSearch = new AMap.PlaceSearch({
                            type: '商场', // 兴趣点类别
                            city: "0572", // 兴趣点城市
                            citylimit: true,  //是否强制限制在设置的城市内搜索
                            // map: map, // 展现结果的地图实例
                            pageSize:self.pagesize0,
                            pageIndex: self.currentPage, // 页码
                            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
                        });
                        var cpoint = [120.110881,30.873851]; //中心点坐标
                        if(self.roominfo.local != undefined&&self.roominfo.local != null){
                            cpoint[0] = self.position[0];
                            cpoint[1] = self.position[1];
                        }
                        placeSearch.searchNearBy('', cpoint, 3000, function(status, result) {
                            if(status != 'no_data'){
                                self.zhoubianarray = result.poiList.pois;
                               self.totalss = result.poiList.count;
                               for(let i=0;i<self.zhoubianarray.length;i++){
                                  self.addmarker(i, self.zhoubianarray[i]);
                                }
                                map.setFitView()
                            }
                        });
                    })
                }
            },
            addmarker(index,d){
                var lngX = d.location.getLng();
                var latY = d.location.getLat();
                let self = this;
                var markerOption = {
                  map: map,
                  position: new AMap.LngLat(lngX, latY)
                };
                var mar = new AMap.Marker(markerOption);
                this.marker.push(new AMap.LngLat(lngX, latY));
                var infoWindow = new AMap.InfoWindow({
                    content:
                      "<h3>" +
                      d.name +
                     "</h3>" +
                    self.TipContents(d.name, d.address) +
          `          </br>`,
                     size: new AMap.Size(300, 0),
                     autoMove: true,
                     offset: new AMap.Pixel(0, -30)
                 });
                 this.windowsArr.push(infoWindow);
                 var _this = this;
                 var aa = (e) => {
                   var obj = mar.getPosition();
                   this.map = obj //这里保存的地址经纬度
                   this.address = d.name //这里保存的是地址名字
                   infoWindow.open(map, obj);
                }
            },
            TipContents(name,address){
                if(
                    name == "" ||
                    name == "undefined" ||
                    name == null ||
                    name == " undefined" ||
                    typeof name == "undefined"
                ){
                    type = "暂无";
                }
                if(
                    address == "" ||
                    address == "undefined" ||
                    address == null ||
                    address == " undefined" ||
                    typeof address == "undefined"
                ){
                    address="暂无"
                }
                var str = `地址：${address}`
                return str
            },
            openMarkerTipById1(index,event){
                event.currentTarget.style.background = "#CAE1FF";
                this.selectedIndex = index
                this.map = this.marker[index]
                window.removeEventListener("click", this.demo);
                this.windowsArr[index].open(map, this.marker[index])
            },
            onmouseout_MarkerStyle(index,event){
                event.currentTarget.style.background = "";
            },
            collectfang(){
                let self = this;
                let token = localStorage.getItem("token")
                let roomid = self.roomid;
                self.$axios.post("http://house-api.zjlaishang.com:9001/new/collect/"+roomid,{
                    
                },{
                    headers:{
                        'TOKEN': token
                    }
                }).then(function (res) {
                    if(res.data.code == 200){
                        self.$toast(res.data.msg);
                    }else{
                        self.$toast(res.data.msg);
                    }
                    self.getHomeInfo(self.roomid);
                })
                .catch(function(err){
                    console.log(err);
                    self.getHomeInfo(self.roomid);
                })
            },
            uncollectfang(){
                let self = this;
                let token = localStorage.getItem("token")
                let roomid = self.roomid;
                self.$axios.delete("http://house-api.zjlaishang.com:9001/new/collect/"+roomid,{
                    headers:{
                        'TOKEN': token
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        self.$toast(res.data.msg);
                    }else{
                        self.$toast(res.data.msg);
                    }
                    self.getHomeInfo(self.roomid);
                })
                .catch(function(err){
                    console.log(err);
                    self.getHomeInfo(self.roomid);
                })
            },
            roomdongtai(roomid){
                let self = this;
                let token = localStorage.getItem("token");
                this.$axios.get('http://house-api.zjlaishang.com:9001/new/msg/'+roomid+'/'+self.page,{
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'TOKEN': token
                    }
                }).then(function (res) {
                    if(res.data.code == 200){
                        console.log(res.data);
                        res.data.data.forEach(item=>{
                            self.dongtailist.push(item)
                        })
                        self.total = res.data.total;
                        if(res.data.data.length >0){
                            self.refresh = true;
                        }else{
                            self.refresh = false;
                        }
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            selectAddress(e){
                console.log(e);
            },
            getNewRoomQuestion(roomid) {
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios('http://house-api.zjlaishang.com:9001/new/question/' + roomid, {
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'TOKEN': token
                    }
                }).then(function (res) {
                    if (res.data.code == 200) {
                        console.log(res.data);
                        self.anslist.length = 0;
                        self.anslist = res.data.data;
                        self.answer = self.anslist[0];
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth()+1;
                        let day = date.getDate();
                        let nowtime = year + '-' + month + '-'+day;
                        let ansdate = self.answer.create_time.split(" ");
                        let days = ansdate[0].split("-")
                        if(ansdate[0] == nowtime){
                            console.log("同一天");
                            self.answer.time = "今天"+ansdate[1];
                        }else if(days[0] == year){
                            console.log(ansdate);
                            self.answer.time = days[1]+'-'+days[2];
                        }else{
                            self.answer.time = ansdate[0];
                        }
                        self.totals = self.anslist.length;

                    } else {
                        self.$toast(res.data.msg);
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            },
            onLoad(){
                let self = this;
                self.page++;
                self.roomdongtai(self.roomid);
            },
            locations() {
                let self = this;
                let latitude = parseFloat(self.position[1]);
                let longitude = parseFloat(self.position[0]);
                let name = (self.roominfo.title == "")?"未设置":self.roominfo.title
                let address = (self.roominfo.localName == "")?"":self.roominfo.localName;
                let infoUrl = "";
                this.$wxMethod.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    name: name,
                    address: address,
                })
            },
            yuyue() {
                console.log("yuyue");
                // this.$router.push({path:'/yuyue',query:{type:'new',roomid:this.roomid}});
                window.location.href = 'http://'+window.location.host+'/yuyue/new/'+this.roomid+'/'+new Date().toString();
            },
            dongtaigengduo(){
                // this.$router.push({name:'dongtaigengduo',params:{type:'new',id:this.roomid}})
                window.location.href = 'http://'+window.location.host+'/dongtaigengduo/new/'+this.roomid;
            },
            tiwen(){
                let self = this;
                let roomid = self.roomid;
                let area = self.mianji;
                // self.$router.push({name:'tiwen',params:{id: roomid,type:'new'}});
                 window.location.href = 'http://'+window.location.host+'/tiwen/'+roomid+'/new';
            },
            wentigengduo(){
                let roomid = this.roomid;
                // this.$router.push({name:'wentigengduo',params:{id:roomid,type:'new'}});
                window.location.href = 'http://'+window.location.host+'/wentigengduo/'+roomid+'/new';
            },
            createMap(latitude, longitude) {
                let self = this;
                if((latitude == ''||longitude == '')||(latitude == undefined||longitude == undefined)||(latitude == NaN||longitude == NaN)){
                    map = new AMap.Map('container',{
                        resizeEnable: true, //是否监控地图容器尺寸变化
                        zoom:16, //初始化地图层级
                        center: [121.481834,31.223399] //初始化地图中心点
                    })
                }else{
                    map = new AMap.Map('container',{
                        resizeEnable: true, //是否监控地图容器尺寸变化
                        zoom:16, //初始化地图层级
                        center: [121.481834,31.223399] //初始化地图中心点
                    })
                    // map = new AMap.Map('container',{
                    //     resizeEnable: true, //是否监控地图容器尺寸变化
                    //     zoom:16, //初始化地图层级
                    //     center: [latitude,longitude] //初始化地图中心点
                    // })
                }
                // map = new AMap.Map('container',{
                //         resizeEnable: true, //是否监控地图容器尺寸变化
                //         zoom:16, //初始化地图层级
                //         center: [121.481834,31.223399] //初始化地图中心点
                //     })
            }
        }
    }
</script>

<style scoped>

    .collect{
        position: absolute; 
        right: 0.34rem; 
        top: 3.5rem; 
        width: 0.43rem; 
        height: 0.37rem;
    }
    .img {
        width: 100%;
        height: 4.17rem;

    }

    .titlebox {
        padding-top: 0.19rem;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .jiange {
        width: 100%;
        height: 0.13rem;
        background-color: #F1F3F7;
    }

    .desclist{
        margin-left: 0.29rem;
        margin-bottom: 0.20rem;
        margin-top: 0.20rem;
    }

    .titlebox .title {
        font-size: 0.47rem;
        line-height: 0.65rem;
        color: #333333;
        font-weight: bold;
        margin-left: 0.29rem;
        margin-right: 0.29rem;
    }

    .location{
        float: right;
        margin-right: 0.5rem;
    }

    .titlebox .commit {
        font-size: 10px;
        color: #999999;
    }

    .zhoubian{
        width: 100%;
        display: inline-block;
    }

    .zhoubian .div{
        width: 100%;
        display: inline-block;
    }

    .zhoubian .dongtai1{
        font-weight: bold;
        color: #333333;
        margin-left: 0.34rem;
        margin-top: 0.29rem;
        float: left;
        font-size: 20px;
    }

    .zhulihuxin{
        width: 100%;
        display: inline-block;
    }

    .zhulihuxin .div{
        width: 100%;
        display: inline-block;
    }

    .zhulihuxin .dongtai1{
        font-weight: bold;
        color: #333333;
        margin-left: 0.34rem;
        margin-top: 0.29rem;
        float: left;
        font-size: 20px;
    }

    .zhulihuxin .gengduo{
        margin-right: 15px;
        margin-top: 23px;
        font-size: 14px;
        color: #536DAE;
        float: right;
    }

    .zhulihuxin .showarea{
        width: 100%;
        height: 317px;
        margin-bottom: 14px;
        display: inline-flex;
        flex-direction: row;
        overflow-x: auto;
    }

    .zhulihuxin .showarea10{
        width: 100%;
        margin-bottom: 0.2rem;
        display: inline-flex;
        flex-direction: row;
        overflow-x: auto;
        overflow-y: hidden;
    }

    .dongtai{
        width: 100%;
        display: inline-block;
    }

    .dongtai .showarea{
        width: 100%;
        /* height: 317px;
        margin-bottom: 14px; */
    }

    .dongtai .div{
        width: 100%;
        display: inline-block;
    }

    .dongtai .dongtai1{
        font-weight: bold;
        color: #333333;
        margin-left: 0.34rem;
        margin-top: 0.29rem;
        float: left;
        font-size: 20px;
    }

    .dongtai .gengduo{
        margin-right: 0.49rem;
        margin-top: 0.45rem;
        font-size:0.26rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(83,109,174,1);
        float: right;
    }

    .desc1 {
        /* height:17px; */
        background:rgba(255,228,220,1);
        border-radius:0.05rem;
        /* width: 24px;
        height: 13px; */
        font-size:0.20rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(198,154,141,1);
        padding-top: 0.05rem;
        padding-left: 0.09rem;
        padding-bottom: 0.05rem;
        padding-right: 0.08rem;
        float: left;
    }

    .desc {
        margin-left: 0.19rem;
        background-color: #FFE4DC;
        border-radius:0.05rem;
        /* width: 24px;
        height: 13px; */
        font-size:0.20rem;
        padding-top: 0.05rem;
        padding-left: 0.09rem;
        padding-bottom: 0.05rem;
        padding-right: 0.08rem;
        color: #FFFFFF;
        float: left;
    }

    .xiangqin {
        width: 100%;
        display: inline-block;
    }

    .xiangqin .div{
        width: 100%;
        display: inline-block;
    }

    .xiangqin .title {
        font-weight: bold;
        color: #333333;
        margin-left: 0.34rem;
        margin-top: 0.29rem;
        float: left;
        font-size: 20px;
    }

    .dizhi{
        margin-left: 0.18rem;
        width:4.0rem;
        font-size:0.31rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(145,159,190,1);
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .xiangqin .gengduo {
        color: #536DAE;
        font-size: 14px;
        float: right;
        margin-right: 14px;
        margin-bottom: 11px;
        margin-top: 24px;
    }

    .xiangqin .detail {
        display: inline-block;
        margin-top: 0.12rem;
        margin-left: 0.34rem;
        flex-direction: column;
        width: 95%;
    }

    .xiangqin .junjia{
        font-size: 0.40rem;
        color: #333333;
    }

    .xiangqin .price{
        font-size:0.40rem;
        font-family:DINAlternate-Bold,DINAlternate;
        font-weight:bold;
        color:rgba(240,53,53,1);
        line-height:0.47rem;
        margin-left: 0.11rem;
    }

    .xiangqin .danwei{
        font-size: 13px;
        margin-left: 10px;
    }

    .xiangqin .grey{
        font-size:0.31rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.35rem;
    }

    .xiangqin .huxin{
        font-size:0.31rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.35rem;
        margin-left: 0.18rem;
        width: 4.0rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }

    .xiangqin .kaipan{
        color: #333333;
        font-size: 14px;
        margin-left: 10px;
    }

    .xiangqin .bluerect{
        width:6.90rem;
        /* height:1.19rem; */
        background:rgba(230,238,248,1);
        border-radius:0rem;
        margin-right: 0.29rem;
        margin-top: 0.43rem;
        margin-bottom: 0.37rem;
    }

    .bluerect .zhiye{
        padding-top: 0.42rem;
        margin-left: 0.42rem;
        margin-bottom: 0.02rem;
        font-size: 0.35rem;
        color: #151E38;
    }

    .bluerect .zuijia{
        margin-left: 0.42rem;
        padding-bottom: 10px;
        font-size:0.23rem;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(124,124,124,1); 
    }

    .dongtaiarea{
        overflow: auto;
        /* height: 8.13rem; */
    }

    .btnyuyue{
        width: 1.78rem;
        height: 0.59rem;
        border-radius: 0.29rem;
        border: none;
        background-color: #567CF3;
        margin-top: 0.02rem;
        margin-right: 0.31rem;
        color: #ffffff;
        font-size: 0.26rem;
        float: right;
    }

    .custom-content-marker {
        width: 25px;
        height: 34px;
    }

    .custom-content-marker img {
        width: 100%;
        height: 100%;
    }

    #container{
        width: 90%;
        height: 177px;
        margin-left: 15px;
        margin-right: 17px;
    }

    #container1{
        width: 100px;
        height: 100px;
    }

    .tiwen{
        width: 100%;
        display: inline-block;
    }

    .tiwen .div{
        width: 100%;
        display: inline-block;
    }

    .tiwen .douzaiwen{
        font-weight: bold;
        color: #333333;
        margin-left: 0.34rem;
        margin-top: 0.29rem;
        float: left;
        font-size: 20px;
    }

    .tiwen .gengduo{
        margin-right: 0.49rem;
        margin-top: 0.45rem;
        font-size:0.26rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(83,109,174,1);
        float: right;
    }

    .wentilist{
        margin-top: 12px;
        width: 100%;
    }

    #panel0{
        position: relative;
        background-color: white;
        /* height: 10.5rem; */
        overflow-y: auto;
        margin-bottom: 0.10rem;
    }
    .btn{
        margin-top: 14px;
        margin-left: 14px;
        margin-right: 14px;
        margin-bottom: 14px;
    }

    .btn .tiwen{
        color: white;
        font-size: 17px;
        background-image: linear-gradient(267deg,rgba(149,192,221,1),rgba(142,167,212,1));
        border-radius: 6px;
        border: none;
        height: 40px;
    }

    .zhuangxiu{
        width: 90%;
    }

    .zhuangxiu li{
        float: left;
        text-align: center;
        cursor: pointer;
        width: 1.15rem;
        height: 0.46rem;
        background:rgba(239,239,239,1);
        border-radius:0rem;
        font-size:0.23rem;
        line-height: 0.46rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(158,158,158,1);
        margin-top: 0.29rem;
        margin-bottom: 6.6px;
    }

    .zhuangxiu .active{
        background:rgba(83,135,247,1);
        color:rgba(255,255,255,1);
    }

    .fcarr{
        width: 100%;
        /* height: 10.5rem;
        overflow-y: auto; */
    }
</style>