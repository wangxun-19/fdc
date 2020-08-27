<template>
    <div class="room2h" style="display: inline-flex" @click="gotoXQ(se_room_id)">
        <van-image :src="img" fit="cover" width="100%" height="3.94rem" radius="0.15rem"></van-image>
        <div class="content">
            <div class="main">
                <label class="title">{{title}}</label>
                <label class="yellow">{{price}}<span style="font-size: 0.23rem;color: white;margin-left: 0.14rem;margin-right: 0.26rem">万</span></label>
            </div>
            <div class="address">
                <label class="label_white">{{address}}</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SecondRoomBox",
        props:["img","price","title","address","se_room_id"],
        created(){
            // this.imgtrans(this.img);
        },
        data(){
            return{
                img1:''
            }
        },
        methods:{
            gotoXQ(se_room_id){
                if(this.$route.name != "erfdetail"){
                    let newroomid = se_room_id;
                    window.location.href = 'http://'+window.location.host+'/index/erf/detail/'+newroomid+'/123'
                    // this.$router.push({name:'erfdetail',params:{id:newroomid,time:'123'}});
                }else{
                    let newroomid = se_room_id;
                    window.location.href = 'http://'+window.location.host+'/index/erf/detail/'+newroomid+'/'+new Date().toString();
                    // this.$router.push({name:'erfdetail',params:{id:newroomid,time:new Date()}});
                }
            },
            imgtrans(img){
                let self = this;
               if(img.search("http://") == -1){
                    self.img1 = "http://"+img;
                }else{
                    self.img1 = img;
                }
            }
        }
    }
</script>

<style scoped>
    .room2h{
        padding-top: 0.20rem;
        padding-left: 0.37rem;
        padding-right: 0.35rem;
        position: relative;
        width: 100%;
        left: 0;
        top: 0;
        border: none;
    }

    .room2h .content{
        position: absolute;
        /* left: 20px; */
        bottom: 0rem;
        background: #000;
        opacity: 0.44;
        /* height: 1.19rem; */
        width: 6.75rem;
        display: inline-block;
        border-radius: 0px 0px 0.15rem 0.15rem;
    }

    .room2h .content .main{
        display: block;
    }

    .title{
        font-size:0.35rem;
        width:1.39rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin-left: 0.29rem;
        margin-top: 0.17rem;
        float: left;
        /*margin-right: 200px;*/
    }

    .yellow{
        margin-top: 0.23rem;
        color: yellow;
        font-size: 0.37rem;
        float: right;

    }
    .address{
        margin-left: 0.29rem;
        margin-top: 0.80rem;
        margin-bottom: 0.28rem;
    }
    .address .label_white{
        color: white;
        font-size: 13px;
    }
</style>