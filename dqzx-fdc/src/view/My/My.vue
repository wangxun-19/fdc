<template >
    <div style="background-color: #F7F9FE;">
        <div class="bluebg">
            <div class="myInfo">
                <div style="float: left" >
                    <img class="pic" :src="myInfo.avatar" />
                </div>
                <div class="info" style="float: left">
                    <div class="name">
                        <label>{{myInfo.nickname}}</label>
                    </div>
                    <div class="level">
                        <label>{{status}}</label>
                    </div>
                </div>
                <div style="float: right;margin-right: 0.37rem;">
                    <div class="jjrbtn" v-if="myInfo.houseStatus != 2&&myInfo.houseStatus != 3" @click="jinjiren">
                        <img :src="jjrpic" class="jjr" style="">
                        <div style="float:right;margin-right: 0.12rem;margin-top: 0.07rem">
                            <label class="title">申请成为经纪人</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grey">
            <div class="fabubtn">
                    <div class="erfbtn" @click="erfbtn">
                        <img style="width: 0.81rem;height: 0.81rem;margin-left: 0.28rem" :src="erfpic" />
                        <label style="margin-top: 0.23rem;font-size: 0.26rem;color: #000">发布二手房</label>
                    </div>
                    <div class="fenge" style="margin-left: 1.19rem"></div>
                    <div class="rentbtn" @click="rentbtn" style="margin-left: 0.99rem">
                        <img style="width: 0.81rem;height: 0.81rem;margin-left: 0.28rem" :src="rentpic" />
                        <label style="margin-top: 0.23rem;font-size: 0.26rem;color: #000">发布出租屋</label>
                    </div>
                </div>
                <div  class="btnlane">
                    <div class="item" @click="showfabu">
                        <img style="width: 0.46rem;height: 0.46rem;margin-top: 0.31rem;margin-left: 0.30rem;float:left" :src="fbbtn">
                        <div style="border-bottom: 1px solid #999999;float:left;margin-left: 0.30rem;margin-top: 0.2rem;padding-bottom: 0.2rem;">
                            <label style="font-size:0.27rem;font-family:PingFang SC;font-weight:500;color:rgba(51,51,51,1);">我的发布</label>
                             <van-icon style="margin-left: 4rem" size="0.27rem" name="arrow" />
                        </div>
                    </div>
                    <!-- <div class="item" @click="showfabu">
                        <img style="width: 25px;height: 25px;margin-top: 17px;margin-left: 19px" :src="fbbtn">
                        
                    </div> -->
                    <div class="item" @click="shoushoucang">
                        <img style="width: 0.46rem;height: 0.46rem;margin-top: 0.31rem;margin-left: 0.30rem;float:left" :src="scbtn">
                        <div style="border-bottom: 1px solid #999999;float:left;margin-left: 0.30rem;margin-top: 0.20rem;padding-bottom: 0.20rem;">
                            <label style="font-size:0.27rem;font-family:PingFang SC;font-weight:500;color:rgba(51,51,51,1);">收藏</label>
                             <van-icon style="margin-left: 4.5rem" size="0.27rem" name="arrow" />
                        </div>
                        <!-- <label style="font-size: 14px;color: #333333;margin-left: 24px;">收藏</label>
                        <van-icon style="margin-left: 220px" name="arrow" /> -->
                    </div>
                    <div class="item" @click="showhis">
                        <img style="width: 0.46rem;height: 0.46rem;margin-top: 0.31rem;margin-left: 0.30rem;float:left" :src="hisbtn">
                        <div style="border-bottom: 1px solid #999999;float:left;margin-left: 0.30rem;margin-top: 0.20rem;padding-bottom: 0.20rem;">
                            <label style="font-size:0.27rem;font-family:PingFang SC;font-weight:500;color:rgba(51,51,51,1);">历史记录</label>
                             <van-icon style="margin-left: 4rem" size="0.27rem" name="arrow" />
                        </div>
                        <!-- <label style="font-size: 14px;color: #333333;margin-left: 24px;">历史记录</label>
                        <van-icon style="margin-left: 200px" name="arrow" /> -->
                    </div>
                    <div class="item" @click="showmes">
                        <img style="width: 0.46rem;height: 0.46rem;margin-top: 0.31rem;margin-left: 0.30rem;float:left" :src="mesbtn">
                        <div style="border-bottom: 1px solid #999999;float:left;margin-left: 0.30rem;margin-top: 0.20rem;padding-bottom: 0.20rem;">
                            <label style="font-size:0.27rem;font-family:PingFang SC;font-weight:500;color:rgba(51,51,51,1);">消息</label>
                             <van-icon style="margin-left: 4.5rem" size="0.27rem" name="arrow" />
                        </div>
                        <!-- <label style="font-size: 14px;color: #333333;margin-left: 24px;">消息</label>
                        <van-icon style="margin-left: 220px" name="arrow" /> -->
                    </div>
                    <div class="item" @click="showyanzheng" v-if="myInfo.houseStatus == -1">
                        <img style="width: 0.46rem;height: 0.46rem;margin-top: 0.31rem;margin-left: 0.30rem;float:left" :src="mesbtn">
                        <div style="border-bottom: 1px solid #999999;float:left;margin-left: 0.30rem;margin-top: 0.20rem;padding-bottom: 0.20rem;">
                            <label style="font-size:0.27rem;font-family:PingFang SC;font-weight:500;color:rgba(51,51,51,1);">验证手机号</label>
                             <van-icon style="margin-left: 3.7rem" size="0.27rem" name="arrow" />
                        </div>
                    </div>
                </div>
        </div>
        <MainMenu></MainMenu>
    </div>
