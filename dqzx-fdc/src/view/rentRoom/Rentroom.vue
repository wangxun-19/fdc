<template>
    <div style="background-color: white">
        <div class="topmsg">
            <van-icon class="iconleft" size="0.5rem" name="arrow-left" @click="goback"/>
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
                        :options="option1">
                </van-dropdown-item>
                <van-dropdown-item title="租金" :options="options0" v-model="unit" @change="zongjia">
                </van-dropdown-item>
                <van-dropdown-item title="户型" ref="item1">
                    <ul class="tab-tilte" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                        <div style="width:50%;float:left">
                            <li @click="iszhenzu1(1)" :class="{active:iszhenzu==1}" style="float:right;margin-right:25px">整租</li>
                        </div>
                        <div style="width:50%;float:left">
                            <li @click="iszhenzu1(2)" :class="{active:iszhenzu==2}" style="margin-left: 25px">合租</li>
                        </div>
                    </ul>
                    <div v-show="iszhenzu == 1" style="overflow: auto">
                        <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                            <div v-for="(item,index) in option3" :key="index">
                                <li @click="clickzhenzu(item.value)" :class="{active:huxin===item.value}" style="margin-left: 10px;margin-bottom: 6.6px">{{item.text}}</li>
                            </div>
                        </ul>
                    </div>
                    <div v-show="iszhenzu == 2" style="overflow: auto">
                        <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                            <div v-for="(item,index) in option3" :key="index">
                                <li @click="clickhezu(item.value)" :class="{active:huxin===item.value}" style="margin-left: 10px;margin-bottom: 6.6px">{{item.text}}</li>
                            </div>
                        </ul>
                    </div>
                    <van-button @click="change2" style="width: 100%"  type="primary">确定</van-button>
                </van-dropdown-item>
                <van-dropdown-item title="更多" ref="item">
                    <div style="width: 100%;height: 300px;overflow: auto">
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col>
                                <label style="font-weight: bold;font-size: 16px;">装修</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 7px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickdecor(1)" :class="{active:decoration==1}" style="margin-left: 21px;margin-bottom: 6.6px">毛坯</li>
                                <li @click="clickdecor(2)" :class="{active:decoration==2}" style="margin-left: 21px">简装</li>
                                <li @click="clickdecor(3)" :class="{active:decoration==3}" style="margin-left: 21px">精装</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col>
                                <label style="font-weight: bold;font-size: 16px;">电梯</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 7px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickele(1)" :class="{active:elevator==1}" style="margin-left: 21px;margin-bottom: 6.6px">有</li>
                                <li @click="clickele(2)" :class="{active:elevator==2}" style="margin-left: 21px">无</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <van-col>
                                <label style="font-weight: bold;font-size: 16px;margin-left: 21px">楼层选择</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickfloor(5)" :class="{active:floor==5}" style="margin-left: 21px;margin-bottom: 6.6px">6楼以下</li>
                                <li @click="clickfloor(8)" :class="{active:floor==8}" style="margin-left: 21px">6-12楼</li>
                                <li @click="clickfloor(13)" :class="{active:floor==13}" style="margin-left: 21px">12楼以上</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <van-col>
                                <label style="font-weight: bold;font-size: 16px;margin-left: 21px">权属</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clicktype(1)" :class="{active:type==1}" style="margin-left: 20px;margin-bottom: 6.6px">住宅</li>
                                <li @click="clicktype(2)" :class="{active:type==2}" style="margin-left: 20px">别墅</li>
                                <li @click="clicktype(3)" :class="{active:type==3}" style="margin-left: 20px">商铺</li>
                                <li @click="clicktype(4)" :class="{active:type==4}" style="margin-left: 20px">写字楼</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <van-col>
                                <label style="font-weight: bold;font-size: 16px;margin-left: 21px">面积</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 7px">
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
                <van-dropdown-item title-class="icon iconfont iconpaixu" title="  " @change="change4" v-model="order1" :options="option4"></van-dropdown-item>
            </van-dropdown-menu>
            </van-sticky>
        </div>
        <div id="showmenu" :style="(scrollTop.isFixed&&scrollTop.isFixed == true)?'overflow-y: auto':''">
            <div class="grey"></div>
            <div v-if="rentrooomlist.length === 0">
                <label>暂无租房数据</label>
            </div>
            <div v-else>
                <ul 
                  v-infinite-scroll="onLoad"
                  infinite-scroll-distance="0">
                    <div v-for="(item,index) in rentrooomlist" :key="index">
                        <RentRoomBox
                                :title="item.title"
                                :zujin="item.unitPrice"
                                :imglist="item.imgList"
                                :time="item.updateTime"
                                :room_id="item.id"
                                :localName="item.localName"
                                :area="item.localName"
                        ></RentRoomBox>
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
        name: "Rentroom",
        mixins:[mixin],
        data(){
            return{
                keyword:'',
                messcount:0,
                option1: [
                    {text:'不限',value:0}
                ],
                option3: [],
                tiaojian:0,
                huxin:'',
                page:0,
                bell:require('../../assets/images/icon/图层521@3x.png'),
                cur:0,
                iszhenzu:'',
                danjiamin: '',
                danjiamax: '',
                moneymin:'',
                moneymax:'',
                decoration:'',
                putYear:'',
                elevator:'',
                floor:'',
                type:'',
                refresh:true,
                area:'',
                scrollTop:{},
                rentrooomlist:[],
                option4:[
                    { text: '默认排序', value: 0 },
                    { text: '租金从低到高', value: 1 },
                    { text: '租金从高到底', value: 2 },
                    { text: '面积从低到高', value: 3 },
                    { text: '面积从大到小', value: 4 },
                ],
                unit:0,
                options0:[
                    { text: '不限', value: 0 },
                    { text: '≤1000元', value: 1 },
                    { text: '1000-1500元', value: 2 },
                    { text: '1500-2000元', value: 3 },
                    { text: '2000-3000元', value: 4 },
                    { text: '3000元以上', value: 5 },
                ],
                order:'',
                order1:'',
                areaarray:[],
                desc:'',
                orderBy:'',
            }
        },
        created() {
            this.getOptions();
            this.searchrentroom();
        },
        methods:{
            zongjia(value){
                if(value == 0){
                    this.danjiamin = ''
                    this.danjiamax = ''
                }else if(value == 1){
                    this.danjiamin = 0
                    this.danjiamax = 1000
                }else if(this.order1 == 2){
                    this.danjiamin = 1000
                    this.danjiamax = 1500
                }else if(value == 3){
                    this.danjiamin = 1500
                    this.danjiamax = 2000
                }else if(value == 4){
                    this.danjiamin = 2000
                    this.danjiamax = 3000
                }else if(value == 5){
                    this.danjiamin = 3000
                    this.danjiamax = 100000000
                }
                this.page = 0;
                this.rentrooomlist = [];
                this.searchrentroom();
            },
            scroll(scrollTop){
                this.scrollTop = scrollTop;
            },
            search(){
                this.page = 0;
                this.rentrooomlist = [];
                this.searchrentroom();
            },
            iszhenzu1(index){
                if(this.iszhenzu != index){
                    this.iszhenzu = index;
                }else{
                    this.iszhenzu = '';
                }
                this.huxin = '';
            },
            clickzhenzu(index){
                if(this.huxin != index){
                    this.huxin = index;
                }else{
                    this.huxin = '';
                }
            },
            clickhezu(index){
                if(this.huxin != index){
                    this.huxin = index;
                }else{
                    this.huxin = '';
                }
            },
            searchrentroom(){
                let self = this;
                const key = self.keyword;
                var token = localStorage.getItem("token");
                let unitarray = (self.danjiamin!== ''&&self.danjiamax !== '')?[self.danjiamin,self.danjiamax]:'';
                let totalarray = (self.moneymin!== ''&&self.moneymax !== '')?[self.moneymin,self.moneymin]:'';
                if(self.orderBy !== ''&&self.areaarray.length==2){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/rent/"+self.page+'/'+key,{
                        params:{
                            unitType:self.huxin,
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
                                self.rentrooomlist.push(element);
                            })
                            // self.getquyu(self.rentrooomlist);
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.areaarray.length <2&&self.orderBy == ''){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/rent/"+self.page+'/'+key,{
                        params:{
                            unitType:self.huxin,
                            areaId:(self.tiaojian != 0)?self.tiaojian:'',
                            unitPrice:unitarray,
                            totalPrice: totalarray,
                            order:self.desc,
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
                                self.rentrooomlist.push(element);
                            })
                            // self.getquyu(self.rentrooomlist);
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.areaarray.length == 2&&self.orderBy == ''){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/rent/"+self.page+'/'+key,{
                        params:{
                            unitType:self.huxin,
                            areaId:(self.tiaojian != 0)?self.tiaojian:'',
                            unitPrice:unitarray,
                            totalPrice: totalarray,
                            order:self.desc,
                            decoration:self.decoration,
                            putYear:self.putYear,
                            floor:self.floor,
                            elevator:self.elevator,
                            type:self.type,
                            area:self.areaarray,
                        },
                        headers:{
                           // token:token,
                           'Content-Type': 'application/x-www-form-urlencoded',
                        }
                    }).then(function (res) {
                        if(res.data.code == 200){
                            res.data.data.forEach(element=>{
                                self.rentrooomlist.push(element);
                            })
                            // self.getquyu(self.rentrooomlist);
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(self.orderBy !== ''&&self.areaarray.length<2){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/rent/"+self.page+'/'+key,{
                        params:{
                            unitType:self.huxin,
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
                                self.rentrooomlist.push(element);
                            })
                            // self.getquyu(self.rentrooomlist);
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }
                // let self = this;
                // if(self.danjiamax !==''&&
                //     self.danjiamax !== ''&&
                //     self.moneymin !== ''&&
                //     self.moneymax !== ''){
                //     self.$axios.get("http://house-api.zjlaishang.com:9001/rent/",{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "unitPrice":[self.danjiamin,self.danjiamax],
                //             "totalPrice": [self.moneymin,self.moneymax],
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         if(res.data.code == 200){
                //             res.data.data.forEach(item=>{
                //                 self.rentrooomlist.push(item);
                //             })
                //             self.getquyu(self.rentrooomlist);
                //         }else{
                //             self.$toast(res.data.msg)
                //         }
                //     })
                // }else if(self.danjiamax !==''&&
                //     self.danjiamax !== ''){
                //     self.$axios.get("http://house-api.zjlaishang.com:9001/rent/",{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "unitPrice":[self.danjiamin,self.danjiamax],
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         if(res.data.code == 200){
                //             res.data.data.forEach(item=>{
                //                 self.rentrooomlist.push(item);
                //             })
                //             self.getquyu(self.rentrooomlist);
                //         }else{
                //             self.$toast(res.data.msg)
                //         }
                //     })
                // }else if(self.moneymin !==''&&
                //     self.moneymax !== ''){
                //     self.$axios.get("http://house-api.zjlaishang.com:9001/rent/",{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "totalPrice": [self.moneymin,self.moneymax],
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         if(res.data.code == 200){
                //             res.data.data.forEach(item=>{
                //                 self.rentrooomlist.push(item);
                //             })
                //             self.getquyu(self.rentrooomlist);
                //         }else{
                //             self.$toast(res.data.msg)
                //         }
                //     })
                // }else{
                //     self.$axios.get("http://house-api.zjlaishang.com:9001/rent/"+self.page,{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         if(res.data.code == 200){
                //             res.data.data.forEach(item=>{
                //                 self.rentrooomlist.push(item);
                //             })
                //             self.getquyu(self.rentrooomlist);
                //         }else{
                //             self.$toast(res.data.msg)
                //         }
                //     })
                // }
            },
            change1(){
                this.page = 0;
                this.rentrooomlist = [];
                this.searchrentroom();
            },
            change2(){
                this.page = 0;
                this.rentrooomlist = [];
                this.$refs.item1.toggle();
                if(this.iszhenzu == 1){
                    this.type = 1;
                }else if(this.iszhenzu == 2){
                    this.type = 2;
                }else{
                    this.type = '';
                }
                this.searchrentroom();
            },
            change3(){
                this.page = 0;
                this.ershouRoomList = [];
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
                this.rentrooomlist = [];
                this.searchrentroom();
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
            change4(value){
                console.log('value: '+value);
                if(value == 0){
                    this.desc = ''
                    this.orderBy = ''
                }else if(value == 1){
                    this.desc = 'asc'
                    this.orderBy = 'unitPrice'
                }else if(this.order1 == 2){
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
                this.rentrooomlist = [];
                this.searchrentroom();
            },
            getquyu(){
                for(let i=0;i<this.option1.length;i++){
                    for(let j=0;j<this.rentrooomlist.length;j++){
                        this.rentrooomlist[j].quyu = '吴兴区-富康路';
                        if(this.option1[i].value == parseInt(this.rentrooomlist[j].area_id)){
                            this.rentrooomlist[j].quyu = this.option1[i].title;
                        }
                    }
                }
                console.log(this.rentrooomlist)
            },
            onLoad(){
                if(this.scrollTop.isFixed == true){
                    let self = this;
                    self.page++;
                    console.log('123');
                    self.searchrentroom();    
                }
            },
            goback(){
                this.$router.go(-1);
            },
            getOptions(){
                let self = this;
                self.$axios.get("http://house-api.zjlaishang.com:9001/type/area",{
                }).then(function (res) {
                    if(res.data.code == 200){
                        res.data.data.forEach(item=>{
                            self.option1.push({text:item.title,value:item.id});
                        })
                    }else{}
                })

                self.$axios.get('http://house-api.zjlaishang.com:9001/type/buy',{
                }).then(function (res) {
                    if(res.data.code == 200){
                        res.data.data.forEach(item=>{
                            self.option3.push({text:item.title,value:item.id});
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .grey{
        width: 100%;
        height: 0.13rem;
        background:rgba(241,243,247,1);
    }
    .topmsg{
        display: flex;
        align-items: center;
    }
    .topmsg .iconleft{
        margin-top: 0.31rem;
        margin-left: 0.21rem;
        margin-right: 0.21rem;
        float: left;
    }

    .selectarea{
        width: 100%;
        margin-top: 8px;
        background-color: white;
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
        background-color: #f6f6f6;
        color: #4d4d4d;
        border-radius: 5px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }
    .tab-tilte .active{
        background-color: #FCF5EF;
        color: #EB613D;
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

    #container {
        height: 177px;
        margin-left: 15px;
        margin-right: 17px;
    }

    .bell{
        width:0.35rem;
    }

    #showmenu{
          height: 11.5rem;
          /* overflow-y: auto; */
          margin-bottom: 1.3rem;
    }

</style>