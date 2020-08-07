<template>
    <div style="overflow-x: hidden">
        <van-swipe v-if="roominfo.imgList&&roominfo.imgList.length >=0" class="img" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in roominfo.imgList" :key="index">
                <MyImage :src="item" fit="cover"/>
            </van-swipe-item>
        </van-swipe>
        <div v-if="roominfo.collect == undefined||roominfo.collect == 0" class="collect" @click="collectit">
            <MyImage :src="shoucangpic" fit="cover"/>
        </div>
        <div v-if="roominfo.collect != undefined&&roominfo.collect > 0" class="collect"  @click="uncollectit">
            <MyImage :src="shoucangpicsele" fit="cover"/>
        </div>
        <div class="titlebox">
            <label class="title" v-if="roominfo.title !== undefined">{{roominfo.title}}</label>
            <div>
                <div v-if="year >= 0&&year < 2">
                    <label class="desc1" style="float: left">不满二</label>
                </div>
                <div v-else-if="year >= 2&&year <5">
                    <label class="desc1" style="float: left">满二</label>
                </div>
                <div v-else-if="year >= 5">
                    <label class="desc1" style="float: left">满五</label>
                </div>
                <div v-if="roominfo.elevator !== undefined&&roominfo.elevator == 1">
                    <label class="desc" style="float: left">不带电梯</label>
                </div>
                <div v-else-if="roominfo.elevator !== undefined&&roominfo.elevator == 2">
                    <label class="desc" style="float: left">带电梯</label>
                </div>
                <div v-if="roominfo.only !== undefined&&roominfo.only == 1">
                    <label class="desc" style="float: left">唯一住房</label>
                </div>
                <div v-else-if="roominfo.only !== undefined&&roominfo.only == 2">
                    <label class="desc" style="float: left">不是唯一住房</label>
                </div>
                <div v-if="roominfo.decoration !== undefined&&roominfo.decoration == 1">
                    <label class="desc" style="float: left">毛坯</label>
                </div>
                <div v-else-if="roominfo.decoration !== undefined&&roominfo.decoration == 2">
                    <label class="desc" style="float: left">简装</label>
                </div>
                <div v-else-if="roominfo.decoration !== undefined&&roominfo.decoration == 3">
                    <label class="desc" style="float: left">精装修</label>
                </div>
            </div>
            <div class="flex">
                <div class="div1">
                    <label class="top">{{roominfo.totalPrice}}万</label>
                    <div>
                        <label class="desc0">总价</label>
                    </div>
                </div>
                <div class="div1" >
                    <label class="top">{{roominfo.huxin}}</label>
                    <div>
                        <label class="desc0">户型</label>
                    </div>
                </div>
                <div class="div1" >
                    <label class="top">{{roominfo.area}}m</label>
                    <div>
                        <label class="desc0">面积</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="xiangqin">
            <div class="div">
                <label class="title">楼盘详情</label>
            </div>
            <div class="detail">
                <div>
                    <label class="junjia">总价</label>
                    <label class="price" v-if="roominfo.totalPrice&&roominfo.totalPrice != 0">{{roominfo.totalPrice}}<span class="danwei">万</span></label>
                    <label class="price" v-if="roominfo.totalPrice&&roominfo.totalPrice == 0">价格待定</label>
                </div>
                <div>
                    <label class="grey">单价</label>
                    <label v-if="roominfo.unitPrice&&roominfo.unitPrice != 0" class="huxin">约{{roominfo.unitPrice}}元/m²</label>
                    <label v-if="roominfo.unitPrice&&roominfo.unitPrice == 0" class="huxin">价格待定</label>
                    <label v-if="roominfo.unitPrice === undefined" class="huxin">价格待定</label>
                    <label class="grey" style="margin-left: 75px">楼层</label>
                    <label v-if="roominfo.floor" class="huxin">{{roominfo.floor}}/{{roominfo.level}}层</label>
                </div>
                <div>
                    <label class="grey">楼型</label>
                    <label class="huxin">{{roominfo.huxin}}</label>
                    <label class="grey" style="margin-left: 101px">朝向</label>
                    <label class="huxin">南</label>
                </div>
                <div>
                    <label class="grey">装修</label>
                    <label v-if="roominfo.decoration&&roominfo.decoration == 1" class="huxin">毛坯</label>
                    <label v-if="roominfo.decoration&&roominfo.decoration == 2" class="huxin">简装</label>
                    <label v-if="roominfo.decoration&&roominfo.decoration == 3" class="huxin">精装</label>
                    <label class="grey" style="margin-left: 101px">电梯</label>
                    <label v-if="roominfo.elevator&&roominfo.elevator == true" class="huxin">有</label>
                    <label v-if="roominfo.elevator&&roominfo.elevator == false" class="huxin">没有</label>
                    <label v-if="roominfo.elevator == null" class="huxin">没有</label>
                </div>
                <div>
                    <label class="grey">年代</label>
                    <label class="huxin">{{roominfo.putYear}}</label>
                    <label class="grey" style="margin-left: 101px">产权</label>
                    <label class="huxin">{{roominfo.property}}年</label>
                </div>
                <div>
                    <label class="grey">首付</label>
                    <label class="huxin">约{{shoufu}}万，月供{{yuefu}}</label>
                </div>
                <div>
                    <label class="grey">税费</label>
                    <label class="zixun">咨询</label>
                </div>
                <div style="width: 100%">
                    <label class="grey" style="float:left;">小区</label>
                    <label class="address0" style="float:left">{{roominfo.name}}</label>
                    <van-image class="location" :src="locationpic" fit="cover" width="20px" height="20px"
                               @click="locations"></van-image>
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
        <!-- <div class="jiange"></div> -->
        <!-- <div class="dongtai">
            <div class="div">
                <label class="dongtai1">楼盘动态<span>({{total}})</span></label>
                <label class="gengduo" @click="dongtaigengduo">更多</label>
            </div>
            <div class="showarea">
                <div style="overflow:auto;height: 2.6rem" v-if="dongtailist.length != undefined&&dongtailist.length>0">
                    <ul
                      v-infinite-scroll="onLoad"
                      infinite-scroll-distance="10">
                      <div v-for="(item,index) in dongtailist" :key="index">
                          <DongTai  :img="item.img" :title="item.title" :desc="item.introduction"/>
                      </div>
                    </ul>
                </div>
            </div>
        </div> -->
        <div class="jiange"></div>
        <div class="zhoubian">
            <!-- <label class="weizhi">位置与周边</label> -->
            <div class="div3">
                <label class="title3">位置与周边</label>
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
                <div style="display: inline-block;width: 100%" v-if="zhoubianarray.length != undefined&&zhoubianarray.length > 0">
                    <div id="panel2">
                        <div v-for="(item,index) in zhoubianarray" 
                        @click="openMarkerTipById1(index,$event)"  
                        @mouseout="onmouseout_MarkerStyle(index+1,$event)" :key="index">
                            <MapList  :name="item.name" :address="item.address" :distance="item.distance" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div id="container"></div> -->
        </div>
        <div class="jiange"></div>
        <div class="tiwen">
            <div class="div">
                <label class="douzaiwen">大家都在问<span>({{totals}})</span></label>
                <label class="gengduo" @click="wentigengduo">更多</label>
            </div>
            <div class="wentilist" v-if="anslist.length > 0">
                <WentiList :question="answer.content" :time="answer.ctime" :answer="answer.answer" :id="answer.id" type="old" :roomid="roomid" area=""></WentiList>
            </div>
            <div class="btn">
                <button class="tiwen" @click="tiwen">我要提问</button>
            </div>
        </div>
        <div class="tiwen">
            <div class="div">
                <label class="douzaiwen">猜你喜欢</label>
            </div>
            <div class="fcarr" v-if="zhoubianfcarr.length>0">
                <div v-for="(item,index) in zhoubianfcarr" :key="index">
                    <secRoomBox
                        :title="item.name"
                        :price="item.totalPrice"
                        :se_room_id="item.id"
                        :address="item.localName"
                        :img="item.img"
                    ></secRoomBox>
                </div>
            </div>
        </div>
