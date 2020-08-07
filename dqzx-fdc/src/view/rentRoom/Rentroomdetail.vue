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
        <div v-if="roominfo.collect != undefined&&roominfo.collect > 0" class="collect" @click="uncollectit">
            <MyImage :src="shoucangpicsele" fit="cover"/>
        </div>
        <div class="titlebox">
            <label class="title" v-if="roominfo.title !== undefined">{{roominfo.title}}</label>
            <div>
                <div v-if="roominfo.payMonth != 0">
                    <label class="desc1" style="float: left">押1付{{roominfo.payMonth}}</label>
                </div>
                <div v-if="roominfo.isOnlyWashingRoom !== undefined&&roominfo.isOnlyWashingRoom == 2">
                    <label class="desc1" style="float: left">独卫</label>
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
                    <label class="top">{{roominfo.unitPrice}}元/月</label>
                    <div>
                        <label class="desc0">面议</label>
                    </div>
                </div>
                <div class="div1" style="margin-left: 1.30rem">
                    <label class="top">{{roominfo.huxin}}</label>
                    <div>
                        <label class="desc0">户型</label>
                    </div>
                </div>
                <div class="div1" style="margin-left: 1.30rem">
                    <label class="top">{{roominfo.area}}m²</label>
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
                    <label class="junjia">价格</label>
                    <label class="price" v-if="roominfo.unitPrice&&roominfo.unitPrice != 0">{{roominfo.unitPrice}}<span class="danwei">元/月</span></label>
                    <label class="price" v-if="roominfo.unitPrice&&roominfo.unitPrice == 0">价格待定</label>
                </div>
                <div style="margin-top: 0.11rem;width: 65%">
                    <label class="grey">方式</label>
                    <label v-if="roominfo.type&&roominfo.type == 1" class="huxin">整租</label>
                    <label v-if="roominfo.type&&roominfo.type == 2" class="huxin">合租</label>
                    <div style="float:right">
                        <label class="grey" >朝向</label>
                        <label  v-if="roominfo.direction == 1" class="huxin">东</label>
                        <label  v-if="roominfo.direction == 2" class="huxin">南</label>
                        <label  v-if="roominfo.direction == 3" class="huxin">西</label>
                        <label  v-if="roominfo.direction == 4" class="huxin">北</label>
                    </div>
                </div>
                <div style="margin-top: 0.11rem;width: 69%">
                    <label class="grey">层数</label>
                    <label v-if="roominfo.floor != null&&roominfo.level != null" class="huxin">{{roominfo.floor}}/{{roominfo.level}}层</label>
                    <label v-else class="huxin">暂无/暂无层</label>
                    <div style="float:right">
                        <label class="grey">装修</label>
                        <label  v-if="roominfo.decoration == 1" class="huxin">毛坯</label>
                        <label  v-if="roominfo.decoration == 2" class="huxin">简装</label>
                        <label  v-if="roominfo.decoration == 3" class="huxin">精装</label>
                    </div>
                </div>
                <div style="width: 100%;margin-top: 0.11rem">
                    <label class="grey" style="float:left">小区</label>
                    <label class="address" style="float:left;margin-top: -0.0rem">{{roominfo.localName}}</label>
                    <van-image class="location" :src="locationpic" fit="cover" width="0.36rem" height="0.36rem"
                               @click="locations"></van-image>
                </div>
                <div class="bluerect">

                    <div class="zhiye">
                        <label >置业直通车</label>
                        <button class="btnyuyue" @click="yuyue">预约看房</button>
                    </div>
                    <div class="zuijia">
                        <label>经纪人1对1带看服务</label>
                    </div>

                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="peitaosheshi">
            <div class="div2">
                <label class="title2">配套设备</label>
            </div>
            <div class="detail">
                <div>
                    <label class="junjia">看房时间</label>
                    <label class="huxin">{{roominfo.watchTime}}</label>
                </div>
                <div>
                    <label class="junjia" style="float:left">入住要求</label>
                    <div class="shenglue" style="margin-top: -0.01rem;">
                         <label class="huxin0 ">{{roominfo.claim}}</label>
                    </div>
                    <!-- <label class="huxin ">{{roominfo.claim}}</label> -->
                   <!-- <label class="huxin shenglue">{{roominfo.claim}}</label> -->
                </div>
                <div class="rentdevice">
                   <div class="item"  style="margin-top: 0.18rem">
                       <van-image :class="{active0:roominfo.bed == 1}" :src="bed" fit="cover" width="30px" height="30px"></van-image>
                       <label :class="{active0:roominfo.bed == 1}">床</label>
                   </div>
                    <div class="item"  style="margin-left: 0.7rem;margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.wifi == 1}" :src="wifi" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.wifi == 1}">宽带</label>
                    </div>
                    <div class="item"  style="margin-left: 0.7rem;margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.watchTv == 1}" :src="watchTv" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.watchTv == 1}">电视机</label>
                    </div>
                    <div class="item"  style="margin-left: 0.7rem;margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.refrigerator == 1}" :src="refrigerator" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.refrigerator == 1}">冰箱</label>
                    </div>
                    <div class="item"  style="margin-left: 0.7rem;margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.washing == 1}" :src="washing" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.washing == 1}">洗衣机</label>
                    </div>
                </div>
                <div class="rentdevice">
                    <div class="item"  style="margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.airCond == 1}" :src="airCond" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.airCond == 1}">空调</label>
                    </div>
                    <div class="item"  style="margin-left: 0.6rem;margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.waterHeader == 1}" :src="waterHeader" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.waterHeader == 1}">热水器</label>
                    </div>
                    <div class="item"  style="margin-left: 0.7rem;margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.wardrobe == 1}" :src="wardrobe" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.wardrobe == 1}">衣柜</label>
                    </div>
                    <div class="item"  style="margin-left: 0.7rem;margin-top: 0.18rem">
                        <van-image :class="{active0:roominfo.washingRoom == 1}" :src="washingRoom" fit="cover" width="30px" height="30px"></van-image>
                        <label :class="{active0:roominfo.washingRoom == 1}">卫生间</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="zhoubian">
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
                    <div id="panel1">
                        <div v-for="(item,index) in zhoubianarray" 
                        @click="openMarkerTipById1(index,$event)"  
                        @mouseout="onmouseout_MarkerStyle(index+1,$event)" :key="index">
                            <MapList  :name="item.name" :address="item.address" :distance="item.distance" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="jiange"></div>
        <div class="zhoubian">
            <div class="div3">
                <label class="title3">猜你喜欢</label>
            </div>
            <div class="fcarr" v-if="zhoubianfcarr.length>0">
                <div v-for="(item,index) in zhoubianfcarr" :key="index">
                    <RentRoomBox
                        :title="item.title"
                        :zujin="item.unitPrice"
                        :imglist="item.imgList"
                        :time="item.updateTime"
                        :room_id="item.id"
                        localName=""
                        area=""
                ></RentRoomBox>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '../../mixin/mixin'
