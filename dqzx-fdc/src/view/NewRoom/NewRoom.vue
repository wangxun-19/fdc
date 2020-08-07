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
        <div class="twoBtn">
            <div class="btn1">
                <van-image :src="btn1">

                </van-image>
            </div>
            <div class="btn2">
                <van-image :src="btn2"></van-image>
            </div>
        </div>
        <div class="selectArea">
            <van-dropdown-menu active-color="#ee0a24">
                <van-dropdown-item title="区域" v-model="tiaojian" :options="option1" @change="change1"></van-dropdown-item>
                <van-dropdown-item title="价格" :options="option5" @change="zongjia">
                    <!-- <van-row style="overflow-x: auto;overflow-y: hidden">
                        <ul class="moneyss" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC;">
                          <li @click="clickmonarr(1)" :class="{active:monarr==1}" style="margin-left: 30px;margin-bottom: 6.6px">0.7万以下</li>
                          <li @click="clickmonarr(2)" :class="{active:monarr==2}" style="margin-left: 30px">0.7万-0.8万</li>
                          <li @click="clickmonarr(3)" :class="{active:monarr==3}" style="margin-left: 30px">0.8万-1万</li>
                          <li @click="clickmonarr(4)" :class="{active:monarr==4}" style="margin-left: 30px">1万-1.5万</li>
                          <li @click="clickmonarr(5)" :class="{active:monarr==5}" style="margin-left: 30px">1.5万-2万</li>
                          <li @click="clickmonarr(6)" :class="{active:monarr==6}" style="margin-left: 30px">2万以上</li>
                        </ul>
                    </van-row> -->
                    <div>
                        
                        <!-- <div v-show="cur == 1">
                            <van-row style="width: 100%;height: 48.65px">
                                <van-col style="margin-left: 24px;font-size: 15px;margin-top: 15.6px">
                                    <label style="width: 41px;height: 13px">自定义</label>
                                </van-col>
                                <van-col style="margin-left: 12.25px;margin-top: 8px">
                                    <input placeholder="最小值" type="number" v-model="moneymin" style="width: 64px;height: 28px;text-align:center;border-radius: 5px;border: 1px solid #C0C0C0;font-size: 13px" />
                                </van-col>
                                <van-col style="margin-left: 4.15px;margin-top: 9px">
                                    <label>-</label>
                                </van-col>
                                <van-col style="margin-left: 8.25px;margin-top: 8px">
                                    <input placeholder="最大值" type="number" v-model="moneymax" style="width: 64px;height: 28px;text-align:center;border-radius: 5px;border: 1px solid #C0C0C0;font-size: 13px" />
                                </van-col>
                                <van-col style="margin-left: 8.65px;margin-top: 11px">
                                    <label style="font-size: 15px">万</label>
                                </van-col>
                                <van-col style="margin-left: 42.25px;margin-top: 8px">
                                    <van-button style="width: 64px;height: 28px;border-radius: 5px" :disabled="(moneymin === ''&&moneymax ==='')?'disabled':''" type="info" @click="zongjia">确定</van-button>
                                </van-col>
                            </van-row>
                        </div> -->
                    </div>
<!--                    <van-tabs v-model="activity" type="card">-->
<!--                        <van-tab title="单价(元/平方米)">-->

<!--                        </van-tab>-->
<!--                        <van-tab title="总价(万元)">-->

