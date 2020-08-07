<template>
    <div class="room2" style="display: block" @click="gotoXQ(room_id)">
        <div class="myImg">
            <!--            <MyImage :src="img" fit="cover" width="112px" height="84px"/>-->
            <img :src="img" class="img11"/>
        </div>
        <div class="content" style="">
            <label class="title">{{title}}</label>
            <div class="desclist" v-if="localName != ''&&localName != null" >
                <label class="desc" style="float:left;">{{localName}}</label>
                <label class="desc" style="float:left;margin-left: 10px"
                       v-if="min != null&&max != null&&parseInt(min) != 0&&parseInt(max) != 0">建面{{parseInt(min)}}-{{parseInt(max)}}m²</label>
                <!-- <div v-for="(item,index) in desclist" :key="index">
                    <div v-if="index == 0">
                        <label class="desc">{{item}}</label>
                    </div>
                    <div v-if="index !== 0&&index<4">
                        <label class="desc" style="margin-left: 10px">{{item}}</label>
                    </div>
                </div> -->
            </div>
            <div class="desclist" v-else>
                <label class="desc" style="float:left;" v-if="min != null&&max != null&&parseInt(min) != 0&&parseInt(max) != 0">建面{{min}}-{{max}}m²</label>
            </div>
            <div class="priceline">
                <label v-if="parseInt(price) !== 0" class="price">{{price}}<span
                        class="danjia">{{danwei}}</span></label>
                <label v-if="parseInt(price) === 0" class="price">单价待定</label>
                <!-- <label v-if="parseInt(price) !== 0" class="price">{{price}}<span class="dan">万</span><label v-if="parseInt(danjia) !== 0" class="danjia">{{danjia}}<span>{{danwei}}</span></label></label> -->
                <!-- <label v-if="parseInt(price) === 0" class="price">价格待定<label v-if="parseInt(danjia) === 0" class="danjia">单价待定</label></label> -->
            </div>
            <div class="top">
                <label class="descbox" v-if="nature == 1">住宅</label>
                <label class="descbox" v-if="nature == 2">别墅</label>
                <label class="descbox" v-if="nature == 3">商业</label>
                <label class="descbox" v-if="nature == 4">商铺</label>
                <label class="descbox" v-if="nature == 5">写字楼</label>
                <label class="descbox" style="margin-left: 5px" v-if="status == 1">待售</label>
                <label class="descbox" style="margin-left: 5px" v-if="status == 2">已售</label>
                <label class="descbox" style="margin-left: 5px" v-if="status == 3">售罄</label>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RoomBox",
        props: ["title", "img", 'status', "price", "danjia", "room_id", "danwei", "localName", "min", "max", "nature"],
        watch: {
            // localName(val){
            //     this.desclist = val.split(",");
            // }
        },
        data() {
            return {
                tiaojianlist: [],
                desclist: []
            }
        },
        mounted() {
            if (this.localName != null) {
                this.desclist = this.localName.split(",");
            } else {
                this.desclist.length = 0;
            }
        },
        methods: {
            gotoXQ(room_id) {
                let newroomid = parseInt(room_id);
                let area = this.min + '-' + this.max +'m²'
                if(this.$route.name != "xfdetail"){
                    this.$router.push({path:'/index/xf/detail/',query:{id:newroomid,time:''}});
                }else{
                    this.$router.push({path:'/index/xf/detail/',query:{id:newroomid,time:new Date()}});
                }
            }
        }
    }
</script>

<style scoped>
    .room2 {
            max-width: 100%;
            position: relative;
            flex-direction: row;
            border: none;
            margin-top: 0.14rem;
            margin-left: 0.46rem;
            margin-right: 0.46rem;
            padding-bottom: 0.14rem;
            border-bottom: 0.01rem solid #F4F4F4;
        }

        .myImg {
            display: inline-block;
            width: 2.23rem;
            height: 1.68rem;
            margin-right: 0.29rem;
            background: rgba(216, 216, 216, 1);
            border-radius: 0.02rem;
        }

        .img11 {
            width: 2.23rem;
            height: 1.68rem;
            background: rgba(216, 216, 216, 1);
            border-radius: 0.02rem;
        }

        .desclist {
            width: 3.66rem;
            margin-top: 0.05rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .room2 .content {
            display: inline-flex;
            /*margin-left: 13px;*/
            flex-direction: column;
            width: 58%;
            margin: 0 auto;
            vertical-align: top;
            padding-top: 0.05rem;
            line-height: 0;
        }

        .room2 .content .title {
            font-size: 0.35rem;
            width: 3.77rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: bold;
            color: rgba(51, 51, 51, 1);
            line-height: 0.40rem
        }

        .room2 .content .tiaojian {
            flex-direction: column;
            color: #9b9b9b;
        }

        .room2 .content .price {
            float: left;
            font-size: 0.40rem;
            font-family: DINAlternate-Bold, DINAlternate;
            font-weight: bold;
            color: rgba(240, 53, 53, 1);
            line-height: 0.44rem;
        }

        .dan {
            font-size: 0.11rem;
        }

        .priceline{
            margin-top: 0.05rem;
        }

        .top{
            margin-top: 0.12rem;
        }

        .room2 .content .danjia {

            margin-left: 0.05rem;
            font-size: 0.17rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(240, 53, 53, 1);
            line-height: 0.25rem;
        }

        .room2 .content .desc {
            font-size: 0.19rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 0.28rem;
            width: 1.65rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .descbox {
            width: 0.47rem;
            height: 0.28rem;
            border-radius: 0.04rem;
            border: 1px solid rgba(178, 178, 178, 1);
            padding: 0rem 0.06rem 0.02rem 0.06rem;
            font-size: 0.17rem;
            font-weight: 400;
            color: rgba(178, 178, 178, 1);
            line-height: 0.25rem;
        }
</style>