var map,placeSearch;
    export default {
        name: "Rentroomdetail",
        
        data(){
            return{
                roominfo:[],
                roomid:'',
                page:0,
                locationpic:require('../../assets/images/icon/location.png'),
                position:[],
                bed:require('../../assets/images/czw/rentdevice/床.png'),
                wifi:require('../../assets/images/czw/rentdevice/宽带.png'),
                watchTv:require('../../assets/images/czw/rentdevice/电视.png'),
                refrigerator:require('../../assets/images/czw/rentdevice/冰箱.png'),
                washing:require('../../assets/images/czw/rentdevice/洗衣机.png'),
                airCond:require('../../assets/images/czw/rentdevice/空调.png'),
                wardrobe:require('../../assets/images/czw/rentdevice/衣柜.png'),
                waterHeader:require('../../assets/images/czw/rentdevice/热水器.png'),
                washingRoom:require('../../assets/images/czw/rentdevice/卫生间.png'),
                isOnlyWashingRoom:require('../../assets/images/czw/rentdevice/独立阳台.png'),
                naturalGas:require('../../assets/images/czw/rentdevice/燃气灶.png'),
                shoucangpic:require('../../assets/images/czw/收藏a.png'),
                shoucangpicsele:require('../../assets/images/czw/收藏b.png'),
                around:1,
                pagesize0:50,
                totalss:0,
                currentPage:1,
                marker:[],
                windowsArr:[],
                zhoubianarray:[],
                selectedIndex:-1,
                zhoubianfcarr:[],
                dongtailist:[]
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
            // this.getquestionlist(id);
        },
        methods:{
            init(){
                let id = this.$route.params.id;
                this.roomid = id;
                this.getershouInfo(id);
                this.getDongtailist();
            },
            getershouInfo(id){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/rent/show/"+id,{
                    headers:{
                        token : token
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if(res.data.code == 200){
                        self.roominfo = res.data.data;
                        if(self.roominfo.unitType == 1){
                            self.roominfo.huxin = "1室"
                        }else if(self.roominfo.unitType == 2){
                            self.roominfo.huxin = "2室"
                        }else if(self.roominfo.unitType == 3){
                            self.roominfo.huxin = "3室"
                        }else if(self.roominfo.unitType == 4){
                            self.roominfo.huxin = "4室"
                        }else if(self.roominfo.unitType == 5){
                            self.roominfo.huxin = "5室"
                        }else if(self.roominfo.unitType == 6){
                            self.roominfo.huxin = "5室以上"
                        }
                        if(self.roominfo.local != undefined&&self.roominfo.local != null){
                            self.position = self.roominfo.local.split(',');
                            self.createMap(self.position[0],self.position[1]);
                            self.clickaround(1);
                        }else{
                            self.createMap('','');
                        }
                        self.getzbfc(id)
                    }else{
                        this.$toast(res.data.msg);
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
                        self.createMap(self.position[0],self.position[1]);
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
                        self.createMap(self.position[0],self.position[1]);
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
                        self.createMap(self.position[0],self.position[1]);
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
            collectit(){
                let self = this;
                let token = localStorage.getItem("token")
                let roomid = self.roomid;
                self.$axios.post("http://house-api.zjlaishang.com:9001/rent/collect/"+roomid,{
                    
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
                self.$axios.delete("http://house-api.zjlaishang.com:9001/rent/collect/"+roomid,{
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
            getDongtailist(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/rent/msg/"+self.page,{
                    headers:{
                        token : token
                    }
                }).then(function (res) {
                    console.log(res.data);
                    if(res.data.code == 200){
                        self.total = res.data.total;
                        res.data.data.forEach(item=>{
                            self.dongtailist.push(item);
                        })
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            getzbfc(id){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/rent/nearby/"+self.roominfo.areaId+'/'+id,{
                    headers:{
                        token:token
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        self.zhoubianfcarr.length = 0;
                        res.data.data.forEach(item=>{
                            // let imgarray = item.img.split(",");
                            // item.imgList = imgarray;
                            self.zhoubianfcarr.push(item);
                        })
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
            },
            yuyue(){
                // this.$router.push({path:'/yuyue',query:{type:'rent',roomid:this.roomid}});
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
        }
    }
</script>

<style scoped>
    .img {
        width: 100%;
        height: 4.17rem;
    }

    .titlebox{
        padding-top: 0.29rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 0.23rem;
        margin-left: 0.29rem;
    }

    .titlebox .title {
        font-size: 0.47rem;
        color: #333333;
        font-weight: bold;
    }

    .flex{
        margin-top: 0.20rem;
        display: inline-flex;
        flex-direction: row;
    }

    .location{
        float:right;
        margin-right: 0.5rem;
    }

    .div1 .top{
        font-size: 0.30rem;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(240,53,53,1);
        line-height:0.30rem;
    }

    .div1 .desc0{
        font-size:0.20rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.34rem;
    }

    .desc {
        margin-left: 0.17rem;
        /* width: 50px;
        height: 20px; */
        background-color: #FFE4DC;
        border-radius: 0.05rem;
        font-size: 0.20rem;
        color: #C69A8D;
        padding-top: 0.06rem;
        padding-bottom: 0.05rem;
        padding-left: 0.09rem;
        padding-right: 0.06rem;
        margin-top: 0.31rem;
    }

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

    .jiange {
        width: 100%;
        height: 0.012rem;
        background-color: #F1F3F7;
    }

    .desc1 {
        background-color: #8ECC8D;
        padding-top: 0.06rem;
        padding-bottom: 0.05rem;
        padding-left: 0.09rem;
        padding-right: 0.06rem;
        border-radius: 0.05rem;
        font-size: 0.20rem;
        color: #FFFFFF;
        margin-top: 0.31rem;
    }
    .xiangqin {
        width: 100%;
        display: inline-block;
        margin-left: 0.34rem;
        margin-top: 0.45rem;
    }

    .peitaosheshi{
        width: 100%;
        display: inline-block;
        margin-left: 0.29rem;
        margin-top: 0.40rem;
    }

    .peitaosheshi .div2{
        width: 100%;
        display: inline-block;
    }

    .peitaosheshi .title2{
        font-weight: bold;
        color: #333333;
        float: left;
        font-size: 0.48rem;
    }

    .peitaosheshi .detail {
        display: inline-block;
        float: left;
        margin-top: 0.34rem;
        flex-direction: column;
        width: 100%;
    }

    .peitaosheshi .grey{
        color: #999999;
        font-size: 0.38rem;

    }

    .peitaosheshi .huxin{
        color: #333333;
        font-size: 0.38rem;
        margin-left: 0.13rem;
    }

    .peitaosheshi .huxin0{
        color: #333333;
        font-size: 0.35rem;
        margin-left: 0.13rem;
    }

    .xiangqin .div{
        width: 100%;
        display: inline-block;
    }

    .xiangqin .title{
        font-weight: bold;
        color: #333333;
        float: left;
        margin-bottom: 0.49rem;
        font-size: 0.40rem;
    }
    .xiangqin .detail {
        display: inline-block;
        float: left;
        flex-direction: column;
        width: 100%;
    }

    .xiangqin .junjia{
        font-size: 0.35rem;
        color: #333333;
        font-weight: bold;
    }

    .xiangqin .price{
        font-size: 0.37rem;
        color: #F03535;
        margin-left: 0.15rem;
    }

    .xiangqin .danwei{
        margin-left: 0.17rem;
        color: #F14747;
        font-size: 0.23rem;
    }

    .xiangqin .grey{
        font-size:0.28rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.40rem;
    }

    .xiangqin .huxin{
        margin-left: 0.19rem;
        color: #333333;
        font-size: 0.28rem;
        line-height:0.40rem;
    }

    .xiangqin .address{
        margin-left: 0.19rem;
        width:4.68rem;
        font-size:0.28rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(145,159,190,1);
    }
    .xiangqin .bluerect{
        margin-top: 0.43rem;
        width: 90%;
        border-radius: 0.18rem;
        background-color: #E6EEF8;
        display: inline-block;
        margin-bottom: 0.25rem;
    }

    .bluerect .zhiye{
        margin-top: 0.26rem;
        margin-left: 0.26rem;
        margin-bottom: 0.14rem;
        font-size: 0.35rem;
        font-weight: bold;
        color: #151E38;
    }

    .bluerect .zuijia{
        margin-left: 0.25rem;
        margin-bottom: 0.19rem;
        font-size: 0.23rem;
        color: #7C7C7C;
    }

    .btnyuyue{
        width:2.3rem;
        height:0.8rem;
        background:rgba(86,124,243,1);
        border-radius:0.42rem;
        border: none;
        margin-top: 0.09rem;
        margin-right: 0.5rem;
        color: #ffffff;
        font-size: 14px;
        float: right;
    }

    .rentdevice{
        display: flex;
        background-color: #fff;
        font-size: 13px;
    }

    .rentdevice .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #444;
        padding: 0.1rem 0;
    }

    .active0{
        color: #999999;
        -webkit-filter: sepia(100%);
		filter: sepia(100%);
    }
    #container{
        width: 90%;
        height: 177px;
        margin-left: 15px;
        margin-right: 17px;
    }
    .shenglue{
        width: 1.5rem;
        white-space:nowrap;/* 规定文本是否折行 */  
        overflow: hidden;/* 规定超出内容宽度的元素隐藏 */
        text-overflow: ellipsis;
    }
    #panel1{
        position: relative;
        background-color: white;
        height: 2.1rem;
        overflow-y: auto;
        margin-left: 0.70rem;
        margin-bottom: 0.10rem;
        border-bottom: solid 1px silver;
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