<!--                        </van-tab>-->
<!--                    </van-tabs>-->
                </van-dropdown-item>
                <van-dropdown-item title="户型" v-model="huxin" :options="option3" @change="change2"></van-dropdown-item>
                <van-dropdown-item title="更多" ref="item">
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 16px">面积</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickarea(1)" :class="{active:area==1}" style="margin-left: 21px;margin-bottom: 6.6px">50m²以下</li>
                                <li @click="clickarea(2)" :class="{active:area==2}" style="margin-left: 20px">50-70m²</li>
                                <li @click="clickarea(3)" :class="{active:area==3}" style="margin-left: 20px">70-90m²</li>
                                <li @click="clickarea(4)" :class="{active:area==4}" style="margin-left: 20px">90-120m²</li>
                                <li @click="clickarea(5)" :class="{active:area==5}" style="margin-left: 20px">120-150m²</li>
                                <li @click="clickarea(6)" :class="{active:area==6}" style="margin-left: 20px">150-200m²</li>
                                <li @click="clickarea(7)" :class="{active:area==7}" style="margin-left: 20px">200-300m²</li>
                                <li @click="clickarea(8)" :class="{active:area==8}" style="margin-left: 20px">300m²以上</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 16px">状态</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickstatus(1)" :class="{active:status==1}" style="margin-left: 21px;margin-bottom: 6.6px">待售</li>
                                <li @click="clickstatus(2)" :class="{active:status==2}" style="margin-left: 20px">已售</li>
                                <li @click="clickstatus(3)" :class="{active:status==3}" style="margin-left: 20px">售罄</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 16px">性质</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clicknature(1)" :class="{active:nature==1}" style="margin-left: 21px;margin-bottom: 6.6px">住宅</li>
                                <li @click="clicknature(2)" :class="{active:nature==2}" style="margin-left: 20px">别墅</li>
                                <li @click="clicknature(3)" :class="{active:nature==3}" style="margin-left: 20px">商业</li>
                                <li @click="clicknature(4)" :class="{active:nature==4}" style="margin-left: 20px">商铺</li>
                                <li @click="clicknature(5)" :class="{active:nature==5}" style="margin-left: 20px">写字楼</li>
                            </ul>
                        </van-row>
                        <van-row style="margin-top: 20px;margin-left: 21px">
                            <van-col span="4">
                                <label style="font-weight: bold;font-size: 16px">装修</label>
                            </van-col>
                        </van-row>
                        <van-row style="margin-top: 20px">
                            <ul class="zhuangxiu" style="width: 100%;border-bottom: 1px solid #ECECEC">
                                <ul class="zhuangxiu" style="display: inline-flex;width: 100%;border-bottom: 1px solid #ECECEC">
                                <li @click="clickdecor(1)" :class="{active:decoration==1}" style="margin-left: 21px;margin-bottom: 6.6px">毛坯</li>
                                <li @click="clickdecor(2)" :class="{active:decoration==2}" style="margin-left: 20px">简装</li>
                                <li @click="clickdecor(3)" :class="{active:decoration==3}" style="margin-left: 20px">精装</li>
                            </ul>
                            </ul>
                        </van-row>
                        <van-button @click="change3" style="width: 100%"  type="primary">确定</van-button>
                </van-dropdown-item>
                <van-dropdown-item title-class="icon iconfont iconpaixu" title="  " @change="change4" v-model="order1" :options="option4"></van-dropdown-item>
            </van-dropdown-menu>
        </div>
        <div id="showmenu" v-if="roomlist.length !== 0" >
            <ul 
               v-infinite-scroll="onLoad"
               infinite-scroll-distance="1">
                <div v-for="(item,index) in roomlist" :key="index">
                    <RoomBox
                            :title="item.title"
                            :room_id="item.id"
                            :img="item.img[0]"
                            :price="item.unitPrice"
                            :status="item.status"
                            :localName="item.localName"
                            :min="item.minArea"
                            :max="item.maxArea"
                            :nature="item.nature"
                            danwei="元/m²起"
                    ></RoomBox>
                </div>
            </ul>
        </div>
        <div v-if="roomlist.length === 0" style="text-align: center">
            <label>暂无新房数据</label>
        </div>
        <MainMenu></MainMenu>
    </div>
</template>