<!--        <div class="tiwen">-->
<!--            <div class="div">-->
<!--                <label class="douzaiwen">大家都在问<span>({{totals}})</span></label>-->
<!--                <label class="gengduo" @click="wentigengduo">更多</label>-->
<!--            </div>-->
<!--            <div class="wentilist" v-if="anslist.length > 0">-->
<!--                <WentiList :question="answer.content" :time="answer.ctime" :answer="answer.answer" :id="answer.id"></WentiList>-->
<!--            </div>-->
<!--            <div class="btn">-->
<!--                <button class="tiwen" @click="tiwen">我要提问</button>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script>
import mixin from '../../mixin/mixin'
var map,placeSearch;
    export default {
        name: "secondhandDetail",
        
        data(){
            return{
                roominfo:{},
                postion:[],
                locationpic:require('../../assets/images/icon/location.png'),
                total:0,
                dongtailist:[],
                page:0,
                totals:0,
                roomid:0,
                anslist:[],
                answer:'',
                around:1,
                pagesize0:50,
                currentPage:1,
                totalss:0,
                marker:[],
                windowsArr:[],
                zhoubianarray:[],
                selectedIndex:-1,
                year:0,
                shoufu:0,
                yuefu:0,
                shoucangpic:require('../../assets/images/czw/收藏a.png'),
                shoucangpicsele:require('../../assets/images/czw/收藏b.png'),
                clientwidth:0,
                zhoubianfcarr:[],
            }
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
        methods:{
            init(){
                let id = this.$route.params.id;
                this.roomid = id;
                this.getershouInfo(id);
                this.getDongtailist();
                this.getquestionlist(id);
                this.clientwidth = document.body.clientWidth;
            },
            getershouInfo(roomid){
                let self = this;
                let token = localStorage.getItem('token');
                self.$axios.get("http://house-api.zjlaishang.com:9001/old/show/"+roomid,{
                    headers:{
                        token: token
                    }
                }).then(function (res) {
                    console.log(res);
                    if(res.data.code == 200){
                        self.roominfo = res.data.data;
                        if(self.roominfo.typeName == null){
                            self.roominfo.huxin = "暂无"
                        }else{
                            self.roominfo.huxin = self.roominfo.typeName
                        }
                        if(self.roominfo.local != undefined&&self.roominfo.local != null){
                            self.position = self.roominfo.local.split(',');
                            self.createMap(self.position[0],self.position[1]);
                            self.clickaround(1);
                        }else{
                            self.createMap('','');
                            // self.clickaround(1);
                        }
                        let date = new Date();
                        let nowdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        let shoufu = self.roominfo.totalPrice *0.3;
                        self.shoufu = shoufu;
                        self.yuefu = self.shoufu *10000 /30;
                        self.yuefu = self.yuefu.toFixed(0);
                        self.jisuantime(self.roominfo.saveYear,nowdate);
                        self.getfujin(self.roomid);
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            getfujin(id){
                let self = this;
                let token = localStorage.getItem('token');
                self.$axios.get("http://house-api.zjlaishang.com:9001/old/nearby/"+self.roominfo.areaId+'/'+id,{
                    headers:{
                        token:token
                    }
                }).then(function(res){
                    self.zhoubianfcarr.length = 0;
                    if(res.data.code == 200){
                        console.log(res.data)
                        res.data.data.forEach(element => {
                            self.zhoubianfcarr.push(element);
                        });
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            addzhoubian(val){
                console.log(val);
                this.currentPage = val;
                this.clickaround(this.around);
            },
            clickaround(index){
                this.around = index;
                let self = this;
                if(self.around == 1){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        self.createMap(self.position[0],self.position[1]);
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
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
                            self.zhoubianarray = result.poiList.pois;
                            self.totalss = result.poiList.count;
                            for(let i=0;i<self.zhoubianarray.length;i++){
                                self.addmarker(i, self.zhoubianarray[i]);
                            }
                            map.setFitView()
                        });
                    })
                }else if(self.around == 2){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        self.createMap(self.position[0],self.position[1]);
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
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
                            self.zhoubianarray = result.poiList.pois;
                            self.totalss = result.poiList.count;
                            for(let i=0;i<self.zhoubianarray.length;i++){
                                self.addmarker(i, self.zhoubianarray[i]);
                            }
                            map.setFitView()
                        });
                    })
                }else if(self.around == 3){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        self.createMap(self.position[0],self.position[1]);
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
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
                        placeSearch.searchNearBy('', cpoint, 1500, function(status, result) {
                            self.zhoubianarray = result.poiList.pois;
                            self.totalss = result.poiList.count;
                            for(let i=0;i<self.zhoubianarray.length;i++){
                                self.addmarker(i, self.zhoubianarray[i]);
                            }
                            map.setFitView()
                        });
                    })
                }else if(self.around == 4){
                    self.selectedIndex = -1;
                    if(self.roominfo.local != undefined&&self.roominfo.local != null){
                        self.createMap(self.position[0],self.position[1]);
                    }else{
                        self.createMap('','');
                    }
                    self.marker.length = 0;
                    self.windowsArr.length = 0;
                    for(let i=0;i<self.zhoubianarray.length;i++){
                        self.addmarker(i, self.zhoubianarray[i]);
                    }
                    map.setFitView()
                    AMap.service(["AMap.PlaceSearch"],function () {
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
                        placeSearch.searchNearBy('', cpoint, 1500, function(status, result) {
                            self.zhoubianarray = result.poiList.pois;
                            for(let i=0;i<self.zhoubianarray.length;i++){
                                self.addmarker(i, self.zhoubianarray[i]);
                            }
                            map.setFitView()
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
            collectit(){
                let self = this;
                let token = localStorage.getItem("token")
                let roomid = self.roomid;
                self.$axios.post("http://house-api.zjlaishang.com:9001/old/collect/"+roomid,{
                    
                },{
                    headers:{
                        token:token
                    }
                }).then(function (res) {
                    if(res.data.code == 200){
                        self.$toast(res.data.msg);
                    }else{
                        self.$toast(res.data.msg);
                    }
                    self.getershouInfo(roomid);
                })
                .catch(function(err){
                    console.log(err);
                    self.getershouInfo(roomid);
                })
            },
            uncollectit(){
                let self = this;
                let token = localStorage.getItem("token")
                let roomid = self.roomid;
                self.$axios.delete("http://house-api.zjlaishang.com:9001/new/collect/"+roomid,{
                  headers:{
                        token:token
                    }  
                },{
                }).then(function(res){
                    if(res.data.code == 200){
                        self.$toast(res.data.msg);
                    }else{
                        self.$toast(res.data.msg);
                    }
                    self.getershouInfo(roomid);
                })
                .catch(function(err){
                    console.log(err);
                    self.getershouInfo(roomid);
                })
            },
            jisuantime(starttime,endtime){
                let startime0 = starttime.replace(/-/g,"/")
                let endtime0 = endtime.replace(/-/g,"/")
                let start = new Date(startime0);
                let end = new Date(endtime0);
                let flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2];
                let year = end.getFullYear() - start.getFullYear();
                let month = end.getMonth() - start.getMonth();
                let day = end.getDate() - start.getDate();
                if (month < 0) {
                    year--;
                    month = end.getMonth() + (12 - start.getMonth());
                }
                if (day < 0) {
                     month--;
                     let index = flag.findIndex((temp) => {
                       return temp === start.getMonth() + 1
                     });
                     let monthLength;
                     if (index <= 6) {
                        monthLength = 31;
                     } else if (index > 6 && index <= 10) {
                        monthLength = 30;
                    } else {
                        monthLength = 28;
                    }
                    day = end.getDate() + (monthLength - start.getDate());
                }
                this.year = year;
                console.log(this.year);
            },
            getquestionlist(id){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/old/question/"+id,{
                    headers:{
                        token: token
                    }
                }).then(function (res) {
                    if(res.data.code == 200){
                        console.log(res.data);
                        self.anslist = res.data.data;
                        self.answer = self.anslist[0];
                        self.totals = self.anslist.length;
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            getDongtailist(){
                // console.log(12345);
                // let self = this;
                // let token = localStorage.getItem("token");
                // self.$axios.get("http://house-api.zjlaishang.com:9001/old/msg/"+self.page,{
                //     headers:{
                //         token: token
                //     }
                // }).then(function (res) {
                //     console.log(res.data);
                //     if(res.data.code == 200){
                //         self.total = res.data.total;
                //         res.data.data.forEach(item=>{
                //             self.dongtailist.push(item);
                //         })
                //     }else{
                //         self.$toast(res.data.msg);
                //     }
                // })
            },
            createMap(latitude,longitude){
                let self = this;
                if(latitude == ''||longitude == ''){
                    map = new AMap.Map('container',{
                        resizeEnable: true, //是否监控地图容器尺寸变化
                        zoom:16, //初始化地图层级
                        center: [121.481834,31.223399] //初始化地图中心点
                    })
                }else{
                    map = new AMap.Map('container',{
                        resizeEnable: true, //是否监控地图容器尺寸变化
                        zoom:16, //初始化地图层级
                        center: [latitude,longitude] //初始化地图中心点
                    })
                }
            },
            onload(){
                let self = this;
                return new Promise(resolve=>{
                    setTimeout(()=>{
                        self.page++;
                        self.getDongtailist();
                    },2000)
                })
            },
            wentigengduo(){
                let roomid = this.roomid;
                this.$router.push({name:'wentigengduo',params:{id:roomid,type:'old',area:''}});
            },
            tiwen(){
                let self = this;
                let roomid = self.roomid;
                self.$router.push({path:'/tiwen',query:{id: roomid,type:'old',area:''}});
            },
            locations(){
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
            yuyue(){
                let self = this;
                console.log("yueyi");
                // self.$router.push({path:'/yuyue',query:{type:'old',roomid:this.roomid}});
            },
            dongtaigengduo(){
                let self = this;
                this.$router.push({name:'/dongtaigengduo',params:{type:'old'}})
            }
        }
    }
</script>

<style scoped>
    .zhoubian{
        width: 100%;
        display: inline-block;
    }

    .zhoubian .div3{
        width: 100%;
        display: inline-block;
    }

    .zhoubian .title3{
        font-weight: bold;
        color: #333333;
        margin-left: 19px;
        margin-top: 16px;
        float: left;
        margin-bottom: 18px;
        font-size: 20px;
    }
    .img {
        width: 100%;
        height: 4.17rem;
    }

    .titlebox {
        margin-top: 0.47rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.26rem;
        margin-left: 0.29rem;
    }

    .flex{
        margin-top: 0.1rem;
        margin-right: 1.20rem;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .jiange {
        width: 100%;
        height: 7px;
        background-color: #F1F3F7;
    }

    .titlebox .title {
        font-size: 0.70rem;
        color: #333333;
        font-weight: bold;
    }

    .desc1 {
        margin-top: 0.14rem;
        background:rgba(142,204,141,1);
        border-radius:0.05rem;
        font-size:0.20rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        padding-top: 0.06rem;
        padding-bottom: 0.05rem;
        padding-left: 0.09rem;
        padding-right: 0.06rem;
    }

    .location{
        float: right;
        margin-right: 0.5rem;
    }

    .desc {
        margin-left: 0.19rem;
        /* width: 50px;
        height: 20px; */
        background:rgba(255,228,220,1);
        border-radius:0.05rem;
        font-size:0.20rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(198,154,141,1);
        padding-top: 0.06rem;
        padding-bottom: 0.05rem;
        padding-left: 0.09rem;
        padding-right: 0.06rem;
        margin-top: 0.14rem;
        /* margin-bottom: 11px; */
    }

    .div1 .top{
        font-size: 14px;
        color: #F03535;
    }

    .div1 .desc0{
        color: #999999;
        font-size: 12px;
    }

    .xiangqin{
        width: 100%;
        display: inline-block;
        margin-left: 0.34rem;
        margin-top: 0.44rem;
    }

    .xiangqin .div{
        width: 100%;
    }

    .xiangqin .title{
        font-weight: bold;
        color: #333333;
        float: left;
        margin-bottom: 0.24rem;
        font-size: 0.35rem;
    }

    .xiangqin .detail {
        display: inline-block;
        float: left;
        flex-direction: column;
        width: 100%;
    }

    .xiangqin .junjia{
        font-size: 17px;
        color: #333333;
        font-weight: bold;
    }

    .xiangqin .price{
        font-size: 21px;
        color: #F03535;
        margin-left: 9px;
    }

    .xiangqin .danwei{
        margin-left: 8px;
        color: #F14747;
        font-size: 13px;
    }

    .xiangqin .grey{
        color: #999999;
        font-size: 15px;

    }

    .xiangqin .huxin{
        color: #333333;
        font-size: 14px;
        margin-left: 10px;
    }

    .xiangqin .zixun{
        margin-left: 14px;
        font-size: 15px;
        color: #FA7B49;
    }

    .dongtai{
        width: 100%;
        display: inline-block;
    }

    .dongtai .dongtai1{
        margin-left: 15px;
        font-size: 18px;
        margin-top: 17px;
        color: #333333;
        float: left;
    }

    .dongtai .gengduo{
        margin-right: 15px;
        margin-top: 23px;
        font-size: 14px;
        color: #536DAE;
        float: right;
    }

    .dongtai .showarea{
        width: 100%;
        /* margin-bottom: 14px; */
    }

    .dongtai .div{
        width: 100%;
        display: inline-block;
    }

    #container {
        width: 90%;
        height: 177px;
        margin-left: 15px;
        margin-right: 17px;
    }
    #panel2{
        position: relative;
        background-color: white;
        height: 2.1rem;
        overflow-y: auto;
        margin-left: 0.30rem;
        margin-bottom: 0.10rem;
        border-bottom: solid 1px silver;
    }
    .xiangqin .address0{
        margin-left: 10px;
        color: #919FBE;
        font-size: 14px;
        width: 2.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .xiangqin .bluerect{
        margin-top: 24px;
        margin-right: 16px;
        width: 90%;
        border-radius: 6px;
        background-color: #E6EEF8;
        display: inline-block;
        margin-bottom: 19px;
    }

    .bluerect .zhiye{
        margin-top: 15px;
        margin-left: 15px;
        margin-bottom: 9px;
        font-size: 20px;
        color: #151E38;
    }

    .bluerect .zuijia{
        margin-left: 14px;
        margin-bottom: 10px;
        font-size:10px;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(124,124,124,1);
    }

    .btnyuyue{
        width: 99px;
        height: 33px;
        border-radius: 16px;
        border: none;
        background-color: #567CF3;
        margin-top: 12px;
        margin-right: 18px;
        color: #ffffff;
        font-size: 14px;
        float: right;
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
        margin-left: 15px;
        font-size: 18px;
        margin-top: 17px;
        color: #333333;
        float: left;
    }

    .tiwen .gengduo{
        margin-right: 15px;
        margin-top: 23px;
        font-size: 14px;
        color: #536DAE;
        float: right;
    }

    .wentilist{
        margin-top: 12px;
        width: 100%;
    }
    .btn{
        margin-top: 14px;
        margin-left: 14px;
        margin-right: 14px;
        margin-bottom: 52px;
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
        height: 4.0rem;
        overflow-y: auto;
    }

    .collect{
        position: absolute; 
        right: 0.34rem; 
        top: 3.5rem; 
        width: 0.43rem; 
        height: 0.37rem;
    }
</style>