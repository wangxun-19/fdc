<template>
    <div class="background">
        <div class="titlebox">
            <label class="title">{{roominfo.title}}</label>
            <div style="margin-top: 0.20rem;margin-bottom: 0.10rem;width:90%">
                <label class="price" v-if="roominfo.unitPrice != undefined">{{roominfo.unitPrice}}<span class="danwei">元/m²</span></label>
                <label class="price" v-else>{{roominfo.totalPrice}}<span class="danwei">万元</span></label>
                <label @click="gotoRoom" style="float:right;margin-top: 0.1rem" class="chakan">查看该楼盘<span class="jiantou">></span></label>
            </div>
            <div class="desclist">
                <div v-if="type == 'new'">
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
                </div>
                <div v-if="type == 'old'">
                    <div v-if="roominfo.type !== undefined&&roominfo.type == 1">
                       <label class="desc1">住宅</label>
                    </div>
                    <div v-else-if="roominfo.type !== undefined&&roominfo.type == 2">
                        <label class="desc1">商业</label>
                    </div>
                    <div v-else-if="roominfo.type !== undefined&&roominfo.type == 3">
                        <label class="desc1">别墅</label>
                    </div>
                    <div v-if="roominfo.type !== undefined&&roominfo.type == 4">
                        <label class="desc"> 商铺</label>
                    </div>
                    <div v-if="roominfo.type !== undefined&&roominfo.type == 5">
                        <label class="desc"> 写字楼</label>
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
        </div>
        <div class="grey"></div>
        <div class="dongtai">
            <scroll height="400">
                <div v-for="(item,index) in wentilist" :key="index">
                    <WentiList :question="item.content" :time="item.time" :answer="item.answer" :id="item.id" :type="type"></WentiList>
                </div>
            </scroll>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/mixin'
    export default {
        name: "Wentidengluo",
        mixins:[mixin],
        data(){
            return{
                page:0,
                type:'',
                roomid:'',
                area:'',
                wentilist:[],
                roominfo:[]
            }
        },
        created() {
            let roomid = this.$route.query.id;
            let type = this.$route.query.type;
            let area = this.$route.query.area;
            this.type = type;
            this.roomid = roomid;
            this.area = area;
            this.getwenti(roomid,type);
            this.getRoominfo(roomid,type);
            console.log('wentigengduo')
        },
        methods:{
            getRoominfo(roomid,type){
                let self = this;
                let token = localStorage.getItem("token")
                if(type == "new"){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/new/show/"+roomid,{
                        headers:{
                            token:token
                        }
                    }).then(function(res){
                        self.roominfo = res.data.data;
                    })
                }else if(type == "old"){
                    self.$axios.get("http://house-api.zjlaishang.com:9001/old/show/"+roomid,{
                        headers:{
                            token:token
                        }
                    }).then(function(res){
                        self.roominfo = res.data.data;
                    })
                }
            },
            getwenti(roomid,type){
                let self = this;
                if(type == 'new'){
                    this.$axios.get("http://house-api.zjlaishang.com:9001/new/question/"+roomid,{
                    }).then(function (res) {
                        if(res.data.code == 200){
                            console.log(res.data);
                            let date = new Date();
                            let year = date.getFullYear();
                            let month = date.getMonth()+1;
                            let day = date.getDate();
                            let month0 = '';
                            let day0 = '';
                            if(month < 10){
                                month0 = '0'+month
                            }
                            if(day <10){
                                day0 = '0'+day
                            }
                            let nowtime = year + '-' + month0 + '-'+day0;
                            res.data.data.forEach(item=>{
                                let ansdate = item.create_time.split(" ");
                                let days = ansdate[0].split("-")
                                if(nowtime == ansdate[0]){
                                    item.time = "今天"+ansdate[1];
                                }else if(days[0] == year){
                                    item.time = days[1]+'-'+days[2];
                                }else{
                                    item.time = ansdate[0];
                                }
                                self.wentilist.push(item)
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }else if(type == 'old'){
                    this.$axios.get("http://house-api.zjlaishang.com:9001/old/question/"+roomid,{
                    }).then(function (res) {
                        if(res.data.code == 200){
                            console.log(res.data);
                            res.data.data.forEach(item=>{
                                self.wentilist.push(item)
                            })
                        }else{
                            self.$toast(res.data.msg);
                        }
                    })
                }

            },
            gotoRoom(){
                let self = this;
                if(this.type == "new"){
                    self.$router.push({path:'/index/xf/detail/',query:{id:self.roomid,time:''}});
                }else if(this.type == 'old'){
                    this.$router.push({path:"/index/erf/detail",query:{id:this.roomid,time:''}});
                }
            }
        }
    }
</script>

<style scoped>
    .background{
        background-color: #FFF;
        width: 100%;
    }

    .grey{
        height:0.20rem;
        background:rgba(241,243,247,1);
        opacity:0.6;
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

    .desc{
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

    .titlebox {
        margin-top: 0.19rem;
        margin-left: 0.51rem;
        margin-bottom: 0.30rem;
        /* width: 100%; */
        display: flex;
        flex-direction: column;
    }
    .titlebox .title{
        font-size: 0.29rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(68,71,76,1);
        line-height:0.40rem;
    }

    .titlebox .price{
        font-size:0.36rem;
        font-family:DIN;
        font-weight:bold;
        color:rgba(242,70,70,1);
        line-height:0.48rem;
    }

    .titlebox .danwei{
        margin-left: 0.22rem;
        font-size:0.22rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(240,53,53,1);
        line-height:0.40rem;
    }

    .chakan{
        font-size:0.23rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(155,159,165,1);
        line-height:0.40rem;
    }

    .jiantou{
        margin-left: 0.17rem;
        font-size: 0.15rem;
    }
</style>