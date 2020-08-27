<template>
    <div style="background-color: white">
        <div class="topmsg">
            <van-icon class="iconleft" size="0.5rem" name="arrow-left" @click="goBack"/>
            <div class="searchBox" style="float: left;" @click="search">
                <div class="search">
                    <van-icon name="search" class="iconright0"/>
                    <input
                            placeholder="请输入楼盘名或地址"
                            v-model="keyword"
                            autofocus
                            ref="inputs"
                            @search="search"
                    >
                </div>
            </div>
            <div class="iconright">
                <van-image :src="bell" class="bell"></van-image>
                <div v-if="messcount !== 0" class="alarm">{{messcount}}</div>
            </div>
        </div>
        <div class="selectarea">
            <van-sticky @scroll="scroll">
                <van-dropdown-menu active-color="#ee0a24">
                <van-dropdown-item
                        title="区域"
                        v-model="tiaojian"
                        @change="change1"
                        :options="options1">
                </van-dropdown-item>
                <van-dropdown-item title="价格" :options="options0" @change="zongjia">
                    
                </van-dropdown-item>
                <van-dropdown-item
                        title="户型"
                        v-model="huxin"
                        @change="change2"
                        :options="options3">
                </van-dropdown-item>
                <van-dropdown-item title="更多" ref="item">
                    <div style="width: 100%;height: 300px;overflow: auto">
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 20px">装修</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickdecor(1)" :class="{active:decoration==1}" style="margin-left: 21px;margin-bottom: 6.6px">毛坯</li>
                                <li @click="clickdecor(2)" :class="{active:decoration==2}" style="margin-left: 21px">简装</li>
                                <li @click="clickdecor(3)" :class="{active:decoration==3}" style="margin-left: 21px">精装</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 20px">房龄</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickputyear(2)" :class="{active:putYear==2}" style="margin-left: 21px;margin-bottom: 6.6px">2年内</li>
                                <li @click="clickputyear(5)" :class="{active:putYear==5}" style="margin-left: 21px">5年内</li>
                                <li @click="clickputyear(6)" :class="{active:putYear==6}" style="margin-left: 21px">5年外</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 20px">电梯</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickele(1)" :class="{active:elevator==1}" style="margin-left: 21px;margin-bottom: 6.6px">有</li>
                                <li @click="clickele(2)" :class="{active:elevator==2}" style="margin-left: 21px">无</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="6">
                                <label style="font-weight: bold;font-size: 20px">楼层选择</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px;">
                            <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickfloor(5)" :class="{active:floor==5}" style="margin-left: 21px;margin-bottom: 6.6px">6楼以下</li>
                                <li @click="clickfloor(8)" :class="{active:floor==8}" style="margin-left: 21px">6-12楼</li>
                                <li @click="clickfloor(13)" :class="{active:floor==13}" style="margin-left: 21px">12楼以上</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 20px">权属</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px;">
                            <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clicktype(1)" :class="{active:type==1}" style="margin-left: 21px;margin-bottom: 6.6px">住宅</li>
                                <li @click="clicktype(2)" :class="{active:type==2}" style="margin-left: 21px">别墅</li>
                                <li @click="clicktype(3)" :class="{active:type==3}" style="margin-left: 21px">商铺</li>
                                <li @click="clicktype(4)" :class="{active:type==4}" style="margin-left: 21px">写字楼</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 20px">面积</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickarea(1)" :class="{active:area==1}" style="margin-left: 21px;margin-bottom: 6.6px">50m²以下</li>
                                <li @click="clickarea(2)" :class="{active:area==2}" style="margin-left: 21px">50-70m²</li>
                                <li @click="clickarea(3)" :class="{active:area==3}" style="margin-left: 21px">70-90m²</li>
                                <li @click="clickarea(4)" :class="{active:area==4}" style="margin-left: 21px">90-120m²</li>
                                <li @click="clickarea(5)" :class="{active:area==5}" style="margin-left: 21px">120-150m²</li>
                                <li @click="clickarea(6)" :class="{active:area==6}" style="margin-left: 21px">150-200m²</li>
                                <li @click="clickarea(7)" :class="{active:area==7}" style="margin-left: 21px">200-300m²</li>
                                <li @click="clickarea(8)" :class="{active:area==8}" style="margin-left: 21px">300m²以上</li>
                            </ul>
                        </van-row>
                    </div>
                    <van-button @click="change3" style="width: 100%"  type="primary">确定</van-button>
                </van-dropdown-item>
                <van-dropdown-item @change="change4"  title-class="icon iconfont iconpaixu" title="   " v-model="order1"  :options="options2">
                </van-dropdown-item>
            </van-dropdown-menu>
            </van-sticky>
        </div>
        <div id="showmenu" :style="(scrollTop.isFixed&&scrollTop.isFixed == true)?'overflow-y: auto':''">
            <div v-if="ershouRoomList.length === 0">
                <label>暂无二手房数据</label>
            </div>
            <div v-else>
                <ul 
                  v-infinite-scroll="onLoad"
                  infinite-scroll-distance="0">
                    <div v-for="(item,index) in ershouRoomList" :key="index">
                        <secRoomBox
                            :title="item.name"
                            :price="item.totalPrice"
                            :se_room_id="item.id"
                            :address="item.localName"
                            :img="item.img"
                        ></secRoomBox>
                    </div>
                </ul>
            </div>
        </div>
        <MainMenu></MainMenu>
    </div>
