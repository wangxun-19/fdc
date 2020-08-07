<template>
    <div class="display0">
        <div>
            <label class="title">{{title}}</label>
        </div>
        <div class="desc0">
            <div class="redbb" style="float:left;">
                <img :src="(status == 1)?hoticon:xinkaiicon"  class="icon"/>
                <label v-if="status == 1" class="te0">热门楼盘</label>
                <label v-if="status == 0" class="te0">新开楼盘</label>
            </div>
            <div style="float:right">
                <label class="gotodetail0" @click="gotodetail">楼盘详情 ></label>
            </div>
        </div>
        <div style="margin-left:-0.1rem;margin-top: 0.22rem">
            <div class="display1">
                <img :src="img" class="imgsize" />
                <div class="content1">
                    <div style="margin-top: 0.37rem">
                        <label class="time">带看时间: <span>{{assemblyTime}}</span></label>
                    </div>
                    <div style="margin-top: 0.38rem">
                        <label class="time" >集合地点: <span>{{assemblyAddress}}</span></label>
                    </div>
                    <div class="enroll">
                       <label class="enrolllabel">已报名<span>{{totalsign}}人</span></label>
                       <van-button class="redbtn" style="margin-left: 0.58rem" :disabled="(sign == 1)?true:false" @click="gotoenroll">{{sign == 1?'已报名':'立即报名'}}</van-button>
                    </div>
                </div>
            </div>
        </div>
        <div style="margin-top: 0.29rem;max-width:100%;">
            <img style="margin-top: 0.05rem;width:0.37rem;float:right;margin-right: 0.37rem;margin-bottom: 0.14rem" v-if="like == 0" :src="dianzan" @click="dianzanit"  />
            <img style="margin-top: 0.05rem;width:0.37rem;float:right;margin-right: 0.37rem;margin-bottom: 0.14rem" v-else :src="dianzanred"  />
        </div>
    </div>
</template>

<script>
    export default {
        name: "activitylist",
        props:["id","hid","title","img","assemblyTime","assemblyAddress","like","sign","totalsign","status"],
        data(){
          return{
              homeinfo:{},
              areaarray:[],
              min:0,
              max:0,
              homepic:'',
              hoticon:require('../assets/images/icon/remen.png'),
              xinkaiicon:require('../assets/images/icon/xinkai.png'),
              dianzan:require('../assets/images/icon/killerqueen.png'),
              dianzanred:require('../assets/images/icon/dianzanred.png'),
              fenxiang:require('../assets/images/icon/fenxiang.png')
          }
        },
        created(){
            let self = this;
            self.gethomeinfo();
        },
        methods:{
            gethomeinfo(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.get("http://house-api.zjlaishang.com:9001/new/show/"+self.hid,{
                    headers: {
                        token:token
                    },
                }).then(function(res){
                    if(res.data.code == 200){
                        self.homeinfo = res.data.data;
                        self.homepic = (res.data.data.img&&res.data.data.img[0]&&res.data.data.img[0] != '')?res.data.data.img[0]:'';
                        if(self.homeinfo.unitType){
                            for(let i=0;i<self.homeinfo.unitType.length;i++){
                                self.areaarray.push(parseInt(self.homeinfo.unitType[i].area));
                            }
                        }
                    }
                })
            },
            gotodetail(){
                let self = this;
                let newroomid = parseInt(self.hid);
                self.minmax(self.areaarray);
                let area = this.min + '-' + this.max +'m²'
                this.$router.push({path:'/index/xf/detail/',query:{id:newroomid,time:''}});
            },
            minmax(array){
                if(array.length>0){
                    var newArray = Array.from( new Set(array) );
                    this.min = Math.min(...newArray);
                    this.max = Math.max(...newArray);
                    if(parseInt(this.max) == Infinity){
                        this.max ='';
                    }
                    if(parseInt(this.min) == -Infinity){
                        this.min ='';
                    }
                }else{
                    this.min = '';
                    this.max = '';
                }
                console.log(this.min,this.max);
            },
            gotoenroll(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.post("http://house-api.zjlaishang.com:9001/activity/sign/"+self.id,{
                    
                },
                {
                    headers:{
                        token:token
                    }
                }
                ).then(function(res){
                    if(res.data.code == 200){
                        self.$toast(res.data.msg);
                        self.$emit('event0','123');
                    }else{
                        self.$emit('event0','123');
                        self.$toast(res.data.mgs);
                    }
                })
                .catch(function(err){
                    self.$emit('event0','123');
                    console.log(err);
                })
            },
            dianzanit(){
                let self = this;
                let token = localStorage.getItem("token");
                self.$axios.post("http://house-api.zjlaishang.com:9001/activity/like/"+self.id+"/"+self.hid,{
                    
                },{
                    headers:{
                        token:token
                    }
                }).then(function(res){
                    if(res.data.code == 200){
                        self.$emit('event0','123');
                        self.$toast(res.data.msg);
                    }else{
                        self.$emit('event0','123');
                        self.$toast(res.msg);
                    }
                })
                .catch(function(err){
                    self.$emit('event0','123');
                    console.log(err);
                })
            },
            shareit(){
                let self = this;
                self.$wxMethod.share(
                    {
                        icon:self.homepic,
                        title:(self.homeinfo.title&&self.homeinfo.title != '')?self.homeinfo.title:'12345',
                        desc:(self.homeinfo.localName&&self.homeinfo.localName != '')?self.homeinfo.localName:'7890j'
                    },
                    res=>{
                        self.$emit('event0','123');
                        console.log(res);
                    }
                );
            }
        }
    }
