<template>
    <div class="room2" style="display: inline-block" @click="gotoXQ(room_id)">
        <div>
            <div class="title">
               <label>{{title}}</label>
            </div>
            <div class="desc">
               <label style="float: left" class="zujin">{{zujin}}<span class="danwei">元/月</span></label>
               <label style="float: right" class="gengxin">{{gengxin}}</label>
            </div>
            <div class="imglist">
               <div v-for="(item,index) in imglist" :key="index">
                   <div v-if="index < 4">
                       <van-image style="margin-right: 0.16rem" :src="item" width="1.50rem" height="1.50rem"></van-image>
                   </div>
               </div>
            </div>
            <div class="foot" >
               <div v-if="localName != ''&&area != ''">
                   <van-image :src="src" width="0.20rem" height="0.26rem" style="float:left;margin-top: 0.05rem"></van-image>
                <!-- <label style="color: #919FBE;font-size: 14px">{{localName}}</label> -->
                   <label class="localname0">{{localName}}</label>
                <!-- <label style="float: right;color: #999999;font-size: 15px">{{area}}</label> -->
                   <label class="area4">{{area}}</label>
                </div>
            </div>
        </div>
        <div class="grey"></div>
    </div>
</template>

<script>
    export default {
        name: "RentRoomBox",
        props:["title","imglist",'type',"zujin","room_id","localName","time","area"],
        data(){
            return{
                imgarray:[],
                src:require('../assets/images/icon/jiantou.png'),
                gengxin:''
            }
        },
        mounted() {
            let self = this;
            this.gettimediff(this.time);
            // this.getimg(this.imglist);
        },
        methods:{
            gotoXQ(room_id){
                if(this.$route.name != "rentdetail"){
                    let newroomid = parseInt(room_id);
                    window.location.href = 'http://'+window.location.host+'/index/rent/detail/'+newroomid+'/123'
                    // this.$router.push({name:'rentdetail',params:{id:newroomid,time:'123'}});
                }else{
                    let newroomid = parseInt(room_id);
                    window.location.href = 'http://'+window.location.host+'/index/rent/detail/'+newroomid+'/'+new Date().toString();
                    // this.$router.push({name:'rentdetail',params:{id:newroomid,time:new Date()}});
                }
            },
            getimg(imgarray){
                let self = this;
                let j = 0;
                for(let i=0;i<imgarray.length;i++){
                    let str = imgarray[i];
                    if(str.search("http://") == -1){
                        self.imgarray.push("http://"+str)
                    }else{
                        self.imgarray.push(str)
                    }
                }
            },
            gettimediff(starttime){
                let startTime = new Date(starttime); // 开始时间
                let endTime = new Date(); // 结束时间
                let usedTime = endTime - startTime; // 相差的毫秒数
                let days = Math.floor(usedTime / (24 * 3600 * 1000)); // 计算出天数
                let leavel = usedTime % (24 * 3600 * 1000); // 计算天数后剩余的时间
                let hours = Math.floor(leavel / (3600 * 1000)); // 计算剩余的小时数
                let leavel2 = leavel % (3600 * 1000); // 计算剩余小时后剩余的毫秒数
                let minutes = Math.floor(leavel2 / (60 * 1000)); // 计算剩余的分钟数
                if(days > 0){
                    this.gengxin =  days + '天'+'前更新';
                }else{
                    this.gengxin =  '刚刚更新';
                }
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
    .room2{
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        border: none;
        background-color: #FFF;
    }
    .room2 .title{
        margin-left: 0.38rem;
        margin-top: 0.32rem;
        font-size:0.31rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
    }

    .room2 .desc{
        margin-top: 0.29rem;
        margin-left: 0.38rem;
        margin-bottom: 0.35rem;
        display: inline-block;
    }

    .zujin{
        color: #F03535;
        font-size: 0.37rem;
    }
    .danwei{
        margin-left: 0.17rem;
        color: #F14747;
        font-size: 0.23rem;
    }

    .gengxin{
        color: #7F7F7F;
        font-size: 0.23rem;
        margin-top: 0.1rem;
        margin-left: 4.0rem
    }

    .imglist{
        display: inline-flex;
        max-width: 100%;
        margin-left: 0.29rem;
        padding: 1px;
        /*flex-direction: column;*/
    }

    .room2 .foot{
        margin-left: 0.29rem;
        margin-top: 0.10rem;
        margin-bottom: 0.32rem;
        width: 92%;
        display: inline-block;
    }

    .localname0{
        float:left;
        margin-left: 0.14rem;
        font-size:0.26rem;
        font-family:PingFang SC;
        font-weight:500;
        width: 4.0rem;
        color:rgba(145,159,190,1);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }

    .area4{
        float: right;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(153,153,153,1);
        font-size: 0.28rem;
        margin-left: 0.50rem;
        width: 1.38rem;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
    }
</style>