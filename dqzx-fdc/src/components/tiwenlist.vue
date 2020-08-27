<template>
    <div class="wenlist">
        <div class="img">
            <van-image :src="wenimg"></van-image>
        </div>
        <div class="content">
            <div class="wenti">
                <label>{{question}}</label>
            </div>
            <div class="time">
                <label>{{time}}</label>
                <label class="huida" @click="huida">回答</label>
            </div>
            <div v-if="answer != undefined&&answer.length > 0">
                <div class="huifu">
                    <div class="triangle"></div>
                    <div class="answer">
                        <div class="user" style="float: left">
                            <label>{{answer[0].uname}}<span style="color: #333333">:</span></label>
                        </div>
                        <div class="commit" style="float: left">
                            <label>{{answer[0].content}}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tiwenlist",
        props:["question","time","answer","id","type","roomid","area"],
        data(){
            return{
                wenimg:require('.././assets/images/icon/wen.png')
            }
        },
        methods:{
            huida(){
                let self = this;
                let wenid = self.id;
                let title = self.question;
                console.log("title: "+title);
                if(self.type == 'new'){
                    self.$router.push({name:'answer',params:{id:wenid,title:title,type:'new',roomid:self.roomid}});
                }else if(self.type == 'old'){
                    self.$router.push({name:'answer',params:{id:wenid,title:title,type:'old',roomid:self.roomid}});
                }
            }
        }
    }
</script>

<style scoped>
    .wenlist{
        position: relative;
        max-width: 100%;
        flex-direction: row;
        margin-top: 0.19rem;
        margin-left: 0.22rem;
        display: flex;
        background-color: #FFFFFF;
        border: none;
        /* border-bottom: 1px solid #E9ECF0; */
    }
    .img{
        /* margin-top: 10px; */
        width: 0.43rem;
        height: 0.39rem;
        display: inline-block;
    }
    .content{
        display: inline-flex;
        flex-direction: column;
        margin: 0;
        margin-left: 0.12rem;
        margin-top: -0.03rem;
        vertical-align: top;
        line-height: 1.25;
        width: 100%;
    }

    .content .wenti{
        font-size: 0.28rem;
        width: 6.42rem;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:0.40rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .time{
        margin-top: 0.15rem;
        margin-left: 0.19rem;
        /* width: 220px; */
        font-size: 0.30rem;
        color: #989898;
        float: left;
    }
    .huida{
        float: right;
        color: #5B6A91;
        font-size: 0.30rem;
        margin-right: 0.58rem;
    }
    .huifu{
        width: 89%;
        border: 1px solid #ccc;
        position: relative;
        margin-top: 10px;
        margin-left: 0.2rem;
        background-color: #E6EEF8;
        border-radius: 7px;  /*圆角弧度为7px*/
        position: relative;

    }

    .huifu .triangle {
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #ccc;
        border-left: 10px solid transparent;
        border-radius: 7px;  /*圆角弧度为7px*/
        position: absolute;
        top: -20px;
        left: 5px;
    }
    .huifu .triangle:after {
        content: "";
        border-top: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid #E6EEF8;
        border-left: 8px solid transparent;
        border-radius: 7px;  /*圆角弧度为7px*/
        position: absolute;
        top: -6px;
        left: -8px;
    }
    .answer{
        display: inline-block;
    }
    .user{
        color: #5B6A91;
        font-weight: bold;
        margin-left: 0.1rem;
        margin-top: 0.1rem;
        margin-right: 10px;
    }
    .commit{
        color: #333333;
        margin-top: 0.1rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-right: 10px;
    }
</style>