<script>
    // import infiniteScroll from 'vue-infinite-scroll';
    import mixin from '../../mixin/mixin'
    export default {
        name: "NewRoom",
        // mixins:[mixin],
        computed:{
            noMore(){
                return !this.loading;
            }
        },
        data(){
            return{
                keyword:'',
                messcount:0,
                btn1:require("../../assets/images/remenbtn.png"),
                btn2:require("../../assets/images/xinkaibtn.png"),
                option1:[
                    {text:'不限',value:0}
                ],
                option3:[
                    {text:'不限',value:0}
                ],
                option4:[
                    { text: '默认排序', value: 0 },
                    { text: '单价从低到高', value: 1 },
                    { text: '单价从高到低', value: 2 },
                    { text: '面积从小到大', value: 3 },
                    { text: '面积从大到小', value: 4 },
                ],
                options4:[],
                option5:[
                    { text: '0.7万以下', value: 0 },
                    { text: '0.7万-0.8万', value: 1 },
                    { text: '0.8万-1万', value: 2 },
                    { text: '1万-1.5万', value: 3 },
                    { text: '1.5万-2万', value: 4 },
                    { text: '2万以上', value: 5 },
                ],
                roomlist:[],
                tiaojian:'',
                huxin:'',
                selected:'',
                refresh:false,
                danjiamin:'',
                danjiamax:'',
                nature:'',
                status:'',
                decoration:'',
                area:'',
                areaarray:[],
                page:0,
                bell:require('../../assets/images/icon/图层521@3x.png'),
                loading:false,
                activity:'a',
                cur:0,
                order:'',
                order1:'',
                areaarray:[],
                desc:'asc',
                orderBy:'',
                monarr:'',
            }
        },
        mounted(){
            window.addEventListener('scroll', this.onScroll);
        },
        created() {
            this.searchroom();
            this.getOptions();
            this.getmessCount();
        },
        methods:{
            goBack(){
                this.$router.go(-1);
            },
            getmessCount(){

            },
            clickstatus(index){
                if(this.status != index){
                    this.status = index;
                }else{
                    this.status = '';
                }
            },
            clicknature(index){
                if(this.nature != index){
                    this.nature = index;
                }else{
                    this.nature = '';
                }
            },
            clickdecor(index){
                if(this.decoration != index){
                    this.decoration = index;
                }else{
                    this.decoration = '';
                }
            },
            clickmonarr(index){
                if(this.monarr != index){
                    this.monarr = index;
                }else{
                    this.monarr = '';
                }
                if(this.monarr == 1){
                    this.danjiamin = 0;
                    this.danjiamax = 7000;
                }else if(this.monarr == 2){
                    this.danjiamin = 7000;
                    this.danjiamax = 8000;
                }else if(this.monarr == 3){
                    this.danjiamin = 8000;
                    this.danjiamax = 10000;
                }else if(this.monarr == 4){
                    this.danjiamin = 10000;
                    this.danjiamax = 15000;
                }else if(this.monarr == 5){
                    this.danjiamin = 15000;
                    this.danjiamax = 20000;
                }else if(this.monarr == 6){
                    this.danjiamin = 20000;
                    this.danjiamax = 100000000;
                }else{
                    this.danjiamin = '';
                    this.danjiamax = '';
                }
            },
            change3(){
                this.page = 0;
                this.roomlist = [];
                this.searchroom();
                this.$refs.item.toggle();
            },
            change4(value){
                console.log('value: '+value);
                if(value == 0){
                    this.desc = 'asc'
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
                this.roomlist = [];
                this.searchroom();
            },
            search(){
                this.page = 0;
                this.roomlist = [];
                this.searchroom();
            },
            danjia(){
                this.page = 0;
                this.roomlist = [];
                this.searchroom();
                // this.$refs.item.toggle();
            },
            clickarea(index){
                if(this.area != index){
                    this.area = index;
                }else{
                    this.area = '';
                }
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
            },
            zongjia(value){
                if(value == 0){
                    this.danjiamin = 0;
                    this.danjiamax = 7000;
                }else if(value == 1){
                    this.danjiamin = 7000;
                    this.danjiamax = 8000;
                }else if(value == 2){
                    this.danjiamin = 8000;
                    this.danjiamax = 10000;
                }else if(value == 3){
                    this.danjiamin = 10000;
                    this.danjiamax = 15000;
                }else if(value == 4){
                    this.danjiamin = 15000;
                    this.danjiamax = 20000;
                }else if(value == 5){
                    this.danjiamin = 20000;
                    this.danjiamax = 100000000;
                }
                this.page = 0;
                this.roomlist = [];
                this.searchroom();
                // this.$refs.item.toggle();
            },
            onScroll(){},
            change1(){
                this.page = 0;
                this.roomlist = [];
                this.searchroom();
            },
            change2(){
                this.page = 0;
                this.roomlist = [];
                this.searchroom();
            },
            submit(){
                this.roomlist = [];
                this.searchroom();
            },
            onLoad(){
                let self = this;
                self.page++;
                console.log('123');
                self.searchroom();
                // this.page++;
                // console.log('123');
                // this.searchroom();
            },
            getOptions(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/type/area",{
                    headers:{
                        token:token
                    }
                }).then(function (res) {
                    console.log(res)
                    if(res.data.code == 200){
                        res.data.data.forEach(element=>{
                            self.option1.push({text:element.title,value:element.id})
                        })
                    }
                    // console.log(res)
                    // res.forEach(element=>{
                    //     self.option1.push({text:element.title,value:element.id-1})
                    // })
                })
                self.$axios.get('http://house-api.zjlaishang.com:9001/type/buy',{
                    headers:{
                        token:token
                    }
                }).then(function (res) {
                    console.log(res);
                    if(res.data.code == 200){
                        res.data.data.forEach(element=>{
                            self.option3.push({text:element.title,value:element.id})
                        })
                    }
                    // console.log(res);
                    // res.forEach(element=>{
                    //     self.option3.push({text:element.title,value:element.id-1})
                    // })
                })
            },
            searchroom(){
                let self = this;
                let token = localStorage.getItem("token")
                let areaid = (self.tiaojian != 0)?self.tiaojian:''
                let unitPrice = (self.danjiamin != ''&&self.danjiamin != '')?[self.danjiamin,self.danjiamax]:''
                let unitType = (self.huxin != 0)?self.huxin:''
                let area = (self.areaarray.length != 0)?self.areaarray:''
                if(this.orderBy != ''){
                    self.$axios.get('http://house-api.zjlaishang.com:9001/new/'+self.page+'/'+self.keyword,{
                       params:{
                        "areaId": areaid,
                        "unitPrice":unitPrice,
                        "unitType": unitType,
                        "area":area,
                        "order":self.desc,
                        "orderBy":self.orderBy,
                    },
                    headers:{
                        token:token
                    }
                    }).then(function(res){
                       console.log(res.data);
                       if(res.data.code == 200){
                          if(res.data.data.length > 0){
                              res.data.data.forEach(item=>{
                                  self.roomlist.push(item);
                              })
                              self.refresh = true;
                              console.log(self.refresh);
                            }else{
                               self.refresh = false;
                            }
                        }else{
                           self.$toast(res.data.message);
                        }
                    })
                }else{
                    self.$axios.get('http://house-api.zjlaishang.com:9001/new/'+self.page+'/'+self.keyword,{
                       params:{
                        "areaId": areaid,
                        "unitPrice":unitPrice,
                        "unitType": unitType,
                        "area":area,
                        "order":self.desc,
                    }
                    }).then(function(res){
                       console.log(res.data);
                       if(res.data.code == 200){
                          if(res.data.data.length > 0){
                              res.data.data.forEach(item=>{
                                  self.roomlist.push(item);
                              })
                              self.refresh = true;
                              console.log(self.refresh);
                            }else{
                               self.refresh = false;
                            }
                        }else{
                           self.$toast(res.data.message);
                        }
                    })
                }
                // if(self.danjiamax !==''&&
                //     self.danjiamax !== ''&&
                //     self.moneymin !== ''&&
                //     self.moneymax !== ''
                // ){
                //     this.$axios.get('http://house-api.zjlaishang.com:9001/new/'+self.page+'/'+self.keyword,{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "unitPrice":[self.danjiamin,self.danjiamax],
                //             "totalPrice": [self.moneymin,self.moneymax],
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         console.log(res.data);
                //         if(res.data.code == 200){
                //             if(res.data.data.length !== 0){
                //                 res.data.data.forEach(item=>{
                //                     self.roomlist.push(item);
                //                 })
                //                 self.loading = true;
                //             }else{
                //                 self.loading = false;
                //             }
                //         }else{
                //             self.$toast(res.data.message);
                //         }
                //     })
                // }else if(self.danjiamax !==''&&
                //     self.danjiamax !== ''){
                //     this.$axios.get('http://house-api.zjlaishang.com:9001/new/'+self.page+'/'+self.keyword,{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "unitPrice":[self.danjiamin,self.danjiamax],
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         console.log(res.data);
                //         if(res.data.code == 200){
                //             if(res.data.data.length !== 0){
                //                 res.data.data.forEach(item=>{
                //                     self.roomlist.push(item);
                //                 })
                //                 self.loading = true;
                //             }else{
                //                 self.loading = false;
                //             }
                //         }else{
                //             self.$toast(res.data.message);
                //         }
                //     })
                // }else if(self.moneymin !==''&&
                //     self.moneymax !== ''){
                //     this.$axios.get('http://house-api.zjlaishang.com:9001/new/'+self.page+'/'+self.keyword,{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "totalPrice": [self.moneymin,self.moneymax],
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         console.log(res.data);
                //         if(res.data.code == 200){
                //             if(res.data.data.length !== 0){
                //                 res.data.data.forEach(item=>{
                //                     self.roomlist.push(item);
                //                 })
                //                 self.loading = true;
                //             }else{
                //                 self.loading = false;
                //             }
                //         }else{
                //             self.$toast(res.data.message);
                //         }
                //     })
                // }else{
                //     this.$axios.get('http://house-api.zjlaishang.com:9001/new/'+self.page+'/'+self.keyword,{
                //         params:{
                //             "areaId": (self.tiaojian !== 0)?self.tiaojian:'',
                //             "unitType": (self.huxin !== 0)?self.huxin:'',
                //         }
                //     }).then(function (res) {
                //         console.log(res.data);
                //         if(res.data.code == 200){
                //             if(res.data.data.length !== 0){
                //                 res.data.data.forEach(item=>{
                //                     self.roomlist.push(item);
                //                 })
                //                 self.loading = true;
                //             }else{
                //                 self.loading = false;
                //             }
                //         }else{
                //             self.$toast(res.data.message);
                //         }
                //     })
                // }

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

    .iconright0{
        font-size: 0.23rem;
        margin-right: 0.16rem;
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
        border-radius: 5px;
        background-color: #E1E6F0;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }
    @media screen and (min-height: 0px) and (max-height: 480px){
        #showmenu{
          height: 6.0rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 481px) and (max-height: 568px){
        #showmenu{
          height: 7.9rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 569px) and (max-height: 736px){
        #showmenu{
          height: 8.5rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 737px) and (max-height: 896px){
        #showmenu{
          height: 11.5rem;
          overflow-y: auto;
        }
    }

    @media screen and (min-height: 897px){
        #showmenu{
          height: 7.0rem;
          overflow-y: auto;
        }
    }
    .tab-tilte .active{
        background-color: #FCF5EF;
        color: #EB613D;
    }
    .tab-content div{
        float: left;
        width: 25%;
        line-height: 100px;
        text-align: center;
    }

    .moneyss{
        width: 90%;
    }

    .moneyss li{
        width:100px;
        word-break:keep-all;
        white-space:nowrap; 
        float: left;
        text-align: center;
        line-height: 36px;
        cursor: pointer;
        height: 36px;
        background-color: #D8D8D8;
        font-size: 14px;
        color: #000;
        border-radius: 4px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }

    .moneyss .active{
        background-color: #FCF6EF;
        color: #EC613E;
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
        background-color: #D8D8D8;
        font-size: 14px;
        color: #000;
        border-radius: 4px;
        margin-top: 10.1px;
        margin-bottom: 6.6px;
    }

    .zhuangxiu .active{
        background-color: #fcf6ef;
        color: #EC613E;
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

    .topmsg .iconleft{
        margin-top: 0.31rem;
        margin-left: 0.21rem;
        margin-right: 0.21rem;
        float: left;
    }

    .van-tabs__nav {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        -webkit-user-select: none;
        user-select: none;
    }

    .van-tabs__nav--card {
        box-sizing: border-box;
        height: 30px;
        margin: 0 16px;
        border-radius: 2px;
        border: none;
    }

    .van-tabs__nav--card .van-tab {
        color: black;
    }

    /*.selectArea{*/
    /*    position: sticky;*/
    /*    position: -webkit-sticky;*/
    /*    top: 10px;*/
    /*}*/
    .topmsg .iconright{
        margin-top: 0.31rem;
        margin-left: 0.31rem;
        margin-right: 0.46rem;
        float: left;
    }

    .topmsg .bell{
        width: 0.4rem;
        /* height: 0.9rem; */
    }

    .topmsg input{
        border: none;
        outline: none;
        width: 100%;
        background-color: #f7f8fa;
    }

    .twoBtn{
        margin-top: 0.31rem;
        display: inline-flex;
        width: 100%;
    }
    .btn1{
        float: left;
        width: 100%;
        margin-left: 0.23rem;
    }

    .btn2{
        float: right;
        width: 100%;
        margin-left: 0.23rem;
        margin-right: 0.25rem;
    }

    /*.showarea{*/
    /*    position: sticky;*/
    /*    top:60px;*/
    /*    width: 100%;*/
    /*    margin-bottom: 100px;*/
    /*}*/
</style>