</script>

<style scoped>
    .display0{
        display: inline-block;
        width: 100%;
        flex-direction: column;
        border: none;
        padding-left: 0.41rem;
        padding-top: 0.45rem;
        margin-bottom: 0.22rem;
        background-color: white;
    }

    .desc0{
        margin-top: 0.22rem;
    }

    .tilte{
        font-size:0.37rem;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(53,53,53,1);
        line-height:0.49rem;
    }

    .redbb{
        background:rgba(253,247,231,1);
        border-radius:0.17rem;
    }

    .redbb .icon{
        margin-left: 0.18rem;
        margin-top: 0.05rem;
        margin-bottom: -0.05rem;
        width:0.30rem;
    }

    .redbb .te0{
        font-size:0.22rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(237,120,50,1);
        margin-left: 0.14rem;
        margin-right: 0.14rem;
        margin-top: 0.05rem;
        margin-bottom: 0.05rem;
    }

    .gotodetail0{
        font-size:0.26rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(86,124,243,1);
        margin-right: 0.47rem;
    }

    .imgsize{
        width:2.23rem;
        height:1.68rem;
        margin-top: 0.18rem;
        margin-left: 0.19rem;
    }

    .selected{
        color: #999999;
        -webkit-filter: sepia(100%);
		filter: sepia(100%);
        opacity: 0.5;
    }

    .display1{
        position: relative;
        display: inline-block;
        flex-direction: row;
        width: 95.5%;
        margin-top: 0.22rem;
        margin-right: 0.30rem;
        border-radius: 0.22rem;
        box-shadow:0 5px 20px     rgba(0,0,0,0.5)
    }

    .display1 .content1{
        max-width: 58%;
        padding-left: 0.26rem;
        margin: 0 auto;
        display: inline-block;
        flex-direction: column;
        vertical-align: top;
        line-height: 0;
    }

    .content1 .time{
        font-size:0.23rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(116,116,116,1);
    }

    .enroll{
        margin-top: 0.46rem;
        max-width: 100%;
    }

    .enroll .enrolllabel{
        font-size:0.26rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,106,47,1);
    }

    .enroll .redbtn{
        /* width:1.31rem; */
        height:0.59rem;
        background:rgba(235,82,51,1);
        border-radius:0.29rem;
        font-size:0.26rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
</style>