</template>

<script>
    // import mixin from '../mixin/mixin';
    import mixin from '../../mixin/mixin'
    import { Toast } from 'vant';
    export default {
        name: "My",
        mixins:[mixin],
        data(){
            return{
                myInfo:{},
                status:'',
                openid:'',
                jjrpic:require('../../assets/images/czw/jjr.png'),
                erfpic:require('../../assets/images/icon/fberf.png'),
                rentpic:require('../../assets/images/icon/fbrent.png'),
                fbbtn: require('../../assets/images/czw/fb.png'),
                scbtn: require('../../assets/images/czw/sc.png'),
                hisbtn: require('../../assets/images/czw/history.png'),
                mesbtn: require('../../assets/images/czw/message.png')
            }
        },
        created(){
            this.getUseInfo();
        },
        methods:{
            getUseInfo(){
                let token = localStorage.getItem('token');
                let self = this;
                this.$axios.get('http://house-api.zjlaishang.com:9001/my',{
                    headers:{
                        'TOKEN': token
                    }
                }).then(function (res) {
                    console.log('myinfo');
                    console.log(res.data);
                    if(res.data.code == 200){
                        self.myInfo = res.data.data;
                        self.openid = res.data.data.openid;
                        if(self.myInfo.houseStatus == 1){
                            self.status = "个人用户";
                        }else if(self.myInfo.houseStatus == 2){
                            self.status = "申请中";
                        }else if(self.myInfo.houseStatus == 3){
                            self.status = "经纪人";
                        }
                    }else{
                        self.$toast(res.data.msg);
                    }
                })
                .catch(function(err){
                    console.log(err);
                })
            },
            jinjiren(){
                let self = this;
                window.location.href = 'http://'+window.location.host+'/applyjjr/'+self.myInfo.houseStatus+'/'+new Date().toString();
                // self.$router.push({name:'applyjjr',params:{status0:self.myInfo.houseStatus}});
            },
            erfbtn(){
                let self = this;
                if(self.myInfo.houseStatus == -1){
                    self.$toast('请先验证手机号');
                    return;
                }
                window.location.href = 'http://'+window.location.host+'/fabuerf/'+new Date().toString();
                // this.$router.push({path:'/fabuerf'})
            },
            rentbtn(){
                let self = this;
                if(self.myInfo.houseStatus == -1){
                    self.$toast('请先验证手机号');
                    return;
                }
                // this.$router.push({path:'/faburent'})
                window.location.href = 'http://'+window.location.host+'/faburent/'+new Date().toString();
            },
            showfabu(){
                let self = this;
                if(self.myInfo.houseStatus == -1){
                    self.$toast('请先验证手机号');
                    return;
                }
                window.location.href = 'http://'+window.location.host+'/my/fabu/'+new Date().toString();
                // self.$router.push({path:'/my/fabu'})
            },
            shoushoucang(){
                let self = this;
                if(self.myInfo.houseStatus == -1){
                    self.$toast('请先验证手机号');
                    return;
                }
                window.location.href = 'http://'+window.location.host+'/my/sc/'+new Date().toString();
                // self.$router.push({path:'/my/sc'})
            },
            showhis(){
                let self = this;
                window.location.href = 'http://'+window.location.host+'/my/his/'+new Date().toString();
                // self.$router.push({path:'/my/his'});
            },
            showmes(){
                let self = this;
                window.location.href = 'http://'+window.location.host+'/my/message/'+new Date().toString();
                // self.$router.push({path:'/my/message'});
            },
            showyanzheng(){
                let self = this;
                window.location.href = 'http://'+window.location.host+'/editInfo/'+new Date().toString();
            },
        }
    }
