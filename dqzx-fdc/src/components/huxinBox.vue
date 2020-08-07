<template>
    <div class="huxinbox">
        <div class="img">
            <img class="img" :src="img" @click="clickPic">
        </div>
        <!-- <img class="img" :src="img" @click="clickPic"> -->
        <div style="margin-top: 0.19rem">
            <label class="name9" style="float:left">{{name}}</label>
            <label style="margin-left: 0.19rem;margin-top: 0.19rem;" class="status0" v-if="status == 1">待售</label>
            <label style="margin-left: 0.19rem;margin-top: 0.19rem;" class="status0" v-if="status == 2">已售</label>
            <label style="margin-left: 0.19rem;margin-top: 0.19rem;" class="status2" v-if="status == 3">售罄</label>
        </div>
        <div>
            <label class="area">{{area}}㎡</label>
        </div>
        <div >
            <label class="price">价格待定</label>
        </div>
    </div>
</template>

<script>
    import { ImagePreview } from 'vant'; 
    export default {
        name: "huxinBox",
        props:["img","name","type","status","area","id"],
        components:{
            ImagePreview
        },
        methods: {
            clickPic(){
                let self = this
                ImagePreview({
                   images: [
                      self.img
                   ],
                  closeable: true,
               });
            }
        },
    }
</script>

<style scoped>
    .huxinbox{
        display: inline-block;
        flex: 1;
        padding: 3px;
        flex-direction: column;
        margin-left: 0.23rem;
    }

    .img{
        width:2.98rem;
        height:2.55rem;
        border-radius:0.008rem;
    }

    .name9{
        font-size: .28rem;
        font-family: PingFangSC-Regular,PingFang SC;
        display: block;
        width: 2.0rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: .4rem;
        /* margin-top: .19rem; */
    }

    .status0{
        /* width:0.55rem; */
        /* height:0.31rem; */
        background:rgba(244,195,180,1);
        border-radius:0.05rem;
        font-size:0.2rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        margin-top: -0.05rem;
        padding-top: 0.05rem;
        padding-left: 0.09rem;
        padding-right: 0.08rem;
        padding-bottom: 0.05rem;
    }
    .status2{
        /* width:0.55rem; */
        /* height:0.31rem; */
        background:rgba(142,204,141,1);
        border-radius:0.05rem;
        font-size:0.20rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        padding-top: 0.05rem;
        padding-left: 0.09rem;
        padding-right: 0.08rem;
        padding-bottom: 0.05rem;
    }

    .area{
        font-size:0.23rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:0.34rem;
    }

    .price{
        font-size:0.19rem;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:0.28rem;
    }
</style>