</template>

<script>
   import mixin from '../../mixin/mixin'
    export default {
        name: "secondhand",
        mixins:[mixin],
        data(){
            return{
                keyword:'',
                messcount:0,
                ershouRoomList:[

                ],
                options1:[
                    {text:'不限',value:0}
                ],
                options2:[
                    { text: '默认排序', value: 0 },
                    { text: '单价从低到高', value: 1 },
                    { text: '单价从高到底', value: 2 },
                    { text: '面积从小到大', value: 3 },
                    { text: '面积从大到小', value: 4 },
                ],
                options3:[
                    {text:'不限',value:0}
                ],
                options0:[
                    {text:'空',value:0},
                    {text:'50万以下',value:1},
                    {text:'50-100万',value:2},
                    {text:'100-150万',value:3},
                    {text:'150-200万',value:4},
                    {text:'200-250万',value:5},
                    {text:'300-400万',value:6},
                    {text:'400万以上',value:7},
                ],
                tiaojian:'',
                scrollTop:{},
                huxin:'',
                page:0,
                refresh:true,
                bell:require('../../assets/images/icon/图层521@3x.png'),
                cur:0,
                danjiamin: '',
                danjiamax: '',
                moneymin:'',
                moneymax:'',
                decoration:'',
                putYear:'',
                elevator:'',
                type:'',
                area:'',
                order:'',
                order1:'',
                areaarray:[],
                desc:'',
                orderBy:'',
                floor:''
            }
        },
        created() {
            this.getOptions();
            this.searchroom();
            this.getmessCount();
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            clickdecor(index){
                if(this.decoration != index){
                    this.decoration = index;
                }else{
                    this.decoration = '';
                }
            },
            clickputyear(index){
                if(this.putYear != index){
                    this.putYear = index;
                }else{
                    this.putYear = '';
                }
            },
            scroll(scrollTop){
                this.scrollTop = scrollTop; 
            },
            clickele(index){
                if(this.elevator != index){
                    this.elevator = index;
                }else{
                    this.elevator = '';
                }
            },
            clickfloor(index){
                if(this.floor != index){
                    this.floor = index;
                }else{
                    this.floor = '';
                }
            },
            clicktype(index){
                if(this.type != index){
                    this.type = index;
                }else{
                    this.type = '';
                }
            },
            clickarea(index){
                if(this.area != index){
                    this.area = index;
                }else{
                    this.area = '';
                }
            },
            change3(){
                if(this.area == 1){
                    this.areaarray = [0,50];
                }else if(this.area == 2){
                    this.areaarray = [50,70];
                }else if(this.area == 3){
                    this.areaarray = [70,90];
                }else if(this.area == 4){
                    this.areaarray = [90,120];
                }else if(this.area == 5){
                    this.areaarray = [120,150];
                }else if(this.area == 6){
                    this.areaarray = [150,200];
                }else if(this.area == 7){
                    this.areaarray = [200,300];
                }else if(this.area == 8){
                    this.areaarray = [300,10000];
                }else{
                    this.areaarray = [];
                }
                this.$refs.item.toggle();
                this.page = 0;
                this.ershouRoomList = [];
                console.log(789);
                this.searchroom();
            },
            change4(value){
                console.log('value: '+value);
                if(value == 0){
                    this.desc = ''
                    this.orderBy = ''
                }else if(value == 1){
                    this.desc = 'asc'
                    this.orderBy = 'unitPrice'
                }else if(value == 2){
                    this.desc = 'desc'
                    this.orderBy = 'unitPrice'
                }else if(value == 3){
                    this.desc = 'asc'
                    this.orderBy = 'area'
                }else if(value == 4){
                    this.desc = 'desc'
                    this.orderBy = 'area'
                }
                this.page = 0;
                this.ershouRoomList = [];
                this.searchroom();
            },
            search(){
                this.page = 0;
                this.ershouRoomList = [];
                this.searchroom();
            },
            zongjia(value){
                if(value == 1){
                    this.moneymin = 0
                    this.orderBy = 50
                }else if(value == 2){
                    this.moneymin = 50
                    this.orderBy = 100
                }else if(value == 3){
                    this.moneymin = 100
                    this.orderBy = 150
                }else if(value == 4){
                    this.moneymin = 150
                    this.orderBy = 200
                }else if(value == 5){
                    this.moneymin = 200
                    this.orderBy = 250
                }else if(value == 6){
                    this.moneymin = 300
                    this.orderBy = 400
                }else if(value == 7){
                    this.moneymin = 400
                    this.orderBy = 100000
                }else{
                    this.moneymin = '';
                    this.orderBy = '';
                }
                this.page = 0;
                this.ershouRoomList = [];
                this.searchroom();
            },

            getOptions(){
                let self = this;
                self.$axios.get("http://house-api.zjlaishang.com:9001/type/area",{
                }).then(function (res) {
                    if(res.data.code == 200){
                        res.data.data.forEach(item=>{
                            self.options1.push({text:item.title,value:item.id});
                        })
                    }else{}
                })

                self.$axios.get('http://house-api.zjlaishang.com:9001/type/buy',{
                }).then(function (res) {
                    if(res.data.code == 200){
                        res.data.data.forEach(item=>{
                            self.options3.push({text:item.title,value:item.id});
                        })
                    }
                })
            },
            change1(){
                this.page = 0;
                this.ershouRoomList = [];
                this.searchroom();
            },
            change2(){
                this.page = 0;
                this.ershouRoomList = [];
                this.searchroom();
            },
            searchroom(){
                let self = this;
                const key = self.keyword;
                var token = localStorage.getItem("token");
                let unitarray = (self.danjiamin!== ''&&self.danjiamax !== '')?[self.danjiamin,self.danjiamax]:'';
                let totalarray = (self.moneymin!== ''&&self.moneymax !== '')?[self.moneymin,self.moneymin]:'';
                if(self.orderBy !== ''&&self.areaarray.length==2){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/old/"+self.page+'/'+key,{
                        params:{
                            unitType:(self.huxin != 0)?self.huxin:'',
                            areaId:(self.tiaojian != 0)?self.tiaojian:'',
                            unitPrice:unitarray,
                            totalPrice: totalarray,
                            order:self.desc,
                            orderBy:self.orderBy,
                            decoration:self.decoration,
                            putYear:self.putYear,
                            floor:self.floor,
                            elevator:self.elevator,
                            type:self.type,
                            area:self.areaarray
                        },
                        headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(function (res) {
                        if(res.data.code == 200){
                            res.data.data.forEach(element=>{
                                self.ershouRoomList.push(element);
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.areaarray.length <2&&self.orderBy !== ''){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/old/"+self.page+'/'+key,{
                        params:{
                            unitType:(self.huxin != 0)?self.huxin:'',
                            areaId:(self.tiaojian != 0)?self.tiaojian:'',
                            unitPrice:unitarray,
                            totalPrice: totalarray,
                            order:self.desc,
                            orderBy:self.orderBy,
                            decoration:self.decoration,
                            putYear:self.putYear,
                            floor:self.floor,
                            elevator:self.elevator,
                            type:self.type,
                            area:''
                        },
                        headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(function (res) {
                        if(res.data.code == 200){
                            res.data.data.forEach(element=>{
                                self.ershouRoomList.push(element);
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.areaarray.length <2&&self.orderBy == ''){
                    let unitarray = (self.danjiamin!== ''&&self.danjiamax !== '')?[self.danjiamin,self.danjiamax]:'';
                    let totalarray = (self.moneymin!== ''&&self.moneymax !== '')?[self.moneymin,self.moneymin]:'';
                    self.$axios.get("http://house-api.zjlaishang.com:9001/old/"+self.page+'/'+key,{
                        params:{
                            unitType:(self.huxin != 0)?self.huxin:'',
                            areaId:(self.tiaojian != 0)?self.tiaojian:'',
                            unitPrice:unitarray,
                            totalPrice: totalarray,
                            order:self.desc,
                            decoration:self.decoration,
                            putYear:self.putYear,
                            floor:self.floor,
                            elevator:self.elevator,
                            type:self.type,
                            area:''
                        },
                        headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(function (res) {
                        if(res.data.code == 200){
                            res.data.data.forEach(element=>{
                                self.ershouRoomList.push(element);
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.areaarray.length == 2){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/old/"+self.page+'/'+key,{
                        params:{
                            unitType:(self.huxin != 0)?self.huxin:'',
                            areaId:(self.tiaojian != 0)?self.tiaojian:'',
                            unitPrice:unitarray,
                            totalPrice: totalarray,
                            order:self.desc,
                            decoration:self.decoration,
                            putYear:self.putYear,
                            floor:self.floor,
                            elevator:self.elevator,
                            type:self.type,
                            area:self.areaarray
                        },
                        headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(function (res) {
                        if(res.data.code == 200){
                            res.data.data.forEach(element=>{
                                self.ershouRoomList.push(element);
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.orderBy !== ''){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/old/"+self.page+'/'+key,{
                        params:{
                            unitType:(self.huxin != 0)?self.huxin:'',
                            areaId:(self.tiaojian != 0)?self.tiaojian:'',
                            unitPrice:unitarray,
                            totalPrice: totalarray,
                            order:self.desc,
                            orderBy:self.orderBy,
                            decoration:self.decoration,
                            putYear:self.putYear,
                            floor:self.floor,
                            elevator:self.elevator,
                            type:self.type,
                        },
                        headers:{
                        // token:token,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(function (res) {
                        if(res.data.code == 200){
                            res.data.data.forEach(element=>{
                                self.ershouRoomList.push(element);
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }
                // self.ershouRoomList = [];
            },
            onLoad(){
                if(this.scrollTop.isFixed == true){
                    let self = this;
                    self.page++;
                    console.log('123');
                    self.searchroom();
                }
            },
            getmessCount(){
                let self = this;
                const count = self.messcount
            }
        }
    }
</script>

<style scoped>
    .topmsg{
        display: flex;
    }
    .topmsg .searchBox{
        margin-top: 0.20rem;
        margin-left: 0.31px;
        display: flex;
        align-items: center;
        width: 100%;
        background-color: #fff;
    }
    .topmsg .searchBox .search{
        display: flex;
        flex: 1;
        /*margin-right: 10px;*/
        background-color: #f7f8fa;
        /*border-radius: 20px;*/
        padding: 0.05rem 0.19rem;
        align-items: center;
    }

    .selectarea{
        width: 100%;
        margin-top: 8px;
        background-color: white;
    }

    .topmsg .iconleft{
        margin-top: 0.31rem;
        margin-left: 0.21rem;
        margin-right: 0.21rem;
        float: left;
    }

    .topmsg .iconright{
        margin-top: 0.31rem;
        margin-left: 0.31rem;
        margin-right: 0.46rem;
        float: left;
    }

    .van-button--disabled{
        background-color: #E1E6F0;
        border: 1px solid #E1E6F0;
    }

    .zhuangxiu{
        width: 90%;
    }

    .zhuangxiu li{
        float: left;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        width: 70px;
        height: 36px;
        background-color: #f6f6f6;
        font-size: 14px;
        color: #4d4d4d;
        border-radius: 4px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }

    .zhuangxiu .active{
        background-color: #FCF6EF;
        color: #EC613E;
    }

    .alarm{
        position: absolute;
        color: white;
        font-size: 10px;
        background-color: red;
        height: 12px;
        width: 12px;
        line-height: 12px;
        right: 14px;
        top: 9px;
        text-align: center;
        border-radius: 6px;
        padding: 2px;
    }

    .topmsg input{
        border: none;
        outline: none;
        width: 100%;
        background-color: #f7f8fa;
    }

    ul li {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .tab-tilte{
        width: 90%;
    }
    .tab-tilte li{
        float: left;
        text-align: center;
        line-height: 32.75px;
        cursor: pointer;
        min-width: 92.75px;
        min-height: 32.75px;
        font-size: 14px;
        background-color: #E1E6F0;
        border-radius: 5px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }
    .tab-tilte .active{
        background-color: #FCF5EF;
        color: #EB613D;
    }

    .bell{
        width:0.35rem;
    }

    #showmenu{
          height: 13rem;
          /* overflow-y: auto; */
          margin-bottom: 1.3rem;
    }

    /* @media screen and (min-height: 0px) and (max-height: 480px){
        #showmenu{
          height: 7.8rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 481px) and (max-height: 568px){
        #showmenu{
          height: 9.8rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 569px) and (max-height: 736px){
        #showmenu{
          height: 10rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 737px) and (max-height: 896px){
        #showmenu{
          height: 13rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 897px){
        #showmenu{
          height: 5.9rem;
          overflow-y: auto;
        }
    } */
</style>