</script>

<style scoped>
   .grey{
       background-color: #F7F9FE;
       width:100%;
       height: 100%;
       position: absolute;
       left: 0;
       top: 0;
   }
   .bluebg{
       width: 100%;
       height: 3.32rem;
       position: absolute;
       background-color: #4E75EE;
       z-index: 1;
    }
    .jjrbtn{
        width: 2.68rem;
        height: 0.48rem;
        /*line-height: 33px;*/
        border-radius: 0.24rem;
        background-color: #FDF7E7;
    }

    .fabubtn{
        position: absolute;
        top: 2.4rem;
        left: 0.31rem;
        border-radius: 0.09rem;
        border: none;
        width: 6.86rem;
        height: 1.86rem;
        background-color: #FFF;
        display: inline-flex;
        z-index: 199;
    }

    .fabubtn .erfbtn{
        margin-top: 0.23rem;
        margin-left: 1.10rem;
        display: inline-flex;
        flex-direction: column;
    }

   .fabubtn .rentbtn{
       margin-top: 0.23rem;
       display: inline-flex;
       flex-direction: column;
   }

    .title{
        font-size: 0.28rem;
        color: #ED7932;
    }

    .myInfo{
        position: absolute;
        top: 0.70rem;
        left: 0.43rem;
        width: 94%;
        z-index: 199;
    }

    .fenge{
        margin-top: 19px;
        width: 1px;
        height: 62px;
        background-color: #DCE2F0;
        border-radius: 1px;
    }

    .info{
        margin-left: 0.31rem;
        background: none;
        color: #FFF;
    }

    .info .name{
        color: #FFFFFF;
        font-size: 0.34rem;
    }

    .info .level{
        margin-top: 0.20rem;
        margin-left: 0.04rem;
        font-size: 14px;
        color:rgba(177,196,255,1)
    }

    .pic{
        width: 59px;
        height: 59px;
        border-radius: 29px;
    }

    .jjr{
        width: 0.31rem;
        height: 0.35rem;
        margin-left: 0.17rem;
        margin-top: 0.09rem;
        /* margin-bottom: 0.12rem; */
    }

    .btnlane{
        position: absolute;
        top: 4.60rem;
        left: 0.31rem;
        right:0.29rem;
        background-color: white;
        border-radius: 0.09rem;
        z-index: 199;
    }

    .btnlane .item{
        width: 100%;
        display: inline-block;
    }
</style>